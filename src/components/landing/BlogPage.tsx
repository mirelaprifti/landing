import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	AUTHORS,
	BLOG_POSTS,
	BLOG_TAGS,
	type BlogPost,
	type BlogTag,
	getPostUrl,
} from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import { Link } from "@/components/ui";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const POSTS_PER_PAGE = 12;

// React-idiomatic avatar with fallback to initials on load error
function AvatarWithFallback({
	src,
	alt,
	className,
}: { src: string; alt: string; className: string }) {
	const [failed, setFailed] = useState(false);
	if (failed) {
		return (
			<div
				className={className}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#27272a",
					color: "#a1a1aa",
					fontSize: "0.6em",
					fontWeight: 600,
				}}
			>
				{(alt || "?").charAt(0).toUpperCase()}
			</div>
		);
	}
	return (
		<img
			src={src}
			alt={alt}
			onError={() => setFailed(true)}
			className={className}
		/>
	);
}

// Tag color mapping -- distinct hues per category for visual scanning
const TAG_COLORS: Record<string, string> = {
	Release: "#22c55e", // green
	Effect: "#818cf8", // indigo
	"This Week In Effect": "#a78bfa", // violet-400 (WCAG AA)
	"Cause & Effect": "#f472b6", // pink
	"Effect Schema": "#06b6d4", // cyan
	"Effect Playground": "#c4b5fd", // violet-300 (differentiate from TWIE)
	"Effect Website": "#fb923c", // orange
	TypeScript: "#3b82f6", // blue
	Miscellaneous: "#94a3b8", // slate
};

function getTagColor(tag: string): string {
	return TAG_COLORS[tag] ?? "#a1a1aa"; // zinc-400 fallback (WCAG AA)
}

// ── Featured Post ─────────────────────────────────────────────────
function FeaturedPost({ post }: { post: BlogPost }) {
	const url = getPostUrl(post);
	const isExternal = url.startsWith("http");
	return (
		<a
			href={isExternal ? url : getAssetPath(url)}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className="group relative block overflow-hidden rounded-2xl bg-zinc-900/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/[0.08]"
		>
			{/* Mesh gradient background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: `
						radial-gradient(ellipse 60% 50% at 0% 0%, rgba(52, 211, 153, 0.10) 0%, transparent 50%),
						radial-gradient(ellipse 50% 60% at 100% 100%, rgba(129, 140, 248, 0.06) 0%, transparent 50%),
						radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)
					`,
				}}
			/>

			{/* Hover glow intensification */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(ellipse 60% 50% at 0% 0%, rgba(52, 211, 153, 0.14) 0%, transparent 50%)",
				}}
			/>

			{/* Top accent line */}
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

			<div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:p-12">
				<div className="min-w-0">
					{/* Label + tags */}
					<div className="mb-6 flex flex-wrap items-center gap-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase ring-1 ring-emerald-500/20 ring-inset">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
							Featured
						</span>
					{[...post.tags].sort((a, b) => a.localeCompare(b)).map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center rounded-full bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300"
							>
								{tag}
							</span>
						))}
					</div>

					<h2 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
						{post.title}
					</h2>

					<p className="mt-4 line-clamp-3 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg md:leading-relaxed">
						{post.excerpt}
					</p>

					{/* Authors + meta */}
					<div className="mt-8 flex flex-wrap items-center gap-4">
						{post.authors.map((author) => (
							<div
								key={author.name}
								className="flex items-center gap-2"
							>
								<AvatarWithFallback
									src={getAssetPath(author.avatar)}
									alt={author.name}
									className="h-8 w-8 rounded-full border-2 border-zinc-800 object-cover"
								/>
								<div className="flex flex-col">
									<span className="text-sm font-medium text-zinc-200">
										{author.name}
									</span>
								</div>
							</div>
						))}
						<div className="flex items-center gap-3 text-sm text-zinc-400">
							<span className="h-4 w-px bg-zinc-800" />
							<time>{post.date}</time>
						</div>
					</div>
				</div>

				{/* Right side: cover image or CTA arrow */}
				<div className="hidden md:flex md:flex-col md:items-center md:gap-3">
					{post.coverImage ? (
						<div className="relative aspect-video w-[320px] overflow-hidden rounded-xl border border-zinc-800/50 lg:w-[400px]">
							<img
								src={getAssetPath(post.coverImage)}
								alt={post.title}
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
							/>
							{/* Bottom fade to blend with card */}
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-900/60 to-transparent" />
						</div>
					) : (
						<div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
							<i
								className="ri-arrow-right-line text-lg"
							/>
						</div>
					)}
				</div>

				{/* Mobile: cover image below text */}
				{post.coverImage && (
					<div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800/50 md:hidden">
						<img
							src={getAssetPath(post.coverImage)}
							alt={post.title}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
				)}
			</div>
		</a>
	);
}

