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

function AlertIcon({ gradientId }: { gradientId: string }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="flex-shrink-0"
		>
			<defs>
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
					<stop
						offset="100%"
						style={{ stopColor: "#731f1f", stopOpacity: 1 }}
					/>
				</linearGradient>
			</defs>
			<path
				d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM4.20568 19.0002H19.7941L11.9999 5.50017L4.20568 19.0002ZM10.9999 16.0002H12.9999V18.0002H10.9999V16.0002ZM10.9999 9.00017H12.9999V14.0002H10.9999V9.00017Z"
				fill={`url(#${gradientId})`}
			/>
		</svg>
	);
}

export function FeaturesSection() {
	const [activeFeatures, setActiveFeatures] = useState(5);

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
			<div className="relative pb-0 pt-16 md:pt-24">
				{/* Top Row: Chart + Missing Standard Library */}
				<div className="relative mb-16 grid w-full grid-cols-1 gap-12 px-4 md:mb-24 md:gap-16 md:px-8 lg:mx-auto lg:max-w-[66.5rem] lg:grid-cols-10">
					{/* Left: Chart */}
					<div className="w-full md:col-span-6">
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
					<div className="flex flex-col gap-[32px] lg:col-span-4">
						<h2 className="text-2xl font-bold leading-tight text-white">
							The missing standard library for TypeScript
						</h2>
						<div className="flex flex-col gap-3">
							{FEATURES.map((feature, index) => {
								const isActive = (activeFeatures & (1 << index)) !== 0;
								return (
									<div
										key={feature.id}
										className="toggle-row flex cursor-pointer items-center gap-3"
										onClick={() => toggleFeature(index)}
									>
										<div
											className={`toggle-switch ${isActive ? "active" : ""}`}
										>
											<div className="toggle-track"></div>
											<div className="toggle-thumb"></div>
										</div>
										<span className="text-lg leading-normal text-zinc-200">
											{feature.label}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Dashed separator line */}
				<div
					className="h-[1px] w-full"
					style={{
						background: "#3f3f46",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				></div>

				{/* Bottom Row: Problems List + Enterprise Grade */}
				<div className="relative mx-auto flex max-w-[66.5rem] flex-col gap-0 px-4 md:flex-row md:gap-12 md:px-8 lg:gap-12">
					{/* Left: Problems List */}
					<div className="relative my-16 w-full flex-1 md:my-24">
						<h3 className="mb-8 text-xl font-bold leading-normal text-white">
							For when your codebase hits 10k lines and ...
						</h3>
						<div className="flex w-full flex-col items-start">
							{PROBLEMS.map((problem, index) => (
								<div key={index} className="w-full">
									<div className="flex items-center gap-2 py-3">
										<AlertIcon gradientId={`alertIconGradient${index + 1}`} />
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

					{/* Right: Enterprise Grade */}
					<div
						className="relative flex w-full items-center justify-center md:max-w-[56%]"
						data-enterprise-section
					>
						{/* Vertical dashed borders */}
						<div
							className="absolute left-0 top-0 hidden h-full w-[1px] lg:block"
							style={{
								background:
									"linear-gradient(to bottom, #3f3f46 0%, #09090b 100%)",
								WebkitMask:
									"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
								mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							}}
						></div>
						<div
							className="absolute right-0 top-0 hidden h-full w-[1px] lg:block"
							style={{
								background:
									"linear-gradient(to bottom, #3f3f46 0%, #09090b 100%)",
								WebkitMask:
									"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
								mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							}}
						></div>

						<div className="items-left mb-24 mt-8 flex w-full flex-col md:mt-24 md:items-center">
							<h3 className="mb-8 text-left text-xl font-bold leading-normal text-white md:text-center">
								Enterprise-grade from day one
							</h3>
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
								className="relative w-full max-w-130 rounded-t-lg bg-linear-to-b from-zinc-950  to-zinc-900/70 px-4 py-5 lg:px-6 lg:py-8"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.5)",
									borderBottom: "none",
									WebkitMaskImage:
										"linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
									maskImage:
										"linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
								}}
							>
								<div className="mb-4 flex flex-wrap justify-center gap-2">
									{[
										{
											href: "https://effect.website/docs/schema/introduction/",
											icon: "ri-checkbox-line",
											text: "Schema validation",
										},
										{
											href: "https://effect.website/docs/resource-management/introduction/",
											icon: "ri-tools-line",
											text: "Resource management",
										},
										{
											href: "https://effect.website/docs/observability/logging/",
											icon: "ri-bar-chart-horizontal-line",
											text: "Observability",
										},
										{
											href: "https://effect.website/docs/error-management/retrying/",
											icon: "ri-repeat-2-line",
											text: "Retry policies",
										},
										{
											href: "https://effect.website/docs/state-management/ref/",
											icon: "ri-swap-2-line",
											text: "States",
										},
										{
											href: "#",
											icon: "ri-settings-3-line",
											text: "Config parsing",
										},
										{
											href: "https://effect.website/docs/stream/introduction/",
											icon: "ri-align-center rotate-90",
											text: "Streams",
										},
										{
											href: "https://effect.website/docs/sink/introduction/",
											icon: "ri-download-2-line",
											text: "Sinks",
										},
										{
											href: "https://effect.website/docs/caching/caching-effects/",
											icon: "ri-database-2-line",
											text: "Caching",
										},
										{
											href: "https://effect.website/docs/data-types/bigdecimal/",
											icon: "ri-flow-chart",
											text: "Data types",
										},
										{
											href: "https://effect.website/docs/scheduling/cron/",
											icon: "ri-timer-2-line",
											text: "Cron",
										},
										{
											href: "https://effect.website/docs/concurrency/basic-concurrency/",
											icon: "ri-loop-right-line",
											text: "Concurrency",
										},
									].map((item, index) => (
										<a
											// biome-ignore lint/suspicious/noArrayIndexKey: It's okay. Just chill, Biome.
											key={index}
											href={item.href}
											{...(item.href.startsWith("http")
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
											className="flex items-center justify-center gap-[6px] rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-900 to-zinc-900/0 px-4 py-2 font-mono text-sm uppercase tracking-[0.02em] text-white transition-colors hover:border-zinc-500"
										>
											<i
												className={`${item.icon} text-base`}
												style={{
													background:
														"linear-gradient(to bottom, #86efac, #4d8963)",
													WebkitBackgroundClip: "text",
													WebkitTextFillColor: "transparent",
													backgroundClip: "text",
												}}
											></i>
											<span>{item.text}</span>
										</a>
									))}
								</div>
							</div>
							<a
								href="https://effect.website/docs/"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-8 flex w-fit flex-row items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-black px-5 py-5 text-white transition-colors hover:border-zinc-600 max-[479px]:w-full md:mt-0"
							>
								<i className="ri-book-open-line text-lg leading-none"></i>
								<span className="text-lg font-medium leading-none">
									Learn Effect
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
