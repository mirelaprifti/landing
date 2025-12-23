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
			<div className="mx-auto w-full max-w-295 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
					{/* Left column */}
					<div>
						<p className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-500 uppercase">
							The problem
						</p>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-4xl">
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
