import { Button } from "@/components/ui/Button";

export function AISection() {
	const features = [
		{
			icon: "/assets/icons/ai-icon-fork.svg",
			title: "Fork & cancel",
			description: "tool calls or model chains",
		},
		{
			icon: "/assets/icons/ai-icon-retry.svg",
			title: "Retry & fallback",
			description: "with typed error handling",
		},
		{
			icon: "/assets/icons/ai-icon-inject.svg",
			title: "Inject & swap",
			description: "models or APIs for testing",
		},
		{
			icon: "/assets/icons/ai-icon-tracing.svg",
			title: "Automatic tracing,",
			description: "no boilerplate",
		},
	];

	const caseStudies = [
		{
			href: "https://youtu.be/x2bUuOZ-htU",
			logo: "/assets/logos/masterclass.svg",
			logoAlt: "MasterClass",
			logoHeight: "h-5",
			title: "Building a Voice AI Orchestration Layer",
			gradientColor: "rgba(227, 38, 82, 0.06)",
			borderGradient:
				"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(227, 38, 82, 1) 50%, rgba(9, 9, 11, 0) 100%)",
		},
		{
			href: "https://youtu.be/8lz9-0y58Jc",
			logo: "/assets/logos/14-ai.svg",
			logoAlt: "14.ai",
			logoHeight: "h-7",
			title: "Building Guardrails for LLMs at Scale",
			gradientColor: "rgba(161, 190, 0, 0.06)",
			borderGradient:
				"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(161, 190, 0, 1) 50%, rgba(9, 9, 11, 0) 100%)",
		},
	];

	return (
		<section className="relative w-full overflow-hidden px-4 py-20 md:px-8 md:py-32">
			{/* Main Content Container */}
			<div className="w-max-[66.5rem] relative mx-auto flex w-full flex-col items-center gap-12">
				{/* Heading and Button */}
				<div className="flex w-full flex-col items-center gap-10 px-4">
					<h2 className="text-center text-3xl font-bold leading-tight text-white">
						A safe, testable runtime for AI systems
					</h2>
					<Button
						href="https://effect-ts.github.io/effect/docs/ai/ai"
						icon="ri-terminal-line"
						text="@effect/ai package"
					/>
				</div>

				{/* Features and Case Studies Container */}
				<div className="relative mx-auto w-full max-w-[66.5rem]">
					{/* Vertical Dashed Lines */}
					<div
						className="absolute bottom-0 left-0 hidden h-[360px] w-[1px] lg:block"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>
					<div
						className="absolute bottom-0 right-0 hidden h-[360px] w-[1px] lg:block"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* 4 Feature Cards */}
					<div className="mx-auto grid max-w-[53rem] grid-cols-2 gap-[20px] lg:grid-cols-4">
						{features.map((feature, index) => (
							<div key={index} className="dashed-gradient-border relative p-4">
								<div className="flex flex-col gap-3">
									<img src={feature.icon} alt="" className="mt-4 h-6 w-6" />
									<p className="mt-6 text-base leading-5 text-white/88">
										<span className="font-semibold text-white">
											{feature.title}
										</span>
										<span className="font-normal"> {feature.description}</span>
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Horizontal Dashed Line Separator */}
					<div
						className="mx-auto my-8 h-[1px] w-full max-w-[53rem]"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* 2 Case Study Cards */}
					<div className="mx-auto flex w-full max-w-[53rem] flex-col justify-center gap-5 sm:flex-row">
						{caseStudies.map((study, index) => (
							<a
								key={index}
								href={study.href}
								target="_blank"
								rel="noopener noreferrer"
								className="lg:max-w-auto w-full flex-1 overflow-hidden rounded-lg border border-zinc-800 transition-colors hover:border-zinc-700"
							>
								<div className="flex flex-col">
									{/* Top section with gradient and logos */}
									<div
										className="relative flex h-24 items-center justify-center"
										style={{
											background: `linear-gradient(to bottom, rgba(9, 9, 11, 1), ${study.gradientColor})`,
										}}
									>
										<div className="flex items-center gap-4">
											<img
												src="/assets/logos/effect-logo-white.svg"
												alt="Effect"
												className="h-7"
											/>
											<div className="h-8 w-[1px] bg-zinc-700" />
											<img
												src={study.logo}
												alt={study.logoAlt}
												className={study.logoHeight}
											/>
										</div>
										{/* Gradient border at bottom */}
										<div
											className="absolute bottom-0 left-0 right-0 h-[2px]"
											style={{
												background: study.borderGradient,
											}}
										/>
									</div>
									{/* Bottom section with text */}
									<div className="flex items-center justify-center bg-black py-4">
										<p className="text-center text-base font-medium text-white">
											{study.title}
										</p>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
