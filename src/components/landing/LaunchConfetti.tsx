import { useEffect, useRef } from "react";

/**
 * One-time launch celebration: confetti bursts in and converges to spell
 * "Effect v4", holds for a beat, then releases and falls away.
 * - Targets are sampled from text rendered to an offscreen canvas
 * - Fires once on mount (~4.5s), then removes itself entirely
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

		const W = window.innerWidth;
		const H = window.innerHeight;
		const dpr = window.devicePixelRatio || 1;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);

		const COLORS = [
			"#34d399", // emerald-400
			"#a78bfa", // violet-400
			"#fbbf24", // amber-400
			"#38bdf8", // sky-400
			"#f472b6", // pink-400
			"#ffffff",
		];

		// ── Sample "Effect v4" into particle target positions ──────────
		const TEXT = "Effect v4";
		const off = document.createElement("canvas");
		const offCtx = off.getContext("2d");
		if (!offCtx) return;

		// Fit the text to ~80% of the viewport width
		let fontSize = 160;
		offCtx.font = `700 ${fontSize}px Inter, sans-serif`;
		const measured = offCtx.measureText(TEXT).width;
		fontSize = Math.min(180, (fontSize * (W * 0.8)) / measured);

		off.width = W;
		off.height = Math.ceil(fontSize * 1.4);
		offCtx.font = `700 ${fontSize}px Inter, sans-serif`;
		offCtx.textAlign = "center";
		offCtx.textBaseline = "middle";
		offCtx.fillStyle = "#fff";
		offCtx.fillText(TEXT, off.width / 2, off.height / 2);

		const img = offCtx.getImageData(0, 0, off.width, off.height);
		const GRID = Math.max(4, Math.round(fontSize / 26)); // sampling density
		const textTop = H * 0.34 - off.height / 2;

		type Particle = {
			// burst origin + velocity (phase 1)
			x: number;
			y: number;
			vx: number;
			vy: number;
			// text target (phase 2)
			tx: number;
			ty: number;
			// release velocity (phase 3, assigned at release)
			rvx: number;
			rvy: number;
			color: string;
			size: number;
			rotation: number;
			vr: number;
			delay: number;
		};

		const particles: Particle[] = [];
		for (let py = 0; py < off.height; py += GRID) {
			for (let px = 0; px < off.width; px += GRID) {
				const alpha = img.data[(py * off.width + px) * 4 + 3];
				if (alpha < 128) continue;
				// Burst from the center of the text area
				const angle = Math.random() * Math.PI * 2;
				const speed = 6 + Math.random() * 14;
				particles.push({
					x: W / 2,
					y: H * 0.34,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					tx: px + (Math.random() - 0.5) * 2,
					ty: textTop + py + (Math.random() - 0.5) * 2,
					rvx: (Math.random() - 0.5) * 5,
					rvy: -(1 + Math.random() * 3),
					color: COLORS[Math.floor(Math.random() * COLORS.length)],
					size: GRID * (0.55 + Math.random() * 0.35),
					rotation: Math.random() * Math.PI * 2,
					vr: (Math.random() - 0.5) * 0.3,
					delay: Math.random() * 250,
				});
			}
		}

		// ── Timeline ────────────────────────────────────────────────────
		const CONVERGE_END = 1400; // burst out, then pull into letterforms
		const HOLD_END = 2600; // hold the words (subtle shimmer)
		const DURATION = 4600; // release: gravity carries everything away

		const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
		const start = performance.now();
		let raf: number;

		const tick = (now: number) => {
			const elapsed = now - start;
			ctx.clearRect(0, 0, W, H);

			for (const p of particles) {
				const t = Math.max(0, elapsed - p.delay);
				let x: number;
				let y: number;
				let opacity = 1;
				let rotation: number;

				if (t < CONVERGE_END) {
					// Phase 1+2: fly out on the burst vector while being pulled
					// into the letter position — one continuous swirl
					const k = easeOutCubic(Math.min(1, t / CONVERGE_END));
					const burstX = p.x + p.vx * (t / 16) * (1 - k);
					const burstY = p.y + p.vy * (t / 16) * (1 - k);
					x = burstX + (p.tx - burstX) * k;
					y = burstY + (p.ty - burstY) * k;
					rotation = p.rotation + p.vr * (t / 16) * (1 - k);
				} else if (elapsed < HOLD_END) {
					// Phase 3: hold the text, gentle shimmer
					const wob = (elapsed - CONVERGE_END) / 160 + p.delay;
					x = p.tx + Math.sin(wob) * 0.6;
					y = p.ty + Math.cos(wob * 1.3) * 0.6;
					rotation = 0;
				} else {
					// Phase 4: release — confetti falls away
					const rt = (elapsed - HOLD_END) / 16;
					x = p.tx + p.rvx * rt;
					y = p.ty + p.rvy * rt + 0.11 * rt * rt;
					rotation = p.vr * rt;
					const fadeT = (elapsed - HOLD_END) / (DURATION - HOLD_END);
					opacity = Math.max(0, 1 - fadeT);
				}

				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(rotation);
				ctx.globalAlpha = opacity;
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
				ctx.restore();
			}

			if (elapsed < DURATION) {
				raf = requestAnimationFrame(tick);
			} else {
				ctx.clearRect(0, 0, W, H);
				canvas.style.display = "none";
			}
		};

		// Wait for the display font so letterforms sample correctly
		document.fonts?.load(`700 ${fontSize}px Inter`).finally(() => {
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
