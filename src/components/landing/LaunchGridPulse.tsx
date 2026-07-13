import { useEffect, useRef } from "react";

/**
 * Launch celebration: the hero grid lights up. A wave radiates outward from
 * the center on load, briefly illuminating grid cells and their borders as it
 * passes, then everything settles back to the ambient grid.
 * - Geometry matches the hero grid (196.6 x 194 cells anchored at 50%+97px)
 * - Fires once on mount (~2.8s), then removes itself entirely
 * - Respects prefers-reduced-motion (renders nothing)
 */
export function LaunchGridPulse({
	/** Y offset of the hero grid origin in viewport px (banner + navbar). */
	gridTop = 104,
	/** Called once when the pulse finishes (used to chain follow-up effects). */
	onComplete,
}: {
	gridTop?: number;
	onComplete?: () => void;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const W = window.innerWidth;
		const H = window.innerHeight;
		const dpr = window.devicePixelRatio || 1;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);

		// Hero grid geometry — must match HeroSection's background grid
		const CELL_W = 196.6;
		const CELL_H = 194;
		const anchorX = W / 2 + 97; // vertical line anchor
		const ROWS = 3; // stay within the hero's visible grid area

		// Collect cell rectangles: columns spanning the viewport, ROWS rows down
		type Cell = { x: number; y: number; cx: number; cy: number; d: number };
		const cells: Cell[] = [];
		// Origin sits ON the center-most grid line, so the wave reaches the two
		// columns flanking it simultaneously — the pulse opens with a symmetric
		// pair of columns, not a single centered one.
		const originX = anchorX;
		const originY = gridTop + CELL_H * 1.2; // wave origin ≈ headline zone

		const firstCol = Math.floor((0 - anchorX) / CELL_W) - 1;
		const lastCol = Math.ceil((W - anchorX) / CELL_W);
		for (let row = 0; row < ROWS; row++) {
			for (let col = firstCol; col <= lastCol; col++) {
				const x = anchorX + col * CELL_W;
				const y = gridTop + row * CELL_H;
				const cx = x + CELL_W / 2;
				const cy = y + CELL_H / 2;
				cells.push({
					x,
					y,
					cx,
					cy,
					d: Math.hypot(cx - originX, cy - originY),
				});
			}
		}

		const maxDist = Math.max(...cells.map((c) => c.d));
		const DURATION = 3000;
		const WAVE_TIME = 2200; // wavefront reaches the farthest cell
		// Tight wavefront so cells light discretely — wide bands blur the
		// two-column opening into a single centered glow
		const BAND = 95;
		const start = performance.now();
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, W, H);

			const r = (elapsed / WAVE_TIME) * (maxDist + BAND);
			// Whole-effect fade in the final 600ms
			const globalFade =
				elapsed > DURATION - 600 ? (DURATION - elapsed) / 600 : 1;

			for (const c of cells) {
				// Gaussian falloff around the wavefront
				const delta = c.d - r;
				const intensity = Math.exp(-(delta * delta) / (2 * (BAND / 2) ** 2));
				if (intensity < 0.02) continue;

				const a = intensity * globalFade;

				// Cell fill — faint white wash
				ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.05})`;
				ctx.fillRect(c.x, c.y, CELL_W, CELL_H);

				// Cell borders — brighter, the actual "lighting up"
				ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.28})`;
				ctx.lineWidth = 1;
				ctx.strokeRect(c.x + 0.5, c.y + 0.5, CELL_W - 1, CELL_H - 1);
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
				onComplete?.();
			}
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [gridTop, onComplete]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
		/>
	);
}
