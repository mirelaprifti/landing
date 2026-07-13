import { useEffect, useRef } from "react";

/**
 * One-time launch celebration: subtle glitter with Effect syntax.
 * Soft bursts release a shimmer of tiny twinkling specks, with occasional
 * small code tokens (yield*, pipe, v4...) drifting among them at low opacity.
 * - Fires once on mount, ~5s, then removes itself entirely
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

		// Glitter tints — mostly silver/white, brand hues as soft accents
		const SPECK_COLORS = [
			"#ffffff",
			"#ffffff",
			"#e4e4e7",
			"#d4d4d8",
			"#6ee7b7", // emerald-300
			"#c4b5fd", // violet-300
			"#7dd3fc", // sky-300
		];

		const TOKENS: { text: string; color: string }[] = [
			{ text: "yield*", color: "#a5b4fc" },
			{ text: "pipe", color: "#e4e4e7" },
			{ text: "Effect.gen", color: "#e4e4e7" },
			{ text: "{ }", color: "#a1a1aa" },
			{ text: "=>", color: "#a1a1aa" },
			{ text: '"effect"', color: "#34d399" },
			{ text: "v4", color: "#ffffff" },
		];

		type Particle = {
			kind: "speck" | "token";
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			text?: string;
			color: string;
			rotation: number;
			born: number;
			life: number;
			twinklePhase: number;
			twinkleSpeed: number;
			baseOpacity: number;
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
				// 85% glitter specks, 15% small drifting tokens
				const isToken = Math.random() < 0.15;
				const token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
				const angle = Math.random() * Math.PI * 2;
				const speed = power * (0.3 + Math.random() * 0.8);
				particles.push({
					kind: isToken ? "token" : "speck",
					x: cx,
					y: cy,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed - power * 0.3,
					size: isToken
						? 9 + Math.random() * 4
						: 1.2 + Math.random() * 2.2,
					text: isToken ? token.text : undefined,
					color: isToken
						? token.color
						: SPECK_COLORS[Math.floor(Math.random() * SPECK_COLORS.length)],
					rotation: (Math.random() - 0.5) * 0.4,
					born: bornAt,
					life: 3000 + Math.random() * 1800,
					twinklePhase: Math.random() * Math.PI * 2,
					twinkleSpeed: 0.12 + Math.random() * 0.2,
					baseOpacity: isToken
						? 0.35 + Math.random() * 0.3
						: 0.5 + Math.random() * 0.5,
					swayPhase: Math.random() * Math.PI * 2,
					swaySpeed: 0.02 + Math.random() * 0.03,
					swayAmp: 0.4 + Math.random() * 1,
				});
			}
		};

		const W = window.innerWidth;
		const H = window.innerHeight;

		// Gentle, staggered shimmer pops
		const VOLLEYS: { at: number; x: number; y: number; n: number; p: number }[] = [
			{ at: 0, x: W * 0.5, y: H * 0.38, n: 160, p: 7 },
			{ at: 350, x: W * 0.22, y: H * 0.28, n: 110, p: 6 },
			{ at: 600, x: W * 0.78, y: H * 0.28, n: 110, p: 6 },
		];
		let volleyIndex = 0;

		const DRAG = 0.965;
		const GRAVITY = 0.045;
		const easeIn = (t: number) => t * t;
		const start = performance.now();
		const DURATION = 5200;
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
				p.twinklePhase += p.twinkleSpeed;
				p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmp;
				p.y += p.vy;

				const t = age / p.life;
				const fade = t > 0.5 ? 1 - easeIn((t - 0.5) / 0.5) : 1;
				// Twinkle: opacity shimmers as each speck catches the light
				const twinkle =
					p.kind === "speck"
						? 0.25 + 0.75 * Math.abs(Math.sin(p.twinklePhase))
						: 0.8 + 0.2 * Math.sin(p.twinklePhase);
				const opacity = p.baseOpacity * twinkle * fade;
				if (opacity <= 0.01) continue;

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.globalAlpha = opacity;

				if (p.kind === "speck") {
					// Soft glow makes specks read as glitter, not dust
					ctx.shadowColor = p.color;
					ctx.shadowBlur = 5;
					ctx.fillStyle = p.color;
					ctx.rotate(Math.PI / 4); // diamond orientation
					ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
				} else {
					ctx.rotate(p.rotation);
					ctx.fillStyle = p.color;
					ctx.font = `500 ${p.size}px "JetBrains Mono", monospace`;
					ctx.fillText(p.text ?? "", 0, 0);
				}
				ctx.restore();
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
			}
		};

		document.fonts?.load('500 12px "JetBrains Mono"').finally(() => {
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
