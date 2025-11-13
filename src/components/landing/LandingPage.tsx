import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { AISection } from "./AISection";
import { VisualEffectShowcaseSection } from "./VisualEffectShowcaseSection";
import { DevToolsSection } from "./DevToolsSection";
import { PlaygroundSection } from "./PlaygroundSection";
import { QuotesSection } from "./QuotesSection";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white antialiased">
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="text-whiteno-underline absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:left-0 focus:top-0"
			>
				Skip to main content
			</a>

			<Navigation />

			{/* Main Content */}
			<main id="main-content" className="relative w-full pt-20">
				{/* Decorative dashed borders */}
				<div
					className="absolute left-0 top-[5rem] hidden lg:block"
					style={{
						width: "calc(max((100vw - 80rem) / 2, 40px))",
						height: "1px",
						background: "linear-gradient(to right, #3f3f46 0%, #09090b 100%)",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				></div>
				<div
					className="absolute right-0 top-[5rem] hidden lg:block"
					style={{
						width: "calc(max((100vw - 80rem) / 2, 40px))",
						height: "1px",
						background: "linear-gradient(to left, #3f3f46 0%, #09090b 100%)",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				></div>

				<HeroSection />
			</main>

			<FeaturesSection />
			<TestimonialsSection />
			<AISection />
			<VisualEffectShowcaseSection />
			<PlaygroundSection />
			<DevToolsSection />
			<QuotesSection />
			<FAQSection />
			<CTASection />
			<Footer />
		</div>
	);
}
