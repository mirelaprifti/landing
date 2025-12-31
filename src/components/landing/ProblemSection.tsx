import { useEffect, useRef, useState } from "react";

const PAIN_POINTS = [
	{ title: "Async spaghetti", description: "Promise chains you can't follow" },
	{ title: "Uncaught errors", description: "catch (e: unknown) everywhere" },
	{ title: "State leaks", description: "Hidden dependencies between modules" },
	{ title: "Painful tests", description: "Setup code longer than the test" },
	{ title: "No observability", description: "Logging added after bugs" },
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

	// Approximate path lengths for stroke-dasharray
	const redLineLength = 500;
	const greenLineLength = 450;

	return (
		<div ref={chartRef} className="relative w-full px-4">
			{/* Title + Legend row */}
			<div className="flex items-center justify-between mb-5">
				<span className="font-mono text-xs font-medium text-zinc-400 uppercase tracking-wider">Complexity at scale</span>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1.5">
						<div className="w-1.5 h-1.5 rounded-full bg-red-500" />
						<span className="font-mono text-xs text-zinc-400/75">Without Effect</span>
					</div>
					<div className="flex items-center gap-1.5">
						<div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
						<span className="font-mono text-xs text-zinc-400/75">With Effect</span>
					</div>
				</div>
			</div>

			{/* Chart */}
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

					{/* Horizontal grid lines - very subtle */}
					{[35, 70, 105].map((y) => (
						<line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgb(39 39 42)" strokeWidth="1" strokeOpacity="0.4" />
					))}

					{/* Area fills - fade in after lines draw */}
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

					{/* Lines with draw-on animation */}
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

			{/* Axis labels */}
			<div className="flex justify-between mt-3">
				<span className="font-mono text-[10px] text-zinc-400/75 uppercase tracking-wide">Start</span>
				<span className="font-mono text-[10px] text-zinc-400/75 uppercase tracking-wide">Scale</span>
			</div>
		</div>
	);
}

export function ProblemSection() {
	return (
		<section className="relative w-full py-16 md:py-24">
			{/* Fade effect at top */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-32"
				style={{
					background: "linear-gradient(to bottom, #09090b 0%, transparent 100%)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
					{/* Left column */}
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							The problem
						</p>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-3xl max-w-md">
							TypeScript is great, until it isn't
						</h2>
						<p className="mt-4 text-base text-zinc-400">
							Patterns that work at 1K lines become liabilities at scale.
						</p>

						{/* Pills */}
						<div className="mt-8 flex flex-wrap gap-2.5">
							{PAIN_POINTS.map((point, index) => (
								<span
									key={index}
									className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-sm"
								>
									<span className="text-white">{point.title}</span>
									<span className="text-zinc-500">·</span>
									<span className="text-zinc-400">{point.description}</span>
								</span>
							))}
						</div>
					</div>

					{/* Right column - Chart */}
					<div className="flex flex-col justify-end lg:pt-8 lg:-mr-4">
						<ComplexityChart />
					</div>
				</div>
			</div>
		</section>
	);
}
