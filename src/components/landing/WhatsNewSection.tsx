import { Icon } from "@/components/ui/Icon";
import { BLOG_POSTS, type BlogPost, getPostUrl } from "../../data/blog";
import { JOBS } from "../../data/effect-jobs";
import { EPISODES, type Episode } from "../../data/episodes";
import { getAssetPath } from "../../utils/assetPath";
import { entryOf, MODULES, MOTW_URL, moduleTitle } from "./moduleOfTheWeek";

/* ─── Feed rules ──────────────────────────────────────────────────────────
 * Nothing here is pinned. Every kind of content is a candidate; the section
 * shows the four freshest. Anything older than FRESH_DAYS drops out, and an
 * event only appears once it's within EVENT_LEAD_DAYS of starting.
 */
const SLOTS = 4;
const FRESH_DAYS = 42;
const EVENT_LEAD_DAYS = 60;
const NEW_DAYS = 7;

/** The community calendar every event below is listed on. */
const LUMA_URL = "https://luma.com/effect-community";

/**
 * Upcoming events, mirrored from the Luma calendar. Add one here and it
 * slots in once it's within EVENT_LEAD_DAYS; it leaves when it's over.
 */
type Event = {
	title: string;
	/** As printed: "Nov 17", "Dec 9–11". */
	date: string;
	place: string;
	status?: string;
	starts: string;
	ends: string;
	href: string;
	/** The event's cover; Luma CDN or a local asset. */
	image: string;
	/** The image is a mark, not a photo: inset it on white, like a Luma cover. */
	logo?: boolean;
};
const EVENTS: Event[] = [
	{
		title: "Effect Warsaw #2",
		date: "Nov 17",
		place: "Warsaw, Poland",
		starts: "2026-11-17",
		ends: "2026-11-18",
		href: "https://luma.com/k5o7m2pg",
		image:
			"https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=96,height=96/uploads/cb/2bc25c67-80d6-407f-8aea-b9064647ef05.png",
	},
	{
		title: "Effect Office Hours",
		date: "Nov 18",
		place: "YouTube · 10:00 AM ET",
		starts: "2026-11-18",
		ends: "2026-11-19",
		href: "https://www.youtube.com/@Effect-TS/streams",
		// The stream thumbnail crops badly at this size; the logomark reads
		image: "/assets/effect-logo/Logo%20symbol/SVG/effect-logomark-black.svg",
		logo: true,
	},
	{
		title: "Effect Days 2026",
		date: "Dec 9–11",
		place: "Livorno, Italy",
		status: "Sold out",
		starts: "2026-12-09",
		ends: "2026-12-12",
		href: "/effect-days",
		image: "/assets/effect-days/ed-25-3.png",
	},
];

type Item =
	| { kind: "release"; date: number; post: BlogPost }
	| { kind: "newsletter"; date: number; post: BlogPost }
	| { kind: "module"; date: number; post: BlogPost }
	| { kind: "post"; date: number; post: BlogPost }
	| { kind: "podcast"; date: number; episode: Episode }
	| { kind: "event"; date: number; events: Event[] };

const DAY = 86_400_000;

function buildFeed(now: number): Item[] {
	const items: Item[] = [];

	// One of each kind at most, so a busy week of one kind can't crowd out
	// the rest; the newest of each kind competes on date.
	// Only what's already out: scheduled posts wait for their date
	const published = (date: string) => Date.parse(date) <= now;
	const newest = (pred: (p: BlogPost) => boolean) =>
		BLOG_POSTS.filter((p) => published(p.date) && pred(p)).sort(
			(a, b) => Date.parse(b.date) - Date.parse(a.date),
		)[0];

	const release = newest((p) => p.tags.includes("Release"));
	if (release)
		items.push({
			kind: "release",
			date: Date.parse(release.date),
			post: release,
		});

	const issue = newest((p) => p.tags.includes("This Week In Effect"));
	if (issue)
		items.push({
			kind: "newsletter",
			date: Date.parse(issue.date),
			post: issue,
		});

	const module = MODULES.find((p) => published(p.date));
	if (module)
		items.push({ kind: "module", date: Date.parse(module.date), post: module });

	const post = newest(
		(p) =>
			!p.tags.some((t) =>
				["Release", "This Week In Effect", "Module of the Week"].includes(t),
			),
	);
	if (post) items.push({ kind: "post", date: Date.parse(post.date), post });

	const episode = EPISODES.find((e) => published(e.date));
	if (episode)
		items.push({ kind: "podcast", date: Date.parse(episode.date), episode });

	const fresh = items.filter((i) => now - i.date <= FRESH_DAYS * DAY);

	// Upcoming events count as "now": they lead until they're over.
	const events = EVENTS.filter(
		(e) =>
			Date.parse(e.ends) > now &&
			Date.parse(e.starts) - now <= EVENT_LEAD_DAYS * DAY,
	).sort((a, b) => Date.parse(a.starts) - Date.parse(b.starts));
	if (events.length) fresh.push({ kind: "event", date: now, events });

	return fresh.sort((a, b) => b.date - a.date).slice(0, SLOTS);
}

