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

/* Earlier modules fill a two-across grid (sm) and a four-across grid (lg)
   under the featured one. Empty cells pad each layout's last row so the
   hairlines stay closed; each filler shows only where it's needed. */
const EARLIER_COUNT = MODULES.length - 1;
const SM_FILL = EARLIER_COUNT % 2;
const LG_FILL = (4 - (EARLIER_COUNT % 4)) % 4;
const FILLER_CELLS = Array.from(
	{ length: Math.max(SM_FILL, LG_FILL) },
	(_, n) => ({
		key: `filler-${n}`,
		className: `${n < SM_FILL ? "sm:block" : ""} ${n < LG_FILL ? "lg:block" : "lg:hidden"}`,
	}),
);

const DISCORD_HANDLE = "maxwellbrown";

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
		"group col-span-6 flex flex-col justify-end gap-1 bg-white px-4 py-5 text-left sm:col-span-2 transition-colors hover:bg-zinc-100/60 lg:col-span-1 lg:px-6 dark:bg-zinc-950 dark:hover:bg-zinc-900/60";
	const value =
		"flex items-center justify-between gap-2 font-mono text-sm text-zinc-900 dark:text-white";
	const labelRow = `${micro} flex items-center gap-2`;
	const trail =
		"text-xs text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white";
	return (
		<>
			{[
				{
					label: "GitHub",
					icon: "ri-github-fill",
					handle: "IMax153",
					href: AUTHORS.maxwell.url,
				},
				{
					label: "X.com",
					icon: "ri-twitter-x-fill",
					handle: "@maxwellbrown",
					href: "https://x.com/maxwellbrown",
				},
			].map((profile) => (
				<a
					key={profile.label}
					href={profile.href}
					target="_blank"
					rel="noopener noreferrer"
					className={cell}
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
						<Icon name="arrow-up-right" className={trail} />
					</span>
				</a>
			))}
			<button
				type="button"
				onClick={copyHandle}
				aria-label={`Copy ${AUTHORS.maxwell.name}'s Discord handle, ${DISCORD_HANDLE}`}
				className={`${cell} cursor-pointer`}
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
					<span aria-live="polite" className={`${trail} font-mono uppercase`}>
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
			<span className="absolute right-2 bottom-2 rounded-sm bg-zinc-950/80 px-1.5 py-0.5 font-mono text-xs text-white tabular-nums">
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

/** "Read the post" and "Watch the video", with the date trailing. */
function ModuleLinks({
	post,
	className = "",
}: {
	post: BlogPost;
	className?: string;
}) {
	const url = videoUrl(post);
	return (
		<div
			className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${className}`}
		>
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
			{url && (
				<Link
					href={url}
					variant="subtle"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 font-medium"
				>
					Watch the video
					<Icon name="arrow-up-right" className="text-xs" />
				</Link>
			)}
		</div>
	);
}

/** The newest module: one full-width cell, video left and copy right. */
function FeaturedModule({ post, entry }: { post: BlogPost; entry: number }) {
	return (
		<li className="col-span-full grid grid-cols-1 gap-6 bg-white p-4 md:grid-cols-2 md:items-center md:gap-10 dark:bg-zinc-950">
			<ModuleThumbnail post={post} />
			<div className="min-w-0">
				<div className="flex items-center gap-3">
					<span className={`${micro} ${chip} whitespace-nowrap`}>Latest</span>
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
function ModuleCard({ post, entry }: { post: BlogPost; entry: number }) {
	return (
		<li className="flex flex-col bg-white p-4 dark:bg-zinc-950">
			<ModuleThumbnail post={post} />
			<div className="mt-4">
				<ModuleMeta post={post} entry={entry} />
			</div>
			<h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
				{moduleTitle(post)}
			</h3>
			<p className="mt-1 line-clamp-3 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
				{post.excerpt}
			</p>
			<ModuleLinks post={post} className="mt-auto pt-5" />
		</li>
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
				<section aria-labelledby="modules-title" className="pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<h2
							id="modules-title"
							className="mt-16 text-2xl font-bold tracking-tight text-zinc-900 md:mt-20 dark:text-white"
						>
							All modules
						</h2>

						{/* The newest module across the full width, earlier ones
						    four across. Empty cells pad the last row so the hairlines
						    stay closed. */}
						<ul className="mt-8 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
							{MODULES.map((post, i) =>
								i === 0 ? (
									<FeaturedModule
										key={post.slug}
										post={post}
										entry={MODULES.length}
									/>
								) : (
									<ModuleCard
										key={post.slug}
										post={post}
										entry={MODULES.length - i}
									/>
								),
							)}
							{FILLER_CELLS.map((cell) => (
								<li
									key={cell.key}
									aria-hidden="true"
									className={`hidden bg-white dark:bg-zinc-950 ${cell.className}`}
								/>
							))}
						</ul>
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Author — a four-column hairline grid: the portrait, the bio
				    across the middle two columns, and the profiles stacked in the
				    fourth. On phones the profiles sit in a row under the bio. The
				    talks hang off the bottom as a labelled row. */}
				<section aria-labelledby="author-title" className="py-24 md:pt-40">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Behind the series
						</p>
						<h2
							id="author-title"
							className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
						>
							{AUTHORS.maxwell.name}
						</h2>

						<div className="mt-12 grid grid-cols-6 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
							{/* Portrait */}
							<div className="relative col-span-2 overflow-hidden bg-white lg:col-span-1 lg:row-span-3 dark:bg-zinc-950">
								<img
									src={getAssetPath(AUTHORS.maxwell.avatar)}
									alt={AUTHORS.maxwell.name}
									className="absolute inset-0 h-full w-full object-cover opacity-80"
								/>
								<div className="aspect-4/5" />
							</div>

							{/* Role and bio */}
							<div className="col-span-4 flex flex-col bg-white p-4 lg:col-span-2 lg:row-span-3 lg:p-6 dark:bg-zinc-950">
								{/* Role and company, set just above the bio at the cell's foot */}
								<p className="mt-auto text-base font-semibold text-zinc-900 dark:text-white">
									Founding Engineer
									<span className="font-normal text-zinc-500 dark:text-zinc-400">
										{" "}
										at Effectful Technologies
									</span>
								</p>
								<p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base lg:max-w-2xl dark:text-zinc-400">
									Maxwell is a core contributor to Effect, with work across
									Effect Cluster, the Effect CLI, and Effect AI, and runs Effect
									Office Hours. Each module is written up as a blog post first,
									then walked through live at Office Hours, before it's cut into
									a standalone video.
								</p>
							</div>

							{/* Profiles, stacked in the fourth column */}
							<SocialCells />
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
