import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import {
	AUTHORS,
	BLOG_POSTS,
	type BlogPost,
	getPostUrl,
} from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLCGIHlTAijhY";
const INTRO_POST_URL = "https://effect.website/blog/module-of-the-week/";

// Posts are newest first, so the oldest is entry 01
const MODULES = BLOG_POSTS.filter((p) => p.tags.includes("Module of the Week"));

/** Series counts for the list header. Derived from the posts. */
const PACKAGE_COUNT = new Set(MODULES.map((p) => p.packageName).filter(Boolean))
	.size;

/** The packages the series has covered, alphabetical. */
const PACKAGES = [
	...new Set(MODULES.flatMap((p) => (p.packageName ? [p.packageName] : []))),
].sort();

/** A module's number in the series: the oldest is 01. */
const entryOf = (post: BlogPost) => MODULES.length - MODULES.indexOf(post);

const DISCORD_HANDLE = "maxwellbrown";

/** Maxwell's name, then "Founding Engineer at Effectful Technologies". */
function RoleLine() {
	return (
		<div>
			<h3 className="text-lg leading-tight font-bold tracking-tight text-zinc-900 lg:text-2xl dark:text-white">
				{AUTHORS.maxwell.name}
			</h3>
			<p className="mt-1 text-sm font-semibold text-zinc-900 lg:mt-2 lg:text-base dark:text-white">
				Founding Engineer
				<span className="font-normal text-zinc-500 dark:text-zinc-400">
					{" "}
					at Effectful Technologies
				</span>
			</p>
		</div>
	);
}

/** Maxwell's profiles, one hairline cell each in the author card's fourth
 *  column. Discord has no public profile URL, so its cell copies the handle
 *  and confirms in place. */
function SocialCells() {
	const [copied, setCopied] = useState(false);
	const copyHandle = async () => {
		try {
			await navigator.clipboard.writeText(DISCORD_HANDLE);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			// Clipboard blocked: the handle stays visible in the cell
		}
	};
	const cell =
		"group col-span-6 flex flex-col justify-between gap-4 bg-white px-4 py-5 text-left sm:col-span-2 transition-colors hover:bg-zinc-100/60 lg:col-span-1 lg:col-start-4 lg:px-6 dark:bg-zinc-950 dark:hover:bg-zinc-900/60";
	const value =
		"flex items-center justify-between gap-2 font-mono text-sm text-zinc-900 dark:text-white";
	// Sentence case, sans: a way to get somewhere, not a mark
	const labelRow =
		"flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400";
	const trail =
		"text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white";
	return (
		<>
			{[
				{
					label: "GitHub",
					icon: "ri-github-fill",
					handle: "IMax153",
					place: "lg:row-start-1",
					href: AUTHORS.maxwell.url,
				},
				{
					label: "X.com",
					icon: "ri-twitter-x-fill",
					handle: "@maxwellbrown",
					place: "lg:row-start-2",
					href: "https://x.com/maxwellbrown",
				},
			].map((profile) => (
				<a
					key={profile.label}
					href={profile.href}
					target="_blank"
					rel="noopener noreferrer"
					className={`${cell} ${profile.place}`}
				>
					<span className={labelRow}>
						<i
							className={`${profile.icon} text-base leading-none`}
							aria-hidden="true"
						/>
						{profile.label}
					</span>
					<span className={value}>
						<span className="truncate">{profile.handle}</span>
						{/* Footer-sized arrow, in the label's grey; darkens on hover */}
						<Icon
							name="arrow-up-right"
							className="shrink-0 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white"
						/>
					</span>
				</a>
			))}
			<button
				type="button"
				onClick={copyHandle}
				aria-label={`Copy ${AUTHORS.maxwell.name}'s Discord handle, ${DISCORD_HANDLE}`}
				className={`${cell} cursor-pointer lg:row-start-3`}
			>
				<span className={labelRow}>
					<i
						className="ri-discord-fill text-base leading-none"
						aria-hidden="true"
					/>
					Discord
				</span>
				<span className={value}>
					<span className="truncate">{DISCORD_HANDLE}</span>
					<span
						aria-live="polite"
						className={`${trail} font-mono text-xs uppercase`}
					>
						{copied ? "Copied" : "Copy"}
					</span>
				</span>
			</button>
		</>
	);
}

