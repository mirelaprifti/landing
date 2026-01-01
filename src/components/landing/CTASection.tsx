import { InstallCommand } from "./InstallCommand";

export function CTASection() {
	return (
		<section className="relative w-full overflow-hidden py-24 md:py-40">
			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
						Start building with Effect
					</h2>
					<p className="mt-6 text-lg text-zinc-400">
						Explore the docs, join the community, or dive straight into code.
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<a
							href="https://effect.website/docs/"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-200"
						>
							Read the docs
							<i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-0.5" />
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
						<InstallCommand dropdownDirection="up" />
					</div>
				</div>
			</div>
		</section>
	);
}
