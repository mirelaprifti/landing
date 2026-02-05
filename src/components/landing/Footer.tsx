import { getAssetPath } from "../../utils/assetPath";

export function Footer() {
	return (
		<footer className="relative w-full px-4 pt-16 md:px-8 md:pt-20">
			{/* Subtle gradient background */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/0 to-zinc-900/50" />

			{/* Top solid border */}
			<div className="absolute left-0 right-0 top-0 h-px bg-zinc-800" />

			<div className="mx-auto w-full max-w-[73.75rem]">
				{/* Footer Links Block */}
				<div className="flex flex-col">
					{/* Four Column Links Section */}
					<div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-8 md:mb-20 md:gap-x-0 lg:grid-cols-4">
						{/* Column 1: Resources */}
						<div className="flex flex-1 flex-col gap-4 lg:pl-4">
							{/* Column Header */}
							<h3 className="text-sm font-mono uppercase text-zinc-100">
								Resources
							</h3>
							{/* Links */}
							<ul className="flex flex-col items-start gap-2">
								<li>
									<a
										href="https://effect.website/docs/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Documentation
									</a>
								</li>
								<li>
									<a
										href="https://effect.website/docs/additional-resources/api-reference/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										API Reference
									</a>
								</li>
								<li>
									<a
										href="https://effect-ts.github.io/effect/docs/ai/ai"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										@effect/ai
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://effect-ts.github.io/effect/docs/cluster"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										@effect/cluster (alpha)
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://github.com/Effect-TS/effect/blob/main/packages/workflow/README.md"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										@effect/workflow
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
							</ul>
						</div>

						{/* Column 2: DevTools */}
						<div className="flex flex-1 flex-col gap-4 lg:border-l lg:border-dashed lg:border-zinc-800 lg:pl-4">
							{/* Column Header */}
							<h3 className="text-sm font-mono uppercase text-zinc-100">DevTools</h3>
							{/* Links */}
							<ul className="flex flex-col items-start gap-2">
								<li>
									<a
										href="https://effect.website/play/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect Playground
									</a>
								</li>
								<li>
									<a
										href="https://github.com/Effect-TS/language-service"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect LSP
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://github.com/tim-smart/effect-mcp"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect MCP
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://github.com/Effect-TS/effect/blob/main/packages/cli/README.md"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect CLI
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://marketplace.visualstudio.com/items?itemName=effectful-tech.effect-vscode"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										VS Code Extension
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
							</ul>
						</div>

						{/* Column 3: Community */}
						<div className="flex flex-1 flex-col gap-4 lg:border-l lg:border-dashed lg:border-transparent lg:pl-4">
							{/* Column Header */}
							<h3 className="text-sm font-mono uppercase text-zinc-100">
								Community
							</h3>
							{/* Links */}
							<ul className="flex flex-col items-start gap-2">
								<li>
									<a
										href="https://effect.website/events/effect-days"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect Days
									</a>
								</li>
								<li>
									<a
										href={getAssetPath("/merch")}
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effect Merch
									</a>
								</li>
								<li>
									<a
										href={getAssetPath("/podcast")}
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Podcast
									</a>
								</li>
								<li>
									<a
										href="https://discord.gg/effect-ts"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Discord
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://luma.com/effect-community?k=c"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Meetups
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
							</ul>
						</div>

						{/* Column 4: Other */}
						<div className="flex flex-1 flex-col gap-4 lg:border-l lg:border-dashed lg:border-zinc-800 lg:pl-4">
							{/* Column Header */}
							<h3 className="text-sm font-mono uppercase text-zinc-100">Other</h3>
							{/* Links */}
							<ul className="flex flex-col items-start gap-2">
								<li>
									<a
										href="https://effect.website/blog"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Blog
									</a>
								</li>
								<li>
									<a
										href="https://effect.website/docs/additional-resources/myths/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Myths about Effect
									</a>
								</li>
								<li>
									<a
										href={getAssetPath("/brand-assets")}
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Logo Guidelines
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Workshops
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
								<li>
									<a
										href="https://effectful.co/"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-sm leading-relaxed text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
									>
										Effectful
										<i className="ri-arrow-right-up-line text-sm" />
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Middle Section: Social & Branding */}
					<div className="flex flex-col gap-10 md:gap-8">
						{/* Top Border */}
						<div className="mx-4 h-px bg-zinc-800" />

						{/* Social Icons and Branding Row */}
						<div className="flex flex-col items-center gap-8 md:grid md:grid-cols-3 md:items-center">
							<div className="md:pl-4">
								<img
									src={getAssetPath("/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg")}
									alt="Effect"
									className="h-7"
								/>
							</div>

							{/* Social Icons (centered on mobile, middle on desktop) */}
							<div className="flex items-center justify-center gap-6 md:gap-5">
								<a
									href="https://x.com/EffectTS_"
									aria-label="Follow Effect on X (Twitter)"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-twitter-x-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
								<a
									href="https://www.youtube.com/@EffectTS"
									aria-label="Subscribe to Effect on YouTube"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-youtube-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
								<a
									href="https://github.com/Effect-TS"
									aria-label="Visit Effect on GitHub"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-github-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
								<a
									href="https://discord.gg/effect-ts"
									aria-label="Join Effect Discord server"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-discord-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
								<a
									href="https://bsky.app/profile/effect-ts.bsky.social"
									aria-label="Follow Effect on Bluesky"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-bluesky-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
								<a
									href="https://www.linkedin.com/company/effect-ts"
									aria-label="Follow Effect on LinkedIn"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<div className="flex w-6 items-center justify-center">
										<i
											className="ri-linkedin-fill text-2xl md:text-xl"
											aria-hidden="true"
										/>
									</div>
								</a>
							</div>

							<div className="md:pr-4 md:text-right">
								<p className="text-sm text-zinc-400">MIT Licensed</p>
							</div>
						</div>

						{/* Bottom Border */}
						<div className="mx-4 h-px bg-zinc-800" />
					</div>

					{/* Bottom Copyright Section */}
					<div className="flex flex-col items-center justify-between px-4 gap-4 pb-16 pt-10 md:flex-row md:gap-8 md:pb-16 md:pt-8">
						<p className="text-sm text-zinc-400">
							© {new Date().getFullYear()} Effectful Technologies Inc. All
							rights reserved.
						</p>
						<div className="flex items-center gap-4">
							<a
								href="mailto:contact@effectful.co"
								className="text-sm text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
							>
								Email us
							</a>
							<a
								href="#"
								className="text-sm text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
							>
								Terms
							</a>
							<a
								href="#"
								className="text-sm text-zinc-400 transition-colors hover:text-white border-b border-transparent hover:border-current"
							>
								Privacy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
