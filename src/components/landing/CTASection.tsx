export function CTASection() {
	return (
		<section className="relative w-full overflow-hidden py-16 md:py-28">
			{/* Subtle gradient background - same as AI Section */}
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/0 to-zinc-900/50" />

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				{/* Two-column grid matching the page's visual language */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
					{/* Left column - Main CTA (6 columns) */}
					<div className="lg:col-span-6 relative overflow-hidden border border-zinc-700 bg-zinc-900/30 p-8 md:p-10">
						{/* Subtle inner gradient */}
						<div
							className="pointer-events-none absolute inset-0"
							style={{
								background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)",
							}}
						/>

						<div className="relative">
							<p className="mb-4 font-mono text-sm uppercase tracking-wider text-zinc-500">
								Get Started
							</p>
							<h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
								Start building with Effect
							</h2>
							<p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
								Explore the docs, join the community, or dive straight into code.
							</p>

							{/* Dashed separator */}
							<div
								className="my-8 h-px"
								style={{
									background: "#3f3f46",
									WebkitMask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
									mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
								}}
							/>

							<div className="flex flex-wrap gap-3">
								<a
									href="https://effect.website/docs/"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[0.9375rem] font-medium text-zinc-900 transition-all duration-200 hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/10"
								>
									<i className="ri-arrow-right-line text-base transition-transform duration-200 group-hover:translate-x-1" />
									Read the docs
								</a>
								<a
									href="https://effect.website/play/"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-[0.9375rem] font-medium text-white transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800"
								>
									<i className="ri-terminal-line text-base transition-transform duration-200 group-hover:scale-110" />
									Playground
								</a>
							</div>
						</div>
					</div>

					{/* Right column - Community links (6 columns) */}
					<div className="lg:col-span-6 flex flex-col gap-3">

						{/* Discord card */}
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-1 items-center justify-between overflow-hidden border border-zinc-700 bg-zinc-900/30 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
						>
							<div className="flex items-center gap-4">
								<div className="flex h-10 w-10 items-center justify-center rounded bg-[#5865F2]/20 text-[#5865F2] transition-colors group-hover:bg-[#5865F2]/30">
									<i className="ri-discord-fill text-xl" />
								</div>
								<div>
									<p className="font-medium text-white">Discord</p>
									<p className="text-sm text-zinc-500">Join the community</p>
								</div>
							</div>
							<i className="ri-arrow-right-up-line text-lg text-zinc-600 transition-all duration-200 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>

{/* GitHub card */}
						<a
							href="https://github.com/Effect-TS/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-1 items-center justify-between overflow-hidden border border-zinc-700 bg-zinc-900/30 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
						>
							<div className="flex items-center gap-4">
								<div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-white transition-colors group-hover:bg-white/20">
									<i className="ri-github-fill text-xl" />
								</div>
								<div>
									<p className="font-medium text-white">GitHub</p>
									<p className="text-sm text-zinc-500">Star the repo</p>
								</div>
							</div>
							<i className="ri-arrow-right-up-line text-lg text-zinc-600 transition-all duration-200 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>

						{/* Twitter/X card */}
						<a
							href="https://twitter.com/EffectTS_"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-1 items-center justify-between overflow-hidden border border-zinc-700 bg-zinc-900/30 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60"
						>
							<div className="flex items-center gap-4">
								<div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-white transition-colors group-hover:bg-white/20">
									<i className="ri-twitter-x-line text-xl" />
								</div>
								<div>
									<p className="font-medium text-white">Twitter</p>
									<p className="text-sm text-zinc-500">Follow for updates</p>
								</div>
							</div>
							<i className="ri-arrow-right-up-line text-lg text-zinc-600 transition-all duration-200 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
