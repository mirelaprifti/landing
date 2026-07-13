import { useEffect, useRef } from "react";

/**
 * One-time celebratory confetti for the v4 launch page — classic style.
 * Staggered fireworks bursts of paper confetti: pieces tumble, sway on air
 * resistance, and float down in the brand-adjacent vivid palette.
 * - Fires once on mount, ~4s, then removes itself entirely
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
			"#34d399", "#6ee7b7", // emerald 400/300
			"#a78bfa", "#c4b5fd", // violet 400/300
			"#fbbf24", "#fcd34d", // amber 400/300
			"#38bdf8", "#7dd3fc", // sky 400/300
			"#f472b6", "#f9a8d4", // pink 400/300
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
			tumblePhase: number;
			tumbleSpeed: number;
			swayPhase: number;
			swaySpeed: number;
			swayAmp: number;
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
					vr: (Math.random() - 0.5) * 0.3,
					born: bornAt,
					life: 2200 + Math.random() * 1400,
					tumblePhase: Math.random() * Math.PI * 2,
					tumbleSpeed: 0.12 + Math.random() * 0.18,
					swayPhase: Math.random() * Math.PI * 2,
					swaySpeed: 0.03 + Math.random() * 0.04,
					swayAmp: 0.8 + Math.random() * 1.8,
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

		const DRAG = 0.96;
		const GRAVITY = 0.16;
		const easeIn = (t: number) => t * t;
		const start = performance.now();
		const DURATION = 4200;
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;

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
				p.swayPhase += p.swaySpeed;
				p.tumblePhase += p.tumbleSpeed;
				p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmp;
				p.y += p.vy;
				p.rotation += p.vr;

				const t = age / p.life;
				const opacity = t > 0.55 ? 1 - easeIn((t - 0.55) / 0.45) : 1;

				// Paper tumble: the piece flips in "3D" by squashing its height
				const flip = Math.abs(Math.sin(p.tumblePhase));

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = opacity;
				ctx.fillStyle = p.color;
				const h = Math.max(p.h * flip, 1.5);
				ctx.fillRect(-p.w / 2, -h / 2, p.w, h);
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
