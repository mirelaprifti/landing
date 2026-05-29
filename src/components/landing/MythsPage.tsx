import { motion, useReducedMotion } from "motion/react";
import { getAssetPath } from "../../utils/assetPath";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

type Visual =
	| {
			kind: "stat";
			value: string;
			label: string;
			sublabel?: string;
			striken?: boolean;
			chips?: string[];
		}
	| { kind: "compare"; left: string; right: string; relation: string }
	| { kind: "logos"; items: { src: string; alt: string; h?: number }[] }
	| { kind: "code"; lines: string[] }
	| {
			kind: "chart";
			title: string;
			bars: { label: string; value: string; pct: number; emphasis?: boolean }[];
			note?: string;
		}
	| {
			kind: "fns";
			sections: {
				title: string;
				groups?: { label: string; items: { name: string; href: string }[] }[];
				items?: { name: string; href: string }[];
			}[];
		};

type Myth = {
	id: string;
	short: string;
	title: string;
	body: string[];
	visual: Visual;
	lists?: {
		title: string;
		groups?: { label: string; items: { name: string; href: string }[] }[];
		items?: { name: string; href: string }[];
	}[];
};

const MYTHS: Myth[] = [
	{
		id: "generators-slow",
		short: "Generators are slow",
		title: "Effect heavily relies on generators and generators are slow",
		visual: {
			kind: "compare",
			left: "async / await",
			relation: "≡",
			right: "generators",
		},
		body: [
			"Effect's internal architecture doesn't depend on generators — they're used only for an API design that mimics async/await syntax. Internally, async/await and generators use equivalent mechanics with identical performance characteristics.",
			"The performance concern applies specifically to collection data transformation using generators — plain arrays are recommended there instead. If async/await doesn't concern you, Effect's generator-based API shouldn't either.",
		],
	},
	{
		id: "500x-slower",
		short: "It makes code 500x slower",
		title: "Effect will make your code 500x slower",
		visual: {
			kind: "stat",
			value: "500×",
			label: "Myth",
			sublabel: "Only applies to micro-benchmarks of 1 + 1",
			striken: true,
		},
		body: [
			"This comparison only applies when measuring trivial operations like 1 + 1 against Effect-wrapped equivalents. The performance difference stems from JIT compiler optimization differences, not Effect itself.",
			"In realistic scenarios, Effect serves as an app-level coordination library rather than a low-level operation wrapper. Actual performance bottlenecks typically come from concurrency mismanagement rather than Effect overhead.",
		],
	},
	{
		id: "performance-overhead",
		short: "Huge performance overhead",
		title: "Effect has a huge performance overhead",
		visual: {
			kind: "stat",
			value: "120 FPS",
			label: "In production",
			sublabel: "Frontends running Effect intensively",
		},
		body: [
			"Performance depends on context. Many JavaScript bottlenecks originate from poor concurrency handling — areas where Effect's structured concurrency and observability features provide advantages.",
			"Frontend applications run at 120fps using Effect intensively. Memory usage remains comparable to equivalent non-Effect code performing identical tasks. Adopt Effect and monitor actual performance rather than optimizing speculatively.",
		],
	},
	{
		id: "impossible-to-learn",
		short: "Impossible to learn",
		title: "Effect is impossible to learn — there are so many functions and modules",
		visual: {
			kind: "fns",
			sections: [
				{
					title: "Starter functions",
					groups: [
						{
							label: "Create",
							items: [
								{ name: "Effect.succeed", href: "https://effect.website/docs/getting-started/creating-effects/#succeed" },
								{ name: "Effect.fail", href: "https://effect.website/docs/getting-started/creating-effects/#fail" },
								{ name: "Effect.sync", href: "https://effect.website/docs/getting-started/creating-effects/#sync" },
								{ name: "Effect.tryPromise", href: "https://effect.website/docs/getting-started/creating-effects/#trypromise" },
							],
						},
						{
							label: "Compose",
							items: [
								{ name: "Effect.andThen", href: "https://effect.website/docs/getting-started/building-pipelines/#andthen" },
								{ name: "Effect.map", href: "https://effect.website/docs/getting-started/building-pipelines/#map" },
								{ name: "Effect.tap", href: "https://effect.website/docs/getting-started/building-pipelines/#tap" },
							],
						},
						{
							label: "Run",
							items: [
								{ name: "Effect.gen", href: "https://effect.website/docs/getting-started/using-generators/" },
								{ name: "Effect.runPromise", href: "https://effect.website/docs/getting-started/running-effects/#runpromise" },
							],
						},
						{
							label: "Handle errors",
							items: [
								{ name: "Effect.catchTag", href: "https://effect.website/docs/error-management/expected-errors/#catchtag" },
								{ name: "Effect.catchAll", href: "https://effect.website/docs/error-management/expected-errors/#catchall" },
							],
						},
						{
							label: "Manage resources",
							items: [
								{ name: "Effect.acquireRelease", href: "https://effect.website/docs/resource-management/scope/#acquirerelease" },
								{ name: "Effect.acquireUseRelease", href: "https://effect.website/docs/resource-management/introduction/#acquireuserelease" },
							],
						},
						{
							label: "Provide dependencies",
							items: [
								{ name: "Effect.provide", href: "https://effect.website/docs/requirements-management/layers/#providing-a-layer-to-an-effect" },
								{ name: "Effect.provideService", href: "https://effect.website/docs/requirements-management/services/#providing-a-service-implementation" },
							],
						},
					],
				},
				{
					title: "Starter modules",
					items: [
						{ name: "Effect", href: "https://effect-ts.github.io/effect/effect/Effect.ts.html" },
						{ name: "Context", href: "https://effect.website/docs/requirements-management/services/#creating-a-service" },
						{ name: "Layer", href: "https://effect.website/docs/requirements-management/layers/" },
						{ name: "Option", href: "https://effect.website/docs/data-types/option/" },
						{ name: "Either", href: "https://effect.website/docs/data-types/either/" },
						{ name: "Array", href: "https://effect-ts.github.io/effect/effect/Array.ts.html" },
						{ name: "Match", href: "https://effect.website/docs/code-style/pattern-matching/" },
					],
				},
			],
		},
		body: [
			"The full Effect ecosystem is extensive, but productivity doesn't require all of it. You can start with 10–20 core functions and progressively discover additional capabilities, similar to learning TypeScript without knowing every npm package.",
		],
	},
	{
		id: "bundle-size",
		short: "Bundle size is huge",
		title: "The bundle size is HUGE",
		visual: {
			kind: "stat",
			value: "~25 KB",
			label: "Min gzipped",
			sublabel: "Runtime + most functions a typical app needs",
		},
		body: [
			"The minimum gzipped bundle cost is approximately 25KB, containing the Effect runtime plus most of the functions needed in a typical application. Effect tree-shakes effectively, so only the code you use gets included.",
			"Adopting Effect often reduces overall bundle size by replacing scattered library code with more concise application code.",
		],
	},
	{
		id: "same-as-rxjs",
		short: "Same as RxJS",
		title: "Effect is the same as RxJS and shares its problems",
		visual: {
			kind: "compare",
			left: "RxJS",
			relation: "≠",
			right: "Effect",
		},
		body: [
			"RxJS is respected, but the projects have fundamentally different objectives. RxJS focuses on Observable-based reactive extensions; Effect targets production-grade TypeScript development.",
			"The critical distinction is architectural: RxJS streams are multi-shot (emitting multiple or zero elements), while Effect's core type is single-shot, optimized as a sophisticated lazy Promise supporting imperative programming similar to async/await.",
			"Effect also provides explicit typing for errors and dependencies with full type-safety, whereas RxJS focuses on the happy path. RxJS suits reactive Observable programming; Effect suits production TypeScript with integrated telemetry, error handling, and dependency injection.",
		],
	},
	{
		id: "should-be-a-language",
		short: "Should be a language",
		title: "Effect should be a language, or use a different language",
		visual: {
			kind: "stat",
			value: "78%",
			label: "Adoption rate",
			sublabel: "TypeScript is no longer optional",
		},
		body: [
			"Neither alternative resolves production-grade TypeScript development challenges. TypeScript's unique strength includes full-stack compatibility, deep JavaScript ecosystem integration, and industrial adoption by major companies.",
			"Effect's existence within TypeScript — enabled by features like generators supporting custom types — makes TypeScript distinctive. Even functional languages like Scala provide less optimal effect system interoperability.",
		],
	},
];

