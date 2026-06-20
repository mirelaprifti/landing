import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { FeaturesSection } from "./FeaturesSection";
import { AIBuildingSection } from "./AIBuildingSection";
import { AISection } from "./AISection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhatIsEffectSection } from "./WhatIsEffectSection";
import { QuotesGridSection } from "./QuotesSection";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";
import { GridOverlay } from "../GridOverlay";

function SectionDivider() {
	return <div className="h-px w-full bg-zinc-800" />;
}

export function LandingPage() {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white antialiased">
			{/* Dithered background overlay - subtle texture across entire page */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="text-white no-underline absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:left-0 focus:top-0"
			>
				Skip to main content
			</a>

			<Navigation />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
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

			{/* Main Content */}
			<main id="main-content" className="relative w-full pt-16">
				<HeroSection />

				{/* Slim banner bridging hero → Features — repeating // glyphs with label in the middle */}
				<div className="relative w-full overflow-hidden border-y border-zinc-800 bg-zinc-950">
					{/* Edge fades so the repeating glyphs feather out toward the sides */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent"
					/>

					<p className="relative flex items-center justify-center gap-3 overflow-hidden py-4 text-center font-mono text-xs whitespace-nowrap text-zinc-700 uppercase md:text-sm">
						<span aria-hidden="true" className="flex-1 tracking-[0.5em] text-zinc-700">
							{"// ".repeat(40)}
						</span>
						<span className="shrink-0 px-4 font-medium tracking-wider text-zinc-300">
							See Effect in action
						</span>
						<span aria-hidden="true" className="flex-1 tracking-[0.5em] text-zinc-700">
							{"// ".repeat(40)}
						</span>
					</p>
				</div>

				<FeaturesSection />
				<SectionDivider />
				<ProblemSection />
				<SectionDivider />
				<TestimonialsSection />
				<SectionDivider />
				<WhatIsEffectSection />
				<SectionDivider />
				<AIBuildingSection />
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
