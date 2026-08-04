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
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
};

const PAST_EDITIONS = [
	{
		year: "2024",
		location: "Vienna, Austria 🇦🇹",
		dates: "Feb 22-24, 2024",
		badge: "Inaugural Edition",
		description:
			"Where the Effect community gathered for the first time to share from early experiments to production systems.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
		image: "/assets/images/ed-24-2.png",
	},
	{
		year: "2025",
		location: "Livorno, Italy 🇮🇹",
		dates: "Mar 19-21, 2025",
		badge: "Past Edition",
		description:
			"A more in-depth event spotlighting advanced use cases and real production stories, showing the evolution of Effect.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
		image: "/assets/images/ed-25-2.png",
	},
	{
		year: "2026",
		location: "Málaga, Spain 🇪🇸",
		dates: "May 6-8, 2026",
		badge: "Past Edition",
		description:
			"Three days on the Costa del Sol — workshops, conference talks, and a full day of community sessions.",
		playlistUrl: "https://www.youtube.com/@effect-ts",
		image: "/assets/images/malaga-6.png",
	},
];

const STATS = [
	{
		value: "4th",
		label: "Edition",
		icon: "/assets/icons-svgs/edition-graphic.svg",
	},
	{
		value: "100%",
		label: "Community-driven",
		icon: "/assets/icons-svgs/community-graphic.svg",
	},
	{
		value: "Global",
		label: "Developer network",
		icon: "/assets/icons-svgs/globe-graphic.svg",
	},
];

