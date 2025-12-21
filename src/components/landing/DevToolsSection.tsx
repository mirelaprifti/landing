import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

const tools = [
	{
		id: "diagnostics",
		label: "Diagnostics",
		description: "Real-time type errors and suggestions",
		video: getAssetPath("/videos/diagnostics.mp4"),
	},
	{
		id: "refactors",
		label: "Refactors",
		description: "Automated code transformations",
		video: getAssetPath("/videos/refactors.mp4"),
	},
	{
		id: "debugger",
		label: "Debugger",
		description: "Visual fiber inspection",
		video: getAssetPath("/videos/visuals.mp4"),
	},
	{
		id: "playground",
		label: "Playground",
		description: "Try Effect in the browser",
		video: getAssetPath("/videos/effect-playground.mp4"),
	},
];

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState(0);
	const activeTool = tools[activeTab];

	return (
		<section className="relative w-full py-16 md:pt-32 md:pb-8">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header row - split layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 mb-16">
					<div>
						<p className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-500">
							Developer Experience
						</p>
						<h2 className="text-2xl font-semibold text-white md:text-4xl">
							IDE-native tooling
						</h2>
					</div>
					<div className="lg:pt-8 pl-4">
						<p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
							The Effect Language Service brings real-time diagnostics and intelligent refactoring to your editor.
						</p>

						{/* Links */}
						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href="https://effect.website/docs/getting-started/devtools/"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
							>
								<span>Read the docs</span>
								<i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
							</a>
							<a
								href="https://marketplace.visualstudio.com/items?itemName=effectful-tech.effect-vscode"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
							>
								<i className="ri-vscode-line text-sm" />
								<span>VS Code</span>
							</a>
							<a
								href="https://effect.website/play/"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
							>
								<i className="ri-play-circle-line text-sm" />
								<span>Playground</span>
							</a>
						</div>
					</div>
				</div>

				{/* Video with vertical tabs on right */}
				<div className="flex gap-4">
					{/* Video container */}
					<div className="flex-1 border border-zinc-700 bg-zinc-900/30">
						<div className="relative aspect-video">
							<video
								key={activeTool.video}
								src={activeTool.video}
								className="absolute inset-0 h-full w-full object-cover"
								autoPlay
								loop
								muted
								playsInline
								aria-label={`Effect ${activeTool.label} demonstration`}
							>
								<track kind="captions" />
							</video>
						</div>
					</div>

					{/* Vertical tabs on right */}
					<div className="flex flex-col gap-3">
						{tools.map((tool, index) => (
							<button
								key={tool.id}
								type="button"
								onClick={() => setActiveTab(index)}
								className={`relative px-4 py-3 text-left transition-colors cursor-pointer border ${
									activeTab === index
										? "border-zinc-700 bg-zinc-900/50"
										: "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/40"
								}`}
							>
								<span className={`text-sm font-medium ${activeTab === index ? "text-white" : "text-zinc-400"}`}>
									{tool.label}
								</span>
								<p className="mt-1 text-sm text-zinc-500">
									{tool.description}
								</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
