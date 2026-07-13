import { useEffect, useRef } from "react";

/**
 * One-time celebratory confetti burst for the v4 launch page.
 * - Fires once on mount, ~2s, then removes itself entirely
 * - Respects prefers-reduced-motion (renders nothing)
 * - Restrained palette: brand zinc + emerald/violet accents
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
			opacity: number;
		};

		const particles: Particle[] = Array.from({ length: 180 }, () => ({
			x: Math.random() * window.innerWidth,
			y: -20 - Math.random() * 150,
			vx: (Math.random() - 0.5) * 3,
			vy: 2.5 + Math.random() * 3.5,
			w: 7 + Math.random() * 5,
			h: 10 + Math.random() * 7,
			color: COLORS[Math.floor(Math.random() * COLORS.length)],
			rotation: Math.random() * Math.PI * 2,
			vr: (Math.random() - 0.5) * 0.2,
			opacity: 1,
		}));

		const start = performance.now();
		const DURATION = 2600;
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			const fade = elapsed > DURATION - 800 ? (DURATION - elapsed) / 800 : 1;

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				p.vy += 0.05;
				p.rotation += p.vr;
				p.opacity = Math.max(0, fade);

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = p.opacity;
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
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
