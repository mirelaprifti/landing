const PAIN_POINTS = [
	{
		problem: "Try-catch blocks everywhere",
		description:
			"Your error handling is scattered across the codebase. Runtime crashes happen in production because errors slip through untracked.",
		solution: "Typed Errors",
		solutionDescription:
			"Every possible error is tracked in the type system. The compiler tells you what can fail and forces you to handle it.",
		icon: "ri-error-warning-line",
	},
	{
		problem: "Dependency injection chaos",
		description:
			"Passing dependencies through constructors, using global singletons, or wrestling with DI frameworks that require decorators and reflection.",
		solution: "Built-in DI",
		solutionDescription:
			"Services are declared as types and provided at the edge. No decorators, no reflection, no magic — just types.",
		icon: "ri-plug-line",
	},
	{
		problem: "Promise nightmares",
		description:
			"Race conditions, unhandled rejections, and no way to cancel operations. Debugging async code feels like guessing.",
		solution: "Structured Concurrency",
		solutionDescription:
			"Fibers with automatic cleanup, cancellation propagation, and proper resource management. Async code that actually makes sense.",
		icon: "ri-git-branch-line",
	},
	{
		problem: "Untestable code",
		description:
			"Mocking requires patching modules, tests are brittle, and integration tests are slow because everything is tightly coupled.",
		solution: "Testable by Design",
		solutionDescription:
			"Swap implementations at test time without mocking libraries. Your code is naturally decoupled and easy to test.",
		icon: "ri-flask-line",
	},
	{
		problem: "Zero observability",
		description:
			"When production breaks, you're grepping logs hoping to find something useful. No tracing, no metrics, no context.",
		solution: "Built-in Tracing",
		solutionDescription:
			"OpenTelemetry-compatible tracing out of the box. See exactly what happened, with full context, without adding instrumentation code.",
		icon: "ri-line-chart-line",
	},
];

export function PainPointsSection() {
	return (
		<section className="relative w-full py-16 md:py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-16">
					<p className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-400">
						Common Problems Effect Solves
					</p>
					<h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white md:text-3xl">
						You've felt these pains. Here's how Effect fixes them.
					</h2>
				</div>

				{/* Pain points grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{PAIN_POINTS.map((item, index) => (
						<div
							key={index}
							className="group relative flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
						>
							{/* Icon */}
							<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800/50">
								<i className={`${item.icon} text-xl text-zinc-400`} />
							</div>

							{/* Problem */}
							<h3 className="mb-2 text-base font-semibold text-red-400/80">
								{item.problem}
							</h3>
							<p className="mb-4 text-sm leading-relaxed text-zinc-500">
								{item.description}
							</p>

							{/* Divider */}
							<div className="my-4 h-px w-full bg-zinc-800" />

							{/* Solution */}
							<h4 className="mb-2 text-base font-semibold text-emerald-400/80">
								{item.solution}
							</h4>
							<p className="text-sm leading-relaxed text-zinc-400">
								{item.solutionDescription}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
