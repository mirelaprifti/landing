import { Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";

/**
 * Design exploration: navbar options for ui.effect.website that tie it back
 * to effect.website. Not a live page — each variant renders the nav over a
 * slice of the Effect UI article so the pair can be compared in context.
 */

const LOGO = getAssetPath(
	"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
);

const UI_LINKS = [
	{ href: "#", label: "Introduction", active: true },
	{ href: "https://github.com/Effect-TS/ui/tree/main/examples", label: "Examples" },
	{ href: "https://effect.website/docs/v4", label: "Effect docs" },
];

const TOC = [
	"Explore with an AI agent",
	"What this article covers",
	"Terms",
	"Components",
	"State and data",
	"Views and rendering",
	"Testing",
	"DevTools",
];

function Divider() {
	return <div className="h-4.5 w-px bg-zinc-700" />;
}

function SocialIcons({ repo }: { repo: string }) {
	return (
		<div className="flex items-center gap-4">
			<Link href={repo} variant="icon" aria-label="GitHub">
				<i className="ri-github-fill text-xl" aria-hidden="true" />
			</Link>
			<Link href="https://discord.gg/effect-ts" variant="icon" aria-label="Discord">
				<i className="ri-discord-fill text-xl" aria-hidden="true" />
			</Link>
		</div>
	);
}

function SearchButton() {
	return (
		<div className="flex h-8 items-center gap-2 rounded-md border border-zinc-700 px-2.5 text-zinc-400">
			<Icon name="search" className="text-base" />
			<span className="font-mono text-[11px]">⌘K</span>
		</div>
	);
}

/** A — Sub-site lockup, same idiom as the Effect Days navbar. */
function NavLockup() {
	return (
		<div className="border-b border-zinc-800 bg-zinc-950/85">
			<nav className="mx-auto flex h-16 w-full max-w-[88rem] items-center px-4">
				<a href="https://effect.website/" className="flex items-center">
					<img src={LOGO} alt="Effect" className="h-[1.75rem] w-auto" />
				</a>
				<div className="ml-8 flex items-center gap-4">
					<Link href="#" variant="nav" className="whitespace-nowrap text-white">
						Effect UI
					</Link>
					<Divider />
				</div>
				<div className="ml-4 flex items-center gap-6">
					{UI_LINKS.map((l) => (
						<Link key={l.label} href={l.href} variant="nav" active={l.active}>
							{l.label}
						</Link>
					))}
				</div>
				<div className="ml-auto flex items-center gap-4">
					<SocialIcons repo="https://github.com/Effect-TS/ui" />
				</div>
			</nav>
		</div>
	);
}

/** B — The main site nav verbatim, with a slim Effect UI bar under it. */
function NavMainPlusBar() {
	return (
		<div className="bg-zinc-950/85">
			<div className="border-b border-zinc-800">
				<nav className="mx-auto flex h-16 w-full max-w-[88rem] items-center px-4">
					<a href="https://effect.website/" className="flex items-center">
						<img src={LOGO} alt="Effect" className="h-[1.75rem] w-auto" />
					</a>
					<div className="ml-8 flex items-center gap-6">
						<Link href="#" variant="nav">Docs</Link>
						<Link href="#" variant="nav">Play</Link>
						<Link href="#" variant="nav">
							<span className="inline-flex items-center gap-1">
								Resources <Icon name="chevron-down" className="text-sm" />
							</span>
						</Link>
						<Link href="#" variant="nav">
							<span className="inline-flex items-center gap-1">
								Community <Icon name="chevron-down" className="text-sm" />
							</span>
						</Link>
						<Link href="#" variant="nav">Effect Days</Link>
					</div>
					<div className="ml-auto flex items-center gap-4">
						<SearchButton />
						<Divider />
						<SocialIcons repo="https://github.com/Effect-TS/effect" />
					</div>
				</nav>
			</div>
			<div className="border-b border-zinc-800">
				<div className="mx-auto flex h-11 w-full max-w-[88rem] items-center gap-6 px-4 text-sm">
					<span className="font-medium text-white">Effect UI</span>
					<span className="font-mono text-[10px] tracking-[0.1em] text-zinc-500">
						PUBLIC PREVIEW
					</span>
					<div className="ml-auto flex items-center gap-6 text-zinc-400">
						<a href="#" className="hover:text-white">Examples</a>
						<a href="https://github.com/Effect-TS/ui" className="inline-flex items-center gap-0.5 hover:text-white">
							GitHub <Icon name="arrow-up-right" className="text-sm" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

/** Slice of the Effect UI article, with its old masthead removed. */
function ArticleSlice() {
	return (
		<div className="flex">
			<aside className="w-52 shrink-0 px-4 pt-10">
				<p className="mb-5 font-mono text-[10px] tracking-[0.1em] text-zinc-500">
					ON THIS PAGE
				</p>
				<ul className="space-y-3 border-l border-zinc-800 pl-4 text-sm text-zinc-400">
					{TOC.map((t) => (
						<li key={t}>{t}</li>
					))}
				</ul>
			</aside>
			<main className="mx-auto w-full max-w-[44rem] px-8 pt-10 pb-16">
				<header className="border-y border-zinc-800 py-9">
					<p className="mb-5 font-mono text-[10px] tracking-[0.1em] text-zinc-500">
						// PUBLIC PREVIEW
					</p>
					<h1 className="text-5xl font-bold tracking-[-0.035em] text-white">
						Introducing Effect UI
					</h1>
				</header>
				<p className="mt-8 text-xl/[1.6] text-zinc-200">
					Effect UI is the new frontend library that continues the work of
					Foldkit 0.x, the framework at foldkit.dev.
				</p>
			</main>
			<div className="w-52 shrink-0" />
		</div>
	);
}

function Frame({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
	return (
		<section id={id} className="mb-16">
			<p className="mb-3 px-4 font-mono text-xs tracking-[0.1em] text-zinc-500">{label}</p>
			<div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#0b0b0d]">
				{children}
				<ArticleSlice />
			</div>
		</section>
	);
}

export function EffectUiNavPrototype() {
	return (
		<div className="min-h-screen bg-zinc-950 px-6 py-10">
			<div className="mx-auto max-w-[90rem]">
				<Frame id="a" label="A — SUB-SITE LOCKUP">
					<NavLockup />
				</Frame>
				<Frame id="b" label="B — MAIN NAV + EFFECT UI BAR">
					<NavMainPlusBar />
				</Frame>
			</div>
		</div>
	);
}
