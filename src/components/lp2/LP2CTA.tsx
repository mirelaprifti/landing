import { Button } from "@/components/ui";

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
						<Button
							href="https://effect.website/docs/getting-started/introduction"
							variant="primary"
							size="lg"
							className="inline-flex items-center gap-2"
						>
							Get Started
							<i className="ri-arrow-right-line text-lg" />
						</Button>
						<Button
							href="https://discord.gg/effect-ts"
							variant="secondary"
							size="lg"
							className="inline-flex items-center gap-2"
						>
							<i className="ri-discord-fill text-lg" />
							Join Discord
						</Button>
						<Button
							href="https://github.com/Effect-TS/effect"
							variant="secondary"
							size="lg"
							className="inline-flex items-center gap-2"
						>
							<i className="ri-github-fill text-lg" />
							GitHub
						</Button>
					</div>

					{/* Quick install */}
					<div className="mt-12">
						<p className="mb-3 text-sm text-zinc-400">Or just install it:</p>
						<code className="inline-block rounded-md border border-zinc-800 bg-zinc-900/50 px-4 py-2 font-mono text-sm text-zinc-300">
							npm install effect
						</code>
					</div>
				</div>
			</div>
		</section>
	);
}