/** Whole calendar days, so something from this morning reads "Today". */
function daysFrom(now: number, date: number) {
	const midnight = (t: number) => new Date(t).setHours(0, 0, 0, 0);
	return Math.round((midnight(date) - midnight(now)) / DAY);
}

/** "Today", "3 days ago", "2 weeks ago"; "In 23 days" for the future. */
function relative(date: number, now: number) {
	const days = daysFrom(now, date);
	if (days > 1) return `In ${days} days`;
	if (days === 1) return "Tomorrow";
	if (days === 0) return "Today";
	if (days === -1) return "Yesterday";
	if (days > -14) return `${-days} days ago`;
	return `${Math.round(-days / 7)} weeks ago`;
}

/* ─── Panels ────────────────────────────────────────────────────────────── */

/* Type: copied verbatim from the styleguide (TypographyStyleguidePage). */
const MICRO =
	"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";
const CARD_TITLE = "text-lg font-semibold text-zinc-900 dark:text-white";
const SMALL_HEADING = "text-base font-semibold text-zinc-900 dark:text-white";
const CARD_BODY =
	"mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400";
/** Fresh dates inside a MICRO row get ink, not color. */
const INK = "text-zinc-900 dark:text-white";

/** The one hover in this section, taken from the event rows: a flat tint. */
// Solid, not translucent: a see-through tint picks up the grid lines behind
const HOVER = "transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900";

const PANEL = "relative h-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/60";

/** Fades the right and bottom edges, so cropped content reads as "more". */
function Crop() {
	return (
		<>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-50 dark:from-zinc-900"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-50 dark:from-zinc-900"
			/>
		</>
	);
}

/**
 * Real code from the post, cropped like a window onto the editor. Monochrome:
 * comments and strings shift weight, nothing shifts hue.
 */
