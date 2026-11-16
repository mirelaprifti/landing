import { Icon } from "@/components/ui/Icon";
import { BLOG_POSTS, type BlogPost, getPostUrl } from "../../data/blog";
import { EPISODES, type Episode } from "../../data/episodes";
import { getAssetPath } from "../../utils/assetPath";
import { entryOf, MODULES, MOTW_URL, moduleTitle } from "./moduleOfTheWeek";

/** Kind badge, verbatim from the styleguide. */
const BADGE =
	"inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";

/** Section eyebrow, verbatim from the styleguide. */
const EYEBROW =
	"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400";

const META = "font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400";

const CELL =
	"group relative flex min-w-0 flex-col overflow-hidden bg-white px-5 py-6 transition-colors lg:px-8 lg:py-8 dark:bg-zinc-950";

/** Stretches the title link over the whole cell. */
const STRETCH =
	"after:absolute after:inset-0 after:z-10 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400";

/** What shipped, as scannable chips instead of a paragraph. */
const RELEASE_HIGHLIGHTS: Record<string, string[]> = {
	"releases/effect/41": [
		"effect/crypto",
		"Glob",
		"Streaming CSV",
		"HttpApi Problem Details",
	],
	"releases/effect/40": ["Dependency-free core", "Long-term support"],
};

/** Upcoming events, soonest first; the first not yet over is shown. */
const EVENTS = [
	{
		title: "Effect Days 2026",
		meta: "Dec 9–11 · Livorno, Italy",
		status: "Sold out",
		note: "Talks on YouTube after the event",
		ends: "2026-12-12",
		href: "/effect-days",
		image: "/assets/effect-days/ed-25-3.png",
	},
];

function Arrow({ external }: { external?: boolean }) {
	return (
		<Icon
			name={external ? "arrow-up-right" : "arrow-right"}
			className="text-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
		/>
	);
}

function LiveDot() {
	return (
		<span className="relative flex size-1.5" aria-hidden="true">
			<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:animate-none" />
			<span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
		</span>
	);
}

/** Release: the version number set huge as the visual, highlights as chips. */
function ReleaseCell({ post }: { post: BlogPost }) {
	const href = getPostUrl(post);
	const external = href.startsWith("http");
	const version = post.title.replace(/^Effect\s*/, "");
	const highlights = RELEASE_HIGHLIGHTS[post.slug] ?? [];
	return (
		<article className={`${CELL} hover:bg-zinc-50 dark:hover:bg-zinc-900/60`}>
			<div className="flex items-start justify-between gap-4">
				<span className={BADGE}>
					<LiveDot />
					New release
				</span>
				<time className={META}>{post.date}</time>
			</div>

			<p
				aria-hidden="true"
				className="mt-10 font-mono text-[6rem] leading-none font-semibold tracking-tighter text-zinc-900 tabular-nums md:text-[9rem] dark:text-white"
			>
				{version}
			</p>

			<h3 className="mt-6 text-2xl leading-tight font-semibold text-zinc-900 md:text-[2rem] md:tracking-tight dark:text-white">
				<a
					href={href}
					{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
					className={STRETCH}
				>
					{post.title} is out
				</a>
			</h3>

			{highlights.length > 0 && (
				<ul className="mt-5 flex flex-wrap gap-2">
					{highlights.map((h) => (
						<li
							key={h}
							className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
						>
							{h}
						</li>
					))}
				</ul>
			)}

			<span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
				What's in it
				<Arrow external={external} />
			</span>
		</article>
	);
}

/** Event: the photo is the cell, with the essentials laid over it. */
function EventCell({ event }: { event: (typeof EVENTS)[number] }) {
	return (
		<article className="group relative flex min-h-[22rem] min-w-0 flex-col justify-between overflow-hidden bg-zinc-950 px-5 py-6 lg:px-8 lg:py-8">
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
					{event.meta}
				</p>
				<h3 className="mt-3 text-2xl leading-tight font-semibold text-white md:text-[2rem] md:tracking-tight">
					<a href={getAssetPath(event.href)} className={STRETCH}>
						{event.title}
					</a>
				</h3>
				<div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
					<p className="text-sm text-zinc-300">{event.note}</p>
					<span className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors group-hover:text-white">
						See the lineup
						<Arrow />
					</span>
				</div>
			</div>
		</article>
	);
}

/** Module of the Week: the entry number as a display mark, package beside it. */
function ModuleCell({ post }: { post: BlogPost }) {
	const n = String(entryOf(post)).padStart(2, "0");
	return (
		<article className={`${CELL} hover:bg-zinc-50 dark:hover:bg-zinc-900/60`}>
			<div className="flex items-start justify-between gap-4">
				<span className={BADGE}>Module of the Week</span>
				<time className={META}>{post.date}</time>
			</div>

			<div className="mt-8 flex items-end gap-5">
				<span
					aria-hidden="true"
					className="font-mono text-[4.5rem] leading-[0.8] font-semibold tracking-tighter text-zinc-300 tabular-nums transition-colors group-hover:text-zinc-900 dark:text-zinc-700 dark:group-hover:text-white"
				>
					{n}
				</span>
				{post.packageName && (
					<code className="mb-1 truncate font-mono text-sm text-zinc-500 dark:text-zinc-400">
						from "{post.packageName}"
					</code>
				)}
			</div>

			<h3 className="mt-5 text-xl leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
				<a href={getAssetPath(MOTW_URL)} className={STRETCH}>
					{moduleTitle(post)}
				</a>
			</h3>

			<span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
				{post.video ? "Watch the module" : "Read the module"}
				<Arrow />
			</span>
		</article>
	);
}

/** Podcast: the episode thumbnail leads, title and guest underneath. */
function PodcastCell({ episode }: { episode: Episode }) {
	return (
		<article className={`${CELL} hover:bg-zinc-50 dark:hover:bg-zinc-900/60`}>
			<div className="flex items-start justify-between gap-4">
				<span className={BADGE}>Podcast · Ep {episode.number}</span>
				<time className={META}>{episode.date}</time>
			</div>

			<div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
				<div className="relative aspect-video w-full shrink-0 overflow-hidden border border-zinc-200 sm:w-56 dark:border-zinc-800">
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
				<div className="min-w-0">
					<h3 className="text-xl leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
						<a
							href={getAssetPath(`/podcast/episodes/${episode.slug}`)}
							className={STRETCH}
						>
							{episode.title}
						</a>
					</h3>
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						with {episode.guest}
					</p>
				</div>
			</div>

			<span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
				Listen
				<Arrow />
			</span>
		</article>
	);
}

/**
 * "What's new": the homepage's one living section, a 2×2 ledger split on the
 * page's centre line. Big release number and event photo up top; this week's
 * module and the latest podcast below. Each cell reads the newest entry from
 * content the site already publishes.
 */
export function WhatsNewSection() {
	const release = BLOG_POSTS.filter((p) => p.tags.includes("Release")).sort(
		(a, b) => Date.parse(b.date) - Date.parse(a.date),
	)[0];
	const module = MODULES[0];
	const episode = EPISODES[0];
	const today = new Date().toISOString().slice(0, 10);
	const event = EVENTS.find((e) => e.ends > today);

	return (
		<section className="relative w-full py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className={EYEBROW}>// What's new</p>
				<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
					What's happening in Effect
				</h2>

				<div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
					{release && <ReleaseCell post={release} />}
					{event && <EventCell event={event} />}
					{module && <ModuleCell post={module} />}
					{episode && <PodcastCell episode={episode} />}
				</div>
			</div>
		</section>
	);
}
