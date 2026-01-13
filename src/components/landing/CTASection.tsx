import { InstallCommand } from "./InstallCommand";

export function CTASection() {
	return (
		<section className="relative w-full overflow-hidden py-24 md:py-[114px]">
			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.7) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.7) 1px, transparent 1px)
					`,
					backgroundSize: "196.6px 198px",
					backgroundPosition: "calc(50% + 97px) 0",
				}}
			/>

			{/* Fade out grid at top and bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "linear-gradient(to bottom, #09090b 0%, transparent 30%, transparent 70%, #09090b 100%)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				<div className="max-w-3xl mx-auto text-center">
					<p className="mb-3 font-mono text-base font-semibold uppercase tracking-wider text-zinc-400">
						Get Started Now
					</p>
					<h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
						Stop installing a new package for every problem
					</h2>
					<p className="mt-6 text-lg text-zinc-400">
						Get production-ready features out of the box with Effect.
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
						<a
							href="https://effect.website/docs/"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1 rounded-md bg-white pl-6 pr-4 py-3 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-200"
						>
							Read the docs
							<i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-0.5" />
						</a>
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
						>
							<i className="ri-discord-fill text-lg" />
							Join Discord
						</a>
					</div>

					{/* Install command */}
					<div className="mt-8">
						<p className="mb-3 text-sm text-zinc-400">Or just install Effect:</p>
						<div className="max-w-lg mx-auto">
							<InstallCommand dropdownDirection="up" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
