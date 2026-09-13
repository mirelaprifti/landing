import { useState } from "react";
import { Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { ThemeToggleButton } from "../ui/ThemeToggle";
import type { DocsSectionKey } from "./DocsLayout";

/**
 * Dedicated navbar for the docs pages, following the Effect Days pattern:
 * one bar instead of navbar + section tabs. Same chrome and logo as the main
 * site nav, with the "Docs" lockup returning to the docs home and the section
 * links (Onboarding / Guides / Reference) sitting inline beside it. The version
 * switch lives at the top of the docs sidebar, not here.
 */

const DOCS_HOME = { href: "/docs/onboarding", label: "Docs" };

const SECTION_LINKS: { key: DocsSectionKey; label: string; href: string }[] = [
	{ key: "docs", label: "Onboarding", href: "/docs/onboarding" },
	{ key: "guides", label: "Guides", href: "/docs/introduction" },
	{ key: "api", label: "Reference", href: "/docs/api/v3" },
];

export function DocsNavigation({ section }: { section: DocsSectionKey }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div
			data-site-nav
			className="fixed top-0 right-0 left-0 z-100 w-full border-b border-zinc-200 bg-zinc-50/85 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/85"
		>
			<header className="relative mx-auto w-full max-w-[88rem] px-4">
				<nav className="flex h-16 items-center">
					<a href={getAssetPath("/")} className="flex items-center">
						<img
							src={getAssetPath(
								"/assets/effect-logo/Combination mark/SVG/effect-logo-black.svg",
							)}
							alt="Effect"
							className="h-[1.75rem] w-auto dark:hidden"
						/>
						<img
							src={getAssetPath(
								"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
							)}
							alt=""
							aria-hidden="true"
							className="hidden h-[1.75rem] w-auto dark:block"
						/>
					</a>

					{/* Sub-site lockup: the logo returns to the main site, the label
					    beside it returns to the docs home. ml-8 matches the logo→links
					    gap in the main nav so both navbars start at the same place. */}
					<div className="ml-8 hidden items-center gap-4 sm:flex">
						<Link
							href={getAssetPath(DOCS_HOME.href)}
							variant="nav"
							className="text-zinc-900 dark:text-white"
						>
							{DOCS_HOME.label}
						</Link>
						<div className="hidden h-4.5 w-px bg-zinc-300 md:block dark:bg-zinc-700" />
					</div>

					{/* Section links */}
					<div className="ml-4 hidden items-center gap-6 md:flex">
						{SECTION_LINKS.map((link) => (
							<Link
								key={link.key}
								href={getAssetPath(link.href)}
								variant="nav"
								active={link.key === section}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Search + socials + theme toggle + mobile menu toggle */}
					<div className="ml-auto flex items-center gap-4">
						<button
							type="button"
							aria-label="Open search"
							className="hidden items-center gap-2 rounded-md border border-zinc-300 px-2 py-1 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 md:flex dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white"
						>
							<Icon
								name="search"
								className="text-base font-medium"
								aria-hidden="true"
							/>
							<kbd className="text-[12px] text-zinc-500 dark:text-zinc-400/80">
								⌘K
							</kbd>
						</button>
						<div className="hidden h-4.5 w-px bg-zinc-300 sm:block dark:bg-zinc-700" />
						<div className="hidden items-center gap-4 sm:flex">
							<Link
								href="https://github.com/Effect-TS/effect"
								variant="icon"
								aria-label="Visit Effect on GitHub"
							>
								<i className="ri-github-fill text-xl" aria-hidden="true" />
							</Link>
							<Link
								href="https://discord.gg/effect-ts"
								variant="icon"
								aria-label="Join Effect Discord server"
							>
								<i className="ri-discord-fill text-xl" aria-hidden="true" />
							</Link>
						</div>
						<div className="hidden h-4.5 w-px bg-zinc-300 sm:block dark:bg-zinc-700" />
						<ThemeToggleButton className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" />
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center text-zinc-700 md:hidden dark:text-zinc-300"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							aria-controls="docs-mobile-menu"
							onClick={() => setMenuOpen((open) => !open)}
						>
							<Icon name={menuOpen ? "x" : "menu"} className="text-xl" />
						</button>
					</div>
				</nav>
			</header>

			{/* Mobile menu — carries the section identity the collapsed bar loses:
			    the inline links are hidden below md, and the "Docs" lockup below
			    sm, so without a heading the panel reads as an unmarked list. */}
			{menuOpen && (
				<div
					id="docs-mobile-menu"
					className="border-t border-zinc-200 bg-zinc-50 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
				>
					<div className="mx-auto w-full max-w-[88rem] px-4 py-3">
						<ul>
							{/* Docs heads the panel as a label, not a link — it names the
							    section you're inside, and every page here is already the
							    docs. The rule beneath it does the divider's job from the
							    desktop bar, separating the lockup from the links. */}
							{/* mb-2 gives the rule air on both sides — without it the
							    divider sits flush against the first link while the heading
							    floats above it. */}
							<li className="mb-2 border-b border-zinc-200 dark:border-zinc-800">
								{/* The panel's title, treated as selected: the nav's own
								    strong color in each theme. */}
								<p className="py-3 text-sm font-medium text-zinc-900 dark:text-white">
									{DOCS_HOME.label}
								</p>
							</li>
							{SECTION_LINKS.map((link) => {
								const isCurrent = link.key === section;
								return (
									<li key={link.key}>
										<Link
											href={getAssetPath(link.href)}
											variant="nav"
											/* The current section takes the same strong treatment the
											   desktop active link gets, and drops the hover underline —
											   following it goes nowhere new. */
											className={`block py-3 ${
												isCurrent
													? "cursor-default text-zinc-900 hover:border-transparent dark:text-white"
													: ""
											}`}
											onClick={() => setMenuOpen(false)}
										>
											{link.label}
											{isCurrent && (
												<span className="sr-only"> (current section)</span>
											)}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
