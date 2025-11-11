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
			<div className="relative pb-16 pt-16 md:pt-20">
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
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
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
							<div className="mb-8 flex w-full items-center justify-between">
								<h2 className="font-inter text-2xl font-semibold leading-tight text-white">
									Enterprise-grade from day one!
								</h2>
								<a
									href="https://effect.website/docs/introduction"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
								>
									<span>Learn Effect</span>
									<i className="ri-arrow-right-line text-base"></i>
								</a>
							</div>

							<table
								className="relative w-full border-collapse"
								style={{
									borderStyle: "dashed",
									borderWidth: "1px",
									borderColor: "#3f3f46",
									tableLayout: "fixed",
								}}
							>
								<tbody>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/context-management/services/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Dependency injection</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/error-management/two-error-types/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Errors as values</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/concurrency/basic-concurrency/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Structured concurrency</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/error-management/retrying/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Retry policies</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/observability/logging/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Observability</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/schema/introduction/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Schema validation</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/resource-management/introduction/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Resource management</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/runtime/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Runtime</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/scheduling/introduction/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Scheduling</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/context-management/services/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Services</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/context-management/layers/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Layers</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/state-management/ref/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">States</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/stream/introduction/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Streams</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/sink/introduction/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Sinks</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/caching/caching-effects/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Caching</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
									<tr>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/data-types/bigdecimal/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Data types</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="https://effect.website/docs/testing/test-clock/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">TestClock</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
										<td style={{ borderStyle: "dashed", borderWidth: "1px", borderColor: "#3f3f46" }}>
											<a
												href="#"
												className="flex w-full items-center justify-between gap-[6px] bg-zinc-950 px-6 py-5 font-mono text-base uppercase tracking-[0.02em] text-white transition-colors hover:bg-zinc-900/50"
											>
												<span className="leading-tight">Config parsing</span>
												<i className="ri-arrow-right-line text-base text-white"></i>
											</a>
										</td>
									</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			</div>
		</section>
	);
}
