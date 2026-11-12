import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { type BlogPost, getPostUrl } from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import {
	entryOf,
	MODULES,
	MOTW_URL,
	moduleTitle,
	videoUrl,
} from "./moduleOfTheWeek";

/** Latest module plus the three before it. */
const [LATEST, ...EARLIER] = MODULES.slice(0, 4);

const entryNumber = (post: BlogPost) => String(entryOf(post)).padStart(2, "0");

/** Kind badge, verbatim from the styleguide. */
const BADGE =
	"rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";

const MUTED_LINK =
	"group/link relative z-10 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white";
const ARROW =
	"text-sm transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none";

/** "Blog post ↗" — leaves the site, so it takes the up-right arrow. */
function PostLink({ post }: { post: BlogPost }) {
	return (
		<a
			href={getPostUrl(post)}
			target="_blank"
			rel="noopener noreferrer"
			className={MUTED_LINK}
		>
			Blog post
			<Icon name="arrow-up-right" className={ARROW} />
		</a>
	);
}

/**
 * The featured cell: the newest module, given room to sell itself — a
 * "Latest" badge, its number set large as a display mark, a bigger title,
 * and a real button to watch it with the running time on it.
 */
function LatestModule({ post }: { post: BlogPost }) {
	const video = videoUrl(post);
	return (
		<article className="group relative flex min-w-0 flex-col bg-white px-5 py-6 lg:px-8 lg:py-8 dark:bg-zinc-950">
			<div className="flex items-center justify-between gap-4">
				<span className={`${BADGE} inline-flex items-center gap-2`}>
					<span className="relative flex size-1.5" aria-hidden="true">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:animate-none" />
						<span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
					</span>
					Latest
				</span>
				<time className="font-mono text-xs whitespace-nowrap text-zinc-500 tabular-nums dark:text-zinc-400">
					{post.date}
				</time>
			</div>

			{/* Display number: a mark, not text to read — screen readers get
			    the title instead. Brightens a step on hover. */}
			<span
				aria-hidden="true"
				className="mt-8 font-mono text-6xl leading-none font-semibold tracking-tight text-zinc-200 tabular-nums transition-colors duration-300 group-hover:text-zinc-300 md:text-7xl dark:text-zinc-800 dark:group-hover:text-zinc-700"
			>
				{entryNumber(post)}
			</span>

			<div className="mt-6">
				{post.packageName && (
					<p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
						from "{post.packageName}"
					</p>
				)}
				<h3 className="mt-2 text-2xl leading-snug font-semibold text-balance text-zinc-900 md:text-3xl dark:text-white">
					{moduleTitle(post)}
				</h3>
				<p className="mt-3 max-w-xl text-base leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
					{post.excerpt}
				</p>
			</div>

			<div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
				{video && post.video && (
					<Button
						href={video}
						target="_blank"
						rel="noopener noreferrer"
						variant="primary"
						size="md"
					>
						<i className="ri-play-fill text-base" aria-hidden="true" />
						Watch
						<span className="font-mono text-xs tabular-nums opacity-60">
							{post.video.duration}
						</span>
					</Button>
				)}
				<PostLink post={post} />
			</div>
		</article>
	);
}

/**
 * An earlier module: the whole row opens the video (the title's link
 * stretches over the cell), with the blog post link lifted above it.
 */
function EarlierModule({ post }: { post: BlogPost }) {
	const video = videoUrl(post);
	const title = moduleTitle(post);
	return (
		<article className="group relative flex flex-col justify-between gap-2 bg-white px-5 py-5 transition-colors hover:bg-zinc-50 lg:px-6 dark:bg-zinc-950 dark:hover:bg-zinc-900/60">
			<div className="flex items-baseline justify-between gap-4">
				<div className="flex min-w-0 items-baseline gap-3">
					<span className="shrink-0 font-mono text-xs font-medium text-zinc-500 tabular-nums dark:text-zinc-400">
						{entryNumber(post)}
					</span>
					{post.packageName && (
						<span className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
							from "{post.packageName}"
						</span>
					)}
				</div>
				<time className="shrink-0 font-mono text-xs whitespace-nowrap text-zinc-500 tabular-nums dark:text-zinc-400">
					{post.date}
				</time>
			</div>

			<h3 className="text-base leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
				{video ? (
					<a
						href={video}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Watch ${title} on YouTube`}
						className="inline-flex items-center gap-1.5 after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400"
					>
						{title}
						<Icon
							name="arrow-right"
							aria-hidden="true"
							className="text-sm text-zinc-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none dark:text-zinc-500"
						/>
					</a>
				) : (
					title
				)}
			</h3>

			<div className="flex items-center gap-4">
				{post.video && (
					<span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 tabular-nums transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
						<i
							className="ri-play-fill text-sm leading-none"
							aria-hidden="true"
						/>
						{post.video.duration}
					</span>
				)}
				<PostLink post={post} />
			</div>
		</article>
	);
}

/**
 * Module of the Week on the homepage: one hairline ledger split on the page's
 * centre line. The latest module fills the left half as the feature; the
 * three before it stack on the right and share its height, so both halves
 * end on the same line.
 */
export function ModuleOfTheWeekSection() {
	if (!LATEST) return null;
	return (
		<section className="relative w-full py-24 md:pt-40 md:pb-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Module of the Week
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
							One Effect module, every week
						</h2>
					</div>
					<Button
						href={getAssetPath(MOTW_URL)}
						variant="secondary"
						size="md"
						className="self-start lg:self-auto"
					>
						All modules
						<Icon name="arrow-right" className="text-base" />
					</Button>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
					<LatestModule post={LATEST} />
					<div className="grid min-w-0 grid-cols-1 gap-px bg-zinc-200 lg:grid-rows-3 dark:bg-zinc-800">
						{EARLIER.map((post) => (
							<EarlierModule key={post.slug} post={post} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
