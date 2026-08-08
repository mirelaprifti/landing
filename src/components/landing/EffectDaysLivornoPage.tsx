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
		"leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white",
	lede: "mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400",
	cardTitle: "text-lg font-semibold text-zinc-900 dark:text-white",
	smallHeading: "text-base font-semibold text-zinc-900 dark:text-white",
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
};

const PROGRAM = [
	{
		step: "01",
		day: "Thu",
		date: "Dec 10",
		title: "Effect Workshop",
		description: "Full-day sessions led by Effect experts.",
	},
	{
		step: "02",
		day: "Fri",
		date: "Dec 11",
		title: "Effect Conference",
		description: "Engaging talks, afterparty & swags!",
	},
	{
		step: "03",
		day: "Sat",
		date: "Dec 12",
		title: "Community Day",
		description: "More learning, networking, and fun!",
	},
];

const LIVORNO_FACTS = [
	{ key: "Coordinates", value: "43.55° N, 10.31° E" },
	{ key: "Region", value: "Tuscany, Italy 🇮🇹" },
	{ key: "Nearest airport", value: "Pisa (PSA) · ~30 min" },
	{ key: "Also nearby", value: "Florence (FLR) · ~90 min" },
	{ key: "Known for", value: "Canals, seafood, Terrazza Mascagni" },
	{ key: "Effect Days editions", value: "2025 · 2026" },
];

const COMMUNITY_STATS = [
	{ value: "15,100+", label: "github stars" },
	{ value: "6,500+", label: "discord members" },
	{ value: "7,400+", label: "youtube subscribers" },
];

