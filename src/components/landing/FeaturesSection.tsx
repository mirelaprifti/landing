import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { EffectAllExample } from "@/examples/effect-all";
import { EffectAllShortCircuitExample } from "@/examples/effect-all-short-circuit";
import { EffectRaceExample } from "@/examples/effect-race";
import { EffectRaceAllExample } from "@/examples/effect-raceall";
import { EffectForEachExample } from "@/examples/effect-foreach";
import { EffectSucceedExample } from "@/examples/effect-succeed";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectFailExample } from "@/examples/effect-fail";
import { EffectSyncExample } from "@/examples/effect-sync";
import { EffectPromiseExample } from "@/examples/effect-promise";
import { EffectSleepExample } from "@/examples/effect-sleep";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { EffectTimeoutExample } from "@/examples/effect-timeout";
import { EffectRetryExample as EffectEventuallyExample } from "@/examples/effect-eventually";
import { EffectPartitionLickTestExample } from "@/examples/effect-partition";
import { EffectValidateExample } from "@/examples/effect-validate";
import { EffectRetryRecursExample } from "@/examples/effect-retry-recurs";
import { EffectRetryExponentialExample } from "@/examples/effect-retry-exponential";
import { EffectRepeatSpacedExample } from "@/examples/effect-repeat-spaced";
import { EffectRepeatWhileOutputExample } from "@/examples/effect-repeat-while-output";
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
	"effect-raceall": EffectRaceAllExample,
	"effect-foreach": EffectForEachExample,
	"effect-succeed": EffectSucceedExample,
	"effect-die": EffectDieExample,
	"effect-fail": EffectFailExample,
	"effect-sync": EffectSyncExample,
	"effect-promise": EffectPromiseExample,
	"effect-sleep": EffectSleepExample,
	"effect-orelse": EffectOrElseExample,
	"effect-timeout": EffectTimeoutExample,
	"effect-eventually": EffectEventuallyExample,
	"effect-partition": EffectPartitionLickTestExample,
	"effect-validate": EffectValidateExample,
	"effect-retry-recurs": EffectRetryRecursExample,
	"effect-retry-exponential": EffectRetryExponentialExample,
	"effect-repeat-spaced": EffectRepeatSpacedExample,
	"effect-repeat-while-output": EffectRepeatWhileOutputExample,
};

interface SubTab {
	id: string;
	label: [string, string];
}

interface TabConfig {
	label: string;
	examples?: string[];
	subTabs?: SubTab[];
}

const TAB_CONFIG: Record<TabId, TabConfig> = {
	schedule: {
		label: "Schedule",
		subTabs: [
			{ id: "effect-retry-recurs", label: ["Effect.retry", "recurs"] },
			{ id: "effect-retry-exponential", label: ["Effect.retry", "exponential"] },
			{ id: "effect-repeat-spaced", label: ["Effect.repeat", "spaced"] },
			{ id: "effect-repeat-while-output", label: ["Effect.repeat", "whileOutput"] },
		],
	},
	concurrency: {
		label: "Concurrency",
		subTabs: [
			{ id: "effect-all", label: ["Effect.all", ""] },
			{ id: "effect-race", label: ["Effect.race", ""] },
			{ id: "effect-raceall", label: ["Effect.raceAll", ""] },
			{ id: "effect-foreach", label: ["Effect.forEach", ""] },
		],
	},
	"error-handling": {
		label: "Error Handling",
		subTabs: [
			{ id: "effect-all-short-circuit", label: ["Effect.all", "short-circuit"] },
			{ id: "effect-orelse", label: ["Effect.orElse", ""] },
			{ id: "effect-timeout", label: ["Effect.timeout", ""] },
			{ id: "effect-eventually", label: ["Effect.eventually", ""] },
			{ id: "effect-partition", label: ["Effect.partition", ""] },
			{ id: "effect-validate", label: ["Effect.validate", ""] },
		],
	},
	constructors: {
		label: "Constructors",
		subTabs: [
			{ id: "effect-succeed", label: ["Effect.succeed", ""] },
			{ id: "effect-die", label: ["Effect.die", ""] },
			{ id: "effect-fail", label: ["Effect.fail", ""] },
			{ id: "effect-sync", label: ["Effect.sync", ""] },
			{ id: "effect-promise", label: ["Effect.promise", ""] },
			{ id: "effect-sleep", label: ["Effect.sleep", ""] },
		],
	},
};

const TAB_IDS = Object.keys(TAB_CONFIG) as TabId[];

