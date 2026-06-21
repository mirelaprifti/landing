import { Button } from "@/components/ui";
import { getAssetPath } from "../../utils/assetPath";

const featuredCases = [
	{
		headline: "OpenCode uses Effect",
		description:
			"Kit Langton shows what it takes to migrate a large TypeScript codebase to Effect.",
		href: "https://www.youtube.com/watch?v=-mL7VVvkLGM",
		alt: "opencode",
		thumbnail: getAssetPath("/assets/images/kit-langton-banner-website.png"),
	},
	{
		headline: "MasterClass Cortex powered by Effect",
		description:
			"Building a real-time voice AI orchestration layer that powers personalized conversations with celebrity instructors like Gordon Ramsay and Mark Cuban.",
		href: "https://www.youtube.com/watch?v=x2bUuOZ-htU&list=PLDf3uQLaK2B_jaZ5Fy7IPNq0FIViV_CQl&index=6",
		alt: "MasterClass",
		thumbnail: getAssetPath(
			"/assets/images/david-golightly – banner_compressed.webp",
		),
	},
	{
		headline: "OpenRouter uses Effect",
		description:
			"Louis Vichy on how OpenRouter built their internal tooling and infrastructure with Effect.",
		href: "https://youtu.be/AVJIqQi11lM",
		alt: "OpenRouter",
		thumbnail: getAssetPath(
			"/assets/images/louis-vichy-banner_compressed.webp",
		),
	},
];

export function TestimonialsSection() {
	return (
		<section className="relative py-24 md:pt-40 md:pb-24">
			{/* Header — full width, restrained */}
			<div className="mx-auto mb-12 w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
					// Effect in the real world
				</p>
				<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
					Real-world production systems
				</h2>
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<Button
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE"
						variant="secondary"
						className="inline-flex items-center gap-2"
					>
						Cause & Effect Podcast
						<i className="ri-arrow-right-up-line text-base" />
					</Button>
					<Button
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO"
						variant="secondary"
						className="inline-flex items-center gap-2"
					>
						Effect Days 2024
						<i className="ri-arrow-right-up-line text-base" />
					</Button>
					<Button
						href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP"
						variant="secondary"
						className="inline-flex items-center gap-2"
					>
						Effect Days 2025
						<i className="ri-arrow-right-up-line text-base" />
					</Button>
				</div>
			</div>

			{/* Featured rows — alternating text/video layout */}
			<div className="mx-auto flex w-full max-w-[73.75rem] flex-col gap-12 px-4 md:gap-16">
				{featuredCases.map((featured, index) => {
					const videoOnRight = index % 2 === 0;
					return (
						<div
							key={`featured-${index}`}
							className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
						>
							{/* Text block */}
							<div
								className={`flex w-full flex-col gap-5 lg:mx-auto lg:max-w-[26rem] ${videoOnRight ? "lg:order-1" : "lg:order-2"}`}
							>
								<h3 className="leading-tighter text-xl font-semibold text-white md:text-2xl">
									{featured.headline}
								</h3>
								<p className="max-w-md text-base leading-relaxed text-zinc-300">
									{featured.description}
								</p>
								<a
									href={featured.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white"
								>
									Watch the talk
									<i
										className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										aria-hidden="true"
									/>
								</a>
							</div>

							{/* Video block */}
							<a
								href={featured.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Watch ${featured.headline}`}
								className={`group relative ${videoOnRight ? "lg:order-2" : "lg:order-1"}`}
							>
								<div className="relative aspect-video w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
									<img
										src={featured.thumbnail}
										alt=""
										className="h-full w-full object-cover"
									/>
									<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
								</div>
							</a>
						</div>
					);
				})}
			</div>

		</section>
	);
}
