import { useState } from "react";
import { GridOverlay } from "../GridOverlay";
import { AISection } from "./AISection";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { LaunchBanner } from "./LaunchBanner";
import { LaunchConfetti } from "./LaunchConfetti";
import { Navigation } from "./Navigation";
import { ProblemSection } from "./ProblemSection";
import { QuotesGridSection } from "./QuotesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhatIsEffectSection } from "./WhatIsEffectSection";

function SectionDivider() {
	return <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />;
}

/**
 * v4 launch variant of the landing page — duplicated from LandingPage so the
 * launch design can be tweaked independently. Route: /launch
 */
export function LaunchLandingPage() {
	const [bannerVisible, setBannerVisible] = useState(true);

	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			{/* One-time celebration on load */}
			<LaunchConfetti />

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
				<HeroSection />
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
				<CTASection />
			</main>

			<Footer hideCommunityBorder />
		</div>
	);
}
