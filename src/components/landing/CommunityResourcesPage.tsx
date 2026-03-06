import { useCallback, useMemo, useState } from "react";
import {
	CATEGORIES,
	COMMUNITY_ITEMS,
	type Category,
	type CommunityItem,
} from "../../data/resources";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

// ── Category counts ──────────────────────────────────────────────

function useCategoryCounts() {
	return useMemo(() => {
		const nonFeatured = COMMUNITY_ITEMS.filter((item) => !item.featured);
		const counts: Record<string, number> = { All: nonFeatured.length };
		for (const cat of CATEGORIES) {
			counts[cat] = nonFeatured.filter(
				(item) => item.category === cat,
			).length;
		}
		return counts;
	}, []);
}

// ── Item Row ─────────────────────────────────────────────────────

function ItemRow({ item }: { item: CommunityItem }) {
	return (
		<a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-baseline gap-3 rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-zinc-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:px-5 sm:py-4"
		>
			{/* Left: title + description */}
			<div className="min-w-0 flex-1">
				<div className="flex items-baseline gap-2">
					<h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-white">
						{item.title}
					</h3>
					<span className="hidden shrink-0 text-xs text-zinc-400 sm:inline">
						{item.author}
					</span>
				</div>
				<p className="mt-0.5 truncate text-sm text-zinc-400">
					{item.description}
				</p>
			</div>

			{/* Category */}
			<span className="shrink-0 rounded bg-zinc-800/80 px-1.5 py-0.5 text-xs font-medium text-zinc-400">
				{item.category}
			</span>

			{/* Arrow */}
			<i
				className="ri-arrow-right-up-line shrink-0 text-sm text-zinc-400 transition-colors group-hover:text-zinc-200"
				aria-hidden="true"
			/>
		</a>
	);
}

// ── Featured Item Card ───────────────────────────────────────────

