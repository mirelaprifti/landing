import { Icon } from "@/components/ui/Icon";
const FEATURES = [
	{
		category: "Error Handling",
		items: [
			"Typed errors in the function signature",
			"Short-circuit and collect errors",
			"Automatic retry with backoff",
			"Timeout and interruption",
		],
		icon: "shield-check" as const,
	},
	{
		category: "Concurrency",
		items: [
			"Structured concurrency with fibers",
			"Parallel execution with limits",
			"Race conditions handled correctly",
			"Automatic resource cleanup",
		],
		icon: "git-branch" as const,
	},
	{
		category: "Dependency Injection",
		items: [
			"Type-safe service definitions",
			"Automatic dependency resolution",
			"Easy mocking for tests",
			"No decorators or reflection",
		],
		icon: "plug" as const,
	},
	{
		category: "Observability",
		items: [
			"Built-in OpenTelemetry tracing",
			"Structured logging",
			"Metrics collection",
			"Span context propagation",
		],
		icon: "chart-line" as const,
	},
	{
		category: "Schema & Validation",
		items: [
			"Runtime validation from types",
			"Automatic JSON serialization",
			"API contract generation",
			"Form validation support",
		],
		icon: "file-check" as const,
	},
	{
		category: "Scheduling",
		items: [
			"Cron-like schedules",
			"Exponential backoff",
			"Jittered retries",
			"Repeat with conditions",
		],
		icon: "clock" as const,
	},
];

export function LP2Features() {
	return (
		<section className="relative w-full py-16 md:py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-16">
					<p className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
						Everything You Need
					</p>
					<h2 className="leading-tighter max-w-2xl text-2xl font-semibold text-white md:text-3xl">
						One library. Complete toolkit.
					</h2>
					<p className="mt-4 max-w-xl text-lg text-zinc-400">
						Stop installing a new package for every problem. Effect includes
						everything you need to build production-grade TypeScript
						applications.
					</p>
				</div>

				{/* Features grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, index) => (
						<div key={index} className="space-y-4">
							{/* Category header */}
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800/50">
									<Icon name={feature.icon} className="text-lg text-zinc-400" />
								</div>
								<h3 className="text-base font-semibold text-white">
									{feature.category}
								</h3>
							</div>

							{/* Items list */}
							<ul className="space-y-2 pl-11">
								{feature.items.map((item, itemIndex) => (
									<li
										key={itemIndex}
										className="flex items-start gap-2 text-sm text-zinc-400"
									>
										<Icon name="check" className="mt-0.5 text-emerald-500/70" />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
