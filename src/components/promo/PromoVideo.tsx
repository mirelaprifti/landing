import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getAssetPath } from "@/utils/assetPath";

/**
 * Self-running promo animation for social media.
 *
 * Open /promo in a browser, start a screen recording, and let it loop.
 * Formats (via query param):
 *   /promo             -> 16:9  (1920x1080)  X / YouTube / LinkedIn
 *   /promo?format=square   -> 1:1 (1080x1080)  feed posts
 *   /promo?format=vertical -> 9:16 (1080x1920) Shorts / Reels / TikTok
 * Press Space or R to restart from the first scene.
 */

const FORMATS = {
	wide: { width: 1920, height: 1080 },
	square: { width: 1080, height: 1080 },
	vertical: { width: 1080, height: 1920 },
} as const;

type Format = keyof typeof FORMATS;

function getFormat(): Format {
	if (typeof window === "undefined") return "wide";
	const f = new URLSearchParams(window.location.search).get("format");
	return f === "square" || f === "vertical" ? f : "wide";
}

const PROD_LOGOS: { name: string; src: string; h: number; invert?: boolean }[] =
	[
		{
			name: "Cloudflare",
			src: "/assets/effect-jobs-logos/Cloudflare_logo_horizontal_wht 1.png",
			h: 34,
		},
		{
			name: "opencode",
			src: "/assets/effect-jobs-logos/opencode-wordmark-dark.svg",
			h: 30,
		},
		{
			name: "MasterClass",
			src: "/assets/quotes-logos/masterclass-noM.svg",
			h: 24,
		},
		{
			name: "T3 Chat",
			src: "/assets/test-logos/t3-chat.png",
			h: 26,
			invert: true,
		},
		{ name: "X", src: "/assets/test-logos/x-logo.svg", h: 36 },
	];

const CAPABILITIES = [
	"Error handling",
	"Retries & timeouts",
	"Concurrency",
	"Streams",
	"Observability",
	"Dependency injection",
];

/** Scene durations in ms. Total ≈ 24s per loop. */
const SCENE_DURATIONS = [4200, 4800, 5000, 4200, 5800];

function TypedText({
	text,
	speed = 60,
	delay = 0,
}: {
	text: string;
	speed?: number;
	delay?: number;
}) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		const timeout = setTimeout(() => {
			let i = 0;
			interval = setInterval(() => {
				i++;
				setCount(i);
				if (i >= text.length) clearInterval(interval);
			}, speed);
		}, delay);
		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, [text, speed, delay]);
	return (
		<span>
			{text.slice(0, count)}
			<span className="animate-pulse text-zinc-500">▌</span>
		</span>
	);
}

function Terminal({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-[640px] max-w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl shadow-black/50">
			<div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
				<span className="h-3 w-3 rounded-full bg-zinc-700" />
				<span className="h-3 w-3 rounded-full bg-zinc-700" />
				<span className="h-3 w-3 rounded-full bg-zinc-700" />
			</div>
			<div className="px-6 py-6 text-left font-mono text-2xl leading-relaxed text-zinc-200">
				{children}
			</div>
		</div>
	);
}

function SceneInstall() {
	const [done, setDone] = useState(false);
	useEffect(() => {
		const t = setTimeout(() => setDone(true), 1900);
		return () => clearTimeout(t);
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.96 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Terminal>
				<div>
					<span className="text-zinc-500">$ </span>
					<TypedText text="bun add effect" delay={500} />
				</div>
				{done && (
					<motion.div
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.35 }}
						className="mt-3 text-[#22c55e]"
					>
						✓ installed effect — 1 package, everything you need
					</motion.div>
				)}
			</Terminal>
		</motion.div>
	);
}

function SceneHeadline() {
	const words = "Reliable TypeScript for the AI era".split(" ");
	return (
		<motion.div
			className="flex flex-col items-center px-12 text-center"
			exit={{ opacity: 0, filter: "blur(8px)" }}
			transition={{ duration: 0.5 }}
		>
			<motion.img
				src={getAssetPath(
					"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
				)}
				alt="Effect"
				className="mb-12 h-16 w-auto"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			/>
			<h1 className="max-w-5xl text-7xl leading-[1.08] font-bold text-balance text-white">
				{words.map((word, i) => (
					<motion.span
						key={`${word}-${i}`}
						className="inline-block whitespace-pre"
						initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{
							duration: 0.5,
							delay: 0.4 + i * 0.12,
							ease: "easeOut",
						}}
					>
						{word}
						{i < words.length - 1 ? " " : ""}
					</motion.span>
				))}
			</h1>
			<motion.p
				className="mt-8 max-w-3xl text-2xl leading-snug text-zinc-400"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.5 }}
			>
				Build production-ready systems your team can ship, customers can depend
				on, and AI agents can work with.
			</motion.p>
		</motion.div>
	);
}

function SceneCapabilities() {
	return (
		<motion.div
			className="flex flex-col items-center px-12 text-center"
			exit={{ opacity: 0, filter: "blur(8px)" }}
			transition={{ duration: 0.5 }}
		>
			<motion.p
				className="mb-4 font-mono text-xl tracking-wider text-zinc-400 uppercase"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<span className="text-zinc-500">{"// "}</span>One package
			</motion.p>
			<motion.h2
				className="text-6xl font-bold text-white"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
			>
				Everything you need
			</motion.h2>
			<div className="mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-4">
				{CAPABILITIES.map((cap, i) => (
					<motion.span
						key={cap}
						className="rounded-full border border-zinc-700 bg-zinc-900/80 px-7 py-3.5 font-mono text-xl text-zinc-200"
						initial={{ opacity: 0, y: 16, scale: 0.94 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							duration: 0.45,
							delay: 0.7 + i * 0.18,
							ease: "easeOut",
						}}
					>
						{cap}
					</motion.span>
				))}
			</div>
		</motion.div>
	);
}

