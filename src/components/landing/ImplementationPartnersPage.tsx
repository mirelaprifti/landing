import { useState } from "react";
import { Button } from "@/components/ui";
import { PARTNERS, type Partner } from "../../data/partners";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { ContactForm } from "./ContactForm";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

/* Hero — partner identity, tagline, CTAs */
function FeaturedPartnerHero({ partner }: { partner: Partner }) {
	return (
		<section className="relative w-full py-4">
			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
					`,
					backgroundSize: "196.6px 171px",
					backgroundPosition: "calc(50% + 97px) 0",
				}}
			/>
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
				}}
			/>
			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				<div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-center">
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Implementation Partner
						</p>
						<h1 className="leading-tighter text-3xl font-bold text-white md:text-4xl">
							Get help adopting Effect with {partner.name}
						</h1>
						{partner.tagline && (
							<p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
								{partner.tagline}
							</p>
						)}

						{(partner.ctaPrimary || partner.ctaSecondary) && (
							<div className="mt-8 flex flex-wrap items-center gap-3">
								{partner.ctaPrimary && (
									<Button
										href={partner.ctaPrimary.href}
										variant="primary"
										size="md"
										className="group"
									>
										{partner.ctaPrimary.label}
										<i className="ri-arrow-right-line text-base transition-transform group-hover:translate-x-0.5" />
									</Button>
								)}
								{partner.ctaSecondary ? (
									<Button
										href={partner.ctaSecondary.href}
										variant="secondary"
										size="md"
									>
										{partner.ctaSecondary.label}
									</Button>
								) : (
									<Button
										href={partner.websiteUrl}
										variant="secondary"
										size="md"
										className="group"
									>
										Visit {partner.name}
										<i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</Button>
								)}
							</div>
						)}
					</div>

					{/* Partner logo block — square, corner brackets only */}
					<div className="relative flex aspect-square w-full items-center justify-center bg-[#0B0B0D] p-12">
						{/* Corner brackets */}
						<span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-zinc-700/80" />
						<span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-zinc-700/80" />
						<span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-zinc-700/80" />
						<span className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-zinc-700/80" />
						<img
							src={getAssetPath(partner.logoPath)}
							alt={`${partner.name} logo`}
							className="h-auto max-h-24 w-auto max-w-[60%] object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

/* Track-record stats + customer testimonial */
function PartnerStatsSection({ partner }: { partner: Partner }) {
	if (!partner.stats?.length) return null;

	return (
		<section className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
					// Track record
				</p>
				<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
					Production-grade delivery, at scale
				</h2>

				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
					{partner.stats.map((stat) => (
						<div
							key={stat.label}
							className="border-x border-zinc-800 bg-zinc-900/40 p-6"
						>
							<p className="text-4xl font-semibold text-white md:text-5xl">
								{stat.value}
							</p>
							<p
								className="mt-2 font-mono text-sm tracking-wider uppercase"
								style={{ color: partner.brandColor ? "#FFA083" : "#a1a1aa" }}
							>
								{stat.label}
							</p>
						</div>
					))}
				</div>

				{partner.testimonial && (
					<figure className="mt-10 border border-zinc-800 bg-zinc-900/40 p-8 md:p-10">
						<blockquote className="text-lg leading-relaxed text-zinc-200 md:text-xl">
							{`"${partner.testimonial.quote}"`}
						</blockquote>
						<figcaption className="mt-5 font-mono text-xs tracking-wider text-zinc-400 uppercase">
							— {partner.testimonial.author}
						</figcaption>
					</figure>
				)}
			</div>
		</section>
	);
}

/* What we offer — service cards */
function PartnerServicesSection({ partner }: { partner: Partner }) {
	if (!partner.services?.length) return null;

	return (
		<section className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Services
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							What we offer
						</h2>
						<p className="mt-4 max-w-2xl text-base text-zinc-400">
							From first Effect adoption to full certification — everything a team
							needs to succeed with Effect in production.
						</p>
					</div>
					<Button
						href="#contact"
						variant="primary"
						size="md"
						className="group shrink-0"
					>
						Get in touch
						<i className="ri-arrow-right-line text-base transition-transform group-hover:translate-x-0.5" />
					</Button>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
					{partner.services.map((service) => (
						<div
							key={service.title}
							className="flex flex-col border border-zinc-700 bg-zinc-900/40 p-6 md:p-8"
						>
							{service.icon && (
								<i
									className={`${service.icon} mb-4 text-2xl text-zinc-300`}
									aria-hidden="true"
								/>
							)}
							<h3 className="leading-tighter text-lg font-semibold text-white">
								{service.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-zinc-400">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* Training & certification feature block */
function PartnerTrainingSection({ partner }: { partner: Partner }) {
	if (!partner.training) return null;
	const t = partner.training;

	return (
		<section id="training" className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Backed by the Effect team
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							{t.title}
						</h2>
						<p className="mt-4 max-w-2xl text-base text-zinc-400">
							{t.description}
						</p>
					</div>
					<Button
						href={t.cta.href}
						variant="primary"
						size="md"
						className="group shrink-0"
					>
						{t.cta.label}
						<i className="ri-arrow-right-line text-base transition-transform group-hover:translate-x-0.5" />
					</Button>
				</div>

				<div className="mt-12">
					<p className="mb-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
						// What you'll be able to do
					</p>
					<div className="relative">
						<ul className="grid grid-cols-1 sm:grid-cols-2">
							{t.topics.map((outcome, idx) => {
								const isLastOverall = idx === t.topics.length - 1;
								return (
									<li
										key={outcome.title}
										className={`py-6 first:pt-0 sm:p-8 sm:first:pt-8 ${
											!isLastOverall ? "border-b border-zinc-800 sm:border-b-0" : ""
										} ${idx % 2 === 0 ? "sm:pl-0" : "sm:pr-0"} ${
											idx < 2 ? "sm:pt-0" : "sm:pb-0"
										}`}
									>
										{outcome.icon && (
											<i
												className={`${outcome.icon} mb-3 text-2xl text-zinc-300`}
												aria-hidden="true"
											/>
										)}
										<h3 className="text-base font-semibold text-white">
											{outcome.title}
										</h3>
										<p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
											{outcome.detail}
										</p>
									</li>
								);
							})}
						</ul>
						{/* Vertical divider — 1px line with 2px dashes, split top + bottom halves with a gap at center */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute top-0 left-1/2 hidden h-[calc(50%-1.5rem)] w-px -translate-x-1/2 text-zinc-700 sm:block"
							style={{
								backgroundImage:
									"repeating-linear-gradient(to bottom, currentColor 0 3px, transparent 3px 6px)",
							}}
						/>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[calc(50%-1.5rem)] w-px -translate-x-1/2 text-zinc-700 sm:block"
							style={{
								backgroundImage:
									"repeating-linear-gradient(to bottom, currentColor 0 3px, transparent 3px 6px)",
							}}
						/>
						{/* Horizontal divider — 1px line with 2px dashes, split left + right halves with a gap at center */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 left-0 hidden h-px w-[calc(50%-1.5rem)] -translate-y-1/2 text-zinc-700 sm:block"
							style={{
								backgroundImage:
									"repeating-linear-gradient(to right, currentColor 0 3px, transparent 3px 6px)",
							}}
						/>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 right-0 hidden h-px w-[calc(50%-1.5rem)] -translate-y-1/2 text-zinc-700 sm:block"
							style={{
								backgroundImage:
									"repeating-linear-gradient(to right, currentColor 0 3px, transparent 3px 6px)",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

/* What this means for your team — differentiators */
function PartnerDifferentiatorsSection({ partner }: { partner: Partner }) {
	if (!partner.differentiators?.length) return null;

	return (
		<section className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
					// Why {partner.name}
				</p>
				<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
					What this means for your team
				</h2>

				<div className="mt-10 flex flex-col divide-y divide-zinc-800">
					{partner.differentiators.map((d, idx) => (
						<div
							key={d.eyebrow}
							className="grid grid-cols-1 gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-12 md:py-12"
						>
							<div className="flex flex-col gap-3 lg:col-span-5">
								<h3 className="leading-tighter text-lg font-semibold text-white">
									{d.title}
								</h3>
								<p className="font-mono text-base tracking-wider text-zinc-500 lg:mt-auto">
									{String(idx + 1).padStart(2, "0")}
								</p>
							</div>
							<p className="text-base leading-relaxed text-zinc-300 lg:col-span-7 lg:text-lg">
								{d.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* FAQ accordion */
function FaqItem({ q, a }: { q: string; a: string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="border-b border-zinc-800">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-white transition-colors hover:text-zinc-200"
			>
				<span>{q}</span>
				<i
					className={`ri-arrow-down-s-line shrink-0 text-xl text-zinc-400 transition-transform ${
						open ? "rotate-180" : ""
					}`}
					aria-hidden="true"
				/>
			</button>
			{open && (
				<p className="pb-5 text-sm leading-relaxed text-zinc-400">{a}</p>
			)}
		</div>
	);
}

function PartnerFaqSection({ partner }: { partner: Partner }) {
	if (!partner.faqs?.length) return null;

	return (
		<section className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
					// FAQ
				</p>
				<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
					Frequently asked questions
				</h2>

				<div className="mt-8 max-w-3xl">
					{partner.faqs.map((f) => (
						<FaqItem key={f.question} q={f.question} a={f.answer} />
					))}
				</div>
			</div>
		</section>
	);
}

/* Smaller "other partners" cards */
function OtherPartnerCard({ partner }: { partner: Partner }) {
	return (
		<a
			href={getAssetPath(`/partners/${partner.id}`)}
			className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 ease-out hover:border-zinc-700"
		>
			<div className="mb-5 flex items-center">
				<img
					src={getAssetPath(partner.logoPath)}
					alt={`${partner.name} logo`}
					className="h-8 w-auto max-w-[160px]"
				/>
			</div>
			<p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">
				{partner.longDescription}
			</p>
			<div className="mb-5 flex flex-wrap items-center gap-3">
				<div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/40 px-2.5 py-1 text-xs font-medium text-zinc-300">
					<i className="ri-map-pin-2-fill text-xs text-zinc-400" aria-hidden="true" />
					{partner.region}
				</div>
				<div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/40 px-2.5 py-1 text-xs font-medium text-zinc-300">
					<span className="text-xs leading-none">{partner.languageFlag}</span>
					{partner.language}
				</div>
			</div>
			<span className="inline-flex items-center text-sm font-medium text-white">
				View details
				<i
					className="ri-arrow-right-line ml-1 text-sm text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-300"
					aria-hidden="true"
				/>
			</span>
		</a>
	);
}

function OtherPartnersSection({ partners }: { partners: Partner[] }) {
	if (!partners.length) return null;
	return (
		<section className="border-t border-zinc-800 py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
					// Regional partners
				</p>
				<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
					Other implementation partners
				</h2>
				<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
					{partners.map((p) => (
						<OtherPartnerCard key={p.id} partner={p} />
					))}
				</div>
			</div>
		</section>
	);
}

export function ImplementationPartnersPage() {
	const featuredPartner = PARTNERS.find((p) => p.featured);
	const otherPartners = PARTNERS.filter((p) => !p.featured);

	return (
		<div className="relative min-h-screen bg-zinc-950 text-white">
			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="text-whiteno-underline absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/implementation-partners" />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative z-10 pt-16">
				{featuredPartner && (
					<>
						<FeaturedPartnerHero partner={featuredPartner} />
						<PartnerStatsSection partner={featuredPartner} />
						<PartnerServicesSection partner={featuredPartner} />
						<PartnerTrainingSection partner={featuredPartner} />
						<PartnerDifferentiatorsSection partner={featuredPartner} />
					</>
				)}

				{/* <OtherPartnersSection partners={otherPartners} /> hidden for now */}

				{/* Contact Form */}
				<section id="contact" className="border-t border-zinc-800 py-16 md:py-20">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
							<div>
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Get in touch
								</p>
								<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
									Ready to build with Effect?
								</h2>
								<p className="mt-4 max-w-xl text-base text-zinc-400">
									Tell us where you are with Effect and what you're trying to build.
									We'll scope the right engagement — implementation, team extension,
									or support — and get back to you quickly.
								</p>
							</div>
							<div>
								<ContactForm />
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/implementation-partners" />
		</div>
	);
}
