import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Stacked-layers mark with a heart-eyed face, animated into a slow waltz:
 * the stack traces a figure-eight while a travelling wave undulates down
 * through the plates. Every channel is a sampled sine, so nothing ever
 * stops at an extreme — the motion is continuous end to end.
 */

// Geometry — an isometric diamond plate (rounded corners) with two plates
// peeking out below it. Corner radius is 7 units, edge direction is
// (0.836, ±0.550) so every hook and chevron stays parallel to the plate edges.
const PLATE =
	"M23.15 30.3 L44.15 16.5 Q50 12.65 55.85 16.5 L76.85 30.3 Q82.7 34.15 76.85 38 L55.85 51.8 Q50 55.65 44.15 51.8 L23.15 38 Q17.3 34.15 23.15 30.3 Z";
const LAYER_MID = "M23.57 44.22 L17.3 48.35 L50 69.85 L82.7 48.35 L76.43 44.22";
const LAYER_BACK = "M23.15 60.3 L17.3 64.15 L50 85.65 L82.7 64.15 L76.85 60.3";

const HEART =
	"M0 5 C-5.4 1.2 -5.4 -2.6 -2.9 -3.9 C-1.2 -4.8 0 -3.6 0 -2.4 C0 -3.6 1.2 -4.8 2.9 -3.9 C5.4 -2.6 5.4 1.2 0 5 Z";
const BROW_LEFT = "M35.3 26.75 Q38.6 22.75 43.2 23.75";
const BROW_RIGHT = "M65.7 26.75 Q62.4 22.75 57.8 23.75";
const MOUTH = "M44.1 43.9 A6.9 6.9 0 0 0 57.9 43.9 Z";

const EYE_LEFT = { x: 40.6, y: 34.05 };
const EYE_RIGHT = { x: 61.3, y: 34.05 };

const CYCLE = 4;
const STEPS = 32;

/**
 * A closed loop of keyframes sampled from a sine. Interpolating these
 * linearly gives smooth perpetual motion, where a [-a, a, -a] keyframe list
 * would visibly hesitate at each end. `phase` lags one channel behind
 * another, which is what reads as follow-through.
 */
const wave = (amp: number, phase = 0, harmonic = 1, base = 0) =>
	Array.from({ length: STEPS + 1 }, (_, i) => {
		const t = (i / STEPS) * Math.PI * 2;
		return Number((base + amp * Math.sin(harmonic * t + phase)).toFixed(3));
	});

const origin = (x: number, y: number) =>
	({ transformBox: "view-box", transformOrigin: `${x}px ${y}px` }) as const;

export interface DancingStackProps {
	/** Rendered width/height in px. */
	size?: number;
	/** Fill of the plates. Defaults to the inherited text color. */
	color?: string;
	/** Freeze the dance (also honours prefers-reduced-motion). */
	still?: boolean;
	className?: string;
}

export function DancingStack({
	size = 200,
	color = "currentColor",
	still = false,
	className,
}: DancingStackProps) {
	const maskId = useId();
	const reduced = useReducedMotion();
	const frozen = still || reduced;

	// Every channel shares one transition, so the whole figure stays phase-locked.
	const drift = frozen
		? { duration: 0 }
		: ({
				duration: CYCLE,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
			} as const);
	const at = (keyframes: number[], rest: number) => (frozen ? rest : keyframes);

	return (
		<svg
			viewBox="0 0 100 100"
			width={size}
			height={size}
			role="img"
			aria-label="Dancing stack of layers with a happy face"
			className={className}
			shapeRendering="geometricPrecision"
			style={{ overflow: "visible" }}
		>
			<defs>
				<mask
					id={maskId}
					maskUnits="userSpaceOnUse"
					x="-20"
					y="-20"
					width="140"
					height="140"
				>
					<path d={PLATE} fill="#fff" />
					<g fill="#000" stroke="#000">
						<motion.g
							animate={{ y: at(wave(0.45, -0.3), 0) }}
							transition={drift}
						>
							<path
								d={BROW_LEFT}
								fill="none"
								strokeWidth={2.6}
								strokeLinecap="round"
							/>
							<path
								d={BROW_RIGHT}
								fill="none"
								strokeWidth={2.6}
								strokeLinecap="round"
							/>
						</motion.g>
						{/* Eyes breathe rather than thump, and the right one trails
						    the left so the pair never pulses as one block. */}
						<Heart
							cx={EYE_LEFT.x}
							cy={EYE_LEFT.y}
							tilt={-8}
							scale={at(wave(0.06, 0, 2, 1), 1)}
							transition={drift}
						/>
						<Heart
							cx={EYE_RIGHT.x}
							cy={EYE_RIGHT.y}
							tilt={8}
							scale={at(wave(0.06, 0.35, 2, 1), 1)}
							transition={drift}
						/>
						<motion.path
							d={MOUTH}
							stroke="none"
							style={origin(51, 43.9)}
							animate={{ scale: at(wave(0.035, -0.2, 2, 1), 1) }}
							transition={drift}
						/>
					</g>
				</mask>
			</defs>

			{/* The stack traces a figure-eight — x on the fundamental, y on the
			    second harmonic — while the tilt lags a quarter turn behind it. */}
			<motion.g
				style={origin(50, 86)}
				animate={{
					x: at(wave(2), 0),
					y: at(wave(1.5, 0, 2), 0),
					rotate: at(wave(4.5, -0.5), 0),
				}}
				transition={drift}
			>
				<g
					fill="none"
					stroke={color}
					strokeWidth={5.4}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{/* A wave travels down the stack: each plate lags the one above
					    and swings less, so the pile undulates instead of bouncing. */}
					<motion.path
						d={LAYER_BACK}
						animate={{ y: at(wave(0.9, -1.1), 0) }}
						transition={drift}
					/>
					<motion.path
						d={LAYER_MID}
						animate={{ y: at(wave(1.5, -0.55), 0) }}
						transition={drift}
					/>
				</g>
				<motion.g
					style={origin(50, 34.15)}
					animate={{
						y: at(wave(2.2), 0),
						rotate: at(wave(1.2, -1), 0),
					}}
					transition={drift}
				>
					<path d={PLATE} fill={color} mask={`url(#${maskId})`} />
				</motion.g>
			</motion.g>
		</svg>
	);
}

function Heart({
	cx,
	cy,
	tilt,
	scale,
	transition,
}: {
	cx: number;
	cy: number;
	tilt: number;
	scale: number | number[];
	transition: object;
}) {
	return (
		<motion.g
			style={origin(cx, cy)}
			animate={{ scale }}
			transition={transition}
		>
			<g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
				<path d={HEART} stroke="none" />
			</g>
		</motion.g>
	);
}
