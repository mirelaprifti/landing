import { Button } from "@/components/ui";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const FORM_URL =
	"https://docs.google.com/forms/d/e/1FAIpQLSdiqkoogZ8a2h10oF2ANRTDE_m9l-huR8cpoedbMpjAd29tNw/viewform";

const SUPPORT_ITEMS: {
	title: string;
	description: string;
	icon: IconName;
	details: string[];
	photo: { src: string; alt: string; caption: string };
}[] = [
	{
		title: "Meetups",
		description: "From your first event to a recurring local community.",
		icon: "users",
		details: [
			"Guidance on planning and running your first event",
			"Connecting you with Effect developers nearby",
			"Listing your meetup on the Effect events calendar",
		],
		photo: {
			src: "/assets/events/miami-dax-web.jpg",
			alt: "Effect meetup in Miami",
			caption: "// Miami '26",
		},
	},
	{
		title: "Speaker kit",
		description: "Another pair of eyes before you go on stage.",
		icon: "presentation",
		details: [
			"Slide templates",
			"Feedback on your topic or abstract",
			"Prep session with the Effect team",
		],
		photo: {
			src: "/assets/events/milan-26-leo-web.jpg",
			alt: "Effect talk in Milan",
			caption: "// Milan '26",
		},
	},
];

// Masonry columns — photos keep their natural aspect ratios. Milan '26 is a
// natural portrait; SF '24 stretches (object-cover) to close out its column.
const GALLERY_COLUMNS: {
	src: string;
	alt: string;
	caption: string;
	stretch?: boolean;
	/** Tailwind aspect class — crops the photo to a different ratio */
	aspect?: string;
}[][] = [
	[
		{
			src: "/assets/events/dillon-sf-24-web.jpg",
			alt: "Effect meetup in San Francisco",
			caption: "// SF '24",
			stretch: true,
		},
		{
			src: "/assets/events/vienna-26-2-web.jpg",
			alt: "Effect meetup in Vienna",
			caption: "// Vienna '26",
		},
	],
	[
		{
			src: "/assets/events/paris-april-4-web.jpg",
			alt: "Effect meetup in Paris",
			caption: "// Paris '25",
		},
		{
			src: "/assets/events/miami-ariel-web.jpg",
			alt: "Effect meetup in Miami",
			caption: "// Miami '26",
		},
		{
			src: "/assets/events/milan-25-web.jpg",
			alt: "Effect meetup in Milan",
			caption: "// Milan '25",
			stretch: true,
		},
	],
	[
		{
			src: "/assets/events/vienna-23-web.jpg",
			alt: "Effect meetup in Vienna",
			caption: "// Vienna '23",
		},
		{
			src: "/assets/events/hamburg-web.jpg",
			alt: "Effect meetup in Hamburg",
			caption: "// Hamburg '25",
		},
		{
			src: "/assets/events/paris-nov-2-web.jpg",
			alt: "Effect meetup in Paris",
			caption: "// Paris '24",
			stretch: true,
		},
	],
	[
		{
			src: "/assets/events/miami-2026-davidk-web.jpg",
			alt: "Effect meetup in Miami",
			caption: "// Miami '26",
		},
		{
			src: "/assets/events/milan-26-web.jpg",
			alt: "Effect meetup in Milan",
			caption: "// Milan '26",
		},
	],
];

const TALK_IDEAS: { label: string; href?: string }[] = [
	{
		label: "Reliable TypeScript for production systems",
		href: "https://youtu.be/upXJJ9maWPc",
	},
	{
		label: "Stop agent slop with Effect",
		href: "https://youtu.be/b8ULm238DHg",
	},
	{
		label: "AI 🤍 Effect",
		href: "https://www.youtube.com/watch?v=XaNHyZbFUBY",
	},
	{
		label: "Effect Schema V4",
		href: "https://www.youtube.com/watch?v=0naAPm0-0Wg",
	},
	{
		label: "Production TypeScript for the AI Era",
		href: "https://www.youtube.com/watch?v=hY279-A2fC4",
	},
	{
		label: "Incremental adoption of Effect",
		href: "https://www.youtube.com/watch?v=tfhxR8Z-w6E",
	},
];

