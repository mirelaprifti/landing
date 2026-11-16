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
		items.push({ kind: "release", date: Date.parse(release.date), post: release });

	const issue = newest((p) => p.tags.includes("This Week In Effect"));
	if (issue)
		items.push({ kind: "newsletter", date: Date.parse(issue.date), post: issue });

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

/* ─── Shared pieces ─────────────────────────────────────────────────────── */

/** Kind badge, verbatim from the styleguide. */
const BADGE =
	"inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";

/** Section eyebrow, verbatim from the styleguide. */
const EYEBROW =
	"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400";

const CELL =
	"group relative flex min-w-0 flex-col overflow-hidden bg-white px-5 py-6 transition-colors hover:bg-zinc-50 lg:px-8 lg:py-8 dark:bg-zinc-950 dark:hover:bg-zinc-900/60";

/** Stretches the title link over the whole cell. */
const STRETCH =
	"after:absolute after:inset-0 after:z-10 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400";

const DISPLAY =
	"font-mono leading-none font-semibold tracking-tighter text-zinc-900 tabular-nums dark:text-white";

function LiveDot() {
	return (
		<span className="relative flex size-1.5" aria-hidden="true">
			<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:animate-none" />
			<span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
		</span>
	);
}

/** Badge on the left, freshness on the right: the top line of every cell. */
function Head({
	label,
	date,
	now,
}: {
	label: string;
	date: number;
	now: number;
}) {
	const isNew = now - date <= NEW_DAYS * DAY && date <= now;
	return (
		<div className="flex items-start justify-between gap-4">
			<span className={BADGE}>
				{isNew && <LiveDot />}
				{label}
			</span>
			<span className="font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
				{relative(date, now)}
			</span>
		</div>
	);
}

