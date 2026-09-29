import { type ReactNode, useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { featuredCases } from "./TestimonialsSection";

/** Canonical text styles — copied verbatim from TypographyStyleguidePage. */
const text = {
	pageTitle:
		"leading-[1.1] text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white",
	eyebrow:
		"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400",
	sectionTitle:
		"leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white",
	subtitle: "mt-4 text-lg text-zinc-600 dark:text-zinc-400",
	cardTitle: "text-lg font-semibold text-zinc-900 dark:text-white",
	smallHeading: "text-base font-semibold text-zinc-900 dark:text-white",
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
	micro:
		"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
};

/** Styleguide kind badge. */
const badge =
	"rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";

const subtleLink = "inline-flex items-center gap-1.5 font-medium";

const CONTACT_EMAIL = "contact@effectful.co";
const DISCORD_URL = "https://discord.gg/effect-ts";
const COMMUNITY_HUB = getAssetPath("/community-hub");
const POLICY_UPDATED = "Oct 01, 2026";

const LOGO = {
	effectMark: getAssetPath(
		"/assets/effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
	),
	effectMarkDark: getAssetPath(
		"/assets/effect-logo/Logo symbol/SVG/effect-logomark-black.svg",
	),
	effectful: getAssetPath("/assets/effect-days/Effectful-white.svg"),
	effectfulDark: getAssetPath("/assets/effect-days/Effectful-black.svg"),
	ziverge: getAssetPath("/assets/partner-logos/ziverge.svg"),
};

/**
 * Marks content the brief still has to define (LTS dates, SLAs, owners).
 * Dashed so it can never be mistaken for a real value.
 */
function Tbd({ children = "TBD" }: { children?: ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-sm border border-dashed border-zinc-400 px-1.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-600 dark:text-zinc-400">
			{children}
		</span>
	);
}

/** Theme-aware logo: light asset on dark, dark asset on light. */
function ThemedLogo({
	light,
	dark,
	alt,
	className,
}: {
	light: string;
	dark: string;
	alt: string;
	className: string;
}) {
	return (
		<>
			<img src={dark} alt={alt} className={`${className} dark:hidden`} />
			<img src={light} alt={alt} className={`${className} hidden dark:block`} />
		</>
	);
}

function Section({
	id,
	eyebrow,
	title,
	subtitle,
	action,
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	subtitle?: ReactNode;
	/** Optional section-level action, aligned right of the title on desktop. */
	action?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			className="scroll-mt-16 border-t border-zinc-200 dark:border-zinc-800"
		>
			<div className="mx-auto w-full max-w-[73.75rem] px-4 py-24 md:pt-40">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className={text.eyebrow}>// {eyebrow}</p>
						<h2 className={text.sectionTitle}>{title}</h2>
						{subtitle && (
							<p className={`${text.subtitle} max-w-2xl`}>{subtitle}</p>
						)}
					</div>
					{action && <div className="shrink-0">{action}</div>}
				</div>
				<div className="mt-12">{children}</div>
			</div>
		</section>
	);
}

/** The email address as a panel, styled like the homepage install command. */
function EmailPanel() {
	const [copied, setCopied] = useState(false);
	return (
		<div className="rounded-md bg-zinc-100/50 p-1 ring-1 ring-zinc-300 ring-inset dark:bg-zinc-900/50 dark:ring-zinc-700">
			<div className="flex min-h-11 w-full items-center gap-3 px-4 py-1 font-mono text-sm">
				<span className="text-zinc-400 dark:text-zinc-500">@</span>
				<a
					href={`mailto:${CONTACT_EMAIL}?subject=Effect%20for%20enterprise`}
					className="min-w-0 flex-1 truncate text-left text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
				>
					{CONTACT_EMAIL}
				</a>
				<button
					type="button"
					onClick={async () => {
						try {
							await navigator.clipboard.writeText(CONTACT_EMAIL);
							setCopied(true);
							setTimeout(() => setCopied(false), 1500);
						} catch {
							// noop
						}
					}}
					aria-label={copied ? "Email copied" : "Copy email address"}
					className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
				>
					<Icon
						name={copied ? "circle-check" : "clipboard-list"}
						className="text-sm"
					/>
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

/** Production logo tile — links to the talk; the arrow brightens on hover. */
function StoryCard({ story }: { story: (typeof PRODUCTION)[number] }) {
	return (
		<a
			href={story.href}
			{...(story.href.startsWith("http")
				? { target: "_blank", rel: "noopener noreferrer" }
				: {})}
			className="group flex h-full flex-col bg-zinc-50 px-6 py-5 transition-colors hover:bg-zinc-100 md:px-8 dark:bg-zinc-950 dark:hover:bg-zinc-900/80"
		>
			<span className="flex items-start justify-between gap-4">
				<span className="flex h-8 items-center">
					{"logoOnLight" in story && story.logoOnLight ? (
						<ThemedLogo
							light={story.logo}
							dark={story.logoOnLight}
							alt={story.company}
							className={`${story.logoClass} w-auto`}
						/>
					) : (
						<img
							src={story.logo}
							alt={story.company}
							className={`${story.logoClass} w-auto invert dark:invert-0`}
						/>
					)}
				</span>
				<Icon
					name="arrow-up-right"
					className="shrink-0 text-lg text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
				/>
			</span>
			<span className={`${text.cardBody} mt-3`}>{story.useCase}</span>
		</a>
	);
}

/** Integration-style project card — app-icon tile with a faint brand glow. Static: no hover. */
function ProjectCard({ project }: { project: (typeof ECOSYSTEM)[number] }) {
	return (
		<article className="relative flex flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-60 blur-3xl"
				style={{
					background: `radial-gradient(circle, rgba(${project.glow}, 0.14), transparent 70%)`,
				}}
			/>
			<div className="relative flex-1 p-6 md:p-8">
				<div className="flex items-center gap-4">
					<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
						<ThemedLogo
							light={project.mark.light}
							dark={project.mark.dark}
							alt=""
							className="h-7 w-7"
						/>
					</span>
					<div>
						<h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
							{project.name}
						</h4>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							{project.kind}
						</p>
					</div>
				</div>
				<p className="mt-6 max-w-md text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					{project.tagline}
				</p>
				<ul className="mt-6 flex flex-wrap gap-2">
					{project.highlights.map((h) => (
						<li key={h} className={badge}>
							{h}
						</li>
					))}
				</ul>
			</div>
			<footer className="relative flex flex-wrap items-center gap-4 border-t border-zinc-200 px-6 py-4 md:px-8 dark:border-zinc-800">
				<span className="flex flex-wrap gap-x-6 gap-y-2">
					{project.links.map((l) => (
						<Link
							key={l.label}
							href={l.href}
							variant="subtle"
							className={subtleLink}
						>
							{l.label}
							<Icon name="arrow-up-right" className="text-xs" />
						</Link>
					))}
				</span>
			</footer>
		</article>
	);
}

/** One party in the Who does what diagram. */
function HubNode({
	mark,
	name,
	role,
	items,
	hub,
}: {
	mark: ReactNode;
	name: string;
	role: string;
	items: string[];
	hub?: boolean;
}) {
	return (
		<div
			className={`relative h-full overflow-hidden border ${
				hub
					? "border-zinc-900 bg-white p-6 md:p-8 dark:border-zinc-500 dark:bg-zinc-900"
					: "border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-950"
			}`}
		>
			{hub && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900 to-transparent dark:via-white"
				/>
			)}
			<div className="flex h-10 items-center">{mark}</div>
			<p className={`${text.micro} mt-5`}>{role}</p>
			<h4 className="sr-only">{name}</h4>
			<ul className="mt-3 space-y-2">
				{items.map((item) => (
					<li
						key={item}
						className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
					>
						<span
							aria-hidden="true"
							className={`h-1 w-1 shrink-0 rounded-full ${
								hub
									? "bg-zinc-900 dark:bg-white"
									: "bg-zinc-400 dark:bg-zinc-600"
							}`}
						/>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

/**
 * Hairline connector with a pulse travelling away from the hub.
 * `toward` is the side the pulse travels to; vertical on mobile.
 */
function HubLink({ toward }: { toward: "left" | "right" }) {
	return (
		<div
			aria-hidden="true"
			className="relative flex h-full items-center justify-center"
		>
			{/* desktop: horizontal */}
			<div className="relative hidden h-px w-full bg-zinc-300 lg:block dark:bg-zinc-700">
				<span
					className="hub-pulse absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-zinc-900 shadow-[0_0_8px_2px_rgba(0,0,0,0.15)] dark:bg-white dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.45)]"
					style={{
						animation: `${toward === "right" ? "hub-right" : "hub-left"} 2.8s cubic-bezier(0.4,0,0.2,1) infinite`,
					}}
				/>
			</div>
			{/* mobile: vertical */}
			<div className="h-8 w-px bg-zinc-300 lg:hidden dark:bg-zinc-700" />
		</div>
	);
}

/**
 * Who does what: Effectful is the hub every conversation starts at; the
 * maintainers and adoption partners sit either side of it.
 */
function SupportFlow() {
	return (
		<>
			<style>{`
				@keyframes hub-right { 0% { left: 0%; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { left: 100%; opacity: 0 } }
				@keyframes hub-left { 0% { left: 100%; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { left: 0%; opacity: 0 } }
				@media (prefers-reduced-motion: reduce) { .hub-pulse { animation: none !important; opacity: 0 } }
			`}</style>
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1.15fr)_72px_minmax(0,1fr)]">
				<div className="lg:order-3">
					<HubNode
						hub
						name="Effectful"
						role="Your point of contact"
						mark={
							<ThemedLogo
								light={LOGO.effectful}
								dark={LOGO.effectfulDark}
								alt="Effectful"
								className="h-7 w-auto"
							/>
						}
						items={[
							"Evaluation and adoption planning",
							"Enterprise support, NDA and SLAs",
							"Private Slack or Discord channel",
						]}
					/>
				</div>
				<div className="lg:order-2">
					<HubLink toward="left" />
				</div>
				<div className="lg:order-1">
					<HubNode
						name="Effect maintainers"
						role="Open source"
						mark={
							<span className="flex items-center gap-2.5">
								<ThemedLogo
									light={LOGO.effectMark}
									dark={LOGO.effectMarkDark}
									alt=""
									className="h-6 w-6"
								/>
								<span className="text-lg font-semibold text-zinc-900 dark:text-white">
									Maintainers
								</span>
							</span>
						}
						items={["Releases", "Security fixes"]}
					/>
				</div>
				<div className="lg:order-4">
					<HubLink toward="right" />
				</div>
				<div className="lg:order-5">
					<HubNode
						name="Ziverge"
						role="Adoption partner"
						mark={
							<img src={LOGO.ziverge} alt="Ziverge" className="h-6 w-auto" />
						}
						items={[
							"Implementation",
							"Consulting",
							"Team extension",
							"Training",
						]}
					/>
				</div>
			</div>
		</>
	);
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const PAGE_QUESTIONS = [
	{ href: "#support", label: "Who can help us adopt and operate it?" },
	{ href: "#security", label: "What happens with a security issue?" },
	{
		href: "#adoption-guide",
		label: "What do we send to our architecture review?",
	},
];

const talk = (alt: string) => featuredCases.find((c) => c.alt === alt);

/** Production stories — logo tiles linking to each talk. */
const PRODUCTION = [
	{
		company: "OpenCode",
		logo: getAssetPath("/assets/effect-jobs-logos/opencode-wordmark-dark.svg"),
		logoClass: "max-h-6",
		useCase: "Migrating a large TypeScript codebase to Effect",
		talk: talk("opencode"),
		href: talk("opencode")?.href ?? "#",
	},
	{
		company: "OpenRouter",
		logo: getAssetPath("/assets/images/openrouter-v2-on-dark.svg"),
		/** Brand-colored mark: separate assets per theme instead of inverting. */
		logoOnLight: getAssetPath("/assets/images/openrouter-v2-on-light.svg"),
		logoClass: "h-6",
		useCase: "Internal tooling and infrastructure",
		talk: talk("OpenRouter"),
		href: talk("OpenRouter")?.href ?? "#",
	},
	{
		company: "Warp",
		logo: getAssetPath("/assets/images/warp-logo-white.svg"),
		logoClass: "max-h-6",
		useCase: "Reliable payment and payroll systems",
		href: getAssetPath("/podcast/episodes/reliable-payroll-systems-warp"),
	},
	{
		company: "MasterClass",
		logo: getAssetPath("/assets/images/masterclass-noM.svg"),
		logoClass: "max-h-5",
		useCase: "Real-time voice AI orchestration",
		talk: talk("MasterClass"),
		href: talk("MasterClass")?.href ?? "#",
	},
];

/**
 * Flagship ecosystem projects. Descriptions and highlights come from each
 * project's own docs (checked Sep 2026). `glow` is the project's brand color.
 */
const ECOSYSTEM: {
	name: string;
	kind: string;
	tagline: string;
	mark: { light: string; dark: string };
	glow: string;
	highlights: string[];
	links: { label: string; href: string }[];
}[] = [
	{
		name: "Alchemy",
		kind: "Infrastructure as Code",
		tagline:
			"Define cloud resources and application behavior in the same TypeScript program.",
		mark: {
			light: getAssetPath("/assets/ecosystem/alchemy-mark-dark.svg"),
			dark: getAssetPath("/assets/ecosystem/alchemy-mark-light.svg"),
		},
		glow: "163, 196, 115",
		highlights: ["Cloudflare", "AWS", "Neon", "PlanetScale", "Stripe"],
		links: [
			{ label: "Get started", href: "https://alchemy.run/getting-started" },
			{ label: "Source", href: "https://github.com/alchemy-run/alchemy" },
		],
	},
	{
		name: "Foldkit",
		kind: "Frontend framework",
		tagline:
			"The Elm Architecture on Effect: one Schema-defined Model, explicit effects, typed routing.",
		mark: {
			light: getAssetPath("/assets/ecosystem/foldkit-mark-white.svg"),
			dark: getAssetPath("/assets/ecosystem/foldkit-mark.svg"),
		},
		glow: "255, 255, 255",
		highlights: ["Routing", "Server rendering", "UI components", "DevTools"],
		links: [
			{ label: "Get started", href: "https://foldkit.dev/get-started" },
			{ label: "Source", href: "https://github.com/foldkit/foldkit" },
		],
	},
];

const FACTS = [
	{ label: "License", value: "MIT" },
	{ label: "Current release", value: "v4 stable" },
	{ label: "Enterprise support", value: "NDA and SLAs" },
	{ label: "Private channels", value: "Slack or Discord" },
];

type ReleaseRow = {
	line: string;
	status: { label: string; tone: "active" | "maintenance" };
	stable: ReactNode;
	upgrade: { label: string; href: string };
};

const RELEASES: ReleaseRow[] = [
	{
		line: "4.x",
		status: { label: "Current, LTS", tone: "active" },
		stable: "Oct 2026",
		upgrade: {
			label: "Migrating from 3.x",
			href: "https://effect.website/blog/releases/effect/40-rc/",
		},
	},
	{
		line: "3.x",
		status: { label: "Maintenance", tone: "maintenance" },
		stable: "Apr 2024",
		upgrade: {
			label: "Changelog",
			href: "https://github.com/Effect-TS/effect/releases",
		},
	},
];

const RELEASE_COLUMNS = [
	"Release",
	"Status",
	"Stable since",
	"Upgrade guide",
] as const;

function StatusPill({ status }: { status: ReleaseRow["status"] }) {
	return (
		<span className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-zinc-900 dark:text-white">
			<span
				aria-hidden="true"
				className={`h-2 w-2 rounded-full ${
					status.tone === "active"
						? "bg-[#22c55e]"
						: "border border-zinc-500 bg-transparent"
				}`}
			/>
			{status.label}
		</span>
	);
}

const SUPPORT_OPTIONS: {
	icon: Parameters<typeof Icon>[0]["name"];
	title: string;
	body: string[];
}[] = [
	{
		icon: "file-search",
		title: "Talk through adoption",
		body: ["Bring us your technical questions and plans for using Effect."],
	},
	{
		icon: "life-buoy",
		title: "Establish a support relationship",
		body: [
			"A support agreement with a mutual NDA, service levels, and escalation. Private channels are arranged separately.",
		],
	},
	{
		icon: "graduation-cap",
		title: "Get hands-on help",
		body: [
			"Implementation, consulting, or training through an adoption partner like Ziverge.",
		],
	},
];

const SECURITY_LINKS: {
	icon: Parameters<typeof Icon>[0]["name"];
	title: string;
	body: string;
	/** Omitted until the destination is confirmed. */
	href?: string;
}[] = [
	{
		icon: "folder-git",
		title: "Source and license",
		body: "Developed in public, MIT licensed.",
		href: "https://github.com/Effect-TS/effect",
	},
	{
		icon: "shield-check",
		title: "Security reporting and advisories",
		body: "Private reports, public advisories.",
		href: "https://github.com/Effect-TS/effect/security",
	},
	{
		icon: "heart-handshake",
		title: "Meet the team",
		body: "The Effect team at Effectful Technologies.",
	},
];

const PROPOSAL_TEMPLATE = `# Proposal to adopt Effect

## Problem we want to solve
Describe the current problem and why it matters.

## Proposed use of Effect
Where Effect is introduced and its integration boundaries.

## Pilot and success criteria
A bounded trial, how it is evaluated, and the decision after.

## Team preparation
Learning, training, review, and ownership needs.

## Maintenance plan
Release line, support window, upgrade expectations.

## Security and licensing
License, advisory process, internal review.

## Support and staffing
Internal owners, Effect support, partner help.

## Tradeoffs and exit plan
Adoption costs, open questions, how we'd change course.

## Recommendation
Next step, owner, and review date.`;

const FAQS = [
	{
		question: "Can we try Effect in part of an existing application?",
		answer: (
			<p>
				Yes. Start with a bounded use case and assess how it fits your existing
				code, team, and delivery process.
			</p>
		),
	},
	{
		question: "What support can our company arrange?",
		answer: (
			<p>
				Contact us to discuss your needs. We can talk through company support,
				private communication, and introductions to adoption partners. Any
				service levels and coverage are defined in an agreement.
			</p>
		),
	},
	{
		question: "Where can individual developers ask questions?",
		answer: (
			<p>
				Join our <Link href={DISCORD_URL}>public Discord</Link>. It is open to
				everyone, including engineers using Effect at work.
			</p>
		),
	},
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function EnterprisePage() {
	const [templateCopied, setTemplateCopied] = useState(false);

	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			{/* Dithered background overlay — same texture as every page (dark mode only) */}
			<div
				className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.03] dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>

			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/enterprise" />

			{/* Vertical border lines */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800"
						style={{
							width: "1px",
							maskImage:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							WebkitMaskImage:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative w-full pt-16">
				{/* Hero */}
				<section className="relative overflow-hidden">
					<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `
									linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
									linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
								`,
								backgroundSize: "196.6px 194px",
								backgroundPosition: "calc(50% + 97px) -36px",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to bottom, var(--page-fade) 0%, transparent 20%, transparent 60%, var(--page-fade) 100%)",
							}}
						/>
						<div
							className="absolute inset-x-0 top-0 h-[400px]"
							style={{
								background:
									"radial-gradient(ellipse 50% 80% at 50% -20%, var(--hero-glow-a) 0%, transparent 50%)",
							}}
						/>
					</div>

					<div className="relative z-10 mx-auto grid w-full max-w-[73.75rem] grid-cols-1 items-center gap-12 px-4 pt-16 pb-20 md:pt-24 md:pb-24 lg:grid-cols-12">
						<div className="lg:col-span-7">
							<p className={text.eyebrow}>// Enterprise</p>
							<h1 className={text.pageTitle}>Effect for enterprise</h1>
							<p className={`${text.subtitle} max-w-xl`}>
								Evaluate Effect with your team. Plan for production.{" "}
								<br className="hidden lg:inline" />
								Get help from the people building it.
							</p>

							<div className="mt-8 flex flex-wrap items-center gap-3">
								<Button
									href={`mailto:${CONTACT_EMAIL}`}
									variant="primary"
									size="lg"
								>
									Talk to the Effect team
								</Button>
								{/* TODO: point at the release policy URL once published */}
								<Button href="#releases" variant="secondary" size="lg">
									Review releases and support
								</Button>
							</div>
						</div>

						{/* What this page answers — doubles as an index a reviewer can skim */}
						<nav
							aria-label="On this page"
							className="lg:col-span-4 lg:col-start-9 lg:self-end"
						>
							<p className={text.micro}>This page answers</p>
							<ol className="mt-4 border-t border-zinc-200 dark:border-zinc-800">
								{PAGE_QUESTIONS.map((q, i) => (
									<li
										key={q.href}
										className="border-b border-zinc-200 dark:border-zinc-800"
									>
										<a
											href={q.href}
											className="group flex items-baseline gap-4 py-3 text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
										>
											<span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
												{String(i + 1).padStart(2, "0")}
											</span>
											<span className="flex-1">{q.label}</span>
											<Icon
												name="arrow-down"
												className="shrink-0 text-sm text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
											/>
										</a>
									</li>
								))}
							</ol>
						</nav>
					</div>
				</section>

				{/* At a glance */}
				<section className="border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<dl className="grid grid-cols-2 gap-px bg-zinc-200 lg:grid-cols-4 dark:bg-zinc-800">
							{FACTS.map((fact) => (
								<div
									key={fact.label}
									className="flex flex-col gap-1 bg-zinc-50 px-6 py-6 dark:bg-zinc-950"
								>
									<dt className={text.micro}>{fact.label}</dt>
									<dd className="text-lg font-semibold text-zinc-900 dark:text-white">
										{fact.value}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				{/* 1. Releases */}
				<Section
					id="releases"
					eyebrow="Releases & support"
					title="Plan your adoption and upgrades"
				>
					{/* Desktop table */}
					<div className="hidden overflow-x-auto border border-zinc-200 md:block dark:border-zinc-800">
						<table className="w-full text-left text-sm">
							<thead className="bg-zinc-100 dark:bg-zinc-900">
								<tr>
									{RELEASE_COLUMNS.map((col) => (
										<th
											key={col}
											scope="col"
											className="px-4 py-3 align-bottom font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
										>
											{col}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
								{RELEASES.map((row) => (
									<tr key={row.line} className="align-middle">
										<th
											scope="row"
											className="px-4 py-4 font-mono text-base font-semibold text-zinc-900 dark:text-white"
										>
											{row.line}
										</th>
										<td className="px-4 py-4">
											<StatusPill status={row.status} />
										</td>
										<td className="px-4 py-4 text-zinc-900 dark:text-zinc-200">
											{row.stable}
										</td>
										<td className="px-4 py-4">
											<Link
												href={row.upgrade.href}
												variant="subtle"
												className={`${subtleLink} whitespace-nowrap`}
											>
												{row.upgrade.label}
												<Icon name="arrow-up-right" className="text-xs" />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile: one card per release line */}
					<div className="space-y-4 md:hidden">
						{RELEASES.map((row) => (
							<dl
								key={row.line}
								className="divide-y divide-zinc-200 border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
							>
								<div className="flex items-center justify-between px-4 py-3">
									<dt className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
										{row.line}
									</dt>
									<dd>
										<StatusPill status={row.status} />
									</dd>
								</div>
								{([["Stable since", row.stable]] as const).map(
									([label, value]) => (
										<div
											key={label}
											className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
										>
											<dt className={text.micro}>{label}</dt>
											<dd className="text-right text-zinc-900 dark:text-zinc-200">
												{value}
											</dd>
										</div>
									),
								)}
								<div className="px-4 py-3">
									<Link
										href={row.upgrade.href}
										variant="subtle"
										className={subtleLink}
									>
										{row.upgrade.label}
										<Icon name="arrow-up-right" className="text-xs" />
									</Link>
								</div>
							</dl>
						))}
					</div>

					<div className="mt-3 flex flex-col-reverse gap-3 md:flex-row md:items-baseline md:justify-between">
						<p className="text-sm leading-normal text-zinc-600 dark:text-zinc-400">
							Stable modules only introduce breaking changes in a new major
							version.{" "}
							<code className="font-mono text-zinc-900 dark:text-zinc-200">
								effect/unstable/*
							</code>{" "}
							modules can change in minor releases.
						</p>
						<p className={`${text.micro} shrink-0 md:text-right`}>
							Last updated · {POLICY_UPDATED}
						</p>
					</div>
				</Section>

				{/* Real world: a customer-story bento, then ecosystem projects */}
				<Section
					id="production"
					eyebrow="Adoption"
					title="Effect in the real world"
					subtitle="See where teams use Effect and the problems they are solving."
				>
					<div className="flex items-baseline justify-between gap-4">
						<h3 className={text.cardTitle}>In production</h3>
						<Link
							href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE"
							variant="subtle"
							className={subtleLink}
						>
							More stories
							<Icon name="arrow-up-right" className="text-xs" />
						</Link>
					</div>
					<ul className="mt-6 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
						{PRODUCTION.map((story) => (
							<li key={story.company}>
								<StoryCard story={story} />
							</li>
						))}
					</ul>

					<h3 id="ecosystem" className={`${text.cardTitle} mt-20 scroll-mt-24`}>
						Ecosystem projects
					</h3>
					<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
						{ECOSYSTEM.map((project) => (
							<ProjectCard key={project.name} project={project} />
						))}
					</div>
				</Section>

				{/* 2. Support */}
				<Section
					id="support"
					eyebrow="Support"
					title="Support for your company"
					action={
						<Button
							href={`mailto:${CONTACT_EMAIL}?subject=Effect%20for%20enterprise`}
							variant="secondary"
						>
							Talk to the Effect team
						</Button>
					}
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
						{SUPPORT_OPTIONS.map((o) => (
							<li
								key={o.title}
								className="flex flex-col bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950"
							>
								<Icon
									name={o.icon}
									className="text-2xl text-zinc-500 dark:text-zinc-400"
								/>
								<h3 className={`${text.cardTitle} mt-6`}>{o.title}</h3>
								{o.body.map((para) => (
									<p key={para} className={`${text.cardBody} mt-3`}>
										{para}
									</p>
								))}
							</li>
						))}
					</ul>

					<h3 className={`${text.cardTitle} mt-16`}>Who does what</h3>
					<div className="mt-6">
						<SupportFlow />
					</div>
				</Section>

				{/* 3. Security */}
				<Section
					id="security"
					eyebrow="Security"
					title="Security and stewardship"
					subtitle="Effect is open source and maintained by the Effect team at Effectful Technologies. Find what your security and architecture reviewers need: source, license, advisories, and private vulnerability reporting."
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
						{SECURITY_LINKS.map((l) => {
							const content = (
								<>
									<Icon
										name={l.icon}
										className="mt-0.5 shrink-0 text-xl text-zinc-500 dark:text-zinc-400"
									/>
									<span className="flex min-w-0 flex-1 flex-col">
										<span className={text.smallHeading}>{l.title}</span>
										<span className={`${text.cardBody} text-pretty`}>
											{l.body}
										</span>
									</span>
									{l.href ? (
										<Icon
											name="arrow-up-right"
											className="mt-0.5 shrink-0 text-lg text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
										/>
									) : (
										<Tbd>URL</Tbd>
									)}
								</>
							);
							const tile = "flex h-full items-start gap-3 px-6 py-5 md:px-8";
							return (
								<li key={l.title} className="bg-zinc-50 dark:bg-zinc-950">
									{l.href ? (
										<a
											href={l.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`group ${tile} transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900/80`}
										>
											{content}
										</a>
									) : (
										<div className={tile}>{content}</div>
									)}
								</li>
							);
						})}
					</ul>
				</Section>

				{/* 4. Adoption guide — one band until the full guide has its own page */}
				<Section
					id="adoption-guide"
					eyebrow="Adoption guide"
					title="Bring Effect to your team"
					subtitle="Preparing an internal proposal? Assess technical fit, plan a small pilot, and share Effect's release, security, and support information with your colleagues."
				>
					<div className="flex flex-col gap-6 border border-zinc-200 bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8 dark:border-zinc-800 dark:bg-zinc-950">
						<div className="flex items-start gap-4">
							<Icon
								name="file-text"
								className="mt-0.5 shrink-0 text-2xl text-zinc-500 dark:text-zinc-400"
							/>
							<div>
								<h3 className={text.cardTitle}>Proposal template</h3>
								<p className={`${text.cardBody} max-w-xl`}>
									Problem, pilot, maintenance plan, security, and tradeoffs.
									Ready to adapt for your architecture review.
								</p>
							</div>
						</div>
						{/* TODO: add "Read the adoption guide" once the guide page exists */}
						<Button
							variant="primary"
							className="shrink-0 self-start md:self-auto"
							onClick={async () => {
								try {
									await navigator.clipboard.writeText(PROPOSAL_TEMPLATE);
									setTemplateCopied(true);
									setTimeout(() => setTemplateCopied(false), 1500);
								} catch {
									// noop
								}
							}}
						>
							<Icon
								name={templateCopied ? "circle-check" : "clipboard-list"}
								className="text-base"
							/>
							{templateCopied ? "Copied" : "Copy proposal template"}
						</Button>
					</div>
				</Section>

				{/* 5. FAQ — the homepage FAQ section with enterprise questions */}
				<FAQSection
					id="faq"
					className="scroll-mt-16 border-t border-zinc-200 dark:border-zinc-800"
					title="Adopting Effect"
					subtitle="Something we haven't covered? Ask us directly."
					cta={
						<Button
							href="#contact"
							variant="secondary"
							size="md"
							className="mt-6"
						>
							Talk to the Effect team
						</Button>
					}
					items={FAQS}
				/>

				{/* 6. Contact — three routes, one anatomy: label, title, line, actions */}
				<Section
					id="contact"
					eyebrow="Get in touch"
					title="Start a conversation"
					subtitle="Evaluating Effect for your company or already running it in production? We'll help you find the right next step."
				>
					<div className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
						{/* Companies — the primary route */}
						<div className="flex flex-col bg-white p-6 md:p-8 lg:col-span-2 dark:bg-zinc-900/60">
							<h3 className={text.cardTitle}>Talk to the Effect team</h3>
							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
								<div className="min-w-0 flex-1">
									<EmailPanel />
								</div>
								<Button
									href={`mailto:${CONTACT_EMAIL}?subject=Effect%20for%20enterprise`}
									variant="primary"
									className="shrink-0 sm:h-13"
								>
									Email the Effect team
								</Button>
							</div>
						</div>

						{/* Community */}
						<div className="flex flex-col bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950">
							<h3 className={text.cardTitle}>Join the community</h3>
							<p className={`${text.cardBody} text-pretty`}>
								Learning Effect or looking for help? Everyone is welcome.
							</p>
							<div className="mt-6 flex flex-col items-start gap-3">
								<Link
									href={DISCORD_URL}
									variant="subtle"
									className={subtleLink}
								>
									Public Discord
									<Icon name="arrow-up-right" className="text-xs" />
								</Link>
								<Link
									href={COMMUNITY_HUB}
									variant="subtle"
									className={subtleLink}
								>
									Community Hub
									<Icon name="arrow-right" className="text-xs" />
								</Link>
							</div>
						</div>

						{/* Hiring and sponsorship */}
						<div className="flex flex-col bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950">
							<h3 className={text.cardTitle}>Work with Effect</h3>
							<div className="mt-6 flex flex-col items-start gap-3">
								<Link
									href={getAssetPath("/effect-jobs")}
									variant="subtle"
									className={subtleLink}
								>
									Find engineers
									<Icon name="arrow-right" className="text-xs" />
								</Link>
								<Link
									href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship`}
									variant="subtle"
									className={subtleLink}
								>
									Sponsorship
									<Icon name="arrow-right" className="text-xs" />
								</Link>
							</div>
						</div>
					</div>
				</Section>
			</main>

			<Footer />
			<GridOverlay />
		</div>
	);
}
