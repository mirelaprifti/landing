import { getAssetPath } from "../../utils/assetPath";

const AI_CASE_STUDIES = [
	{
		effectLogo: getAssetPath(
			"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
		),
		partnerLogo: getAssetPath("/assets/quotes-logos/masterclass-noM.svg"),
		partnerLogoClass: "h-4",
		title: "// Voice AI Orchestration Layer",
		href: "https://youtu.be/Cj2pVPqdOVs",
		accentColor: "bg-violet-500",
		// Soft radial glow in corner
		bgStyle: {
			background:
				"radial-gradient(ellipse 80% 100% at 100% 100%, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)",
		},
	},
	{
		effectLogo: getAssetPath(
			"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
		),
		partnerLogo: getAssetPath("/assets/test-logos/14-ai.svg"),
		partnerLogoClass: "h-6",
		title: "// AI for Customer Support",
		href: "https://youtu.be/gGFPhFrGCng",
		accentColor: "bg-emerald-400",
		// Soft radial glow in corner
		bgStyle: {
			background:
				"radial-gradient(ellipse 80% 100% at 100% 100%, rgba(16, 185, 129, 0.35) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%)",
		},
	},
];

const FEATURES = [
	{
		title: "Type-safe data flows",
		description: "Connect AI outputs to frontend UI without schema mismatches.",
		icon: "ri-shape-line",
	},
	{
		title: "Deterministic concurrency",
		description: "Runs and scales agent pipelines safely.",
		icon: "ri-git-branch-line",
	},
	{
		title: "Durable agent execution",
		description: (
			<>
				Reliable communication between nodes with{" "}
				<a
					href="https://effect.website/docs/cluster/introduction"
					target="_blank"
					rel="noopener noreferrer"
					className="text-zinc-300 underline underline-offset-2 transition-colors hover:text-white"
				>
					Effect Cluster
				</a>
				.
			</>
		),
		icon: "ri-history-line",
	},
	{
		title: "Composable infrastructure",
		description: "Easily integrates LLMs, APIs, queues and vector DBs.",
		icon: "ri-stack-line",
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
						<a
							href="https://effect.website/docs/ai/introduction"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
						>
							<span>Read the docs</span>
							<i className="ri-arrow-right-line text-base transition-transform group-hover:translate-x-0.5" />
						</a>
						<a
							href="https://github.com/Effect-TS/effect/tree/main/packages/ai"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
						>
							<i className="ri-github-fill text-base" />
							<span>GitHub</span>
						</a>
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
							<i className={`${feature.icon} mb-2 text-lg text-zinc-300`} />
							<h3 className="text-base font-semibold text-white">
								{feature.title}
							</h3>
							<p className="mt-1 text-sm leading-relaxed text-zinc-400">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* AI Case Studies */}
				<div className="mt-16 grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
					{AI_CASE_STUDIES.map((study, index) => (
						<a
							key={index}
							href={study.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
						>
							{/* Top accent line */}
							<div
								className={`absolute top-0 right-0 left-0 h-0.5 ${study.accentColor}`}
							/>

							{/* Decorative gradient background */}
							<div
								className="pointer-events-none absolute inset-0 transition-opacity group-hover:opacity-100"
								style={study.bgStyle}
							/>

							{/* Content */}
							<div className="relative flex flex-col gap-4 px-8 pt-8 pb-7">
								{/* Title */}
								<h4 className="font-mono text-sm font-medium text-zinc-400 uppercase transition-colors group-hover:text-white">
									{study.title}
								</h4>

								{/* Dashed divider */}
								<div
									className="h-px w-full"
									style={{
										backgroundImage:
											"repeating-linear-gradient(to right, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)",
									}}
								/>

								{/* Logos row with arrow */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-5">
										<img src={study.effectLogo} alt="Effect" className="h-6" />
										<span className="text-zinc-600">|</span>
										<img
											src={study.partnerLogo}
											alt=""
											className={study.partnerLogoClass}
										/>
									</div>
									<i className="ri-arrow-right-up-line text-zinc-200 transition-colors group-hover:text-white" />
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
