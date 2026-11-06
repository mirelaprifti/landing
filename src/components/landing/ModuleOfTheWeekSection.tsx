import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { type BlogPost, getPostUrl } from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import {
	entryOf,
	MODULES,
	MOTW_URL,
	ModuleThumbnail,
	moduleTitle,
	videoUrl,
} from "./moduleOfTheWeek";

/** Latest module plus the four before it. */
const [LATEST, ...EARLIER] = MODULES.slice(0, 5);

/** Number and package on the left, date on the right: the same line on top
 *  of every cell, as on the series page. */
function MetaRow({ post }: { post: BlogPost }) {
	return (
		<div className="flex items-baseline justify-between gap-4">
			<div className="flex min-w-0 items-baseline gap-3">
				<span className="shrink-0 font-mono text-xs font-medium text-zinc-500 tabular-nums dark:text-zinc-400">
					{String(entryOf(post)).padStart(2, "0")}
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
	);
}

/** Video and post, the same pair at the foot of every cell. Both leave the
 *  site, so both take the up-right arrow. */
function ModuleLinks({ post }: { post: BlogPost }) {
	const link =
		"group/link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white";
	const arrow =
		"text-sm transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5";
	const video = videoUrl(post);
	return (
		<div className="flex items-center gap-5">
			{video && (
				<a
					href={video}
					target="_blank"
					rel="noopener noreferrer"
					className={link}
				>
					<i
						className="ri-youtube-fill text-base leading-none"
						aria-hidden="true"
					/>
					Video
					<Icon name="arrow-up-right" className={arrow} />
				</a>
			)}
			<a
				href={getPostUrl(post)}
				target="_blank"
				rel="noopener noreferrer"
				className={link}
			>
				<Icon name="file-text" className="text-base" />
				Blog post
				<Icon name="arrow-up-right" className={arrow} />
			</a>
		</div>
	);
}

/**
 * Module of the Week on the homepage: one hairline ledger split on the page's
 * centre line. The latest module fills the left half, video on top; the four
 * before it stack on the right and share its height, so both halves end on
 * the same line. Every cell reads the same way: meta, title, links.
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
						<p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
							The lesser-known parts of Effect, written up, walked through live,
							and cut into a video.
						</p>
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
					{/* Latest module */}
					<article className="flex min-w-0 flex-col bg-white dark:bg-zinc-950">
						<ModuleThumbnail post={LATEST} flush />
						<div className="flex flex-1 flex-col gap-4 border-t border-zinc-200 px-5 py-5 lg:px-6 dark:border-zinc-800">
							<MetaRow post={LATEST} />
							<div>
								<h3 className="text-lg leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
									{moduleTitle(LATEST)}
								</h3>
								<p className="mt-2 text-base leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
									{LATEST.excerpt}
								</p>
							</div>
							<div className="mt-auto pt-2">
								<ModuleLinks post={LATEST} />
							</div>
						</div>
					</article>

					{/* The four before it */}
					<div className="grid min-w-0 grid-cols-1 gap-px bg-zinc-200 lg:grid-rows-4 dark:bg-zinc-800">
						{EARLIER.map((post) => (
							<article
								key={post.slug}
								className="flex flex-col justify-between gap-3 bg-white px-5 py-5 lg:px-6 dark:bg-zinc-950"
							>
								<MetaRow post={post} />
								<h3 className="text-lg leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
									{moduleTitle(post)}
								</h3>
								<ModuleLinks post={post} />
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
