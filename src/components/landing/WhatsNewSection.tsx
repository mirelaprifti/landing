import { Icon } from "@/components/ui/Icon";
import {
	BLOG_POSTS,
	type BlogPost,
	type CommunityPick,
	getPostUrl,
} from "../../data/blog";
import { EPISODES, type Episode } from "../../data/episodes";
import { getAssetPath } from "../../utils/assetPath";
import {
	communityPicks,
	DAY,
	daysFrom,
	type Event,
	EVENTS,
	eventHref,
	LUMA_URL,
	relative,
	STATS,
} from "./dispatchData";
import { entryOf, MODULES, MOTW_URL, moduleTitle } from "./moduleOfTheWeek";

/* ─── Feed rules ──────────────────────────────────────────────────────────
 * Nothing here is pinned. Every kind of content is a candidate; the section
 * shows the freshest. Anything older than a month (FRESH_DAYS) drops out, and an
 * event only appears once it's within EVENT_LEAD_DAYS of starting.
 */
const SLOTS = 4;
const FRESH_DAYS = 31; // the past month, same window as community picks
const EVENT_LEAD_DAYS = 60;
const NEW_DAYS = 7;

type Item =
	| { kind: "release"; date: number; post: BlogPost }
	| { kind: "newsletter"; date: number; post: BlogPost }
	| { kind: "module"; date: number; post: BlogPost }
	| { kind: "post"; date: number; post: BlogPost }
	| { kind: "podcast"; date: number; episode: Episode }
	| { kind: "event"; date: number; events: Event[] };

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

/* Panel surface: raised a step off the page, with a stronger outer edge and
 * quieter lines inside it. Dark values per design feedback (#111113 panel,
 * #303034 edge); the light theme mirrors it (zinc-50 panel, zinc-300 edge). */
const PANEL_BG = "bg-zinc-50 dark:bg-[#111113]";
const LINE = "border-zinc-200/70 dark:border-[#1f1f23]";
const LINE_FILL = "bg-zinc-200/70 dark:bg-[#1f1f23]";
/** The top story sits a touch lighter than the rest of the panel. */
const LEAD_BG = "bg-white dark:bg-[#18181b]";

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

/** The issue's headlines, minus any a tile in the section already shows. */
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
				className={`flex items-center justify-between gap-3 border-b px-6 py-3 tabular-nums ${LINE} ${MICRO}`}
			>
				<span className="min-w-0 truncate">{label}</span>
				{when && <span className={`shrink-0 ${isNew ? INK : ""}`}>{when}</span>}
			</div>
			{/* No markers: the headlines aren't a sequence */}
			<ul className="space-y-2 px-6 py-4">
				{items.map((item) => (
					<li
						key={item}
						className="truncate text-sm leading-normal text-zinc-800 dark:text-zinc-200"
					>
						{item}
					</li>
				))}
			</ul>
			{/* Full-width as the card: nothing is cropped, so no fade */}
			{!when && <Crop />}
		</div>
	);
}

/**
 * Upcoming events as a calendar list: cover, title, place, and when. Each row
 * is its own link; the header links out to the full Luma calendar.
 */
