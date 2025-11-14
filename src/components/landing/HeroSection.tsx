import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

const HERO_COMMANDS: Record<string, string> = {
	npm: "npm install effect",
	pnpm: "pnpm add effect",
	yarn: "yarn add effect",
	bun: "bun add effect",
	deno: "deno init --npm effect-app@latest",
};

export function HeroSection() {
	const [activePackageManager, setActivePackageManager] = useState("npm");
	const [copyFeedback, setCopyFeedback] = useState(false);

	const currentCommand =
		HERO_COMMANDS[activePackageManager] || HERO_COMMANDS.npm;
	const [packageName, ...restParts] = currentCommand.split(" ");
	const restOfCommand = restParts.join(" ");

	const copyCommand = () => {
		navigator.clipboard.writeText(currentCommand).then(() => {
			setCopyFeedback(true);
			setTimeout(() => {
				setCopyFeedback(false);
			}, 2000);
		});
	};

	return (
		<div className="relative mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
			{/* Vertical dashed lines */}
			<div
				className="absolute left-0 top-0 hidden w-px lg:block mx-6"
				style={{
					height: "100%",
					background:
						"linear-gradient(to bottom, #09090b 0%, #3f3f46 50%, #09090b 100%)",
					WebkitMask:
						"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			></div>
			<div
				className="absolute right-0 top-0 hidden w-px lg:block mx-6"
				style={{
					height: "100%",
					background:
						"linear-gradient(to bottom, #09090b 0%, #3f3f46 50%, #09090b 100%)",
					WebkitMask:
						"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			></div>

			{/* Hero Section */}
			<section className="relative mx-auto w-full py-12 md:py-20">
				<div className="container mx-auto max-w-[680px]">
					<div className="text-left sm:text-center">
						<h1 className="leading-tighter mb-8 text-3xl font-bold md:text-5xl">
							React-level structure to backend TypeScript
						</h1>
						<p className="leading:tight mx-auto mb-10 max-w-3xl text-lg text-zinc-400 md:text-xl md:leading-normal">
							Effect is a type-safe language and runtime for building reliable, concurrent, and
							observable systems. 
						</p>

						{/* Package Manager Tabs */}
						<div className="mx-auto max-w-[40rem]">
							{/* Tabs Container with gradient border */}
							<div className="relative rounded-[12px] bg-gradient-to-b from-zinc-700 to-zinc-800 p-[1px]">
								<div className="overflow-hidden rounded-[12px] bg-[#18181b]">
									{/* Tab Headers */}
									<div className="scrollbar-hide flex overflow-x-auto border-b border-zinc-950">
										{(["npm", "pnpm", "yarn", "bun", "deno"] as const).map(
											(pm, index, array) => (
												<button
													type="button"
													key={pm}
													onClick={() => setActivePackageManager(pm)}
													className={`hero-tab-button flex w-[126px] flex-shrink-0 items-center justify-center gap-[8px] py-[16px] text-base font-medium leading-normal transition-colors sm:w-auto sm:flex-1 ${
														index < array.length - 1
															? "border-r border-zinc-950"
															: ""
													} ${
														activePackageManager === pm
															? "bg-[#09090b] text-white"
															: "bg-[#18181b] text-zinc-400 hover:text-white"
													}`}
												>
													<img
														src={getAssetPath(`/assets/logos/${pm === "npm" ? "npm-brands-solid-full" : pm === "pnpm" ? "pnpm-logo" : pm === "yarn" ? "yarn-logo" : pm === "bun" ? "bun-logo-box" : "deno-logo-box"}.svg`)}
														alt={pm}
														className="h-5 w-auto"
													/>
													<span>{pm}</span>
												</button>
											),
										)}
									</div>

									{/* Tab Content */}
									<div className="bg-zinc-950 p-4">
										<div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
											<button
												type="button"
												onClick={copyCommand}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														copyCommand();
													}
												}}
												aria-label={`Copy install command: ${currentCommand}`}
												className="relative flex cursor-pointer items-center justify-between rounded-[8px] border border-zinc-700 bg-gradient-to-l from-zinc-900 to-zinc-950 px-5 py-5 transition-opacity hover:border-zinc-600 hover:opacity-90 sm:col-span-4"
											>
												<code className="font-mono text-base">
													<span className="text-[#60A5FA]">{packageName}</span>
													<span className="text-[#FDBA74]">
														{" "}
														{restOfCommand}
													</span>
												</code>
												{copyFeedback && (
													<output
														aria-live="polite"
														className="absolute right-4 text-base font-medium text-white opacity-100 transition-opacity duration-100"
													>
														Copied!
													</output>
												)}
												<i
													className={`ri-file-copy-line text-base transition-opacity ${
														copyFeedback ? "opacity-0" : "opacity-100"
													} text-zinc-400`}
													aria-hidden="true"
												></i>
											</button>
											<a
												href="https://effect.website/docs/"
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-zinc-700 px-4 py-4 text-lg font-medium leading-normal text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white sm:col-span-1 md:text-base"
											>
												<span>Docs</span>
												<i className="ri-arrow-right-line text-base"></i>
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Stats */}
							<div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-base leading-normal opacity-80 md:gap-8">
								<div className="flex items-center gap-2">
									<i
										className="ri-github-fill flex h-[1.5rem] items-center justify-center text-lg text-zinc-400"
										aria-hidden="true"
									></i>
									<span className="text-zinc-400">
										<span className="sr-only">GitHub: </span>11k+ stars
									</span>
								</div>
								<div className="flex items-center gap-2">
									<i
										className="ri-download-line flex h-[1.5rem] items-center justify-center text-lg text-zinc-400"
										aria-hidden="true"
									></i>
									<span className="text-zinc-400">
										<span className="sr-only">npm downloads: </span>5M+ weekly
										downloads
									</span>
								</div>
								<div className="flex items-center gap-2">
									<i
										className="ri-discord-fill flex h-[1.5rem] items-center justify-center text-lg text-zinc-400"
										aria-hidden="true"
									></i>
									<span className="text-zinc-400">
										<span className="sr-only">Discord: </span>5k+ members
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Section */}
			<section className="relative mx-auto">
				<div className="mx-auto max-w-[66.5rem]">
					<div className="relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/50">
						{/* Placeholder for video */}
						<div className="relative flex aspect-video w-full items-center justify-center bg-zinc-900/50">
							<div className="text-center">
								<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800">
									<svg
										className="h-8 w-8 text-zinc-400"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-label="Video play icon"
									>
										<title>Video placeholder</title>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
								<p className="font-mono text-sm text-zinc-400">
									Effect Video Placeholder
								</p>
								<p className="mt-2 text-xs text-zinc-500">
									Replace with correct YouTube video ID
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
