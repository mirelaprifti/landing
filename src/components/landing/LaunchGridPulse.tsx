import { useEffect, useRef } from "react";

/**
 * Launch celebration: the hero grid lights up. A ring of light radiates
 * outward from the center-most grid line, illuminating the grid lines as it
 * passes, then everything settles back to the ambient grid.
 * Rendered as one continuous radial-gradient sweep over the grid geometry —
 * no per-cell popping.
 * - Geometry matches the hero grid (196.6 x 194 cells anchored at 50%+97px)
 * - Fires once on mount (~3s), then removes itself entirely
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
		const anchorX = W / 2 + 97;
		const ROWS = 3;
		const heroTop = gridTop;
		const heroBottom = gridTop + ROWS * CELL_H;

		// Wave origin: ON the center-most grid line, between the two central
		// columns, at headline height
		const originX = anchorX;
		const originY = gridTop + CELL_H * 1.2;

		// Build one path containing all grid lines in the hero area
		const gridPath = new Path2D();
		const firstCol = Math.floor((0 - anchorX) / CELL_W) - 1;
		const lastCol = Math.ceil((W - anchorX) / CELL_W) + 1;
		for (let col = firstCol; col <= lastCol; col++) {
			const x = anchorX + col * CELL_W;
			gridPath.moveTo(x, heroTop);
			gridPath.lineTo(x, heroBottom);
		}
		for (let row = 0; row <= ROWS; row++) {
			const y = gridTop + row * CELL_H;
			gridPath.moveTo(0, y);
			gridPath.lineTo(W, y);
		}

		const corners = [
			[0, heroTop],
			[W, heroTop],
			[0, heroBottom],
			[W, heroBottom],
		];
		const maxDist = Math.max(
			...corners.map(([x, y]) => Math.hypot(x - originX, y - originY)),
		);

		const BAND = 150; // ring thickness in px
		const DURATION = 3000;
		const WAVE_TIME = 2300; // ring reaches the farthest corner
		const start = performance.now();
		let raf: number;
		let done = false;

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, W, H);

			const r = (elapsed / WAVE_TIME) * (maxDist + BAND);
			const globalFade =
				elapsed > DURATION - 600 ? Math.max(0, (DURATION - elapsed) / 600) : 1;

			if (globalFade > 0 && r > 0) {
				// One radial gradient forms the moving ring of light
				const inner = Math.max(0, r - BAND);
				const outer = r + BAND * 0.4;
				const ring = ctx.createRadialGradient(
					originX,
					originY,
					inner,
					originX,
					originY,
					outer,
				);
				ring.addColorStop(0, "rgba(255, 255, 255, 0)");
				ring.addColorStop(0.7, `rgba(255, 255, 255, ${0.35 * globalFade})`);
				ring.addColorStop(1, "rgba(255, 255, 255, 0)");

				// Grid lines light up as the ring passes
				ctx.strokeStyle = ring;
				ctx.lineWidth = 1;
				ctx.stroke(gridPath);

				// Faint interior wash inside the ring band
				const wash = ctx.createRadialGradient(
					originX,
					originY,
					inner,
					originX,
					originY,
					outer,
				);
				wash.addColorStop(0, "rgba(255, 255, 255, 0)");
				wash.addColorStop(0.7, `rgba(255, 255, 255, ${0.03 * globalFade})`);
				wash.addColorStop(1, "rgba(255, 255, 255, 0)");
				ctx.fillStyle = wash;
				ctx.fillRect(0, heroTop, W, heroBottom - heroTop);
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else if (!done) {
				done = true;
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
