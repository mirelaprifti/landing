import { useState } from "react";
import { Button } from "@/components/ui";
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
const CHANNEL_SUBSCRIBE_URL =
	"https://www.youtube.com/channel/UC8wNHsXmEuoikbwRdLeoJQg?sub_confirmation=1";
const DISCORD_URL = "https://discord.gg/effect-ts";
const BLOG_CATEGORY_URL =
	"https://effect.website/blog?category=module-of-the-week#blog-grid";

// Posts are newest first, so the oldest is entry 01
const MODULES = BLOG_POSTS.filter((p) => p.tags.includes("Module of the Week"));

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
					<span className="truncate">@{DISCORD_HANDLE}</span>
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

const micro =
	"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";

/** Group header bar — sits on top of the grid it labels (as on /enterprise). */
const groupBar =
	"flex items-center justify-between gap-4 border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950";

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
function ModuleThumbnail({
	post,
	flush = false,
}: {
	post: BlogPost;
	/** Fill the cell edge to edge, without its own border. */
	flush?: boolean;
}) {
	const url = videoUrl(post);
	if (!post.video || !url) return null;
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Watch ${moduleTitle(post)} on YouTube`}
			className={`group relative block aspect-video overflow-hidden ${flush ? "h-full w-full" : "border border-zinc-200 dark:border-zinc-800"}`}
		>
			<img
				// sddefault (640px) is the largest these videos have; no maxres
				src={`https://i.ytimg.com/vi/${post.video.youtubeId}/sddefault.jpg`}
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

/** One module per block on a 12-column hairline frame: the video (5/12)
 *  and the blog post (7/12), which carries the title, over a slim footer row
 *  (number left, package right). */
function ModuleRow({ post }: { post: BlogPost }) {
	const entry = entryOf(post);
	return (
		<li className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 lg:grid-cols-12 dark:border-zinc-800 dark:bg-zinc-800">
			{/* Top row across the block: number and package on the left, the
			    post's date on the right */}
			<div className="flex items-baseline justify-between gap-4 bg-white px-5 py-3 md:col-span-2 lg:col-span-12 lg:px-6 dark:bg-zinc-950">
				<div className="flex min-w-0 items-baseline gap-3">
					<span className="shrink-0 font-mono text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
						{String(entry).padStart(2, "0")}
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

			{/* Video: the thumbnail alone, edge to edge. The ▶ running-time
			    badge says "video", so it needs no label of its own. */}
			<div className="bg-white lg:col-span-5 dark:bg-zinc-950">
				<ModuleThumbnail post={post} flush />
			</div>

			{/* Blog post: the title and summary settled together above the
			    "Read the post" bar. The title
			    lives here because the post is the module's main read. The
			    whole cell links to the post. */}
			<a
				href={getPostUrl(post)}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex flex-col bg-white transition-colors hover:bg-zinc-100/60 lg:col-span-7 dark:bg-zinc-950 dark:hover:bg-zinc-900/60"
			>
				<div className="flex flex-1 flex-col gap-4 p-5 lg:px-6">
					<div className="mt-auto">
						<h3 className="text-lg leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
							{moduleTitle(post)}
						</h3>
						<p className="mt-1 text-base leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
							{post.excerpt}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between gap-2 border-t border-zinc-200 px-5 py-4 lg:px-6 dark:border-zinc-800">
					<span className="text-sm font-semibold text-zinc-900 dark:text-white">
						Read the post
					</span>
					<Icon
						name="arrow-up-right"
						className="text-base text-zinc-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white"
					/>
				</div>
			</a>
		</li>
	);
}

/** The modules as a single column, newest first, one module per card with
 *  room between them, so there's one obvious order to scroll in. (A package
 *  filter sat above this; removed until the series is long enough to need
 *  one, and then by topic rather than import path.) */
function ModulesList() {
	return (
		<ul className="mt-16 flex flex-col gap-6 md:mt-20">
			{MODULES.map((post) => (
				<ModuleRow key={post.slug} post={post} />
			))}
		</ul>
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

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-16 pb-16 md:pt-24 md:pb-20">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Module of the Week
						</p>
						<h1 className="leading-[1.1] text-3xl font-bold tracking-tight text-balance text-zinc-900 md:text-4xl dark:text-white">
							The lesser-known parts of Effect, by Maxwell Brown.
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
							Each module starts as a blog post, gets walked through live at
							Effect Office Hours, and ends up as a standalone video.
						</p>
						{/* The post leads: the newest module's post as the primary
						    action, the playlist beside it */}
						<div className="mt-8 flex flex-wrap items-center gap-3">
							{MODULES[0] && (
								<Button
									href={getPostUrl(MODULES[0])}
									variant="primary"
									size="lg"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon name="file-text" className="text-lg" />
									Read the latest
								</Button>
							)}
							<Button
								href={PLAYLIST_URL}
								variant="secondary"
								size="lg"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="ri-youtube-fill text-lg" />
								Watch the playlist
							</Button>
							<a
								href={INTRO_POST_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 sm:ml-2 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
							>
								About the series
								<Icon name="arrow-up-right" className="text-sm" />
							</a>
						</div>
					</div>
				</section>

				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Modules */}
				<section aria-label="Modules" className="pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<ModulesList />
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
													src={`https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`}
													alt=""
													loading="lazy"
													className="h-full w-full object-cover opacity-50 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
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
				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				{/* Follow the series: the three places a new module lands, as
				    hairline cells built like Maxwell's profile cells */}
				<section aria-labelledby="follow-title" className="py-24 md:pt-32">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Follow the series
						</p>
						<h2
							id="follow-title"
							className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
						>
							Never miss a module
						</h2>
						<ul className="mt-10 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
							{[
								{
									icon: "ri-youtube-fill",
									label: "YouTube",
									action: "Subscribe to the channel",
									href: CHANNEL_SUBSCRIBE_URL,
								},
								{
									icon: "ri-discord-fill",
									label: "Office Hours",
									action: "Join live on Discord",
									href: DISCORD_URL,
								},
								{
									icon: "ri-article-line",
									label: "Blog",
									action: "Read every post",
									href: BLOG_CATEGORY_URL,
								},
							].map((item) => (
								<li key={item.label} className="bg-white dark:bg-zinc-950">
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex h-full flex-col justify-between gap-6 px-4 py-5 transition-colors hover:bg-zinc-100/60 lg:px-6 dark:hover:bg-zinc-900/60"
									>
										<span className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
											<i
												className={`${item.icon} text-base leading-none`}
												aria-hidden="true"
											/>
											{item.label}
										</span>
										<span className="flex items-center justify-between gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
											{item.action}
											<Icon
												name="arrow-up-right"
												className="shrink-0 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white"
											/>
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
