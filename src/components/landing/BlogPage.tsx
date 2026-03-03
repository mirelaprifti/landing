import { useCallback, useMemo, useRef, useState } from "react";
import {
	AUTHORS,
	BLOG_POSTS,
	BLOG_TAGS,
	type BlogPost,
	type BlogTag,
} from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const POSTS_PER_PAGE = 15;

function FeaturedPost({ post }: { post: BlogPost }) {
	return (
		<a
			href={getAssetPath(`/blog/${post.slug}`)}
			className="group relative block overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900/80 dark:via-zinc-900/50 dark:to-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50"
		>
			<div className="relative p-7 md:p-10">
				<div className="mb-4 flex flex-wrap items-center gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-emerald-500/20 ring-inset dark:text-emerald-400"
						>
							{tag}
						</span>
					))}
				</div>

				<h2 className="text-2xl leading-tight font-semibold text-zinc-900 md:text-3xl dark:text-white">
					{post.title}
				</h2>

				<p className="mt-4 line-clamp-2 text-base text-zinc-600 md:text-lg dark:text-zinc-400">
					{post.excerpt}
				</p>

				<div className="mt-6 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
					<time>{post.date}</time>
					<span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
					<div className="flex items-center gap-2">
						<div className="flex items-center -space-x-2">
							{post.authors.map((author) => (
								<img
									key={author.name}
									src={getAssetPath(author.avatar)}
									alt={author.name}
									className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-zinc-900"
								/>
							))}
						</div>
						{post.authors.length === 1 && (
							<span className="text-zinc-600 dark:text-zinc-400">
								{post.authors[0].name}
							</span>
						)}
					</div>
					<span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
					<span>{post.readingTime}</span>
				</div>
			</div>
		</a>
	);
}

