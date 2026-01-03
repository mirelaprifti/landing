import { useEffect } from "react";
import { getAssetPath } from "../../utils/assetPath";

export function Navigation() {
	useEffect(() => {
		let isMenuAnimating = false;

		const menu = document.getElementById("mobile-menu");
		const backdrop = document.getElementById("mobile-menu-backdrop");
		const panel = document.getElementById("mobile-menu-panel");

		const toggleMobileMenu = () => {
			if (isMenuAnimating || !menu || !backdrop || !panel) return;

			const isHidden = menu?.classList.contains("hidden");

			if (isHidden) {
				menu.classList.remove("hidden");
				backdrop.classList.add("mobile-menu-backdrop-enter");
				panel.classList.add("mobile-menu-panel-enter");
				isMenuAnimating = true;
				setTimeout(() => {
					backdrop.classList.remove("mobile-menu-backdrop-enter");
					panel.classList.remove("mobile-menu-panel-enter");
					panel.style.transform = "translateX(0)";
					isMenuAnimating = false;
				}, 300);
			} else {
				panel.style.transform = "";
				backdrop.classList.add("mobile-menu-backdrop-exit");
				panel.classList.add("mobile-menu-panel-exit");
				isMenuAnimating = true;
				setTimeout(() => {
					menu.classList.add("hidden");
					backdrop.classList.remove("mobile-menu-backdrop-exit");
					panel.classList.remove("mobile-menu-panel-exit");
					panel.style.transform = "translateX(100%)";
					isMenuAnimating = false;
				}, 300);
			}
		};

		const mobileMenuButton =
			document.querySelector<HTMLButtonElement>("button.md\\:hidden");
		if (mobileMenuButton) {
			mobileMenuButton.addEventListener("click", toggleMobileMenu);
		}

		const handleEsc = (event: KeyboardEvent) => {
			if (
				event.key === "Escape" &&
				menu &&
				!menu.classList.contains("hidden")
			) {
				toggleMobileMenu();
			}
		};
		document.addEventListener("keydown", handleEsc);

		return () => {
			if (mobileMenuButton) {
				mobileMenuButton.removeEventListener("click", toggleMobileMenu);
			}
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<>
			<div
				className="fixed left-0 right-0 top-0 z-100 w-full border-b border-zinc-800 /50px-4 md:px-8"
				style={{
					backgroundColor: "rgba(9, 9, 11, 0.85)",
					backdropFilter: "blur(5px)",
					WebkitBackdropFilter: "blur(5px)",
				}}
			>
				<div className="w-full">
					<header className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<nav className="flex h-16 items-center">
							<a href="/" className="flex items-center">
								<img
									src={getAssetPath("/assets/logos/effect-logo-white.svg")}
									alt="Effect"
									className="h-[1.5rem] w-auto"
								/>
							</a>

							{/* Navigation links next to logo */}
							<div className="ml-8 hidden items-center gap-6 md:flex">
								<a
									href="https://effect.website/docs/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-zinc-400 font-medium transition-colors hover:text-white"
								>
									Docs
								</a>
								<a
									href="https://effect.website/blog/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-zinc-400 font-medium transition-colors hover:text-white"
								>
									Blog
								</a>
								<a
									href="https://effect.website/play/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-zinc-400 font-medium transition-colors hover:text-white"
								>
									Playground
								</a>
								<a
									href="https://www.effect.solutions/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-zinc-400 font-medium transition-colors hover:text-white"
								>
									LLM Guide
								</a>
							</div>

							{/* Mobile menu button */}
							<button
								type="button"
								className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white md:hidden"
								aria-label="Open navigation menu"
							>
								<i className="ri-menu-line text-xl" aria-hidden="true" />
							</button>

							{/* Right side items (desktop) */}
							<div className="ml-auto hidden items-center gap-4.5 md:flex">
								<div className="flex items-center gap-3">
									<a
										href="https://github.com/Effect-TS/effect"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit Effect on GitHub"
										className=" text-zinc-400 transition-colors hover:text-white"
									>
										<i className="ri-github-fill text-xl" aria-hidden="true" />
									</a>
									<a
										href="https://discord.gg/effect-ts"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Join Effect Discord server"
										className=" text-zinc-400 transition-colors hover:text-white"
									>
										<i className="ri-discord-fill text-xl" aria-hidden="true" />
									</a>
								</div>

								<div className="h-4.5 w-px bg-zinc-700" />

								<button
									type="button"
									aria-label="Open search (Command K)"
									className="flex items-center gap-2 rounded-md border border-zinc-600 px-2 py-1 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white hover:bg-zinc-900"
								>
									<i className="ri-search-line text-base font-medium" aria-hidden="true" />
									<kbd className="text-[12px] text-zinc-400/80">⌘K</kbd>
								</button>
							</div>
						</nav>
					</header>
				</div>
			</div>

			<div id="mobile-menu" className="fixed inset-0 z-50 hidden">
				<button
					type="button"
					id="mobile-menu-backdrop"
					className="fixed inset-0 bg-zinc-800/10"
					onClick={() => {
						const menu = document.getElementById("mobile-menu");
						if (menu) menu.classList.add("hidden");
					}}
					aria-label="Close mobile menu"
				></button>
				<div
					id="mobile-menu-panel"
					className="fixed right-0 top-0 flex h-full w-full max-w-[64%] flex-col bg-zinc-900 shadow-xl"
					style={{ transform: "translateX(100%)" }}
				>
					<div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-3">
						<span className="text-sm font-medium text-white">Menu</span>
						<button
							type="button"
							onClick={() => {
								const menu = document.getElementById("mobile-menu");
								if (menu) menu.classList.add("hidden");
							}}
							aria-label="Close navigation menu"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
						>
							<i className="ri-close-line text-xl" aria-hidden="true"></i>
						</button>
					</div>
					<nav className="flex-1 overflow-y-auto px-6 py-4">
						{/* Primary navigation */}
						<div className="space-y-1">
							<a
								href="https://effect.website/docs/"
								target="_blank"
								rel="noopener noreferrer"
								className="block rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								Docs
							</a>
							<a
								href="https://effect.website/blog/"
								target="_blank"
								rel="noopener noreferrer"
								className="block rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								Blog
							</a>
							<a
								href="https://effect.website/play/"
								target="_blank"
								rel="noopener noreferrer"
								className="block rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								Playground
							</a>
						</div>

						{/* Divider */}
						<div className="my-4 h-px bg-zinc-400" />

						{/* Secondary links */}
						<div className="space-y-1">
							<a
								href="https://github.com/Effect-TS/effect"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								<i className="ri-github-fill text-lg" aria-hidden="true"></i>
								<span>GitHub</span>
							</a>
							<a
								href="https://discord.gg/effect-ts"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								<i className="ri-discord-fill text-lg" aria-hidden="true"></i>
								<span>Discord</span>
							</a>
							<a
								href="https://twitter.com/EffectTS_"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							>
								<i className="ri-twitter-x-fill text-lg" aria-hidden="true"></i>
								<span>X / Twitter</span>
							</a>
						</div>

						{/* Search button */}
						<button
							type="button"
							aria-label="Open search (Command K)"
							className="mt-6 flex w-full items-center gap-3 rounded-lg border border-zinc-500 px-3 py-2.5 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
						>
							<i className="ri-search-line text-lg" aria-hidden="true"></i>
							<span className="text-sm">Search</span>
							<kbd className="ml-auto text-xs text-zinc-300">⌘K</kbd>
						</button>
					</nav>
				</div>
			</div>
		</>
	);
}
