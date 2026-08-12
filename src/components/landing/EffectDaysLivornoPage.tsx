import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { EffectDaysNavigation } from "./EffectDaysNavigation";
import { EnjoyEffectDaysCTA } from "./EnjoyEffectDaysCTA";
import { Footer } from "./Footer";
import { SaveToCalendar } from "./SaveToCalendar";

/* Canonical text styles copied verbatim from TypographyStyleguidePage (/styleguide). */
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

/* Styleguide chrome strings — copy verbatim. */
const container = "mx-auto w-full max-w-[73.75rem] px-4";
/* Mobile rhythm is tighter than the styleguide's py-24: 64 top and bottom, so
   consecutive sections sit 128px apart instead of 192px. Desktop is unchanged. */
const sectionRhythm = "pt-16 pb-16 md:pt-40 md:pb-24";
const card =
	"border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950";

const PROGRAM = [
	{
		step: "01",
		day: "Wed",
		date: "Dec 9",
		title: "Effect Workshop",
		description: "Full-day sessions led by Effect experts.",
	},
	{
		step: "02",
		day: "Thu",
		date: "Dec 10",
		title: "Effect Conference",
		description: "Engaging talks, afterparty & swags!",
	},
	{
		step: "03",
		day: "Fri",
		date: "Dec 11",
		title: "Community Day",
		description: "More learning, networking, and fun!",
	},
];

/* Early bird runs first. Set to false once regular pricing starts, which also
   restores the group-discount note under the passes. */
const EARLY_BIRD_ON_SALE = true;

/* Early bird sells first; the regular price is shown struck through beside it. */
const PASSES = [
	{
		name: "Workshop, Conference & Community Pass",
		days: [
			{ date: "Dec 9", name: "Workshop Day", included: true },
			{ date: "Dec 10", name: "Conference Day", included: true },
			{ date: "Dec 11", name: "Community Day", included: true },
		],
		featured: true,
		pricing: {
			self: {
				earlyBird: "€349",
				regular: "€449",
				url: "https://book.stripe.com/dRm6oH1Ncf6z9eJgF39oc0P",
			},
			business: {
				earlyBird: "€549",
				regular: "€649",
				url: "https://book.stripe.com/9B68wPgI6bUnbmRagF9oc0N",
			},
		},
	},
	{
		name: "Conference & Community Pass",
		days: [
			{ date: "Dec 9", name: "Workshop Day", included: false },
			{ date: "Dec 10", name: "Conference Day", included: true },
			{ date: "Dec 11", name: "Community Day", included: true },
		],
		featured: false,
		pricing: {
			self: {
				earlyBird: "€249",
				regular: "€299",
				url: "https://book.stripe.com/7sY00j77wbUnfD760p9oc0K",
			},
			business: {
				earlyBird: "€399",
				regular: "€449",
				url: "https://book.stripe.com/bJedR94ZobUnduZ3Sh9oc0O",
			},
		},
	},
];

/* Both sponsors are main sponsors, so the cards carry no tier label — add one
   back here and in the card once a second tier exists. `logoDark` is only set
   where the mark needs a second file to stay legible on the dark page;
   single-colour marks reuse `logo` for both. */
const SPONSORS = [
	{
		name: "Effectful",
		logo: "/assets/effect-days/Effectful-black.svg",
		logoDark: "/assets/effect-days/Effectful-white.svg",
		/* Effectful's wordmark is short and heavy, so it runs taller than Ziverge's
		   wider lockup for the two to read at the same size. */
		logoHeight: "h-16",
		websiteUrl: "https://effectful.co/",
	},
	{
		name: "Ziverge",
		logo: "/assets/effect-days/ziverge.svg",
		logoHeight: "h-10",
		websiteUrl: "https://www.ziverge.com/",
	},
];

const EDITIONS = [
	{
		year: "2024",
		location: "Vienna, Austria",
		dates: "Feb 22-24",
		status: "past",
		note: "Where the Effect community gathered for the first time: 15 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
		image: "/assets/effect-days/ed-24-2.png",
		/* Greyscale strips the tint baked into this file, so the CSS duotone below
		   is the single source of the effect on every edition photo. */
		tint: true,
	},
	{
		year: "2025",
		location: "Livorno, Italy",
		dates: "Mar 19-21",
		status: "past",
		note: "Advanced use cases and real production stories: 19 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
		image: "/assets/effect-days/ed-25-3.png",
		tint: true,
	},
	{
		year: "2026",
		location: "Livorno, Italy",
		dates: "Dec 9-11",
		status: "next",
		note: "The 3rd edition. Back to the Tuscan coast, and you're invited.",
		playlistUrl: null,
		image: null,
		tint: false,
	},
];

