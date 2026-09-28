import { type ReactNode, useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { FAQList } from "./FAQList";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
const POLICY_UPDATED = "Sep 25, 2026";

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

/**
 * Illustrative private channel — a fictional customer, so the offer reads
 * at a glance instead of as a paragraph.
 */
function ChannelMockup() {
	const messages = [
		{
			who: "Sam",
			org: "Acme",
			avatar: <span className="text-sm font-semibold">S</span>,
			body: "We're moving our billing service to v4 next sprint. Anything we should watch for?",
		},
		{
			who: "Effect team",
			org: "Effectful",
			avatar: (
				<ThemedLogo
					light={LOGO.effectMark}
					dark={LOGO.effectMarkDark}
					alt=""
					className="h-4 w-4"
				/>
			),
			body: "Good timing. The migration guide covers what changed, and we're happy to review the PR with you.",
		},
		{
			who: "Sam",
			org: "Acme",
			avatar: <span className="text-sm font-semibold">S</span>,
			body: "Perfect, sending it over now.",
		},
	];

	return (
		<figure
			aria-label="Illustration of a private company channel"
			className="border border-zinc-300 bg-white shadow-2xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40"
		>
			<div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
				<p className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
					# acme-effect
				</p>
				<p className={text.micro}>Shared · Acme ⇄ Effectful</p>
			</div>
			<ul className="space-y-5 px-5 py-6">
				{messages.map((m) => (
					<li key={m.body} className="flex gap-3">
						<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
							{m.avatar}
						</span>
						<div className="min-w-0">
							<p className="text-sm">
								<span className="font-semibold text-zinc-900 dark:text-white">
									{m.who}
								</span>{" "}
								<span className="text-zinc-500">{m.org}</span>
							</p>
							<p className="mt-0.5 text-sm leading-normal text-zinc-700 dark:text-zinc-300">
								{m.body}
							</p>
						</div>
					</li>
				))}
			</ul>
			<div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
				<div className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
					Message #acme-effect
				</div>
			</div>
		</figure>
	);
}

/**
 * A version number with the digits that may break highlighted — the
 * versioning rule as a picture.
 */
function VersionGraphic({ breaksAt }: { breaksAt: "major" | "minor" }) {
	const parts = [
		{ digit: "4", label: "major" },
		{ digit: "2", label: "minor" },
		{ digit: "1", label: "patch" },
	];
	const breaks = (label: string) =>
		label === "major" || (breaksAt === "minor" && label === "minor");
	return (
		<div className="flex items-end gap-1 font-mono">
			{parts.map((p, i) => (
				<div key={p.label} className="flex items-end gap-1">
					{i > 0 && (
						<span className="pb-7 text-4xl text-zinc-300 dark:text-zinc-700">
							.
						</span>
					)}
					<div className="flex flex-col items-center gap-2">
						<span
							className={`flex h-16 w-14 items-center justify-center border text-4xl font-semibold ${
								breaks(p.label)
									? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
									: "border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
							}`}
						>
							{p.digit}
						</span>
						<span
							className={`text-xs tracking-wider uppercase ${
								breaks(p.label)
									? "text-zinc-900 dark:text-white"
									: "text-zinc-400 dark:text-zinc-600"
							}`}
						>
							{p.label}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

type NodeProps = {
	logo?: ReactNode;
	title: string;
	items: string[];
	highlight?: boolean;
};

function FlowNode({ logo, title, items, highlight }: NodeProps) {
	return (
		<div
			className={`flex flex-col justify-center border p-5 ${
				highlight
					? "border-zinc-900 bg-white dark:border-zinc-400 dark:bg-zinc-900/60"
					: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
			}`}
		>
			<div className="flex h-6 items-center">
				{logo ?? <span className={text.smallHeading}>{title}</span>}
			</div>
			{logo && <p className="sr-only">{title}</p>}
			<ul className="mt-4 space-y-2">
				{items.map((item) => (
					<li
						key={item}
						className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
					>
						<Icon
							name="circle-check"
							className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500"
						/>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

/** Horizontal arrow between two nodes (desktop) / vertical (mobile). */
function Arrow() {
	return (
		<div
			className="flex items-center justify-center py-2 lg:py-0"
			aria-hidden="true"
		>
			<span className="hidden flex-1 items-center lg:flex">
				<span className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
				<Icon
					name="chevron-right"
					className="-ml-1.5 text-base text-zinc-400 dark:text-zinc-500"
				/>
			</span>
			<span className="lg:hidden">
				<Icon name="arrow-down" className="text-base text-zinc-400" />
			</span>
		</div>
	);
}

/** One line splitting into two, aimed at the centres of two stacked nodes. */
function Fork() {
	const line = "absolute bg-zinc-300 dark:bg-zinc-700";
	const toTop = "calc((100% - 1.5rem) / 4)";
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

function SupportFlow() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_56px_minmax(0,1.1fr)_56px_minmax(0,1fr)]">
			<div className="lg:self-center">
				<FlowNode title="Your team" items={["Email", "Discord", "X"]} />
			</div>
			<Arrow />
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
			<div className="grid grid-rows-2 gap-6">
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
					items={["Implementation", "Training"]}
				/>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

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
	active: ReactNode;
	security: ReactNode;
	upgrade: { label: string; href: string };
};

const RELEASES: ReleaseRow[] = [
	{
		line: "4.x",
		status: { label: "Current, LTS", tone: "active" },
		stable: <Tbd>Date</Tbd>,
		active: <Tbd />,
		security: <Tbd />,
		upgrade: {
			label: "Migrating from 3.x",
			href: "https://effect.website/blog/releases/effect/40-rc/",
		},
	},
	{
		line: "3.x",
		status: { label: "Maintenance", tone: "maintenance" },
		stable: "Apr 2024",
		active: <Tbd />,
		security: <Tbd />,
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
	"Active maintenance",
	"Security fixes",
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

const AGREEMENT_TERMS = [
	"Coverage",
	"Support hours",
	"Severity levels",
	"Response times",
	"Escalation",
	"Mutual NDA",
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
	{
		question: "Can we speak with someone before adopting Effect?",
		answer: (
			<p>
				Yes. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
				your questions. You don't need to know which service you want first.
			</p>
		),
	},
	{
		question: "Can our company have a private Slack or Discord channel?",
		answer: (
			<p>
				Yes. We offer private Slack Connect or Discord channels for companies
				using Effect. Contact the Effect team to discuss your company's needs.
				Everyone is also welcome in our public Discord for learning, questions,
				and community conversation.
			</p>
		),
	},
	{
		question: "Do you offer mutual NDAs and SLAs?",
		answer: (
			<p>
				Enterprise support agreements can include a mutual NDA and SLAs, with
				terms agreed for each engagement. A private channel on its own doesn't
				establish an SLA.
			</p>
		),
	},
	{
		question: "Who can help us implement Effect or train our team?",
		answer: (
			<p>
				Start with us. We'll introduce an adoption partner suited to the work.
				Our first partner is{" "}
				<Link href={getAssetPath("/adoption-partners/ziverge")}>Ziverge</Link>.
			</p>
		),
	},
	{
		question: "Where should individual developers ask for help?",
		answer: (
			<p>
				In the <Link href={DISCORD_URL}>public Discord</Link>. Everyone is
				welcome, whether or not their company has a support agreement. The{" "}
				<Link href={COMMUNITY_HUB}>Community Hub</Link> has events and resources
				too.
			</p>
		),
	},
	{
		question: "How can we hire engineers or support Effect's development?",
		answer: (
			<p>
				Post a role on the{" "}
				<Link href={getAssetPath("/effect-jobs")}>Effect job board</Link>, or
				email us about hiring or sponsorship.
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
						<div className="lg:col-span-6">
							<p className={text.eyebrow}>// Enterprise</p>
							<h1 className={text.pageTitle}>Effect for enterprise</h1>
							<p className={`${text.subtitle} max-w-xl`}>
								Evaluate Effect with your team, plan your adoption, and get help
								from the people building it.
							</p>

							<div className="mt-8 flex flex-wrap items-center gap-3">
								<Button href="#contact" variant="primary" size="lg">
									Talk to the Effect team
									<Icon name="arrow-down" className="text-lg" />
								</Button>
								<Button href="#releases" variant="secondary" size="lg">
									Review releases and support
								</Button>
							</div>
						</div>

						<div className="lg:col-span-5 lg:col-start-8">
							<ChannelMockup />
						</div>
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
					subtitle="Versioning rules and support windows your team can plan around."
				>
					{/* Versioning rule, drawn */}
					<div className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
						<div className="bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950">
							<VersionGraphic breaksAt="major" />
							<h3 className={`${text.smallHeading} mt-8`}>Stable modules</h3>
							<p className={text.cardBody}>
								Breaking changes only in a new major version.
							</p>
						</div>
						<div className="bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950">
							<VersionGraphic breaksAt="minor" />
							<h3 className={`${text.smallHeading} mt-8 font-mono`}>
								effect/unstable/*
							</h3>
							<p className={text.cardBody}>
								Can change in a minor release until it becomes stable.
							</p>
						</div>
					</div>

					{/* Desktop table */}
					<div className="mt-12 hidden overflow-x-auto border border-zinc-200 md:block dark:border-zinc-800">
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
										<td className="px-4 py-4">{row.active}</td>
										<td className="px-4 py-4">{row.security}</td>
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
					<div className="mt-12 space-y-4 md:hidden">
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
								{(
									[
										["Stable since", row.stable],
										["Active maintenance", row.active],
										["Security fixes", row.security],
									] as const
								).map(([label, value]) => (
									<div
										key={label}
										className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
									>
										<dt className={text.micro}>{label}</dt>
										<dd className="text-right text-zinc-900 dark:text-zinc-200">
											{value}
										</dd>
									</div>
								))}
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

					<div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
							<Link href="#releases" variant="subtle" className={subtleLink}>
								Full release policy
								<Icon name="arrow-right" className="text-xs" />
							</Link>
							<Link
								href="https://github.com/Effect-TS/effect/releases"
								variant="subtle"
								className={subtleLink}
							>
								Changelogs
								<Icon name="arrow-up-right" className="text-xs" />
							</Link>
						</div>
						<p className={text.micro}>Last updated · {POLICY_UPDATED}</p>
					</div>
				</Section>

				{/* 2. Support */}
				<Section
					id="support"
					eyebrow="Support"
					title="One conversation, the whole ecosystem"
					subtitle="Start with Effectful. We handle support ourselves and bring in the right people for the rest."
				>
					<SupportFlow />

					<div className="mt-12 flex flex-col gap-4 border-t border-zinc-200 pt-6 md:flex-row md:items-center md:justify-between dark:border-zinc-800">
						<div className="flex flex-wrap items-center gap-3">
							<span className="text-sm font-medium text-zinc-900 dark:text-white">
								Every support agreement sets
							</span>
							<ul className="flex flex-wrap gap-2">
								{AGREEMENT_TERMS.map((t) => (
									<li key={t} className={badge}>
										{t}
									</li>
								))}
							</ul>
						</div>
						<p className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">
							A private channel alone isn't an SLA.
						</p>
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
