import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const upcomingEvents = [
	{
		title: "Effect Office Hours #18 🔥",
		date: "// Weekly on YouTube",
		location: "Online",
		flag: "🎥",
		thumbnail: "https://i.ytimg.com/vi/5NtYKTLoDkQ/maxresdefault.jpg",
		href: "https://www.youtube.com/live/5NtYKTLoDkQ",
		description:
			"Weekly live office hours where the Effect team answers questions, demos features, and discusses best practices with the community.",
	},
];

const pastEvents = [
	{
		year: "2025",
		events: [
			{
				flag: "🇮🇹",
				date: "Mar 19-21",
				title: "Effect Days Livorno",
				type: "conference",
				href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP",
			},
			{
				flag: "🇫🇷",
				date: "Jun",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇺🇸",
				date: "May",
				title: "Effect Meetup SF",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
		],
	},
	{
		year: "2024",
		events: [
			{
				flag: "🇦🇹",
				date: "Feb 21",
				title: "Effect Days Vienna",
				type: "conference",
				href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO",
			},
			{
				flag: "🇵🇱",
				date: "Jan 10",
				title: "WarsawJS Meetup",
				type: "meetup",
				href: "https://www.youtube.com/watch?v=example",
			},
			{
				flag: "🇫🇷",
				date: "Apr 23",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇺🇸",
				date: "May 8",
				title: "LambdaConf",
				type: "conference",
				href: "https://www.lambdaconf.us/",
			},
			{
				flag: "🇫🇷",
				date: "May 23",
				title: "Local-First Conf",
				type: "conference",
				href: "https://www.localfirstconf.com/",
			},
			{
				flag: "🇬🇧",
				date: "Jun 26",
				title: "London Node.js User Group",
				type: "meetup",
				href: "https://www.meetup.com/london-node-user-group/",
			},
			{
				flag: "🇫🇷",
				date: "Jun 25",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇪🇸",
				date: "Sep 21",
				title: "React Alicante Conference",
				type: "conference",
				href: "https://reactalicante.es/",
			},
			{
				flag: "🇺🇸",
				date: "Oct 21",
				title: "Effect Meetup SF",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇦🇹",
				date: "Nov 26",
				title: "React Meetup Vienna",
				type: "meetup",
				href: "https://www.meetup.com/reactvienna/",
			},
			{
				flag: "🇫🇷",
				date: "Nov 5",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇺🇸",
				date: "Nov 2",
				title: "Effect Meetup SF",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇫🇷",
				date: "Dec 12",
				title: "Paris TypeScript Meetup",
				type: "meetup",
				href: "https://www.meetup.com/paris-typescript/",
			},
		],
	},
];

const hostPerks = [
	{
		icon: "ri-t-shirt-2-line",
		title: "Swag packs",
		description:
			"Stickers, t-shirts, and other Effect merchandise shipped to your venue for attendees.",
	},
	{
		icon: "ri-megaphone-line",
		title: "Promotional support",
		description:
			"We'll promote your event across our social channels, Discord, and newsletter.",
	},
	{
		icon: "ri-palette-line",
		title: "Banners and assets",
		description:
			"Ready-to-use event graphics, speaker banners, and Effect branding materials.",
		href: "https://www.figma.com/community/file/effect-event-assets",
		linkLabel: "Figma kit",
	},
	{
		icon: "ri-slideshow-3-line",
		title: "Talk materials",
		description:
			"Slide decks, demo repos, and starter templates to help speakers prepare.",
	},
	{
		icon: "ri-team-line",
		title: "Direct line to the team",
		description:
			"Dedicated support from the Effect team to help with planning, content, and speaker sourcing.",
	},
	{
		icon: "ri-git-repository-line",
		title: "Meetup repo template",
		description:
			"A GitHub template with talk submissions as issues, a code of conduct, and organizer checklists.",
		href: "https://github.com/effect-ts-community/meetup-template",
		linkLabel: "View on GitHub",
	},
];

function TypeBadge({ type }: { type: string }) {
	const styles: Record<string, string> = {
		conference: "bg-violet-500/10 text-violet-400 border-violet-500/20",
		meetup: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
		online: "bg-blue-500/10 text-blue-400 border-blue-500/20",
		podcast: "bg-amber-500/10 text-amber-400 border-amber-500/20",
		webinar: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	};
	return (
		<span
			className={`rounded-full border px-2 py-0.5 text-xs  ${styles[type] || styles.meetup}`}
		>
			{type.charAt(0).toUpperCase() + type.slice(1)}
		</span>
	);
}

function EventsTabSection() {
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

	return (
		<section id="events" className="pb-24 md:pb-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Tabs */}
				<div className="mb-8 flex gap-2">
					<button
						type="button"
						onClick={() => setActiveTab("upcoming")}
						className={`rounded-full px-6 py-2.5 text-base font-medium transition-colors ${
							activeTab === "upcoming"
								? "bg-zinc-800 font-semibold text-white"
								: "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
						}`}
					>
						Upcoming
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("past")}
						className={`rounded-full px-6 py-2.5 text-base font-medium transition-colors ${
							activeTab === "past"
								? "bg-zinc-800 font-semibold text-white"
								: "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
						}`}
					>
						Past
					</button>
				</div>

				{/* Tab Content */}
				{activeTab === "upcoming" && (
					<div className="space-y-4">
						{upcomingEvents.map((event) => (
							<a
								key={event.title}
								href={event.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900 md:flex-row md:gap-8"
							>
								{event.thumbnail && (
									<div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:w-1/2">
										<img
											src={
												event.thumbnail.startsWith("http")
													? event.thumbnail
													: getAssetPath(event.thumbnail)
											}
											alt={event.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
								)}
								{!event.thumbnail && (
									<div className="flex w-full items-center justify-center bg-zinc-800/50 py-10 md:w-1/2 md:py-0">
										<i className="ri-live-line text-4xl text-zinc-600" />
									</div>
								)}
								<div className="flex flex-1 flex-col justify-center p-5">
									<div className="mb-1.5 flex items-center gap-2">
										<span className="font-mono text-sm tracking-wider text-zinc-400 uppercase">
											{event.date}
										</span>
										<TypeBadge type={event.location.toLowerCase()} />
									</div>
									<h3 className="mt-0.5 mb-2 text-xl font-semibold text-white group-hover:text-zinc-100">
										{event.title}
									</h3>
									<p className="max-w-[28rem] text-base text-zinc-400">
										{event.description}
									</p>
								</div>
							</a>
						))}
					</div>
				)}

				{activeTab === "past" && (
					<div className="space-y-6">
						{pastEvents.map((yearGroup) => (
							<div
								key={yearGroup.year}
								className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50"
							>
								<div className="border-b border-zinc-800 px-5 py-3">
									<span className="font-mono text-sm font-medium tracking-wider text-zinc-200 uppercase">
										{yearGroup.year}
									</span>
								</div>
								<div className="divide-y divide-zinc-800/50">
									{yearGroup.events.map((event, i) => (
										<a
											key={`${event.title}-${i}`}
											href={event.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-zinc-800/30"
										>
											<span className="text-lg">{event.flag}</span>
											<span className="w-24 shrink-0 font-mono text-sm tracking-wider text-zinc-400 uppercase">
												{event.date}
											</span>
											<span className="flex-1 text-base text-white transition-colors group-hover:text-white">
												{event.title}
											</span>
											<TypeBadge type={event.type} />
											<i className="ri-arrow-right-up-line text-zinc-500 transition-colors group-hover:text-zinc-300" />
										</a>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export function EventsPage() {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white antialiased">
			{/* Dithered background overlay - subtle texture across entire page */}
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

			<Navigation />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
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

			{/* Main Content */}
			<main id="main-content" className="relative w-full">
				{/* Hero Section */}
				<section className="relative pt-32 pb-8 md:pt-40 md:pb-12">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Events
						</p>
						<h1 className="max-w-2xl text-4xl font-bold text-white md:text-5xl">
							Effect is everywhere
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-zinc-400">
							Meetups, conferences, and community events where developers build,
							learn, and share what they're doing with Effect.
						</p>
					</div>
				</section>

				{/* Events Tabbed Section */}
				<EventsTabSection />

				{/* Meetup photos - visual break between events and host section */}
				<div className="mx-auto w-full max-w-[73.75rem] px-4 py-16 md:py-24">
					<div className="grid h-40 grid-cols-5 gap-2 md:h-56">
						<div className="overflow-hidden rounded-lg">
							<img
								src="https://cdn.prod.website-files.com/65001a5c49ae13d89bb13849/67541ec78710618b4a23644e_paris-nov-6%201.avif"
								alt="Effect Paris Meetup"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="https://cdn.prod.website-files.com/65001a5c49ae13d89bb13849/67541ec787acf92381d7f6d5_image%2012.avif"
								alt="Effect Days event"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="https://cdn.prod.website-files.com/65001a5c49ae13d89bb13849/67541ec71d9a01ce66f0005c_PXL_20241022_032527962.MP%201.avif"
								alt="Effect SF Meetup"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="https://cdn.prod.website-files.com/65001a5c49ae13d89bb13849/6766cb1aa6a05d76a30e92ad_award-sandro%201.avif"
								alt="Effect Days award ceremony"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="https://cdn.prod.website-files.com/65001a5c49ae13d89bb13849/67541ec7f327ac143862b510_image%209.avif"
								alt="Effect meetup gathering"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="h-px w-full bg-zinc-800" />
				</div>

				{/* Host Your Own Meetup Section */}
				<section id="host" className="py-24 md:pt-40 md:pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="mb-20">
							<p className="mb-2 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								// Host a Meetup
							</p>
							<h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
								Bring Effect to your city
							</h2>
							<p className="max-w-2xl text-base text-zinc-400">
								We want Effect meetups everywhere. If you're willing to
								organize, we'll make sure you're not doing it alone.
							</p>
							<div className="mt-6 flex flex-wrap gap-3">
								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
								>
									<i className="ri-discord-fill" />
									Join #events-hub
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-base font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800"
								>
									<i className="ri-file-list-3-line" />
									Fill out the form
								</a>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
							{hostPerks.map((perk) => (
								<div key={perk.title} className="flex flex-col">
									<div
										className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
										style={{
											background:
												"linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
										}}
									>
										<i
											className={`${perk.icon} text-lg`}
											style={{
												background: "linear-gradient(135deg, #34d399, #8b5cf6)",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
											}}
										/>
									</div>
									<h3 className="text-base font-semibold text-white">
										{perk.title}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-zinc-400">
										{perk.description}
									</p>
									{perk.href && (
										<a
											href={perk.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors"
										>
											<span className="underline decoration-zinc-600 underline-offset-4 transition-colors group-hover/link:decoration-white">
												{perk.linkLabel}
											</span>
											<i className="ri-arrow-right-up-line text-xs" />
										</a>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Divider */}
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="h-px w-full bg-zinc-800" />
				</div>

				{/* Community CTA */}
				<section className="py-24 md:pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 md:p-12">
							{/* Background gradient */}
							<div
								className="pointer-events-none absolute inset-0 opacity-50"
								style={{
									background:
										"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
								}}
							/>

							<div className="relative">
								<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Community
								</p>
								<h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
									Can't find an event near you?
								</h2>
								<p className="mb-8 max-w-2xl text-base text-zinc-400">
									The Effect community is active every day on Discord. Ask
									questions, share what you're building, or find other
									organizers in your area.
								</p>

								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
								>
									<i className="ri-discord-fill" />
									Join Discord
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
