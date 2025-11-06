import { useState, useMemo } from "react";
import { EffectSucceedExample } from "@/examples/effect-succeed";
import { EffectFailExample } from "@/examples/effect-fail";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectSleepExample } from "@/examples/effect-sleep";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { getExampleMeta } from "@/lib/examples-manifest";
import type { ExampleComponentProps } from "@/lib/example-types";

const EXAMPLE_TABS = [
	{ id: "effect-succeed", label: "Effect.succeed" },
	{ id: "effect-fail", label: "Effect.fail" },
	{ id: "effect-die", label: "Effect.die" },
	{ id: "effect-sleep", label: "Effect.sleep" },
	{ id: "effect-orelse", label: "Effect.orElse" },
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
	const [activeTab, setActiveTab] = useState<string>("effect-succeed");

	const activeMetadata = useMemo(() => getExampleMeta(activeTab), [activeTab]);
	const ActiveComponent = useMemo(
		() => EXAMPLE_COMPONENTS[activeTab],
		[activeTab],
	);

	return (
		<section className="relative w-full overflow-hidden pt-20 md:pt-32 pb:20 md:pb-24">
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
				<div className="mx-auto mb-8 flex w-full flex-col items-center gap-4">
					<h2 className="text-center text-3xl font-bold leading-tight text-white">
						See Effect in action
					</h2>

				</div>

				{/* Button to Effect Kit */}
				<div className="mx-auto mb-8 flex w-full max-w-[53rem] justify-center">
					<a
						href="https://effect.kitlangton.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-fit items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-black px-5 py-5 text-lg font-medium text-white transition-colors hover:border-zinc-400"
					>
						<span className="flex h-6 w-6 items-center justify-center">
							<i className="ri-shining-2-line text-lg leading-none text-white" />
						</span>
						<span>Visualize Effect</span>
					</a>
				</div>

				{/* Visual Effect Container */}
				<div className="mx-auto flex w-full max-w-[53rem] flex-col gap-4 rounded-2xl border border-zinc-800 p-4">
					{/* Tab Navigation */}
					<div className="scrollbar-hide relative w-full overflow-x-auto">
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
										className={`visual-effect-tab relative flex flex-1 items-center justify-center whitespace-nowrap px-4 py-5 font-mono text-base transition-all ${
											isActive
												? "active font-bold text-white"
												: "font-medium text-zinc-200 opacity-75"
										}`}
										style={{ minWidth: "150px" }}
									>
										{tab.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* Interactive Component */}
					{activeMetadata && ActiveComponent && (
						<div className="w-full overflow-hidden rounded-2xl  border-solid border-zinc-800/50 bg-zinc-900/70">
							<ActiveComponent
								metadata={activeMetadata}
								exampleId={activeMetadata.id}
								index={EXAMPLE_TABS.findIndex((t) => t.id === activeTab)}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
