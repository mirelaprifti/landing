import { useState, useEffect, useRef } from "react";
import { getAssetPath } from "../../utils/assetPath";

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState("diagnostics");
	const lineRefs = useRef<Record<string, SVGLineElement | null>>({});

	const tabs = [
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

	const activeVideo = tabs.find((t) => t.id === activeTab)?.video;

	// Animate line when tab changes
	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		const animateLine = (tabId: string) => {
			// Clear any existing animation
			if (intervalId) {
				clearInterval(intervalId);
			}

			// Collapse all lines instantly
			Object.values(lineRefs.current).forEach((line) => {
				if (line) {
					line.setAttribute("x2", "0");
				}
			});

			// Animate the active tab's line
			const activeLine = lineRefs.current[tabId];
			if (!activeLine) return;

			// Start collapsed
			activeLine.setAttribute("x2", "0");

			// Animate from 0 to 128
			let progress = 0;
			const duration = 300; // ms
			const fps = 60;
			const step = 128 / (duration / (1000 / fps));

			intervalId = setInterval(() => {
				progress += step;
				if (progress >= 128) {
					progress = 128;
					if (intervalId) {
						clearInterval(intervalId);
						intervalId = null;
					}
				}
				activeLine.setAttribute("x2", String(progress));
			}, 1000 / fps);
		};

		animateLine(activeTab);

		// Cleanup on unmount or tab change
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [activeTab]);

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
			<div className="mx-auto w-full max-w-[80rem]">
				{/* Heading */}
				<div className="mb-6 flex items-center justify-between">
					<h3 className="text-2xl font-bold leading-tight text-white">
						Next-gen DevTools
					</h3>
					<i className="ri-tools-line text-2xl text-white" />
				</div>

				{/* Divider line */}
				<div className="mb-8 h-[1px] w-full bg-zinc-800" />

				<div className="flex flex-col-reverse items-start gap-8 lg:flex-row lg:gap-8 lg:items-stretch">
					{/* Left: Tab Buttons */}
					<div className="relative flex items-stretch lg:w-1/3">
						{/* Tab Buttons */}
						<div className="grid w-full grid-cols-2 gap-0 lg:flex lg:flex-col lg:gap-1 lg:h-full">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<div key={tab.id} className={`relative w-full ${isActive ? "" : "flex-1"}`}>
										<button
											type="button"
											onClick={() => setActiveTab(tab.id)}
											className={`flex h-full w-full flex-col items-start text-left border-r px-6 py-6 transition-colors cursor-pointer ${
												isActive
													? "justify-start border-r-white border-solid bg-zinc-900"
													: "justify-center border-r-zinc-700 border-dashed bg-zinc-900/30 hover:border-r-zinc-400 hover:bg-zinc-900/50"
											}`}
										>
											<span
												className={`font-mono font-medium text-base uppercase transition-colors ${
													isActive
														? "text-white"
														: "text-zinc-400 hover:text-zinc-300"
												}`}
											>
												{tab.label}
											</span>
											{isActive && (
												<p
													className="mt-2 text-base leading-snug text-zinc-400 transition-opacity duration-300"
													style={{
														animation: "fadeIn 300ms ease-in-out",
													}}
												>
													{tab.description}
												</p>
											)}
										</button>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right: Video Container */}
					<div className="flex w-full items-center lg:w-2/3">
						<div className="relative w-full overflow-hidden rounded-lg border border-zinc-700" style={{ paddingBottom: "56.25%" }}>
							<div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg bg-zinc-900">
								<video
									key={activeVideo}
									src={activeVideo}
									className="absolute inset-0 h-full w-full object-cover"
									autoPlay
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
		</section>
	);
}
