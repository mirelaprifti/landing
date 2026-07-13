import { useState } from "react";
import { GridOverlay } from "../GridOverlay";
import { AISection } from "./AISection";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";
import { LaunchAurora } from "./LaunchAurora";
import { LaunchBanner } from "./LaunchBanner";
import { LaunchCircuitTraces } from "./LaunchCircuitTraces";
import { LaunchGridPulse } from "./LaunchGridPulse";
import { LaunchHeroSection } from "./LaunchHeroSection";
import { Navigation } from "./Navigation";
import { ProblemSection } from "./ProblemSection";
import { QuotesGridSection } from "./QuotesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhatIsEffectSection } from "./WhatIsEffectSection";

function SectionDivider() {
	return <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />;
}

type Decoration =
	| "none"
	| "grid-pulse"
	| "circuit"
	| "version-flip"
	| "glint"
	| "aurora";

const DECORATIONS: { id: Decoration; label: string }[] = [
	{ id: "grid-pulse", label: "Grid pulse" },
	{ id: "circuit", label: "Circuit" },
	{ id: "version-flip", label: "Version flip" },
	{ id: "glint", label: "Glint" },
	{ id: "aurora", label: "Aurora" },
	{ id: "none", label: "None" },
];

/** Review-only switcher for comparing launch decorations. Remove before launch. */
function DecorationSwitcher({
	active,
	onSelect,
	onReplay,
}: {
	active: Decoration;
	onSelect: (d: Decoration) => void;
	onReplay: () => void;
}) {
	return (
		<div className="fixed right-4 bottom-4 z-[400] flex flex-col gap-1 rounded-md border border-zinc-300 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95">
			<div className="flex items-center justify-between gap-3 px-1 pb-1">
				<span className="font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
					Launch FX
				</span>
				<button
					type="button"
					onClick={onReplay}
					aria-label="Replay decoration"
					className="flex h-5 w-5 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
				>
					<i className="ri-restart-line text-sm" aria-hidden="true" />
				</button>
			</div>
			{DECORATIONS.map((d) => (
				<button
					key={d.id}
					type="button"
					onClick={() => onSelect(d.id)}
					className={`rounded px-2.5 py-1 text-left font-mono text-xs tracking-wider uppercase transition-colors ${
						active === d.id
							? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
							: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
					}`}
				>
					{d.label}
				</button>
			))}
		</div>
	);
}

/**
 * v4 launch variant of the landing page — duplicated from LandingPage so the
 * launch design can be tweaked independently. Route: /launch
 */
export function LaunchLandingPage() {
	const [bannerVisible, setBannerVisible] = useState(true);
	const [decoration, setDecoration] = useState<Decoration>("grid-pulse");
	const [replayKey, setReplayKey] = useState(0);

	// Grid origin in viewport px: banner (40, when visible) + navbar (64)
	const gridTop = bannerVisible ? 104 : 64;

	const selectDecoration = (d: Decoration) => {
		setDecoration(d);
		setReplayKey((k) => k + 1);
	};

	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			{/* Launch decoration under review — switcher bottom-right */}
			{decoration === "grid-pulse" && (
				<LaunchGridPulse key={replayKey} gridTop={gridTop} />
			)}
			{decoration === "circuit" && (
				<LaunchCircuitTraces key={replayKey} gridTop={gridTop} />
			)}
			{decoration === "aurora" && <LaunchAurora key={replayKey} />}

			<DecorationSwitcher
				active={decoration}
				onSelect={selectDecoration}
				onReplay={() => setReplayKey((k) => k + 1)}
			/>

			{/* Site-wide launch banner above the navbar */}
			<LaunchBanner onVisibilityChange={setBannerVisible} />

			{/* Dithered background overlay - subtle texture across entire page (dark mode only) */}
			<div
				className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.03] dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-200 px-6 py-4 font-semibold text-zinc-900 no-underline focus:left-0 focus:top-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation belowBanner={bannerVisible} />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 text-zinc-200 dark:text-zinc-800"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			{/* Main Content — extra top padding while the banner is visible */}
			<main
				id="main-content"
				className={`relative w-full ${bannerVisible ? "pt-26" : "pt-16"}`}
			>
				<LaunchHeroSection
					key={`hero-${decoration}-${replayKey}`}
					versionFlip={decoration === "version-flip"}
					headlineGlint={decoration === "glint"}
				/>
				<FeaturesSection />
				<SectionDivider />
				<TestimonialsSection />
				<SectionDivider />
				<ProblemSection />
				<SectionDivider />
				<WhatIsEffectSection />
				<SectionDivider />
				<AISection />
				<SectionDivider />
				<QuotesGridSection />
				<SectionDivider />
				<FAQSection />
				<SectionDivider />
				<CTASection v4Stable />
			</main>

			<Footer hideCommunityBorder />
		</div>
	);
}
