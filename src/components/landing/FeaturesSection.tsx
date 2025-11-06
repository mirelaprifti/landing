import { useState } from "react";
import { ComplexityChart } from "./ComplexityChart";

const FEATURES = [
	{ id: "dependency-injection", label: "Dependency injection" },
	{ id: "errors", label: "Errors as values" },
	{ id: "retry", label: "Retry logic" },
	{ id: "concurrency", label: "Structured concurrency" },
	{ id: "observability", label: "Observability" },
];

const PROBLEMS = [
	{ text: "Async flows", subtext: " turn into spaghetti" },
	{ text: "Errors go uncaught", subtext: " until production" },
	{ text: "Global state leaks", subtext: " across modules" },
	{ text: "Tests", subtext: " become painful" },
	{ text: "Poor observability", subtext: " or non-existent" },
];

export function FeaturesSection() {
	const [activeFeatures, setActiveFeatures] = useState(31); // 31 = 0b11111 (all 5 features active)

	const toggleFeature = (index: number) => {
		setActiveFeatures((prev) => {
			const featureMask = 1 << index;
			return prev ^ featureMask;
		});
	};

	const countActiveFeatures = () => {
		return FEATURES.filter((_, index) => (activeFeatures & (1 << index)) !== 0)
			.length;
	};

	const activeCount = countActiveFeatures();

	return (
		<section className="relative w-full">
			{/* Full-width horizontal solid line */}
			<div className="relative left-0 right-0 h-[1px] bg-zinc-700"></div>

			{/* Content Container */}
			<div className="relative pb-16 pt-16 md:pt-24">
				{/* [hidden] Top Row: Chart + Missing Standard Library */}
				<div className="relative mb-16 grid w-full grid-cols-1 gap-12 px-4 md:mb-24 md:gap-16 md:px-8 lg:mx-auto lg:max-w-[66.5rem] lg:grid-cols-10 hidden">
					{/* Left: Chart */}
					<div className="w-full lg:col-span-6">
						<div className="max-w-[650px] rounded-[12px] border-2 border-zinc-800 p-[16px] lg:w-full">
							<ComplexityChart activeFeatures={activeCount} />
							{/* Legend */}
							<div className="mt-4 flex flex-wrap items-center gap-3 md:gap-4">
								<span className="w-full font-mono text-sm uppercase leading-[1] text-zinc-400 sm:w-auto">
									Complexity at scale:
								</span>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<i
											className="ri-git-commit-fill inline-flex items-center text-[18px] leading-[1] text-[#ef4444]"
											style={{ height: "14px" }}
										></i>
										<span className="font-mono text-sm uppercase leading-[1] text-zinc-400">
											Without Effect
										</span>
									</div>
									<div className="flex items-center gap-2">
										<i
											className="ri-git-commit-fill inline-flex items-center text-[18px] leading-[1] text-[#22c55e]"
											style={{ height: "14px" }}
										></i>
										<span className="font-mono text-sm uppercase leading-[1] text-zinc-400">
											With Effect
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Missing Standard Library */}
					<div className="flex flex-col gap-8 lg:col-span-4">
						<h2 className="text-xl font-bold leading-tight text-white">
							For when your codebase hits 10k lines and ...
						</h2>
						<div className="flex w-full flex-col items-start">
							{PROBLEMS.map((problem, index) => (
								<div key={index} className="w-full">
									<div className="py-3">
										<p className="text-base leading-normal">
											<span className="text-zinc-100">{problem.text}</span>
											<span className="text-zinc-400">{problem.subtext}</span>
										</p>
									</div>
									{index < PROBLEMS.length - 1 && (
										<img
											src="/assets/deco-line-alert.svg"
											alt=""
											role="presentation"
											aria-hidden="true"
											className="w-full min-[480px]:max-w-[18.5rem]"
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Dashed separator line */}
				<div
					className="h-[1px] w-full hidden"
					style={{
						background: "#3f3f46",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				></div>

				{/* Enterprise Grade */}
				<div className="relative mx-auto flex max-w-[66.5rem] flex-col gap-10 px-4 md:px-8">
					{/* Left: Content */}
					<div className="relative my-16 w-full md:my-0 flex flex-col items-center text-center">
						<h3 className="mb-4 text-3xl font-bold leading-normal text-white">
							Enterprise-grade from day one!
						</h3>
					</div>

					{/* Right: Enterprise Grade Box */}
					<div
						className="relative flex w-full items-center justify-center"
						data-enterprise-section
					>
						<div className="items-left mb-0 mt-8 flex w-full flex-col md:mt-0 md:items-center">
							{/* Shared SVG gradient definition for all enterprise icons */}
							<svg
								width="0"
								height="0"
								style={{ position: "absolute" }}
								role="presentation"
							>
								<defs>
									<linearGradient
										id="enterpriseIconGradient"
										x1="0%"
										y1="0%"
										x2="0%"
										y2="100%"
									>
										<stop
											offset="0%"
											style={{ stopColor: "#86efac", stopOpacity: 1 }}
										/>
										<stop
											offset="100%"
											style={{ stopColor: "#4d8963", stopOpacity: 1 }}
										/>
									</linearGradient>
								</defs>
							</svg>
							<div
								className="animated-gradient-border relative w-full rounded-xl px-4 py-5 lg:px-12 lg:pt-12 lg:pb-16 overflow-hidden"
							>
								<div className="mb-0 flex flex-wrap justify-center gap-2">
									{[
										{
											href: "https://effect.website/docs/context-management/services/",
											icon: "ri-arrow-right-line",
											text: "Dependency injection",
										},
										{
											href: "https://effect.website/docs/error-management/two-error-types/",
											icon: "ri-arrow-right-line",
											text: "Errors as values",
										},
										{
											href: "https://effect.website/docs/concurrency/basic-concurrency/",
											icon: "ri-arrow-right-line",
											text: "Structured concurrency",
										},
										{
											href: "https://effect.website/docs/error-management/retrying/",
											icon: "ri-arrow-right-line",
											text: "Retry policies",
										},
										{
											href: "https://effect.website/docs/observability/logging/",
											icon: "ri-arrow-right-line",
											text: "Observability",
										},
										{
											href: "https://effect.website/docs/schema/introduction/",
											icon: "ri-arrow-right-line",
											text: "Schema validation",
										},
										{
											href: "https://effect.website/docs/resource-management/introduction/",
											icon: "ri-arrow-right-line",
											text: "Resource management",
										},
										{
											href: "https://effect.website/docs/runtime/",
											icon: "ri-arrow-right-line",
											text: "Runtime",
										},
										{
											href: "https://effect.website/docs/scheduling/introduction/",
											icon: "ri-arrow-right-line",
											text: "Scheduling",
										},
										{
											href: "https://effect.website/docs/context-management/services/",
											icon: "ri-arrow-right-line",
											text: "Services",
										},
										{
											href: "https://effect.website/docs/context-management/layers/",
											icon: "ri-arrow-right-line",
											text: "Layers",
										},
										{
											href: "https://effect.website/docs/state-management/ref/",
											icon: "ri-arrow-right-line",
											text: "States",
										},
										{
											href: "https://effect.website/docs/stream/introduction/",
											icon: "ri-arrow-right-line",
											text: "Streams",
										},
										{
											href: "https://effect.website/docs/sink/introduction/",
											icon: "ri-arrow-right-line",
											text: "Sinks",
										},
										{
											href: "https://effect.website/docs/caching/caching-effects/",
											icon: "ri-arrow-right-line",
											text: "Caching",
										},
										{
											href: "https://effect.website/docs/data-types/bigdecimal/",
											icon: "ri-arrow-right-line",
											text: "Data types",
										},
										{
											href: "https://effect.website/docs/testing/test-clock/",
											icon: "ri-arrow-right-line",
											text: "TestClock",
										},
										{
											href: "#",
											icon: "ri-arrow-right-up-line",
											text: "Config parsing",
										},
									].map((item, index) => (
										<a
											// biome-ignore lint/suspicious/noArrayIndexKey: It's okay. Just chill, Biome.
											key={index}
											href={item.href}
											{...(item.href.startsWith("http")
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
											className="flex items-center justify-center gap-[6px] rounded-lg border border-zinc-600 bg-zinc-950 px-4 py-3 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
										>
											<span className="leading-none">{item.text}</span>
											<i
												className={`${item.icon} text-base text-white`}
											></i>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
