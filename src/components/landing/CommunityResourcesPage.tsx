import { useMemo, useState } from "react";
import {
	CATEGORIES,
	CATEGORY_COLORS,
	CATEGORY_DISPLAY_NAMES,
	CATEGORY_ICONS,
	CATEGORY_SLUGS,
	COMMUNITY_ITEMS,
	type Category,
	type CommunityItem,
} from "../../data/resources";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

// ── Constants ────────────────────────────────────────────────────

const ITEMS_PER_SECTION = 8; // 4 columns × 2 rows

// ── Resource Card ────────────────────────────────────────────────

function ResourceCard({
	item,
}: {
	item: CommunityItem;
}) {
	return (
		<a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
		>
			{/* Hover glow */}
			<div
				className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)",
				}}
			/>

			{/* Title */}
			<h3 className="relative text-base font-semibold text-white leading-snug">
				{item.title}
				<i
					className="ri-arrow-right-up-line ml-1 text-xs text-zinc-500 transition-colors group-hover:text-zinc-300"
					aria-hidden="true"
				/>
			</h3>

			{/* Description */}
			<p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
				{item.description}
			</p>

			{/* Footer */}
			<div className="relative mt-auto pt-8">
				<span className="font-mono text-xs uppercase text-zinc-400">{item.author}</span>
			</div>
		</a>
	);
}

// ── Featured Item Card ───────────────────────────────────────────

