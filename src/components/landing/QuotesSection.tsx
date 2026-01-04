import { useRef, useState } from "react";

function QuoteCard({
	text,
	author,
	company,
	logo,
	logoSize = "h-4",
}: {
	text: string;
	author: string;
	company: string;
	logo?: string;
	logoSize?: string;
}) {
	return (
		<div
			className="flex h-[18.125rem] w-[calc(73.75rem*0.5-10px)] flex-shrink-0 flex-col rounded-md p-8 border border-zinc-700 bg-zinc-900/30"
		>
			<p className="text-lg leading-relaxed text-zinc-300">
				"{text}"
			</p>
			<div className="mt-auto flex w-full items-center gap-4">
				<div className="flex items-center gap-3">
					<span className="font-medium text-white">
						{author}
					</span>
				</div>
				<div
					className="h-[1px] flex-grow"
					style={{
						background:
							"linear-gradient(to right, transparent 0%, rgba(63, 63, 70, 1) 100%)",
					}}
				/>
				{logo ? (
					<img src={logo} alt={company} className={logoSize} />
				) : (
					<i className="ri-twitter-x-line text-lg text-zinc-300 flex items-center" />
				)}
			</div>
		</div>
	);
}

export function QuotesGridSection() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const quotes = [
		{
			text: "Effect makes doing the hard, tedious, and error-prone tasks that require discipline, easy, natural, first-class.",
			author: "Dillon Mulroy",
			company: "Cloudflare",
			logo: "/assets/Cloudflare_logo_wht 2.svg",
		},
		{
			text: "Effect tracing is simply magical. Was able to fully integrate with our existing microservice observability stack fairly easily.",
			author: "Zach Warunek",
			company: "Twitter",
			logo: undefined,
		},
		{
			text: "I feel like I'm writing some of the best code in my career using Effect.",
			author: "Matt Pocock",
			company: "Total TypeScript",
			logo: "/assets/logos/total-typescript-logo.png",
		},
		{
			text: "Perhaps the most ergonomic and safe method of Dependency Injection I've ever seen.",
			author: "Cor",
			company: "Union Build",
			logo: "/assets/logos/union-build.svg",
		},
		{
			text: "Effect puts you on the path to writing more performant async code by default.",
			author: "Ethan Niser",
			company: "Vercel",
			logo: "/assets/logos/vercel-logotype-dark.svg",
		},
		{
			text: "The real-world impact is tangible: few production bugs, simple testing, and clear code organization.",
			author: "Samuel Briole",
			company: "Spiko",
			logo: "/assets/logos/spiko-logo.svg",
		},
		{
			text: "The spaghetti code really turns into something that's just very linear and clean.",
			author: "David Golightly",
			company: "Masterclass",
			logo: "/assets/logos/masterclass-nom.svg",
			logoSize: "h-2.5",
		},
		{
			text: "I think it's one of the most important libraries being developed today.",
			author: "Matthew Phillips",
			company: "Astro",
			logo: "/assets/Astro.svg",
		},
	];

	const cardWidth = 320;
	const gap = 16;

	const scroll = (direction: "left" | "right") => {
		if (!scrollContainerRef.current) return;

		const container = scrollContainerRef.current;
		const scrollAmount = cardWidth + gap;
		const maxScroll = container.scrollWidth - container.clientWidth;

		if (direction === "right") {
			// If at or near the end, loop back to start
			if (container.scrollLeft >= maxScroll - 10) {
				container.scrollTo({ left: 0, behavior: "smooth" });
			} else {
				container.scrollBy({ left: scrollAmount, behavior: "smooth" });
			}
		} else {
			container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		}
	};

	return (
		<section className="relative z-[70] w-full py-24 md:pt-40 md:pb-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header row with title and navigation arrows */}
				<div className="mb-10 flex items-end justify-between">
					<div>
						<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
							Testimonials
						</p>
						<h2 className="text-2xl font-semibold text-white md:text-3xl">
							What developers are saying...
						</h2>
					</div>
					{/* Navigation arrows */}
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => scroll("left")}
							className="group flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/50 transition-all hover:border-zinc-500 hover:bg-zinc-800"
							aria-label="Scroll left"
						>
							<i className="ri-arrow-left-line text-base text-zinc-400 transition-colors group-hover:text-white" />
						</button>
						<button
							type="button"
							onClick={() => scroll("right")}
							className="group flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/50 transition-all hover:border-zinc-500 hover:bg-zinc-800"
							aria-label="Scroll right"
						>
							<i className="ri-arrow-right-line text-base text-zinc-400 transition-colors group-hover:text-white" />
						</button>
					</div>
				</div>
			</div>

			{/* Slider container - full width with fade edges */}
			<div className="relative">
				<div
					ref={scrollContainerRef}
					className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						WebkitOverflowScrolling: "touch",
						paddingLeft: "max(1rem, calc((100vw - 73.75rem) / 2 + 1rem))",
						paddingRight: "max(1rem, calc((100vw - 73.75rem) / 2 + 1rem))",
					}}
				>
					{quotes.map((quote, index) => (
						<div
							key={index}
							className="flex h-56 w-80 shrink-0 flex-col rounded-md border border-zinc-700 bg-zinc-950 p-6"
						>
							<p className="line-clamp-4 text-base leading-relaxed text-zinc-400">
								"{quote.text}"
							</p>
							<div className="mt-auto flex items-center justify-between">
								<span className="text-sm font-medium text-zinc-200">
									{quote.author}
								</span>
								{quote.logo ? (
									<img
										src={quote.logo}
										alt={quote.company}
										className={quote.logoSize || "h-4"}
									/>
								) : (
									<i className="ri-twitter-x-line text-lg text-zinc-400 flex items-center" />
								)}
							</div>
						</div>
					))}
				</div>

				{/* Left fade gradient */}
				<div
					className="pointer-events-none absolute left-0 top-0 bottom-0 w-16"
					style={{
						background: "linear-gradient(to right, rgb(9 9 11), transparent)",
					}}
				/>
				{/* Right fade gradient */}
				<div
					className="pointer-events-none absolute right-0 top-0 bottom-0 w-16"
					style={{
						background: "linear-gradient(to left, rgb(9 9 11), transparent)",
					}}
				/>
			</div>
		</section>
	);
}

