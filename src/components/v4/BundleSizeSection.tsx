import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { BundleBar, type ModuleData } from "./BundleBar";

const V3_MODULES: ModuleData[] = [
	{ name: "Effect", size: 35, color: "#8b5cf6" },
	{ name: "Stream", size: 20, color: "#059669" },
	{ name: "Schema", size: 15, color: "#b45309" },
];
const V3_TOTAL = 70;

const V4_MODULES: ModuleData[] = [
	{ name: "Effect", size: 10, color: "#8b5cf6" },
	{ name: "Stream", size: 5.5, color: "#059669" },
	{ name: "Schema", size: 4.5, color: "#b45309" },
];
const V4_TOTAL = 20;

export function BundleSizeSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

	const showV3 = isInView;
	const [showV4, setShowV4] = useState(false);
	const [showCallout, setShowCallout] = useState(false);

	useEffect(() => {
		if (!isInView) return;

		const t1 = setTimeout(() => setShowV4(true), 1200);
		const t2 = setTimeout(() => setShowCallout(true), 2000);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [isInView]);

	return (
		<section ref={sectionRef} className="relative w-full py-24 md:py-40">
			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				{/* Visualization */}
				<div className="space-y-4">
					<BundleBar
						version="v3"
						modules={V3_MODULES}
						total={V3_TOTAL}
						maxTotal={V3_TOTAL}
						isVisible={showV3}
						staggerDelay={0}
					/>
					<BundleBar
						version="v4"
						modules={V4_MODULES}
						total={V4_TOTAL}
						maxTotal={V3_TOTAL}
						isVisible={showV4}
						staggerDelay={0}
					/>
				</div>

				{/* Module legend (mobile) */}
				<div className="mt-6 flex gap-4 md:hidden">
					{V3_MODULES.map((mod) => (
						<div key={mod.name} className="flex items-center gap-1.5">
							<div
								className="h-2.5 w-2.5 rounded-sm"
								style={{ backgroundColor: mod.color }}
							/>
							<span className="font-mono text-xs text-zinc-400">
								{mod.name}
							</span>
						</div>
					))}
				</div>

				{/* Reduction callout */}
				<motion.div
					className="mt-10 flex items-baseline gap-3 pl-12 md:pl-14"
					initial={{ opacity: 0 }}
					animate={showCallout ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<span className="font-mono text-4xl font-bold text-emerald-400 md:text-5xl">
						~71%
					</span>
					<span className="text-base text-zinc-400">
						smaller bundle
					</span>
				</motion.div>
			</div>
		</section>
	);
}
