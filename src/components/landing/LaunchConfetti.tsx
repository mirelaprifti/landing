import { useEffect, useRef } from "react";

/**
 * One-time celebratory confetti for the v4 launch page — explosive edition.
 * Fireworks-style: staggered bursts fire particles radially outward at high
 * velocity; drag slows them, then gravity pulls them down.
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

		const COLORS = [
			"#34d399", // emerald-400
			"#a78bfa", // violet-400
			"#fbbf24", // amber-400
			"#38bdf8", // sky-400
			"#f472b6", // pink-400
			"#ffffff",
		];

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
			born: number;
			life: number;
		};

		const particles: Particle[] = [];

		const burst = (
			cx: number,
			cy: number,
			count: number,
			power: number,
			bornAt: number,
		) => {
			for (let i = 0; i < count; i++) {
				// Radial explosion with an upward bias
				const angle = Math.random() * Math.PI * 2;
				const speed = power * (0.4 + Math.random() * 0.9);
				particles.push({
					x: cx,
					y: cy,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed - power * 0.35,
					w: 6 + Math.random() * 5,
					h: 8 + Math.random() * 7,
					color: COLORS[Math.floor(Math.random() * COLORS.length)],
					rotation: Math.random() * Math.PI * 2,
					vr: (Math.random() - 0.5) * 0.4,
					born: bornAt,
					life: 1600 + Math.random() * 900,
				});
			}
		};

		const W = window.innerWidth;
		const H = window.innerHeight;

		// Staggered volley: center pop first, then flanks, then a top finale
		const VOLLEYS: { at: number; x: number; y: number; n: number; p: number }[] = [
			{ at: 0, x: W * 0.5, y: H * 0.42, n: 110, p: 16 },
			{ at: 220, x: W * 0.18, y: H * 0.3, n: 80, p: 14 },
			{ at: 380, x: W * 0.82, y: H * 0.3, n: 80, p: 14 },
			{ at: 620, x: W * 0.5, y: H * 0.18, n: 90, p: 17 },
		];
		let volleyIndex = 0;

		const DRAG = 0.955;
		const GRAVITY = 0.22;
		const start = performance.now();
		const DURATION = 3400;
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;

			// Fire pending volleys
			while (
				volleyIndex < VOLLEYS.length &&
				elapsed >= VOLLEYS[volleyIndex].at
			) {
				const v = VOLLEYS[volleyIndex];
				burst(v.x, v.y, v.n, v.p, now);
				volleyIndex++;
			}

			ctx.clearRect(0, 0, W, H);

			for (const p of particles) {
				const age = now - p.born;
				if (age > p.life) continue;
				p.vx *= DRAG;
				p.vy = p.vy * DRAG + GRAVITY;
				p.x += p.vx;
				p.y += p.vy;
				p.rotation += p.vr;

				// Fade out over the last 40% of each particle's life
				const t = age / p.life;
				const opacity = t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = opacity;
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
				ctx.restore();
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
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[300] h-full w-full"
		/>
	);
}