// ── Shared Horizontal Scroll Rail ─────────────────────────────────
function HorizontalScrollRail({
	icon,
	iconBg,
	title,
	subtitle,
	accentColor,
	ariaLabel,
	onViewAll,
	children,
	itemCount,
}: {
	icon: string;
	iconBg: string;
	title: string;
	subtitle: string;
	accentColor: string;
	ariaLabel: string;
	onViewAll: () => void;
	children: React.ReactNode;
	itemCount: number;
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const updateScrollState = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 0);
		setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
	}, []);

	useEffect(() => {
		// Re-check scroll bounds when the number of items changes
		void itemCount;
		updateScrollState();
	}, [updateScrollState, itemCount]);

	const scroll = useCallback((direction: "left" | "right") => {
		const el = scrollRef.current;
		if (!el) return;
		const amount = 300;
		el.scrollBy({
			left: direction === "left" ? -amount : amount,
			behavior: "smooth",
		});
	}, []);

	if (itemCount === 0) return null;

	return (
		<section aria-label={ariaLabel} className="py-12">
			{/* Section header */}
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
						<i className={`${icon} text-base ${accentColor}`} />
					</div>
					<div>
						<h2 className="text-base font-semibold text-white">
							{title}
						</h2>
						<p className="text-xs text-zinc-400">{subtitle}</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onViewAll}
						className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
					>
						View all
					</button>

					{/* Scroll arrows */}
					<div className="hidden items-center gap-2 sm:flex">
						<button
							type="button"
							onClick={() => scroll("left")}
							disabled={!canScrollLeft}
							aria-label="Scroll left"
							className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-700/80 hover:text-white disabled:pointer-events-none disabled:opacity-40"
						>
							<i className="ri-arrow-left-s-line text-sm" />
						</button>
						<button
							type="button"
							onClick={() => scroll("right")}
							disabled={!canScrollRight}
							aria-label="Scroll right"
							className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-700/80 hover:text-white disabled:pointer-events-none disabled:opacity-40"
						>
							<i className="ri-arrow-right-s-line text-sm" />
						</button>
					</div>
				</div>
			</div>

			{/* Scrollable track */}
			<div className="relative">
				<div
					ref={scrollRef}
					onScroll={updateScrollState}
					className="scrollbar-hide flex gap-3 overflow-x-auto py-1 pb-2"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					{children}
				</div>

				{/* Right fade affordance */}
				{canScrollRight && (
					<div className="pointer-events-none absolute top-0 right-0 bottom-2 w-16 bg-gradient-to-l from-zinc-950 to-transparent" />
				)}

				{/* Left fade affordance */}
				{canScrollLeft && (
					<div className="pointer-events-none absolute top-0 bottom-2 left-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent" />
				)}

				{/* Mobile swipe hint */}
				{canScrollRight && (
					<div className="pointer-events-none absolute right-2 bottom-4 flex items-center gap-1 text-xs text-zinc-400 sm:hidden">
						<span>Swipe</span>
						<i className="ri-arrow-right-line text-xs" />
					</div>
				)}
			</div>
		</section>
	);
}

