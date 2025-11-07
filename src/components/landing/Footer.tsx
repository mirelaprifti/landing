import { getAssetPath } from "../../utils/assetPath";

export function Footer() {
	return (
		<footer className="relative w-full px-4 pt-20 md:px-8 md:pt-32">
			{/* Top solid border */}
			<div className="absolute left-0 right-0 top-0 h-px bg-zinc-700" />

			<div className="mx-auto w-full max-w-[80rem]">
				{/* Footer Links Block */}
				<div className="flex flex-col">
					{/* Four Column Links Section */}
					<div className="mb-16 grid grid-cols-2 gap-8 md:mb-24 md:gap-16 lg:grid-cols-4 lg:gap-24">
						{/* Column 1: Resources */}
						<div className="flex flex-col gap-3">
							{/* Column Header */}
							<div className="flex items-center gap-2">
								<i className="ri-book-open-line text-base text-white md:text-base" />
								<h3 className="text-base font-semibold text-white">
									Resources
								</h3>
							</div>
							{/* Links */}
							<div className="flex flex-col">
								<a
									href="https://effect.website/docs/"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Documentation
								</a>
								<a
									href="https://effect.website/docs/additional-resources/api-reference/"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									API Reference
								</a>
								<a
									href="https://effect-ts.github.io/effect/docs/ai/ai"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>@effect/ai</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://effect-ts.github.io/effect/docs/cluster"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>@effect/cluster (alpha)</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://github.com/Effect-TS/effect/blob/main/packages/workflow/README.md"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>@effect/workflow</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
							</div>
						</div>

						{/* Column 2: DevTools */}
						<div className="flex flex-col gap-3">
							{/* Column Header */}
							<div className="flex items-center gap-2">
								<i className="ri-flashlight-line text-base text-white md:text-base" />
								<h3 className="text-base font-semibold text-white">DevTools</h3>
							</div>
							{/* Links */}
							<div className="flex flex-col">
								<a
									href="https://effect.website/play/"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Effect Playground
								</a>
								<a
									href="https://github.com/Effect-TS/language-service"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Effect LSP</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://github.com/tim-smart/effect-mcp"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Effect MCP</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://github.com/Effect-TS/effect/blob/main/packages/cli/README.md"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Effect CLI</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://marketplace.visualstudio.com/items?itemName=effectful-tech.effect-vscode"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>VS Code Extension</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
							</div>
						</div>

						{/* Column 3: Community */}
						<div className="flex flex-col gap-3">
							{/* Column Header */}
							<div className="flex items-center gap-2">
								<i className="ri-user-community-line text-base text-white" />
								<h3 className="text-base font-semibold text-white">
									Community
								</h3>
							</div>
							{/* Links */}
							<div className="flex flex-col">
								<a
									href="https://effect.website/events/effect-days"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Effect Days
								</a>
								<a
									href="https://effect.website/merch"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Effect Merch
								</a>
								<a
									href="https://effect.website/podcast/"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Podcast
								</a>
								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Discord</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://luma.com/effect-community?k=c"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Meetups</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
							</div>
						</div>

						{/* Column 4: Other */}
						<div className="flex flex-col gap-3">
							{/* Column Header */}
							<div className="flex items-center gap-2">
								<i className="ri-mist-line text-base text-white" />
								<h3 className="text-base font-semibold text-white">Other</h3>
							</div>
							{/* Links */}
							<div className="flex flex-col">
								<a
									href="https://effect.website/blog"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Blog
								</a>
								<a
									href="https://effect.website/docs/additional-resources/myths/"
									target="_blank"
									rel="noopener noreferrer"
									className="border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									Myths about Effect
								</a>
								<a
									href="https://effect.kitlangton.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Visual Effect</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Workshops</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
								<a
									href="https://effectful.co/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between border-b border-zinc-800 py-2 text-base leading-[1.6] text-zinc-400 transition-colors hover:text-white"
								>
									<span>Effectful</span>
									<i className="ri-arrow-right-up-line text-base" />
								</a>
							</div>
						</div>
					</div>

					{/* Middle Section: Social & Branding */}
					<div className="flex flex-col gap-16 md:gap-8">
						{/* Top Border */}
						<div className="h-px bg-zinc-800" />

						{/* Social Icons and Branding Row */}
						<div className="flex flex-col items-center justify-between gap-12 md:flex-row">
							<img
								src={getAssetPath("/assets/logos/effect-logo-white.svg")}
								alt="Effect"
								className="h-10 md:h-8"
							/>

							{/* Social Icons (centered on mobile, middle on desktop) */}
							<div className="flex items-center gap-6 md:gap-5">
								<a
									href="https://x.com/EffectTS_"
									aria-label="Follow Effect on X (Twitter)"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-twitter-x-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://www.youtube.com/@EffectTS"
									aria-label="Subscribe to Effect on YouTube"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-youtube-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://github.com/Effect-TS"
									aria-label="Visit Effect on GitHub"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-github-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://discord.gg/effect-ts"
									aria-label="Join Effect Discord server"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-discord-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://bsky.app/profile/effect-ts.bsky.social"
									aria-label="Follow Effect on Bluesky"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-bluesky-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://www.linkedin.com/company/effect-ts"
									aria-label="Follow Effect on LinkedIn"
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-400 transition-colors hover:text-white"
								>
									<i
										className="ri-linkedin-fill text-3xl md:text-xl"
										aria-hidden="true"
									/>
								</a>
							</div>

							<p className="text-base text-zinc-400 md:text-sm">MIT Licensed</p>
						</div>

						{/* Bottom Border */}
						<div className="h-px bg-zinc-800" />
					</div>

					{/* Bottom Copyright Section */}
					<div className="flex flex-col items-center justify-between gap-4 pb-16 pt-16 md:flex-row md:gap-8 md:pb-32 md:pt-8">
						<p className="text-base text-zinc-400 md:text-sm">
							© {new Date().getFullYear()} Effectful Technologies Inc. All
							rights reserved.
						</p>
						<div className="flex items-center gap-4">
							<a
								href="mailto:contact@effectful.co"
								className="text-base text-zinc-400 transition-colors hover:text-white md:text-sm"
							>
								Email us
							</a>
							<a
								href="#"
								className="text-base text-zinc-400 transition-colors hover:text-white md:text-sm"
							>
								Terms
							</a>
							<a
								href="#"
								className="text-base text-zinc-400 transition-colors hover:text-white md:text-sm"
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