function EventsPanel({ events, now }: { events: Event[]; now: number }) {
	return (
		<div className="relative flex h-full flex-col">
			<div
				className={`flex items-center justify-between gap-3 border-b px-6 py-3 ${LINE} ${MICRO}`}
			>
				<span>Upcoming events</span>
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
			<ul className="flex flex-1 flex-col divide-y divide-zinc-200/70 dark:divide-[#1f1f23]">
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
									className={`size-10 shrink-0 border border-zinc-200 dark:border-zinc-800 ${
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
				className="h-full w-full object-cover"
			/>
			{children}
		</div>
	);
}

/* ─── Lead ──────────────────────────────────────────────────────────────── */

type Lead = {
	label: string;
	/** Right side of the label row: a date for events, freshness otherwise. */
	when: string;
	title: string;
	meta?: string;
	href: string;
	image?: string;
	logo?: boolean;
};

/** Significant words, for spotting the same story told twice. */
function words(text: string) {
	return text
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter((w) => w.length > 3 && w !== "effect");
}

/**
 * The top story: what the eye lands on first. An event happening today or
 * tomorrow wins; otherwise the freshest item in the feed.
 */
function LeadRow({ lead }: { lead: Lead }) {
	const external = lead.href.startsWith("http");
	return (
		<a
			href={lead.href}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className={`flex items-center gap-6 p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 lg:col-span-2 ${LEAD_BG} ${HOVER}`}
		>
			{lead.image && (
				<img
					src={lead.image}
					alt=""
					loading="lazy"
					className={`size-16 shrink-0 border border-zinc-200 dark:border-zinc-800 ${
						lead.logo ? "bg-white object-contain p-3" : "object-cover"
					}`}
				/>
			)}
			<span className="min-w-0 flex-1">
				<span className={`flex items-center justify-between gap-3 ${MICRO}`}>
					<span className={`flex items-center gap-2 ${INK}`}>
						{/* Small dot, in ink: marks the top story without colour */}
						<span
							aria-hidden="true"
							className="size-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-white"
						/>
						{lead.label}
					</span>
					<span className="shrink-0 tabular-nums">{lead.when}</span>
				</span>
				<span className={`mt-3 block ${CARD_TITLE}`}>{lead.title}</span>
				{lead.meta && (
					<span className={`block truncate ${CARD_BODY}`}>{lead.meta}</span>
				)}
			</span>
		</a>
	);
}

/* ─── Community ─────────────────────────────────────────────────────────── */

const host = (url: string) =>
	new URL(url).hostname.replace(/^www\./, "").replace("twitter.com", "x.com");

function CommunityRow({
	picks,
}: {
	picks: { pick: CommunityPick; issue: BlogPost }[];
}) {
	if (picks.length === 0) return null;
	const latest = picks
		.map((p) => p.issue)
		.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))[0];
	return (
		<div className={`lg:col-span-2 ${PANEL_BG}`}>
			<div
				className={`flex items-center justify-between gap-3 border-b px-6 py-3 ${LINE} ${MICRO}`}
			>
				<span>From the community</span>
				<a
					href={getPostUrl(latest)}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap transition-colors hover:text-zinc-900 dark:hover:text-white"
				>
					<span className="max-sm:hidden">Picked from This Week in Effect</span>
					<span className="sm:hidden">This Week in Effect</span>
					<Icon name="arrow-up-right" className="text-xs" />
				</a>
			</div>
			<ul className={`grid gap-px sm:grid-cols-2 ${LINE_FILL}`}>
				{picks.map(({ pick }) => (
					<li key={pick.url} className={`min-w-0 ${PANEL_BG}`}>
						<a
							href={pick.url}
							target="_blank"
							rel="noopener noreferrer"
							className={`flex h-full items-center gap-4 px-6 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 ${HOVER}`}
						>
							{/* The creator's avatar, square like the event covers, in its own colours */}
							{pick.image && (
								<img
									src={pick.image}
									alt=""
									loading="lazy"
									className={`size-12 shrink-0 border object-cover ${LINE}`}
								/>
							)}
							<span className="min-w-0 flex-1">
								<span
									className={`flex items-center justify-between gap-3 ${MICRO}`}
								>
									<span className="truncate">
										{pick.kind} · {pick.by}
									</span>
									<span className="inline-flex min-w-0 shrink items-center gap-1 normal-case max-sm:hidden">
										{host(pick.url)}
										<Icon
											name="arrow-up-right"
											aria-hidden="true"
											className="text-xs"
										/>
									</span>
								</span>
								<span className={`mt-3 block truncate ${SMALL_HEADING}`}>
									{pick.title}
								</span>
								<span className={`block truncate ${CARD_BODY}`}>
									{pick.note}
								</span>
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

/* ─── Numbers strip ─────────────────────────────────────────────────────── */

function StatsStrip() {
	return (
		// Supporting proof, so it closes the section, small
		<div className={`grid grid-cols-3 gap-px lg:col-span-2 ${LINE_FILL}`}>
			{STATS.filter((stat) => stat.label !== "Latest patch").map((stat) => {
				const external = stat.href.startsWith("http");
				return (
					<a
						key={stat.label}
						href={external ? stat.href : getAssetPath(stat.href)}
						{...(external
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
						className={`block px-6 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 ${PANEL_BG} ${HOVER}`}
					>
						<span className={`block tabular-nums ${SMALL_HEADING}`}>
							{stat.value}
						</span>
						{/* Same link mark as "All on Luma ↗": out of the site ↗, within it → */}
						<span className={`mt-1 block ${MICRO}`}>
							{stat.label}
							{/* Wrapped: the global icon rule would override a hide class on the svg */}
							<span className="max-sm:hidden">
								<Icon
									name={external ? "arrow-up-right" : "arrow-right"}
									aria-hidden="true"
									className="ml-1 inline text-xs"
								/>
							</span>
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
}: CardProps) {
	const external = href.startsWith("http");
	const feature = size === "feature";

	if (feature && panelOnly && media) {
		return (
			// No inset frame: the panel is the cell, edge to edge on the hairlines
			<article
				className={`relative min-w-0 ${PANEL_BG} ${ownLinks ? "" : HOVER}`}
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
			className={`relative flex min-w-0 ${PANEL_BG} ${HOVER} ${
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
					<span className="min-w-0 truncate">{kind}</span>
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
function cardFor(item: Item, now: number, covered: Set<string>): CardProps {
	const when = relative(item.date, now);
	const isNew = item.date <= now && now - item.date <= NEW_DAYS * DAY;
	const file = (p: BlogPost) =>
		p.packageName ? `${p.packageName.split("/").pop()}.ts` : "example.ts";

	switch (item.kind) {
		case "release":
			return {
				kind: "Release",
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
				when,
				isNew,
				media: item.post.highlights && (
					<ListPanel
						items={item.post.highlights.filter(
							(h) => !words(h).some((w) => covered.has(w)),
						)}
						label={`This Week in Effect · #${n}`}
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
 * The Effect Dispatch: the homepage's one living section. One top story,
 * then the freshest items (two features, then tiles), then the numbers as a
 * footnote. Nothing is pinned; nothing is said twice.
 */
export function WhatsNewSection() {
	const now = Date.now();
	let feed = buildFeed(now);
	if (feed.length === 0) return null;

	// Lead: an event today or tomorrow, else the freshest item
	const soon = EVENTS.filter(
		(e) => Date.parse(e.ends) > now && daysFrom(now, Date.parse(e.starts)) <= 1,
	).sort((a, b) => Date.parse(a.starts) - Date.parse(b.starts))[0];

	let lead: Lead;
	if (soon) {
		const today = daysFrom(now, Date.parse(soon.starts)) <= 0;
		lead = {
			label: today ? "Happening today" : "Tomorrow",
			when: soon.date,
			title: soon.title,
			meta: [soon.place, soon.detail].filter(Boolean).join(" · "),
			href: eventHref(soon),
			image: soon.image.startsWith("http")
				? soon.image
				: getAssetPath(soon.image),
			logo: soon.logo,
		};
		// Shown as the lead, so not again in the events list
		feed = feed
			.map((item) =>
				item.kind === "event"
					? { ...item, events: item.events.filter((e) => e !== soon) }
					: item,
			)
			.filter((item) => item.kind !== "event" || item.events.length > 0);
	} else {
		const top = cardFor(feed[0], now, new Set());
		lead = {
			label: top.kind,
			when: top.when,
			title: top.title,
			meta: top.line,
			href: top.href,
		};
		feed = feed.slice(1);
	}

	// Headlines that repeat a tile's story are dropped from the issue list
	const covered = new Set(
		feed
			.filter((i) => i.kind !== "event" && i.kind !== "newsletter")
			.flatMap((i) => words(cardFor(i, now, new Set()).title)),
	);
	const cards = feed.map((item, i) => ({
		...cardFor(item, now, covered),
		size: (i < 2 ? "feature" : "tile") as CardProps["size"],
		key: item.kind,
		// An odd one out at the end spans the row instead of leaving a hole
		wide: i === feed.length - 1 && feed.length % 2 === 1,
	}));

	return (
		<section className="relative w-full py-24 md:pt-40">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Small label (styleguide eyebrow) so the panel leads; still the h2 */}
				<h2 className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
					// The Effect Dispatch
				</h2>

				{/* Top story → the rest by freshness → numbers as the footnote */}
				<div
					className={`grid grid-cols-1 gap-px border border-zinc-300 lg:grid-cols-2 dark:border-[#303034] ${LINE_FILL}`}
				>
					<LeadRow lead={lead} />
					{cards.slice(0, 2).map(({ key, wide, ...card }) => (
						<div key={key} className={`grid ${wide ? "lg:col-span-2" : ""}`}>
							<Card {...card} />
						</div>
					))}
					{/* Community work, external, right after the headline boxes */}
					<CommunityRow picks={communityPicks(now)} />
					{cards.slice(2).map(({ key, wide, ...card }) => (
						<div key={key} className={`grid ${wide ? "lg:col-span-2" : ""}`}>
							<Card {...card} />
						</div>
					))}
					<StatsStrip />
				</div>
			</div>
		</section>
	);
}
