import { useState, useEffect } from "react";
import { getAssetPath } from "../../utils/assetPath";

const LOGO_POOL = [
	getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
	getAssetPath("/assets/logos/14-ai.svg"),
	getAssetPath("/assets/logos/warp-logo-white.svg"),
	getAssetPath("/assets/logos/spiko-logo.svg"),
	getAssetPath("/assets/logos/expand-ai.svg"),
	getAssetPath("/assets/logos/zendesk-logo.svg"),
	getAssetPath("/assets/logos/open-router.svg"),
	getAssetPath("/assets/logos/masterclass-nom.svg"),
];

const useCases = [
	{
		logo: getAssetPath("/assets/logos/zendesk-logo.svg"),
		title: "Backend",
		href: "https://youtu.be/rNAqPHBQFEQ",
		alt: "Zendesk",
	},
	{
		logo: getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
		title: "Infrastructure",
		href: "https://youtu.be/VZpr91dU03c",
		alt: "Vercel",
	},
	{
		logo: getAssetPath("/assets/logos/expand-ai.svg"),
		title: "AI Agents",
		href: "#",
		alt: "Expand",
	},
	{
		logo: getAssetPath("/assets/logos/spiko-logo.svg"),
		title: "Fintech",
		href: "https://youtu.be/lFOHVZnJLew",
		alt: "Spiko",
	},
	{
		logo: getAssetPath("/assets/logos/open-router.svg"),
		title: "Internal Tooling",
		href: "#",
		alt: "OpenRouter",
	},
	{
		logo: getAssetPath("/assets/logos/warp-logo-white.svg"),
		title: "HR Systems",
		href: "#",
		alt: "Warp",
	},
	{
		logo: getAssetPath("/assets/logos/14-ai.svg"),
		title: "AI Customer Service",
		href: "#",
		alt: "14.ai",
	},
	{
		logo: getAssetPath("/assets/logos/masterclass-nom.svg"),
		title: "Voice AI Orchestration",
		href: "#",
		alt: "MasterClass",
	},
];

const VISIBLE_LOGOS_COUNT = 7;
const CYCLE_INTERVAL = 3000; // 3 seconds

export function TestimonialsSection() {
	const [visibleIndices, setVisibleIndices] = useState<number[]>(() =>
		Array.from({ length: VISIBLE_LOGOS_COUNT }, (_, i) => i)
	);
	const [fadingIndex, setFadingIndex] = useState<number | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			// Pick a random visible slot to replace
			const slotToReplace = Math.floor(Math.random() * VISIBLE_LOGOS_COUNT);

			// Find a logo that's not currently visible
			const availableLogos = LOGO_POOL
				.map((_, i) => i)
				.filter(i => !visibleIndices.includes(i));

			if (availableLogos.length === 0) return;

			const newLogoIndex = availableLogos[Math.floor(Math.random() * availableLogos.length)];

			// Start fade out
			setFadingIndex(slotToReplace);

			// After fade out, swap the logo and fade back in
			setTimeout(() => {
				setVisibleIndices(prev => {
					const newIndices = [...prev];
					newIndices[slotToReplace] = newLogoIndex;
					return newIndices;
				});
				setFadingIndex(null);
			}, 500);
		}, CYCLE_INTERVAL);

		return () => clearInterval(interval);
	}, [visibleIndices]);

	return (
		<section className="relative py-16 md:py-20">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-10 text-center">
					<p className="mb-3 font-mono text-sm uppercase tracking-wider text-zinc-500">
						Trusted in Production
					</p>
					<h2 className="text-2xl font-semibold text-white md:text-3xl">
						Real-world production systems
					</h2>
				</div>

				{/* Use Case Cards - 4 columns */}
				<div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-4">
					{useCases.map((useCase, index) => (
						<a
							key={index}
							href={useCase.href}
							{...(useCase.href.startsWith("http")
								? { target: "_blank", rel: "noopener noreferrer" }
								: {})}
							className="group flex flex-col bg-zinc-950 transition-colors hover:bg-zinc-900"
						>
							{/* Logo area */}
							<div className="flex h-24 items-center justify-center px-4">
								<img
									src={useCase.logo}
									alt={useCase.alt}
									className={`w-auto max-w-[120px] object-contain opacity-60 transition-opacity group-hover:opacity-100 ${
										useCase.alt === "MasterClass" ? "h-4" : "h-5"
									}`}
								/>
							</div>
							{/* Label */}
							<div className="flex items-center justify-center gap-1.5 border-t border-zinc-800 px-3 py-2.5">
								<span className="text-xs font-mono text-zinc-400 transition-colors group-hover:text-zinc-300">
									{useCase.title}
								</span>
								<i className="ri-arrow-right-up-line text-xs text-zinc-500 transition-colors group-hover:text-zinc-400" />
							</div>
						</a>
					))}
				</div>

				{/* Logo Strip - Secondary, connected to cards */}
				<div className="relative mt-6">
					{/* Connector line from cards */}
					<div className="absolute left-1/2 -top-6 h-6 w-px -translate-x-[0.5px] bg-gradient-to-b from-zinc-800 to-zinc-800/0" />

					{/* Label */}
					<p className="mb-4 text-center text-[11px] uppercase tracking-widest text-zinc-600">
						And many more
					</p>

					{/* Logo slots */}
					<div className="flex items-center justify-center gap-12">
						{visibleIndices.map((logoIndex, slotIndex) => (
							<div
								key={`slot-${slotIndex}`}
								className="flex h-8 w-24 items-center justify-center"
							>
								<img
									src={LOGO_POOL[logoIndex]}
									alt=""
									className={`h-3.5 max-w-full w-auto object-contain transition-opacity duration-500 ${
										fadingIndex === slotIndex ? "opacity-0" : "opacity-25"
									}`}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
