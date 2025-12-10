export function AISection() {
	const features = [
		{
			icon: "ri-git-fork-line",
			title: "Fork & cancel",
			description: "tool calls or model chains",
		},
		{
			icon: "ri-repeat-2-line",
			title: "Retry & fallback",
			description: "with typed error handling",
		},
		{
			icon: "ri-arrow-left-right-line",
			title: "Inject & swap",
			description: "models or APIs for testing",
		},
		{
			icon: "ri-node-tree",
			title: "Automatic tracing",
			description: "no boilerplate",
		},
	];

	return (
		<section className="relative w-full overflow-hidden px-4 py-20 md:py-28">
			<div className="relative mx-auto w-full max-w-295">
				{/* Heading and Button */}
				<div className="mb-10 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
						A safe, testable runtime for AI systems
					</h2>
					<a
						href="https://effect-ts.github.io/effect/docs/ai/ai"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800/50"
					>
						<span>@effect/ai package</span>
						<i className="ri-arrow-right-line text-sm" />
					</a>
				</div>

				{/* 4 Feature Cards */}
				<div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex flex-col gap-4 bg-zinc-950 p-5"
						>
							<i
								className={`${feature.icon} text-xl text-zinc-500`}
							/>
							<p className="text-sm leading-relaxed text-zinc-400">
								<span className="font-medium text-white">
									{feature.title}
								</span>{" "}
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
