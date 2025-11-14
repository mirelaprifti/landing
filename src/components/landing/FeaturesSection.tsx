import { useState } from "react";
import { ComplexityChart } from "./ComplexityChart";
import { getAssetPath } from "../../utils/assetPath";

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

const ENTERPRISE_FEATURES = [
	// Row 1
	[
		{ label: "Dependency injection", href: "https://effect.website/docs/context-management/services/" },
		{ label: "Errors as values", href: "https://effect.website/docs/error-management/two-error-types/" },
		{ label: "Structured concurrency", href: "https://effect.website/docs/concurrency/basic-concurrency/" },
	],
	// Row 2
	[
		{ label: "Retry policies", href: "https://effect.website/docs/error-management/retrying/" },
		{ label: "Observability", href: "https://effect.website/docs/observability/logging/" },
		{ label: "Schema validation", href: "https://effect.website/docs/schema/introduction/" },
	],
	// Row 3
	[
		{ label: "Resource management", href: "https://effect.website/docs/resource-management/introduction/" },
		{ label: "Runtime", href: "https://effect.website/docs/runtime/" },
		{ label: "Scheduling", href: "https://effect.website/docs/scheduling/introduction/" },
	],
	// Row 4
	[
		{ label: "Services", href: "https://effect.website/docs/context-management/services/" },
		{ label: "Layers", href: "https://effect.website/docs/context-management/layers/" },
		{ label: "States", href: "https://effect.website/docs/state-management/ref/" },
	],
	// Row 5
	[
		{ label: "Streams", href: "https://effect.website/docs/stream/introduction/" },
		{ label: "Sinks", href: "https://effect.website/docs/sink/introduction/" },
		{ label: "Caching", href: "https://effect.website/docs/caching/caching-effects/" },
	],
	// Row 6
	[
		{ label: "Data types", href: "https://effect.website/docs/data-types/bigdecimal/" },
		{ label: "TestClock", href: "https://effect.website/docs/testing/test-clock/" },
		{ label: "Config parsing", href: "#" },
	],
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
											src={getAssetPath("/assets/deco-line-alert.svg")}
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

				{/* Hidden - Dashed separator line */}
				<div
					className="h-[1px] w-full hidden"
					style={{
						background: "#3f3f46",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 1px, transparent 1px, transparent 1px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 1px, transparent 1px, transparent 1px)",
					}}
				></div>

				{/* Enterprise Grade */}
				<div className="relative mx-auto flex max-w-[66.5rem] flex-col px-4 md:px-0">
					{/* Enterprise Grade Box */}
					<div
						className="relative flex w-full items-center justify-center"
						data-enterprise-section
					>
						<div className="flex w-full flex-col items-start md:items-center">
							{/* Heading with Learn Effect link */}
							<div className="mb-6 flex w-full items-start justify-between">
								<h2 className="font-inter text-2xl font-semibold leading-tight text-white">
									Primitives for production
								</h2>
								<a
									href="https://effect.website/docs/introduction"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-[6px] flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
								>
									<span>Learn Effect</span>
									<i className="ri-arrow-right-line text-base"></i>
								</a>
							</div>

							<div className="w-full border border-zinc-800 rounded-xl overflow-hidden p-5">
								<div
									className="grid grid-cols-3 gap-x-5"
									style={{
										borderTop: "1px solid rgba(63, 63, 70, 0.5)",
										borderBottom: "1px solid rgba(63, 63, 70, 0.5)",
										background: "linear-gradient(to bottom, #09090b, #09090b)"
									}}
								>
									{ENTERPRISE_FEATURES.flat().map((cell, index) => {
										const rowIndex = Math.floor(index / 3);
										const isLastInColumn = rowIndex === ENTERPRISE_FEATURES.length - 1;
										return (
											<div
												key={index}
												style={{
													borderBottom: !isLastInColumn ? "1px solid rgba(63, 63, 70, 0.5)" : "none",
												}}
											>
												<a
													href={cell.href}
													{...(cell.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
													className="flex w-full items-center justify-between gap-[6px] px-6 py-6 font-mono text-base tracking-[0.02em] text-zinc-200 transition-colors hover:bg-zinc-800/70"
												>
													<span className="leading-tight">{cell.label}</span>
													<i className="ri-arrow-right-line text-base text-zinc-400/80"></i>
												</a>
											</div>
										);
									})}
								</div>
						</div>
					</div>
					</div>
				</div>
			</div>
	</section>
	);
}
