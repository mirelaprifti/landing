import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Stacked-layers mark with a heart-eyed face, animated into a little dance:
 * the whole stack sways side to side while the plates bob out of phase, so the
 * pile whips and settles like jelly. Hearts beat on the offbeat.
 */

// Geometry — an isometric diamond plate (rounded corners) with two plates
// peeking out below it. Corner radius is 7 units, edge direction is
// (0.836, ±0.550) so every tick and chevron stays parallel to the plate edges.
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

// One sway cycle; the bob runs at double time so it reads as a two-step.
const SWAY = 1.5;
const BOB = SWAY / 2;

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

	// With the dance off, every `animate` collapses to its resting value.
	const dance = <T,>(keyframes: T[], rest: T) => (frozen ? rest : keyframes);
	const loop = (duration: number, delay = 0) =>
		frozen
			? { duration: 0 }
			: ({
					duration,
					delay,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				} as const);

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
							animate={{ y: dance([0, -0.9, 0], 0) }}
							transition={loop(BOB, 0.1)}
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
						<Heart cx={EYE_LEFT.x} cy={EYE_LEFT.y} tilt={-8} frozen={frozen} />
						<Heart cx={EYE_RIGHT.x} cy={EYE_RIGHT.y} tilt={8} frozen={frozen} />
						<motion.path
							d={MOUTH}
							stroke="none"
							style={origin(51, 43.9)}
							animate={{ scale: dance([1, 1.14, 1], 1) }}
							transition={loop(BOB, 0.04)}
						/>
					</g>
				</mask>
			</defs>

			{/* Sway: the whole stack rocks around its base. */}
			<motion.g
				style={origin(50, 86)}
				animate={{
					rotate: dance([-7, 7, -7], 0),
					x: dance([-1.5, 1.5, -1.5], 0),
				}}
				transition={loop(SWAY)}
			>
				{/* Bob: a two-step hop under the sway. */}
				<motion.g
					animate={{ y: dance([0, -4.5, 0], 0) }}
					transition={loop(BOB)}
				>
					<g
						fill="none"
						stroke={color}
						strokeWidth={5.4}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{/* Back and middle plates lag behind the top one, so the
						    stack stretches open and snaps shut as it hops. */}
						<motion.path
							d={LAYER_BACK}
							animate={{ y: dance([0, -0.5, 0], 0) }}
							transition={loop(BOB, 0.2)}
						/>
						<motion.path
							d={LAYER_MID}
							animate={{ y: dance([0, -1.8, 0], 0) }}
							transition={loop(BOB, 0.13)}
						/>
					</g>
					<motion.g
						style={origin(50, 34.15)}
						animate={{
							y: dance([0, -3, 0], 0),
							rotate: dance([1.2, -1.2, 1.2], 0),
						}}
						transition={loop(BOB, 0.06)}
					>
						<path d={PLATE} fill={color} mask={`url(#${maskId})`} />
					</motion.g>
				</motion.g>
			</motion.g>
		</svg>
	);
}

function Heart({
	cx,
	cy,
	tilt,
	frozen,
}: {
	cx: number;
	cy: number;
	tilt: number;
	frozen: boolean | null;
}) {
	return (
		<motion.g
			style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` }}
			animate={frozen ? { scale: 1 } : { scale: [1, 1.28, 1, 1.22, 1, 1, 1] }}
			transition={
				frozen
					? { duration: 0 }
					: {
							duration: SWAY,
							times: [0, 0.09, 0.2, 0.29, 0.4, 0.7, 1],
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeOut",
						}
			}
		>
			<g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
				<path d={HEART} stroke="none" />
			</g>
		</motion.g>
	);
}
