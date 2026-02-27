import { useCallback, useEffect, useRef, useState } from "react";
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
		year: "2026",
		events: [
			{
				flag: "🇫🇷",
				date: "Feb",
				title: "Effect Paris Meetup #6",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇩🇪",
				date: "Jan",
				title: "Effect Berlin Meetup #2",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
		],
	},
	{
		year: "2025",
		events: [
			{
				flag: "🇦🇹",
				date: "Dec",
				title: "Effect Vienna Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇺🇸",
				date: "Nov",
				title: "Effect-TS: ZIO through the lens of TypeScript",
				type: "meetup",
				href: "https://www.meetup.com/dallas-scala-enthusiasts/events/311520686/?utm_medium=referral&utm_campaign=announce_event&utm_source=twitter&utm_version=v2",
			},
			{
				flag: "🇮🇹",
				date: "Nov",
				title: "Effect: crafting 🍕 made simple",
				type: "meetup",
				href: "https://www.meetup.com/pug-sondrio/events/311976213/?eventOrigin=group_featured_event",
			},
			{
				flag: "🇩🇪",
				date: "Nov",
				title: "Effect Berlin Meetup #1",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇩🇪",
				date: "Nov",
				title: "Effect Hamburg Meetup #2",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇺🇸",
				date: "Nov",
				title: "Effect NYC Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇫🇷",
				date: "Oct",
				title: "Introduction à Effect.TS par la pratique",
				type: "meetup",
				href: "https://www.eventbrite.fr/e/atondev-introduction-a-effectts-par-la-pratique-tickets-1685513629639",
			},
			{
				flag: "🇺🇸",
				date: "Oct",
				title: "Effect SF Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇮🇹",
				date: "Oct",
				title: "Effect Milan Meetup",
				type: "meetup",
				href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B-8m3AT2Cf_oGUL-wX77KUJ",
			},
			{
				flag: "🇫🇷",
				date: "Jun",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇫🇷",
				date: "May",
				title: "Effect Paris Meetup #5",
				type: "meetup",
				href: "https://www.meetup.com/effect-paris/events/307558421/?eventOrigin=group_past_events",
			},
			{
				flag: "🇺🇸",
				date: "May",
				title: "Effect Meetup SF",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
			{
				flag: "🇮🇹",
				date: "Mar 19-21",
				title: "Effect Days Livorno",
				type: "conference",
				href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP",
			},
			{
				flag: "🇫🇷",
				date: "Jan",
				title: "Effect Paris Meetup #4",
				type: "meetup",
				href: "https://www.meetup.com/effect-paris/events/305180933/?eventOrigin=group_past_events",
			},
		],
	},
	{
		year: "2024",
		events: [
			{
				flag: "🇫🇷",
				date: "Dec 12",
				title: "Paris TypeScript Meetup",
				type: "meetup",
				href: "https://www.meetup.com/paris-typescript/",
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
				flag: "🇦🇹",
				date: "Nov 26",
				title: "React Meetup Vienna",
				type: "meetup",
				href: "https://www.meetup.com/reactvienna/",
			},
			{
				flag: "🇺🇸",
				date: "Oct 21",
				title: "Effect Meetup SF",
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
				flag: "🇫🇷",
				date: "May 23",
				title: "Local-First Conf",
				type: "conference",
				href: "https://www.localfirstconf.com/",
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
				date: "Apr 23",
				title: "Effect Paris Meetup",
				type: "meetup",
				href: "https://luma.com/effect-community?k=c",
			},
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
		],
	},
];

const hostPerks = [
	{
		icon: "ri-megaphone-line",
		title: "Promotional support",
		description:
			"We love spreading the word! Every Effect-dedicated event gets shared with our network and community on socials and Discord.",
	},
	{
		icon: "ri-team-line",
		title: "Direct line to the team",
		description:
			"Got questions about running your event? The Effect team is just a message away on Discord.",
	},
	{
		icon: "ri-palette-line",
		title: "Banners and assets",
		description:
			"Logos, event templates, and branding assets ready to drop into your meetup page or slides.",
		href: "https://www.figma.com/community/file/effect-event-assets",
		linkLabel: "Figma kit",
	},
	{
		icon: "ri-git-repository-line",
		title: "GitHub repo template",
		description:
			"A template for talk submissions as issues, a code of conduct, and organizer checklists.",
		href: "https://github.com/effect-ts-community/meetup-template",
		linkLabel: "View on GitHub",
	},
];

