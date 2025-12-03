import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { AISection } from "./AISection";
import { DevToolsSection } from "./DevToolsSection";
import { QuotesSection } from "./QuotesSection";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";
import { GridOverlay } from "../GridOverlay";

export function LandingPage() {
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
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-[60] hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div
						className="absolute left-0 top-0 bottom-0"
						style={{
							width: "1px",
							background: "#18181b",
						}}
					></div>
					{/* Right vertical line */}
					<div
						className="absolute right-0 top-0 bottom-0"
						style={{
							width: "1px",
							background: "#18181b",
						}}
					></div>
				</div>
			</div>

			{/* Main Content */}
			<main id="main-content" className="relative w-full pt-20">
				<HeroSection />
			</main>

			<TestimonialsSection />
			<AISection />
			<DevToolsSection />
			<QuotesSection />
			<FAQSection />
			<CTASection />
			<Footer />
		</div>
	);
}