function PostCard({ post }: { post: BlogPost }) {
	return (
		<a
			href={getAssetPath(`/blog/${post.slug}`)}
			className="group relative block rounded-lg border border-transparent px-5 py-5 transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/40"
		>
			<div>
				<div className="min-w-0">
					{/* Tag label */}
					<span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400">
						{post.tags[0] ?? "Post"}
					</span>

					{/* Title */}
					<h3 className="mt-1.5 text-lg leading-snug font-semibold text-zinc-900 transition-colors group-hover:text-black md:text-xl dark:text-zinc-100 dark:group-hover:text-white">
						{post.title}
					</h3>

					{/* Excerpt */}
					<p className="mt-1.5 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400">
						{post.excerpt}
					</p>

					{/* Meta row: date, authors, reading time */}
					<div className="mt-3 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
						<time>{post.date}</time>
						<span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
						<div className="flex items-center gap-2">
							<div className="flex items-center -space-x-1.5">
								{post.authors.slice(0, 3).map((author) => (
									<img
										key={author.name}
										src={getAssetPath(author.avatar)}
										alt={author.name}
										className="h-5 w-5 rounded-full border border-white object-cover dark:border-zinc-900"
									/>
								))}
							</div>
							{post.authors.length === 1 && <span>{post.authors[0].name}</span>}
						</div>
						<span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
						<span>{post.readingTime}</span>
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
				className="flex w-full items-center justify-between py-2.5 text-left"
			>
				<span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
					{title}
				</span>
				<i
					className={`ri-arrow-down-s-line text-base text-zinc-400 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
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
					<div className="pb-5">{children}</div>
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

	const goToPage = useCallback((page: number | ((prev: number) => number)) => {
		setCurrentPage(page);
		postListRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

	const filteredPosts = useMemo(() => {
		let posts = BLOG_POSTS;

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
	}, [activeTag, activeAuthor, searchQuery]);

	const hasActiveFilters =
		activeTag !== "All" || activeAuthor !== null || searchQuery.trim() !== "";

	// Separate featured post from the rest
	const featuredPost = useMemo(() => {
		return BLOG_POSTS.find((p) => p.featured) ?? null;
	}, []);

	const displayPosts = useMemo(() => {
		if (featuredPost && !hasActiveFilters) {
			return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
		}
		return filteredPosts;
	}, [filteredPosts, featuredPost, hasActiveFilters]);

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

	// Compute tag counts
	const tagCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		for (const tag of BLOG_TAGS) {
			if (tag === "All") {
				counts[tag] = BLOG_POSTS.length;
			} else {
				counts[tag] = BLOG_POSTS.filter((p) => p.tags.includes(tag)).length;
			}
		}
		return counts;
	}, []);

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
	}, []);

	const handleAuthorChange = useCallback(
		(name: string) => {
			setActiveAuthor(activeAuthor === name ? null : name);
			setCurrentPage(1);
		},
		[activeAuthor],
	);

	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative w-full pt-16">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					{/* Page header */}
					<div className="pt-8 pb-8">
						<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
							Blog
						</h1>
						<p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
							Product announcements, engineering deep-dives, and community
							highlights.
						</p>
					</div>

					{/* Featured post */}
					{featuredPost && !hasActiveFilters && (
						<div className="mb-12">
							<FeaturedPost post={featuredPost} />
						</div>
					)}

					{/* Two-column layout: content + sidebar */}
					<div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_260px]">
						{/* Main content */}
						<div className="min-w-0 pb-20 lg:border-r lg:border-zinc-200/60 lg:pr-10 dark:lg:border-zinc-800/60">
							{/* Search bar */}
							<div ref={postListRef} className="relative mb-8">
								<i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-base text-zinc-400" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search posts..."
									className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-3 pr-4 pl-11 text-base text-zinc-900 placeholder-zinc-400 transition-all duration-200 outline-none focus:border-zinc-400 focus:bg-white focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-white dark:focus:border-zinc-600 dark:focus:bg-zinc-900/70 dark:focus:ring-zinc-700"
								/>
								{searchQuery && (
									<button
										type="button"
										onClick={() => setSearchQuery("")}
										className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
									>
										<i className="ri-close-line text-lg" />
									</button>
								)}
							</div>

							{/* Mobile filters */}
							<div className="relative mb-8 lg:hidden">
								<select
									value={activeTag}
									onChange={(e) => handleTagChange(e.target.value as BlogTag)}
									className="w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50 py-3 pr-10 pl-4 text-base text-zinc-900 transition-all duration-200 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-white dark:focus:border-zinc-600 dark:focus:ring-zinc-700"
								>
									{BLOG_TAGS.map((tag) => (
										<option key={tag} value={tag}>
											{tag} ({tagCounts[tag]})
										</option>
									))}
								</select>
								<i className="ri-arrow-down-s-line pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg text-zinc-400" />
							</div>

							{/* Active filter indicator */}
							{hasActiveFilters && (
								<div className="mb-6 flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
									<span className="text-sm text-zinc-600 dark:text-zinc-400">
										{filteredPosts.length} result
										{filteredPosts.length !== 1 ? "s" : ""}
									</span>
									<button
										type="button"
										onClick={clearFilters}
										className="ml-auto flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
									>
										<i className="ri-close-line text-sm" />
										Clear
									</button>
								</div>
							)}

							{/* Post list */}
							{paginatedPosts.length > 0 ? (
								<>
									<div className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
										{paginatedPosts.map((post) => (
											<PostCard key={post.slug} post={post} />
										))}
									</div>

									{/* Pagination */}
									{totalPages > 1 && (
										<div className="mt-10 flex items-center justify-center gap-1">
											<button
												type="button"
												disabled={safePage <= 1}
												onClick={() => goToPage((p) => p - 1)}
												className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
											>
												<i className="ri-arrow-left-s-line text-base" />
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
													if (safePage < totalPages - 2) pages.push("ellipsis");
													pages.push(totalPages);
												}
												return pages.map((page, idx) =>
													page === "ellipsis" ? (
														<span
															key={`ellipsis-${idx}`}
															className="px-2 text-sm text-zinc-400 dark:text-zinc-600"
														>
															...
														</span>
													) : (
														<button
															key={page}
															type="button"
															onClick={() => goToPage(page)}
															className={`min-w-[2.25rem] rounded-md px-2 py-2 text-sm font-medium transition-colors ${
																page === safePage
																	? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
																	: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
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
												className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
											>
												<i className="ri-arrow-right-s-line text-base" />
											</button>
										</div>
									)}
								</>
							) : (
								<div className="flex flex-col items-center justify-center py-24">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
										<i className="ri-search-line text-2xl text-zinc-400" />
									</div>
									<p className="mt-5 text-base text-zinc-600 dark:text-zinc-400">
										No posts match your search.
									</p>
									<button
										type="button"
										onClick={clearFilters}
										className="mt-4 rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
									>
										Clear filters
									</button>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<aside className="hidden pt-1 pl-10 lg:block">
							<div className="sticky top-[5.5rem]">
								{/* Tags */}
								<SidebarSection title="Categories">
									<ul className="space-y-1">
										{BLOG_TAGS.map((tag) => (
											<li key={tag}>
												<button
													type="button"
													onClick={() => handleTagChange(tag)}
													className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-all duration-150 ${
														activeTag === tag
															? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white"
															: "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
													}`}
												>
													<span>{tag}</span>
													<span className="text-xs text-zinc-400">
														{tagCounts[tag]}
													</span>
												</button>
											</li>
										))}
									</ul>
								</SidebarSection>

								{/* Authors */}
								<SidebarSection title="Authors">
									<ul className="space-y-1">
										{authorEntries.map(([name, count]) => {
											const author = Object.values(AUTHORS).find(
												(a) => a.name === name,
											);
											return (
												<li key={name}>
													<button
														type="button"
														onClick={() => handleAuthorChange(name)}
														className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-all duration-150 ${
															activeAuthor === name
																? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white"
																: "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
														}`}
													>
														{author && (
															<img
																src={getAssetPath(author.avatar)}
																alt={name}
																className="h-5 w-5 rounded-full object-cover"
															/>
														)}
														<span className="min-w-0 truncate">{name}</span>
														<span className="ml-auto shrink-0 text-xs text-zinc-400">
															{count}
														</span>
													</button>
												</li>
											);
										})}
									</ul>
								</SidebarSection>

								{/* RSS */}
								<div className="mt-3 border-t border-zinc-200/60 pt-5 dark:border-zinc-800/60">
									<a
										href="https://effect.website/blog/rss.xml"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
									>
										<i className="ri-rss-line text-base" />
										RSS Feed
									</a>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