// ── TWIE Horizontal Scroll ────────────────────────────────────────
function TWIECard({ post }: { post: BlogPost }) {
	const url = getPostUrl(post);
	// Extract issue number from title (e.g. "This Week in Effect - 2026-02-27" or "#107")
	const issueMatch = post.title.match(/#(\d+)/);
	const issueNumber = issueMatch ? `#${issueMatch[1]}` : null;
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-xl bg-zinc-900/70 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-violet-500/5"
		>
			{/* Top accent line */}
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

			<div>
				<div className="flex items-center justify-between">
					<span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium tracking-wide text-violet-400 uppercase">
						<span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
						TWIE
					</span>
					{issueNumber && (
						<span className="font-mono text-sm font-semibold text-zinc-300">
							{issueNumber}
						</span>
					)}
				</div>

				<p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
					{post.excerpt}
				</p>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<time className="font-mono text-xs text-zinc-400 tabular-nums">
					{post.date}
				</time>
				<div className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors group-hover:text-violet-400">
					<i className="ri-arrow-right-up-line text-sm" />
				</div>
			</div>
		</a>
	);
}

function TWIESection({ posts, onViewAll }: { posts: BlogPost[]; onViewAll: () => void }) {
	return (
		<HorizontalScrollRail
			icon="ri-newspaper-line"
			iconBg="bg-violet-500/10"
			title="This Week in Effect"
			subtitle="Weekly community digest"
			accentColor="text-violet-400"
			ariaLabel="This Week in Effect posts"
			onViewAll={onViewAll}
			itemCount={posts.length}
		>
			{posts.map((post) => (
				<TWIECard key={post.slug} post={post} />
			))}
		</HorizontalScrollRail>
	);
}

