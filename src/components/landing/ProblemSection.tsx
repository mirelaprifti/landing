import { getAssetPath } from "../../utils/assetPath";

const PAIN_POINTS = [
	{ title: "Async spaghetti", description: "Promise chains you can't follow" },
	{ title: "Uncaught errors", description: "catch (e: unknown) everywhere" },
	{ title: "State leaks", description: "Hidden dependencies between modules" },
	{ title: "Painful tests", description: "Setup code longer than the test" },
	{ title: "No observability", description: "Logging added after bugs" },
];

export function ProblemSection() {
	return (
		<section className="relative w-full py-16 md:py-20">
			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.55) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.55) 1px, transparent 1px)
					`,
					backgroundSize: "118px 88px",
					backgroundPosition: "calc(50% + 58.5px) 0",
				}}
			/>
			{/* Fade out grid at top and bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "linear-gradient(to bottom, #09090b 0%, transparent 30%, transparent 70%, #09090b 100%)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-295 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
					{/* Left column */}
					<div>
						<div className="mb-3 flex items-center gap-2">
							<img
								src={getAssetPath("/assets/typescript-logo.svg")}
								alt="TypeScript"
								className="h-5 w-5 opacity-50"
							/>
							<p className="font-mono text-sm font-semibold tracking-wider text-zinc-500 uppercase">
								The problem
							</p>
						</div>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-3xl max-w-md">
							TypeScript is great, until it isn't
						</h2>
						<p className="mt-5 text-lg text-zinc-400 max-w-md">
							The patterns that work at 1K lines become liabilities at scale.
						</p>
					</div>

					{/* Right column - pills with descriptions */}
					<div className="flex flex-wrap gap-3 content-start">
						{PAIN_POINTS.map((point, index) => (
							<span
								key={index}
								className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm"
							>
								<span className="text-zinc-200">{point.title}</span>
								<span className="text-zinc-600">—</span>
								<span className="text-zinc-500">{point.description}</span>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
