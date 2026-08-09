import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
const sectionRhythm = "py-24 md:pt-40 md:pb-24";
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

const COMMUNITY_STATS = [
	{ value: "15,100+", label: "github stars" },
	{ value: "6,500+", label: "discord members" },
	{ value: "7,400+", label: "youtube subscribers" },
];

const PASSES = [
	{
		name: "Workshop, Conference & Community Pass",
		days: [
			{ label: "Dec 9 · Workshop Day", included: true },
			{ label: "Dec 10 · Conference Day", included: true },
			{ label: "Dec 11 · Community Day", included: true },
		],
		featured: true,
	},
	{
		name: "Conference & Community Pass",
		days: [
			{ label: "Dec 9 · Workshop Day", included: false },
			{ label: "Dec 10 · Conference Day", included: true },
			{ label: "Dec 11 · Community Day", included: true },
		],
		featured: false,
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
		image: "/assets/images/ed-24-2.png",
	},
	{
		year: "2025",
		location: "Livorno, Italy",
		dates: "Mar 19-21",
		status: "past",
		note: "Advanced use cases and real production stories: 19 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
		image: "/assets/images/ed-25-2.png",
	},
	{
		year: "2026",
		location: "Livorno, Italy",
		dates: "Dec 9-11",
		status: "next",
		note: "The 3rd edition. Back to the Tuscan coast, and you're invited.",
		playlistUrl: null,
		image: null,
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
				<Link href="#" variant="inline">
					Refund Policy
				</Link>{" "}
				for more details.
			</>
		),
	},
	{
		question: "7. How do I get to Livorno?",
		answer:
			"The closest airport is Pisa (PSA), about 30 minutes away by train or car. Florence (FLR) is roughly 90 minutes away. Livorno Centrale station has direct rail connections to both.",
	},
	{
		question: "8. Is there a Code of Conduct?",
		answer: (
			<>
				Yes. Effect Days is dedicated to providing a harassment-free experience
				for everyone. Please read our{" "}
				<Link href="/events/code-of-conduct" variant="inline">
					Code of Conduct
				</Link>
				.
			</>
		),
	},
];

