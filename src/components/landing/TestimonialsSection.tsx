import { getAssetPath } from "../../utils/assetPath";

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

export function TestimonialsSection() {
	return (
		<section className="relative py-24 md:pt-40 md:pb-20">
			{/* Header - with padding */}
			<div className="mx-auto w-full max-w-[73.75rem] px-4 mb-10">
				<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
					Who uses Effect?
				</p>
				<h2 className="text-2xl font-semibold text-white md:text-3xl">
					Real-world production systems
				</h2>
				{/* Resource links */}
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
					>
						Cause & Effect Podcast
						<i className="ri-arrow-right-up-line text-base" />
					</a>
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
					>
						Effect Days 2024
						<i className="ri-arrow-right-up-line text-base" />
					</a>
					<a
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
					>
						Effect Days 2025
						<i className="ri-arrow-right-up-line text-base" />
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
							className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-700 bg-zinc-900/50 transition-all hover:border-zinc-500 hover:bg-zinc-900"
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

		</section>
	);
}
