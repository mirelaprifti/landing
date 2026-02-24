import { motion } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";

export interface ModuleData {
	name: string;
	size: number;
	color: string;
}

interface BundleBarProps {
	version: string;
	modules: ModuleData[];
	total: number;
	maxTotal: number;
	isVisible: boolean;
	staggerDelay?: number;
	badge?: string;
}

const barSpring = {
	type: "spring" as const,
	stiffness: 180,
	damping: 25,
	mass: 0.8,
};

export function BundleBar({
	version,
	modules,
	total,
	maxTotal,
	isVisible,
	staggerDelay = 0,
	badge,
}: BundleBarProps) {
	const barWidthPercent = (total / maxTotal) * 100;

	return (
		<div className="flex items-center gap-4 md:gap-6">
			{/* Version label */}
			<motion.span
				className="w-8 shrink-0 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400"
				initial={{ opacity: 0 }}
				animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.3, delay: staggerDelay }}
			>
				{version}
			</motion.span>

			{/* Bar track */}
			<div className="relative h-12 flex-1 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30 md:h-14">
				<div className="flex h-full" style={{ width: `${barWidthPercent}%` }}>
					{modules.map((mod, i) => {
						const segmentPercent = (mod.size / total) * 100;
						return (
							<motion.div
								key={mod.name}
								className="relative flex h-full items-center justify-center overflow-hidden"
								style={{
									backgroundColor: mod.color,
									width: `${segmentPercent}%`,
								}}
								initial={{ scaleX: 0, transformOrigin: "left" }}
								animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
								transition={{
									...barSpring,
									delay: staggerDelay + 0.08 * i,
								}}
							>
								<span className="hidden text-xs font-medium text-white md:block font-mono">
									{mod.name}
								</span>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* Counter */}
			<AnimatedCounter
				target={total}
				isActive={isVisible}
				className="w-24 shrink-0 text-right text-xl font-bold text-white md:text-2xl"
			/>

			{/* Badge */}
			{badge ? (
				<motion.span
					className="w-16 shrink-0 font-mono text-sm font-medium text-emerald-400"
					initial={{ opacity: 0 }}
					animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.4, delay: staggerDelay + 0.6 }}
				>
					{badge}
				</motion.span>
			) : (
				<span className="w-16 shrink-0" />
			)}
		</div>
	);
}