function getLocationFromSrc(src: string): string {
	const filename = src.split("/").pop() ?? "";
	const name = filename
		.replace(/\.(avif|webp|jpg|png)$/, "")
		.replace(/_compressed$/, "")
		.replace(/[-_]\d+$/, "");

	const locationMap: Record<string, string> = {
		paris: "Paris",
		"meetup-paris": "Paris",
		milan: "Milan",
		"milan-giulio": "Milan",
		nyc: "NYC",
		hamburg: "Hamburg",
		"meetup-sf": "San Francisco",
		"amsterdam-award-sandro": "Amsterdam",
	};

	return locationMap[name] ?? name;
}

function PhotoCard({ src, alt }: { src: string; alt: string }) {
	const location = getLocationFromSrc(src);
	return (
		<div className="relative h-full flex-shrink-0 overflow-hidden rounded-lg">
			<img
				src={src}
				alt={alt}
				className="pointer-events-none h-full w-full object-cover select-none"
				loading="lazy"
				draggable={false}
			/>
			<span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm md:bottom-2 md:left-2 md:px-2.5 md:text-xs">
				{location}
			</span>
		</div>
	);
}

const heroPhotos = [
	{ src: "/assets/images/meetup-paris.avif", alt: "Effect Paris Meetup" },
	{
		src: "/assets/images/milan-1_compressed.webp",
		alt: "Effect Milan Meetup",
	},
	{ src: "/assets/images/nyc-1_compressed.webp", alt: "Effect NYC Meetup" },
	{
		src: "/assets/images/paris-1_compressed.webp",
		alt: "Effect Paris Meetup",
	},
	{ src: "/assets/images/meetup-sf.avif", alt: "Effect SF Meetup" },
	{
		src: "/assets/images/hamburg-1_compressed.webp",
		alt: "Effect Hamburg Meetup",
	},
	{
		src: "/assets/images/amsterdam-award-sandro.avif",
		alt: "Effect Amsterdam award ceremony",
	},
	{
		src: "/assets/images/milan-giulio_compressed.webp",
		alt: "Giulio at Effect Milan Meetup",
	},
	{ src: "/assets/images/nyc-2_compressed.webp", alt: "Effect NYC Meetup" },
	{
		src: "/assets/images/paris-2_compressed.webp",
		alt: "Effect Paris Meetup",
	},
	{ src: "/assets/images/meetup-sf-2.avif", alt: "Effect SF Meetup" },
];

