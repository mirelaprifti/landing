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

/** The series at a glance, under the author card. Counts derive from the posts. */
const SERIES_FACTS = [
	{ label: "Modules", value: String(MODULES.length).padStart(2, "0") },
	{
		label: "Packages",
		value: String(
			new Set(MODULES.map((p) => p.packageName).filter(Boolean)).size,
		).padStart(2, "0"),
	},
];

/* Boxed mono label — the same chip as the Effect Days host card. */
const chip =
	"border border-zinc-400 bg-white px-2 py-0.5 dark:border-zinc-600 dark:bg-zinc-950";
const micro =
	"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";

/** Group header bar — sits on top of the grid it labels (as on /enterprise). */
const groupBar =
	"flex items-center justify-between gap-4 border border-zinc-200 bg-zinc-100/60 px-4 py-2.5 lg:px-6 dark:border-zinc-800 dark:bg-zinc-900/40";

/** Maxwell's talks and interviews elsewhere, newest first. */
const APPEARANCES = [
	{
		venue: "AWS Developers",
		title: "Build production-ready AI agents with Effect & Amazon Bedrock",
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

function ModuleRow({ post, entry }: { post: BlogPost; entry: number }) {
	// "Module of the Week - Cluster, Part 2" → "Cluster, Part 2"
	const title = post.title.replace(/^Module of the Week\s*-\s*/, "");
	const videoUrl = post.video
		? `https://www.youtube.com/watch?v=${post.video.youtubeId}`
		: null;

	return (
		<article className="grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:items-center md:gap-10">
			{/* Video thumbnail */}
			{post.video && videoUrl && (
				<a
					href={videoUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Watch ${title} on YouTube`}
					className="group relative block aspect-video overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 md:col-span-5"
				>
					<img
						src={`https://i.ytimg.com/vi/${post.video.youtubeId}/hqdefault.jpg`}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					/>
					<span className="absolute right-2 bottom-2 rounded-sm bg-zinc-950/80 px-1.5 py-0.5 font-mono text-xs text-white tabular-nums">
						{post.video.duration}
					</span>
				</a>
			)}

			{/* Text */}
			<div className="min-w-0 md:col-span-7">
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

				<h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
					{title}
				</h2>
				<p className="mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
					{post.excerpt}
				</p>

				<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
					<Link
						href={getPostUrl(post)}
						variant="subtle"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 font-medium"
					>
						Read the post
						<Icon name="arrow-up-right" className="text-xs" />
					</Link>
					{videoUrl && (
						<Link
							href={videoUrl}
							variant="subtle"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 font-medium"
						>
							Watch the video
							<Icon name="arrow-up-right" className="text-xs" />
						</Link>
					)}
					<time className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
						{post.date}
					</time>
				</div>
			</div>
		</article>
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

			<main id="main-content" className="relative w-full pt-16">
				{/* Header */}
				<section className="relative overflow-hidden">
					{/* Grid background */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
								linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
							`,
							backgroundSize: "196.667px 178px",
							backgroundPosition: "calc(50% + 98.333px) 64px",
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
						<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
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
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Modules */}
				<section aria-label="Modules" className="pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="divide-y divide-zinc-200 dark:divide-zinc-800">
							{MODULES.map((post, i) => (
								<ModuleRow
									key={post.slug}
									post={post}
									entry={MODULES.length - i}
								/>
							))}
						</div>
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Author — a four-column hairline grid: the portrait, the bio
				    across the middle two columns, and the series facts stacked in
				    the fourth. On phones the portrait and bio sit side by side,
				    the facts in a row beneath. */}
				<section aria-labelledby="author-title" className="py-24 md:pt-40">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Written by
						</p>
						<h2
							id="author-title"
							className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
						>
							Your guide through the modules
						</h2>

						<div className="mt-12 grid grid-cols-6 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
							{/* Portrait, name and X set into its foot on a dark scrim */}
							<div className="relative col-span-2 overflow-hidden bg-white lg:col-span-1 lg:row-span-2 dark:bg-zinc-950">
								<img
									src={getAssetPath(AUTHORS.maxwell.avatar)}
									alt={AUTHORS.maxwell.name}
									className="absolute inset-0 h-full w-full object-cover opacity-80"
								/>
								<div className="aspect-4/5" />
								<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 pt-12 lg:p-4 lg:pt-16">
									<h3 className="text-base leading-[1.1] font-semibold text-white lg:text-lg lg:leading-[1.1]">
										{AUTHORS.maxwell.name}
									</h3>
									<div className="flex items-center justify-between gap-2">
										<p className="text-xs leading-normal text-zinc-300 lg:text-sm">
											Effectful Technologies
										</p>
										<Link
											href="https://x.com/imax153"
											variant="icon"
											aria-label={`${AUTHORS.maxwell.name} on X`}
											className="shrink-0 text-zinc-300 hover:text-white"
										>
											<i
												className="ri-twitter-x-fill text-base"
												aria-hidden="true"
											/>
										</Link>
									</div>
								</div>
							</div>

							{/* Role and bio */}
							<div className="col-span-4 flex flex-col bg-white p-4 lg:col-span-2 lg:row-span-2 lg:p-6 dark:bg-zinc-950">
								<span
									className={`${micro} ${chip} self-start whitespace-nowrap`}
								>
									Founding Engineer
								</span>
								<p className="mt-auto pt-4 text-sm leading-relaxed text-zinc-600 md:text-base lg:max-w-2xl dark:text-zinc-400">
									Maxwell is a core contributor to Effect, with work across
									Effect Cluster, the Effect CLI, and Effect AI. Maxwell also
									runs Effect Office Hours, where every module in this series
									starts as a live session before it becomes a post and a
									video.
								</p>
								<Link
									href={AUTHORS.maxwell.url}
									variant="subtle"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium"
								>
									GitHub
									<Icon name="arrow-up-right" className="text-xs" />
								</Link>
							</div>

							{/* The series at a glance */}
							{SERIES_FACTS.map((fact) => (
								<div
									key={fact.label}
									className="col-span-3 flex flex-col gap-1 bg-white px-4 py-5 lg:col-span-1 lg:justify-end lg:px-6 lg:py-6 dark:bg-zinc-950"
								>
									<span className={micro}>{fact.label}</span>
									<span className="font-mono text-lg font-semibold text-zinc-900 tabular-nums dark:text-white">
										{fact.value}
									</span>
								</div>
							))}
						</div>

						{/* Talks & appearances — a labelled grid, one video per cell */}
						<div className={`${groupBar} border-t-0`}>
							<h3 className={micro}>Talks & appearances</h3>
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
										<div className="relative aspect-video overflow-hidden border border-zinc-200 dark:border-zinc-800">
											<img
												src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
												alt=""
												loading="lazy"
												className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
											/>
											<span className="absolute right-2 bottom-2 rounded-sm bg-zinc-950/80 px-1.5 py-0.5 font-mono text-xs text-white tabular-nums">
												{item.duration}
											</span>
										</div>
										<span className={`${micro} mt-4`}>{item.venue}</span>
										<span className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
											{item.title}
										</span>
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
