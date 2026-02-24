import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const V3_PACKAGE_COLORS = [
	"#8b5cf6", // violet
	"#3b82f6", // blue
	"#ec4899", // pink
	"#6366f1", // indigo
	"#10b981", // emerald
	"#f59e0b", // amber
	"#06b6d4", // cyan
	"#ef4444", // red
];

const V3_PACKAGES = [
	"effect",
	"@effect/platform",
	"@effect/rpc",
	"@effect/cluster",
	"@effect/cli",
	"@effect/experimental",
	"@effect/printer",
	"@effect/typeclass",
];

const REMAINING_PACKAGES = [
	"@effect/platform-*",
	"@effect/sql-*",
	"@effect/ai-*",
	"@effect/opentelemetry",
	"@effect/atom-*",
	"@effect/vitest",
];

export function PackageConsolidationSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

	const [showV3, setShowV3] = useState(false);
	const [showV4, setShowV4] = useState(false);

	useEffect(() => {
		if (!isInView) return;

		const t1 = setTimeout(() => setShowV3(true), 800);
		const t2 = setTimeout(() => setShowV4(true), 4000);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [isInView]);

	return (
		<section ref={sectionRef} className="relative w-full py-24 md:py-40">
			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				{/* Visualization — single column, v3 then v4 */}
				<div className="max-w-4xl space-y-8">
					{/* v3 state */}
					<div>
						<motion.p
							className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-zinc-300"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							v3 — Separate installs
						</motion.p>
						<div className="space-y-1.5">
							{V3_PACKAGES.map((pkg, i) => {
								const color = V3_PACKAGE_COLORS[i];
								return (
									<motion.div
										key={pkg}
										className="flex items-center gap-3 rounded-md px-4 py-2.5"
										style={{
											borderWidth: 1,
											borderColor: showV4 ? "transparent" : `${color}25`,
											backgroundColor: showV4 ? "transparent" : `${color}08`,
										}}
										initial={{ opacity: 0, x: -12 }}
										animate={
											showV3
												? showV4
													? {
															opacity: 0.3,
															x: 0,
															height: 0,
															paddingTop: 0,
															paddingBottom: 0,
															marginBottom: 0,
															overflow: "hidden",
														}
													: { opacity: 1, x: 0 }
												: { opacity: 0, x: -12 }
										}
										transition={{
											type: "spring",
											stiffness: 120,
											damping: 20,
											delay: showV4 ? 0.06 * i : 0.12 * i,
										}}
									>
										<div
											className="h-2 w-2 shrink-0 rounded-full"
											style={{ backgroundColor: color }}
										/>
										<span className="font-mono text-sm text-zinc-200">
											{pkg}
										</span>
										<span className="font-mono text-xs text-zinc-400">
											npm install {pkg}
										</span>
									</motion.div>
								);
							})}
						</div>
					</div>

					{/* v4 state — appears after v3 collapses */}
					<AnimatePresence>
						{showV4 && (
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 20,
									delay: 0.4,
								}}
							>
								<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-zinc-300">
									v4 — One install
								</p>

								{/* Core effect package */}
								<motion.div
									className="flex items-center gap-3 rounded-lg border border-violet-500/30 bg-violet-500/5 px-4 py-3"
									initial={{ scale: 0.97 }}
									animate={{ scale: 1 }}
									transition={{
										type: "spring",
										bounce: 0.2,
										delay: 0.6,
									}}
								>
									<div className="h-2 w-2 rounded-full bg-violet-500" />
									<span className="font-mono text-sm font-semibold text-white">
										effect
									</span>
									<span className="font-mono text-sm text-zinc-400">
										npm install effect
									</span>
								</motion.div>

								{/* Remaining separate packages */}
								<motion.div
									className="mt-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 1.2 }}
								>
									<p className="mb-2 font-mono text-sm text-zinc-300">
										Platform-specific (separate):
									</p>
									<div className="flex flex-wrap gap-2">
										{REMAINING_PACKAGES.map((pkg) => (
											<span
												key={pkg}
												className="rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1.5 font-mono text-sm text-zinc-400"
											>
												{pkg}
											</span>
										))}
									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