/* Boxed mono label — the same chip as the Effect Days host card. */
const chip =
	"border border-zinc-400 bg-white px-2 py-0.5 dark:border-zinc-600 dark:bg-zinc-950";
const micro =
	"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";

/** Group header bar — sits on top of the grid it labels (as on /enterprise). */
const groupBar =
	"flex items-center justify-between gap-4 border border-zinc-200 bg-zinc-100/60 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/40";

/** Maxwell's talks and interviews elsewhere, newest first. */
const APPEARANCES = [
	{
		venue: "AWS Developers",
		title: "Production-ready AI agents with Effect & Amazon Bedrock",
		youtubeId: "iLa0d8WF-ng",
		duration: "56:33",
	},
	{
		venue: "devtools.fm",
		title: "Effect.ts and Effectful Technologies",
		youtubeId: "qYohvLtApmM",
		duration: "55:50",
	},
	{
		venue: "Effect Days 2025",
		title: "Building Effect-ive Agents",
		youtubeId: "pQA0fakReas",
		duration: "32:41",
	},
	{
		venue: "Effect Days 2024",
		title: "Advanced Effect workshop",
		youtubeId: "7jOD5okJC00",
		duration: "2:55:35",
	},
];

// "Module of the Week - Cluster, Part 2" → "Cluster, Part 2"
const moduleTitle = (post: BlogPost) =>
	post.title.replace(/^Module of the Week\s*-\s*/, "");

const videoUrl = (post: BlogPost) =>
	post.video ? `https://www.youtube.com/watch?v=${post.video.youtubeId}` : null;

/** Video thumbnail with the running time in its corner; links to YouTube. */
function ModuleThumbnail({ post }: { post: BlogPost }) {
	const url = videoUrl(post);
	if (!post.video || !url) return null;
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Watch ${moduleTitle(post)} on YouTube`}
			className="group relative block aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800"
		>
			<img
				src={`https://i.ytimg.com/vi/${post.video.youtubeId}/hqdefault.jpg`}
				alt=""
				loading="lazy"
				className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
			/>
			{/* Play mark + running time in the corner: reads as a video
			    without covering the title baked into the thumbnail */}
			<span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm bg-zinc-950/80 py-0.5 pr-1.5 pl-1 font-mono text-xs text-white tabular-nums transition-colors group-hover:bg-zinc-950">
				<i className="ri-play-fill text-sm leading-none" aria-hidden="true" />
				{post.video.duration}
			</span>
		</a>
	);
}

/** Entry number, then the package the module lives in. */
function ModuleMeta({ post, entry }: { post: BlogPost; entry: number }) {
	return (
		<div className="flex min-w-0 items-center gap-2 font-mono text-xs">
			<span className="shrink-0 font-medium text-zinc-900 dark:text-zinc-200 tabular-nums">
				{String(entry).padStart(2, "0")}
			</span>
			{post.packageName && (
				<>
					<span
						aria-hidden="true"
						className="h-3 w-px shrink-0 bg-zinc-300 dark:bg-zinc-700"
					/>
					<span className="truncate text-zinc-600 dark:text-zinc-400">
						from "{post.packageName}"
					</span>
				</>
			)}
		</div>
	);
}

