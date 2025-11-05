export function PlaygroundSection() {
	return (
		<div className="relative w-full border-zinc-700 px-4 pb-0 pt-20 sm:border-b md:px-8 md:pb-24 md:pt-24">
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
			{/* Left Column Wrapper: Centered in 66.5rem container */}
			<div className="mx-auto w-full max-w-[66.5rem]">
				{/* Left Column: Text Content */}
				<div className="flex w-full flex-col gap-8 pb-2 md:w-[338px]">
					<h3 className="text-[31px] font-bold leading-[1.25] text-white">
						Run Effect code in the Effect Playground
					</h3>

					<div className="flex flex-col gap-10">
						<div className="flex gap-4">
							<div className="flex flex-1 flex-col gap-4">
								<div className="h-5 w-5">
									<i className="ri-braces-line text-xl text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									TypeScript LSP & Node.js support
								</p>
							</div>

							<div className="flex flex-1 flex-col gap-4">
								<div className="h-5 w-5">
									<i className="ri-bar-chart-horizontal-line text-xl text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Real-time application trace viewer built-in
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex flex-1 flex-col gap-4">
								<div className="h-5 w-5">
									<i className="ri-share-line text-xl text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Share & collaborate on Effect programs
								</p>
							</div>

							<div className="flex flex-1 flex-col gap-4">
								<div className="h-5 w-5">
									<i className="ri-book-open-line text-xl text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Built-in examples & templates
								</p>
							</div>
						</div>
					</div>

					<a
						href="https://effect.website/play/"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 flex w-fit items-center justify-center gap-3 rounded-lg border border-zinc-600 bg-black px-5 py-5 text-base font-medium text-white transition-colors hover:border-zinc-400"
					>
						<span className="flex h-6 w-6 items-center justify-center">
							<i className="ri-terminal-line text-lg leading-none text-white" />
						</span>
						<span>Effect Playground</span>
					</a>
				</div>
			</div>

			{/* Right Column: Code Editor Preview - Pinned to Right Edge */}
			<div className="mt-8 w-full border-zinc-700 bg-zinc-950 p-2 sm:rounded-tl-lg sm:border-l sm:border-t md:absolute md:bottom-0 md:left-[50%] md:mt-0 md:w-[50vw] md:pl-2 md:pt-2 lg:block">
				<div className="relative h-[380px] overflow-hidden rounded-tl-lg bg-zinc-900">
					{/* Code Preview Image/Content */}
					<div className="relative inset-0 h-full p-4">
						{/* Gradient Overlay */}
						<div
							className="pointer-events-none absolute inset-0 z-10 rounded-tl-lg"
							style={{
								background:
									"linear-gradient(to bottom right, rgba(255, 255, 255, 0) 20%, rgba(9, 9, 11, 1) 75%)",
							}}
						/>
						<pre className="font-mono text-sm leading-relaxed text-zinc-400">
							<span style={{ color: "#c678dd" }}>import</span>{" "}
							<span style={{ color: "#abb2bf" }}>{"{ NodeRuntime }"}</span>{" "}
							<span style={{ color: "#c678dd" }}>from</span>{" "}
							<span style={{ color: "#98c379" }}>"@effect/platform-node"</span>
							{"\n"}
							<span style={{ color: "#c678dd" }}>import</span>{" "}
							<span style={{ color: "#abb2bf" }}>{"{ Effect, Context }"}</span>{" "}
							<span style={{ color: "#c678dd" }}>from</span>{" "}
							<span style={{ color: "#98c379" }}>"effect"</span>
							{"\n"}
							<span style={{ color: "#c678dd" }}>import</span>{" "}
							<span style={{ color: "#abb2bf" }}>{"{ DevToolsLive }"}</span>{" "}
							<span style={{ color: "#c678dd" }}>from</span>{" "}
							<span style={{ color: "#98c379" }}>"./DevTools"</span>
							{"\n\n"}
							<span style={{ color: "#c678dd" }}>class</span>{" "}
							<span style={{ color: "#61afef" }}>MyDependency</span>{" "}
							<span style={{ color: "#c678dd" }}>extends</span>{" "}
							<span style={{ color: "#61afef" }}>Context</span>
							<span style={{ color: "#abb2bf" }}>.</span>
							<span style={{ color: "#61afef" }}>Tag</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#98c379" }}>"MyDependency"</span>
							<span style={{ color: "#abb2bf" }}>)</span>{" "}
							<span style={{ color: "#abb2bf" }}>{"{}"}</span>
							{"\n\n"}
							<span style={{ color: "#c678dd" }}>const</span>{" "}
							<span style={{ color: "#abb2bf" }}>provide</span>{" "}
							<span style={{ color: "#61afef" }}>=</span>{" "}
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#e06c75" }}>n</span>
							<span style={{ color: "#abb2bf" }}>: </span>
							<span style={{ color: "#61afef" }}>number</span>
							<span style={{ color: "#abb2bf" }}>)</span>{" "}
							<span style={{ color: "#61afef" }}>=&gt;</span>{" "}
							<span style={{ color: "#abb2bf" }}>Effect.</span>
							<span style={{ color: "#61afef" }}>provideService</span>
							<span style={{ color: "#abb2bf" }}>(MyDependency, n)</span>
							{"\n\n"}
							<span style={{ color: "#c678dd" }}>const</span>{" "}
							<span style={{ color: "#abb2bf" }}>getAndLog</span>{" "}
							<span style={{ color: "#61afef" }}>=</span>{" "}
							<span style={{ color: "#abb2bf" }}>MyDependency.</span>
							<span style={{ color: "#61afef" }}>pipe</span>
							<span style={{ color: "#abb2bf" }}>(Effect.</span>
							<span style={{ color: "#61afef" }}>andThen</span>
							<span style={{ color: "#abb2bf" }}>((</span>
							<span style={{ color: "#e06c75" }}>n</span>
							<span style={{ color: "#abb2bf" }}>)</span>{" "}
							<span style={{ color: "#61afef" }}>=&gt;</span>{" "}
							<span style={{ color: "#abb2bf" }}>Console.</span>
							<span style={{ color: "#61afef" }}>log</span>
							<span style={{ color: "#abb2bf" }}>(n)))</span>
							{"\n\n"}
							<span style={{ color: "#c678dd" }}>const</span>{" "}
							<span style={{ color: "#abb2bf" }}>program</span>{" "}
							<span style={{ color: "#61afef" }}>=</span>{" "}
							<span style={{ color: "#abb2bf" }}>Effect.</span>
							<span style={{ color: "#61afef" }}>gen</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#c678dd" }}>function*</span>
							<span style={{ color: "#abb2bf" }}>() {"{"}</span>
							{"\n  "}
							<span style={{ color: "#c678dd" }}>yield*</span>{" "}
							<span style={{ color: "#abb2bf" }}>getAndLog.</span>
							<span style={{ color: "#61afef" }}>pipe</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#61afef" }}>provide</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#d19a66" }}>4</span>
							<span style={{ color: "#abb2bf" }}>), </span>
							<span style={{ color: "#61afef" }}>provide</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#d19a66" }}>3</span>
							<span style={{ color: "#abb2bf" }}>))</span>
							{"\n"}
							<span style={{ color: "#abb2bf" }}>{"}"})</span>
							<span style={{ color: "#abb2bf" }}>.</span>
							<span style={{ color: "#61afef" }}>pipe</span>
							<span style={{ color: "#abb2bf" }}>(Effect.</span>
							<span style={{ color: "#61afef" }}>withSpan</span>
							<span style={{ color: "#abb2bf" }}>(</span>
							<span style={{ color: "#98c379" }}>"program"</span>
							<span style={{ color: "#abb2bf" }}>,</span>
							{"\n  "}
							<span style={{ color: "#abb2bf" }}>
								{"{ attributes: { source: "}
							</span>
							<span style={{ color: "#98c379" }}>"Playground"</span>{" "}
							<span style={{ color: "#abb2bf" }}>{"}"}</span>
							{"\n"}
							<span style={{ color: "#abb2bf" }}>{")"}</span>
							<span style={{ color: "#abb2bf" }}>{")"}</span>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
