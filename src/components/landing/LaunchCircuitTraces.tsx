import { useEffect, useRef } from "react";

/**
 * Launch decoration #2: circuit traces. Pulses of light travel along the
 * hero's grid lines like signals through circuitry — a few staggered runs
 * across horizontals and verticals, then quiet.
 * - Geometry matches the hero grid (196.6 x 194 anchored at 50%+97px)
 * - Fires once on mount (~3.5s), then removes itself entirely
 * - Respects prefers-reduced-motion (renders nothing)
 */
export function LaunchCircuitTraces({
	gridTop = 104,
}: {
	gridTop?: number;
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

		const CELL_W = 196.6;
		const CELL_H = 194;
		const anchorX = W / 2 + 97;

		// Build the set of candidate lines within the hero area
		const horizontals: number[] = [0, 1, 2, 3].map(
			(row) => gridTop + row * CELL_H,
		);
		const verticals: number[] = [];
		const firstCol = Math.floor((0 - anchorX) / CELL_W);
		const lastCol = Math.ceil((W - anchorX) / CELL_W);
		for (let col = firstCol; col <= lastCol; col++) {
			verticals.push(anchorX + col * CELL_W);
		}
		const heroBottom = gridTop + 3 * CELL_H;

		type Trace = {
			axis: "h" | "v";
			pos: number; // y for horizontal, x for vertical
			from: number; // travel start coordinate
			to: number; // travel end coordinate
			startAt: number;
			duration: number;
		};

		const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

		const traces: Trace[] = [];
		// 5 horizontal runs, alternating directions
		for (let i = 0; i < 5; i++) {
			const leftToRight = i % 2 === 0;
			traces.push({
				axis: "h",
				pos: pick(horizontals),
				from: leftToRight ? -100 : W + 100,
				to: leftToRight ? W + 100 : -100,
				startAt: i * 320 + Math.random() * 120,
				duration: 1100 + Math.random() * 500,
			});
		}
		// 4 vertical runs, top to bottom within the hero
		for (let i = 0; i < 4; i++) {
			traces.push({
				axis: "v",
				pos: pick(verticals),
				from: gridTop - 60,
				to: heroBottom + 60,
				startAt: 200 + i * 380 + Math.random() * 150,
				duration: 900 + Math.random() * 400,
			});
		}

		const TAIL = 130; // trailing glow length in px
		const DURATION = 3500;
		const start = performance.now();
		let raf: number;

		const drawPulse = (t: Trace, progress: number) => {
			const head = t.from + (t.to - t.from) * progress;
			const dir = Math.sign(t.to - t.from);
			const tailEnd = head - dir * TAIL;

			const gradient =
				t.axis === "h"
					? ctx.createLinearGradient(tailEnd, 0, head, 0)
					: ctx.createLinearGradient(0, tailEnd, 0, head);
			gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
			gradient.addColorStop(1, "rgba(255, 255, 255, 0.7)");

			ctx.strokeStyle = gradient;
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			if (t.axis === "h") {
				ctx.moveTo(tailEnd, t.pos);
				ctx.lineTo(head, t.pos);
			} else {
				ctx.moveTo(t.pos, tailEnd);
				ctx.lineTo(t.pos, head);
			}
			ctx.stroke();

			// Bright head dot
			ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
			ctx.beginPath();
			if (t.axis === "h") {
				ctx.arc(head, t.pos, 1.6, 0, Math.PI * 2);
			} else {
				ctx.arc(t.pos, head, 1.6, 0, Math.PI * 2);
			}
			ctx.fill();
		};

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, W, H);

			for (const t of traces) {
				const local = elapsed - t.startAt;
				if (local < 0 || local > t.duration) continue;
				drawPulse(t, local / t.duration);
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
			}
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [gridTop]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
		/>
	);
}
