import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const UNSTABLE_MODULES = [
	{ name: "Ai", category: "ai" },
	{ name: "AiModels", category: "ai" },
	{ name: "AiToolkit", category: "ai" },
	{ name: "HttpApi", category: "http" },
	{ name: "HttpApiBuilder", category: "http" },
	{ name: "HttpApiClient", category: "http" },
	{ name: "SchemaAst", category: "schema" },
	{ name: "SchemaCheck", category: "schema" },
	{ name: "Sql", category: "sql" },
	{ name: "SqlClient", category: "sql" },
	{ name: "Rpc", category: "rpc" },
	{ name: "CliApp", category: "cli" },
	{ name: "CliArgs", category: "cli" },
	{ name: "CliOptions", category: "cli" },
	{ name: "Workflow", category: "workflow" },
	{ name: "Cluster", category: "cluster" },
	{ name: "Machine", category: "cluster" },
];

const CATEGORY_COLORS: Record<string, string> = {
	ai: "#8b5cf6",
	http: "#3b82f6",
	schema: "#06b6d4",
	sql: "#f59e0b",
	rpc: "#ec4899",
	cli: "#10b981",
	workflow: "#f97316",
	cluster: "#6366f1",
};

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay },
	}),
};

export function UnstableModulesSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

	const [showModules, setShowModules] = useState(false);
	const [graduated, setGraduated] = useState<Set<string>>(new Set());

	useEffect(() => {
		if (!isInView) return;

		const t1 = setTimeout(() => setShowModules(true), 600);

		// Simulate a few modules graduating after the initial reveal
		const t2 = setTimeout(
			() =>
				setGraduated(new Set(["HttpApi", "HttpApiBuilder", "HttpApiClient"])),
			3500,
		);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [isInView]);

	return (
		<section ref={sectionRef} className="relative w-full py-24 md:py-40">
			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-16 max-w-2xl">
					<motion.p
						className="mb-4 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0}
					>
						Unstable Modules
					</motion.p>
					<motion.h2
						className="mb-4 text-3xl font-bold text-white md:text-4xl"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.1}
					>
						Ship fast. Stabilize gradually.
					</motion.h2>
					<motion.p
						className="text-lg text-zinc-400"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.2}
					>
						New capabilities ship inside{" "}
						<code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-base text-white">
							effect
						</code>{" "}
						under{" "}
						<code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-base text-zinc-300">
							effect/unstable/*
						</code>
						. As they mature, they graduate to the stable namespace.
					</motion.p>
				</div>

				{/* Pipeline visualization */}
				<motion.div
					className="relative"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div className="grid gap-8 md:grid-cols-[1fr_auto_1fr]">
						{/* Unstable column */}
						<div>
							<div className="mb-4 flex items-center gap-2">
								<div className="h-2 w-2 rounded-full bg-amber-400" />
								<span className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
									effect/unstable/*
								</span>
							</div>
							<div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
								<div className="flex flex-wrap gap-2">
									{UNSTABLE_MODULES.map((mod, i) => {
										const isGrad = graduated.has(mod.name);
										return (
											<motion.div
												key={mod.name}
												layout
												className="rounded-md border px-2.5 py-1.5 font-mono text-xs"
												style={{
													borderColor: isGrad
														? "transparent"
														: `${CATEGORY_COLORS[mod.category]}40`,
													backgroundColor: isGrad
														? "transparent"
														: `${CATEGORY_COLORS[mod.category]}10`,
													color: isGrad
														? "transparent"
														: CATEGORY_COLORS[mod.category],
												}}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={
													showModules
														? {
																opacity: isGrad ? 0 : 1,
																scale: isGrad ? 0.8 : 1,
															}
														: { opacity: 0, scale: 0.8 }
												}
												transition={{
													type: "spring",
													stiffness: 200,
													damping: 20,
													delay: showModules ? 0.03 * i : 0,
												}}
											>
												{mod.name}
											</motion.div>
										);
									})}
								</div>
								<motion.p
									className="mt-3 font-mono text-xs text-zinc-400"
									initial={{ opacity: 0 }}
									animate={showModules ? { opacity: 1 } : { opacity: 0 }}
									transition={{ delay: 0.8 }}
								>
									17 modules · may break in minor releases
								</motion.p>
							</div>
						</div>

						{/* Arrow */}
						<div className="hidden items-center md:flex">
							<div className="flex flex-col items-center gap-2">
								<svg
									width="48"
									height="24"
									viewBox="0 0 48 24"
									fill="none"
									className="text-zinc-400"
								>
									<motion.path
										d="M0 12H40M40 12L32 4M40 12L32 20"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										initial={{ pathLength: 0 }}
										animate={
											graduated.size > 0 ? { pathLength: 1 } : { pathLength: 0 }
										}
										transition={{
											duration: 0.6,
											ease: "easeOut",
										}}
									/>
								</svg>
								<motion.span
									className="font-mono text-xs text-zinc-400"
									initial={{ opacity: 0 }}
									animate={graduated.size > 0 ? { opacity: 1 } : { opacity: 0 }}
									transition={{ delay: 0.3 }}
								>
									graduate
								</motion.span>
							</div>
						</div>

						{/* Stable column */}
						<div>
							<div className="mb-4 flex items-center gap-2">
								<div className="h-2 w-2 rounded-full bg-emerald-400" />
								<span className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
									effect/*
								</span>
							</div>
							<div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
								<div className="mb-3 flex flex-wrap gap-2">
									{[
										"Effect",
										"Stream",
										"Schema",
										"Layer",
										"Fiber",
										"Queue",
										"Ref",
									].map((mod) => (
										<div
											key={mod}
											className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 font-mono text-xs text-emerald-400"
										>
											{mod}
										</div>
									))}
								</div>

								{/* Graduated modules appear here */}
								<AnimatePresence>
									{graduated.size > 0 && (
										<motion.div
											className="flex flex-wrap gap-2 border-t border-zinc-800 pt-3"
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											transition={{ duration: 0.4 }}
										>
											{Array.from(graduated).map((name, i) => (
												<motion.div
													key={name}
													className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 font-mono text-xs text-emerald-400"
													initial={{
														opacity: 0,
														x: -20,
														scale: 0.8,
													}}
													animate={{
														opacity: 1,
														x: 0,
														scale: 1,
													}}
													transition={{
														type: "spring",
														bounce: 0.3,
														delay: 0.1 * i,
													}}
												>
													{name}
													<span className="ml-1 text-emerald-500/50">✓</span>
												</motion.div>
											))}
										</motion.div>
									)}
								</AnimatePresence>

								<motion.p
									className="mt-3 font-mono text-xs text-zinc-400"
									initial={{ opacity: 0 }}
									animate={showModules ? { opacity: 1 } : { opacity: 0 }}
									transition={{ delay: 0.8 }}
								>
									Strict semver · breaking changes only in majors
								</motion.p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
