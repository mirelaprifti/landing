import { type ReactNode, useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { FAQList } from "./FAQList";
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
const X_URL = "https://x.com/EffectTS_";
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
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	subtitle?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			className="scroll-mt-16 border-t border-zinc-200 dark:border-zinc-800"
		>
			<div className="mx-auto w-full max-w-[73.75rem] px-4 py-24 md:pt-40">
				<p className={text.eyebrow}>// {eyebrow}</p>
				<h2 className={text.sectionTitle}>{title}</h2>
				{subtitle && <p className={`${text.subtitle} max-w-2xl`}>{subtitle}</p>}
				<div className="mt-12">{children}</div>
			</div>
		</section>
	);
}

function CopyEmail() {
	const [copied, setCopied] = useState(false);
	return (
		<div className="flex flex-wrap items-center gap-3">
			<a
				href={`mailto:${CONTACT_EMAIL}`}
				className="font-mono text-base text-zinc-900 underline decoration-zinc-300 underline-offset-4 duration-200 hover:decoration-transparent dark:text-zinc-200 dark:decoration-zinc-400"
			>
				{CONTACT_EMAIL}
			</a>
			<Button
				variant="ghost"
				size="sm"
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
			>
				<Icon
					name={copied ? "circle-check" : "clipboard-list"}
					className="text-sm"
				/>
				{copied ? "Copied" : "Copy"}
			</Button>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

type NodeProps = {
	logo?: ReactNode;
	title: string;
	items: string[];
	highlight?: boolean;
};

function FlowNode({ logo, title, items, highlight }: NodeProps) {
	return (
		<div
			className={`border px-5 py-4 ${
				highlight
					? "border-zinc-900 bg-white dark:border-zinc-400 dark:bg-zinc-900/60"
					: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
			}`}
		>
			<div className="flex h-6 items-center">
				{logo ?? <span className={text.smallHeading}>{title}</span>}
			</div>
			{logo && <p className="sr-only">{title}</p>}
			<p className="mt-2 text-sm leading-normal text-zinc-700 dark:text-zinc-300">
				{items.join(" · ")}
			</p>
		</div>
	);
}

/** One line splitting into two, aimed at the centres of two stacked nodes. */
function Fork() {
	const line = "absolute bg-zinc-300 dark:bg-zinc-700";
	const toTop = "calc((100% - 1rem) / 4)";
	return (
		<>
			<div className="relative hidden lg:block" aria-hidden="true">
				<span className={`${line} top-1/2 left-0 h-px w-1/2`} />
				<span
					className={`${line} left-1/2 w-px`}
					style={{ top: toTop, bottom: toTop }}
				/>
				<span
					className={`${line} left-1/2 h-px w-1/2`}
					style={{ top: toTop }}
				/>
				<span
					className={`${line} left-1/2 h-px w-1/2`}
					style={{ bottom: toTop }}
				/>
			</div>
			<div className="flex justify-center py-2 lg:hidden" aria-hidden="true">
				<Icon name="arrow-down" className="text-base text-zinc-400" />
			</div>
		</>
	);
}

/** Production logo tile — links to the talk; the arrow brightens on hover. */
function StoryCard({ story }: { story: (typeof PRODUCTION)[number] }) {
	return (
		<a
			href={story.talk?.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex h-full flex-col bg-zinc-50 p-6 transition-colors hover:bg-zinc-100 md:p-8 dark:bg-zinc-950 dark:hover:bg-zinc-900/80"
		>
			<span className="flex items-start justify-between gap-4">
				<span className="flex h-8 items-center">
					<img
						src={story.logo}
						alt={story.company}
						className={`${story.logoClass} w-auto invert dark:invert-0`}
					/>
				</span>
				<Icon
					name="arrow-up-right"
					className="shrink-0 text-lg text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
				/>
			</span>
			<span className={`${text.smallHeading} mt-8`}>{story.useCase}</span>
		</a>
	);
}

/** Integration-style project card — app-icon tile with a faint brand glow. */
function ProjectCard({ project }: { project: (typeof ECOSYSTEM)[number] }) {
	return (
		<article className="group relative flex flex-col overflow-hidden border border-zinc-200 bg-white transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
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
			<footer className="relative flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 px-6 py-4 md:px-8 dark:border-zinc-800">
				<span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
					Maintained by <Tbd />
				</span>
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

function SupportFlow() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]">
			<div className="lg:self-center">
				<FlowNode
					highlight
					title="Effectful"
					logo={
						<ThemedLogo
							light={LOGO.effectful}
							dark={LOGO.effectfulDark}
							alt="Effectful"
							className="h-6 w-auto"
						/>
					}
					items={[
						"Evaluation and adoption planning",
						"Enterprise support, NDA and SLAs",
						"Private Slack or Discord channel",
					]}
				/>
			</div>
			<Fork />
			<div className="flex flex-col gap-4 lg:grid lg:grid-rows-2">
				<FlowNode
					title="Effect maintainers"
					logo={
						<span className="flex items-center gap-2">
							<ThemedLogo
								light={LOGO.effectMark}
								dark={LOGO.effectMarkDark}
								alt=""
								className="h-5 w-5"
							/>
							<span className={text.smallHeading}>Maintainers</span>
						</span>
					}
					items={["Releases", "Security fixes"]}
				/>
				<FlowNode
					title="Adoption partners"
					logo={<img src={LOGO.ziverge} alt="Ziverge" className="h-5 w-auto" />}
					items={["Implementation", "Consulting", "Team extension", "Training"]}
				/>
			</div>
		</div>
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
		logoClass: "max-h-7",
		useCase: "Migrating a large TypeScript codebase to Effect",
		talk: talk("opencode"),
	},
	{
		company: "MasterClass",
		logo: getAssetPath("/assets/images/masterclass-noM.svg"),
		logoClass: "max-h-6",
		useCase: "Real-time voice AI orchestration",
		talk: talk("MasterClass"),
	},
	{
		company: "OpenRouter",
		logo: getAssetPath("/assets/images/open-router.svg"),
		logoClass: "max-h-7",
		useCase: "Internal tooling and infrastructure",
		talk: talk("OpenRouter"),
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
	href: string;
}[] = [
	{
		icon: "circle-alert",
		title: "Report a vulnerability",
		body: "Privately, straight to the maintainers.",
		href: "https://github.com/Effect-TS/effect/security/advisories/new",
	},
	{
		icon: "shield-check",
		title: "Security advisories",
		body: "Affected and fixed versions for each issue.",
		href: "https://github.com/Effect-TS/effect/security",
	},
	{
		icon: "folder-git",
		title: "Source and license",
		body: "Developed in public, MIT licensed.",
		href: "https://github.com/Effect-TS/effect/blob/main/LICENSE",
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

const GUIDE_TOPICS = [
	"Learning curve",
	"Incremental adoption",
	"Hiring",
	"Upgrade effort",
	"Support costs",
];

const FAQS = [
	{
		question: "Can we start using Effect in part of an existing application?",
		answer: (
			<p>
				Yes. Most teams start at one boundary, such as a service, a job, or a
				data pipeline, and grow from there. The{" "}
				<Link href={getAssetPath("/docs/why-effect")}>
					incremental adoption guide
				</Link>{" "}
				covers integration boundaries and what your team needs to learn first.
			</p>
		),
	},
	{
		question: "What stability guarantees apply?",
		answer: (
			<p>
				Stable modules follow semantic versioning: breaking changes only arrive
				in a new major version. Modules under <code>effect/unstable/*</code> can
				change in minor releases until they graduate. See the{" "}
				<a href="#releases" className="underline underline-offset-4">
					release policy
				</a>
				.
			</p>
		),
	},
	{
		question: "How long will Effect 4.x receive support?",
		answer: (
			<p>
				Effect 4.x is the long-term support release. The exact maintenance dates
				are published in the release policy. <Tbd />
			</p>
		),
	},
	{
		question: "Which TypeScript versions and runtimes are supported?",
		answer: (
			<p>
				The release policy lists supported TypeScript versions and runtimes, and
				whether you need the latest patch to receive support. <Tbd />
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
					subtitle="From AI products to cloud infrastructure, teams build on Effect."
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
					<ul className="mt-6 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
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
					title="Security and project stewardship"
					subtitle="Report issues privately and audit everything in the open."
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
						{SECURITY_LINKS.map((l) => (
							<li key={l.title} className="bg-zinc-50 dark:bg-zinc-950">
								<a
									href={l.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex h-full flex-col p-6 transition-colors hover:bg-zinc-100 md:p-8 dark:hover:bg-zinc-900/80"
								>
									<span className="flex items-start justify-between gap-4">
										<Icon
											name={l.icon}
											className="text-2xl text-zinc-500 dark:text-zinc-400"
										/>
										<Icon
											name="arrow-up-right"
											className="shrink-0 text-lg text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
										/>
									</span>
									<span className={`${text.smallHeading} mt-6`}>{l.title}</span>
									<span className={text.cardBody}>{l.body}</span>
								</a>
							</li>
						))}
					</ul>
				</Section>

				{/* 4. Adoption guide */}
				<Section
					id="adoption-guide"
					eyebrow="Adoption guide"
					title="Bring Effect to your team"
					subtitle="A proposal template with everything your architecture review will ask for."
				>
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						<div className="lg:col-span-5">
							<div className="flex flex-wrap items-center gap-3">
								<Button href="#adoption-guide" variant="primary">
									Read the adoption guide
								</Button>
								<Button href="#contact" variant="secondary">
									Discuss your adoption
								</Button>
							</div>

							<h3 className={`${text.smallHeading} mt-12`}>The guide covers</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{GUIDE_TOPICS.map((t) => (
									<li key={t} className={badge}>
										{t}
									</li>
								))}
							</ul>
						</div>

						<div className="lg:col-span-7">
							<div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
								<div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
									<span className="font-mono text-xs text-zinc-400">
										adoption-proposal.md
									</span>
									<button
										type="button"
										onClick={async () => {
											try {
												await navigator.clipboard.writeText(PROPOSAL_TEMPLATE);
												setTemplateCopied(true);
												setTimeout(() => setTemplateCopied(false), 1500);
											} catch {
												// noop
											}
										}}
										className="rounded-md border border-zinc-700 px-2 py-0.5 font-mono text-xs text-zinc-400 transition-colors hover:text-white"
									>
										{templateCopied ? "copied" : "copy template"}
									</button>
								</div>
								<pre className="max-h-[360px] overflow-auto px-5 py-4 font-mono text-sm leading-[1.9] text-zinc-200">
									<code>
										{PROPOSAL_TEMPLATE.split("\n").map((line, i) => (
											<span
												// biome-ignore lint/suspicious/noArrayIndexKey: static template lines
												key={i}
												className={
													line.startsWith("#") ? "text-white" : "text-zinc-500"
												}
											>
												{line}
												{"\n"}
											</span>
										))}
									</code>
								</pre>
							</div>
						</div>
					</div>
				</Section>

				{/* 5. FAQ */}
				<section
					id="faq"
					className="scroll-mt-16 border-t border-zinc-200 dark:border-zinc-800"
				>
					<div className="mx-auto grid w-full max-w-[73.75rem] grid-cols-1 gap-12 px-4 py-24 md:pt-40 lg:grid-cols-2">
						<div>
							<p className={text.eyebrow}>// FAQ</p>
							<h2 className={text.sectionTitle}>
								Questions about adopting Effect
							</h2>
							<p className={`${text.subtitle} max-w-md`}>
								Something we haven't covered? Ask us directly.
							</p>
							<Button href="#contact" variant="secondary" className="mt-6">
								Talk to the Effect team
							</Button>
						</div>
						<FAQList items={FAQS} />
					</div>
				</section>

				{/* 6. Contact */}
				<Section
					id="contact"
					eyebrow="Get in touch"
					title="Start a conversation"
					subtitle="Tell us what your team is building. You don't need to know which service you want."
				>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
						{/* Company contact */}
						<div className="border border-zinc-300 bg-white p-6 md:p-8 lg:col-span-7 dark:border-zinc-700 dark:bg-zinc-900/50">
							<p className={text.micro}>For companies</p>
							<h3 className={`${text.cardTitle} mt-2`}>
								Email the Effect team
							</h3>
							<div className="mt-6">
								<CopyEmail />
							</div>

							<dl className="mt-8 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
								<div className="flex flex-wrap items-center justify-between gap-3 py-4">
									<dt className={text.smallHeading}>On Discord</dt>
									<dd>
										<Tbd>Named contact</Tbd>
									</dd>
								</div>
								<div className="flex flex-wrap items-center justify-between gap-3 py-4">
									<dt className={text.smallHeading}>On X</dt>
									<dd>
										<Link href={X_URL} variant="subtle" className={subtleLink}>
											@EffectTS_
											<Icon name="arrow-up-right" className="text-xs" />
										</Link>
									</dd>
								</div>
							</dl>
						</div>

						{/* Community */}
						<div className="flex flex-col border border-zinc-200 p-6 md:p-8 lg:col-span-5 dark:border-zinc-800">
							<p className={text.micro}>For everyone</p>
							<h3 className={`${text.cardTitle} mt-2`}>
								Join the Effect community
							</h3>
							<p className={text.cardBody}>
								Learning Effect or looking for help? Everyone is welcome.
							</p>
							<div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
								<Button href={DISCORD_URL} variant="secondary">
									<i className="ri-discord-fill text-base" />
									Join Discord
								</Button>
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
					</div>
				</Section>

				{/* 7. Hiring & sponsorship */}
				<section className="border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto grid w-full max-w-[73.75rem] grid-cols-1 gap-6 px-4 py-24 md:grid-cols-2">
						{[
							{
								title: "Build your team",
								body: "Find engineers on the Effect job board.",
								link: {
									label: "Browse the job board",
									href: getAssetPath("/effect-jobs"),
								},
							},
							{
								title: "Support Effect's development",
								body: "Sponsor ongoing development and maintenance.",
								link: {
									label: "Ask about sponsorship",
									href: `mailto:${CONTACT_EMAIL}`,
								},
							},
						].map((c) => (
							<div key={c.title}>
								<h3 className={text.cardTitle}>{c.title}</h3>
								<p className={text.cardBody}>{c.body}</p>
								<Link
									href={c.link.href}
									variant="subtle"
									className={`${subtleLink} mt-4`}
								>
									{c.link.label}
									<Icon name="arrow-right" className="text-xs" />
								</Link>
							</div>
						))}
					</div>
				</section>
			</main>

			<Footer />
			<GridOverlay />
		</div>
	);
}
