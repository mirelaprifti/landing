import { getAssetPath } from "../../utils/assetPath";

export function TestimonialsSection() {
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
			alt: "Expand Internal Tooling",
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

	return (
		<section className="relative overflow-hidden py-16 lg:pt-16 lg:pb-24">
			{/* Background Pattern */}
			<div
				className="hidden pointer-events-none absolute inset-0"
				style={{
					opacity: 1,
					backgroundImage: `url('${getAssetPath("/assets/BG-Pattern.svg")}')`,
					backgroundSize: "cover",
					backgroundPosition: "center bottom",
					backgroundRepeat: "no-repeat",
					WebkitMaskImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))",
					maskImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))",
				}}
			/>

			{/* Main Content Container */}
			<div className="relative mx-auto w-full">
				{/* Heading */}
				<h2 className="mb-12 mt-3 text-center text-3xl font-bold leading-tight text-white md:mb-14">
					Real-world production systems
				</h2>

				{/* 4 Use Case Cards with Decorative Line */}
				<div className="relative w-full mx-auto max-w-[66.5rem]">

					{/* Cards Container */}
					<div className="use-case-cards relative z-10 grid w-full grid-cols-1 gap-0 min-[480px]:grid-cols-2 lg:grid-cols-4 rounded-lg overflow-hidden border border-zinc-800">
						{useCases.map((useCase, index) => {
							const isLastInRow = (index + 1) % 4 === 0 || index === useCases.length - 1;
							const isLastRow = index >= useCases.length - 4;

							return (
							<a
								key={index}
								href={useCase.href}
								{...(useCase.href.startsWith("http")
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className={`group relative block w-full overflow-hidden border-zinc-800 transition-all ${
									!isLastInRow ? "border-r" : ""
								} ${!isLastRow ? "border-b" : ""}`}
								style={{
									borderRadius: "0px",
									background: "#09090b",
									backdropFilter: "blur(5px)",
									WebkitBackdropFilter: "blur(5px)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#18181b";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "#09090b";
								}}
							>
									{/* Logo area */}
									<div className="relative h-[120px] w-full">
										<img
											src={useCase.logo}
											alt={useCase.alt}
											className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
												useCase.alt === "MasterClass"
													? "h-[1.15rem]"
													: "h-[1.6rem]"
											}`}
										/>
									</div>
									{/* Label area */}
									<div className="bg-zinc-950 flex flex-col px-2 py-3 relative">
										{/* Dashed border above text */}
										<div
											className="absolute top-0 left-0 right-0 h-[1px] bg-zinc-700/50"
											style={{
												WebkitMask:
													"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
												mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
											}}
										/>
										<div className="flex flex-row items-center justify-center gap-1 whitespace-nowrap">
											<span className="text-base font-mono text-zinc-300 md:text-sm">
												{useCase.title}
											</span>
											<i className="ri-arrow-right-up-line text-base text-zinc-300" />
										</div>
									</div>
							</a>
							);
						})}
					</div>
				</div>
			</div>

			{/* Dashed border separator */}
			<div className="w-full max-w-[66.5rem] mx-auto mt-16 mb-12">
				<div
					className="h-[1px] w-full"
					style={{
						background: "#27272a",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				/>
			</div>

			{/* Logo Grid Section */}
			<div className="w-full max-w-[66.5rem] mx-auto">
				<div className="grid grid-cols-3 md:grid-cols-6 border border-zinc-950">
					{[
						getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
						getAssetPath("/assets/logos/14-ai.svg"),
						getAssetPath("/assets/logos/warp-logo-white.svg"),
						getAssetPath("/assets/logos/spiko-logo.svg"),
						getAssetPath("/assets/logos/expand-ai.svg"),
						getAssetPath("/assets/logos/zendesk-logo.svg"),
						getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
						getAssetPath("/assets/logos/14-ai.svg"),
						getAssetPath("/assets/logos/warp-logo-white.svg"),
						getAssetPath("/assets/logos/spiko-logo.svg"),
						getAssetPath("/assets/logos/expand-ai.svg"),
						getAssetPath("/assets/logos/zendesk-logo.svg"),
						getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
						getAssetPath("/assets/logos/14-ai.svg"),
						getAssetPath("/assets/logos/warp-logo-white.svg"),
						getAssetPath("/assets/logos/spiko-logo.svg"),
						getAssetPath("/assets/logos/expand-ai.svg"),
						getAssetPath("/assets/logos/zendesk-logo.svg"),
					].map((logo, index) => (
						<div
							key={index}
							className="flex items-center justify-center p-6 border-r border-b border-zinc-900 last:border-r-0 [&:nth-child(6n)]:border-r-0 md:[&:nth-child(3n)]:border-r [&:nth-last-child(-n+6)]:border-b-0 md:[&:nth-last-child(-n+3)]:border-b"
						>
							<img src={logo} alt="" className="h-[1.35rem] w-auto opacity-70" style={{ filter: 'brightness(0) saturate(100%) invert(84%) sepia(4%) saturate(238%) hue-rotate(185deg) brightness(92%) contrast(87%)' }} />
						</div>
					))}
				</div>
			</div>

			{/* Solid bottom border */}
			<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-800" />
		</section>
	);
}