function SceneProduction() {
	return (
		<motion.div
			className="flex flex-col items-center px-12 text-center"
			exit={{ opacity: 0, filter: "blur(8px)" }}
			transition={{ duration: 0.5 }}
		>
			<motion.p
				className="mb-14 font-mono text-xl tracking-wider text-zinc-400 uppercase"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<span className="text-zinc-500">{"// "}</span>In production at
			</motion.p>
			<div className="flex max-w-[1300px] flex-wrap items-center justify-center gap-x-16 gap-y-12 px-8">
				{PROD_LOGOS.map((logo, i) => (
					<motion.img
						key={logo.name}
						src={getAssetPath(logo.src)}
						alt={logo.name}
						style={{ height: logo.h }}
						className={`w-auto ${logo.invert ? "brightness-0 invert" : ""}`}
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.4 + i * 0.22,
							ease: "easeOut",
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}

function SceneCTA() {
	return (
		<motion.div
			className="flex flex-col items-center px-12 text-center"
			exit={{ opacity: 0, filter: "blur(8px)" }}
			transition={{ duration: 0.6 }}
		>
			<motion.p
				className="mb-5 font-mono text-2xl text-zinc-500"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				import {"{ "}
				<span className="text-white">Effect</span>
				{" }"} from "effect"
			</motion.p>
			<motion.h2
				className="max-w-4xl text-6xl leading-[1.1] font-bold text-balance text-white"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
			>
				Stop installing a new package for every problem
			</motion.h2>
			<motion.div
				className="mt-14 flex items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-900/80 px-8 py-4 font-mono text-2xl text-zinc-200"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
			>
				<span className="text-zinc-500">$</span> bun add effect
			</motion.div>
			<motion.p
				className="mt-10 font-mono text-3xl font-medium tracking-wide text-[#22c55e]"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1.8 }}
			>
				effect.website
			</motion.p>
		</motion.div>
	);
}

const SCENES = [
	SceneInstall,
	SceneHeadline,
	SceneCapabilities,
	SceneProduction,
	SceneCTA,
];

export function PromoVideo() {
	const [format] = useState<Format>(getFormat);
	const [scene, setScene] = useState(0);
	const [cycle, setCycle] = useState(0);
	const [scale, setScale] = useState(1);
	const [showHint, setShowHint] = useState(true);
	const stage = FORMATS[format];

	// Scene timeline — advance and loop.
	useEffect(() => {
		const t = setTimeout(() => {
			if (scene < SCENES.length - 1) setScene(scene + 1);
			else {
				setScene(0);
				setCycle((c) => c + 1);
			}
		}, SCENE_DURATIONS[scene]);
		return () => clearTimeout(t);
	}, [scene, cycle]);

	// Fit the fixed-size stage to the window.
	useEffect(() => {
		const fit = () =>
			setScale(
				Math.min(
					window.innerWidth / stage.width,
					window.innerHeight / stage.height,
				),
			);
		fit();
		window.addEventListener("resize", fit);
		return () => window.removeEventListener("resize", fit);
	}, [stage.width, stage.height]);

	// Space / R restarts the loop from scene 0.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.code === "Space" || e.key === "r" || e.key === "R") {
				e.preventDefault();
				setScene(0);
				setCycle((c) => c + 1);
				setShowHint(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		const t = setTimeout(() => setShowHint(false), 5000);
		return () => clearTimeout(t);
	}, []);

	const ActiveScene = SCENES[scene];

	return (
		<div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-zinc-950 [cursor:none]">
			<div
				className="relative flex-none overflow-hidden bg-zinc-950"
				style={{
					width: stage.width,
					height: stage.height,
					transform: `scale(${scale})`,
				}}
			>
				{/* Grid background */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
							linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
						`,
						backgroundSize: "196.6px 194px",
						backgroundPosition: "calc(50% + 97px) 0",
					}}
				/>
				{/* Edge fade */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							"linear-gradient(to bottom, var(--page-fade) 0%, transparent 25%, transparent 65%, var(--page-fade) 100%)",
					}}
				/>
				{/* Glow */}
				<div
					className="pointer-events-none absolute inset-0 animate-[glow-pulse_4s_ease-in-out_infinite]"
					style={{
						background: `
							radial-gradient(ellipse 50% 80% at 70% -20%, var(--hero-glow-a) 0%, transparent 50%),
							radial-gradient(ellipse 30% 50% at 80% 0%, var(--hero-glow-b) 0%, transparent 40%)
						`,
					}}
				/>
				{/* Dither texture */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
						backgroundSize: "4px 4px",
					}}
				/>
				<style>{`
					@keyframes glow-pulse {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.6; }
					}
				`}</style>

				{/* Scenes */}
				<div className="absolute inset-0 flex items-center justify-center">
					<AnimatePresence mode="wait">
						<ActiveScene key={`${cycle}-${scene}`} />
					</AnimatePresence>
				</div>
			</div>

			{/* Recording hint — fades out, never returns */}
			<AnimatePresence>
				{showHint && (
					<motion.p
						className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-600"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
					>
						loops automatically · press Space to restart · ?format=square |
						vertical
					</motion.p>
				)}
			</AnimatePresence>
		</div>
	);
}
