import { useEffect, useRef, useState } from "react";

const FEATURES = [
	{
		problem: "Try-catch blocks everywhere but you still don't know how things can fail.",
		icon: "ri-shield-check-line",
		title: "Typed Errors",
		description: "Errors in the type system. The compiler tells you what can fail.",
		items: [
			"Typed errors in the function signature",
			"Short-circuit and collect errors",
			"Automatic retry with backoff"
		]
	},
	{
		problem: "Another decorator. Another magic string. Another runtime error.",
		icon: "ri-node-tree",
		title: "Dependency Injection",
		description: "Services as types, provided at the edge. No decorators, no magic.",
		items: [
			"Type-safe service definitions",
			"Automatic dependency resolution",
			"Easy mocking for tests"
		]
	},
	{
		problem: "That Promise.all? It's a time bomb. One failure, everything crashes.",
		icon: "ri-git-branch-line",
		title: "Structured Concurrency",
		description: "Fibers with cleanup, cancellation, and resource management.",
		items: [
			"Structured concurrency with fibers",
			"Parallel execution with limits",
			"Automatic resource cleanup"
		]
	},
	{
		problem: "Network failed? Try again later. But when? How many times?",
		icon: "ri-time-line",
		title: "Scheduling",
		description: "Declarative retry, repeat, and timeout policies.",
		items: [
			"Cron-like schedules",
			"Exponential backoff",
			"Jittered retries"
		]
	},
	{
		problem: "No observability. Production's on fire. You have no idea why.",
		icon: "ri-line-chart-line",
		title: "Built-in Tracing",
		description: "OpenTelemetry out of the box. Full context, zero setup.",
		items: [
			"Built-in OpenTelemetry tracing",
			"Structured logging",
			"Metrics collection"
		]
	},
	{
		problem: "Validation logic is duplicated across every layer of your application.",
		icon: "ri-file-check-line",
		title: "Unified Schema",
		description: "One schema for validation, encoding, and documentation.",
		items: [
			"Runtime validation from types",
			"Automatic JSON serialization",
			"API contract generation"
		]
	},
];

function ComplexityChart() {
	const chartRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);

		if (chartRef.current) {
			observer.observe(chartRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const redLineLength = 500;
	const greenLineLength = 450;

	return (
		<div ref={chartRef} className="relative w-full">
			<div className="relative h-36 md:h-44">
				<svg viewBox="0 0 400 140" className="w-full h-full" preserveAspectRatio="none">
					<defs>
						<linearGradient id="redAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.12" />
							<stop offset="100%" stopColor="rgb(239 68 68)" stopOpacity="0" />
						</linearGradient>
						<linearGradient id="greenAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.06" />
							<stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0" />
						</linearGradient>
					</defs>

					{[35, 70, 105].map((y) => (
						<line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgb(39 39 42)" strokeWidth="1" strokeOpacity="0.4" />
					))}

					<path
						d="M0,130 C60,128 140,115 220,70 C300,25 360,8 400,5 L400,140 L0,140 Z"
						fill="url(#redAreaGradient)"
						className="transition-opacity duration-700"
						style={{
							opacity: isVisible ? 1 : 0,
							transitionDelay: isVisible ? "1.3s" : "0s",
						}}
					/>
					<path
						d="M0,115 C100,112 200,105 300,95 C350,90 380,87 400,85 L400,140 L0,140 Z"
						fill="url(#greenAreaGradient)"
						className="transition-opacity duration-700"
						style={{
							opacity: isVisible ? 1 : 0,
							transitionDelay: isVisible ? "1.6s" : "0s",
						}}
					/>

					<path
						d="M0,130 C60,128 140,115 220,70 C300,25 360,8 400,5"
						fill="none"
						stroke="rgb(239 68 68)"
						strokeWidth="1.5"
						strokeLinecap="round"
						style={{
							strokeDasharray: redLineLength,
							strokeDashoffset: isVisible ? 0 : redLineLength,
							transition: "stroke-dashoffset 1.5s ease-out",
						}}
					/>
					<path
						d="M0,115 C100,112 200,105 300,95 C350,90 380,87 400,85"
						fill="none"
						stroke="rgb(16 185 129)"
						strokeWidth="1.5"
						strokeLinecap="round"
						style={{
							strokeDasharray: greenLineLength,
							strokeDashoffset: isVisible ? 0 : greenLineLength,
							transition: "stroke-dashoffset 1.8s ease-out 0.2s",
						}}
					/>
				</svg>
			</div>

			<div className="flex justify-between mt-3">
				<span className="font-mono text-[10px] text-zinc-400/75 uppercase tracking-wide">Start</span>
				<span className="font-mono text-[10px] text-zinc-400/75 uppercase tracking-wide">Scale</span>
			</div>

			<div className="flex items-center justify-center gap-6 mt-5">
				<span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Complexity at scale:</span>
				<div className="flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 rounded-full bg-red-500" />
					<span className="font-mono text-xs uppercase text-zinc-400">Without Effect</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
					<span className="font-mono text-xs uppercase text-zinc-400">With Effect</span>
				</div>
			</div>
		</div>
	);
}

export function ProblemSection() {
	return (
		<section className="relative w-full py-24 md:pt-40 md:pb-24">
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-32"
				style={{
					background: "linear-gradient(to bottom, #09090b 0%, transparent 100%)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				{/* Top row - Header + Chart */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 mb-16">
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// What Effect Solves
						</p>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-3xl max-w-md">
							Built-in solutions for the hard problems
						</h2>
					</div>

					<div className="flex flex-col justify-center">
						<ComplexityChart />
					</div>
				</div>

				{/* Feature cards */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, index) => (
						<div key={index} className="flex flex-col border border-zinc-800 bg-zinc-950 p-5">
							<p className="text-base font-medium text-zinc-400">
								{feature.problem}
							</p>
							<div
								className="h-px w-full mt-5 mb-6"
								style={{
									backgroundImage: 'repeating-linear-gradient(to right, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)'
								}}
							/>
							<h3 className="flex items-center gap-2 text-base font-mono uppercase font-medium text-white">
								<div className="w-6 h-6 bg-zinc-800 flex items-center justify-center shrink-0">
									<i className={`${feature.icon} text-zinc-200 text-sm`} />
								</div>
								{feature.title}
							</h3>
							{/* Checkmark items */}
							<div className="mt-3 flex flex-col gap-1.5">
								{feature.items.map((item, itemIndex) => (
									<div key={itemIndex} className="flex items-start gap-3">
										<i className="ri-check-line text-emerald-500 text-sm shrink-0 pl-1" />
										<span className="text-sm text-zinc-400">{item}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