const FAQS: Array<{ question: string; answer: React.ReactNode }> = [
	{
		question: "1. What is Effect Days?",
		answer: (
			<>
				Effect Days is a non-profit event dedicated to{" "}
				<Link href="https://effect.website" variant="inline">
					Effect
				</Link>
				, an open-source software library that offers an ecosystem of tools for
				building production-grade applications in TypeScript.
			</>
		),
	},
	{
		question: "2. When and where is Effect Days taking place?",
		answer: (
			<>
				Effect Days will take place on December 9-11, 2026 at{" "}
				<Link
					href="https://www.google.com/maps/search/?api=1&query=Palazzo+Pancaldi+Livorno"
					variant="inline"
				>
					Palazzo Pancaldi
				</Link>
				, Viale Italia, 56, 57127 Livorno LI, Italy.
			</>
		),
	},
	{
		question: "3. What is the schedule of the conference?",
		answer:
			"The conference schedule will be shared as we get closer to the event.",
	},
	{
		question: "4. Will the Effect Days conference be recorded?",
		answer: (
			<>
				The conference talks will be recorded and published on the{" "}
				<Link href="https://www.youtube.com/@effect-ts" variant="inline">
					Effect YouTube channel
				</Link>{" "}
				a few weeks later. In the meantime you can subscribe to our YouTube,
				follow{" "}
				<Link href="https://x.com/EffectTS_" variant="inline">
					Effect on X (Twitter)
				</Link>
				, or{" "}
				<Link href="https://discord.gg/effect-ts" variant="inline">
					join the community
				</Link>{" "}
				to stay updated.
			</>
		),
	},
	{
		question: "5. What is the Community Day?",
		answer:
			"Effect Days isn't just about talks, it's about real connections. The Community Day on December 11th is a full day dedicated to deeper discussions, networking, and community activities.",
	},
	{
		question: "6. Can I get a refund for my ticket?",
		answer: (
			<>
				Please refer to our{" "}
				<Link
					href={getAssetPath("/effect-days/refund-policy")}
					variant="inline"
				>
					Refund Policy
				</Link>{" "}
				for more details.
			</>
		),
	},
	{
		question: "7. How do I get to Livorno?",
		answer: (
			<>
				The closest airport is Pisa (PSA), about 30 minutes away by train or
				car. Florence (FLR) is roughly 90 minutes away. Livorno Centrale station
				has direct rail connections to both. See{" "}
				<Link
					href={getAssetPath("/effect-days/about-livorno#airports")}
					variant="inline"
				>
					the nearest airports
				</Link>{" "}
				for details.
			</>
		),
	},
	{
		question: "8. Is there a Code of Conduct?",
		answer: (
			<>
				Yes. Effect Days is dedicated to providing a harassment-free experience
				for everyone. Please read our{" "}
				<Link
					href={getAssetPath("/effect-days/code-of-conduct")}
					variant="inline"
				>
					Code of Conduct
				</Link>
				.
			</>
		),
	},
];

/* FAQs are split down the middle so each column opens independently. */
const FAQ_SPLIT = Math.ceil(FAQS.length / 2);

/* Purchase row — a full-width Button; renders as an anchor once the Stripe
   checkout URL is filled in on the pass, and as a <button> until then. */
