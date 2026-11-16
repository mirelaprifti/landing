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
		note: "Talks on YouTube after the event",
		starts: "2026-12-09",
		ends: "2026-12-12",
		href: "/effect-days",
		action: "See the lineup",
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
	const newest = (pred: (p: BlogPost) => boolean) =>
		BLOG_POSTS.filter(pred).sort(
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

	const module = MODULES[0];
	if (module)
		items.push({ kind: "module", date: Date.parse(module.date), post: module });

	const post = newest(
		(p) =>
			!p.tags.some((t) =>
				["Release", "This Week In Effect", "Module of the Week"].includes(t),
			),
	);
	if (post) items.push({ kind: "post", date: Date.parse(post.date), post });

	const episode = EPISODES[0];
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

/** "Today", "3 days ago", "2 weeks ago"; "In 23 days" for the future. */
function relative(date: number, now: number) {
	// Whole calendar days, so something from this morning reads "Today"
	const midnight = (t: number) => new Date(t).setHours(0, 0, 0, 0);
	const days = Math.round((midnight(date) - midnight(now)) / DAY);
	if (days > 1) return `In ${days} days`;
	if (days === 1) return "Tomorrow";
	if (days === 0) return "Today";
	if (days === -1) return "Yesterday";
	if (days > -14) return `${-days} days ago`;
	return `${Math.round(-days / 7)} weeks ago`;
}

/* ─── Card ──────────────────────────────────────────────────────────────── */

/** Section eyebrow, verbatim from the styleguide. */
const EYEBROW =
	"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400";

/** Quiet mark in the media panel: present, not shouting. */
const MARK =
	"font-mono text-2xl font-medium group-data-[size=feature]:text-5xl tracking-tight text-zinc-400 tabular-nums transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-white";

/** A flat panel holding a quiet mark, for kinds without a picture. */
function MarkPanel({ mark, sub }: { mark: string; sub?: string }) {
	return (
		<div className="flex h-full flex-col justify-end gap-1 bg-zinc-50 p-3 sm:p-4 dark:bg-zinc-900/50">
			<span className={MARK}>{mark}</span>
			{sub && (
				<span className="truncate font-mono group-data-[size=tile]:hidden text-xs text-zinc-500 dark:text-zinc-400">
					{sub}
				</span>
			)}
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
				className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 motion-reduce:transition-none"
			/>
			{children}
		</div>
	);
}

type CardProps = {
	kind: string;
	when: string;
	isNew?: boolean;
	media: React.ReactNode;
	title: string;
	line?: string;
	href: string;
	/** Feature: the top row, picture on top. Tile: the row below, compact. */
	size?: "feature" | "tile";
};

/**
 * One card, two weights. Features (the two freshest) put a wide media panel
 * on top with a larger title; tiles (the rest) are a compact row with a small
 * thumbnail. Everything else — label, freshness, title, one line — is shared.
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
			data-size={size}
			className={`group relative flex min-w-0 bg-white transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900/60 ${
				feature
					? "flex-col gap-5 p-5 lg:p-6"
					: "flex-row items-center gap-4 px-5 py-4 lg:px-6"
			}`}
		>
			<div
				className={`shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-800 ${
					feature ? "aspect-video w-full" : "aspect-16/10 w-24"
				}`}
			>
				{media}
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-3 font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
					<span className="inline-flex min-w-0 items-center gap-1.5 truncate uppercase tracking-wider">
						{isNew && (
							<span
								aria-hidden="true"
								className="size-1.5 shrink-0 rounded-full bg-[#22c55e]"
							/>
						)}
						{kind}
					</span>
					<span className="shrink-0">{when}</span>
				</div>

				<h3
					className={`mt-2 leading-snug font-semibold text-balance text-zinc-900 dark:text-white ${
						feature ? "text-xl lg:text-2xl lg:tracking-tight" : "text-sm"
					}`}
				>
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
				{line && (
					<p
						className={`mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 ${
							feature ? "line-clamp-2" : "line-clamp-1"
						}`}
					>
						{line}
					</p>
				)}
			</div>
		</article>
	);
}

/** Maps a feed item onto the one card shape. */
function cardFor(item: Item, now: number): CardProps {
	const when = relative(item.date, now);
	const isNew = item.date <= now && now - item.date <= NEW_DAYS * DAY;
	const join = (p: BlogPost) => p.highlights?.join(" · ") ?? p.excerpt;

	switch (item.kind) {
		case "release":
			return {
				kind: "Release",
				when,
				isNew,
				media: (
					<MarkPanel
						mark={item.post.title.replace(/^Effect\s*/, "")}
						sub="effect"
					/>
				),
				title: `${item.post.title} is out`,
				line: join(item.post),
				href: getPostUrl(item.post),
			};
		case "newsletter":
			return {
				kind: "This Week in Effect",
				when,
				isNew,
				media: (
					<MarkPanel
						mark={`#${item.post.title.match(/#(\d+)/)?.[1] ?? ""}`}
						sub="weekly digest"
					/>
				),
				title: "This week in Effect",
				line: join(item.post),
				href: getPostUrl(item.post),
			};
		case "module":
			return {
				kind: "Module of the Week",
				when,
				isNew,
				media: (
					<MarkPanel
						mark={String(entryOf(item.post)).padStart(2, "0")}
						sub={item.post.packageName && `from "${item.post.packageName}"`}
					/>
				),
				title: moduleTitle(item.post),
				line: item.post.excerpt,
				href: getAssetPath(MOTW_URL),
			};
		case "post":
			return {
				kind: "Blog",
				when,
				isNew,
				media: item.post.coverImage ? (
					<ImagePanel src={getAssetPath(item.post.coverImage)} />
				) : (
					<MarkPanel mark="Blog" />
				),
				title: item.post.title,
				line: join(item.post),
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
					>
						<span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm bg-zinc-950/80 py-0.5 pr-1.5 pl-1 font-mono text-xs text-white tabular-nums">
							<i
								className="ri-play-fill text-sm leading-none"
								aria-hidden="true"
							/>
							{item.episode.duration}
						</span>
					</ImagePanel>
				),
				title: item.episode.title,
				line: `with ${item.episode.guest}`,
				href: getAssetPath(`/podcast/episodes/${item.episode.slug}`),
			};
		case "event":
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

/**
 * "What's new": the homepage's one living section. Two feature cards on top,
 * two compact tiles below, split on the page's centre line and filled by whatever is freshest across releases, the newsletter,
 * Module of the Week, blog posts, the podcast and events. Stale kinds drop
 * out on their own; nothing is pinned.
 */
export function WhatsNewSection() {
	const now = Date.now();
	const feed = buildFeed(now);
	if (feed.length === 0) return null;

	return (
		<section className="relative w-full py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className={EYEBROW}>// What's new</p>
				<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
					What's happening in Effect
				</h2>

				<div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
					{/* The two freshest carry the weight; the rest sit below as tiles */}
					{feed.map((item, i) => (
						<Card
							key={item.kind}
							{...cardFor(item, now)}
							size={i < 2 ? "feature" : "tile"}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
