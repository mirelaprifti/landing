import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";

/**
 * Dedicated navbar for the Effect Days pages. Replaces the main site
 * navigation with event-scoped links and a single ticket CTA, following
 * the conference-site pattern (Vercel Ship, GitHub Universe): the wordmark
 * returns to the event home, and one link escapes back to the main site.
 */

const EVENT_LINKS = [
	{ href: "/effect-days#program", label: "Program" },
	{ href: "/effect-days#venue", label: "Venue" },
	{ href: "/effect-days/about-livorno", label: "About Livorno" },
	{ href: "/effect-days#faq", label: "FAQ" },
];

export function EffectDaysNavigation({ activePath }: { activePath?: string }) {
	return (
		<div className="fixed top-0 right-0 left-0 z-100 w-full border-b border-zinc-200 bg-zinc-50/85 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/85">
			<header className="relative mx-auto w-full max-w-[88rem] px-4">
				<nav className="flex h-16 items-center">
					{/* Wordmark — returns to the event home */}
					<a
						href={getAssetPath("/effect-days")}
						className="flex items-center gap-3"
					>
						<img
							src={getAssetPath(
								"/assets/effect-logo/Logo symbol/SVG/effect-logomark-black.svg",
							)}
							alt="Effect"
							className="h-7 w-auto dark:hidden"
						/>
						<img
							src={getAssetPath(
								"/assets/effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
							)}
							alt=""
							aria-hidden="true"
							className="hidden h-7 w-auto dark:block"
						/>
						<span className="font-mono text-sm font-semibold tracking-wider text-zinc-900 uppercase dark:text-white">
							Effect Days
						</span>
					</a>

					{/* Event links */}
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

					{/* Back to the main site + ticket CTA */}
					<div className="ml-auto flex items-center gap-6">
						<Link
							href={getAssetPath("/")}
							variant="nav"
							className="hidden sm:block"
						>
							effect.website
						</Link>
						<Button
							href={getAssetPath("/effect-days#tickets")}
							variant="primary"
							size="sm"
						>
							<Icon name="ticket" className="text-base" />
							Get tickets
						</Button>
					</div>
				</nav>
			</header>
		</div>
	);
}
