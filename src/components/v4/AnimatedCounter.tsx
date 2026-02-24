import { useEffect, useRef } from "react";
import { useSpring, useTransform, motion } from "motion/react";

interface AnimatedCounterProps {
	target: number;
	isActive: boolean;
	prefix?: string;
	suffix?: string;
	className?: string;
}

export function AnimatedCounter({
	target,
	isActive,
	prefix = "~",
	suffix = " KB",
	className = "",
}: AnimatedCounterProps) {
	const spring = useSpring(0, { stiffness: 100, damping: 20, mass: 1 });
	const display = useTransform(
		spring,
		(v) => `${prefix}${Math.round(v)}${suffix}`,
	);
	const hasStarted = useRef(false);

	useEffect(() => {
		if (isActive && !hasStarted.current) {
			hasStarted.current = true;
			spring.set(target);
		}
	}, [isActive, target, spring]);

	return (
		<motion.span
			className={`font-mono tabular-nums ${className}`}
			style={{ display: "inline-block" }}
		>
			<motion.span>{display}</motion.span>
		</motion.span>
	);
}
