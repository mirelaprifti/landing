import { getAssetPath } from "../../utils/assetPath";

export function AISection() {
	const features = [
		{
			icon: "ri-git-fork-line",
			title: "Fork & cancel",
			description: "tool calls or model chains",
		},
		{
			icon: "ri-repeat-2-line",
			title: "Retry & fallback",
			description: "with typed error handling",
		},
		{
			icon: "ri-arrow-left-right-line",
			title: "Inject & swap",
			description: "models or APIs for testing",
		},
		{
			icon: "ri-node-tree",
			title: "Automatic tracing,",
			description: "no boilerplate",
		},
	];

	const caseStudies = [
		{
			href: "https://youtu.be/x2bUuOZ-htU",
			logo: getAssetPath("/assets/logos/masterclass.svg"),
			logoAlt: "MasterClass",
			logoHeight: "h-5",
			title: "Voice AI Orchestration Layer",
			gradientColor: "rgba(227, 38, 82, 0.06)",
			borderGradient:
				"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(227, 38, 82, 0.6) 50%, rgba(9, 9, 11, 0) 100%)",
		},
		{
			href: "https://youtu.be/8lz9-0y58Jc",
			logo: getAssetPath("/assets/logos/14-ai.svg"),
			logoAlt: "14.ai",
			logoHeight: "h-7",
			title: "Guardrails for LLMs at Scale",
			gradientColor: "rgba(161, 190, 0, 0.06)",
			borderGradient:
				"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(161, 190, 0, 0.6) 50%, rgba(9, 9, 11, 0) 100%)",
		},
	];

	return (
		<section className="relative w-full overflow-hidden px-4 py-20 md:px-8 md:py-32">
			{/* Main Content Container */}
			<div className="w-max-[66.5rem] relative mx-auto flex w-full flex-col items-center gap-12">
				{/* Features and Case Studies Container */}
				<div className="relative mx-auto w-full max-w-[66.5rem] px-0">
					{/* Heading and Button */}
					<div className="mb-12 flex w-full items-end justify-between">
						<h2 className="font-inter text-2xl font-semibold leading-tight text-white max-w-[600px]">
							A safe, testable runtime for AI systems
						</h2>
						<a
							href="https://effect-ts.github.io/effect/docs/ai/ai"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
						>
							<span>@effect/ai package</span>
							<i className="ri-arrow-right-line text-base"></i>
						</a>
					</div>

					{/* Container for Feature Cards, Separator, and Case Studies */}
					<div className="relative px-12">
						{/* Vertical Solid Lines */}
						<div
							className="absolute bottom-0 left-0 hidden h-full w-[1px] bg-zinc-800 lg:block"
						/>
						<div
							className="absolute bottom-0 right-0 hidden h-full w-[1px] bg-zinc-800 lg:block"
						/>

						{/* 4 Feature Cards */}
					<div className="mx-auto grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
						{features.map((feature, index) => (
							<div key={index} className="dashed-gradient-border relative p-4">
								<div className="flex flex-col gap-3">
									<i
										className={`${feature.icon} mt-4 text-xl`}
										style={{
											background: "linear-gradient(to bottom, #18181b, #ffffff)",
											WebkitBackgroundClip: "text",
											backgroundClip: "text",
											WebkitTextFillColor: "transparent",
										}}
									></i>
									<p className="mt-6 text-base leading-5 text-zinc-300">
										<span className="font-semibold text-white">
											{feature.title}
										</span>
										<span className="font-normal"> {feature.description}</span>
									</p>
								</div>
							</div>
						))}
					</div>
					</div>
				</div>
			</div>
		</section>
	);
}
