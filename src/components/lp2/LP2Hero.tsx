export function LP2Hero() {
	return (
		<section className="relative w-full py-20 md:py-32">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Eyebrow */}
				<p className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-400">
					The TypeScript Library for Production
				</p>

				{/* Main headline */}
				<h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
					Why Effect?
				</h1>

				{/* Subheadline */}
				<p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
					Because your TypeScript deserves better than scattered try-catches,
					dependency chaos, and mystery crashes at 3am.
				</p>

				{/* Value proposition */}
				<p className="mt-4 max-w-2xl text-lg text-zinc-500">
					Effect gives you typed errors, built-in dependency injection,
					structured concurrency, and observability — all in one library.
				</p>

				{/* CTA Buttons */}
				<div className="mt-10 flex flex-wrap gap-4">
					<a
						href="https://effect.website/docs/getting-started/introduction"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-200"
					>
						Get Started
						<i className="ri-arrow-right-line text-lg" />
					</a>
					<a
						href="https://effect.website/docs"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-semibold text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
					>
						Read the Docs
					</a>
				</div>

				{/* Quick stats */}
				<div className="mt-16 flex flex-wrap gap-12">
					<div>
						<p className="text-3xl font-bold text-white">50k+</p>
						<p className="text-sm text-zinc-500">Weekly Downloads</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-white">8k+</p>
						<p className="text-sm text-zinc-500">GitHub Stars</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-white">5k+</p>
						<p className="text-sm text-zinc-500">Discord Members</p>
					</div>
				</div>
			</div>
		</section>
	);
}
