import { useEffect, useRef } from "react";

/**
 * One-time celebratory confetti burst for the v4 launch page — 80s edition.
 * - Neon synthwave palette with glow, mixed shapes (chips, ribbons, dots)
 * - Fires once on mount, ~3s, then removes itself entirely
 * - Respects prefers-reduced-motion (renders nothing)
 */
export function LaunchConfetti() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		ctx.scale(dpr, dpr);

		// Neon synthwave palette
		const COLORS = [
			"#ff2975", // hot pink
			"#ff00ff", // magenta
			"#00ffff", // cyan
			"#39ff14", // neon green
			"#f8ee00", // electric yellow
			"#8c1eff", // electric purple
			"#ff6ec7", // neon rose
		];

		type Shape = "chip" | "ribbon" | "dot";

		type Particle = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			w: number;
			h: number;
			color: string;
			rotation: number;
			vr: number;
			opacity: number;
			shape: Shape;
			wobblePhase: number;
			wobbleSpeed: number;
			wobbleAmp: number;
		};

		const randomShape = (): Shape => {
			const r = Math.random();
			if (r < 0.5) return "chip";
			if (r < 0.8) return "ribbon";
			return "dot";
		};

		const particles: Particle[] = Array.from({ length: 220 }, () => {
			const shape = randomShape();
			return {
				x: Math.random() * window.innerWidth,
				y: -30 - Math.random() * 200,
				vx: (Math.random() - 0.5) * 4,
				vy: 2.5 + Math.random() * 4,
				w: shape === "ribbon" ? 5 + Math.random() * 3 : 7 + Math.random() * 6,
				h: shape === "ribbon" ? 22 + Math.random() * 16 : 9 + Math.random() * 7,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				rotation: Math.random() * Math.PI * 2,
				vr: (Math.random() - 0.5) * 0.35,
				opacity: 1,
				shape,
				wobblePhase: Math.random() * Math.PI * 2,
				wobbleSpeed: 0.08 + Math.random() * 0.12,
				wobbleAmp: 1 + Math.random() * 2.5,
			};
		});

		const start = performance.now();
		const DURATION = 3200;
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			const fade = elapsed > DURATION - 900 ? (DURATION - elapsed) / 900 : 1;

			for (const p of particles) {
				p.wobblePhase += p.wobbleSpeed;
				p.x += p.vx + Math.sin(p.wobblePhase) * p.wobbleAmp;
				p.y += p.vy;
				p.vy += 0.055;
				p.rotation += p.vr;
				p.opacity = Math.max(0, fade);

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = p.opacity;
				// Neon glow — the 80s ingredient
				ctx.shadowColor = p.color;
				ctx.shadowBlur = 12;
				ctx.fillStyle = p.color;
				if (p.shape === "dot") {
					ctx.beginPath();
					ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
					ctx.fill();
				} else {
					ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
				}
				ctx.restore();
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
				canvas.style.display = "none";
			}
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[300] h-full w-full"
		/>
	);
}