function FeaturedItemCard({ item }: { item: CommunityItem }) {
	const domain = useMemo(() => {
		try {
			return new URL(item.url).hostname.replace("www.", "");
		} catch {
			return "";
		}
	}, [item.url]);

	return (
		<a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
		>
			{/* Hover glow */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)",
				}}
			/>

			{/* Thumbnail */}
			{item.thumbnail && (
				<div className="relative aspect-video w-full overflow-hidden">
					<img
						src={item.thumbnail}
						alt=""
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
					{/* Play icon overlay */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
							<i className="ri-play-fill text-xl" aria-hidden="true" />
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
				{/* Category badge */}
				<span className="relative mb-3 w-fit rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs font-medium text-zinc-400">
					{item.category}
				</span>

				{/* Title */}
				<h3 className="relative text-base font-semibold text-white sm:text-lg md:text-xl">
					{item.title}
					<i
						className="ri-arrow-right-up-line ml-1.5 text-sm text-zinc-400 transition-colors group-hover:text-zinc-200"
						aria-hidden="true"
					/>
				</h3>

				{/* Description */}
				<p className="relative mt-2 text-sm leading-relaxed text-zinc-400">
					{item.description}
				</p>

				{/* Footer */}
				<div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5">
					<span className="text-xs text-zinc-400">{item.author}</span>
					<span className="text-zinc-600">&middot;</span>
					<span className="text-xs text-zinc-400">{domain}</span>
					{item.tags && item.tags.length > 0 && (
						<div className="ml-auto flex items-center gap-1.5">
							{item.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</a>
	);
}

// ── Main Page ────────────────────────────────────────────────────

export function CommunityResourcesPage() {
	const [activeCategory, setActiveCategory] = useState<Category | "All">(
		"All",
	);
	const [searchQuery, setSearchQuery] = useState("");
	const categoryCounts = useCategoryCounts();

	// Featured items — shown when no filters are active
	const featuredItems = useMemo(
		() => COMMUNITY_ITEMS.filter((item) => item.featured),
		[],
	);

	// Filtered items (excluding featured from the main list)
	const filteredItems = useMemo(() => {
		let items = COMMUNITY_ITEMS.filter((item) => !item.featured);

		if (activeCategory !== "All") {
			items = items.filter((item) => item.category === activeCategory);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			items = items.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.description.toLowerCase().includes(query) ||
					item.author.toLowerCase().includes(query) ||
					item.tags?.some((t) => t.toLowerCase().includes(query)),
			);
		}

		return items.sort(
			(a, b) =>
				new Date(b.dateAdded).getTime() -
				new Date(a.dateAdded).getTime(),
		);
	}, [activeCategory, searchQuery]);

	const handleCategoryChange = useCallback((cat: Category | "All") => {
		setActiveCategory(cat);
	}, []);

	const clearFilters = useCallback(() => {
		setActiveCategory("All");
		setSearchQuery("");
	}, []);

	const hasActiveFilters =
		activeCategory !== "All" || searchQuery.trim() !== "";

	// Split items into two columns for lg layout
	const leftColumnItems = useMemo(
		() => filteredItems.filter((_, i) => i % 2 === 0),
		[filteredItems],
	);
	const rightColumnItems = useMemo(
		() => filteredItems.filter((_, i) => i % 2 === 1),
		[filteredItems],
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

			{/* Dithered background overlay */}
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

			{/* Center vertical line - dashed */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			{/* ── Hero ────────────────────────────────────── */}
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

				<div className="relative w-full pt-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="pt-16 pb-12 md:pt-24 md:pb-16">
							<p className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								{"// Community"}
							</p>
							<h1 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
								Community Resources
							</h1>
							<p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
								Projects, libraries, tutorials, videos, and
								tools built by the Effect community.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="h-px w-full bg-zinc-800" />

			{/* ── Content ─────────────────────────────────── */}
			<main id="main-content" className="relative">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					{/* Featured items */}
					{featuredItems.length > 0 && !hasActiveFilters && (
						<section aria-label="Featured resources" className="pt-12 pb-4">
							<h2 className="mb-6 text-sm font-medium tracking-wide text-zinc-400 uppercase">
								Featured
							</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								{featuredItems.map((item) => (
									<FeaturedItemCard
										key={item.url}
										item={item}
									/>
								))}
							</div>
						</section>
					)}

					{/* Divider below featured */}
					{featuredItems.length > 0 && !hasActiveFilters && (
						<div className="mt-8 h-px w-full bg-zinc-800" />
					)}

					{/* ── Filters ──────────────────────────── */}
					<div className="pt-8 pb-6">
						{/* Mobile: select dropdown */}
						<div className="mb-4 lg:hidden">
							<label htmlFor="category-select" className="sr-only">
								Filter by category
							</label>
							<select
								id="category-select"
								value={activeCategory}
								onChange={(e) =>
									handleCategoryChange(
										e.target.value as Category | "All",
									)
								}
								aria-label="Filter by category"
								className="w-full rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
							>
								<option value="All">
									All categories ({categoryCounts.All})
								</option>
								{CATEGORIES.map((cat) => (
									<option key={cat} value={cat}>
										{cat} ({categoryCounts[cat]})
									</option>
								))}
							</select>
						</div>

						{/* Desktop: search + pills row */}
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
							{/* Search */}
							<div className="relative w-full sm:max-w-xs">
								<i
									className="ri-search-line pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-base text-zinc-400"
									aria-hidden="true"
								/>
								<input
									type="text"
									placeholder="Search resources..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									aria-label="Search resources"
									className="w-full rounded-md border border-zinc-800 bg-zinc-900/40 py-2.5 pr-3 pl-9 text-sm text-white placeholder-zinc-400 outline-none transition-colors focus:border-zinc-700 focus:bg-zinc-900/80 focus:ring-1 focus:ring-zinc-700"
								/>
								{searchQuery && (
									<button
										type="button"
										onClick={() => setSearchQuery("")}
										aria-label="Clear search"
										className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 text-zinc-400 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
									>
										<i
											className="ri-close-line text-base"
											aria-hidden="true"
										/>
									</button>
								)}
							</div>

							{/* Desktop category pills */}
							<nav
								aria-label="Filter by category"
								className="hidden flex-wrap items-center gap-2 lg:flex"
							>
								{(
									["All", ...CATEGORIES] as (
										| Category
										| "All"
									)[]
								).map((cat) => (
									<button
										key={cat}
										type="button"
										onClick={() =>
											handleCategoryChange(cat)
										}
										aria-current={
											activeCategory === cat
												? "true"
												: undefined
										}
										className={`rounded-md border px-3 py-1.5 text-xs font-medium tabular-nums transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
											activeCategory === cat
												? "border-zinc-600 bg-zinc-800 text-white"
												: "border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
										}`}
									>
										{cat}
										<span className="ml-1.5 text-zinc-400">
											{categoryCounts[cat]}
										</span>
									</button>
								))}
							</nav>
						</div>
					</div>

					{/* Screen-reader result count */}
					<div
						aria-live="polite"
						aria-atomic="true"
						className="sr-only"
					>
						{filteredItems.length === 0
							? "No resources found"
							: `${filteredItems.length} resource${filteredItems.length === 1 ? "" : "s"} found`}
					</div>

					{/* Visible result count */}
					{hasActiveFilters && filteredItems.length > 0 && (
						<p className="pb-4 text-sm text-zinc-400">
							{filteredItems.length} result
							{filteredItems.length === 1 ? "" : "s"}
							{activeCategory !== "All" &&
								` in ${activeCategory}`}
							{searchQuery.trim() &&
								` matching "${searchQuery}"`}
						</p>
					)}

					{/* ── Results ──────────────────────────── */}
					{filteredItems.length > 0 ? (
						<section
							aria-label="Resource list"
							key={`${activeCategory}-${searchQuery}`}
							className="blog-grid-enter pb-16 md:pb-24"
						>
							{/* Single column on mobile, two columns on lg */}
							<div className="grid grid-cols-1 lg:grid-cols-2">
								{/* Left column */}
								<div className="flex flex-col lg:border-r lg:border-dashed lg:border-zinc-800/60 lg:pr-4">
									{leftColumnItems.map((item, idx) => (
										<div
											key={item.url}
											className={
												idx <
												leftColumnItems.length - 1
													? "border-b border-zinc-800/40"
													: "lg:border-b lg:border-zinc-800/40"
											}
										>
											<ItemRow item={item} />
										</div>
									))}
								</div>
								{/* Right column */}
								<div className="flex flex-col lg:pl-4">
									{rightColumnItems.map((item, idx) => (
										<div
											key={item.url}
											className={
												idx <
												rightColumnItems.length - 1
													? "border-b border-zinc-800/40"
													: ""
											}
										>
											<ItemRow item={item} />
										</div>
									))}
								</div>
							</div>
						</section>
					) : (
						/* ── Empty state ──────────────────── */
						<div className="flex flex-col items-center justify-center py-16 md:py-24">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900/60">
								<i
									className="ri-search-line text-2xl text-zinc-400"
									aria-hidden="true"
								/>
							</div>
							<p className="mt-6 text-base font-medium text-zinc-300">
								No resources found
							</p>
							<p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-zinc-400">
								{searchQuery.trim()
									? `Nothing matched "${searchQuery}". Try a different search term or browse by category.`
									: "No resources match the selected category."}
							</p>

							{/* Suggested categories */}
							<div className="mt-6 flex flex-wrap items-center justify-center gap-2">
								{CATEGORIES.slice(0, 3).map((cat) => (
									<button
										key={cat}
										type="button"
										onClick={() =>
											handleCategoryChange(cat)
										}
										className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
									>
										{cat}
									</button>
								))}
							</div>

							<button
								type="button"
								onClick={clearFilters}
								className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
							>
								Clear all filters
							</button>
						</div>
					)}

					{/* ── Submit CTA ──────────────────────── */}
					<section
						aria-label="Submit a resource"
						className="border-t border-zinc-800 py-12 md:py-16"
					>
						<div className="mx-auto max-w-md text-center">
							<div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/60">
								<i
									className="ri-add-line text-lg text-zinc-400"
									aria-hidden="true"
								/>
							</div>
							<h2 className="text-base font-medium text-zinc-200">
								Submit a resource
							</h2>
							<p className="mt-2 text-sm leading-relaxed text-zinc-400">
								Built something with Effect? Share it with the
								community. Open a PR to add your project or
								reach out on Discord.
							</p>
							<div className="mt-5 flex items-center justify-center gap-3">
								<a
									href="https://github.com/Effect-TS/effect"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
								>
									<i
										className="ri-github-fill text-base"
										aria-hidden="true"
									/>
									GitHub
								</a>
								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
								>
									<i
										className="ri-discord-fill text-base"
										aria-hidden="true"
									/>
									Discord
								</a>
							</div>
						</div>
					</section>
				</div>
			</main>

			<Footer hideCommunityBorder />
		</div>
	);
}
