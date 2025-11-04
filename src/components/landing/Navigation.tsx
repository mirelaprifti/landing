import { useEffect } from "react";

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
				className="fixed left-0 right-0 top-0 z-50 w-full px-4 md:px-8"
				style={{
					backgroundColor: "rgba(9, 9, 11, 0.85)",
					backdropFilter: "blur(5px)",
					WebkitBackdropFilter: "blur(5px)",
				}}
			>
				<div className="w-full">
					<header className="relative mx-auto w-full max-w-[96rem]">
						<nav className="flex h-20 items-center">
							<a href="/" className="flex items-center">
								<img
									src="/assets/logos/effect-logo-white.svg"
									alt="Effect"
									className="h-[2rem] w-auto"
								/>
							</a>

							<div className="ml-auto flex items-center">
								<div className="hidden items-center gap-4 md:flex">
									<a
										href="https://effect.website/docs/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-base font-medium text-zinc-400 transition-colors hover:text-white"
									>
										Docs
									</a>
									<a
										href="https://effect.website/blog/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-base font-medium text-zinc-400 transition-colors hover:text-white"
									>
										Blog
									</a>
									<a
										href="https://effect.website/podcast/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-base font-medium text-zinc-400 transition-colors hover:text-white"
									>
										Podcast
									</a>
									<a
										href="https://effect.website/play/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-base font-medium text-zinc-400 transition-colors hover:text-white"
									>
										Play
									</a>
									<a
										href="https://github.com/Effect-TS/effect"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit Effect on GitHub"
										className="text-zinc-400 transition-colors hover:text-white"
									>
										<span className="sr-only">Visit Effect on GitHub</span>
										<i
											className="ri-github-fill text-xl"
											aria-hidden="true"
										></i>
									</a>
									<a
										href="https://discord.gg/effect-ts"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Join Effect Discord server"
										className="text-zinc-400 transition-colors hover:text-white"
									>
										<span className="sr-only">Join Effect Discord server</span>
										<i
											className="ri-discord-fill text-xl"
											aria-hidden="true"
										></i>
									</a>

									<button
										type="button"
										aria-label="Open search (Command K)"
										className="flex items-center gap-2 rounded-[8px] border border-zinc-700 px-2.5 py-1.5 text-zinc-400 transition-all hover:border-zinc-950 hover:bg-zinc-800 hover:text-white"
									>
										<span className="flex items-center gap-1">
											<i
												className="ri-search-line text-base"
												aria-hidden="true"
											></i>
											<span className="text-[0.875rem] font-normal">
												Search
											</span>
										</span>
										<span
											className="text-[0.7rem] font-normal"
											aria-hidden="true"
										>
											⌘K
										</span>
									</button>
								</div>

								<button
									type="button"
									aria-label="Open navigation menu"
									className="flex h-10 w-10 items-center justify-center text-zinc-300 transition-all hover:text-white md:hidden"
								>
									<i
										className="ri-menu-3-line text-[2rem]"
										aria-hidden="true"
									></i>
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
					<div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-700 px-6 py-5">
						<span className="text-base font-semibold text-white">Menu</span>
						<button
							type="button"
							onClick={() => {
								const menu = document.getElementById("mobile-menu");
								if (menu) menu.classList.add("hidden");
							}}
							aria-label="Close navigation menu"
							className="flex h-10 w-10 items-center justify-center rounded-[8px] text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
						>
							<i className="ri-close-line text-xl" aria-hidden="true"></i>
						</button>
					</div>
					<nav className="flex-1 overflow-y-auto p-6">
						<a
							href="https://effect.website/docs/"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							Docs
						</a>
						<a
							href="https://effect.website/blog/"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							Blog
						</a>
						<a
							href="https://effect.website/podcast/"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							Podcast
						</a>
						<a
							href="https://effect.website/play/"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							Play
						</a>
						<a
							href="https://effect.kitlangton.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							Visual Effect
						</a>
						<a
							href="https://github.com/Effect-TS/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							<i className="ri-github-fill text-lg" aria-hidden="true"></i>
							<span>GitHub</span>
						</a>
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							<i className="ri-discord-fill text-lg" aria-hidden="true"></i>
							<span>Discord</span>
						</a>
						<a
							href="https://twitter.com/EffectTS_"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 py-4 text-base font-normal text-zinc-300 transition-colors hover:text-white"
						>
							<i className="ri-twitter-x-fill text-lg" aria-hidden="true"></i>
							<span>X(Twitter)</span>
						</a>

						<button
							type="button"
							aria-label="Open search (Command K)"
							className="mt-4 flex w-full items-center gap-2 rounded-[8px] border border-zinc-700 px-4 py-3 text-zinc-300 transition-all hover:border-zinc-600 hover:text-white"
						>
							<i className="ri-search-line text-lg" aria-hidden="true"></i>
							<span className="text-base font-normal">Search</span>
							<span
								className="ml-auto text-sm font-normal text-zinc-500"
								aria-hidden="true"
							>
								⌘K
							</span>
						</button>
					</nav>
				</div>
			</div>
		</>
	);
}
