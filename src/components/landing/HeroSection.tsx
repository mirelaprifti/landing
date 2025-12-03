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
	const [isHovered, setIsHovered] = useState(false);

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
		<div className="relative mx-auto w-full pt-16 pb-16 md:pt-26 md:pb-24">
			{/* Hero Section */}
			<section className="relative mx-auto w-full px-4 md:px-8">
				{/* Subtle diagonal gradient background on right side */}
				<div
					className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none"
					style={{
						background: "linear-gradient(135deg, transparent 0%, rgba(39, 39, 42, 0.3) 50%, transparent 100%)",
						filter: "blur(80px)",
					}}
				/>

				<div className="container mx-auto max-w-[73.75rem] px-4">
					<div className="text-left max-w-[64rem]">
						<h1 className="leading-tighter mb-6 text-xl font-semibold md:text-5xl">
							The TypeScript framework for reliable and scalable systems
						</h1>
						<p className="leading:tight mb-10 max-w-[37.5rem] text-lg text-zinc-400 md:text-lg md:leading-normal">
							Predictable, debuggable, and built to scale code. Effect is trusted by engineers building AI, infrastructure, and beyond.
						</p>

						{/* Package Manager Tabs */}
						<div className="max-w-[35.25rem]">
							{/* Tabs Container */}
							<div className="relative rounded-[8px] border border-zinc-800 bg-zinc-950 overflow-hidden shadow-[0_4px_20px_4px_rgba(39,39,42,0.3),0_4px_8px_0_rgba(0,0,0,0.5)]">
								{/* Tab Headers */}
								<div className="scrollbar-hide flex overflow-hidden gap-[1px]">
										{(["npm", "bun", "pnpm", "yarn", "deno"] as const).map(
											(pm) => (
												<button
													type="button"
													key={pm}
													onClick={() => setActivePackageManager(pm)}
													className={`hero-tab-button flex w-[126px] flex-shrink-0 items-center justify-center gap-2 py-4 text-base font-mono leading-normal transition-colors cursor-pointer sm:w-auto sm:flex-1 ${
														activePackageManager === pm
															? "bg-zinc-950 text-white"
															: "bg-zinc-900/70 text-zinc-300/75 hover:text-white"
													}`}
													aria-label={pm}
												>
													<img
														src={getAssetPath(`/assets/logos/${pm === "npm" ? "npm-brands-solid-full" : pm === "pnpm" ? "pnpm-logo" : pm === "yarn" ? "yarn-logo" : pm === "bun" ? "bun-logo-box" : "deno-logo-box"}.svg`)}
														alt={pm}
														className={pm === "pnpm" ? "h-5 w-auto" : "h-6 w-auto"}
													/>
													<span>{pm}</span>
												</button>
											),
										)}
									</div>

									{/* Tab Content */}
									<div className="bg-zinc-950">
															<button
												type="button"
												onClick={copyCommand}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														copyCommand();
													}
												}}
												onMouseEnter={() => setIsHovered(true)}
												onMouseLeave={() => setIsHovered(false)}
												aria-label={`Copy install command: ${currentCommand}`}
												className="w-full relative flex cursor-pointer px-5.5 py-5 items-center justify-between rounded-[0px] transition-opacity"
											>
												<code className="font-mono text-base text-zinc-200">
													<span style={{ color: "#5795E2" }}>{packageName}</span> <span style={{ color: "#E5A86A" }}>{restOfCommand}</span>
												</code>
												{copyFeedback ? (
													<output
														aria-live="polite"
														className="text-base font-medium text-zinc-100 transition-opacity duration-100"
													>
														Copied!
													</output>
												) : isHovered ? (
													<span className="text-base font-normal text-zinc-400 transition-opacity duration-100">
														Copy!
													</span>
												) : (
													<i
														className="ri-file-copy-line text-base text-zinc-400"
														aria-hidden="true"
													></i>
												)}
											</button>
									</div>
							</div>

							{/* Stats */}
							<div className="mt-6 ml-[1rem] mr-[1.25rem] flex flex-wrap items-center justify-between font-mono text-base leading-normal opacity-80">
								<div className="flex items-center gap-2">
									<i
										className="ri-github-fill flex h-[1.5rem] items-center justify-center text-lg text-zinc-400/75"
										aria-hidden="true"
									></i>
									<span className="text-zinc-400">
										<span className="sr-only">GitHub: </span>12k+ stars
									</span>
								</div>
								<div className="flex items-center gap-2">
									<i
										className="ri-download-line flex h-[1.5rem] items-center justify-center text-lg text-zinc-400"
										aria-hidden="true"
									></i>
									<span className="text-zinc-400">
										<span className="sr-only">npm downloads: </span>6M+
										downloads/w
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
		</div>
	);
}
