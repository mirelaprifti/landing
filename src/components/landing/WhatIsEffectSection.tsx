export function WhatIsEffectSection() {
	return (
		<section className="relative w-full overflow-hidden py-16 md:pt-24 md:pb-24">
			{/* Subtle background gradient */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "radial-gradient(ellipse 80% 50% at 70% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 60%)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-295 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Left column - Copy */}
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							The mental model
						</p>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-3xl max-w-lg">
							Track successes, errors, dependencies in one type
						</h2>
						<p className="mt-4 text-lg text-zinc-400 max-w-lg">
							The type signature tells you everything. The compiler catches what you miss. No more runtime surprises.
						</p>

						<ul className="mt-5 space-y-2 text-sm text-zinc-400">
							<li className="flex items-center gap-2">
								<i className="ri-check-line text-emerald-500" />
								<span>No more <code className="text-zinc-300">catch (e: unknown)</code></span>
							</li>
							<li className="flex items-center gap-2">
								<i className="ri-check-line text-emerald-500" />
								<span>Can't forget to handle errors</span>
							</li>
							<li className="flex items-center gap-2">
								<i className="ri-check-line text-emerald-500" />
								<span>Bugs surface in your editor, not production</span>
							</li>
						</ul>

						<a
							href="https://effect.website/docs/getting-started/why-effect/"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
						>
							Why Effect
							<i className="ri-arrow-right-line text-sm" />
						</a>
					</div>

					{/* Right column - Type signature */}
					<div className="flex items-center justify-center">
						<div className="relative w-full max-w-md">
							{/* Subtle glow behind */}
							<div
								className="pointer-events-none absolute -inset-4 rounded-2xl opacity-30 blur-xl"
								style={{
									background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
								}}
							/>

							{/* Type signature */}
							<div className="group relative w-full rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-4 font-mono text-base text-center transition-all hover:border-zinc-500 hover:bg-zinc-800/50">
								<span className="text-white select-all">Effect</span>
								<span className="text-zinc-500">&lt;</span>
								<span className="text-zinc-300">Success</span>
								<span className="text-zinc-500">, </span>
								<span className="text-zinc-300">Error</span>
								<span className="text-zinc-500">, </span>
								<span className="text-zinc-300">Requirements</span>
								<span className="text-zinc-500">&gt;</span>
							</div>

							{/* Arrows pointing down */}
							<svg className="w-full h-8 mt-2" viewBox="0 0 400 32" fill="none" preserveAspectRatio="xMidYMid meet">
								<path d="M100 0 L100 16 L67 16 L67 32" stroke="rgb(113 113 122)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
								<path d="M200 0 L200 32" stroke="rgb(113 113 122)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
								<path d="M300 0 L300 16 L333 16 L333 32" stroke="rgb(113 113 122)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
							</svg>

							{/* Three columns */}
							<div className="grid grid-cols-3 gap-4 text-sm">
								<div className="text-center">
									<p className="text-zinc-300 font-medium">Success</p>
									<p className="text-zinc-500 text-xs mt-1">What it returns</p>
								</div>
								<div className="text-center">
									<p className="text-zinc-300 font-medium">Error</p>
									<p className="text-zinc-500 text-xs mt-1">What can fail</p>
								</div>
								<div className="text-center">
									<p className="text-zinc-300 font-medium">Requirements</p>
									<p className="text-zinc-500 text-xs mt-1">Dependencies needed</p>
								</div>
							</div>

							{/* Effect.gen explanation */}
							<div className="mt-8 rounded-md ring-1 ring-inset ring-zinc-700 bg-zinc-900/50 p-4 font-mono text-sm">
								<div>
									<span className="text-zinc-500">() </span>
									<span className="text-zinc-500">{"=>"} </span>
									<span className="text-white">Effect</span>
									<span className="text-zinc-500">.</span>
									<span className="text-zinc-300">gen</span>
									<span className="text-zinc-500">(</span>
									<span className="text-violet-400">function*</span>
									<span className="text-zinc-500">() {"{"}</span>
								</div>
								<div className="pl-4 mt-1">
									<span className="text-violet-400">const </span>
									<span className="text-zinc-300">example</span>
									<span className="text-zinc-500"> = </span>
									<span className="text-violet-400">yield* </span>
									<span className="text-zinc-300">someOtherEffect</span>
								</div>
								<div className="mt-1">
									<span className="text-zinc-500">{"})"}</span>
								</div>
								<div className="mt-3 pt-3 border-t border-zinc-800 text-zinc-500 text-xs leading-relaxed">
									<p>→ <span className="text-violet-400">yield*</span> gives you the <span className="text-zinc-300">Success</span> value</p>
									<p>→ <span className="text-zinc-300">Errors</span> and <span className="text-zinc-300">dependencies</span> are tracked in the parent Effect</p>
								</div>
							</div>

							{/* Attribution - centered */}
							<div className="mt-3 text-center">
								<a
									href="https://effect.website/docs/getting-started/why-effect/"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
								>
									Why Effect was designed this way
									<i className="ri-arrow-right-up-line text-sm" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