// ── Post Card (grid card style) ──────────────────────────────────
function PostCard({ post }: { post: BlogPost }) {
	const url = getPostUrl(post);
	const isExternal = url.startsWith("http");
	const accentColor = getTagColor(post.tags[0] ?? "");
	return (
		<a
			href={isExternal ? url : getAssetPath(url)}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-black/25"
		>
			{/* Top accent */}
			<div
				className="h-px w-full"
				style={{
					background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)`,
				}}
			/>

			<div className="flex flex-1 flex-col p-6">
				{/* Tags row */}
				<div className="flex flex-wrap items-center gap-1.5">
						{[...post.tags].sort((a, b) => a.localeCompare(b)).slice(0, 2).map((tag) => {
							const color = getTagColor(tag);
							return (
								<span
									key={tag}
									className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase"
									style={{
										backgroundColor: `${color}15`,
										color: color,
									}}
								>
									<span
										className="h-1.5 w-1.5 rounded-full"
										style={{ backgroundColor: color }}
									/>
									{tag}
								</span>
							);
						})}
						{post.tags.length > 2 && (
							<span className="inline-flex items-center rounded-full bg-zinc-800/60 px-2 py-0.5 text-xs font-medium text-zinc-400">
								+{post.tags.length - 2}
							</span>
						)}
					</div>

				{/* Title */}
				<h3 className="mt-3 text-sm font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white">
					{post.title}
				</h3>

				{/* Excerpt */}
				<p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-400">
					{post.excerpt}
				</p>

				{/* Meta row */}
				<div className="mt-4 flex items-center justify-between border-t border-zinc-800/40 pt-4">
					<div className="flex items-center gap-2 text-xs text-zinc-400">
						<div className="flex items-center -space-x-1.5">
							{post.authors.slice(0, 3).map((author) => (
								<AvatarWithFallback
									key={author.name}
									src={getAssetPath(author.avatar)}
									alt={author.name}
									className="h-5 w-5 rounded-full border-2 border-zinc-900 object-cover"
								/>
							))}
						</div>
						{post.authors.length === 1 && (
							<span className="text-zinc-400">{post.authors[0].name}</span>
						)}
					</div>
					<div className="flex items-center gap-2 text-xs text-zinc-400">
						<time className="font-mono tabular-nums">{post.date}</time>
						<div className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 opacity-0 transition-all group-hover:text-white group-hover:opacity-100">
							<i
								className="ri-arrow-right-line text-xs"
							/>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
}

function SidebarSection({
	title,
	children,
	defaultOpen = true,
}: {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className="mb-2">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between py-3 text-left"
			>
				<span className="font-mono text-xs font-medium tracking-wider text-zinc-400 uppercase">
					{title}
				</span>
				<i
					className={`ri-arrow-down-s-line text-sm text-zinc-400 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
				/>
			</button>
			<div
				className="grid transition-all duration-200"
				style={{
					gridTemplateRows: open ? "1fr" : "0fr",
					opacity: open ? 1 : 0,
				}}
			>
				<div className="overflow-hidden">
					<div className="pb-4">{children}</div>
				</div>
			</div>
		</div>
	);
}

export function BlogPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTag, setActiveTag] = useState<BlogTag>("All");
	const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const postListRef = useRef<HTMLDivElement>(null);
	const contentZoneRef = useRef<HTMLDivElement>(null);

	const goToPage = useCallback((page: number | ((prev: number) => number)) => {
		setCurrentPage(page);
		postListRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

	// Separate TWIE posts from everything else
	const twiePosts = useMemo(
		() => BLOG_POSTS.filter((p) => p.tags.includes("This Week In Effect")),
		[],
	);

	// Posts that are not TWIE (main grid — includes Release posts)
	const nonTwiePosts = useMemo(
		() =>
			BLOG_POSTS.filter(
				(p) => !p.tags.includes("This Week In Effect"),
			),
		[],
	);

	// Filter tags list — keep all categories in sidebar
	const sidebarTags = useMemo(() => BLOG_TAGS, []);

	const filteredPosts = useMemo(() => {
		// When the user explicitly selects TWIE tag, show those in the grid
		if (activeTag === "This Week In Effect") {
			let posts = twiePosts;
			if (activeAuthor) {
				posts = posts.filter((p) =>
					p.authors.some((a) => a.name === activeAuthor),
				);
			}
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				posts = posts.filter(
					(p) =>
						p.title.toLowerCase().includes(q) ||
						p.excerpt.toLowerCase().includes(q) ||
						p.tags.some((t) => t.toLowerCase().includes(q)) ||
						p.authors.some((a) => a.name.toLowerCase().includes(q)),
				);
			}
			return posts;
		}

		// For "All" — show posts that are NOT in TWIE (they have their own rail)
		// For a specific tag — search ALL posts so dual-tagged posts appear
		let posts = activeTag === "All" ? nonTwiePosts : BLOG_POSTS;

		if (activeTag !== "All") {
			posts = posts.filter((p) => p.tags.includes(activeTag));
		}

		if (activeAuthor) {
			posts = posts.filter((p) =>
				p.authors.some((a) => a.name === activeAuthor),
			);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			posts = posts.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.excerpt.toLowerCase().includes(q) ||
					p.tags.some((t) => t.toLowerCase().includes(q)) ||
					p.authors.some((a) => a.name.toLowerCase().includes(q)),
			);
		}

		return posts;
	}, [activeTag, activeAuthor, searchQuery, twiePosts, nonTwiePosts]);

	const hasActiveFilters =
		activeTag !== "All" || activeAuthor !== null || searchQuery.trim() !== "";

	// Show TWIE rail unless user is already viewing TWIE posts in the main grid
	const showTWIERail = activeTag !== "This Week In Effect";

	// Separate featured post from the rest (search all posts — featured may be a Release)
	const featuredPost = useMemo(() => {
		return BLOG_POSTS.find((p) => p.featured) ?? null;
	}, []);

	const displayPosts = useMemo(() => {
		if (featuredPost) {
			return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
		}
		return filteredPosts;
	}, [filteredPosts, featuredPost]);

	// Pagination
	const totalPages = Math.max(
		1,
		Math.ceil(displayPosts.length / POSTS_PER_PAGE),
	);
	const safePage = Math.min(currentPage, totalPages);
	const paginatedPosts = useMemo(
		() =>
			displayPosts.slice(
				(safePage - 1) * POSTS_PER_PAGE,
				safePage * POSTS_PER_PAGE,
			),
		[displayPosts, safePage],
	);

	// Compute tag counts (for sidebar, use all posts for accurate counts)
	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		for (const tag of BLOG_TAGS) {
			if (tag === "All") {
				counts[tag] = nonTwiePosts.length;
			} else if (tag === "This Week In Effect") {
				counts[tag] = twiePosts.length;
			} else {
				counts[tag] = BLOG_POSTS.filter((p) => p.tags.includes(tag)).length;
			}
		}
		return counts;
	}, [nonTwiePosts, twiePosts]);

	// Compute author counts
	const authorEntries = useMemo(() => {
		const counts: Record<string, number> = {};
		for (const post of BLOG_POSTS) {
			for (const author of post.authors) {
				counts[author.name] = (counts[author.name] || 0) + 1;
			}
		}
		return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
	}, []);

	const clearFilters = useCallback(() => {
		setActiveTag("All");
		setActiveAuthor(null);
		setSearchQuery("");
		setCurrentPage(1);
	}, []);

	const handleTagChange = useCallback((tag: BlogTag) => {
		setActiveTag(tag);
		setActiveAuthor(null);
		setCurrentPage(1);
		if (postListRef.current) {
			const navbarHeight = 64; // h-16
			const top = postListRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
			window.scrollTo({ top, behavior: "smooth" });
		}
	}, []);

	const handleAuthorChange = useCallback(
		(name: string) => {
			setActiveAuthor(activeAuthor === name ? null : name);
			setCurrentPage(1);
		},
		[activeAuthor],
	);

	return (
		<div className="relative min-h-screen bg-zinc-950 text-white antialiased">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation />
			<GridOverlay />

			{/* Dithered background overlay - subtle texture across entire page */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>

			{/* Vertical border lines */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			{/* ── Header zone ────────────────────────────── */}
			<div className="relative overflow-hidden">
				{/* Grid background */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
						`,
						backgroundSize: "196.6px 194px",
						backgroundPosition: "calc(50% + 97px) 0",
					}}
				/>

				{/* Fade grid at edges */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"linear-gradient(to bottom, #09090b 0%, transparent 30%, transparent 50%, #09090b 100%)",
					}}
				/>

				{/* Ambient glow */}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
					style={{
						background: `
							radial-gradient(ellipse 50% 80% at 50% -20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
							radial-gradient(ellipse 30% 50% at 70% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
						`,
					}}
				/>

				{/* Noise texture */}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-[0.12] mix-blend-overlay"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
						backgroundRepeat: "repeat",
					}}
				/>

				<main id="main-content" className="relative w-full pt-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						{/* Page header */}
						<div className="pt-16 pb-16 md:pt-24 md:pb-24">
							<p className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								// Blog
							</p>
							<h1
								className="max-w-2xl text-3xl font-semibold leading-tighter tracking-tight text-white md:text-4xl"
							>
								Stay up to date with the latest{" "}
								<br className="hidden md:block" />
								from the Effect ecosystem
							</h1>
						</div>
					</div>
				</main>
			</div>

			{/* Section divider */}
			<div className="h-px w-full bg-zinc-800" />

			{/* ── Content zone ───────────────────────────── */}
			<div ref={contentZoneRef} className="relative">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					{/* Featured post — always visible regardless of filters */}
					{featuredPost && (
						<div className="pt-12 pb-4">
							<FeaturedPost post={featuredPost} />
						</div>
					)}

					{/* TWIE horizontal scroll rail */}
					{showTWIERail && <TWIESection posts={twiePosts} onViewAll={() => handleTagChange("This Week In Effect")} />}

					{/* Two-column layout: content + sidebar */}
					<div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_260px]">
						{/* Main content */}
						<div className="min-w-0 pb-24 lg:border-r lg:border-zinc-800/60 lg:pr-12">
							{/* Search bar */}
							<div ref={postListRef} className="relative mt-12 mb-8">
								<i className="ri-search-line absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-zinc-400" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search posts..."
									aria-label="Search blog posts"
									className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-400 transition-all duration-200 outline-none focus:border-zinc-700 focus:bg-zinc-900/80 focus:ring-1 focus:ring-zinc-700"
								/>
								{searchQuery && (
									<button
										type="button"
										onClick={() => setSearchQuery("")}
										aria-label="Clear search"
										className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-0.5 text-zinc-400 transition-colors hover:text-zinc-200"
									>
										<i className="ri-close-line text-base" />
									</button>
								)}
							</div>

							{/* Mobile filters */}
							<div className="relative mb-8 lg:hidden">
								<select
									value={activeTag}
									onChange={(e) => handleTagChange(e.target.value as BlogTag)}
									aria-label="Filter by category"
									className="w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pr-10 pl-4 text-sm text-white transition-all duration-200 outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
								>
									{BLOG_TAGS.map((tag) => (
										<option key={tag} value={tag}>
											{tag} ({tagCounts[tag]})
										</option>
									))}
								</select>
								<i className="ri-arrow-down-s-line pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-base text-zinc-400" />
							</div>

							{/* Post grid */}
							{paginatedPosts.length > 0 ? (
								<>
									<div
										key={`${activeTag}-${activeAuthor}-${searchQuery}-${safePage}`}
										className="blog-grid-enter grid grid-cols-1 gap-4 md:grid-cols-2"
									>
										{paginatedPosts.map((post) => (
											<PostCard key={post.slug} post={post} />
										))}
									</div>

									{/* Pagination */}
									{totalPages > 1 && (
										<>
											<div className="mt-12 h-px bg-zinc-800" />
											<nav aria-label="Blog pagination" className="mt-8 flex items-center justify-center gap-1">
												<button
													type="button"
													disabled={safePage <= 1}
													onClick={() => goToPage((p) => p - 1)}
													aria-label="Previous page"
													className="rounded-md px-2.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-40"
												>
													<i className="ri-arrow-left-s-line text-sm" />
												</button>

												{(() => {
													const pages: (number | "ellipsis")[] = [];
													if (totalPages <= 7) {
														for (let i = 1; i <= totalPages; i++) pages.push(i);
													} else {
														pages.push(1);
														if (safePage > 3) pages.push("ellipsis");
														const start = Math.max(2, safePage - 1);
														const end = Math.min(totalPages - 1, safePage + 1);
														for (let i = start; i <= end; i++) pages.push(i);
														if (safePage < totalPages - 2)
															pages.push("ellipsis");
														pages.push(totalPages);
													}
													return pages.map((page, idx) =>
														page === "ellipsis" ? (
															<span
																key={`ellipsis-${idx}`}
																className="px-1.5 text-xs text-zinc-400"
															>
																...
															</span>
														) : (
															<button
																key={page}
																type="button"
																onClick={() => goToPage(page)}
																className={`min-w-[2rem] rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
																	page === safePage
																		? "bg-zinc-800 text-white ring-1 ring-zinc-700"
																		: "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
																}`}
															>
																{page}
															</button>
														),
													);
												})()}

												<button
													type="button"
													disabled={safePage >= totalPages}
													onClick={() => goToPage((p) => p + 1)}
													aria-label="Next page"
													className="rounded-md px-2.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-40"
												>
													<i className="ri-arrow-right-s-line text-sm" />
												</button>
											</nav>
										</>
									)}
								</>
							) : (
								<div className="flex flex-col items-center justify-center py-24">
									<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900/60">
										<i className="ri-file-search-line text-2xl text-zinc-400" />
									</div>
									<p className="mt-6 text-base font-medium text-zinc-300">
										No posts found
									</p>
									<p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-zinc-400">
										{searchQuery.trim()
											? `Nothing matched "${searchQuery}". Try a different term or browse by category.`
											: "No posts match the current filters."}
									</p>

									{/* Suggested tags */}
									<div className="mt-6 flex flex-wrap items-center justify-center gap-2">
										{(["Release", "Effect", "TypeScript"] as const).map(
											(tag) => (
												<button
													key={tag}
													type="button"
													onClick={() => {
														handleTagChange(tag as BlogTag);
														setSearchQuery("");
													}}
													className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
												>
													<span
														className="h-1.5 w-1.5 rounded-full"
														style={{
															backgroundColor: getTagColor(tag),
														}}
													/>
													{tag}
												</button>
											),
										)}
									</div>

									<button
										type="button"
										onClick={clearFilters}
										className="mt-6 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-white"
									>
										Clear all filters
									</button>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<aside className="hidden pt-12 pl-12 lg:block">
							<div className="sticky" style={{ top: "var(--nav-height)" }}>
								{/* Tags */}
								<SidebarSection title="Categories">
									<ul className="space-y-0.5">
										{sidebarTags.map((tag) => {
											const isActive = activeTag === tag;
											const color =
												tag === "All" ? "#71717a" : getTagColor(tag);
											return (
												<li key={tag}>
													<button
														type="button"
														onClick={() => handleTagChange(tag)}
														className={`relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-all duration-150 ${
															isActive
																? "bg-zinc-800/80 font-medium text-white"
																: "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
														}`}
													>
														{/* Active left bar */}
														{isActive && (
															<div
																className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full"
																style={{ backgroundColor: color }}
															/>
														)}
														{/* Color dot */}
														{tag !== "All" && (
															<span
																className="h-2 w-2 shrink-0 rounded-full"
																style={{
																	backgroundColor: color,
																	opacity: isActive ? 1 : 0.4,
																}}
															/>
														)}
														<span className="flex-1">{tag}</span>
														<span className="text-xs text-zinc-400 tabular-nums">
															{tagCounts[tag]}
														</span>
													</button>
												</li>
											);
										})}
									</ul>
								</SidebarSection>

								{/* Authors */}
								<SidebarSection title="Authors">
									<ul className="space-y-1">
										{authorEntries.map(([name, count]) => {
											const author = Object.values(AUTHORS).find(
												(a) => a.name === name,
											);
											const isActive = activeAuthor === name;
											return (
												<li key={name}>
													<button
														type="button"
														onClick={() => handleAuthorChange(name)}
														className={`group/author relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-all duration-150 ${
															isActive
																? "bg-zinc-800/80 text-white"
																: "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
														}`}
													>
														{/* Active left bar */}
														{isActive && (
															<div className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-white" />
														)}
														{author && (
															<AvatarWithFallback
																src={getAssetPath(author.avatar)}
																alt={name}
																className={`h-6 w-6 rounded-full object-cover ring-1 ring-inset ${isActive ? "ring-zinc-700" : "ring-zinc-800"}`}
															/>
														)}
														<span className="min-w-0 flex-1 truncate text-sm font-medium">
															{name}
														</span>
														<span className="shrink-0 text-xs text-zinc-400 tabular-nums">
															{count}
														</span>
													</button>
												</li>
											);
										})}
									</ul>
								</SidebarSection>

								{/* RSS */}
								<div className="mt-4 border-t border-zinc-800/60 pt-4">
									<Link
										href="https://effect.website/blog/rss.xml"
										variant="subtle"
										className="flex items-center gap-2 rounded-md px-3 py-2"
									>
										<i className="ri-rss-line text-base" />
										RSS Feed
									</Link>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
