import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";
import { EffectAllExample } from "@/examples/effect-all";
import { EffectAllShortCircuitExample } from "@/examples/effect-all-short-circuit";
import { EffectRaceExample } from "@/examples/effect-race";
import { EffectSucceedExample } from "@/examples/effect-succeed";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { EffectRetryRecursExample } from "@/examples/effect-retry-recurs";
import { EffectRepeatSpacedExample } from "@/examples/effect-repeat-spaced";
import { getExampleMeta } from "@/lib/examples-manifest";
import type { ExampleComponentProps } from "@/lib/example-types";

const HERO_COMMANDS: Record<string, string> = {
	npm: "npm install effect",
	pnpm: "pnpm add effect",
	yarn: "yarn add effect",
	bun: "bun add effect",
	deno: "deno init --npm effect-app@latest",
};

type TabId = "concurrency" | "constructors" | "error-handling" | "schedule";

const EXAMPLE_COMPONENTS: Record<
	string,
	React.ComponentType<ExampleComponentProps>
> = {
	"effect-all": EffectAllExample,
	"effect-all-short-circuit": EffectAllShortCircuitExample,
	"effect-race": EffectRaceExample,
	"effect-succeed": EffectSucceedExample,
	"effect-die": EffectDieExample,
	"effect-orelse": EffectOrElseExample,
	"effect-retry-recurs": EffectRetryRecursExample,
	"effect-repeat-spaced": EffectRepeatSpacedExample,
};

const TAB_CONFIG: Record<TabId, { label: string; examples: string[] }> = {
	schedule: {
		label: "Schedule",
		examples: ["effect-retry-recurs", "effect-repeat-spaced"],
	},
	"error-handling": {
		label: "Error Handling",
		examples: ["effect-all-short-circuit", "effect-orelse"],
	},
	concurrency: {
		label: "Concurrency",
		examples: ["effect-all", "effect-race"],
	},
	constructors: {
		label: "Constructors",
		examples: ["effect-succeed", "effect-die"],
	},
};

export function HeroSection() {
	const [activePackageManager, setActivePackageManager] = useState("npm");
	const [copyFeedback, setCopyFeedback] = useState(false);
	const [activeTab, setActiveTab] = useState<TabId>("schedule");

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
		<div className="relative mx-auto w-full pb-16 md:pb-32">
			{/* Hero Section */}
			<section className="relative mx-auto w-full py-12 md:py-26 px-4 md:px-8">
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
						<div className="max-w-[36rem]">
							{/* Tabs Container */}
							<div className="relative rounded-[8px] border border-zinc-600 bg-zinc-900/88 overflow-hidden">
								{/* Tab Headers */}
								<div className="scrollbar-hide flex overflow-hidden gap-0.5">
										{(["npm", "bun", "pnpm", "yarn", "deno"] as const).map(
											(pm) => (
												<button
													type="button"
													key={pm}
													onClick={() => setActivePackageManager(pm)}
													className={`hero-tab-button flex w-[126px] flex-shrink-0 items-center justify-center gap-2 py-4 text-base font-mono leading-normal transition-colors cursor-pointer sm:w-auto sm:flex-1 opacity-88 ${
														activePackageManager === pm
															? "bg-zinc-900/30 text-white opacity-0"
															: "bg-zinc-950 text-zinc-300/75 hover:text-white"
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
									<div className="px-5 py-5">
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
												className="w-full relative flex cursor-pointer items-center justify-between bg-zinc-950 rounded-[4px] px-5 py-3 transition-opacity hover:opacity-90"
											>
												<code className="font-mono text-base text-zinc-300/88">
													{packageName} {restOfCommand}
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
									</div>
							</div>

							{/* Stats */}
							<div className="mt-6 flex flex-wrap items-center justify-between font-mono text-base leading-normal opacity-80">
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

			{/* Features Section */}
			<section className="relative mx-auto pt-24 px-4 md:px-8">
				{/* Dashed top border */}
				<div
					className="absolute left-0 right-0 top-0 h-[1px]"
					style={{
						background: "#27272a",
						WebkitMask:
							"repeating-linear-gradient(to right, black 0px, black 1px, transparent 1px, transparent 4px)",
						mask: "repeating-linear-gradient(to right, black 0px, black 1px, transparent 1px, transparent 4px)",
					}}
				/>
				<div className="mx-auto max-w-[73.75rem]">
					{/* Tab Navigation and Content - wrapped together */}
					<div className="mb-6 relative rounded-[12px] bg-gradient-to-b from-zinc-700 to-zinc-800 p-[1px]">
						<div className="overflow-hidden rounded-[12px] bg-zinc-950">
							{/* Tab Headers */}
							<div className="flex">
								{(Object.keys(TAB_CONFIG) as TabId[]).map((tabId, index, array) => (
									<button
										key={tabId}
										onClick={() => setActiveTab(tabId)}
										className={`flex-1 py-[16px] px-6 font-mono text-base uppercase transition-colors ${
											index < array.length - 1 ? "border-r border-zinc-950" : ""
										} ${
											activeTab === tabId
												? "bg-zinc-950 text-white"
												: `bg-[#18181b] text-zinc-400 hover:text-white ${index < array.length - 1 ? "border-b border-zinc-950" : ""}`
										}`}
									>
										{TAB_CONFIG[tabId].label}
									</button>
								))}
							</div>

							{/* Tab Content */}
							<div className="w-full p-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
									{TAB_CONFIG[activeTab].examples.map((exampleId, index) => {
										const metadata = getExampleMeta(exampleId);
										const Component = EXAMPLE_COMPONENTS[exampleId];
										return (
											<div key={exampleId} className="w-full text-sm h-full">
												{metadata && Component && (
													<Component
														metadata={metadata}
														exampleId={exampleId}
														index={index}
													/>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