const DAYS = [
	{ icon: "wrench", label: "Dec 10 · Workshop Day" },
	{ icon: "mic", label: "Dec 11 · Conference Day" },
	{ icon: "users", label: "Dec 12 · Community Day" },
] as const;

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
				className="text-whiteno-underline absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/events" transparent />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-[101] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-600/50" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-600/50" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative z-10 w-full pt-16">
				{/* Background image with gradient overlay */}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[39.4rem] overflow-hidden"
					style={{
						backgroundImage: `linear-gradient(to bottom, rgba(9, 9, 11, 0.1) 0%, rgba(9, 9, 11, 0.2) 50%, #09090b 100%), url(${getAssetPath("/assets/images/ed-25-2.png")})`,
						backgroundSize: "100% 40rem",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						opacity: 0.75,
					}}
				/>

				{/* Hero Section */}
				<section className="relative w-full pt-20 pb-16 md:pt-24 md:pb-32">
					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12">
							{/* Left side - Main content */}
							<div className="flex-1">
								<p className="mb-4 font-mono text-base font-semibold tracking-wide text-zinc-100">
									<span className="text-violet-400">import</span> {"{"}{" "}
									yourTicket {"}"} <span className="text-violet-400">from</span>{" "}
									<span className="text-emerald-400">
										"effect-days-livorno"
									</span>
								</p>
								<h1 className={text.pageTitle}>Effect Days Livorno</h1>
								<p className="mt-6 text-xl font-medium text-white">
									Workshop Day · Conference Day · Community Day
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
										Get your ticket
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

							{/* Right side - Event info (ticket stub style) */}
							<div className="mt-10 hidden shrink-0 lg:mt-0 lg:block">
								{/* Hidden SVG for clip-path definition - must be rendered first */}
								<svg className="absolute h-0 w-0" aria-hidden="true">
									<defs>
										<clipPath
											id="ticket-clip-path"
											clipPathUnits="userSpaceOnUse"
										>
											{/* Ticket shape with semicircular cutouts on both sides */}
											<path d="M 0,0 H 280 V 51.5 A 8.5,8.5 0 0 0 280,68.5 V 120 H 0 V 68.5 A 8.5,8.5 0 0 0 0,51.5 Z" />
										</clipPath>
									</defs>
								</svg>

								<div className="relative h-[120px] w-[280px]">
									{/* Backdrop blur layer with clip-path */}
									<div
										className="absolute inset-0 bg-zinc-700/10 backdrop-blur-[5px]"
										style={{
											clipPath: "url(#ticket-clip-path)",
										}}
									/>

									{/* SVG for border */}
									<svg
										className="absolute inset-0 h-full w-full"
										viewBox="0 0 280 120"
										fill="none"
										aria-hidden="true"
									>
										<path
											d="M 0.5,51.5 V 0.5 H 279.5 V 51.5"
											fill="none"
											stroke="rgb(161, 161, 170)"
											strokeWidth="1"
										/>
										<path
											d="M 279.5,68.5 V 119.5 H 0.5 V 68.5"
											fill="none"
											stroke="rgb(161, 161, 170)"
											strokeWidth="1"
										/>
										<path
											d="M 279.5,51.5 A 8,8 0 0 0 279.5,68.5"
											fill="none"
											stroke="rgb(161, 161, 170)"
											strokeWidth="1"
										/>
										<path
											d="M 0.5,68.5 A 8,8 0 0 0 0.5,51.5"
											fill="none"
											stroke="rgb(161, 161, 170)"
											strokeWidth="1"
										/>
										<line
											x1="20"
											y1="60"
											x2="260"
											y2="60"
											stroke="rgb(113, 113, 122)"
											strokeWidth="1"
											strokeDasharray="2 2"
										/>
									</svg>

									{/* Content overlay */}
									<div className="absolute inset-0 flex flex-col">
										{/* Top section - Date */}
										<div className="flex flex-1 items-center px-6">
											<div className="flex items-center gap-2.5">
												<Icon
													name="calendar"
													className="text-[1.1rem] text-zinc-200"
												/>
												<p className="font-mono text-[1.1rem] font-medium text-white uppercase">
													Dec 10–12, 2026
												</p>
											</div>
										</div>
										{/* Bottom section - Location */}
										<div className="flex flex-1 items-center px-6">
											<div className="flex items-center gap-2.5">
												<Icon
													name="map-pin"
													className="text-[1.1rem] text-zinc-200"
												/>
												<p className="font-mono text-[1.1rem] font-medium text-white uppercase">
													Livorno, Italy
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-700 pt-24">
							<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
								{STATS.map((stat) => (
									<div
										key={stat.label}
										className="flex flex-col items-center text-center"
									>
										<img
											src={getAssetPath(stat.icon)}
											alt=""
											className="mb-4 h-10 w-10"
										/>
										<div className="text-3xl font-bold text-white md:text-4xl">
											{stat.value}
										</div>
										<div className="mt-2 font-mono text-sm tracking-wide text-zinc-400 uppercase">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Why Livorno Section */}
				<section className="pb-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-800 pt-12">
							{/* Header */}
							<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
								<div>
									<p className={text.eyebrow}>{"// "}Why Livorno</p>
									<h2 className={text.sectionTitle}>
										Back to the Tuscan coast
									</h2>
									<p className={text.lede}>
										Effect Days returns to Livorno, the seaside port city that
										hosted the 2025 edition — canals, seafood, and the Terrazza
										Mascagni, a short hop from Pisa and Florence.
									</p>
								</div>
							</div>

							{/* Featured images from the 2025 edition */}
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<div className="aspect-video overflow-hidden rounded-lg">
									<img
										src={getAssetPath("/assets/images/ed-25.png")}
										alt="Effect Days 2025 in Livorno"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="aspect-video overflow-hidden rounded-lg">
									<img
										src={getAssetPath("/assets/images/ed-25-2.png")}
										alt="The Effect community at Effect Days 2025, Livorno"
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Tickets Section */}
				<section id="tickets" className="scroll-mt-16 py-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}Effect Days Tickets</p>
							<h2 className={text.sectionTitle}>Three days, one pass</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
								{/* Days overview card */}
								<div className="relative flex flex-col overflow-hidden border border-zinc-600 bg-zinc-900/50">
									<div className="p-6">
										<div className="mb-6">
											<div className="flex items-baseline justify-between gap-4">
												<h3 className={text.cardTitle}>Full Pass</h3>
												<p className="text-sm text-zinc-400">
													The complete Effect Days experience
												</p>
											</div>
											<div
												className="mt-4 h-px w-full"
												style={{
													backgroundImage:
														"repeating-linear-gradient(to right, rgb(82 82 91) 0px, rgb(82 82 91) 2px, transparent 2px, transparent 4px)",
												}}
											/>
										</div>

										<div className="space-y-3">
											{DAYS.map((day) => (
												<div
													key={day.label}
													className="flex items-center gap-3"
												>
													<div className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10">
														<Icon
															name={day.icon}
															className="text-emerald-400"
														/>
													</div>
													<p className="text-sm font-medium text-white">
														{day.label}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>

								{/* Coming soon card */}
								<div className="relative flex flex-col justify-center overflow-hidden border border-dashed border-zinc-700 bg-zinc-900/30">
									<div className="p-6">
										<h3 className={text.cardTitle}>Ticket sales open soon</h3>
										<p className="mt-1 text-sm leading-normal text-zinc-400">
											Pricing and registration will be announced shortly. Join
											the Discord to be the first to know when tickets go live.
										</p>
										<div className="mt-6">
											<Button
												href="https://discord.gg/effect-ts"
												variant="secondary"
												className="border-zinc-600 hover:bg-zinc-800/80"
											>
												<i className="ri-discord-fill text-lg" />
												Get notified on Discord
											</Button>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-8 flex flex-col gap-4 text-sm text-zinc-400 md:flex-row md:justify-between">
								<p>
									Planning to bring your team?{" "}
									<Link
										href="mailto:contact@effectful.co?subject=Effect Days Livorno - Group Tickets"
										variant="inline"
										className="underline-offset-2"
									>
										Contact us for group discounts.
									</Link>
								</p>
								<p className="flex shrink-0 items-center gap-2 md:text-right">
									<Icon name="heart-handshake" className="text-white" />
									<span>
										<Link
											href="mailto:contact@effectful.co?subject=Effect Days Livorno - Sponsorship Inquiry"
											variant="inline"
											className="underline-offset-2"
										>
											Sponsor Effect Days
										</Link>{" "}
										and get tickets included.
									</span>
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}FAQ</p>
							<h2 className={text.sectionTitle}>Frequently Asked Questions</h2>

							<div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										1. What is Effect Days?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										Effect Days is a non-profit event dedicated to{" "}
										<Link
											href="https://effect.website"
											variant="inline"
											className="decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
										>
											Effect
										</Link>
										, an open-source software library for building
										production-grade applications in TypeScript.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										2. What is the schedule of the conference?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The conference schedule will be shared as we get closer to
										the event.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										3. Will the Effect Days conference be recorded?
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
										a few weeks later.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										4. What is the Community Day?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The Community Day on December 12th is a full day dedicated
										to deeper discussions, networking, and community activities.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										5. How do I get to Livorno?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-400">
										The closest airport is Pisa (PSA), about 30 minutes away by
										train or car. Florence (FLR) is roughly 90 minutes away.
										Livorno Centrale station has direct rail connections to
										both.
									</p>
								</div>

								<div className="border-b border-zinc-800/50 py-5">
									<h3 className="text-[15px] font-semibold text-white">
										6. Is there a Code of Conduct?
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

				{/* Past Editions Section */}
				<section id="past-editions" className="py-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-800 pt-12">
							<p className={text.eyebrow}>{"// "}Relive Effect Days</p>
							<h2 className={text.sectionTitle}>Three editions and counting</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{PAST_EDITIONS.map((edition) => (
									<div
										key={edition.year}
										className="flex flex-col overflow-hidden border border-zinc-800 bg-zinc-900/20"
									>
										{/* Image with overlay */}
										<div className="relative aspect-[16/9] overflow-hidden">
											<img
												src={getAssetPath(edition.image)}
												alt={`Effect Days ${edition.year}`}
												className="h-full w-full object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
											<div className="absolute right-5 bottom-4 left-5">
												<span className="inline-block border border-white/10 bg-white/0 px-2.5 py-1 font-mono text-xs font-medium text-white/90 uppercase backdrop-blur-sm">
													{edition.badge}
												</span>
											</div>
										</div>

										{/* Content */}
										<div className="flex flex-1 flex-col p-5">
											<h3 className={text.cardTitle}>
												Effect Days {edition.year}
											</h3>

											<div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
												<span className="flex items-center gap-1">
													<Icon name="map-pin" />
													{edition.location}
												</span>
												<span>·</span>
												<span>{edition.dates}</span>
											</div>

											<p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
												{edition.description}
											</p>

											<div className="mt-auto flex items-center border-t border-zinc-800 pt-5">
												<Link
													href={edition.playlistUrl}
													variant="subtle"
													className="mt-5 inline-flex items-center gap-1.5 font-medium"
												>
													<i className="ri-youtube-fill text-base" />
													Watch the talks
													<Icon name="arrow-up-right" className="text-xs" />
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Next Edition CTA Section */}
				<section className="relative overflow-hidden">
					{/* Grid background */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage: `
                linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
              `,
							backgroundSize: "196.6px 162px",
							backgroundPosition: "calc(50% + 97px) 0",
						}}
					/>
					{/* Fade out grid at top and bottom */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, #09090b 0%, transparent 15%, transparent 80%, #09090b 100%)",
						}}
					/>
					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-800 py-28">
							<div className="text-center">
								<h2 className="leading-tighter text-2xl font-bold text-white md:text-4xl">
									Ready for Effect Days Livorno?
								</h2>
								<p className="mx-auto mt-4 max-w-2xl text-xl text-zinc-400">
									Save the date — December 10-12, 2026. Three days with the
									Effect community on the Tuscan coast.
								</p>

								<div className="mt-8">
									<Button
										href="#tickets"
										variant="primary"
										size="xl"
										className="group"
									>
										<Icon name="ticket" className="text-lg" />
										Get your ticket
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