/** The two formats side by side: the post to read, the video to watch. */
function ModuleLinks({
	post,
	className = "",
}: {
	post: BlogPost;
	className?: string;
}) {
	const url = videoUrl(post);
	const format = "inline-flex items-center gap-1.5 font-medium";
	return (
		<div
			className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${className}`}
		>
			<Link
				href={getPostUrl(post)}
				variant="subtle"
				target="_blank"
				rel="noopener noreferrer"
				className={format}
			>
				<Icon name="file-text" className="text-sm" />
				Read the blog post
			</Link>
			{url && post.video && (
				<Link
					href={url}
					variant="subtle"
					target="_blank"
					rel="noopener noreferrer"
					className={format}
				>
					<Icon name="circle-play" className="text-sm" />
					Watch
				</Link>
			)}
		</div>
	);
}

/** The newest module: one full-width cell, video left and copy right. */
function FeaturedModule({ post }: { post: BlogPost }) {
	const entry = entryOf(post);
	return (
		<li className="col-span-full grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:items-center md:gap-10 border border-zinc-200 bg-white transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
			<ModuleThumbnail post={post} />
			<div className="min-w-0">
				<div className="flex items-center gap-3">
					{entry === MODULES.length && (
						<span className={`${micro} ${chip} whitespace-nowrap`}>Latest</span>
					)}
					<ModuleMeta post={post} entry={entry} />
				</div>
				<h3 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
					{moduleTitle(post)}
				</h3>
				<p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
					{post.excerpt}
				</p>
				<ModuleLinks post={post} className="mt-6" />
			</div>
		</li>
	);
}

/** An earlier module: thumbnail on top, copy below, links settled at the foot. */
function ModuleCard({ post }: { post: BlogPost }) {
	const entry = entryOf(post);
	return (
		<li className="flex flex-col border border-zinc-200 p-4 pb-5 bg-white transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
			<ModuleThumbnail post={post} />
			{/* Rhythm: 20px from the video to the meta line, 12px to the
			    title, 8px to the summary, at least 24px before the links */}
			<div className="mt-5">
				<ModuleMeta post={post} entry={entry} />
			</div>
			<h3 className="mt-3 text-lg leading-snug font-semibold text-zinc-900 dark:text-white">
				{moduleTitle(post)}
			</h3>
			<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
				{post.excerpt}
			</p>
			<ModuleLinks post={post} className="mt-auto pt-6" />
		</li>
	);
}

/** Package filter (the Events page's tab control) over the module grid. */
function ModulesGrid() {
	const [pkg, setPkg] = useState<string>("All");
	const shown =
		pkg === "All" ? MODULES : MODULES.filter((p) => p.packageName === pkg);
	const [featured, ...earlier] = shown;
	return (
		<>
			<div className="mt-16 md:mt-20">
				<div
					role="group"
					aria-label="Filter by package"
					className="-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 md:mx-0 md:max-w-full md:px-0"
				>
					<div className="inline-flex gap-1 rounded-lg border border-zinc-200 bg-zinc-100/60 p-1 dark:border-zinc-800 dark:bg-zinc-900/50">
						{["All", ...PACKAGES].map((option) => (
							<button
								key={option}
								type="button"
								aria-pressed={pkg === option}
								onClick={() => setPkg(option)}
								className={`cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
									pkg === option
										? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
										: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
								}`}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Spaced card grid (as the Effect Days speakers): the newest module
			    a full-width card, earlier ones two across (their thumbnails as
			    wide as the featured one's) with room between
			    them so each thumbnail reads on its own. */}
			<ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				{featured && <FeaturedModule key={featured.slug} post={featured} />}
				{earlier.map((post) => (
					<ModuleCard key={post.slug} post={post} />
				))}
			</ul>
		</>
	);
}

export function ModuleOfTheWeekPage() {
	return (
		<div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white antialiased">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-200 dark:bg-zinc-800 px-6 py-4 font-semibold text-zinc-900 dark:text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/module-of-the-week" />
			<GridOverlay />

			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] hidden dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>

			{/* Vertical border lines */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed (as on /enterprise and /podcast).
			    It runs down the gap between the two module columns. */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800"
						style={{
							width: "1px",
							maskImage:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							WebkitMaskImage:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative w-full pt-16">
				{/* Header */}
				<section className="relative overflow-hidden">
					{/* Grid background. The y-phase puts a horizontal line on the
					    H1's first-line baseline: 132px from the section top on
					    phones, 173px from md up (measured). */}
					<div
						className="pointer-events-none absolute inset-0 [--grid-y:132px] md:[--grid-y:173px]"
						style={{
							backgroundImage: `
								linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
								linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
							`,
							backgroundSize: "196.667px 178px",
							backgroundPosition: "calc(50% + 98.333px) var(--grid-y)",
						}}
					/>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, var(--page-fade) 0%, transparent 30%, transparent 50%, var(--page-fade) 100%)",
						}}
					/>

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-16 pb-16 md:pt-24">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Module of the Week
						</p>
						<h1 className="leading-[1.1] text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
							One Effect module, every week
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
							The lesser-known parts of Effect, explained in a blog post and a
							video.
						</p>
						<div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
							<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
								<Button
									href={PLAYLIST_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="ri-youtube-fill text-base" />
									Watch the playlist
								</Button>
								<Link
									href={INTRO_POST_URL}
									variant="subtle"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm font-medium"
								>
									About the series
									<Icon name="arrow-up-right" className="text-xs" />
								</Link>
							</div>

							{/* The series at a glance */}
							<dl className="grid grid-cols-2 gap-px border border-zinc-200 bg-zinc-200 lg:w-96 dark:border-zinc-800 dark:bg-zinc-800">
								{[
									{ label: "Modules", value: MODULES.length },
									{ label: "Packages", value: PACKAGE_COUNT },
								].map((fact) => (
									<div
										key={fact.label}
										className="flex flex-col gap-1 bg-white px-4 py-4 lg:px-6 dark:bg-zinc-950"
									>
										<dt className={micro}>{fact.label}</dt>
										<dd className="font-mono text-lg font-semibold text-zinc-900 tabular-nums dark:text-white">
											{String(fact.value).padStart(2, "0")}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Modules */}
				<section aria-label="Modules" className="pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<ModulesGrid />
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Author — a four-column hairline grid: the portrait, the bio
				    across the middle two columns, and the profiles stacked in the
				    fourth. On phones the profiles sit in a row under the bio. The
				    talks hang off the bottom as a labelled row. */}
				<section aria-labelledby="author-title" className="py-24 md:pt-40">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<h2
							id="author-title"
							className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400"
						>
							// Behind the series
						</h2>

						<div className="mt-6 grid grid-cols-6 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-4 lg:grid-rows-3 dark:border-zinc-800 dark:bg-zinc-800">
							{/* Portrait: a fixed 4:5 at every size, cropped from the square
							    source. From lg it sets the card's height; on phones it
							    sits beside the role, the bio running full width below. */}
							<div className="col-span-2 self-start bg-white lg:col-span-1 lg:row-span-3 dark:bg-zinc-950">
								<img
									src={getAssetPath(AUTHORS.maxwell.avatar)}
									alt={AUTHORS.maxwell.name}
									className="block aspect-4/5 w-full object-cover opacity-80"
								/>
							</div>

							{/* Name and role. On phones beside the portrait, settled at its
							    foot; from lg the first row of the middle columns, level
							    with GitHub, so the grid's own hairline divides it from
							    the bio. */}
							<div className="col-span-4 flex items-end bg-white p-4 lg:col-span-2 lg:items-start lg:px-6 lg:py-5 dark:bg-zinc-950">
								<RoleLine />
							</div>

							{/* Bio, settled at the foot of the remaining two rows, level
							    with the photo's bottom edge. Two short paragraphs: who
							    Maxwell is, then how a module is made. */}
							<div className="col-span-6 flex flex-col justify-end bg-white p-4 lg:col-span-2 lg:row-span-2 lg:p-6 lg:pr-10 dark:bg-zinc-950">
								<div className="max-w-xl space-y-3 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
									<p>
										Maxwell is a core contributor to Effect, with work across
										Effect Cluster, the Effect CLI, and Effect AI, and runs
										Effect Office Hours.
									</p>
									<p>
										In this series, each module is written up as a blog post
										first, then walked through live at Office Hours, before it's
										cut into a standalone video.
									</p>
								</div>
							</div>

							{/* Profiles, stacked in the fourth column */}
							<SocialCells />
						</div>

						{/* Talks & appearances — a labelled grid, one video per cell */}
						<div className={`${groupBar} border-t-0`}>
							<h3 className={micro}>// Talks & appearances</h3>
						</div>
						<ul className="grid grid-cols-1 gap-px border border-t-0 border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
							{APPEARANCES.map((item) => (
								<li key={item.youtubeId} className="bg-white dark:bg-zinc-950">
									<a
										href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex h-full flex-col p-4 transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
									>
										<span className={micro}>{item.venue}</span>
										<span className="mt-2 text-base leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
											{item.title}
										</span>
										{/* Thumbnail settled at the foot, so all four line up
										    whatever the title's length */}
										<div className="mt-auto pt-6">
											<div className="relative aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800">
												<img
													src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
													alt=""
													loading="lazy"
													className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
												/>
												<span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm bg-zinc-950/80 py-0.5 pr-1.5 pl-1 font-mono text-xs text-white tabular-nums transition-colors group-hover:bg-zinc-950">
													<i
														className="ri-play-fill text-sm leading-none"
														aria-hidden="true"
													/>
													{item.duration}
												</span>
											</div>
										</div>
									</a>
								</li>
							))}
						</ul>
					</div>
				</section>
			</main>

			<Footer activePath="/module-of-the-week" />
		</div>
	);
}