// Channels featured in the "Stay connected" section
const CHANNELS: {
	icon: string;
	/** Brand color for the icon tile */
	color: string;
	title: string;
	description: string;
	href: string;
	linkLabel: string;
}[] = [
	{
		icon: "ri-discord-fill",
		color: "#5865F2",
		title: "A thriving Discord community",
		description:
			"Effect developers sharing questions, patterns, and production stories every day.",
		href: "https://discord.gg/effect-ts",
		linkLabel: "discord.gg/effect-ts",
	},
	{
		icon: "ri-twitter-x-fill",
		color: "#FFFFFF",
		title: "Follow Effect on X",
		description: "News, releases, and Effect takes straight from the source.",
		href: "https://x.com/EffectTS_",
		linkLabel: "@EffectTS_",
	},
	{
		icon: "ri-youtube-fill",
		color: "#FF0000",
		title: "Effect on YouTube",
		description: "Talks, workshops, and office hours livestreams.",
		href: "https://www.youtube.com/@effect-ts",
		linkLabel: "youtube.com/@effect-ts",
	},
];

// Luma event ids for the "Upcoming events" embeds
const UPCOMING_EVENTS: string[] = [
	// "evt-dD8Ky9OvDPnU2ln", // Effect Office Hours 40 — hidden for now
	// "evt-535bkJt5SOkkL7W", // Effect NYC #2 — hidden for now
	// "evt-CIXBbu7ySP61MNP", // Effect San Francisco — hidden for now
	// "evt-IpTTFhOGblrQdoK", // Effect Warsaw #1 — hidden for now
];

function FormButton({
	variant = "primary",
}: {
	variant?: "primary" | "secondary";
}) {
	return (
		<Button href={FORM_URL} variant={variant} size="md" className="group">
			Tell us about your event
			<Icon
				name="arrow-up-right"
				className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				aria-hidden="true"
			/>
		</Button>
	);
}

