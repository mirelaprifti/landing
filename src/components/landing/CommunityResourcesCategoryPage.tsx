import { useMemo } from "react";
import {
	CATEGORY_COLORS,
	CATEGORY_DISPLAY_NAMES,
	CATEGORY_ICONS,
	CATEGORY_SLUGS,
	COMMUNITY_ITEMS,
	type Category,
	type CommunityItem,
} from "../../data/resources";
import { GridOverlay } from "../GridOverlay";
import { getAssetPath } from "../../utils/assetPath";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

// ── Resource Card ────────────────────────────────────────────────

function ResourceCard({
	item,
	color,
}: {
	item: CommunityItem;
	color: (typeof CATEGORY_COLORS)[Category];
}) {
	const rgb = color.rgb;

	return (
		<a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
			onMouseEnter={(e) => {
				const el = e.currentTarget;
				el.style.borderColor = "rgba(82, 82, 91, 0.9)";
				el.style.boxShadow = `0 16px 32px -8px rgba(${rgb}, 0.1), 0 0 0 1px rgba(${rgb}, 0.06)`;
			}}
			onMouseLeave={(e) => {
				const el = e.currentTarget;
				el.style.borderColor = "";
				el.style.boxShadow = "";
			}}
		>
			{/* Left accent stripe */}
			<div
				className="pointer-events-none absolute top-3 bottom-3 left-0 w-px rounded-r-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
				style={{ backgroundColor: `rgba(${rgb}, 0.5)` }}
			/>
			<div
				className="pointer-events-none absolute top-3 bottom-3 left-0 w-px rounded-r-full opacity-0 blur-[3px] transition-all duration-300 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2"
				style={{ backgroundColor: `rgba(${rgb}, 0.6)` }}
			/>

			{/* Bottom edge glow on hover */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.4), transparent)`,
				}}
			/>

			{/* Tags */}
			{item.tags && item.tags.length > 0 && (
				<div className="relative mb-3 flex flex-wrap gap-1.5">
					{item.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className="rounded-full px-2 py-0.5 text-xs text-zinc-300"
							style={{
								border: `1px solid rgba(${rgb}, 0.15)`,
								backgroundColor: `rgba(${rgb}, 0.06)`,
							}}
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* Title */}
			<h3 className="relative text-base font-semibold text-white leading-snug">
				{item.title}
				<i
					className="ri-arrow-right-up-line ml-1 text-xs text-zinc-500 transition-all duration-300 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

// ── Category Page ────────────────────────────────────────────────

export function CommunityResourcesCategoryPage({
	category,
}: {
	category: Category;
}) {
	const color = CATEGORY_COLORS[category];
	const icon = CATEGORY_ICONS[category];
	const displayName = CATEGORY_DISPLAY_NAMES[category];

	const items = useMemo(() => {
		return COMMUNITY_ITEMS.filter((item) => item.category === category)
			.sort(
				(a, b) =>
					new Date(b.dateAdded).getTime() -
					new Date(a.dateAdded).getTime(),
			);
	}, [category]);

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
							{/* Breadcrumb */}
							<nav
								aria-label="Breadcrumb"
								className="mb-6 flex items-center gap-2 font-mono text-sm uppercase tracking-wider"
							>
								<span className="text-zinc-600">{"// "}</span>
								<a
									href="/community-resources"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									Community Resources
								</a>
								<i
									className="ri-arrow-right-s-line text-zinc-600"
									aria-hidden="true"
								/>
								<div className="flex items-center gap-2">
									<div
										className={`flex h-5 w-5 items-center justify-center rounded ${color.bg}`}
									>
										<i
											className={`${icon} text-xs ${color.text}`}
											aria-hidden="true"
										/>
									</div>
									<span className="text-zinc-200">
										{displayName}
									</span>
								</div>
							</nav>

							<div>
								<h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
									{displayName}
								</h1>
								<p className="mt-1 text-sm text-zinc-400">
									{items.length} resource
									{items.length === 1 ? "" : "s"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="h-px w-full bg-zinc-800" />

			{/* ── Content ─────────────────────────────────── */}
			<main id="main-content" className="relative">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="py-12 md:py-16">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{items.map((item) => (
								<ResourceCard
									key={item.url}
									item={item}
									color={color}
								/>
							))}
						</div>
					</div>

					{/* ── Back link ────────────────────────── */}
					<div className="border-t border-zinc-800 py-8">
						<a
							href="/community-resources"
							className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
						>
							<i
								className="ri-arrow-left-line text-sm"
								aria-hidden="true"
							/>
							Back to Community Resources
						</a>
					</div>

					{/* ── Submit CTA ──────────────────────── */}
					<section
						aria-label="Share your project"
						className="border-t border-zinc-800 py-12 md:py-16"
					>
						<div className="mx-auto max-w-lg text-center">
							<div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800/60">
								<img
									src={getAssetPath(
										"/assets/effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
									)}
									alt="Effect"
									className="h-6 w-6"
								/>
							</div>
							<h2 className="text-3xl font-bold text-white">
								Share your Effect project
							</h2>
							<p className="mt-3 mb-2 text-lg text-zinc-400">
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