const PASSES = [
	{
		name: "Workshop & Conference Pass",
		description:
			"Includes a full-day Effect workshop and all in Conference Pass.",
		days: [
			{ label: "Dec 10 · Workshop Day", included: true },
			{ label: "Dec 11 · Conference Day", included: true },
			{ label: "Dec 12 · Community Day", included: true },
		],
		featured: true,
	},
	{
		name: "Conference Pass",
		description:
			"In-person ticket including food, drinks, swags, and afterparty!",
		days: [
			{ label: "Dec 10 · Workshop Day", included: false },
			{ label: "Dec 11 · Conference Day", included: true },
			{ label: "Dec 12 · Community Day", included: true },
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
		note: "Where the Effect community gathered for the first time — 15 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
		image: "/assets/images/ed-24-2.png",
	},
	{
		year: "2025",
		location: "Livorno, Italy",
		dates: "Mar 19-21",
		status: "past",
		note: "Advanced use cases and real production stories — 19 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
		image: "/assets/images/ed-25-2.png",
	},
	{
		year: "2026",
		location: "Livorno, Italy",
		dates: "Dec 10-12",
		status: "next",
		note: "The 3rd edition. Back to the Tuscan coast — and you're invited.",
		playlistUrl: null,
		image: null,
	},
];

/* Corner brackets that frame a card — the visual signature of this page. */
function CornerBrackets({ className = "" }: { className?: string }) {
	const corner = "absolute h-4 w-4 border-zinc-500";
	return (
		<div className={`pointer-events-none absolute inset-0 ${className}`}>
			<span className={`${corner} top-0 left-0 border-t border-l`} />
			<span className={`${corner} top-0 right-0 border-t border-r`} />
			<span className={`${corner} bottom-0 left-0 border-b border-l`} />
			<span className={`${corner} right-0 bottom-0 border-r border-b`} />
		</div>
	);
}

export function EffectDaysLivornoPage() {
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
				className="text-whiteno-underline absolute -left-[9999px] z-999 rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/events" />
			<GridOverlay />

			{/* Vertical border lines container — behind content, so full-bleed images cover them */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-295">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative z-10 w-full pt-16">
				{/* Soft white glow behind the hero */}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-168"
					style={{
						background:
							"radial-gradient(ellipse 60% 50% at 70% 20%, rgba(255, 255, 255, 0.05), transparent 70%)",
					}}
				/>

				{/* Hero Section */}
				<section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28">
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
						<p className="absolute bottom-3 left-16 font-mono text-xs tracking-wider text-zinc-300 uppercase">
							{"// "}Effect Days 2025 · Livorno
						</p>
					</div>

					<div className="relative mx-auto w-full max-w-295 px-4">
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className={text.eyebrow}>{"// "}3rd edition</p>
								<h1 className={text.pageTitle}>Effect Days</h1>
								<p className="mt-4 font-mono text-sm font-medium tracking-wider text-zinc-300 uppercase">
									<span className="text-white">Livorno, Italy</span>
									{" · "}
									<span>Dec 10–12, 2026</span>
								</p>
								<p className={text.lede}>
									The Effect & TypeScript developers conference. Three days of
									workshops, talks, and community on the Tuscan coast.
								</p>

								{/* CTA Buttons */}
								<div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
									<Button
										href="#tickets"
										variant="primary"
										size="lg"
										className="group"
									>
										<Icon name="ticket" className="text-lg" />
										Get tickets
									</Button>
									<Button
										href="https://discord.gg/effect-ts"
										variant="secondary"
										size="lg"
										className="border-zinc-300 bg-zinc-400/5 backdrop-blur-[3px] hover:border-zinc-400 hover:bg-zinc-700/10"
									>
										<i className="ri-discord-fill text-lg" />
										Join the community
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Mono ticker strip */}
				<div className="overflow-hidden border-y border-zinc-800 py-3">
					<p className="whitespace-nowrap font-mono text-xs font-medium tracking-[0.25em] text-zinc-600 uppercase">
						{Array.from({ length: 6 })
							.map(() => "Effect Days · Livorno · Dec 10–12, 2026 · ")
							.join("")}
					</p>
				</div>

				{/* The Program - pipeline */}
				<section className="pt-16 pb-24 md:pt-24">
					<div className="mx-auto w-full max-w-295 px-4">
						<p className={text.eyebrow}>{"// "}The Program</p>
						<h2 className={text.sectionTitle}>Three days, one pipeline</h2>
						<p className={text.lede}>
							Like every good Effect program, the conference is composed of
							three steps that run in sequence.
						</p>

						<div className="relative mt-12">
							{/* Connecting dashed line (desktop) */}
							<div
								className="absolute top-6 right-8 left-8 hidden md:block"
								style={{
									height: "1px",
									backgroundImage:
										"repeating-linear-gradient(to right, rgb(63 63 70) 0px, rgb(63 63 70) 4px, transparent 4px, transparent 8px)",
								}}
							/>
							<div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
								{PROGRAM.map((step, index) => (
									<div key={step.step} className="relative">
										{/* Node */}
										<div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center border border-zinc-600 bg-zinc-950 font-mono text-sm font-semibold text-white">
											{step.step}
										</div>
										<div className="relative border border-zinc-800 bg-zinc-900/30 p-6">
											<CornerBrackets />
											<div className="flex items-baseline justify-between font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase">
												<span>{step.day}</span>
												<span>{step.date}</span>
											</div>
											<h3 className={`${text.cardTitle} mt-3`}>{step.title}</h3>
											<p className={text.cardBody}>{step.description}</p>
										</div>
										{index < PROGRAM.length - 1 && (
											<div className="mt-6 flex justify-center md:hidden">
												<Icon name="arrow-down" className="text-zinc-600" />
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						<p className={`${text.body} mx-auto mt-10 max-w-2xl text-center`}>
							A community-driven, non-profit event celebrating the Effect
							ecosystem and our growing community building production-grade
							applications in TypeScript.
						</p>
					</div>
				</section>

				{/* Location dossier */}
				<section className="py-16">
					<div className="mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}Location</p>
							<h2 className={text.sectionTitle}>
								Livorno — back to the Tuscan coast
							</h2>
							<p className={text.lede}>
								Effect Days returns to the seaside port city that hosted the
								2025 edition. Canals, seafood, and the Terrazza Mascagni — a
								short hop from Pisa and Florence.
							</p>

							<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
								{/* Dossier facts */}
								<div className="relative border border-zinc-800 bg-zinc-900/30 p-6 lg:col-span-2">
									<CornerBrackets />
									<p className="font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase">
										livorno.json
									</p>
									<dl className="mt-5">
										{LIVORNO_FACTS.map((fact) => (
											<div
												key={fact.key}
												className="flex items-baseline justify-between gap-4 border-b border-dashed border-zinc-800 py-3 last:border-b-0"
											>
												<dt className="shrink-0 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase">
													{fact.key}
												</dt>
												<dd className="text-right font-mono text-sm text-zinc-200">
													{fact.value}
												</dd>
											</div>
										))}
									</dl>
								</div>

								{/* Photos from the 2025 edition */}
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3">
									<div className="relative overflow-hidden rounded-lg sm:col-span-2">
										<img
											src={getAssetPath("/assets/images/ed-25-2.png")}
											alt="The Effect community at Effect Days 2025, Livorno"
											className="aspect-21/9 h-full w-full object-cover"
										/>
										<span className="absolute bottom-3 left-3 border border-white/10 bg-zinc-950/60 px-2.5 py-1 font-mono text-xs font-medium text-white/90 uppercase backdrop-blur-sm">
											Effect Days 2025 · Livorno
										</span>
									</div>
									<div className="overflow-hidden rounded-lg sm:col-span-2">
										<img
											src={getAssetPath("/assets/images/ed-25.png")}
											alt="Effect Days 2025 in Livorno"
											className="aspect-21/9 h-full w-full object-cover"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Tickets Section */}
				<section id="tickets" className="scroll-mt-16 py-16">
					<div className="mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}Get Tickets</p>
							<h2 className={text.sectionTitle}>Choose your pass</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
								{PASSES.map((pass) => (
									<div
										key={pass.name}
										className={`relative flex flex-col p-6 ${
											pass.featured
												? "border border-zinc-600 bg-zinc-900/50"
												: "border border-zinc-800 bg-zinc-900/30"
										}`}
									>
										<CornerBrackets
											className={pass.featured ? "" : "opacity-40"}
										/>
										<h3 className={text.cardTitle}>{pass.name}</h3>
										<p className={text.cardBody}>{pass.description}</p>

										{/* Day checklist, mono style */}
										<div className="mt-6 space-y-2 font-mono text-sm">
											{pass.days.map((day) => (
												<div
													key={day.label}
													className="flex items-center gap-3"
												>
													<span
														className={
															day.included ? "text-white" : "text-zinc-600"
														}
													>
														{day.included ? "[✓]" : "[ ]"}
													</span>
													<span
														className={
															day.included ? "text-zinc-200" : "text-zinc-500"
														}
													>
														{day.label}
													</span>
												</div>
											))}
										</div>

										<div
											className="mt-6 h-px w-full"
											style={{
												backgroundImage:
													"repeating-linear-gradient(to right, rgb(82 82 91) 0px, rgb(82 82 91) 2px, transparent 2px, transparent 4px)",
											}}
										/>

										{/* Purchase rows */}
										<div className="mt-6 space-y-3">
											<div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800/50 px-4 py-2.5">
												<span className="flex items-center gap-2 text-base font-medium text-zinc-300">
													<Icon name="user" className="text-zinc-400" />
													Self-pay
												</span>
												<span className="font-mono text-sm tracking-wide text-zinc-400 uppercase">
													Coming soon
												</span>
											</div>
											<div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800/50 px-4 py-2.5">
												<span className="flex items-center gap-2 text-base font-medium text-zinc-300">
													<Icon name="building" className="text-zinc-400" />
													Business-pay*
												</span>
												<span className="font-mono text-sm tracking-wide text-zinc-400 uppercase">
													Coming soon
												</span>
											</div>
											<p className="text-center text-xs text-zinc-500">
												*Suitable for invoicing
											</p>
										</div>
									</div>
								))}
							</div>

							<div className="mt-8 flex flex-col gap-4 text-sm text-zinc-400 md:flex-row md:justify-between">
								<p>
									Are you a group of more than 3 people interested in business
									tickets?{" "}
									<Link
										href="mailto:contact@effectful.co?subject=Effect Days Livorno - Group Tickets"
										variant="inline"
										className="underline-offset-2"
									>
										Learn about available discounts at contact@effectful.co.
									</Link>
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Sponsoring Section */}
				<section className="py-16">
					<div className="mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}Sponsoring Effect Days</p>
							<h2 className={text.sectionTitle}>Give back to the community</h2>

							<div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
								{/* Pitch */}
								<div>
									<p className="max-w-2xl text-lg leading-relaxed text-zinc-200">
										Has Effect played a key role in your project and you'd love
										to give back to the community?{" "}
										<span className="text-white">
											Sponsoring Effect Days is your perfect opportunity!
										</span>
									</p>
									<div className="mt-8">
										<Button
											href="mailto:contact@effectful.co?subject=Effect Days Livorno - Sponsorship Inquiry"
											variant="primary"
											size="lg"
										>
											<Icon name="heart-handshake" className="text-lg" />I want
											to sponsor
										</Button>
									</div>
								</div>

								{/* Community stats as terminal output */}
								<div className="relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900/70">
									<div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
										<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
										<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
										<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
									</div>
									<div className="p-5 font-mono text-sm leading-loose">
										<p className="text-zinc-400">
											<span className="text-white">$</span> effect community{" "}
											<span className="text-zinc-600">--stats</span>
										</p>
										{COMMUNITY_STATS.map((stat) => (
											<p key={stat.label} className="text-zinc-200">
												<span className="text-zinc-600">→ </span>
												<span className="font-semibold text-white">
													{stat.value}
												</span>
												<span className="text-zinc-500"> {stat.label}</span>
											</p>
										))}
										<p className="text-zinc-600">
											…and counting<span className="animate-pulse"> ▊</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Editions timeline */}
				<section id="past-editions" className="py-16">
					<div className="mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}The Journey</p>
							<h2 className={text.sectionTitle}>Three editions and counting</h2>

							<div className="relative mt-12">
								{/* Timeline line (desktop) */}
								<div
									className="absolute top-2.5 right-8 left-8 hidden md:block"
									style={{
										height: "1px",
										backgroundImage:
											"repeating-linear-gradient(to right, rgb(63 63 70) 0px, rgb(63 63 70) 4px, transparent 4px, transparent 8px)",
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
															? "border-zinc-300 bg-white/10"
															: "border-zinc-600 bg-zinc-950"
													}`}
												/>
												<h3 className={text.cardTitle}>
													Effect Days {edition.year}
												</h3>
												{edition.status === "next" && (
													<span className="border border-zinc-500 bg-white/5 px-2 py-0.5 font-mono text-xs font-medium tracking-wider text-white uppercase">
														Next stop
													</span>
												)}
											</div>

											<div
												className={`relative flex min-h-64 flex-col overflow-hidden border ${
													edition.status === "next"
														? "border-zinc-500 bg-white/2"
														: "border-zinc-800 bg-zinc-900/20"
												}`}
											>
												{edition.image ? (
													<div className="relative aspect-21/9 overflow-hidden">
														<img
															src={getAssetPath(edition.image)}
															alt={`Effect Days ${edition.year}`}
															className="h-full w-full object-cover"
														/>
														<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
													</div>
												) : (
													<div className="flex aspect-21/9 items-center justify-center border-b border-zinc-800">
														<span className="font-mono text-sm text-white">
															Dec 10–12, 2026 ▊
														</span>
													</div>
												)}
												<div className="flex flex-1 flex-col p-5">
													<div className="flex items-baseline justify-between gap-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase">
														<span>{edition.location}</span>
														<span>{edition.dates}</span>
													</div>
													<p className="mt-3 text-sm leading-relaxed text-zinc-400">
														{edition.note}
													</p>
													{edition.playlistUrl ? (
														<Link
															href={edition.playlistUrl}
															variant="subtle"
															className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium"
														>
															<i className="ri-youtube-fill text-base" />
															Full playlist
															<Icon name="arrow-up-right" className="text-xs" />
														</Link>
													) : (
														<Link
															href="#tickets"
															variant="subtle"
															className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium"
														>
															<Icon name="ticket" className="text-base" />
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
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-16">
					<div className="mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}FAQ</p>
							<h2 className={text.sectionTitle}>Frequently Asked Questions</h2>

							<div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>1. What is Effect Days?</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Effect Days is a non-profit event dedicated to{" "}
										<Link
											href="https://effect.website"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Effect
										</Link>
										, an open-source software library that offers an ecosystem
										of tools for building production-grade applications in
										TypeScript.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										2. When and where is Effect Days taking place?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Effect Days will take place on December 10-12, 2026 in
										Livorno, Tuscany, Italy. The venue will be announced soon.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										3. What is the schedule of the conference?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The conference schedule will be shared as we get closer to
										the event.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										4. Will the Effect Days conference be recorded?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The conference talks will be recorded and published on the{" "}
										<Link
											href="https://www.youtube.com/@effect-ts"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Effect YouTube channel
										</Link>{" "}
										a few weeks later. In the meantime you can subscribe to our
										YouTube, follow{" "}
										<Link
											href="https://x.com/EffectTS_"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Effect on X (Twitter)
										</Link>
										, or{" "}
										<Link
											href="https://discord.gg/effect-ts"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											join the community
										</Link>{" "}
										to stay updated.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										5. What is the Community Day?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Effect Days isn't just about talks — it's about real
										connections. The Community Day on December 12th is a full
										day dedicated to deeper discussions, networking, and
										community activities.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										6. Can I get a refund for my ticket?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Please refer to our{" "}
										<Link
											href="#"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Refund Policy
										</Link>{" "}
										for more details.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										7. How do I get to Livorno?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The closest airport is Pisa (PSA), about 30 minutes away by
										train or car. Florence (FLR) is roughly 90 minutes away.
										Livorno Centrale station has direct rail connections to
										both.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className={text.smallHeading}>
										8. Is there a Code of Conduct?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Yes. Effect Days is dedicated to providing a harassment-free
										experience for everyone. Please read our{" "}
										<Link
											href="/events/code-of-conduct"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Code of Conduct
										</Link>
										.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="relative overflow-hidden">
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255, 255, 255, 0.04), transparent 70%)",
						}}
					/>
					<div className="relative mx-auto w-full max-w-295 px-4">
						<div className="border-t border-zinc-800 py-28 text-center">
							<p className="font-mono text-sm font-medium tracking-[0.25em] text-zinc-500 uppercase">
								Dec 10–12, 2026 · Livorno, Italy
							</p>
							<h2 className={`${text.sectionTitle} mt-4`}>
								See you in Livorno
							</h2>
							<p className={`${text.lede} mx-auto`}>
								Three days with the Effect community on the Tuscan coast.
							</p>
							<div className="mt-8">
								<Button
									href="#tickets"
									variant="primary"
									size="xl"
									className="group"
								>
									<Icon name="ticket" className="text-lg" />
									Get tickets
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/events" hideCommunityBorder />
		</div>
	);
}
