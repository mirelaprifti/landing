import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	visible: (delay: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay },
	}),
};

/** Animated row of blocks — more blocks = more overhead. */
function BlockRow({
	count,
	color,
	isVisible,
	delay,
	speed = 0.06,
}: {
	count: number;
	color: string;
	isVisible: boolean;
	delay: number;
	speed?: number;
}) {
	return (
		<div className="flex gap-1">
			{Array.from({ length: count }).map((_, i) => (
				<motion.div
					key={i}
					className="h-3 w-3 rounded-sm"
					style={{ backgroundColor: color }}
					initial={{ opacity: 0, scale: 0 }}
					animate={
						isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
					}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 20,
						delay: delay + speed * i,
					}}
				/>
			))}
		</div>
	);
}

const METRICS = [
	{
		label: "Fiber execution",
		tag: "Faster",
		v3Blocks: 14,
		v4Blocks: 5,
	},
	{
		label: "Memory overhead",
		tag: "Lighter",
		v3Blocks: 12,
		v4Blocks: 4,
	},
	{
		label: "Runtime internals",
		tag: "Simpler",
		v3Blocks: 10,
		v4Blocks: 3,
	},
];

export function RuntimePerformanceSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!isInView) return;
		const t = setTimeout(() => setShow(true), 500);
		return () => clearTimeout(t);
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
						Runtime
					</motion.p>
					<motion.h2
						className="mb-4 text-3xl font-bold text-white md:text-4xl"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.1}
					>
						Rewritten from scratch.
					</motion.h2>
					<motion.p
						className="text-lg text-zinc-400"
						variants={fadeUp}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						custom={0.2}
					>
						The fiber runtime has been rebuilt — faster, lighter, and simpler.
						Every Effect application benefits.
					</motion.p>
				</div>

				{/* Visual comparison */}
				<div className="max-w-2xl space-y-10">
					{METRICS.map((metric, i) => {
						const rowDelay = 0.2 * i;
						return (
							<motion.div
								key={metric.label}
								className="space-y-4"
								initial={{ opacity: 0 }}
								animate={show ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 0.3, delay: rowDelay }}
							>
								<div className="flex items-baseline justify-between">
									<span className="text-sm text-zinc-300">{metric.label}</span>
									<motion.span
										className="font-mono text-xs font-medium text-emerald-400"
										initial={{ opacity: 0 }}
										animate={show ? { opacity: 1 } : { opacity: 0 }}
										transition={{ delay: rowDelay + 0.8 }}
									>
										{metric.tag}
									</motion.span>
								</div>

								{/* v3 */}
								<div className="flex items-center gap-3">
									<span className="w-6 shrink-0 font-mono text-xs text-zinc-500">
										v3
									</span>
									<BlockRow
										count={metric.v3Blocks}
										color="#3f3f46"
										isVisible={show}
										delay={rowDelay}
										speed={0.04}
									/>
								</div>

								{/* v4 */}
								<div className="flex items-center gap-3">
									<span className="w-6 shrink-0 font-mono text-xs text-emerald-400/70">
										v4
									</span>
									<BlockRow
										count={metric.v4Blocks}
										color="#34d399"
										isVisible={show}
										delay={rowDelay + 0.5}
										speed={0.08}
									/>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
