import { Navigation } from "../landing/Navigation";
import { Footer } from "../landing/Footer";
import { GridOverlay } from "../GridOverlay";
import { LP2Hero } from "./LP2Hero";
import { PainPointsSection } from "./PainPointsSection";
import { LP2Features } from "./LP2Features";
import { LP2AI } from "./LP2AI";
import { LP2CTA } from "./LP2CTA";
import { QuotesGridSection } from "../landing/QuotesSection";

function SectionDivider() {
	return <div className="h-px w-full bg-zinc-800" />;
}

export function LandingPageV2() {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white antialiased">
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="text-whiteno-underline absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:left-0 focus:top-0"
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
							width: '1px',
							backgroundImage: 'repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)'
						}}
					/>
				</div>
			</div>

			{/* Main Content */}
			<main id="main-content" className="relative w-full pt-16">
				<LP2Hero />
				<SectionDivider />
				<PainPointsSection />
				<SectionDivider />
				<LP2Features />
				<SectionDivider />
				<LP2AI />
				<SectionDivider />
				<QuotesGridSection />
				<SectionDivider />
				<LP2CTA />
			</main>

			<Footer />
		</div>
	);
}
