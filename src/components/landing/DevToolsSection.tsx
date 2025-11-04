import { useState, useEffect, useRef } from "react";

export function DevToolsSection() {
	const [activeTab, setActiveTab] = useState("diagnostics");
	const lineRefs = useRef<Record<string, SVGLineElement | null>>({});

	const tabs = [
		{
			id: "diagnostics",
			label: "diagnostics",
			gif: "/assets/gifs/diagnostics-16_9.gif",
		},
		{
			id: "refactors",
			label: "refactors",
			gif: "/assets/gifs/refactors-16_9.gif",
		},
		{
			id: "visual-devtools",
			label: "visual devtools",
			gif: "/assets/gifs/visuals-16_9.gif",
		},
		{
			id: "editor-extensions",
			label: "editor extensions",
			gif: "/assets/gifs/extension-16_9.gif",
		},
	];

	const activeGif = tabs.find((t) => t.id === activeTab)?.gif;

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
					line.setAttribute("x2", "128");
				}
			});

			// Animate the active tab's line
			const activeLine = lineRefs.current[tabId];
			if (!activeLine) return;

			// Start collapsed
			activeLine.setAttribute("x2", "128");

			// Animate from 128 to 0
			let progress = 128;
			const duration = 300; // ms
			const fps = 60;
			const step = 128 / (duration / (1000 / fps));

			intervalId = setInterval(() => {
				progress -= step;
				if (progress <= 0) {
					progress = 0;
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
		<section className="relative mt-16 w-full px-4 py-20 md:mt-24 md:px-8 md:py-24">
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
				<div className="flex flex-col-reverse items-start gap-8 lg:flex-row lg:gap-0">
					{/* Left: GIF Container */}
					<div className="aspect-video w-full flex-shrink-0 overflow-hidden rounded-lg border border-zinc-700 lg:aspect-auto lg:h-[354px] lg:w-[630px]">
						<div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-900">
							<img
								src={activeGif}
								alt="DevTools Demo"
								className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
							/>
							{/* Gradient overlay */}
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#737381] to-[#18181B] opacity-15" />
						</div>
					</div>

					{/* Right: Content Section */}
					<div className="relative w-full lg:pl-[128px]">
						{/* Heading */}
						<div className="mb-8">
							<h3 className="text-[31px] font-bold leading-[1.25] text-white">
								Next-gen DevTools
							</h3>
						</div>

						{/* Tab Buttons */}
						<div className="grid w-full grid-cols-2 gap-2 lg:flex lg:max-w-[305px] lg:flex-col">
							{tabs.map((tab) => (
								<div key={tab.id} className="relative w-full">
									<button
										onClick={() => setActiveTab(tab.id)}
										className={`flex w-full items-center justify-center rounded-full border px-0 py-4 font-mono text-base uppercase transition-colors ${
											activeTab === tab.id
												? "border-solid border-white text-white"
												: "border-dashed border-zinc-600 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
										}`}
									>
										{tab.label}
									</button>
									{/* Line connecting button to video */}
									<svg
										className="pointer-events-none absolute right-[100%] top-1/2 hidden h-[1px] w-[128px] -translate-y-1/2 lg:block"
										viewBox="0 0 128 1"
										preserveAspectRatio="none"
									>
										<line
											ref={(el) => {
												lineRefs.current[tab.id] = el;
											}}
											x1="128"
											y1="0.5"
											x2={activeTab === tab.id ? "0" : "128"}
											y2="0.5"
											stroke="white"
											strokeWidth="1"
										/>
									</svg>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
