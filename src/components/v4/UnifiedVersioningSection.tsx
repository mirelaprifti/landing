import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

interface VersionRow {
	pkg: string;
	v3: string;
	v4: string;
}

const VERSIONS: VersionRow[] = [
	{ pkg: "effect", v3: "3.19.18", v4: "4.0.0-beta.0" },
	{ pkg: "@effect/platform", v3: "0.94.5", v4: "4.0.0-beta.0" },
	{ pkg: "@effect/sql", v3: "0.49.0", v4: "4.0.0-beta.0" },
	{ pkg: "@effect/ai", v3: "0.33.2", v4: "4.0.0-beta.0" },
	{ pkg: "@effect/opentelemetry", v3: "0.61.0", v4: "4.0.0-beta.0" },
];

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay },
	}),
};

export function UnifiedVersioningSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

	const [showV3, setShowV3] = useState(false);
	const [showV4, setShowV4] = useState(false);

	useEffect(() => {
		if (!isInView) return;

		const t1 = setTimeout(() => setShowV3(true), 500);
		const t2 = setTimeout(() => setShowV4(true), 2000);

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
						Versioning
					</motion.p>
					<motion.h2
						className="mb-4 text-3xl font-bold text-white md:text-4xl"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.1}
					>
						One version. Zero mismatches.
					</motion.h2>
					<motion.p
						className="text-lg text-zinc-400"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.2}
					>
						All Effect ecosystem packages share a single version number and are
						released together. No guessing, no cross-referencing changelogs.
					</motion.p>
				</div>

				{/* Version table */}
				<motion.div
					className="overflow-hidden rounded-lg border border-zinc-800"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{/* Table header */}
					<div className="grid grid-cols-[2fr_1fr_1fr] border-b border-zinc-800 bg-zinc-900/50">
						<div className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
							Package
						</div>
						<div className="border-l border-zinc-800 px-4 py-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
							v3
						</div>
						<div className="border-l border-zinc-800 px-4 py-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-zinc-400">
							v4
						</div>
					</div>

					{/* Rows */}
					{VERSIONS.map((row, i) => (
						<motion.div
							key={row.pkg}
							className="grid grid-cols-[2fr_1fr_1fr] border-b border-zinc-800/50 last:border-b-0"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.3, delay: 0.4 + 0.06 * i }}
						>
							{/* Package name */}
							<div className="px-4 py-3 font-mono text-sm text-zinc-300">
								{row.pkg}
							</div>

							{/* v3 version — messy */}
							<div className="flex items-center justify-center border-l border-zinc-800 px-4 py-3">
								<motion.span
									className="font-mono text-sm"
									initial={{ opacity: 0 }}
									animate={
										showV3
											? {
													opacity: 1,
													color: "rgb(239 68 68)",
												}
											: { opacity: 0 }
									}
									transition={{
										duration: 0.3,
										delay: 0.08 * i,
									}}
								>
									{row.v3}
								</motion.span>
							</div>

							{/* v4 version — aligned */}
							<div className="flex items-center justify-center border-l border-zinc-800 px-4 py-3">
								<motion.span
									className="font-mono text-sm"
									initial={{ opacity: 0 }}
									animate={
										showV4
											? {
													opacity: 1,
													color: "rgb(52 211 153)",
												}
											: { opacity: 0 }
									}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 20,
										delay: 0.06 * i,
									}}
								>
									{row.v4}
								</motion.span>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Annotation */}
				<motion.div
					className="mt-6 flex items-center gap-2"
					initial={{ opacity: 0 }}
					animate={showV4 ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.4, delay: 0.5 }}
				>
					<div className="h-2 w-2 rounded-full bg-emerald-400" />
					<span className="font-mono text-sm text-zinc-400">
						All versions aligned — install with confidence
					</span>
				</motion.div>
			</div>
		</section>
	);
}
