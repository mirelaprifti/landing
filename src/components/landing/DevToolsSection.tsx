import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState("playground");

	const tabs = [
		{
			id: "playground",
			label: "playground",
			icon: "ri-terminal-line",
			video: getAssetPath("/videos/effect-playground.mp4"),
			description: "Experiment with Effect in an interactive environment with live feedback and examples.",
			linkText: "Playground",
			linkHref: "https://effect.website/play/",
		},
		{
			id: "diagnostics",
			label: "diagnostics",
			icon: "ri-radar-line",
			video: getAssetPath("/videos/diagnostics.mp4"),
			description: "Catch floating Effects, layers, anti-patterns, and misconfigurations as you code.",
			linkText: "DevTools",
			linkHref: "https://effect.website/docs/getting-started/devtools/",
		},
		{
			id: "refactors",
			label: "refactors",
			icon: "ri-route-line",
			video: getAssetPath("/videos/refactors.mp4"),
			description: "Convert async code to Effect, generate tagged errors, compose complex layers automatically.",
			linkText: "DevTools",
			linkHref: "https://effect.website/docs/getting-started/devtools/",
		},
		{
			id: "visual-devtools",
			label: "visual devtools",
			icon: "ri-eye-line",
			video: getAssetPath("/videos/visuals.mp4"),
			description: "Inspect fiber contexts, visualize span stacks, monitor metrics in real-time. All built-in.",
			linkText: "DevTools",
			linkHref: "https://effect.website/docs/getting-started/devtools/",
		},
	];

	const activeTabData = tabs.find((t) => t.id === activeTab);

	return (
		<section className="relative w-full px-4 pt-20 md:px-8 md:pt-26">
			{/* Dashed top border */}
			<div
				className="absolute left-0 right-0 top-0 h-[1px]"
				style={{
					background: "#3f3f46",
					WebkitMask:
						"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			/>
			<div className="mx-auto w-full max-w-[73.75rem]">
				{/* Heading */}
				<div className="mb-8 px-4 flex flex-col items-start gap-4">
					<h3 className="text-2xl font-bold leading-tight text-white">
						Next-gen DevTools
					</h3>
					<p className="max-w-[28rem] text-lg text-zinc-400">
						Real-time diagnostics, automated refactors, visual debugging, and more!
					</p>
				</div>

				{/* Divider line */}
				<div
					className="h-[1px] mb-8"
					style={{
						background: "#3f3f46",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					}}
				/>

				{/* Container */}
				<div className="relative">
					<div className="flex flex-col lg:flex-row lg:justify-between overflow-hidden bg-zinc-950">
						{/* Accordion tabs - Left side */}
						<div className="flex flex-row lg:flex-col lg:w-[22rem] lg:shrink-0 border-b lg:border-b-0 border-zinc-800 gap-[2px] min-w-0 overflow-hidden">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<div key={tab.id}>
										<button
											type="button"
											onClick={() => setActiveTab(tab.id)}
											className={`relative w-full py-2 px-4 font-mono text-base uppercase transition-colors text-left ${
												isActive
													? "bg-zinc-950 text-white"
													: "bg-zinc-900/0 text-zinc-400 hover:text-white"
											}`}
										>
											{/* Indicator line */}
											{isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] bg-white" />}
											{tab.label}
										</button>
										{/* Expanded content when active */}
										{isActive && (
											<div
												className="px-4 pb-4 bg-zinc-950"
												style={{
													animation: "fadeIn 300ms ease-in-out",
												}}
											>
												<p className="text-sm leading-snug text-zinc-400 mb-3">
													{tab.description}
												</p>
												<a
													href={tab.linkHref}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-2 border border-zinc-600 rounded-lg px-3 py-1.5 font-inter font-medium text-sm text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
												>
													{tab.linkText}
													<i className="ri-arrow-right-up-line text-sm" />
												</a>
											</div>
										)}
									</div>
								);
							})}
						</div>

						{/* Video area - Right side (8 columns) */}
						<div className="lg:w-8/12 px-4 flex items-center justify-center">
							<div className="relative w-full max-w-[620px] mx-auto overflow-hidden rounded-lg border border-zinc-800 aspect-video shadow-[0_4px_20px_4px_rgba(39,39,42,0.3),0_4px_8px_0_rgba(0,0,0,0.5)]">
								<div className="absolute inset-0 h-full w-full overflow-hidden bg-zinc-900">
									<video
										key={activeTabData?.video}
										src={activeTabData?.video}
										className="absolute inset-0 h-full w-full object-cover"
										controls
										loop
										muted
										playsInline
										aria-label={`Effect ${activeTab} demonstration video`}
									>
										<track kind="captions" />
										Your browser does not support the video tag.
									</video>
									{/* Gradient overlay */}
									<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#737381] to-[#18181B] opacity-15" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