function HeroPhotoStrip() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	const isPausedRef = useRef(false);
	const isDraggingRef = useRef(false);
	const dragStartXRef = useRef(0);
	const dragScrollLeftRef = useRef(0);

	// 11 photos, each 256px + 16px gap on desktop
	const cardWidth = 256;
	const gap = 16;
	const singleSetWidth = heroPhotos.length * (cardWidth + gap);

	// Seamless reset: silently jump scroll position when crossing boundaries
	const normalizeScroll = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		// We have 3 copies. Keep scroll within the middle copy.
		if (el.scrollLeft >= singleSetWidth * 2) {
			el.scrollLeft -= singleSetWidth;
		} else if (el.scrollLeft <= 0) {
			el.scrollLeft += singleSetWidth;
		}
	}, [singleSetWidth]);

	// Auto-scroll via requestAnimationFrame for buttery smoothness
	const tick = useCallback(() => {
		if (!isPausedRef.current && scrollRef.current) {
			scrollRef.current.scrollLeft += 0.5;
			normalizeScroll();
		}
		rafRef.current = requestAnimationFrame(tick);
	}, [normalizeScroll]);

	// Start animation loop once on mount
	useEffect(() => {
		// Initialize scroll to the middle copy
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = singleSetWidth;
		}
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [tick, singleSetWidth]);

	// Normalize after any user scroll (drag or touch)
	const handleScroll = () => normalizeScroll();

	// Pause on hover
	const handleMouseEnter = () => {
		isPausedRef.current = true;
	};
	const handleMouseLeave = () => {
		isPausedRef.current = false;
		isDraggingRef.current = false;
	};

	// Mouse drag
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollRef.current) return;
		isDraggingRef.current = true;
		isPausedRef.current = true;
		dragStartXRef.current = e.pageX;
		dragScrollLeftRef.current = scrollRef.current.scrollLeft;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDraggingRef.current || !scrollRef.current) return;
		e.preventDefault();
		const walk = (e.pageX - dragStartXRef.current) * 1.5;
		scrollRef.current.scrollLeft = dragScrollLeftRef.current - walk;
	};

	const handleMouseUp = () => {
		isDraggingRef.current = false;
	};

	// Touch: pause auto-scroll while touching
	const handleTouchStart = () => {
		isPausedRef.current = true;
	};
	const handleTouchEnd = () => {
		isPausedRef.current = false;
	};

	return (
		<div className="relative z-[70] overflow-hidden pb-16 md:pb-24">
			<div
				ref={scrollRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onScroll={handleScroll}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				className="scrollbar-hide flex cursor-grab gap-3 overflow-x-auto select-none active:cursor-grabbing md:gap-4"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{[...heroPhotos, ...heroPhotos, ...heroPhotos].map((photo, i) => (
					<div
						key={`photo-${i}`}
						className="h-36 w-52 shrink-0 md:h-48 md:w-64"
					>
						<PhotoCard src={getAssetPath(photo.src)} alt={photo.alt} />
					</div>
				))}
			</div>

			{/* Left fade */}
			<div
				className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 md:w-40"
				style={{
					background: "linear-gradient(to right, rgb(9 9 11), transparent)",
				}}
			/>
			{/* Right fade */}
			<div
				className="pointer-events-none absolute top-0 right-0 bottom-0 w-24 md:w-40"
				style={{
					background: "linear-gradient(to left, rgb(9 9 11), transparent)",
				}}
			/>
		</div>
	);
}

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
			className={`rounded-full border px-2 py-0.5 text-xs ${styles[type] || styles.meetup}`}
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
					<div className="mx-auto w-full max-w-[73.75rem] px-4 text-center">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Effect Events
						</p>
						<h1 className="mx-auto max-w-2xl text-4xl font-bold text-white md:text-5xl">
							Effect is everywhere
						</h1>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
							From local meetups to international conferences, the Effect
							community keeps growing — and we'd love to see you there.
						</p>
					</div>
				</section>

				{/* Hero photo strip */}
				<HeroPhotoStrip />

				{/* Events Tabbed Section */}
				<EventsTabSection />

				{/* Divider */}
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="h-px w-full bg-zinc-800" />
				</div>

				{/* Effect Days Section */}
				<section className="py-24 md:pt-40 md:pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="mb-12">
							<p className="mb-2 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								// Effect Days
							</p>
							<h2 className="mb-3 max-w-2xl text-2xl font-semibold text-white md:text-3xl">
								A conference for TypeScript and Effect engineers worldwide
							</h2>
							<p className="max-w-2xl text-lg text-zinc-400">
								Two editions, 34 talks, real production stories, and a community
								that shows up from around the world. Catch up on everything you
								missed.
							</p>
						</div>

						{/* Past Editions */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Effect Days 2024 */}
							<a
								href="https://www.youtube.com/playlist?list=PLDf3uQLaK2B9a4tbMgGd9wFeEnMA50z4w"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
							>
								<div className="relative aspect-video overflow-hidden">
									<img
										src={getAssetPath("/assets/images/ed-24-2.png")}
										alt="Effect Days 2024 — Vienna"
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									/>
									{/* Base gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/5" />
									{/* Permanent violet tint */}
									<div className="absolute inset-0 bg-violet-500/10 transition-colors duration-300 group-hover:bg-violet-500/15" />
									<div className="absolute right-4 bottom-3 left-4 flex items-center justify-between">
										<span className="font-mono text-xs font-medium tracking-wider text-white/80 uppercase">
											Inaugural Edition
										</span>
										<span className="flex items-center gap-1.5 text-xs text-white/60 transition-colors duration-300 group-hover:text-white/90">
											<i className="ri-youtube-fill text-sm" />
											Watch playlist
										</span>
									</div>
								</div>
								<div className="flex flex-1 flex-col p-5">
									<h3 className="text-lg font-semibold text-white">
										Effect Days 2024
									</h3>
									<div className="mt-1.5 flex items-center gap-3 text-sm text-zinc-400">
										<span className="flex items-center gap-1">
											<i className="ri-map-pin-line" />
											Vienna, Austria 🇦🇹
										</span>
										<span>·</span>
										<span>Feb 22–24</span>
									</div>
									<p className="mt-3 text-sm text-zinc-400">
										Where the Effect community gathered for the first time. 15
										talks and 2 workshops, from early experiments to production
										systems.
									</p>
								</div>
							</a>

							{/* Effect Days 2025 */}
							<a
								href="https://www.youtube.com/playlist?list=PLDf3uQLaK2B9bEBZbwMv04e_zSbRNPKH6"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
							>
								<div className="relative aspect-video overflow-hidden">
									<img
										src={getAssetPath("/assets/images/ed-25-2.png")}
										alt="Effect Days 2025 — Livorno"
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									/>
									{/* Base gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/5" />
									{/* Permanent violet tint */}
									<div className="absolute inset-0 bg-violet-500/10 transition-colors duration-300 group-hover:bg-violet-500/15" />
									<div className="absolute right-4 bottom-3 left-4 flex items-center justify-between">
										<span className="font-mono text-xs font-medium tracking-wider text-white/80 uppercase">
											2nd Edition
										</span>
										<span className="flex items-center gap-1.5 text-xs text-white/60 transition-colors duration-300 group-hover:text-white/90">
											<i className="ri-youtube-fill text-sm" />
											Watch playlist
										</span>
									</div>
								</div>
								<div className="flex flex-1 flex-col p-5">
									<h3 className="text-lg font-semibold text-white">
										Effect Days 2025
									</h3>
									<div className="mt-1.5 flex items-center gap-3 text-sm text-zinc-400">
										<span className="flex items-center gap-1">
											<i className="ri-map-pin-line" />
											Livorno, Italy 🇮🇹
										</span>
										<span>·</span>
										<span>Mar 19–21</span>
									</div>
									<p className="mt-3 text-sm text-zinc-400">
										Advanced use cases and real production stories. 19 talks and
										2 workshops showing the evolution of Effect in the real
										world.
									</p>
								</div>
							</a>
						</div>
					</div>
				</section>

				{/* Divider */}
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="h-px w-full bg-zinc-800" />
				</div>
				<section id="host" className="py-24 md:pt-40 md:pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="mb-20">
							<p className="mb-2 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								// Host a Meetup
							</p>
							<h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
								Bring Effect to your city
							</h2>
							<p className="max-w-2xl text-lg text-zinc-400">
								If you're willing to organize, we'll make sure you're not doing
								it alone. Reach out anytime on Discord or through our contact
								form.
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

						<div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
							{hostPerks.map((perk) => (
								<div key={perk.title} className="flex gap-4">
									<div
										className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
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
									<div>
										<h3 className="text-base font-semibold text-white">
											{perk.title}
										</h3>
										<p className="mt-1 text-base text-zinc-400">
											{perk.description}
										</p>
										{perk.href && (
											<a
												href={perk.href}
												target="_blank"
												rel="noopener noreferrer"
												className="group/link mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors"
											>
												<span className="underline decoration-zinc-600 underline-offset-4 transition-colors group-hover/link:decoration-white">
													{perk.linkLabel}
												</span>
												<i className="ri-arrow-right-up-line text-xs" />
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="h-px w-full bg-zinc-800" />
				</div>
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
									// Effect Community
								</p>
								<h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
									Can't find an event near you?
								</h2>
								<p className="mb-8 max-w-2xl text-base text-zinc-400">
									No worries — the Effect community is online every day.
									Thousands of developers are already on Discord sharing ideas,
									asking questions, and helping each other ship.
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