function PurchaseRow({
	label,
	price,
}: {
	label: string;
	price: { earlyBird: string; regular: string; url: string | null };
}) {
	const content = (
		<>
			<span className="flex items-baseline gap-2">
				{label}
				<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
					·
				</span>
				<span className="text-sm text-zinc-500 line-through dark:text-zinc-400">
					{price.regular}
				</span>
				<span className="text-base font-semibold">{price.earlyBird}</span>
			</span>
			{/* Trailing arrow marks the row as something that goes somewhere —
			    the affordance a touch device can't get from hover. */}
			<Icon
				name="arrow-up-right"
				className="shrink-0 text-zinc-500 dark:text-zinc-400"
				aria-hidden="true"
			/>
		</>
	);

	/* Tighter horizontal padding below md: at 390px the longest label
	   ("Business-pay*") plus both prices needs the room, or it wraps to two
	   lines and the row grows. */
	const shared = {
		variant: "secondary" as const,
		size: "lg" as const,
		className: "w-full justify-between px-4 md:px-6",
	};

	return price.url ? (
		<Button
			href={price.url}
			target="_blank"
			rel="noopener noreferrer"
			{...shared}
		>
			{content}
		</Button>
	) : (
		<Button {...shared}>{content}</Button>
	);
}

/* Full-width divider between sections. */
function SectionDivider() {
	return <div className="border-t border-zinc-200 dark:border-zinc-800" />;
}