function VisualBlock({ visual }: { visual: Visual }) {
	if (visual.kind === "stat") {
		return (
			<div className="relative flex aspect-square flex-col justify-between rounded-md border border-zinc-200 bg-zinc-50/40 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
				<p className="font-mono text-xs tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
					{visual.label}
				</p>
				<p
					className={`font-mono font-bold tracking-tight ${
						visual.striken
							? "text-zinc-700 line-through decoration-zinc-900 decoration-4 dark:text-zinc-400 dark:decoration-zinc-300"
							: "text-zinc-900 dark:text-white"
					}`}
					style={{ fontSize: "clamp(4rem, 10vw, 7rem)", lineHeight: 1 }}
				>
					{visual.value}
				</p>
				{visual.chips ? (
					<ul className="flex flex-wrap gap-1.5">
						{visual.chips.map((chip) => (
							<li
								key={chip}
								className="inline-flex items-center rounded-md border border-zinc-300 px-2 py-0.5 font-mono text-[0.7rem] text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
							>
								{chip}
							</li>
						))}
					</ul>
				) : (
					visual.sublabel && (
						<p className="text-sm text-zinc-700 dark:text-zinc-300">
							{visual.sublabel}
						</p>
					)
				)}
			</div>
		);
	}

	if (visual.kind === "compare") {
		return (
			<div className="relative flex aspect-square items-center justify-center rounded-md border border-zinc-200 bg-zinc-50/40 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
				<div className="flex flex-col items-center gap-3 font-mono text-xl md:text-3xl">
					<span className="text-zinc-900 dark:text-white">{visual.left}</span>
					<span className="text-4xl font-bold text-zinc-700 md:text-6xl dark:text-zinc-400">
						{visual.relation}
					</span>
					<span className="text-zinc-900 dark:text-white">{visual.right}</span>
				</div>
			</div>
		);
	}

	if (visual.kind === "chart") {
		return (
			<div className="relative flex aspect-square flex-col justify-center gap-6 rounded-md border border-zinc-200 bg-zinc-50/40 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
				<p className="font-mono text-xs tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
					{visual.title}
				</p>
				<div className="flex flex-col gap-5">
					{visual.bars.map((bar) => (
						<div key={bar.label} className="space-y-1.5">
							<div className="flex items-baseline justify-between">
								<p className="font-mono text-[0.7rem] tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
									{bar.label}
								</p>
								<p className={`font-mono text-sm tabular-nums ${bar.emphasis ? "font-bold text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}>
									{bar.value}
								</p>
							</div>
							<div className="h-2 w-full overflow-hidden rounded-sm bg-zinc-200 dark:bg-zinc-800">
								<div
									className={`h-full ${bar.emphasis ? "bg-zinc-900 dark:bg-white" : "bg-zinc-400 dark:bg-zinc-600"}`}
									style={{ width: `${bar.pct}%` }}
								/>
							</div>
						</div>
					))}
				</div>
				{visual.note && (
					<p className="text-sm text-zinc-700 dark:text-zinc-300">{visual.note}</p>
				)}
			</div>
		);
	}

	if (visual.kind === "logos") {
		return (
			<div className="relative flex aspect-square flex-col justify-center rounded-md border border-zinc-200 bg-zinc-50/40 p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
				<div className="grid grid-cols-3 items-center gap-x-8 gap-y-6">
					{visual.items.map((logo) => (
						<img
							key={logo.alt}
							src={getAssetPath(logo.src)}
							alt={logo.alt}
							className="w-auto opacity-80"
							style={{ height: `${(logo.h ?? 5) * 7}px` }}
						/>
					))}
				</div>
			</div>
		);
	}

	if (visual.kind === "code") {
		return (
			<pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50/40 px-5 py-4 font-mono text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
				{visual.lines.join("\n")}
			</pre>
		);
	}

	if (visual.kind === "fns") {
		const chipClass =
			"pointer-events-auto inline-flex cursor-pointer items-center rounded-md border border-zinc-300 px-2 py-0.5 font-mono text-[0.7rem] text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white";
		return (
			<div className="relative flex flex-col gap-6 rounded-md border border-zinc-200 bg-zinc-50/40 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
				{visual.sections.map((section) => (
					<div key={section.title} className="flex flex-col gap-3">
						<p className="font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
							{section.title}
						</p>
						{section.groups && (
							<div className="flex flex-col gap-2.5">
								{section.groups.map((group) => (
									<div
										key={group.label}
										className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5"
									>
										<p className="w-24 shrink-0 font-mono text-[0.65rem] tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
											{group.label}
										</p>
										<ul className="flex flex-1 flex-wrap gap-1.5">
											{group.items.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														target="_blank"
														rel="noopener noreferrer"
														className={chipClass}
													>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						)}
						{section.items && (
							<ul className="grid grid-cols-4 gap-1.5">
								{section.items.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`${chipClass} w-full justify-center`}
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		);
	}

	return null;
}

export function MythsPage() {
	const reduceMotion = useReducedMotion();
	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/myths" />

			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative w-full pt-16">
				{/* Hero */}
				<section className="relative overflow-hidden pb-20 md:pb-28">
					<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `
									linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
									linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
								`,
								backgroundSize: "196.6px 194px",
								backgroundPosition: "calc(50% + 97px) 0",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
							}}
						/>
						<div
							className="absolute inset-x-0 top-0 h-[400px]"
							style={{
								background:
									"radial-gradient(ellipse 50% 80% at 50% -20%, rgba(255, 255, 255, 0.10) 0%, transparent 50%)",
							}}
						/>
					</div>

					<div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-4">
						<p className="pt-16 pb-1 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase md:pt-20">
							// Effect Myths
						</p>

						<div className="mt-2 max-w-4xl pb-4">
							<h1 className="text-4xl leading-tight font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-white">
								Myths about Effect
							</h1>
							<p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-800 md:text-xl dark:text-zinc-400">
								Addressing common misconceptions about Effect.
							</p>
						</div>

						{/* Anchor index — scattered sticker style, 3 on row 1 + 4 on row 2 */}
						{(() => {
							const rotations = [-2, 3, -1, 2, -3, 1, -2];
							const renderChip = (m: Myth, i: number) => {
								const rotation = rotations[i % rotations.length];
								return (
									<motion.li
										key={m.id}
										initial={
											reduceMotion
												? { opacity: 0, rotate: rotation }
												: { y: -240, opacity: 0, rotate: rotation - 8 }
										}
										animate={{ y: 0, opacity: 1, rotate: rotation }}
										transition={
											reduceMotion
												? { duration: 0.25, delay: i * 0.03 }
												: {
														type: "spring",
														stiffness: 110,
														damping: 11,
														mass: 0.9,
														delay: i * 0.08,
													}
										}
										whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.04 }}
									>
										<a
											href={`#${m.id}`}
											className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-2 font-mono text-sm tracking-wider text-zinc-700 uppercase transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
										>
											<span className="text-zinc-700 dark:text-zinc-400">
												{String(i + 1).padStart(2, "0")}
											</span>
											<span>{m.short}</span>
										</a>
									</motion.li>
								);
							};
							return (
								<div className="mt-10 flex flex-col gap-y-4">
									{/* First 3 — each full width, stacked */}
									<ul className="flex flex-col gap-4">
										{MYTHS.slice(0, 3).map(renderChip)}
									</ul>
									{/* Remaining 4 — single row, evenly split */}
									<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
										{MYTHS.slice(3).map((m, i) => renderChip(m, i + 3))}
									</ul>
								</div>
							);
						})()}
					</div>
				</section>

				{/* Myth sections — alternating layout */}
				{MYTHS.map((m, idx) => {
					const isReversed = idx % 2 === 1;
					return (
						<section
							key={m.id}
							id={m.id}
							className="relative border-t border-zinc-200 dark:border-zinc-800"
						>
							<div className="mx-auto w-full max-w-[73.75rem] px-4">
								{m.visual.kind === "fns" ? (
									// Custom 2-row layout for myth with fns visual
									<div className="py-20 md:py-24">
										{/* Row 1: eyebrow + quote (left) | body (right) */}
										<div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-0">
											<div className="md:col-span-6 md:pr-16">
												<p className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
													// Myth {String(idx + 1).padStart(2, "0")}
												</p>
												<h2 className="border-l-2 border-zinc-300 pl-5 text-xl leading-snug font-medium tracking-tight text-zinc-700 italic md:text-2xl dark:border-zinc-700 dark:text-zinc-400">
													“{m.title}”
												</h2>
											</div>
											<div className="md:col-span-6">
												{m.body.map((p, i) => (
													<p
														key={i}
														className={`text-base leading-relaxed text-zinc-700 dark:text-zinc-300 ${
															i === 0 ? "" : "mt-4"
														}`}
													>
														{p}
													</p>
												))}
											</div>
										</div>

										{/* Row 2: ONE box, internal split — functions (7 cols) | modules (5 cols) */}
										{(() => {
											const chipClass =
												"pointer-events-auto inline-flex cursor-pointer items-center rounded-md border border-zinc-300 px-2 py-0.5 font-mono text-[0.7rem] text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white";
											const fnsSection = m.visual.sections.find((s) => s.groups);
											const modulesSection = m.visual.sections.find((s) => s.items);
											return (
												<div className="mt-12 rounded-md border border-zinc-200 bg-zinc-50/40 p-6 md:mt-16 dark:border-zinc-800 dark:bg-zinc-900/40">
													<div className="flex flex-col gap-8">
														{fnsSection && (
															<div className="flex flex-col gap-4">
																<p className="font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
																	{fnsSection.title}
																</p>
																{fnsSection.groups && (
																	<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
																		{fnsSection.groups.map((group) => (
																			<div
																				key={group.label}
																				className="flex flex-col gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
																			>
																				<p className="font-mono text-[0.65rem] tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
																					{group.label}
																				</p>
																				<ul className="flex flex-wrap gap-1.5">
																					{group.items.map((item) => (
																						<li key={item.name}>
																							<a
																								href={item.href}
																								target="_blank"
																								rel="noopener noreferrer"
																								className={chipClass}
																							>
																								{item.name}
																							</a>
																						</li>
																					))}
																				</ul>
																			</div>
																		))}
																	</div>
																)}
															</div>
														)}
														{modulesSection && (
															<div className="flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
																<p className="font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
																	{modulesSection.title}
																</p>
																{modulesSection.items && (
																	<ul className="flex flex-wrap gap-1.5">
																		{modulesSection.items.map((item) => (
																			<li key={item.name}>
																				<a
																					href={item.href}
																					target="_blank"
																					rel="noopener noreferrer"
																					className={chipClass}
																				>
																					{item.name}
																				</a>
																			</li>
																		))}
																	</ul>
																)}
															</div>
														)}
													</div>
												</div>
											);
										})()}
									</div>
								) : (
								<div className="grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-12 md:gap-x-0 md:py-24">
									{/* Text — 7 cols, with padding toward visual */}
									<div
										className={`md:col-span-7 ${
											isReversed
												? "md:col-start-6 md:pl-16"
												: "md:col-start-1 md:pr-16"
										}`}
									>
										<p className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
											// Myth {String(idx + 1).padStart(2, "0")}
										</p>
										<h2 className="border-l-2 border-zinc-300 pl-5 text-xl leading-snug font-medium tracking-tight text-zinc-700 italic md:text-2xl dark:border-zinc-700 dark:text-zinc-400">
											“{m.title}”
										</h2>
										{m.body.map((p, i) => {
											// On the first paragraph, split off the first sentence and emphasize it
											if (i === 0) {
												const match = p.match(/^([^.]+\.)\s*(.*)$/);
												const lead = match ? match[1] : p;
												const rest = match ? match[2] : "";
												return (
													<div key={i} className="mt-10">
														<p className="text-lg leading-snug font-semibold text-zinc-900 dark:text-white">
															{lead}
														</p>
														{rest && (
															<p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
																{rest}
															</p>
														)}
													</div>
												);
											}
											return (
												<p
													key={i}
													className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
												>
													{p}
												</p>
											);
										})}
										{m.lists?.map((list) => {
											const chipClass =
												"inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-50/40 px-2 py-0.5 font-mono text-[0.75rem] text-zinc-700 transition-colors hover:border-zinc-900 hover:bg-white hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-white dark:hover:bg-zinc-900 dark:hover:text-white";
											return (
												<div key={list.title} className="mt-8">
													<p className="mb-4 font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
														{list.title}
													</p>
													{list.groups ? (
														<div className="space-y-3">
															{list.groups.map((group) => (
																<div key={group.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
																	<p className="w-28 shrink-0 font-mono text-[0.7rem] tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
																		{group.label}
																	</p>
																	<ul className="flex flex-1 flex-wrap gap-2">
																		{group.items.map((item) => (
																			<li key={item.name}>
																				<a
																					href={item.href}
																					target="_blank"
																					rel="noopener noreferrer"
																					className={chipClass}
																				>
																					{item.name}
																				</a>
																			</li>
																		))}
																	</ul>
																</div>
															))}
														</div>
													) : (
														<ul className="flex flex-wrap gap-2">
															{list.items?.map((item) => (
																<li key={item.name}>
																	<a
																		href={item.href}
																		target="_blank"
																		rel="noopener noreferrer"
																		className={chipClass}
																	>
																		{item.name}
																	</a>
																</li>
															))}
														</ul>
													)}
												</div>
											);
										})}
									</div>

									{/* Visual — 5 cols */}
									<div
										className={`md:col-span-5 ${
											isReversed ? "md:col-start-1 md:row-start-1" : "md:col-start-8"
										}`}
									>
										<VisualBlock visual={m.visual} />
									</div>
								</div>
								)}
							</div>
						</section>
					);
				})}
			</main>

			<Footer activePath="/myths" />
		</div>
	);
}
