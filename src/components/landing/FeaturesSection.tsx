import { useState } from "react";
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

export function FeaturesSection() {
	const [activeTab, setActiveTab] = useState<TabId>("schedule");

	return (
		<section className="relative w-full">
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

			{/* Content Container */}
			<div className="relative pb-16 pt-16 md:py-32">
				{/* Primitives for Production */}
				<div className="relative mx-auto flex max-w-[66.5rem] flex-col px-4 md:px-0">
					{/* Heading with Learn Effect link */}
						<div className="mb-6 flex w-full items-start justify-between">
							<h2 className="font-inter text-2xl font-semibold leading-tight text-white">
								Primitives for production
							</h2>
							<a
								href="https://effect.kitlangton.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-[6px] flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
							>
								<span>Visual Effects</span>
								<i className="ri-arrow-right-up-line text-base"></i>
							</a>
						</div>

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
			</div>

			{/* Solid bottom border */}
			<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-800" />
		</section>
	);
}
