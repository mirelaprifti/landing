import { useState, useMemo } from "react";
import { EffectSucceedExample } from "@/examples/effect-succeed";
import { EffectFailExample } from "@/examples/effect-fail";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectSleepExample } from "@/examples/effect-sleep";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { getExampleMeta } from "@/lib/examples-manifest";
import type { ExampleComponentProps } from "@/lib/example-types";

const EXAMPLE_TABS = [
	{ id: "effect-orelse", label: "Effect.orElse" },
	{ id: "effect-succeed", label: "Effect.succeed" },
	{ id: "effect-fail", label: "Effect.fail" },
	{ id: "effect-die", label: "Effect.die" },
	{ id: "effect-sleep", label: "Effect.sleep" },
] as const;

const EXAMPLE_COMPONENTS: Record<
	string,
	React.ComponentType<ExampleComponentProps>
> = {
	"effect-succeed": EffectSucceedExample,
	"effect-fail": EffectFailExample,
	"effect-die": EffectDieExample,
	"effect-sleep": EffectSleepExample,
	"effect-orelse": EffectOrElseExample,
};

export function VisualEffectShowcaseSection() {
	const [activeTab, setActiveTab] = useState<string>("effect-orelse");

	const activeMetadata = useMemo(() => getExampleMeta(activeTab), [activeTab]);
	const ActiveComponent = useMemo(
		() => EXAMPLE_COMPONENTS[activeTab],
		[activeTab],
	);

	return (
		<section className="relative w-full overflow-hidden pt-20 md:pt-32 pb-20 md:pb-24">
			{/* Top gradient border */}
			<div
				className="absolute left-0 right-0 top-0 h-[2px]"
				style={{
					background:
						"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(9, 9, 11, 0) 100%)",
				}}
			></div>

			<div className="container mx-auto w-full px-4 md:px-8">
				{/* Heading and Subheading */}
				<div className="mx-auto mb-20 flex w-full flex-col items-center gap-4">
					<h2 className="text-center text-3xl font-bold leading-tight text-white">
						See Effect in action
					</h2>
				</div>

				{/* Visual Effect Container */}
				<div className="mx-auto flex w-full max-w-[66.5rem] flex-col relative px-20 py-6">
					{/* Left dashed border */}
					<div
						className="absolute top-0 left-0 bottom-0 w-[1px]"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					></div>
					{/* Right dashed border */}
					<div
						className="absolute top-0 right-0 bottom-0 w-[1px]"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					></div>
					{/* Heading with Link */}
					<div className="mb-8 flex w-full items-center justify-between">
						<h2 className="font-inter text-2xl font-semibold leading-tight text-white">
							Visualize Effect
						</h2>
						<a
							href="https://effect.kitlangton.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
						>
							<span>More visuals</span>
							<i className="ri-arrow-right-up-line text-base"></i>
						</a>
					</div>

					{/* Tab Navigation and Interactive Component */}
					<div className="flex flex-col gap-3 p-6 border border-zinc-800 rounded-lg">
						{/* Tab Navigation */}
						<div className="scrollbar-hide relative w-full overflow-x-auto py-1">
							<div
								className="absolute top-0 left-0 right-0 h-[1px]"
								style={{
									background: "#3f3f46",
									WebkitMask:
										"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
									mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
								}}
							></div>
							<div
								className="absolute bottom-0 left-0 right-0 h-[1px]"
								style={{
									background: "#3f3f46",
									WebkitMask:
										"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
									mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
								}}
							></div>
							<div className="flex w-full min-w-max">
								{EXAMPLE_TABS.map((tab) => {
									const isActive = activeTab === tab.id;
									return (
										<button
											key={tab.id}
											type="button"
											onClick={() => setActiveTab(tab.id)}
											className={`visual-effect-tab relative flex flex-1 items-center justify-center whitespace-nowrap px-4 py-4 font-mono text-base transition-all ${
												isActive
													? "active font-bold text-white"
													: "font-medium text-zinc-300"
											}`}
											style={{ minWidth: "20%" }}
										>
											{tab.label}
										</button>
									);
								})}
							</div>
						</div>

						{/* Interactive Component */}
						{activeMetadata && ActiveComponent && (
							<div className="w-full overflow-hidden rounded-2xl  border-solid border-zinc-950 bg-zinc-900">
								<ActiveComponent
									metadata={activeMetadata}
									exampleId={activeMetadata.id}
									index={EXAMPLE_TABS.findIndex((t) => t.id === activeTab)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
