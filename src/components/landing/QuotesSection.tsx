import { useEffect, useRef, useState } from "react";

function QuoteCard({
	text,
	author,
	company,
	logo,
	bgColor,
	logoSize = "h-4",
}: {
	text: string;
	author: string;
	company: string;
	logo?: string;
	bgColor?: "default" | "zinc-900";
	logoSize?: string;
}) {
	return (
		<div
			className={`flex h-[280px] w-[341px] flex-shrink-0 flex-col justify-between rounded-2xl p-8 ${
				bgColor === "zinc-900" ? "bg-zinc-900" : "border border-zinc-700"
			}`}
		>
			<p className="text-[20px] leading-snug text-zinc-100">{text}</p>
			<div className="flex w-full items-center gap-4">
				<span className="font-mono text-base uppercase text-white">
					{author}
				</span>
				<div
					className="h-[1px] flex-grow"
					style={{
						background:
							"linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
					}}
				/>
				{logo ? (
					<img src={logo} alt={company} className={logoSize} />
				) : (
					<i className="ri-twitter-x-line text-lg text-white"></i>
				)}
			</div>
		</div>
	);
}

export function QuotesSection() {
	const quotes = [
		{
			text: "Perhaps the most ergonomic and safe method of Dependency Injection I've ever seen.",
			author: "Cor",
			company: "Union Build",
			logo: "/assets/logos/union-build.svg",
			bgColor: "default" as const,
		},
		{
			text: "It makes doing the hard, tedious, and error-prone tasks that require discipline, easy, natural, first-class.",
			author: "Dillon Mulroy",
			company: "Vercel",
			logo: "/assets/logos/vercel-logotype-dark.svg",
			bgColor: "zinc-900" as const,
		},
		{
			text: "I feel like I'm writing some of the best code in my career using Effect.",
			author: "Matt Pocock",
			company: "TypeScript Wizard",
			logo: "/assets/logos/Pocock.svg",
			bgColor: "default" as const,
			logoSize: "h-8",
		},
		{
			text: "Effect tracing is simply magical. Was able to fully integrate with our existing microservice observably stack fairly easily.",
			author: "Zach Warunek",
			company: "Twitter",
			logo: undefined,
			bgColor: "zinc-900" as const,
		},
		{
			text: "The spaghetti code really turns into something that's just very linear and clean, and it really promotes excellent software architecture.",
			author: "David Golightly",
			company: "Masterclass",
			logo: "/assets/logos/masterclass-nom.svg",
			bgColor: "default" as const,
			logoSize: "h-2.5",
		},
		{
			text: "Effect puts you on the path to writing more performant async code by default.",
			author: "Ethan Niser",
			company: "Vercel",
			logo: "/assets/logos/vercel-logotype-dark.svg",
			bgColor: "zinc-900" as const,
		},
		{
			text: "The real-world impact is tangible: few production bugs, simple testing, and clear code organization.",
			author: "Samuel Briole",
			company: "Spiko",
			logo: "/assets/logos/spiko-logo.svg",
			bgColor: "default" as const,
		},
		{
			text: "I think it's one of the most important libraries being developed today.",
			author: "Matthew Phillips",
			company: "Astro",
			logo: "/assets/logos/Astro.svg",
			bgColor: "zinc-900" as const,
		},
	];

	const containerRef = useRef<HTMLDivElement>(null);
	const positionRef = useRef(0);
	const isHoveringRef = useRef(false);
	const animationIdRef = useRef<number | null>(null);
	const singleSetWidthRef = useRef(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Calculate the width of one set of quotes (half the total width) - only once
		singleSetWidthRef.current = container.scrollWidth / 2;
		const speed = 0.5; // pixels per frame

		function animate() {
			if (!isHoveringRef.current) {
				positionRef.current -= speed;

				// Reset position when we've scrolled exactly one set width
				if (Math.abs(positionRef.current) >= singleSetWidthRef.current) {
					positionRef.current = 0;
				}

				container.style.transform = `translateX(${positionRef.current}px)`;
			}

			animationIdRef.current = requestAnimationFrame(animate);
		}

		// Start animation
		animate();

		return () => {
			if (animationIdRef.current !== null) {
				cancelAnimationFrame(animationIdRef.current);
			}
		};
	}, []); // Empty deps - only run once

	// Handle hover state separately without restarting animation
	const handleMouseEnter = () => {
		isHoveringRef.current = true;
	};

	const handleMouseLeave = () => {
		isHoveringRef.current = false;
	};

	return (
		<section className="relative w-full py-20 md:py-32">
			{/* Top solid border */}
			<div className="absolute top-0 left-0 right-0 h-[1px] bg-zinc-700" />

			<div className="mx-auto flex w-full flex-col items-center gap-12 md:gap-16">
				<h2 className="px-4 text-center text-3xl font-bold leading-tight text-white md:px-8">
					What developers are saying...
				</h2>

				<div className="relative w-full overflow-hidden">
					<div
						ref={containerRef}
						className="flex gap-5 cursor-grab active:cursor-grabbing select-none"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						{/* First set of quotes */}
						{quotes.map((quote, index) => (
							<QuoteCard
								key={`first-${index}`}
								text={quote.text}
								author={quote.author}
								company={quote.company}
								logo={quote.logo}
								bgColor={quote.bgColor}
								logoSize={quote.logoSize}
							/>
						))}
						{/* Duplicated set for seamless infinite scroll */}
						{quotes.map((quote, index) => (
							<QuoteCard
								key={`second-${index}`}
								text={quote.text}
								author={quote.author}
								company={quote.company}
								logo={quote.logo}
								bgColor={quote.bgColor}
								logoSize={quote.logoSize}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Bottom solid border */}
			<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-700" />
		</section>
	);
}
