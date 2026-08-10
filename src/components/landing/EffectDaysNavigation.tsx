import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";

/**
 * Dedicated navbar for the Effect Days pages. Same chrome and logo as the
 * main site navigation, but with event-scoped links and a single ticket CTA.
 */

const EVENT_LINKS = [
	{ href: "/effect-days#program", label: "Program" },
	{ href: "/effect-days#venue", label: "Venue" },
	{ href: "/effect-days/about-livorno", label: "About Livorno" },
	{ href: "/effect-days#faq", label: "FAQ" },
];

export function EffectDaysNavigation({ activePath }: { activePath?: string }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div
			data-site-nav
			className="fixed top-0 right-0 left-0 z-100 w-full border-b border-zinc-200 bg-zinc-50/85 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/85"
		>
			<header className="relative mx-auto w-full max-w-[88rem] px-4">
				<nav className="flex h-16 items-center">
					<a href="/" className="flex items-center">
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

					{/* Event links (desktop) */}
					<div className="ml-8 hidden items-center gap-6 md:flex">
						{EVENT_LINKS.map((link) => (
							<Link
								key={link.href}
								href={getAssetPath(link.href)}
								variant="nav"
								active={
									!link.href.includes("#") && activePath?.startsWith(link.href)
								}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Social icons + ticket CTA + mobile menu toggle */}
					<div className="ml-auto flex items-center gap-4">
						<Button
							href={getAssetPath("/effect-days#tickets")}
							variant="primary"
							size="sm"
						>
							<Icon name="ticket" className="text-base" />
							Get tickets
						</Button>
						<div className="hidden h-4.5 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />
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
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center text-zinc-700 md:hidden dark:text-zinc-300"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							aria-controls="effect-days-mobile-menu"
							onClick={() => setMenuOpen((open) => !open)}
						>
							<Icon name={menuOpen ? "x" : "menu"} className="text-xl" />
						</button>
					</div>
				</nav>
			</header>

			{/* Mobile menu */}
			{menuOpen && (
				<div
					id="effect-days-mobile-menu"
					className="border-t border-zinc-200 bg-zinc-50 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
				>
					<ul className="mx-auto w-full max-w-[88rem] px-4 py-3">
						{EVENT_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={getAssetPath(link.href)}
									variant="nav"
									active={
										!link.href.includes("#") &&
										activePath?.startsWith(link.href)
									}
									className="block py-3"
									onClick={() => setMenuOpen(false)}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
