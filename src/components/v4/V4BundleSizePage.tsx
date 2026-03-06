import { Navigation } from "../landing/Navigation";
import { Footer } from "../landing/Footer";
import { GridOverlay } from "../GridOverlay";
import { RuntimePerformanceSection } from "./RuntimePerformanceSection";
import { BundleSizeSection } from "./BundleSizeSection";
import { PackageConsolidationSection } from "./PackageConsolidationSection";
import { UnifiedVersioningSection } from "./UnifiedVersioningSection";
import { UnstableModulesSection } from "./UnstableModulesSection";

function SectionDivider() {
	return <div className="h-px w-full bg-zinc-800" />;
}

export function V4BundleSizePage() {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white antialiased">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:left-0 focus:top-0"
			>
				Skip to main content
			</a>

			<Navigation />
			<GridOverlay />

			{/* Vertical border lines */}
			<div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />
					<div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			{/* Center dashed line */}
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

			<main
				id="main-content"
				className="relative w-full pt-16"
				style={{ overflowAnchor: "none" }}
			>
				<RuntimePerformanceSection />
				<SectionDivider />
				<BundleSizeSection />
				<SectionDivider />
				<PackageConsolidationSection />
				<SectionDivider />
				<UnifiedVersioningSection />
				<SectionDivider />
				<UnstableModulesSection />
			</main>

			<Footer hideCommunityBorder />
		</div>
	);
}