export function QuotesSection() {
	const quotes = [
		{
			text: "It makes doing the hard, tedious, and error-prone tasks that require discipline, easy, natural, first-class.",
			author: "Dillon Mulroy",
			company: "Cloudflare",
			logo: "/assets/Cloudflare_logo_wht 2.svg",
		},
		{
			text: "I feel like I'm writing some of the best code in my career using Effect.",
			author: "Matt Pocock",
			company: "Total TypeScript",
			logo: "/assets/logos/total-typescript-logo.png",
		},
		{
			text: "Perhaps the most ergonomic and safe method of Dependency Injection I've ever seen.",
			author: "Cor",
			company: "Union Build",
			logo: "/assets/logos/union-build.svg",
		},
		{
			text: "Effect puts you on the path to writing more performant async code by default.",
			author: "Ethan Niser",
			company: "Vercel",
			logo: "/assets/logos/vercel-logotype-dark.svg",
		},
		{
			text: "Effect tracing is simply magical. Was able to fully integrate with our existing microservice observably stack fairly easily.",
			author: "Zach Warunek",
			company: "Twitter",
			logo: undefined,
		},
		{
			text: "The spaghetti code really turns into something that's just very linear and clean, and it really promotes excellent software architecture.",
			author: "David Golightly",
			company: "Masterclass",
			logo: "/assets/logos/masterclass-nom.svg",
			logoSize: "h-2.5",
		},
		{
			text: "The real-world impact is tangible: few production bugs, simple testing, and clear code organization.",
			author: "Samuel Briole",
			company: "Spiko",
			logo: "/assets/logos/spiko-logo.svg",
		},
		{
			text: "I think it's one of the most important libraries being developed today.",
			author: "Matthew Phillips",
			company: "Astro",
			logo: "/assets/Astro.svg",
		},
	];

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = 360; // Card width + gap
			scrollContainerRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			});
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUp = () => setIsDragging(false);

	return (
		<section className="relative z-[70] w-full overflow-hidden bg-zinc-950 py-20 md:py-24">
			{/* Top dashed border */}
			<div
				className="absolute top-0 left-0 right-0 h-[1px]"
				style={{
					background: "#3f3f46",
					WebkitMask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			/>

			<div className="mx-auto flex w-full flex-col gap-8 bg-zinc-950 md:gap-12">
				{/* Header row with title and arrow controls */}
				<div className="max-w-[73.75rem] mx-auto w-full px-4 flex flex-row items-center justify-between">
					<div>
						<p className="mb-2 font-mono text-sm uppercase tracking-wider text-zinc-500">
							Testimonials
						</p>
						<h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
							What developers are saying
						</h2>
					</div>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => scroll('left')}
							className="group w-10 h-10 flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer"
							aria-label="Scroll left"
						>
							<i className="ri-arrow-left-line text-base text-zinc-500 transition-colors group-hover:text-white" />
						</button>
						<button
							type="button"
							onClick={() => scroll('right')}
							className="group w-10 h-10 flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer"
							aria-label="Scroll right"
						>
							<i className="ri-arrow-right-line text-base text-zinc-500 transition-colors group-hover:text-white" />
						</button>
					</div>
				</div>

				{/* Full-width scroll container with internal padding */}
				<div className="relative">
					<div
						ref={scrollContainerRef}
						className="ml-[-2.25rem] flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
						style={{
							WebkitOverflowScrolling: 'touch'
						}}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
					>
						{/* Left spacer to align first card with container */}
						<div className="shrink-0 lg:w-[max(1rem,calc((100vw-73.75rem)/2+1rem))]" />
						{quotes.map((quote, index) => (
							<div key={index} className="shrink-0">
								<QuoteCard
									text={quote.text}
									author={quote.author}
									company={quote.company}
									logo={quote.logo}
									logoSize={quote.logoSize}
								/>
							</div>
						))}
						{/* Right spacer */}
						<div className="shrink-0 w-8" />
					</div>
					{/* Left fade gradient */}
					<div
						className="pointer-events-none absolute left-0 top-0 bottom-0 w-24"
						style={{
							background: 'linear-gradient(to left, transparent, #09090b)'
						}}
					/>
					{/* Right fade gradient */}
					<div
						className="pointer-events-none absolute right-0 top-0 bottom-0 w-24"
						style={{
							background: 'linear-gradient(to right, transparent, #09090b)'
						}}
					/>
				</div>
			</div>

			{/* Bottom dashed border */}
			<div
				className="absolute bottom-0 left-0 right-0 h-[1px]"
				style={{
					background: "#3f3f46",
					WebkitMask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			/>
		</section>
	);
}
