import type { ReactNode } from "react";
import { Button, Link } from "@/components/ui";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
	PARTNER_LISTINGS,
	PARTNERS,
	type PartnerListing,
	type PartnershipType,
} from "../../data/partners";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
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
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
	micro:
		"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
};

const subtleLink = "inline-flex items-center gap-1.5 font-medium";

const PARTNERS_EMAIL = "contact@effectful.co";
const inquiry = (subject: string) =>
	`mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** One entry per section, in page order. */
const PROGRAMS: {
	id: PartnershipType;
	eyebrow: string;
	title: string;
	subtitle: string;
	/** Shown in the Become a partner grid. */
	pitch: string;
	icon: IconName;
}[] = [
	{
		id: "sponsorship",
		eyebrow: "Sponsorship",
		title: "Sponsorship partners",
		subtitle:
			"Companies that run Effect in production and fund its open-source development.",
		pitch:
			"Fund the open-source work your production systems depend on. Your logo sits on this page and in the release notes.",
		icon: "heart-handshake",
	},
	{
		id: "adoption",
		eyebrow: "Adoption",
		title: "Adoption partners",
		subtitle:
			"Endorsed by Effectful to help teams plan, implement and train for Effect in production.",
		pitch:
			"Help teams adopt Effect through implementation, consulting and training, endorsed by Effectful.",
		icon: "rocket",
	},
	{
		id: "agency",
		eyebrow: "Agency",
		title: "Agency partners",
		subtitle: "Studios and consultancies that build client work with Effect.",
		pitch:
			"Build client work with Effect and get listed for teams looking for an agency.",
		icon: "users",
	},
	{
		id: "infrastructure",
		eyebrow: "Infrastructure",
		title: "Infrastructure partners",
		subtitle:
			"Platforms and services that support Effect's builds, releases and runtime integrations.",
		pitch:
			"Provide the platforms Effect runs on, from CI and hosting to observability and runtimes.",
		icon: "layers",
	},
];

/** Every partner, flattened to what a listing needs. */
const LISTINGS: (PartnerListing & {
	href: string;
	region?: string;
	/** Brand-colored logos read on both themes; white ones go black on light. */
	keepColor?: boolean;
})[] = [
	...PARTNERS.map((p) => ({
		id: p.id,
		name: p.name,
		partnership: p.partnership,
		logoPath: p.logoPath,
		websiteUrl: p.websiteUrl,
		description: p.description,
		region: p.region,
		keepColor: Boolean(p.brandColor),
		// Only the featured partner has a full page on this site
		href: p.featured
			? getAssetPath(`/adoption-partners/${p.id}`)
			: p.websiteUrl,
	})),
	...PARTNER_LISTINGS.map((p) => ({ ...p, href: p.websiteUrl })),
];

const listingsFor = (type: PartnershipType) =>
	LISTINGS.filter((l) => l.partnership === type);

const isExternal = (href: string) => href.startsWith("http");

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
					<div className="lg:w-1/2 lg:pr-4">
						<p className={text.eyebrow}>// {eyebrow}</p>
						<h2 className={text.sectionTitle}>{title}</h2>
						{subtitle && (
							<p className={`${text.subtitle} max-w-2xl text-pretty`}>
								{subtitle}
							</p>
						)}
					</div>
					{action && <div className="shrink-0">{action}</div>}
				</div>
				<div className="mt-12">{children}</div>
			</div>
		</section>
	);
}

/** Partner logos ship white; flatten them to black on the light theme. */
function PartnerLogo({
	listing,
	className,
}: {
	listing: (typeof LISTINGS)[number];
	className: string;
}) {
	return (
		<img
			src={getAssetPath(listing.logoPath)}
			alt={listing.name}
			className={`${className} w-auto object-contain ${
				listing.keepColor ? "" : "brightness-0 dark:brightness-100"
			}`}
		/>
	);
}

/** Empty slot for a program that has no confirmed partners yet. */
function OpenSlot({ label, href }: { label: string; href: string }) {
	return (
		<a
			href={href}
			className="group flex h-full min-h-40 flex-col items-center justify-center gap-2 bg-zinc-50 p-6 text-center transition-colors hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900/80"
		>
			<span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-zinc-300 text-zinc-400 transition-colors group-hover:border-zinc-500 group-hover:text-zinc-900 dark:border-zinc-700 dark:group-hover:border-zinc-500 dark:group-hover:text-white">
				<Icon name="plus" className="text-base" />
			</span>
			<span className={text.micro}>{label}</span>
		</a>
	);
}

/** Sponsors: a pure logo wall — the point is recognition at a glance. */
function LogoWall({ listings }: { listings: typeof LISTINGS }) {
	const slots = Math.max(0, 3 - listings.length);
	return (
		<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
			{listings.map((l) => (
				<li key={l.id}>
					<a
						href={l.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative flex h-40 items-center justify-center bg-zinc-50 p-8 transition-colors hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900/80"
					>
						<PartnerLogo listing={l} className="h-10 max-w-[70%]" />
						<Icon
							name="arrow-up-right"
							className="absolute top-4 right-4 text-lg text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100"
						/>
					</a>
				</li>
			))}
			{Array.from({ length: slots }, (_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
				<li key={i}>
					<OpenSlot
						label="Your logo here"
						href={inquiry("Partnership: Sponsorship")}
					/>
				</li>
			))}
		</ul>
	);
}

/** Service partners: logo plus what they do and where. */
function PartnerCard({ listing }: { listing: (typeof LISTINGS)[number] }) {
	const external = isExternal(listing.href);
	return (
		<a
			href={listing.href}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className="group flex h-full flex-col bg-zinc-50 p-6 transition-colors hover:bg-zinc-100 md:p-8 dark:bg-zinc-950 dark:hover:bg-zinc-900/80"
		>
			<span className="flex items-start justify-between gap-4">
				<span className="flex h-8 items-center">
					<PartnerLogo listing={listing} className="h-7" />
				</span>
				<Icon
					name={external ? "arrow-up-right" : "arrow-right"}
					className="shrink-0 text-lg text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
				/>
			</span>
			<span className={`${text.cardTitle} mt-6`}>{listing.name}</span>
			{listing.description && (
				<span className={`${text.cardBody} text-pretty`}>
					{listing.description}
				</span>
			)}
			{listing.region && (
				<span className={`${text.micro} mt-auto pt-6`}>{listing.region}</span>
			)}
		</a>
	);
}

/**
 * Blank cells that complete the last row, so the gap-px grid never shows
 * its background. Counts differ for the 2-col (md) and 3-col (lg) layouts.
 */
function RowFillers({ count }: { count: number }) {
	const md = (2 - (count % 2)) % 2;
	const lg = (3 - (count % 3)) % 3;
	return Array.from({ length: Math.max(md, lg) }, (_, i) => (
		<li
			// biome-ignore lint/suspicious/noArrayIndexKey: static fillers
			key={i}
			aria-hidden="true"
			className={`hidden bg-zinc-50 dark:bg-zinc-950 ${i < md ? "md:block" : ""} ${
				i < lg ? "lg:block" : "lg:hidden"
			}`}
		/>
	));
}

function PartnerGrid({
	listings,
	program,
}: {
	listings: typeof LISTINGS;
	program: (typeof PROGRAMS)[number];
}) {
	return (
		<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
			{listings.map((l) => (
				<li key={l.id}>
					<PartnerCard listing={l} />
				</li>
			))}
			<li>
				<OpenSlot
					label={`Become an ${program.eyebrow.toLowerCase()} partner`}
					href={inquiry(`Partnership: ${program.eyebrow}`)}
				/>
			</li>
			<RowFillers count={listings.length + 1} />
		</ul>
	);
}

export function PartnersPage() {
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

			<Navigation activePath="/partners" />

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
							<p className={text.eyebrow}>// Partners</p>
							<h1 className={text.pageTitle}>Building Effect together</h1>
							<p className={`${text.subtitle} max-w-xl text-pretty`}>
								The companies that adopt Effect, fund its development and help
								other teams ship it in production.
							</p>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<Button href="#become-a-partner" variant="primary" size="lg">
									Become a partner
								</Button>
								<Button
									href={getAssetPath("/enterprise")}
									variant="secondary"
									size="lg"
								>
									Effect for enterprise
								</Button>
							</div>
						</div>

						{/* Program index — jumps to each section */}
						<nav
							aria-label="Partnership types"
							className="lg:col-span-4 lg:col-start-9 lg:self-end"
						>
							<p className={text.micro}>Partnerships</p>
							<ol className="mt-4 border-t border-zinc-200 dark:border-zinc-800">
								{PROGRAMS.map((p, i) => (
									<li
										key={p.id}
										className="border-b border-zinc-200 dark:border-zinc-800"
									>
										<a
											href={`#${p.id}`}
											className="group flex items-baseline gap-4 py-3 text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
										>
											<span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
												{String(i + 1).padStart(2, "0")}
											</span>
											<span className="flex-1">{p.title}</span>
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

				{PROGRAMS.map((program) => {
					const listings = listingsFor(program.id);
					return (
						<Section
							key={program.id}
							id={program.id}
							eyebrow={program.eyebrow}
							title={program.title}
							subtitle={program.subtitle}
						>
							{program.id === "sponsorship" ? (
								<LogoWall listings={listings} />
							) : (
								<PartnerGrid listings={listings} program={program} />
							)}
						</Section>
					);
				})}

				{/* Become a partner */}
				<Section
					id="become-a-partner"
					eyebrow="Become a partner"
					title="Partner with Effect"
					subtitle="Tell us how you use Effect and how you'd like to work together. We'll get back to you within a few days."
					action={
						<Button
							href={inquiry("Partnership inquiry")}
							variant="primary"
							size="lg"
						>
							Get in touch
						</Button>
					}
				>
					<ul className="grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
						{PROGRAMS.map((p) => (
							<li
								key={p.id}
								className="flex flex-col bg-zinc-50 p-6 md:p-8 dark:bg-zinc-950"
							>
								<Icon
									name={p.icon}
									className="text-xl text-zinc-500 dark:text-zinc-400"
								/>
								<h3 className={`${text.cardTitle} mt-6`}>{p.eyebrow}</h3>
								<p className={`${text.cardBody} flex-1 text-pretty`}>
									{p.pitch}
								</p>
								<Link
									href={inquiry(`Partnership: ${p.eyebrow}`)}
									variant="subtle"
									className={`${subtleLink} mt-6 text-sm`}
								>
									Apply
									<Icon name="arrow-right" className="text-xs" />
								</Link>
							</li>
						))}
					</ul>
				</Section>
			</main>

			<Footer />
			<GridOverlay />
		</div>
	);
}
