import { Button, Link } from "@/components/ui";
import { getAssetPath } from "../../utils/assetPath";
import { Icon } from "@/components/ui/Icon";

const AI_CASE_STUDIES = [
	{
		effectLogo: getAssetPath(
			"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
		),
		partnerLogo: getAssetPath("/assets/quotes-logos/masterclass-noM.svg"),
		partnerLogoClass: "h-4",
		thumbnail: "https://img.youtube.com/vi/Cj2pVPqdOVs/maxresdefault.jpg",
		title: "// Voice AI Orchestration Layer",
		href: "https://youtu.be/Cj2pVPqdOVs",
	},
	{
		effectLogo: getAssetPath(
			"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
		),
		partnerLogo: getAssetPath(
			"/assets/effect-jobs-logos/opencode-wordmark-dark.svg",
		),
		partnerLogoClass: "h-5",
		thumbnail: getAssetPath("/assets/images/kit-langton-banner.png"),
		title: "// Coding Agent",
		href: "https://www.youtube.com/watch?v=-mL7VVvkLGM",
	},
];

const FEATURES = [
	{
		title: "Type-safe data flows",
		description: "Connect AI outputs to frontend UI without schema mismatches.",
		icon: "shapes",
	},
	{
		title: "Deterministic concurrency",
		description: "Runs and scales agent pipelines safely.",
		icon: "git-branch",
	},
	{
		title: "Durable agent execution",
		description: (
			<>
				Reliable communication between nodes with{" "}
				<Link
					href="https://effect.website/docs/cluster/introduction"
					variant="inline"
					className="text-zinc-300 hover:text-white"
				>
					Effect Cluster
				</Link>
				.
			</>
		),
		icon: "history",
	},
	{
		title: "Composable infrastructure",
		description: "Easily integrates LLMs, APIs, queues and vector DBs.",
		icon: "layers",
	},
];

export function AIBuildingSection() {
	return (
		<section className="relative w-full overflow-hidden py-24 md:pt-40 md:pb-24">
			<div className="relative mx-auto w-full max-w-295">
				{/* Header row with heading, paragraph, and links */}
				<div className="mb-12 px-4">
					<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
						// Effect for AI
					</p>
					<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
						Build AI & Agentic Systems
					</h2>
					<p className="mt-4 max-w-2xl text-lg text-zinc-400">
						Reliable orchestration, parallel execution, state management, and
						fault recovery, all with type safety and semantic observability
						baked in.
					</p>

					{/* Links */}
					<div className="mt-8 flex gap-3">
						<Button
							href="https://effect.website/docs/ai/introduction"
							variant="secondary"
							size="md"
							className="group"
						>
							<span>Read the docs</span>
							<Icon
								name="arrow-right"
								className="text-base transition-transform group-hover:translate-x-0.5"
							/>
						</Button>
						<Button
							href="https://github.com/Effect-TS/effect/tree/main/packages/ai"
							variant="secondary"
							size="md"
						>
							<i className="ri-github-fill text-base" />
							<span>GitHub</span>
						</Button>
					</div>
				</div>

				{/* Features grid - 4 columns with dividers */}
				<div className="grid grid-cols-1 gap-6 px-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-0">
					{FEATURES.map((feature, index) => (
						<div
							key={index}
							className={`flex flex-col py-0 pr-8 pl-4 ${
								index !== FEATURES.length - 1
									? `lg:border-r lg:border-dashed ${index === 1 ? "lg:border-transparent" : "lg:border-zinc-700/50"}`
									: ""
							} ${index === 0 ? "lg:pl-0" : ""} ${index === FEATURES.length - 1 ? "lg:pr-0" : ""}`}
						>
							<Icon name={feature.icon} className="mb-2 text-lg text-zinc-300" />
							<h3 className="text-base font-semibold text-white">
								{feature.title}
							</h3>
							<p className="mt-1 text-sm leading-relaxed text-zinc-400">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* AI Case Studies — featured video cards */}
				<div className="mt-16 grid grid-cols-1 gap-6 px-4 md:grid-cols-2">
					{AI_CASE_STUDIES.map((study, index) => (
						<a
							key={index}
							href={study.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700"
						>
							{/* Video thumbnail with play overlay */}
							<div className="relative aspect-video w-full overflow-hidden bg-black">
								<img
									src={study.thumbnail}
									alt=""
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/20">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 transition-transform duration-300 group-hover:scale-105">
										<svg
											className="ml-1 h-6 w-6 text-zinc-900"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</div>
							</div>

							{/* Card footer — title + logos */}
							<div className="relative flex flex-col gap-4 px-6 py-5">
								<h4 className="font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase transition-colors group-hover:text-white">
									{study.title}
								</h4>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-5">
										<img src={study.effectLogo} alt="Effect" className="h-6" />
										<span className="text-zinc-700">|</span>
										<img
											src={study.partnerLogo}
											alt=""
											className={study.partnerLogoClass}
										/>
									</div>
									<Icon
										name="arrow-up-right"
										className="text-zinc-300 transition-colors group-hover:text-white"
									/>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
