import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

const tools = [
	{
		id: "playground",
		label: "Playground",
		description: "Try Effect in the browser with live feedback",
		video: getAssetPath("/videos/effect-playground.mp4"),
		href: "https://effect.website/play/",
	},
	{
		id: "diagnostics",
		label: "Diagnostics",
		description: "Real-time error detection and type checking",
		video: getAssetPath("/videos/diagnostics.mp4"),
		href: "https://effect.website/docs/getting-started/devtools/",
	},
	{
		id: "refactors",
		label: "Refactors",
		description: "Automated code transformations and migrations",
		video: getAssetPath("/videos/refactors.mp4"),
		href: "https://effect.website/docs/getting-started/devtools/",
	},
	{
		id: "inspect",
		label: "Inspect",
		description: "Visualize execution flow and dependencies",
		video: getAssetPath("/videos/visuals.mp4"),
		href: "https://effect.website/docs/getting-started/devtools/",
	},
];

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState(0);
	const activeTool = tools[activeTab];

	return (
		<section className="relative w-full py-16 md:pt-32 md:pb-4">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-8">
					<p className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-2">
						Developer Tools
					</p>
					<h2 className="text-2xl font-semibold text-white md:text-3xl">
						Built-in tooling for every stage
					</h2>
				</div>

				{/* Side Tabs + Video - 12 column grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
					{/* Side Tabs - 5 columns */}
					<div className="hidden lg:flex lg:col-span-5 flex-col">
						{tools.map((tool, index) => (
							<button
								key={tool.id}
								type="button"
								onClick={() => setActiveTab(index)}
								className={`relative pl-4 pr-2 py-3 text-left transition-colors cursor-pointer border-l ${
									activeTab === index
										? "border-white text-white"
										: "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
								}`}
							>
								<span className="block text-sm font-medium">{tool.label}</span>
								<span className={`block text-[13px] leading-snug mt-1 ${activeTab === index ? "text-zinc-400" : "text-zinc-600"}`}>
									{tool.description}
								</span>
							</button>
						))}
					</div>

					{/* Video - 7 columns */}
					<div className="col-span-1 lg:col-span-7">
						<a
							href={activeTool.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-700"
						>
							<div className="relative aspect-video bg-zinc-950">
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
							<div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
								<span className="text-sm text-zinc-400">{activeTool.label}</span>
								<span className="flex items-center gap-1.5 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
									Open
									<i className="ri-arrow-right-up-line" />
								</span>
							</div>
						</a>
					</div>
				</div>

				{/* Mobile tabs */}
				<div className="flex gap-4 mt-4 md:hidden overflow-x-auto pb-2">
					{tools.map((tool, index) => (
						<button
							key={tool.id}
							type="button"
							onClick={() => setActiveTab(index)}
							className={`shrink-0 text-sm transition-colors cursor-pointer border-b-2 pb-2 ${
								activeTab === index
									? "border-white text-white"
									: "border-transparent text-zinc-500 hover:text-zinc-300"
							}`}
						>
							{tool.label}
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
