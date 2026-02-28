export function LP2CTA() {
	return (
		<section className="relative w-full py-20 md:py-32">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="mx-auto max-w-2xl text-center">
					{/* Headline */}
					<h2 className="leading-tighter text-3xl font-bold text-white md:text-4xl">
						Ready to build production-grade TypeScript?
					</h2>

					{/* Subhead */}
					<p className="mt-6 text-lg text-zinc-400">
						Join thousands of developers who've made the switch. Start with the
						docs, get help on Discord, or dive into the code.
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-semibold text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
						>
							<i className="ri-discord-fill text-lg" />
							Join Discord
						</a>
						<a
							href="https://github.com/Effect-TS/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-semibold text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
						>
							<i className="ri-github-fill text-lg" />
							GitHub
						</a>
					</div>

					{/* Quick install */}
					<div className="mt-12">
						<p className="mb-3 text-sm text-zinc-500">Or just install it:</p>
						<code className="inline-block rounded-md border border-zinc-800 bg-zinc-900/50 px-4 py-2 font-mono text-sm text-zinc-300">
							npm install effect
						</code>
					</div>
				</div>
			</div>
		</section>
	);
}