export function CommunityEventsPage() {
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
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/community-hub" />
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
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 text-zinc-800"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative z-10 pt-16">
				{/* Hero */}
				<section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24">
					{/* Grid background — vertical lines, phased to the container edges */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage:
								"linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px)",
							backgroundSize: "196.6px 100%",
							backgroundPosition: "calc(50% + 98.3px) 0",
						}}
					/>
					{/* Horizontal lines — y-phase set so a line sits on the h1's first-line baseline */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage:
								"linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)",
							backgroundSize: "100% 171px",
							backgroundPosition: "0px 2px",
						}}
					/>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
						}}
					/>
					{/* Subtle glow */}
					<div
						className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
						style={{
							background: `
								radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
								radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
							`,
						}}
					/>

					{/* Right half — community proof photo (lg+) */}
					<div className="absolute inset-y-0 right-0 z-10 hidden w-[53%] overflow-hidden lg:block">
						<img
							src={getAssetPath("/assets/events/speakers.png")}
							alt="An Effect community meetup"
							className="h-full w-full object-cover"
						/>
						{/* Blend into the dark page */}
						<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
						{/* Photo caption */}
						<p className="absolute bottom-3 left-16 font-mono text-xs tracking-wider text-zinc-300 uppercase">
							// Effect Meetup NYC '25 at Warp's
						</p>
					</div>

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Spread the Effect
								</p>
								<h1 className="text-3xl leading-[1.1] font-bold tracking-tight text-white md:text-4xl">
									Bring Effect to your community events
								</h1>
								<p className="mt-4 text-lg text-zinc-400 md:max-w-[41.667%] lg:max-w-[83.333%]">
									Crash your local TypeScript or AI event with an Effect talk,
									host your own meetup, or join an event near you.
								</p>
								<div className="mt-8 flex flex-wrap items-stretch gap-4">
									<FormButton />
									<Button
										href="#upcoming-events"
										variant="secondary"
										size="md"
										className="group"
									>
										See upcoming events
										<Icon
											name="arrow-down"
											className="text-base transition-transform group-hover:translate-y-0.5"
											aria-hidden="true"
										/>
									</Button>
								</div>
							</div>

							{/* Right — community proof photo */}
							<div className="relative overflow-hidden lg:hidden">
								<img
									src={getAssetPath("/assets/events/speakers.png")}
									alt="An Effect community meetup"
									className="h-full w-full object-cover"
								/>
								{/* Blend into the dark page */}
								<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
								{/* Photo caption */}
								<p className="absolute bottom-3 left-4 font-mono text-xs tracking-wider text-zinc-300 uppercase">
									// Effect Meetup NYC '25 at Warp's
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Upcoming events */}
				<section
					id="upcoming-events"
					className="scroll-mt-16 border-t border-zinc-800 py-24"
				>
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Upcoming events
								</p>
								<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
									Join an upcoming event
								</h2>
								<p className="mt-4 text-lg text-zinc-400">
									Office Hours every Wednesday, plus meetups and conferences
									hosted by the community worldwide.
								</p>
								<div className="mt-8 flex flex-wrap items-stretch gap-4">
									<Button
										href="https://luma.com/effect-community"
										variant="secondary"
										className="shrink-0"
									>
										View events calendar
										<Icon name="arrow-up-right" className="text-base" />
									</Button>
								</div>
							</div>

							{/* Right — full community events calendar */}
							<div className="relative bg-[#131517]">
								<iframe
									src="https://luma.com/embed/calendar/cal-6pnQFi64vfu2qlO/events"
									title="Effect community events calendar"
									className="block h-[560px] w-full"
									allow="fullscreen"
									loading="lazy"
									aria-hidden="false"
									tabIndex={0}
								/>
								{/* Fade the clipped last row so the cut reads as scrollable */}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#131517] to-transparent" />
							</div>
						</div>

						{UPCOMING_EVENTS.length > 0 && (
							<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
								{UPCOMING_EVENTS.map((eventId) => (
									<iframe
										key={eventId}
										src={`https://luma.com/embed/event/${eventId}/simple?lt=dark`}
										title="Upcoming Effect community event"
										scrolling="no"
										className="h-[720px] w-full rounded-md border border-zinc-800 bg-[#131517]"
										allow="fullscreen; payment"
										loading="lazy"
									/>
								))}
							</div>
						)}
					</div>
				</section>

				{/* How we can help */}
				<section className="border-t border-zinc-800 py-24 md:pt-40">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Support
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							What we can help with
						</h2>

						{/* Alternating split panels — one per offering */}
						<div className="-mx-4 mt-12 flex flex-col border border-zinc-800">
							{SUPPORT_ITEMS.map((item, index) => (
								<div
									key={item.title}
									className="grid grid-cols-1 overflow-hidden lg:grid-cols-2"
								>
									{/* Content — alternates sides on desktop */}
									<div
										className={`flex flex-col bg-[#0C0C0E] px-8 py-16 md:px-14 ${
											index % 2 === 1 ? "lg:order-2" : ""
										}`}
									>
										<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
											{item.title}
										</h3>
										<p className="mt-3 text-base leading-relaxed text-zinc-400">
											{item.description}
										</p>
										{/* Output */}
										<ul className="mt-4 flex flex-col gap-2 border-t border-zinc-700 pt-4">
											{item.details.map((detail) => (
												<li
													key={detail}
													className="flex items-baseline gap-2.5 text-base leading-relaxed text-zinc-400"
												>
													<span className="text-emerald-500" aria-hidden="true">
														✓
													</span>
													{detail}
												</li>
											))}
										</ul>
									</div>
									{/* Photo — full bleed on the opposite side */}
									<div
										className={`relative min-h-64 lg:min-h-0 ${
											index % 2 === 1 ? "lg:order-1" : ""
										}`}
									>
										<img
											src={getAssetPath(item.photo.src)}
											alt={item.photo.alt}
											loading="lazy"
											className="absolute inset-0 h-full w-full object-cover saturate-[0.85]"
										/>
										{/* Scrim — blends the photo into the dark page */}
										<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
										<p className="absolute bottom-3 left-4 font-mono text-xs tracking-wider text-zinc-300 uppercase">
											{item.photo.caption}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Talk ideas */}
				<section
					id="talk-ideas"
					className="border-t border-zinc-800 py-24 md:pt-40"
				>
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Effect Talk Ideas
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							Not sure what to talk about?
						</h2>
						<p className="mt-4 text-lg leading-normal text-zinc-400">
							A few Effect-friendly angles to get you started
						</p>

						{/* Terminal prompts — two columns below the header */}
						<ul className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8">
							{TALK_IDEAS.map((idea) => (
								<li key={idea.label}>
									{idea.href ? (
										<a
											href={idea.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-1.5 rounded-md border border-zinc-700 bg-[#0C0C0E] px-4 py-3 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
										>
											{idea.label}
											<Icon
												name="arrow-up-right"
												className="ml-auto shrink-0 self-center text-base text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
												aria-hidden="true"
											/>
										</a>
									) : (
										<span className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-[#0C0C0E] px-4 py-3 font-mono text-sm text-zinc-300">
											{idea.label}
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* Event gallery */}
				<section className="border-t border-zinc-800 py-16">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
							{GALLERY_COLUMNS.map((column, columnIndex) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: columns are static
									key={columnIndex}
									className="flex flex-col gap-4"
								>
									{column.map((photo) => (
										<div
											key={photo.src}
											className={`relative overflow-hidden ${
												photo.stretch ? "flex-1" : (photo.aspect ?? "")
											}`}
										>
											<img
												src={getAssetPath(photo.src)}
												alt={photo.alt}
												loading="lazy"
												className={`w-full saturate-[0.85] ${
													photo.stretch || photo.aspect
														? "absolute inset-0 h-full object-cover"
														: ""
												}`}
											/>
											{/* Scrim — blends the photo into the dark page */}
											<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
											<p className="absolute bottom-2.5 left-3 font-mono text-xs tracking-wider text-zinc-300 uppercase">
												{photo.caption}
											</p>
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</section>
				{/* Stay connected */}
				<section className="border-t border-zinc-800 py-24 md:pt-40">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
							{/* Left — section header, vertically centered against the cards */}
							<div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Stay connected
								</p>
								<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
									Join the conversation
								</h2>
								<p className="mt-4 text-lg leading-normal text-zinc-400">
									Where the Effect community hangs out online
								</p>
							</div>

							{/* Right — channel cards */}
							<ul className="flex flex-col gap-3 lg:col-span-6">
								{CHANNELS.map((channel) => (
									<li key={channel.href}>
										<a
											href={channel.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group relative flex gap-4 overflow-hidden rounded-md border border-zinc-700 bg-[#0C0C0E] p-6 transition-colors hover:border-zinc-500"
										>
											<div className="flex h-14 w-14 shrink-0 items-center justify-center self-center rounded-md bg-zinc-800">
												<i
													className={`${channel.icon} text-2xl`}
													style={{ color: channel.color }}
													aria-hidden="true"
												/>
											</div>
											<div className="flex flex-col justify-center">
												<h3 className="text-base font-semibold text-white">
													{channel.title}
												</h3>
												<p className="mt-1 text-sm leading-normal text-zinc-400">
													{channel.description}
												</p>
											</div>
											<Icon
												name="arrow-up-right"
												className="ml-auto shrink-0 text-zinc-600 transition-colors group-hover:text-white"
												aria-hidden="true"
											/>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="relative overflow-hidden border-t border-zinc-800 py-24 md:py-32">
					{/* Grid background — vertical lines */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage:
								"linear-gradient(to right, rgba(39, 39, 42, 0.8) 1px, transparent 1px)",
							backgroundSize: "196.6px 100%",
							/* Phased so lines land exactly on the container edges and center,
							   overlapping the page border lines instead of doubling them */
							backgroundPosition: "calc(50% + 98.3px) 0",
						}}
					/>
					{/* Single horizontal line — sits on the CTA heading's first-line baseline */}
					<div
						className="pointer-events-none absolute inset-0 hidden md:block"
						style={{
							backgroundImage:
								"linear-gradient(to bottom, rgba(39, 39, 42, 0.8) 1px, transparent 1px)",
							backgroundSize: "100% 1px",
							backgroundPosition: "0px 201px",
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

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-8">
							{/* Content */}
							<div className="text-center md:col-span-6 md:mt-2 md:text-left">
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Get in touch
								</p>
								<h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
									Bringing Effect to a developer event?
								</h2>
								<p className="mt-4 text-lg leading-normal text-zinc-400">
									Every community starts with someone stepping on stage, we'd
									love it to be you.
								</p>
							</div>

							{/* CTA — corner-bracket box, mirrors the blog post page */}
							<div className="md:col-span-4 md:col-start-9 md:mt-[9px] md:self-start">
								<div className="relative mx-auto flex max-w-xs flex-col items-center gap-3 px-6 py-6 md:max-w-none">
									{/* Corner brackets */}
									<span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-zinc-700" />
									<span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-zinc-700" />
									<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-700" />
									<span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-zinc-700" />

									<Button
										href={FORM_URL}
										variant="primary"
										size="md"
										className="w-full"
									>
										Tell us about your event
										<Icon
											name="arrow-right"
											className="text-base"
											aria-hidden="true"
										/>
									</Button>
									<a
										href="https://discord.gg/effect-ts"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-200"
									>
										discord.gg/effect-ts
										<Icon name="arrow-up-right" aria-hidden="true" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/community-hub" />
		</div>
	);
}