function CodePanel({ code, file }: { code: string; file?: string }) {
	const tokens = code.split(/(\/\/.*$|"[^"]*"|`[^`]*`)/gm);
	return (
		<div className={PANEL}>
			{file && (
				<div className="border-b border-zinc-200 px-3 py-1 font-mono text-[0.6875rem] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
					{file}
				</div>
			)}
			<pre className="p-3 font-mono text-[0.6875rem] leading-[1.6] whitespace-pre text-zinc-600 dark:text-zinc-400">
				{tokens.map((t, i) =>
					t.startsWith("//") ? (
						<span key={i} className="text-zinc-400 dark:text-zinc-600">
							{t}
						</span>
					) : t.startsWith('"') || t.startsWith("`") ? (
						<span key={i} className="text-zinc-900 dark:text-zinc-200">
							{t}
						</span>
					) : (
						t
					),
				)}
			</pre>
			<Crop />
		</div>
	);
}

/** The issue's headlines, set as a contents list. */
function ListPanel({
	items,
	label,
	when,
	isNew,
}: {
	items: string[];
	label: string;
	/** Freshness in the header's right corner, when the panel is the card. */
	when?: string;
	isNew?: boolean;
}) {
	return (
		<div className="relative h-full">
			<div
				className={`flex items-center justify-between gap-3 border-b border-zinc-200 px-6 py-3 tabular-nums dark:border-zinc-800 ${MICRO}`}
			>
				<Prompt cmd={label} />
				{when && <span className={`shrink-0 ${isNew ? INK : ""}`}>{when}</span>}
			</div>
			<ol className="space-y-3 px-6 py-4">
				{items.map((item, i) => (
					<li key={item} className="flex items-baseline gap-3">
						<span className={`tabular-nums ${MICRO}`}>
							{String(i + 1).padStart(2, "0")}
						</span>
						<p className={`truncate ${CARD_BODY}`}>{item}</p>
					</li>
				))}
			</ol>
			{/* Full-width as the card: nothing is cropped, so no fade */}
			{!when && <Crop />}
		</div>
	);
}

const eventHref = (e: Event) =>
	e.href.startsWith("http") ? e.href : getAssetPath(e.href);

/**
 * Upcoming events as a calendar list: cover, title, place, and when. Each row
 * is its own link; the header links out to the full Luma calendar.
 */
function EventsPanel({ events, now }: { events: Event[]; now: number }) {
	return (
		<div className="relative flex h-full flex-col">
			<div
				className={`flex items-center justify-between gap-3 border-b border-zinc-200 px-6 py-3 dark:border-zinc-800 ${MICRO}`}
			>
				<Prompt cmd="effect events --upcoming" />
				<a
					href={LUMA_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="relative z-10 inline-flex shrink-0 items-center gap-1 whitespace-nowrap transition-colors hover:text-zinc-900 dark:hover:text-white"
				>
					<span className="max-sm:hidden">All on</span> Luma
					<Icon name="arrow-up-right" className="text-xs" />
				</a>
			</div>
			{/* Rows share the height, so the list always meets the box beside it */}
			<ul className="flex flex-1 flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
				{events.slice(0, 3).map((e) => {
					const external = e.href.startsWith("http");
					const soon = relative(Date.parse(e.starts), now);
					return (
						<li key={e.title} className="flex flex-1">
							<a
								href={eventHref(e)}
								{...(external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className={`flex flex-1 items-center gap-3 px-6 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 ${HOVER}`}
							>
								<img
									src={external ? e.image : getAssetPath(e.image)}
									alt=""
									loading="lazy"
									className={`size-10 shrink-0 border border-zinc-200 grayscale dark:border-zinc-800 ${
										e.logo ? "bg-white object-contain p-2" : "object-cover"
									}`}
								/>
								<span className="min-w-0 flex-1">
									<span className={`block truncate ${SMALL_HEADING}`}>
										{e.title}
									</span>
									<span className={`block truncate ${CARD_BODY}`}>
										{e.place}
										{e.status && ` · ${e.status}`}
									</span>
								</span>
								<span className={`shrink-0 text-right tabular-nums ${MICRO}`}>
									<span className={`block ${INK}`}>{e.date}</span>
									<span className="mt-1 block">{soon}</span>
								</span>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function ImagePanel({
	src,
	children,
}: {
	src: string;
	children?: React.ReactNode;
}) {
	return (
		<div className="relative h-full">
			<img
				src={src}
				alt=""
				loading="lazy"
				className="h-full w-full object-cover opacity-80 grayscale"
			/>
			{children}
		</div>
	);
}

/* ─── Terminal ────────────────────────────────────────────────────────── */
/* The section is one terminal window, drawn the way the AI section's
 * terminal is: grey window dots, a mono title, `$ command` prompt lines.
 * Every block is the output of a command. Black and white only. */

/** A command line: muted `$`, the command in normal-case mono. */
function Prompt({ cmd }: { cmd: string }) {
	return (
		<span className="min-w-0 truncate font-mono text-sm font-normal tracking-normal normal-case text-zinc-700 dark:text-zinc-300">
			<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">
				${" "}
			</span>
			{cmd}
		</span>
	);
}

/** Window chrome: three dots, as in the AI terminal. */
function WindowBar() {
	return (
		<div className="flex items-center gap-4 bg-zinc-50 px-6 py-3 lg:col-span-2 dark:bg-zinc-900">
			<div aria-hidden="true" className="flex items-center gap-1.5">
				<span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
				<span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
				<span className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
			</div>
		</div>
	);
}

/** The window ends on an empty prompt with a blinking cursor. */
function IdlePrompt() {
	return (
		<div
			aria-hidden="true"
			className="flex items-center bg-white px-6 py-4 lg:col-span-2 dark:bg-zinc-950"
		>
			<Prompt cmd="" />
			<span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-zinc-900 motion-reduce:animate-none dark:bg-white" />
		</div>
	);
}

/* ─── Numbers strip ─────────────────────────────────────────────────────── */

/**
 * Numbers that move daily. In this design copy they're snapshots; on the live
 * site each is fetched on every rebuild (see the auto-feed plan). Sources and
 * snapshot dates are noted so they're easy to refresh by hand meanwhile.
 */
const STATS = [
	{
		// TWiE #144, Nov 16 2026
		value: "4.1.4",
		label: "Latest patch",
		href: "https://github.com/Effect-TS/effect/releases",
	},
	{
		// TWiE #140: "Effect surpasses 50 million downloads per week"
		value: "50M+",
		label: "Weekly downloads",
		href: "https://www.npmjs.com/package/effect",
	},
	{
		// github.com/Effect-TS/effect, Nov 17 2026
		value: "17.6k",
		label: "GitHub stars",
		href: "https://github.com/Effect-TS/effect",
	},
	{
		// Live: the site's own job board
		value: String(JOBS.length),
		label: "Open roles",
		href: "/effect-jobs",
	},
];

function StatsStrip() {
	return (
		<div className="grid grid-cols-2 gap-px bg-zinc-200 lg:col-span-2 lg:grid-cols-4 dark:bg-zinc-800">
			{STATS.map((stat) => {
				const external = stat.href.startsWith("http");
				return (
					<a
						key={stat.label}
						href={external ? stat.href : getAssetPath(stat.href)}
						{...(external
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
						className={`block bg-white p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 dark:bg-zinc-950 ${HOVER}`}
					>
						<span className={`block tabular-nums ${CARD_TITLE}`}>
							{stat.value}
						</span>
						{/* Same link mark as "All on Luma ↗": out of the site ↗, within it → */}
						<span className={`mt-1 block ${MICRO}`}>
							{stat.label}
							<Icon
								name={external ? "arrow-up-right" : "arrow-right"}
								aria-hidden="true"
								className="ml-1 inline text-xs"
							/>
						</span>
					</a>
				);
			})}
		</div>
	);
}

/* ─── Card ──────────────────────────────────────────────────────────────── */

type CardProps = {
	kind: string;
	when: string;
	isNew?: boolean;
	/** Only features show it; a tile is type alone. */
	media?: React.ReactNode;
	title: string;
	line?: string;
	href: string;
	size?: "feature" | "tile";
	/** As a feature, the media is the whole card: no title column. */
	panelOnly?: boolean;
	/** The panel carries its own links, so the card isn't one big link. */
	ownLinks?: boolean;
	/** The command this block is the output of. */
	command: string;
};

/**
 * One card, two weights. Features (the two freshest) pair the title with a
 * window onto the real thing: code, contents, or a photo. Tiles (the rest)
 * are type only, so there's never an empty frame.
 */
function Card({
	kind,
	when,
	isNew,
	media,
	title,
	line,
	href,
	size = "tile",
	panelOnly,
	ownLinks,
	command,
}: CardProps) {
	const external = href.startsWith("http");
	const feature = size === "feature";

	if (feature && panelOnly && media) {
		return (
			// No inset frame: the panel is the cell, edge to edge on the hairlines
			<article
				className={`relative min-w-0 bg-white dark:bg-zinc-950 ${ownLinks ? "" : HOVER}`}
			>
				{media}
				{!ownLinks && (
					<a
						href={href}
						{...(external
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
						className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400"
					>
						<span className="sr-only">{`${kind}: ${title}`}</span>
					</a>
				)}
			</article>
		);
	}

	return (
		<article
			className={`relative flex min-w-0 bg-white dark:bg-zinc-950 ${HOVER} ${
				feature ? "flex-col gap-6 p-6 sm:flex-row sm:items-stretch" : "p-6"
			}`}
		>
			{feature && media && (
				<div className="aspect-16/10 w-full shrink-0 overflow-hidden border border-zinc-200 sm:w-60 dark:border-zinc-800">
					{media}
				</div>
			)}

			<div className="flex min-w-0 flex-1 flex-col">
				<div
					className={`flex items-center justify-between gap-3 tabular-nums ${MICRO}`}
				>
					<Prompt cmd={command} />
					{/* Fresh items get ink, not color: the date goes full contrast */}
					<span className={`shrink-0 ${isNew ? INK : ""}`}>{when}</span>
				</div>

				<h3 className={`mt-3 ${feature ? CARD_TITLE : SMALL_HEADING}`}>
					<a
						href={href}
						{...(external
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
						className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400"
					>
						{title}
					</a>
				</h3>
				{line && <p className={`truncate ${CARD_BODY}`}>{line}</p>}
			</div>
		</article>
	);
}

/** Maps a feed item onto the card. */
function cardFor(item: Item, now: number): CardProps {
	const when = relative(item.date, now);
	const isNew = item.date <= now && now - item.date <= NEW_DAYS * DAY;
	const file = (p: BlogPost) =>
		p.packageName ? `${p.packageName.split("/").pop()}.ts` : "example.ts";

	switch (item.kind) {
		case "release":
			return {
				kind: "Release",
				command: "effect release --latest",
				when,
				isNew,
				media: item.post.snippet && (
					<CodePanel
						code={item.post.snippet}
						file={`${item.post.title.toLowerCase().replace(/\s+/g, "-")}.ts`}
					/>
				),
				title: item.post.headline ?? `${item.post.title} is out`,
				href: getPostUrl(item.post),
			};
		case "newsletter": {
			const n = item.post.title.match(/#(\d+)/)?.[1] ?? "";
			return {
				kind: `This Week in Effect · #${n}`,
				command: `effect news --issue ${n}`,
				when,
				isNew,
				media: item.post.highlights && (
					<ListPanel
						items={item.post.highlights}
						label={`effect news --issue ${n}`}
						when={when}
						isNew={isNew}
					/>
				),
				panelOnly: true,
				title: item.post.headline ?? item.post.title,
				href: getPostUrl(item.post),
			};
		}
		case "module": {
			const n = String(entryOf(item.post)).padStart(2, "0");
			return {
				kind: `Module of the Week · ${n}`,
				command: "effect module --latest",
				when,
				isNew,
				media: item.post.snippet && (
					<CodePanel code={item.post.snippet} file={file(item.post)} />
				),
				title: item.post.headline ?? moduleTitle(item.post),
				href: getAssetPath(MOTW_URL),
			};
		}
		case "post":
			return {
				kind: "Blog",
				command: "effect blog --latest",
				when,
				isNew,
				media: item.post.coverImage && (
					<ImagePanel src={getAssetPath(item.post.coverImage)} />
				),
				title: item.post.headline ?? item.post.title,
				href: getPostUrl(item.post),
			};
		case "podcast":
			return {
				kind: `Podcast · Ep ${item.episode.number}`,
				command: "effect podcast --latest",
				when,
				isNew,
				media: (
					<ImagePanel
						src={`https://i.ytimg.com/vi/${item.episode.youtubeId}/hqdefault.jpg`}
					/>
				),
				title: item.episode.title,
				line: `with ${item.episode.guest}`,
				href: getAssetPath(`/podcast/episodes/${item.episode.slug}`),
			};
		case "event": {
			const [next] = item.events;
			return {
				kind: "Next event",
				command: "effect events --upcoming",
				when: relative(Date.parse(next.starts), now),
				media: <EventsPanel events={item.events} now={now} />,
				panelOnly: true,
				// As a tile it's just the soonest one
				title: next.title,
				line: `${next.date} · ${next.place}`,
				href: eventHref(next),
				ownLinks: true,
			};
		}
	}
}

/**
 * "What's new": the homepage's one living section. The two freshest items
 * sit on top as features; the next two sit below as tiles. Label + title
 * only, so the picture leads and the eye has one place to land. Filled by whatever is freshest across releases, the
 * newsletter, Module of the Week, blog posts, the podcast and events.
 */
export function WhatsNewSection() {
	const now = Date.now();
	const cards = buildFeed(now).map((item, i) => ({
		...cardFor(item, now),
		size: (i < 2 ? "feature" : "tile") as CardProps["size"],
		key: item.kind,
	}));
	if (cards.length === 0) return null;

	return (
		<section className="relative w-full py-24 md:pt-40">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Title stands alone (sectionTitle, verbatim from the styleguide) */}
				<h2 className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white">
					The Effect Dispatch
				</h2>

				{/* One terminal window, framed like the AI section's terminal */}
				<div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
					<WindowBar />
					<StatsStrip />
					{cards.map(({ key, ...card }) => (
						<Card key={key} {...card} />
					))}
					<IdlePrompt />
				</div>
			</div>
		</section>
	);
}