function FeaturedItemCard({ item }: { item: CommunityItem }) {
	return (
		<a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-900/20 transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
		>
			{/* Thumbnail */}
			{item.thumbnail && (
				<div className="relative aspect-video w-full overflow-hidden">
					<img
						src={item.thumbnail}
						alt=""
						className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
						loading="lazy"
					/>
					{/* Gradient overlay for depth */}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
					{/* Play icon overlay */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15 group-hover:ring-white/30">
							<i
								className="ri-play-fill text-lg"
								aria-hidden="true"
							/>
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-1 flex-col px-4 pt-4 pb-5">
				{/* Title */}
				<h3 className="relative text-[15px] font-semibold leading-snug text-white">
					{item.title}
					<i
						className="ri-arrow-right-up-line ml-1 text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
						aria-hidden="true"
					/>
				</h3>

				{/* Author */}
				<div className="relative mt-auto pt-4">
					<span className="font-mono text-xs uppercase tracking-wide text-zinc-400">{item.author}</span>
				</div>
			</div>
		</a>
	);
}

// ── Category Section ─────────────────────────────────────────────

function CategorySection({ category }: { category: Category }) {
	const color = CATEGORY_COLORS[category];
	const icon = CATEGORY_ICONS[category];
	const slug = CATEGORY_SLUGS[category];
	const displayName = CATEGORY_DISPLAY_NAMES[category];

	const items = useMemo(() => {
		return COMMUNITY_ITEMS.filter(
			(item) => item.category === category && !item.featured,
		)
			.sort(
				(a, b) =>
					new Date(b.dateAdded).getTime() -
					new Date(a.dateAdded).getTime(),
			)
			.slice(0, ITEMS_PER_SECTION);
	}, [category]);

	const totalCount = useMemo(
		() =>
			COMMUNITY_ITEMS.filter(
				(item) => item.category === category && !item.featured,
			).length,
		[category],
	);

	if (items.length === 0) return null;

	return (
		<section aria-label={`${displayName} resources`} className="py-10 md:py-14">
			{/* Section header */}
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className={`flex h-8 w-8 items-center justify-center rounded-lg ${color.bg}`}
					>
						<i
							className={`${icon} text-base ${color.text}`}
							aria-hidden="true"
						/>
					</div>
					<h2 className="text-lg font-semibold text-white">
						{displayName}
					</h2>
					<span className="text-sm text-zinc-500">{totalCount}</span>
				</div>
				<a
					href={`/community-resources/${slug}`}
					className="group/link flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
				>
					View all
					<i
						className="ri-arrow-right-line text-sm transition-transform group-hover/link:translate-x-0.5"
						aria-hidden="true"
					/>
				</a>
			</div>

			{/* 4-column grid, 2 rows max */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{items.map((item) => (
					<ResourceCard key={item.url} item={item} />
				))}
			</div>
		</section>
	);
}

// ── Search Results ───────────────────────────────────────────────

function SearchResults({
	query,
	onClear,
}: {
	query: string;
	onClear: () => void;
}) {
	const results = useMemo(() => {
		const q = query.toLowerCase();
		return COMMUNITY_ITEMS.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				item.description.toLowerCase().includes(q) ||
				item.author.toLowerCase().includes(q) ||
				item.tags?.some((t) => t.toLowerCase().includes(q)),
		).sort(
			(a, b) =>
				new Date(b.dateAdded).getTime() -
				new Date(a.dateAdded).getTime(),
		);
	}, [query]);

	if (results.length === 0) {
		return (
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
					Nothing matched &ldquo;{query}&rdquo;. Try a different
					search term.
				</p>
				<button
					type="button"
					onClick={onClear}
					className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
				>
					Clear search
				</button>
			</div>
		);
	}

	return (
		<div className="py-8">
			<p className="mb-6 text-sm text-zinc-400">
				{results.length} result{results.length === 1 ? "" : "s"}{" "}
				matching &ldquo;{query}&rdquo;
			</p>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{results.map((item) => (
					<ResourceCard
						key={item.url}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}

// ── Main Page ────────────────────────────────────────────────────

export function CommunityResourcesPage() {
	const [searchQuery, setSearchQuery] = useState("");

	// Featured items — always visible
	const featuredItems = useMemo(
		() => COMMUNITY_ITEMS.filter((item) => item.featured),
		[],
	);

	// Categories that have at least one non-featured item
	const activeCategories = useMemo(
		() =>
			CATEGORIES.filter((cat) =>
				COMMUNITY_ITEMS.some(
					(item) => item.category === cat && !item.featured,
				),
			),
		[],
	);

	const isSearching = searchQuery.trim().length > 0;

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
							<h1 className="max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
								Community Resources
							</h1>
							<p className="mt-4 max-w-3xl text-base text-zinc-400 sm:text-lg">
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
					{/* Featured items — always visible */}
					{featuredItems.length > 0 && (
						<section
							aria-label="Featured resources"
							className="pt-12 pb-4"
						>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
					{featuredItems.length > 0 && (
						<div className="mt-8 h-px w-full bg-zinc-800" />
					)}

					{/* ── Search ──────────────────────────── */}
					<div className="pt-8 pb-2">
						<div className="relative w-full sm:max-w-md">
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
					</div>

					{/* ── Category Sections or Search Results ── */}
					{isSearching ? (
						<SearchResults
							query={searchQuery.trim()}
							onClear={() => setSearchQuery("")}
						/>
					) : (
						<div className="divide-y divide-zinc-800/60">
							{activeCategories.map((cat) => (
								<CategorySection
									key={cat}
									category={cat}
								/>
							))}
						</div>
					)}

					{/* ── Submit CTA ──────────────────────── */}
					<section
						aria-label="Share your project"
						className="border-t border-zinc-800 py-12 md:py-16"
					>
						<div className="mx-auto max-w-lgRe text-center">
							<div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/60">
								<img
									src={getAssetPath(
										"/assets/effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
									)}
									alt="Effect"
									className="h-5 w-5"
								/>
							</div>
							<h2 className="text-3xl font-semibold text-white">
								Share your Effect project
							</h2>
							<p className="mt-3 text-lg leading-relaxed text-zinc-400">
								Built something with Effect? Join the Discord
								and share it with the community.
							</p>
							<a
								href="https://discord.gg/effect-ts"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
							>
								<i
									className="ri-discord-fill text-base"
									aria-hidden="true"
								/>
								Join Discord
							</a>
						</div>
					</section>
				</div>
			</main>

			<Footer hideCommunityBorder />
		</div>
	);
}
