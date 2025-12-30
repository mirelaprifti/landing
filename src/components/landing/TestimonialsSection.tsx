import { useState, useEffect } from "react";
import { getAssetPath } from "../../utils/assetPath";

const LOGO_POOL = [
	getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
	getAssetPath("/assets/logos/14-ai.svg"),
	getAssetPath("/assets/logos/warp-logo-white.svg"),
	getAssetPath("/assets/logos/spiko-logo.svg"),
	getAssetPath("/assets/logos/expand-ai.svg"),
	getAssetPath("/assets/logos/open-router.svg"),
	getAssetPath("/assets/logos/masterclass-nom.svg"),
	getAssetPath("/assets/logos/union-build.svg"),
	getAssetPath("/assets/logos/coralogix-logo.svg"),
	getAssetPath("/assets/logos/opengov-2025-white.svg"),
	getAssetPath("/assets/logos/vitalizecare.svg"),
	getAssetPath("/assets/logos/CalcTree-logo.svg"),
	getAssetPath("/assets/logos/Fortanix-logo-white-version.svg"),
	getAssetPath("/assets/logos/Geodis-Logo.svg"),
	getAssetPath("/assets/logos/ainavio.svg"),
	getAssetPath("/assets/logos/dreifach-logo.svg"),
	getAssetPath("/assets/logos/embedded-insurance-logo.svg"),
	getAssetPath("/assets/logos/freckle-logo.svg"),
];

const useCases = [
	{
		logo: getAssetPath("/assets/logos/masterclass-nom.svg"),
		title: "Voice AI Orchestration",
		href: "https://youtu.be/Cj2pVPqdOVs",
		alt: "MasterClass",
		thumbnail: getAssetPath("/assets/images/david-golightly – banner_compressed.webp"),
	},
	{
		logo: getAssetPath("/assets/logos/warp-logo-white.svg"),
		title: "HR Systems",
		href: "https://youtu.be/2cN1R9zIxp4",
		alt: "Warp",
		thumbnail: getAssetPath("/assets/images/adam-rankin-banner_compressed.webp"),
	},
	{
		logo: getAssetPath("/assets/logos/open-router.svg"),
		title: "Internal Tooling",
		href: "https://youtu.be/x6-AVCwBIWc",
		alt: "OpenRouter",
		thumbnail: getAssetPath("/assets/images/louis-vichy– banner_compressed.webp"),
	},
	{
		logo: getAssetPath("/assets/logos/14-ai.svg"),
		title: "AI Customer Service",
		href: "https://youtu.be/gGFPhFrGCng",
		alt: "14.ai",
		thumbnail: getAssetPath("/assets/images/michael-fester – banner_compressed (1).webp"),
	},
];

const VISIBLE_LOGOS_COUNT = 8;
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
		<section className="relative py-16 md:pt-32 md:pb-8">
			{/* Header - with padding */}
			<div className="mx-auto w-full max-w-[73.75rem] px-4 mb-10">
				<p className="mb-3 font-mono font-semibold text-sm uppercase tracking-wider text-zinc-400">
					Trusted in Production
				</p>
				<h2 className="text-2xl font-semibold text-white md:text-3xl">
					Real-world production systems
				</h2>
				{/* Resource links */}
				<div className="mt-5 flex flex-wrap items-center gap-6">
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE"
						target="_blank"
						rel="noopener noreferrer"
						className="text-base text-zinc-100 transition-colors hover:text-white"
					>
						Cause & Effect Podcast <i className="ri-arrow-right-up-line" />
					</a>
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-white transition-colors hover:text-white"
					>
						Effect Days 2024 <i className="ri-arrow-right-up-line" />
					</a>
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-white transition-colors hover:text-white"
					>
						Effect Days 2025 <i className="ri-arrow-right-up-line" />
					</a>
				</div>
			</div>

			{/* Use Case Cards - Video thumbnails grid */}
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{useCases.map((useCase, index) => (
						<a
							key={index}
							href={useCase.href}
							{...(useCase.href.startsWith("http")
								? { target: "_blank", rel: "noopener noreferrer" }
								: {})}
							className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
						>
							{/* Video thumbnail area */}
							<div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
								<img
									src={useCase.thumbnail}
									alt={`${useCase.alt} case study`}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							{/* Label area */}
							<div className="flex items-center justify-between px-3 py-2">
								<span className="text-sm font-medium text-zinc-400">
									{useCase.title}
								</span>
								<i className="ri-arrow-right-up-line text-zinc-500 transition-colors group-hover:text-zinc-400" />
							</div>
						</a>
					))}
				</div>
			</div>

			<div className="mx-auto w-full max-w-[73.75rem] px-4">

				{/* Logo Strip - Secondary, connected to cards */}
				<div className="relative mt-8">
					{/* Connector line from cards */}
					<div className="absolute left-1/2 -top-8 h-8 w-px -translate-x-[0.5px] bg-gradient-to-b from-zinc-800 to-zinc-800/0" />

					{/* Label */}
					<p className="mb-4 font-mono text-center text-sm font-semibold uppercase tracking-widest text-zinc-400/75">
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
									className={`h-4 max-w-full w-auto object-contain transition-opacity duration-500 brightness-0 invert ${
										fadingIndex === slotIndex ? "opacity-0" : "opacity-60"
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
