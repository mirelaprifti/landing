import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState("playground");

	const tabs = [
		{
			id: "playground",
			label: "playground",
			video: getAssetPath("/videos/effect-playground.mp4"),
			description: "Experiment with Effect in an interactive environment with live feedback and examples.",
		},
		{
			id: "diagnostics",
			label: "diagnostics",
			video: getAssetPath("/videos/diagnostics.mp4"),
			description: "Catch floating Effects, layers, anti-patterns, and misconfigurations as you code.",
		},
		{
			id: "refactors",
			label: "refactors",
			video: getAssetPath("/videos/refactors.mp4"),
			description: "Convert async code to Effect, generate tagged errors, compose complex layers automatically.",
		},
		{
			id: "visual-devtools",
			label: "visual devtools",
			video: getAssetPath("/videos/visuals.mp4"),
			description: "Inspect fiber contexts, visualize span stacks, monitor metrics in real-time. All built-in.",
		},
		{
			id: "editor-extensions",
			label: "editor extensions",
			video: getAssetPath("/videos/extension.mp4"),
			description: "Explore layer composition graphs and watch telemetry spans live as they happen.",
		},
	];

	const activeTabData = tabs.find((t) => t.id === activeTab);

	return (
		<section className="relative w-full px-4 pt-20 pb-20 md:px-8 md:pt-24 md:pb-32">
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
			<div className="mx-auto w-full max-w-[66.5rem]">
				{/* Heading */}
				<div className="mb-6 flex items-start justify-between">
					<h3 className="text-2xl font-bold leading-tight text-white">
						Next-gen DevTools
					</h3>
					<a
						href="https://effect.website/docs/getting-started/devtools/"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-[6px] flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
					>
						DevTools
						<i className="ri-arrow-right-up-line text-base" />
					</a>
				</div>

				{/* Gradient border container */}
				<div className="relative rounded-[12px] bg-gradient-to-b from-zinc-700 to-zinc-800 p-[1px]">
					<div className="overflow-hidden rounded-[12px] bg-zinc-950">
						{/* Horizontal tabs */}
						<div className="flex flex-wrap">
							{tabs.map((tab, index) => {
								const isActive = activeTab === tab.id;
								const isNotLast = index < tabs.length - 1;
								return (
									<button
										key={tab.id}
										type="button"
										onClick={() => setActiveTab(tab.id)}
										className={`flex-1 min-w-[120px] py-[16px] px-6 font-mono text-base uppercase transition-colors ${
											isNotLast ? "border-r border-zinc-950" : ""
										} ${
											isActive
												? "bg-zinc-950 text-white"
												: "bg-[#18181b] text-zinc-400 hover:text-white"
										}`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>

						{/* Content area */}
						<div className="w-full p-6">
							<div className="flex flex-col lg:flex-row">
								{/* Description - Left side */}
								<div className="lg:w-2/5 flex items-start pr-6">
									<p
										className="text-base leading-snug text-zinc-400"
										key={activeTab}
										style={{
											animation: "fadeIn 300ms ease-in-out",
										}}
									>
										{activeTabData?.description}
									</p>
								</div>

								{/* Video - Right side */}
								<div className="lg:w-3/5">
									<div className="relative w-full overflow-hidden rounded-lg border border-zinc-700" style={{ paddingBottom: "56.25%" }}>
										<div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg bg-zinc-900">
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
				</div>
			</div>
		</section>
	);
}
