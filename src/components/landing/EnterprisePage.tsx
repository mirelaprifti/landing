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
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
	micro:
		"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
};

const subtleLink = "inline-flex items-center gap-1.5 font-medium";

const CONTACT_EMAIL = "contact@effectful.co";
const DISCORD_URL = "https://discord.gg/effect-ts";
const X_URL = "https://x.com/EffectTS_";
const COMMUNITY_HUB = getAssetPath("/community-hub");
const POLICY_UPDATED = "Sep 25, 2026";

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

/** A release target — dashed underline plus a "target" tag, never styled like a commitment. */
function Target({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex flex-wrap items-center gap-2">
			<span className="underline decoration-zinc-400 decoration-dashed underline-offset-4 dark:decoration-zinc-500">
				{children}
			</span>
			<span className={text.micro}>target</span>
		</span>
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
/* Content                                                             */
/* ------------------------------------------------------------------ */

const PAGE_QUESTIONS = [
	{ href: "#releases", label: "Can we plan around Effect's releases?" },
	{ href: "#support", label: "Who can help us adopt and operate it?" },
	{ href: "#security", label: "What happens with a security issue?" },
	{
		href: "#adoption-guide",
		label: "What do we send to our architecture review?",
	},
];

const FACTS: { label: string; value: ReactNode }[] = [
	{ label: "License", value: "MIT" },
	{ label: "Current releases", value: "3.x stable · 4.0 RC" },
	{ label: "Long-term support", value: <>Planned for 4.x</> },
	{ label: "Security reports", value: "Private, via GitHub" },
];

type ReleaseRow = {
	line: string;
	status: { label: string; tone: "active" | "prerelease" };
	stable: ReactNode;
	active: ReactNode;
	security: ReactNode;
	coverage: ReactNode;
	upgrade: { label: string; href: string };
};

const RELEASES: ReleaseRow[] = [
	{
		line: "4.x",
		status: { label: "Release candidate", tone: "prerelease" },
		stable: <Target>Q3–Q4 2026</Target>,
		active: <Tbd>LTS dates</Tbd>,
		security: <Tbd>LTS dates</Tbd>,
		coverage: <Tbd />,
		upgrade: {
			label: "Migrating from 3.x",
			href: "https://effect.website/blog/releases/effect/40-rc/",
		},
	},
	{
		line: "3.x",
		status: { label: "Actively maintained", tone: "active" },
		stable: "Apr 2024",
		active: <Tbd />,
		security: <Tbd />,
		coverage: <Tbd />,
		upgrade: {
			label: "Changelog",
			href: "https://github.com/Effect-TS/effect/releases",
		},
	},
];

const RELEASE_COLUMNS = [
	"Release line",
	"Status",
	"Stable release",
	"Active maintenance through",
	"Security maintenance through",
	"Coverage",
	"Upgrade guidance",
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

const VERSIONING = [
	{
		title: "Stable modules",
		body: "Follow semantic versioning. Breaking changes land only in a new major version, with a migration guide.",
	},
	{
		title: "effect/unstable/*",
		body: "Can change in minor releases while the design settles. Modules move to stable once their API is final.",
	},
	{
		title: "TypeScript and runtimes",
		body: (
			<>
				Supported TypeScript versions and runtimes, and whether you must run the
				latest patch to receive support. <Tbd />
			</>
		),
	},
];

const SERVICES: {
	icon: Parameters<typeof Icon>[0]["name"];
	title: string;
	body: string;
	provider: ReactNode;
}[] = [
	{
		icon: "file-search",
		title: "Evaluate and adopt Effect",
		body: "Talk through your team's requirements, technical questions, and adoption plan with us. We can help you identify a starting point and the support your team needs.",
		provider: "Effectful",
	},
	{
		icon: "life-buoy",
		title: "Enterprise support",
		body: "Establish a support relationship for your company's use of Effect. Agreements can include a mutual NDA, SLAs, and an escalation process, with scope and terms agreed for your team.",
		provider: "Effectful",
	},
	{
		icon: "heart-handshake",
		title: "Private company channel",
		body: "Companies using Effect can arrange a private Slack Connect or Discord channel with our team for ongoing communication about their use of Effect.",
		provider: "Effectful",
	},
	{
		icon: "graduation-cap",
		title: "Adoption partners",
		body: "Need help with implementation, consulting, or training? Start with the Effect team. We'll connect your company with an adoption partner suited to the work.",
		provider: "Introduced by Effectful · delivered by Ziverge",
	},
];

const AGREEMENT_TERMS: { topic: string; detail: ReactNode }[] = [
	{ topic: "Provider", detail: "Who provides support and signs the agreement" },
	{
		topic: "Coverage",
		detail: "Included packages, versions, environments, and types of issue",
	},
	{
		topic: "Availability",
		detail: "Support hours, time zones, and additional coverage options",
	},
	{
		topic: "Service levels",
		detail:
			"Severity definitions, first-response commitments, and escalation. Response times, not resolution times.",
	},
	{
		topic: "Maintenance work",
		detail: "Whether fixes, backports, or migration work are included",
	},
	{
		topic: "Confidentiality",
		detail: "Mutual NDA and how access to company information is handled",
	},
	{
		topic: "Communication",
		detail: "How your team reaches ours, including any private channel",
	},
];

const SECURITY_LINKS = [
	{
		title: "Report a vulnerability",
		body: "Private reporting through GitHub, straight to the maintainers.",
		href: "https://github.com/Effect-TS/effect/security/advisories/new",
	},
	{
		title: "Read security advisories",
		body: "Every published advisory, with affected and fixed versions.",
		href: "https://github.com/Effect-TS/effect/security",
	},
	{
		title: "View the source and license",
		body: "The full source on GitHub, released under the MIT license.",
		href: "https://github.com/Effect-TS/effect/blob/main/LICENSE",
	},
	{
		title: "Meet the team",
		body: "The maintainers and the Effectful team behind the project.",
		href: "https://github.com/Effect-TS/effect/graphs/contributors",
	},
];

const STEWARDSHIP = [
	{
		name: "Effect",
		role: "Open-source project",
		body: "MIT-licensed and developed in public on GitHub by its maintainers. Free to use, with or without a commercial relationship.",
	},
	{
		name: "Effectful",
		role: "The company behind Effect",
		body: "Receives every enterprise inquiry, provides enterprise support, and introduces adoption partners.",
	},
	{
		name: "Adoption partners",
		role: "Implementation and training",
		body: "Independent companies that deliver hands-on work. Ziverge is the first partner in the network.",
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

const CONTACT_STEPS = [
	"You email us, or reach out on Discord or X.",
	"We ask enough about your use of Effect to find a useful next step.",
	"We answer directly, discuss support, or introduce an adoption partner.",
	"Companies using Effect can set up a private Slack Connect or Discord channel.",
	"Where contractual support is needed, we agree on scope, confidentiality, and service levels.",
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
				Effect 4.x will have a long-term support window once it reaches stable.
				The exact dates will be published in the release policy. <Tbd />
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

					<div className="relative z-10 mx-auto grid w-full max-w-[73.75rem] grid-cols-1 gap-12 px-4 pt-16 pb-20 md:pt-24 md:pb-24 lg:grid-cols-12">
						<div className="lg:col-span-7">
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

							<div className="mt-8">
								<p className={text.micro}>Or email us directly</p>
								<div className="mt-2">
									<CopyEmail />
								</div>
							</div>

							<p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
								Learning Effect or looking for community help?{" "}
								<Link href={DISCORD_URL}>
									Everyone is welcome in our Discord
								</Link>
								.
							</p>
						</div>

						{/* What this page answers — doubles as an index a reviewer can skim */}
						<nav
							aria-label="On this page"
							className="self-end lg:col-span-4 lg:col-start-9"
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
												className="text-xs text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
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
					subtitle="Review Effect's versioning rules, supported releases, and maintenance schedule so your team can plan adoption and upgrades."
				>
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
							<span className="text-zinc-900 dark:text-white">
								Plain text = commitment
							</span>
							<span className="underline decoration-zinc-400 decoration-dashed underline-offset-4 dark:decoration-zinc-500">
								Dashed = target
							</span>
							<span className="inline-flex items-center gap-2">
								<Tbd /> = not yet defined
							</span>
						</div>
						<p className={text.micro}>Last updated · {POLICY_UPDATED}</p>
					</div>

					{/* Desktop table */}
					<div className="mt-6 hidden overflow-x-auto border border-zinc-200 md:block dark:border-zinc-800">
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
									<tr key={row.line} className="align-top">
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
										<td className="px-4 py-4">{row.coverage}</td>
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
					<div className="mt-6 space-y-4 md:hidden">
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
										["Stable release", row.stable],
										["Active maintenance", row.active],
										["Security maintenance", row.security],
										["Coverage", row.coverage],
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

					<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
						<Link href="#releases" variant="subtle" className={subtleLink}>
							Full release and support policy
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
						<Link
							href="https://effect.website/blog/releases/effect/40-beta/"
							variant="subtle"
							className={subtleLink}
						>
							Effect 4 beta announcement
							<Icon name="arrow-up-right" className="text-xs" />
						</Link>
					</div>

					<h3 className={`${text.cardTitle} mt-20`}>How versioning works</h3>
					<ul className="mt-6 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
						{VERSIONING.map((v) => (
							<li key={v.title} className="bg-zinc-50 p-6 dark:bg-zinc-950">
								<h4
									className={`${text.smallHeading} ${v.title.startsWith("effect/") ? "font-mono" : ""}`}
								>
									{v.title}
								</h4>
								<p className={text.cardBody}>{v.body}</p>
							</li>
						))}
					</ul>
				</Section>

				{/* 2. Support */}
				<Section
					id="support"
					eyebrow="Support"
					title="Support and adoption help"
					subtitle="Every company inquiry starts with the Effect team, so you don't have to pick a service or provider before asking a question."
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
						{SERVICES.map((s) => (
							<li
								key={s.title}
								className="flex flex-col bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950"
							>
								<Icon
									name={s.icon}
									className="text-xl text-zinc-500 dark:text-zinc-400"
								/>
								<h3 className={`${text.cardTitle} mt-4`}>{s.title}</h3>
								<p className={`${text.cardBody} max-w-md`}>{s.body}</p>
								<p className={`${text.micro} mt-auto pt-6`}>{s.provider}</p>
							</li>
						))}
					</ul>

					<div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
						<div className="lg:col-span-4">
							<h3 className={text.cardTitle}>
								What a support agreement defines
							</h3>
							<p className={`${text.cardBody} mt-4`}>
								This page summarizes the offer. Your agreement carries the
								commitments.
							</p>
							<div className="mt-6 border border-zinc-200 bg-zinc-100 p-4 text-sm leading-normal text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
								A private channel is a way to talk to us. Service levels come
								from a support agreement, not from the channel.
							</div>
						</div>
						<dl className="border-t border-zinc-200 lg:col-span-8 dark:border-zinc-800">
							{AGREEMENT_TERMS.map((t) => (
								<div
									key={t.topic}
									className="grid grid-cols-1 gap-1 border-b border-zinc-200 py-4 sm:grid-cols-[180px_1fr] sm:gap-6 dark:border-zinc-800"
								>
									<dt className={text.smallHeading}>{t.topic}</dt>
									<dd className="text-sm leading-normal text-zinc-600 dark:text-zinc-400">
										{t.detail}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</Section>

				{/* 4. Security & stewardship */}
				<Section
					id="security"
					eyebrow="Security"
					title="Security and project stewardship"
					subtitle="Review Effect's security advisories, report a vulnerability privately, and find the source code and license."
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
						{SECURITY_LINKS.map((l) => (
							<li key={l.title} className="bg-zinc-50 dark:bg-zinc-950">
								<a
									href={l.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex h-full flex-col p-6 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900/80"
								>
									<span className="flex items-start justify-between gap-4">
										<span className={text.smallHeading}>{l.title}</span>
										<Icon
											name="arrow-up-right"
											className="mt-1 text-xs text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
										/>
									</span>
									<span className={text.cardBody}>{l.body}</span>
								</a>
							</li>
						))}
					</ul>

					<h3 className={`${text.cardTitle} mt-20`}>Who you're working with</h3>
					<ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
						{STEWARDSHIP.map((s, i) => (
							<li key={s.name} className="relative">
								<div className="flex items-center gap-3">
									<span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
								</div>
								<p className={`${text.micro} mt-4`}>{s.role}</p>
								<h4 className={`${text.cardTitle} mt-1`}>{s.name}</h4>
								<p className={text.cardBody}>{s.body}</p>
							</li>
						))}
					</ol>
				</Section>

				{/* 5. Adoption guide */}
				<Section
					id="adoption-guide"
					eyebrow="Adoption guide"
					title="Bring Effect to your team"
					subtitle="Preparing an internal proposal? Use our adoption guide to review technical fit, plan a pilot, and share the release, security, and support information your team needs."
				>
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						<div className="lg:col-span-5">
							<div className="flex flex-wrap items-center gap-3">
								<Button href="#adoption-guide" variant="primary">
									Read the adoption guide
								</Button>
								<Button href="#contact" variant="secondary">
									Discuss your team's adoption
								</Button>
							</div>

							<h3 className={`${text.smallHeading} mt-12`}>
								Questions the guide answers
							</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{GUIDE_TOPICS.map((t) => (
									<li
										key={t}
										className="rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400"
									>
										{t}
									</li>
								))}
							</ul>
							<p className={`${text.cardBody} mt-6 max-w-sm`}>
								No sign-up. The guide and template are free to read, copy, and
								adapt to your own proposal format.
							</p>
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
								<pre className="max-h-[420px] overflow-auto px-5 py-4 font-mono text-sm leading-[1.9] text-zinc-200">
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

				{/* 6. FAQ */}
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

				{/* 7. Contact */}
				<Section
					id="contact"
					eyebrow="Get in touch"
					title="Start a conversation"
					subtitle="Evaluating Effect for your company or already using it in production? Send us your questions or tell us what your team is building."
				>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
						{/* Company contact */}
						<div className="border border-zinc-300 bg-white p-6 md:p-8 lg:col-span-7 dark:border-zinc-700 dark:bg-zinc-900/50">
							<p className={text.micro}>For companies</p>
							<h3 className={`${text.cardTitle} mt-2`}>
								Email the Effect team
							</h3>
							<p className={`${text.cardBody} max-w-md`}>
								Adoption questions, enterprise support, private channels, or an
								introduction to an adoption partner. One address for all of it.
							</p>
							<div className="mt-6">
								<CopyEmail />
							</div>

							<dl className="mt-8 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
								<div className="flex flex-wrap items-center justify-between gap-3 py-4">
									<dt className={text.smallHeading}>On Discord</dt>
									<dd className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
										Contact us about your company <Tbd>Named contact</Tbd>
									</dd>
								</div>
								<div className="flex flex-wrap items-center justify-between gap-3 py-4">
									<dt className={text.smallHeading}>On X</dt>
									<dd>
										<Link href={X_URL} variant="subtle" className={subtleLink}>
											Reach us on X
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
								Learning Effect, looking for help, or meeting other developers?
								Everyone is welcome in our public Discord, including teams using
								Effect at work.
							</p>
							<div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
								<Button href={DISCORD_URL} variant="secondary">
									<i className="ri-discord-fill text-base" />
									Join the Discord community
								</Button>
								<Link
									href={COMMUNITY_HUB}
									variant="subtle"
									className={subtleLink}
								>
									Explore the Community Hub
									<Icon name="arrow-right" className="text-xs" />
								</Link>
							</div>
						</div>
					</div>

					<h3 className={`${text.cardTitle} mt-20`}>What happens next</h3>
					<ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
						{CONTACT_STEPS.map((step, i) => (
							<li key={step}>
								<div className="flex items-center gap-3">
									<span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
								</div>
								<p className="mt-4 text-sm leading-normal text-zinc-700 dark:text-zinc-300">
									{step}
								</p>
							</li>
						))}
					</ol>
				</Section>

				{/* 8. Hiring & sponsorship */}
				<section className="border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto grid w-full max-w-[73.75rem] grid-cols-1 gap-px px-4 py-24 md:grid-cols-2">
						{[
							{
								title: "Build your team",
								body: "Find engineers through the Effect job board, or talk with us about your company's hiring needs.",
								link: {
									label: "Browse the job board",
									href: getAssetPath("/effect-jobs"),
								},
							},
							{
								title: "Support Effect's development",
								body: "Talk with us about sponsorship and how your company can support ongoing development and maintenance.",
								link: {
									label: "Ask about sponsorship",
									href: `mailto:${CONTACT_EMAIL}`,
								},
							},
						].map((c) => (
							<div key={c.title} className="py-6 md:pr-12">
								<h3 className={text.cardTitle}>{c.title}</h3>
								<p className={`${text.cardBody} max-w-md`}>{c.body}</p>
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
