import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { BLOG_POSTS, type BlogPost, getPostUrl } from "../../data/blog";
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

/** Upcoming events. Add one here and it slots in when it gets close. */
const EVENTS = [
	{
		title: "Effect Days 2026",
		meta: "Dec 9–11 · Livorno, Italy",
		status: "Sold out",
		starts: "2026-12-09",
		ends: "2026-12-12",
		href: "/effect-days",
		image: "/assets/effect-days/ed-25-3.png",
	},
];
type Event = (typeof EVENTS)[number];

type Item =
	| { kind: "release"; date: number; post: BlogPost }
	| { kind: "newsletter"; date: number; post: BlogPost }
	| { kind: "module"; date: number; post: BlogPost }
	| { kind: "post"; date: number; post: BlogPost }
	| { kind: "podcast"; date: number; episode: Episode }
	| { kind: "event"; date: number; event: Event };

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

	// An upcoming event counts as "now": it leads until it's over.
	const event = EVENTS.find(
		(e) =>
			Date.parse(e.ends) > now &&
			Date.parse(e.starts) - now <= EVENT_LEAD_DAYS * DAY,
	);
	if (event) fresh.push({ kind: "event", date: now, event });

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

/** Section eyebrow, verbatim from the styleguide. */
const EYEBROW =
	"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400";

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
				<div className="border-b border-zinc-200 px-3 py-1.5 font-mono text-[0.6875rem] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
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
function ListPanel({ items, label }: { items: string[]; label: string }) {
	return (
		<div className={PANEL}>
			<div className="border-b border-zinc-200 px-3 py-1.5 font-mono text-[0.6875rem] text-zinc-500 dark:border-zinc-800">
				{label}
			</div>
			<ol className="space-y-1.5 p-3">
				{items.map((item, i) => (
					<li
						key={item}
						className="flex gap-2.5 text-xs leading-snug text-zinc-600 dark:text-zinc-400"
					>
						<span className="font-mono text-zinc-400 tabular-nums dark:text-zinc-600">
							{String(i + 1).padStart(2, "0")}
						</span>
						<span className="truncate">{item}</span>
					</li>
				))}
			</ol>
			<Crop />
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
				className="h-full w-full object-cover opacity-80 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 motion-reduce:transition-none"
			/>
			{children}
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
}: CardProps) {
	const external = href.startsWith("http");
	const feature = size === "feature";
	return (
		<article
			className={`group relative flex min-w-0 bg-white transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900/40 ${
				feature
					? "flex-col gap-5 p-5 sm:flex-row sm:items-stretch lg:p-6"
					: "px-5 py-4 lg:px-6"
			}`}
		>
			{feature && media && (
				<div className="aspect-16/10 w-full shrink-0 overflow-hidden border border-zinc-200 sm:w-60 dark:border-zinc-800">
					{media}
				</div>
			)}

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-center justify-between gap-3 font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
					<span className="min-w-0 truncate tracking-wider uppercase">
						{kind}
					</span>
					{/* Fresh items get ink, not color: the date goes full contrast */}
					<span
						className={`shrink-0 ${isNew ? "text-zinc-900 dark:text-white" : ""}`}
					>
						{when}
					</span>
				</div>

				<h3
					className={`mt-2 leading-snug font-semibold text-balance text-zinc-900 dark:text-white ${
						feature ? "text-lg" : "text-sm"
					}`}
				>
					<a
						href={href}
						{...(external
							? { target: "_blank", rel: "noopener noreferrer" }
							: {})}
						className="decoration-zinc-400 underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400 dark:decoration-zinc-600"
					>
						{title}
						<Icon
							name={external ? "arrow-up-right" : "arrow-right"}
							aria-hidden="true"
							className="ml-1.5 inline text-sm text-zinc-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none dark:text-zinc-500"
						/>
					</a>
				</h3>
				{line && (
					<p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
						{line}
					</p>
				)}
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
					<ListPanel items={item.post.highlights} label={`Issue #${n}`} />
				),
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
			return {
				kind: "Next event",
				when: relative(Date.parse(item.event.starts), now),
				media: (
					<ImagePanel src={getAssetPath(item.event.image)}>
						<span className="absolute top-2 right-2 rounded-full bg-zinc-950/70 px-2 py-0.5 font-mono text-xs tracking-wider text-white uppercase backdrop-blur-sm">
							{item.event.status}
						</span>
					</ImagePanel>
				),
				title: item.event.title,
				line: item.event.meta,
				href: getAssetPath(item.event.href),
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
		<section className="relative w-full py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-4xl">
						<p className={EYEBROW}>// Latest</p>
						<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
							What's new in Effect
						</h2>
					</div>
					<Button
						href={getAssetPath("/blog")}
						variant="secondary"
						size="md"
						className="shrink-0 self-start lg:self-auto"
					>
						All updates
						<Icon name="arrow-right" className="text-base" />
					</Button>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
					{cards.map(({ key, ...card }) => (
						<Card key={key} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