/* FAQs are split down the middle so each column opens independently. */
const FAQ_SPLIT = Math.ceil(FAQS.length / 2);

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
				className="border-b border-zinc-200/50 dark:border-zinc-800/50"
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
						<p className={`${text.cardBody} pb-6`}>{faq.answer}</p>
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

			<Navigation activePath="/events" />
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
				{/* Hero Section */}
				<section className="relative w-full pt-16 pb-20 md:pt-40 md:pb-40">
					{/* Right half — photo from the Livorno edition (lg+), full-bleed */}
					<div className="absolute inset-y-0 right-0 z-10 hidden w-1/2 overflow-hidden lg:block">
						<img
							src={getAssetPath("/assets/images/ed-25-2.png")}
							alt="The Effect community at Effect Days 2025 in Livorno"
							className="h-full w-full object-cover"
						/>
						{/* Blend into the dark page */}
						<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
						{/* Photo caption */}
						<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
							{"// "}Effect Days 2025 · Livorno
						</p>
					</div>

					<div className={`relative ${container}`}>
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className={text.eyebrow}>{"// "}3rd edition</p>
								<h1 className={text.pageTitle}>Effect Days</h1>
								<p className="mt-4 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-300">
									<span className="text-zinc-900 dark:text-white">
										Livorno, Italy
									</span>
									{" · "}
									<span>Dec 9–11, 2026</span>
								</p>
								<p className={`${text.subtitle} max-w-md`}>
									For Effect and TypeScript engineers: three days of workshops,
									talks, and community.
								</p>

								{/* CTA Buttons */}
								<div className="mt-12 flex flex-col items-start gap-4 sm:flex-row">
									<Button href="#tickets" variant="primary" size="lg">
										<Icon name="ticket" className="text-lg" />
										Get tickets
									</Button>
									<Button
										href="https://discord.gg/effect-ts"
										variant="secondary"
										size="lg"
									>
										<i className="ri-discord-fill text-lg" />
										Join the community
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* The Program - pipeline */}
				<section className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}The Program</p>
						<h2 className={text.sectionTitle}>Three days of Effect</h2>
						<p className={text.subtitle}>
							A community-driven, non-profit event celebrating{" "}
							<br className="hidden md:inline" />
							the Effect ecosystem.
						</p>

						<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
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
				<section className={sectionRhythm}>
					<div className={container}>
						{/* Header — copy in the left half, links in the right half */}
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-baseline-last">
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
									href="/events/effect-days/about-livorno"
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

						<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
							{/* Featured photo, full column height */}
							<div className="overflow-hidden">
								<img
									src={getAssetPath("/assets/images/pancaldi-exterior.avif")}
									alt="Palazzo Pancaldi on the Livorno seafront"
									className="aspect-4/3 h-full w-full object-cover lg:aspect-auto"
								/>
							</div>

							{/* Venue and city tiles */}
							<div className="grid grid-cols-2 gap-4">
								<img
									src={getAssetPath("/assets/images/pancaldi-hall.avif")}
									alt="The conference hall at Palazzo Pancaldi"
									className="aspect-4/3 h-full w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/images/livorno-7.avif")}
									alt="Livorno's harborfront seen from the water"
									className="aspect-4/3 h-full w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/images/livorno-1.avif")}
									alt="Boats on a canal in Livorno's Venezia Nuova district"
									className="aspect-4/3 h-full w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/images/livorno-6.avif")}
									alt="Canal-side buildings and boats in Livorno"
									className="aspect-4/3 h-full w-full object-cover"
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
						<h2 className={text.sectionTitle}>Choose your pass</h2>

						<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
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

									{/* Day checklist, mono style */}
									<div className="mt-6 space-y-3 font-mono text-sm">
										{pass.days.map((day) => (
											<div key={day.label} className="flex items-center gap-3">
												<span
													className={
														day.included
															? "text-zinc-900 dark:text-white"
															: "text-zinc-400 dark:text-zinc-600"
													}
												>
													{day.included ? "[✓]" : "[ ]"}
												</span>
												<span
													className={
														day.included
															? "text-zinc-700 dark:text-zinc-200"
															: "text-zinc-500 dark:text-zinc-500"
													}
												>
													{day.label}
												</span>
											</div>
										))}
									</div>

									<div className="mt-6 border-t border-dashed border-zinc-200 dark:border-zinc-700" />

									{/* Purchase rows */}
									<div className="mt-6 space-y-3">
										<div className="flex w-full items-center justify-between border border-zinc-200 px-4 py-3 dark:border-zinc-700">
											<span className="flex items-center gap-2 text-base font-medium text-zinc-700 dark:text-zinc-300">
												<Icon
													name="user"
													className="text-zinc-500 dark:text-zinc-400"
												/>
												Self-pay
											</span>
											<span className={text.micro}>Coming soon</span>
										</div>
										<div className="flex w-full items-center justify-between border border-zinc-200 px-4 py-3 dark:border-zinc-700">
											<span className="flex items-center gap-2 text-base font-medium text-zinc-700 dark:text-zinc-300">
												<Icon
													name="building"
													className="text-zinc-500 dark:text-zinc-400"
												/>
												Business-pay*
											</span>
											<span className={text.micro}>Coming soon</span>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="space-y-1">
								<p className={text.body}>*Suitable for invoicing.</p>
								<p className={text.body}>
									Selecting a pass takes you to Stripe to complete your
									purchase.
								</p>
							</div>
							<div className="space-y-1">
								<p className={text.body}>
									Group of 4+?{" "}
									<Link
										href="mailto:contact@effectful.co?subject=Effect Days Livorno - Group Tickets"
										variant="inline"
									>
										Ask about business discounts
									</Link>
									.
								</p>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Sponsoring Section */}
				<section className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}Sponsoring Effect Days</p>
						<h2 className={text.sectionTitle}>Give back to the community</h2>

						<div className="mt-12 grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
							{/* Pitch */}
							<div>
								<p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-200">
									Has Effect played a key role in your project and you'd love to
									give back to the community?{" "}
									<span className="font-medium text-zinc-900 dark:text-white">
										Sponsoring Effect Days is your perfect opportunity!
									</span>
								</p>
								<div className="mt-12">
									<Button
										href="mailto:contact@effectful.co?subject=Effect Days Livorno - Sponsorship Inquiry"
										variant="primary"
										size="lg"
									>
										<Icon name="heart-handshake" className="text-lg" />I want to
										sponsor
									</Button>
								</div>
							</div>

							{/* Community stats as terminal output */}
							<div className="overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
								<div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
									<span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
								</div>
								<div className="p-6 font-mono text-sm leading-loose">
									<p className="text-zinc-600 dark:text-zinc-400">
										<span className="text-zinc-900 dark:text-white">$</span>{" "}
										effect community{" "}
										<span className="text-zinc-400 dark:text-zinc-600">
											--stats
										</span>
									</p>
									{COMMUNITY_STATS.map((stat) => (
										<p key={stat.label}>
											<span className="text-zinc-400 dark:text-zinc-600">
												{"→ "}
											</span>
											<span className="font-medium text-zinc-900 dark:text-white">
												{stat.value}
											</span>
											<span className="text-zinc-500 dark:text-zinc-500">
												{" "}
												{stat.label}
											</span>
										</p>
									))}
									<p className="text-zinc-400 dark:text-zinc-600">
										…and counting<span className="animate-pulse"> ▊</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Editions timeline */}
				<section id="past-editions" className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}The Journey</p>
						<h2 className={text.sectionTitle}>Three editions and counting</h2>

						<div className="relative mt-12">
							{/* Timeline line (desktop) */}
							<div
								className="absolute top-2.5 right-8 left-8 hidden text-zinc-300 md:block dark:text-zinc-700"
								style={{
									height: "1px",
									backgroundImage:
										"repeating-linear-gradient(to right, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)",
								}}
							/>
							<div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
								{EDITIONS.map((edition) => (
									<div key={edition.year} className="relative">
										{/* Timeline node */}
										<div className="relative z-10 mb-6 flex items-center gap-3">
											<span
												className={`h-5 w-5 border ${
													edition.status === "next"
														? "border-zinc-900 bg-zinc-200 dark:border-zinc-300 dark:bg-zinc-700"
														: "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950"
												}`}
											/>
											<h3 className={text.cardTitle}>
												Effect Days {edition.year}
											</h3>
											{edition.status === "next" && (
												<span
													className={`${text.micro} border border-zinc-300 px-2 py-0.5 dark:border-zinc-600`}
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
												<div className="relative aspect-21/9 overflow-hidden">
													<img
														src={getAssetPath(edition.image)}
														alt={`Effect Days ${edition.year}`}
														className="h-full w-full object-cover"
													/>
													<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
												</div>
											) : (
												<div className="flex aspect-21/9 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
													<span className="font-mono text-sm text-zinc-700 dark:text-zinc-200">
														Dec 9–11, 2026 ▊
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
														<Icon name="arrow-right" className="text-xs" />
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

				{/* FAQ Section */}
				<section className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}FAQ</p>
						<h2 className={text.sectionTitle}>Frequently Asked Questions</h2>

						{/* Two independent columns — opening one never reflows the other */}
						<div className="mt-12 grid grid-cols-1 items-start gap-x-12 md:grid-cols-2">
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

				{/* Final CTA — split layout with corner-bracket box, mirrors the blog post
				    and community pages */}
				<section className="relative overflow-hidden py-24 md:py-32">
					{/* Single horizontal line — sits on the CTA heading's first-line baseline */}
					<div
						className="pointer-events-none absolute inset-0 hidden md:block"
						style={{
							backgroundImage:
								"linear-gradient(to bottom, rgba(39, 39, 42, 0.8) 1px, transparent 1px)",
							backgroundSize: "100% 1px",
							backgroundPosition: "0px 204px",
							backgroundRepeat: "no-repeat",
						}}
					/>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, #09090b 0%, transparent 25%, transparent 75%, #09090b 100%)",
						}}
					/>

					<div className={`relative ${container}`}>
						<div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-8">
							{/* Content */}
							<div className="md:col-span-8 md:mt-2">
								<p className={text.eyebrow}>
									{"// "}Dec 9–11, 2026 · Livorno, Italy
								</p>
								<h2 className={text.sectionTitle}>
									Enjoy Effect Days experience
								</h2>
								<p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
									Three days with the people building Effect and building with
									Effect.
								</p>
							</div>

							{/* CTA — col-start-9 col-span-4 */}
							<div className="md:col-span-4 md:col-start-9 md:mt-[9px] md:self-start">
								<div className="relative mx-auto flex max-w-xs flex-col items-center gap-3 px-6 py-6 md:max-w-none">
									{/* Corner brackets */}
									<span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-zinc-300 dark:border-zinc-700" />
									<span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-zinc-300 dark:border-zinc-700" />
									<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-300 dark:border-zinc-700" />
									<span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-zinc-300 dark:border-zinc-700" />

									<Button
										href="#tickets"
										variant="primary"
										size="md"
										className="w-full"
									>
										Get tickets
										<Icon
											name="arrow-right"
											className="text-base"
											aria-hidden="true"
										/>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/events" hideCommunityBorder />
		</div>
	);
}
