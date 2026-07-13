import { useEffect, useRef } from "react";

/**
 * One-time launch celebration: Effect-syntax confetti, chip style.
 * Staggered bursts of little code chips — rounded dark pills with hairline
 * borders and syntax-colored JetBrains Mono tokens (yield*, Effect.gen,
 * pipe...). Rare inverted white "v4" chips headline the swarm.
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

		// Tokens weighted like real source; colors follow the site's syntax palette
		const TOKENS: { text: string; color: string; weight: number }[] = [
			{ text: "{ }", color: "#a1a1aa", weight: 8 },
			{ text: "=>", color: "#a1a1aa", weight: 7 },
			{ text: "yield*", color: "#a5b4fc", weight: 8 },
			{ text: "const", color: "#a5b4fc", weight: 5 },
			{ text: "function*", color: "#a5b4fc", weight: 3 },
			{ text: "Effect.gen", color: "#e4e4e7", weight: 6 },
			{ text: "pipe", color: "#e4e4e7", weight: 6 },
			{ text: "Effect", color: "#ffffff", weight: 5 },
			{ text: "Schema", color: "#e4e4e7", weight: 3 },
			{ text: "Fiber", color: "#e4e4e7", weight: 3 },
			{ text: "Layer", color: "#e4e4e7", weight: 3 },
			{ text: '"effect"', color: "#34d399", weight: 6 },
			{ text: "Success", color: "#34d399", weight: 3 },
			{ text: "Error", color: "#f87171", weight: 3 },
			{ text: "Requirements", color: "#a78bfa", weight: 2 },
		];

		const pickToken = () => {
			const total = TOKENS.reduce((sum, t) => sum + t.weight, 0);
			let r = Math.random() * total;
			for (const t of TOKENS) {
				r -= t.weight;
				if (r <= 0) return t;
			}
			return TOKENS[0];
		};

		type Particle = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			text: string;
			color: string;
			fontSize: number;
			hero: boolean;
			chipW: number;
			chipH: number;
			rotation: number;
			vr: number;
			born: number;
			life: number;
			swayPhase: number;
			swaySpeed: number;
			swayAmp: number;
		};

		const particles: Particle[] = [];

		const measureChip = (text: string, fontSize: number, bold: boolean) => {
			ctx.font = `${bold ? "700" : "500"} ${fontSize}px "JetBrains Mono", monospace`;
			const w = ctx.measureText(text).width;
			return { chipW: w + fontSize * 1.1, chipH: fontSize * 1.9 };
		};

		const burst = (
			cx: number,
			cy: number,
			count: number,
			power: number,
			bornAt: number,
		) => {
			for (let i = 0; i < count; i++) {
				// ~7% of chips are the inverted white "v4" heroes
				const hero = Math.random() < 0.07;
				const token = hero ? { text: "v4", color: "#18181b" } : pickToken();
				const fontSize = hero ? 20 + Math.random() * 8 : 10 + Math.random() * 5;
				const { chipW, chipH } = measureChip(token.text, fontSize, hero);
				const angle = Math.random() * Math.PI * 2;
				const speed = power * (0.4 + Math.random() * 0.9);
				particles.push({
					x: cx,
					y: cy,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed - power * 0.35,
					text: token.text,
					color: token.color,
					fontSize,
					hero,
					chipW,
					chipH,
					rotation: (Math.random() - 0.5) * 0.5,
					vr: (Math.random() - 0.5) * 0.04,
					born: bornAt,
					life: 2400 + Math.random() * 1400,
					swayPhase: Math.random() * Math.PI * 2,
					swaySpeed: 0.03 + Math.random() * 0.04,
					swayAmp: 0.7 + Math.random() * 1.6,
				});
			}
		};

		const W = window.innerWidth;
		const H = window.innerHeight;

		// Staggered volley: center pop first, then flanks, then a top finale
		const VOLLEYS: { at: number; x: number; y: number; n: number; p: number }[] = [
			{ at: 0, x: W * 0.5, y: H * 0.42, n: 55, p: 15 },
			{ at: 220, x: W * 0.18, y: H * 0.3, n: 40, p: 13 },
			{ at: 380, x: W * 0.82, y: H * 0.3, n: 40, p: 13 },
			{ at: 620, x: W * 0.5, y: H * 0.18, n: 48, p: 16 },
		];
		let volleyIndex = 0;

		const DRAG = 0.96;
		const GRAVITY = 0.13;
		const easeIn = (t: number) => t * t;
		const easeOutBack = (t: number) => {
			const c = 1.70158;
			return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
		};
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
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			for (const p of particles) {
				const age = now - p.born;
				if (age > p.life) continue;

				p.vx *= DRAG;
				p.vy = p.vy * DRAG + GRAVITY;
				p.swayPhase += p.swaySpeed;
				p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmp;
				p.y += p.vy;
				p.rotation += p.vr;

				const t = age / p.life;
				const opacity = t > 0.55 ? 1 - easeIn((t - 0.55) / 0.45) : 1;
				// Pop-in: chips scale up with a slight overshoot in their first 220ms
				const pop = age < 220 ? easeOutBack(age / 220) : 1;

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.scale(pop, pop);
				ctx.globalAlpha = opacity;

				// Chip body
				const r = p.chipH / 2.6;
				ctx.beginPath();
				ctx.roundRect(-p.chipW / 2, -p.chipH / 2, p.chipW, p.chipH, r);
				ctx.fillStyle = p.hero ? "#ffffff" : "#18181b";
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = p.hero ? "#ffffff" : "#3f3f46";
				ctx.stroke();

				// Token text
				ctx.fillStyle = p.color;
				ctx.font = `${p.hero ? "700" : "500"} ${p.fontSize}px "JetBrains Mono", monospace`;
				ctx.fillText(p.text, 0, 1);
				ctx.restore();
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
			}
		};

		// Ensure the mono font is ready so chips measure and render correctly
		document.fonts?.load('500 14px "JetBrains Mono"').finally(() => {
			raf = requestAnimationFrame(tick);
		});

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