export function FeaturesSection() {
	const [activeTab, setActiveTab] = useState<TabId>("schedule");
	const [activeSubTabPerTab, setActiveSubTabPerTab] = useState<Record<TabId, string>>({
		schedule: "effect-retry-recurs",
		concurrency: "effect-all",
		"error-handling": "effect-all-short-circuit",
		constructors: "effect-succeed",
	});
	const subTabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
	const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
	const [shouldAnimateIndicator, setShouldAnimateIndicator] = useState(true);
	const prevActiveTab = useRef(activeTab);

	const handleSubTabChange = (subTabId: string) => {
		setActiveSubTabPerTab(prev => ({
			...prev,
			[activeTab]: subTabId,
		}));
	};

	const activeTabIndex = useMemo(
		() => TAB_IDS.indexOf(activeTab),
		[activeTab]
	);

	const currentTabConfig = TAB_CONFIG[activeTab];

	// Get the current active sub-tab for this tab
	const currentActiveSubTab = useMemo(() => {
		return activeSubTabPerTab[activeTab];
	}, [activeSubTabPerTab, activeTab]);

	// Update indicator position when active sub-tab changes
	useEffect(() => {
		// Disable animation when main tab changes
		if (prevActiveTab.current !== activeTab) {
			setShouldAnimateIndicator(false);
			prevActiveTab.current = activeTab;
		}

		const activeButton = subTabRefs.current.get(currentActiveSubTab);
		if (activeButton) {
			const container = activeButton.parentElement;
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const buttonRect = activeButton.getBoundingClientRect();
				setIndicatorStyle({
					top: buttonRect.top - containerRect.top,
					height: buttonRect.height,
				});
			}
		}

		// Re-enable animation after position is set
		requestAnimationFrame(() => {
			setShouldAnimateIndicator(true);
		});
	}, [currentActiveSubTab, activeTab]);

	return (
		<section className="relative w-full">
			{/* Section heading */}
			<div className="pt-12 pb-8 text-center">
				<h2 className="text-2xl font-semibold text-white md:text-3xl">
					See Effect in action
				</h2>
				<p className="mt-3 text-zinc-400">
					Interactive examples of core patterns
				</p>
			</div>

			{/* Content Container */}
			<div className="relative max-w-295 mx-auto px-4 pb-16 md:pb-8">
				{/* Tab Navigation and Content */}
				<div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/20">
					{/* Tab Headers */}
					<div className="relative flex border-b border-zinc-800">
						{TAB_IDS.map((tabId) => (
							<button
								key={tabId}
								onClick={() => setActiveTab(tabId)}
								className={`flex-1 cursor-pointer py-5 px-6 font-mono text-base uppercase transition-colors ${
									activeTab === tabId
										? "bg-zinc-950 text-white font-medium"
										: "bg-zinc-950 text-zinc-300 leading-relaxed hover:text-white"
								}`}
							>
								{TAB_CONFIG[tabId].label}
							</button>
						))}
						{/* Sliding indicator */}
						<motion.div
							className="absolute bottom-0 h-px bg-zinc-300"
							initial={false}
							animate={{
								left: `${(activeTabIndex / TAB_IDS.length) * 100}%`,
								width: `${100 / TAB_IDS.length}%`,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 25,
								mass: 0.8,
							}}
						/>
					</div>

					{/* Tab Content */}
					<div className="w-full py-4 px-4">
						{currentTabConfig.subTabs ? (
							/* Sub-tabs layout: 3/4 content + 1/4 nav (nav on right) */
							<div className="flex flex-col md:flex-row gap-0">
								{/* Example component - 3/4 width */}
								<div className="md:w-3/4">
									{(() => {
										const metadata = getExampleMeta(currentActiveSubTab);
										const Component = EXAMPLE_COMPONENTS[currentActiveSubTab];
										return metadata && Component ? (
											<div className="w-full text-sm h-full">
												<Component
													metadata={metadata}
													exampleId={currentActiveSubTab}
													index={0}
												/>
											</div>
										) : null;
									})()}
								</div>
								{/* Sub-tab navigation - 1/4 width (on right) */}
								<div className="md:w-1/4 flex md:flex-col gap-4 relative md:mr-0 md:ml-2 pt-5">
									{currentTabConfig.subTabs.map((subTab) => (
										<button
											key={subTab.id}
											ref={(el) => {
												if (el) subTabRefs.current.set(subTab.id, el);
											}}
											onClick={() => handleSubTabChange(subTab.id)}
											className={`flex flex-col items-end px-4 text-right transition-colors cursor-pointer ${
												currentActiveSubTab === subTab.id
													? "text-white"
													: "text-zinc-400 hover:text-white"
											}`}
										>
											<span className="font-mono text-base">{subTab.label[0]}</span>
											{subTab.label[1] && (
												<span className="font-mono text-sm text-zinc-400/70">{subTab.label[1]}</span>
											)}
										</button>
									))}
									{/* Sliding indicator */}
									<motion.div
										className="absolute right-0 w-px bg-zinc-100"
										initial={false}
										animate={{
											top: indicatorStyle.top,
											height: indicatorStyle.height,
										}}
										transition={shouldAnimateIndicator ? {
											type: "spring",
											stiffness: 300,
											damping: 25,
											mass: 0.8,
										} : { duration: 0 }}
									/>
								</div>
							</div>
						) : (
							/* Grid layout for other tabs */
							<div className="grid grid-cols-1 md:grid-cols-2 gap-0 auto-rows-fr">
								{currentTabConfig.examples?.map((exampleId, index) => {
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
						)}
					</div>
				</div>
			</div>

			{/* Solid bottom border */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-800/50" />
		</section>
	);
}
