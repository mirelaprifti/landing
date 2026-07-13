import { useEffect, useRef } from "react";

/**
 * One-time launch celebration: code confetti. Staggered fireworks bursts of
 * source-code tokens (yield*, Effect.gen, pipe, braces...) in JetBrains Mono,
 * colored with the site's syntax palette. Rare oversized "v4" pieces headline.
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

		// Tokens weighted like real source — symbols common, keywords next,
		// full API names as accents. Colors follow the site's syntax palette.
		const TOKENS: { text: string; color: string; weight: number }[] = [
			{ text: "{ }", color: "#a1a1aa", weight: 10 }, // punctuation — zinc
			{ text: "=>", color: "#a1a1aa", weight: 8 },
			{ text: "( )", color: "#a1a1aa", weight: 6 },
			{ text: "*", color: "#a5b4fc", weight: 6 }, // indigo keywords
			{ text: "yield*", color: "#a5b4fc", weight: 8 },
			{ text: "const", color: "#a5b4fc", weight: 5 },
			{ text: "function*", color: "#a5b4fc", weight: 3 },
			{ text: "Effect.gen", color: "#e4e4e7", weight: 6 }, // identifiers
			{ text: "pipe", color: "#e4e4e7", weight: 6 },
			{ text: "Effect", color: "#ffffff", weight: 5 },
			{ text: "Schema", color: "#e4e4e7", weight: 3 },
			{ text: "Fiber", color: "#e4e4e7", weight: 3 },
			{ text: "Layer", color: "#e4e4e7", weight: 3 },
			{ text: '"effect"', color: "#34d399", weight: 6 }, // strings — emerald
			{ text: "Success", color: "#34d399", weight: 3 },
			{ text: "Error", color: "#f87171", weight: 3 }, // red-400
			{ text: "Requirements", color: "#a78bfa", weight: 2 }, // violet-400
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
			bold: boolean;
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
				// ~6% of pieces are the oversized white "v4" hero tokens
				const isHero = Math.random() < 0.06;
				const token = isHero
					? { text: "v4", color: "#ffffff" }
					: pickToken();
				const angle = Math.random() * Math.PI * 2;
				const speed = power * (0.4 + Math.random() * 0.9);
				particles.push({
					x: cx,
					y: cy,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed - power * 0.35,
					text: token.text,
					color: token.color,
					fontSize: isHero ? 26 + Math.random() * 12 : 11 + Math.random() * 7,
					bold: isHero,
					rotation: (Math.random() - 0.5) * 1.1,
					vr: (Math.random() - 0.5) * 0.06,
					born: bornAt,
					life: 2200 + Math.random() * 1400,
					tumblePhase: Math.random() * Math.PI * 2,
					tumbleSpeed: 0.08 + Math.random() * 0.1,
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
			{ at: 0, x: W * 0.5, y: H * 0.42, n: 70, p: 15 },
			{ at: 220, x: W * 0.18, y: H * 0.3, n: 50, p: 13 },
			{ at: 380, x: W * 0.82, y: H * 0.3, n: 50, p: 13 },
			{ at: 620, x: W * 0.5, y: H * 0.18, n: 60, p: 16 },
		];
		let volleyIndex = 0;

		const DRAG = 0.96;
		const GRAVITY = 0.14;
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
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

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

				// Card flip — tokens tumble like slips of paper
				const flip = 0.35 + 0.65 * Math.abs(Math.sin(p.tumblePhase));

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.scale(1, flip);
				ctx.globalAlpha = opacity;
				ctx.fillStyle = p.color;
				ctx.font = `${p.bold ? "700" : "500"} ${p.fontSize}px "JetBrains Mono", monospace`;
				ctx.fillText(p.text, 0, 0);
				ctx.restore();
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
			}
		};

		// Ensure the mono font is ready so tokens don't render in a fallback
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