function Title({
	href,
	children,
	size = "md",
}: {
	href: string;
	children: React.ReactNode;
	size?: "md" | "lg";
}) {
	const external = href.startsWith("http");
	return (
		<h3
			className={
				size === "lg"
					? "text-2xl leading-tight font-semibold text-balance text-zinc-900 md:text-[2rem] md:tracking-tight dark:text-white"
					: "text-xl leading-snug font-semibold text-balance text-zinc-900 dark:text-white"
			}
		>
			<a
				href={href}
				{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				className={STRETCH}
			>
				{children}
			</a>
		</h3>
	);
}

function Chips({ items }: { items?: string[] }) {
	if (!items?.length) return null;
	return (
		<ul className="mt-5 flex flex-wrap gap-2">
			{items.map((h) => (
				<li
					key={h}
					className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
				>
					{h}
				</li>
			))}
		</ul>
	);
}

function Action({ label, href }: { label: string; href: string }) {
	return (
		<span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
			{label}
			<Icon
				name={href.startsWith("http") ? "arrow-up-right" : "arrow-right"}
				className="text-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</span>
	);
}

/* ─── Cells, one per kind ───────────────────────────────────────────────── */

/** Release and newsletter share a shape: a huge mark, a title, chips. */
function MarkCell({
	label,
	mark,
	title,
	post,
	date,
	now,
	action,
}: {
	label: string;
	mark: string;
	title: string;
	post: BlogPost;
	date: number;
	now: number;
	action: string;
}) {
	const href = getPostUrl(post);
	return (
		<article className={CELL}>
			<Head label={label} date={date} now={now} />
			<p aria-hidden="true" className={`mt-10 text-[5rem] md:text-[7.5rem] ${DISPLAY}`}>
				{mark}
			</p>
			<div className="mt-6">
				<Title href={href} size="lg">
					{title}
				</Title>
			</div>
			<Chips items={post.highlights} />
			<Action label={action} href={href} />
		</article>
	);
}

function ModuleCell({ post, date, now }: { post: BlogPost; date: number; now: number }) {
	const href = getAssetPath(MOTW_URL);
	return (
		<article className={CELL}>
			<Head label="Module of the Week" date={date} now={now} />
			<div className="mt-10 flex items-end gap-5">
				<span
					aria-hidden="true"
					className={`text-[5rem] md:text-[7.5rem] ${DISPLAY}`}
				>
					{String(entryOf(post)).padStart(2, "0")}
				</span>
				{post.packageName && (
					<code className="mb-2 truncate font-mono text-sm text-zinc-500 dark:text-zinc-400">
						from "{post.packageName}"
					</code>
				)}
			</div>
			<div className="mt-6">
				<Title href={href} size="lg">
					{moduleTitle(post)}
				</Title>
			</div>
			<Action label={post.video ? "Watch the module" : "Read the module"} href={href} />
		</article>
	);
}

function PostCell({ post, date, now }: { post: BlogPost; date: number; now: number }) {
	const href = getPostUrl(post);
	return (
		<article className={CELL}>
			<Head label="Blog" date={date} now={now} />
			{post.coverImage && (
				<div className="mt-6 aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800">
					<img
						src={getAssetPath(post.coverImage)}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
					/>
				</div>
			)}
			<div className="mt-6">
				<Title href={href} size="lg">
					{post.title}
				</Title>
			</div>
			<Chips items={post.highlights} />
			<Action label="Read" href={href} />
		</article>
	);
}

function PodcastCell({ episode, date, now }: { episode: Episode; date: number; now: number }) {
	const href = getAssetPath(`/podcast/episodes/${episode.slug}`);
	return (
		<article className={CELL}>
			<Head label={`Podcast · Ep ${episode.number}`} date={date} now={now} />
			<div className="relative mt-6 aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800">
				<img
					src={`https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
				/>
				<span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm bg-zinc-950/80 py-0.5 pr-1.5 pl-1 font-mono text-xs text-white tabular-nums">
					<i className="ri-play-fill text-sm leading-none" aria-hidden="true" />
					{episode.duration}
				</span>
			</div>
			<div className="mt-6">
				<Title href={href}>{episode.title}</Title>
			</div>
			<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">with {episode.guest}</p>
			<Action label="Listen" href={href} />
		</article>
	);
}

/** Event: the photo is the cell, with the essentials laid over it. */
function EventCell({ event, now }: { event: Event; now: number }) {
	return (
		<article className="group relative flex min-h-[24rem] min-w-0 flex-col justify-between overflow-hidden bg-zinc-950 px-5 py-6 lg:px-8 lg:py-8">
			<img
				src={getAssetPath(event.image)}
				alt=""
				loading="lazy"
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10"
			/>

			<div className="relative flex items-start justify-between gap-4">
				<span className="rounded-full border border-white/25 bg-zinc-950/50 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-200 uppercase backdrop-blur-sm">
					Next event
				</span>
				<span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-950 uppercase">
					{event.status}
				</span>
			</div>

			<div className="relative">
				<p className="font-mono text-xs text-zinc-300 tabular-nums">
					{relative(Date.parse(event.starts), now)} · {event.meta}
				</p>
				<h3 className="mt-3 text-2xl leading-tight font-semibold text-white md:text-[2rem] md:tracking-tight">
					<a href={getAssetPath(event.href)} className={STRETCH}>
						{event.title}
					</a>
				</h3>
				<div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
					<p className="text-sm text-zinc-300">{event.note}</p>
					<span className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors group-hover:text-white">
						{event.action}
						<Icon
							name="arrow-right"
							className="text-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
						/>
					</span>
				</div>
			</div>
		</article>
	);
}

function Cell({ item, now }: { item: Item; now: number }) {
	switch (item.kind) {
		case "release":
			return (
				<MarkCell
					label="Release"
					mark={item.post.title.replace(/^Effect\s*/, "")}
					title={`${item.post.title} is out`}
					post={item.post}
					date={item.date}
					now={now}
					action="What's in it"
				/>
			);
		case "newsletter":
			return (
				<MarkCell
					label="This Week in Effect"
					mark={`#${item.post.title.match(/#(\d+)/)?.[1] ?? ""}`}
					title="This week, in one read"
					post={item.post}
					date={item.date}
					now={now}
					action="Read the issue"
				/>
			);
		case "module":
			return <ModuleCell post={item.post} date={item.date} now={now} />;
		case "post":
			return <PostCell post={item.post} date={item.date} now={now} />;
		case "podcast":
			return <PodcastCell episode={item.episode} date={item.date} now={now} />;
		case "event":
			return <EventCell event={item.event} now={now} />;
	}
}

/**
 * "What's new": the homepage's one living section. A 2×2 ledger split on the
 * page's centre line, filled by whatever is freshest across releases, the
 * newsletter, Module of the Week, blog posts, the podcast and events. Stale
 * kinds drop out on their own; nothing is pinned.
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
					{feed.map((item) => (
						<Cell key={item.kind} item={item} now={now} />
					))}
				</div>
			</div>
		</section>
	);
}