export function EffectDaysLivornoPage() {
	const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

	const toggleFaq = (index: number) => {
		setOpenFaqs((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	};

	const renderFaq = (faq: (typeof FAQS)[number], index: number) => {
		const isOpen = openFaqs.has(index);
		return (
			<div
				key={faq.question}
				className="border-b border-zinc-200 dark:border-zinc-800"
			>
				<h3>
					<button
						type="button"
						onClick={() => toggleFaq(index)}
						aria-expanded={isOpen}
						className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
					>
						<span className={text.smallHeading}>{faq.question}</span>
						<Icon
							name="chevron-down"
							className={`shrink-0 text-base text-zinc-500 transition-transform duration-200 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white ${
								isOpen ? "rotate-180" : ""
							}`}
						/>
					</button>
				</h3>

				<div
					className={`grid transition-all duration-300 ease-out ${
						isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
					}`}
				>
					<div className="overflow-hidden">
						<p className={`${text.body} pb-6`}>{faq.answer}</p>
					</div>
				</div>
			</div>
		);
	};

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
				className="absolute -left-[9999px] z-999 rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<EffectDaysNavigation activePath="/effect-days" />
			<GridOverlay />

			{/* Vertical border lines container — behind content, so full-bleed images cover them */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 text-zinc-200 dark:text-zinc-800"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative z-10 w-full pt-16">
				{/* Hero Section — copy left, photo bleeding off the right edge (lg+) */}
				<section className="relative w-full pt-16 pb-14 md:pt-24 md:pb-24 lg:pt-40 lg:pb-40">
					{/* Right half — photo from the Livorno edition (lg+), full-bleed */}
					<div className="absolute inset-y-0 right-0 z-10 hidden w-1/2 overflow-hidden lg:block">
						<img
							src={getAssetPath("/assets/effect-days/ed-25-2.png")}
							alt="The Effect community at Effect Days 2025 in Livorno"
							className="h-full w-full object-cover"
						/>
						{/* Blend into the dark page */}
						<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
						<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
							{"// "}Effect Days 2025 · Livorno
						</p>
					</div>

					<div className={`relative ${container}`}>
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className={text.eyebrow}>
									{"// "}Livorno, Italy · Dec 9–11, 2026
								</p>
								<h1 className={text.pageTitle}>Effect Days</h1>
								<p className={`${text.subtitle} max-w-md`}>
									For Effect and TypeScript engineers: three days of workshops,
									talks, and community.
								</p>

								<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
									<Button
										href="#tickets"
										variant="primary"
										size="lg"
										className="w-full sm:w-auto"
									>
										<Icon name="ticket" className="text-lg" />
										Get tickets
									</Button>
									<SaveToCalendar />
								</div>
							</div>

							{/* Below lg the absolute panel can't apply, so the same image runs
							    in flow here instead of vanishing */}
							<div className="relative overflow-hidden lg:hidden">
								<img
									src={getAssetPath("/assets/effect-days/ed-25-2.png")}
									alt="The Effect community at Effect Days 2025 in Livorno"
									className="aspect-16/9 w-full object-cover"
								/>
								<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
								<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
									{"// "}Effect Days 2025 · Livorno
								</p>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* The Program - pipeline */}
				<section id="program" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}The Program</p>
						<h2 className={text.sectionTitle}>The Effect Days experience</h2>
						<p className={text.subtitle}>
							A community-driven, non-profit event celebrating{" "}
							<br className="hidden md:inline" />
							the Effect ecosystem.
						</p>

						<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
							{PROGRAM.map((step) => (
								<div
									key={step.step}
									className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
								>
									{/* Header row — number chip and day/date share one line */}
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center border border-zinc-300 font-mono text-sm font-medium text-zinc-900 dark:border-zinc-600 dark:text-white">
											{step.step}
										</div>
										<span className={text.micro}>
											{step.day} · {step.date}
										</span>
									</div>
									<h3 className={`${text.cardTitle} mt-6`}>{step.title}</h3>
									<p className={text.cardBody}>{step.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* The Venue */}
				<section id="venue" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						{/* Header — copy in the left half, links in the right half */}
						<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 lg:items-baseline-last">
							<div>
								<p className={text.eyebrow}>{"// "}The Venue</p>
								<h2 className={text.sectionTitle}>Palazzo Pancaldi, Livorno</h2>
								<p className={text.subtitle}>
									A beautiful seaside location in the Tuscan riviera, where you
									can enjoy good food and the coastal views.
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
								<Link
									href={getAssetPath("/effect-days/about-livorno")}
									variant="subtle"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									About Livorno
									<Icon name="arrow-right" className="text-xs" />
								</Link>
								<Link
									href="https://www.google.com/maps/search/?api=1&query=Palazzo+Pancaldi+Livorno"
									variant="subtle"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									View on map
									<Icon name="arrow-up-right" className="text-xs" />
								</Link>
							</div>
						</div>

						<div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
							{/* Featured photo, full column height */}
							<div className="overflow-hidden">
								<img
									src={getAssetPath(
										"/assets/effect-days/pancaldi-exterior.avif",
									)}
									alt="Palazzo Pancaldi on the Livorno seafront"
									className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-full"
								/>
							</div>

							{/* Venue and city tiles */}
							<div className="grid grid-cols-2 gap-4">
								<img
									src={getAssetPath("/assets/effect-days/pancaldi-hall.avif")}
									alt="The conference hall at Palazzo Pancaldi"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-7.avif")}
									alt="Livorno's harborfront seen from the water"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-1.avif")}
									alt="Boats on a canal in Livorno's Venezia Nuova district"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-6.avif")}
									alt="Canal-side buildings and boats in Livorno"
									className="aspect-4/3 w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Tickets Section */}
				<section id="tickets" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}Only 100 tickets</p>
						<div className="flex flex-wrap items-center gap-3">
							<h2 className={text.sectionTitle}>Choose your pass</h2>
							{/* Same chip as the timeline's "Next stop" — the prices below are the
							    early bird tier, not the regular one */}
							<span
								className={`${text.micro} border border-zinc-400 bg-white px-2 py-0.5 dark:border-zinc-600 dark:bg-zinc-950`}
							>
								Early bird
							</span>
						</div>

						<div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
							{PASSES.map((pass) => (
								<div
									key={pass.name}
									className={
										pass.featured
											? "flex flex-col border border-zinc-400 bg-white p-6 dark:border-zinc-600 dark:bg-zinc-950"
											: `flex flex-col ${card}`
									}
								>
									<h3 className={text.cardTitle}>{pass.name}</h3>

									{/* Day checklist, mono style. The marker is the same ticked box
									    the editions timeline uses, minus the opaque fill that only
									    exists there to mask the connector line. */}
									<div className="mt-6 space-y-3 font-mono text-sm">
										{pass.days.map((day) => (
											<div key={day.date} className="flex items-center gap-3">
												{/* Same muted tone as the · separator, so the checklist chrome sits
										    at one weight and only the marks distinguish the rows */}
												<span className="flex h-4 w-4 shrink-0 items-center justify-center border border-zinc-400 dark:border-zinc-600">
													{day.included && (
														<Icon
															name="check"
															className="text-[0.65rem] text-zinc-900 dark:text-white"
															aria-hidden="true"
														/>
													)}
												</span>
												<span
													className={
														day.included
															? "text-zinc-700 dark:text-zinc-200"
															: "text-zinc-500 dark:text-zinc-500"
													}
												>
													{day.date}
													<span className="px-1.5 text-zinc-400 dark:text-zinc-600">
														·
													</span>
													{day.name}
												</span>
											</div>
										))}
									</div>

									<div className="mt-6 border-t border-dashed border-zinc-200 dark:border-zinc-700" />

									{/* Purchase rows */}
									<div className="mt-6 space-y-3">
										<PurchaseRow label="Self-pay" price={pass.pricing.self} />
										<PurchaseRow
											label="Business-pay*"
											price={pass.pricing.business}
										/>
									</div>
								</div>
							))}
						</div>

						<div className="mt-4 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-6">
							<div className="space-y-1">
								<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
									*Suitable for invoicing.
								</p>
							</div>
							<div className="space-y-1">
								<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
									Selecting a pass takes you to Stripe to complete your
									purchase.
								</p>
								{/* Group discounts are off the page while early bird is on sale —
								    flip EARLY_BIRD_ON_SALE to bring this back. */}
								{!EARLY_BIRD_ON_SALE && (
									<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
										Group of 4+?{" "}
										<Link
											href="mailto:contact@effectful.co?subject=Effect Days Livorno - Group Tickets"
											variant="inline"
										>
											Ask about business discounts
										</Link>
										.
									</p>
								)}
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Editions timeline */}
				<section id="past-editions" className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}3rd Edition</p>
						<h2 className={text.sectionTitle}>The journey continues</h2>

						<div className="relative mt-12">
							{/* Timeline line (desktop) — fades out past the last node, so the
							    trailing run reads as the journey continuing rather than an
							    unterminated rule */}
							<div
								className="absolute top-3.5 right-0 left-8 hidden text-zinc-300 md:block dark:text-zinc-700"
								style={{
									height: "1px",
									backgroundImage:
										"repeating-linear-gradient(to right, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)",
									/* Full strength through the last node, then fading across the
									   run that follows it — the dashes thin out instead of stopping */
									maskImage:
										"linear-gradient(to right, #000 0%, #000 93%, transparent 100%)",
									WebkitMaskImage:
										"linear-gradient(to right, #000 0%, #000 93%, transparent 100%)",
								}}
							/>
							<div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-4">
								{EDITIONS.map((edition) => (
									<div key={edition.year} className="relative">
										{/* Timeline node — labels carry an opaque background so the
										    dashed line reads as a connector between nodes, not a
										    rule struck through the text */}
										<div className="relative z-10 mb-6 flex items-center">
											<span
												className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
													edition.status === "next"
														? "border-zinc-900 bg-zinc-200 dark:border-zinc-300 dark:bg-zinc-700"
														: "border-zinc-400 bg-white dark:border-zinc-600 dark:bg-zinc-950"
												}`}
											>
												{/* Past editions are ticked off; the next one stays an empty marker */}
												{edition.status === "past" && (
													<Icon
														name="check"
														className="text-[0.65rem] text-zinc-900 dark:text-white"
														aria-hidden="true"
													/>
												)}
											</span>
											<h3
												className={`${text.cardTitle} bg-white px-3 dark:bg-zinc-950`}
											>
												Effect Days {edition.year}
											</h3>
											{edition.status === "next" && (
												<span
													className={`${text.micro} border border-zinc-300 bg-white px-2 py-0.5 dark:border-zinc-600 dark:bg-zinc-950`}
												>
													Next stop
												</span>
											)}
										</div>

										<div
											className={`flex flex-col overflow-hidden border bg-white dark:bg-zinc-950 ${
												edition.status === "next"
													? "border-zinc-400 dark:border-zinc-600"
													: "border-zinc-200 dark:border-zinc-800"
											}`}
										>
											{edition.image ? (
												<div className="relative isolate aspect-21/9 overflow-hidden">
													<img
														src={getAssetPath(edition.image)}
														alt={`Effect Days ${edition.year}`}
														className={`h-full w-full object-cover ${
															edition.tint ? "grayscale" : ""
														}`}
													/>
													{/* Duotone — grayscale underneath, hue and saturation
													    from this layer, matching the pre-tinted photos */}
													{edition.tint && (
														<div className="pointer-events-none absolute inset-0 bg-[#5b5fc7] mix-blend-color" />
													)}
													<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
												</div>
											) : (
												<div className="flex aspect-21/9 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
													<span className="font-mono text-sm text-zinc-700 dark:text-zinc-200">
														Dec 9–11, 2026
														<span className="animate-[terminal-blink_1s_step-end_infinite]">
															{" ▊"}
														</span>
													</span>
												</div>
											)}
											<div className="flex flex-1 flex-col p-6">
												<div className="flex items-baseline justify-between gap-3">
													<span className={text.micro}>{edition.location}</span>
													<span className={text.micro}>{edition.dates}</span>
												</div>
												<p className={`${text.cardBody} mt-4`}>
													{edition.note}
												</p>
												{edition.playlistUrl ? (
													<Link
														href={edition.playlistUrl}
														variant="subtle"
														className="mt-4 inline-flex items-center gap-1.5 font-medium"
													>
														<i className="ri-youtube-fill text-base" />
														Full playlist
														<Icon name="arrow-up-right" className="text-xs" />
													</Link>
												) : (
													<Link
														href="#tickets"
														variant="subtle"
														className="mt-4 inline-flex items-center gap-1.5 font-medium"
													>
														Be part of it
														<Icon name="arrow-up" className="text-xs" />
													</Link>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Sponsors */}
				<section id="sponsors" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						{/* Header — copy in the left half, sponsorship contact in the right */}
						<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 lg:items-baseline-last">
							<div>
								<p className={text.eyebrow}>{"// "}Sponsors</p>
								<h2 className={text.sectionTitle}>Made possible by</h2>
								<p className={text.subtitle}>
									Effect Days is a non-profit event, run with the support of the
									companies backing the ecosystem.
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
								<Button
									href="mailto:contact@effectful.co?subject=Effect Days Livorno - Sponsorship"
									variant="secondary"
									size="md"
								>
									Become a sponsor
									{/* Leaves the page — mailto, so up-right rather than arrow-right */}
									<Icon
										name="arrow-up-right"
										className="text-base"
										aria-hidden="true"
									/>
								</Button>
							</div>
						</div>

						{/* Corner-bracket tiles, the same frame the closing CTA and the
						    merch previews use — the logo is the link, nothing else in it */}
						{/* Side by side from sm up, which keeps the two marks on one row in
						    mobile landscape; only portrait phones stack them. */}
						<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
							{SPONSORS.map((sponsor) => (
								<a
									key={sponsor.name}
									href={sponsor.websiteUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${sponsor.name} — visit website`}
									className="group relative flex items-center justify-center px-6 py-12"
								>
									{/* Corner brackets — brighten together on hover, so the whole
									    tile reads as the hit area */}
									<span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-zinc-300 transition-colors duration-200 group-hover:border-zinc-900 dark:border-zinc-700 dark:group-hover:border-white" />
									<span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-zinc-300 transition-colors duration-200 group-hover:border-zinc-900 dark:border-zinc-700 dark:group-hover:border-white" />
									<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-300 transition-colors duration-200 group-hover:border-zinc-900 dark:border-zinc-700 dark:group-hover:border-white" />
									<span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-zinc-300 transition-colors duration-200 group-hover:border-zinc-900 dark:border-zinc-700 dark:group-hover:border-white" />

									<img
										src={getAssetPath(sponsor.logo)}
										alt={sponsor.name}
										className={`${sponsor.logoHeight} w-auto max-w-full object-contain ${
											sponsor.logoDark ? "dark:hidden" : ""
										}`}
									/>
									{sponsor.logoDark && (
										<img
											src={getAssetPath(sponsor.logoDark)}
											alt=""
											aria-hidden="true"
											className={`hidden ${sponsor.logoHeight} w-auto max-w-full object-contain dark:block`}
										/>
									)}
								</a>
							))}
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* FAQ Section */}
				<section id="faq" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}FAQ</p>
						<h2 className={text.sectionTitle}>Frequently Asked Questions</h2>

						{/* Two independent columns — opening one never reflows the other */}
						<div className="mt-12 grid grid-cols-1 items-start gap-x-4 md:grid-cols-2 md:gap-x-8">
							<div>
								{FAQS.slice(0, FAQ_SPLIT).map((faq, i) => renderFaq(faq, i))}
							</div>
							<div>
								{FAQS.slice(FAQ_SPLIT).map((faq, i) =>
									renderFaq(faq, FAQ_SPLIT + i),
								)}
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				<EnjoyEffectDaysCTA />
			</main>

			<Footer activePath="/events" hideCommunityBorder />
		</div>
	);
}
