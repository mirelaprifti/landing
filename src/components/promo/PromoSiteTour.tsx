import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getAssetPath } from "@/utils/assetPath";

/**
 * Site-tour promo animation for social media — shows the REAL landing page
 * (loaded in an iframe) inside a browser frame, scrolling through the actual
 * sections with synced captions.
 *
 * Open /promo-tour in a browser, start a screen recording, and let it loop.
 * Formats (via query param):
 *   /promo-tour                 -> 16:9  (1920x1080)
 *   /promo-tour?format=square   -> 1:1  (1080x1080)
 *   /promo-tour?format=vertical -> 9:16 (1080x1920)
 * Press Space or R to restart from the top.
 */

const FORMATS = {
	wide: {
		width: 1920,
		height: 1080,
		frameW: 1680,
		frameH: 950,
		designW: 1440,
	},
	square: {
		width: 1080,
		height: 1080,
		frameW: 1000,
		frameH: 920,
		designW: 1240,
	},
	vertical: {
		width: 1080,
		height: 1920,
		frameW: 960,
		frameH: 1660,
		designW: 960,
	},
} as const;

type Format = keyof typeof FORMATS;

const CHROME_H = 52;

function getFormat(): Format {
	if (typeof window === "undefined") return "wide";
	const f = new URLSearchParams(window.location.search).get("format");
	return f === "square" || f === "vertical" ? f : "wide";
}

/** Tour stops, resolved against the live page by heading text. */
const TOUR: { match: string; hold: number }[] = [
	{ match: "Reliable TypeScript", hold: 1800 },
	{ match: "Effect.retry", hold: 1700 },
	{ match: "Real-world production systems", hold: 1700 },
	{ match: "Built-in solutions", hold: 1700 },
	{ match: "Track successes, errors, dependencies", hold: 1700 },
	{ match: "Write Effect code with AI", hold: 1700 },
	{ match: "What developers are saying", hold: 1700 },
	{ match: "Stop installing", hold: 1400 },
];

const END_CARD_MS = 3600;

function sleep(ms: number, state: { cancelled: boolean }) {
	return new Promise<void>((resolve) => {
		const t = setTimeout(resolve, ms);
		if (state.cancelled) {
			clearTimeout(t);
			resolve();
		}
	});
}

function easeInOutCubic(t: number) {
	return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function tweenScroll(
	win: Window,
	to: number,
	duration: number,
	state: { cancelled: boolean },
) {
	return new Promise<void>((resolve) => {
		const from = win.scrollY;
		const start = performance.now();
		const frame = (now: number) => {
			if (state.cancelled) return resolve();
			const t = Math.min(1, (now - start) / duration);
			win.scrollTo(0, from + (to - from) * easeInOutCubic(t));
			if (t < 1) requestAnimationFrame(frame);
			else resolve();
		};
		requestAnimationFrame(frame);
	});
}

/** Find the scroll target for a tour stop by matching heading text. */
function resolveTarget(doc: Document, match: string): number | null {
	const sections = Array.from(doc.querySelectorAll("main section"));
	for (const section of sections) {
		const heading = section.querySelector("h1, h2, h3");
		if (heading?.textContent?.includes(match)) {
			const top =
				section.getBoundingClientRect().top + (doc.defaultView?.scrollY ?? 0);
			return Math.max(0, top - 56);
		}
	}
	return null;
}

function hideScrollbars(doc: Document) {
	const style = doc.createElement("style");
	style.textContent = `
		html { scrollbar-width: none !important; }
		::-webkit-scrollbar { display: none !important; }
		astro-dev-toolbar { display: none !important; }
	`;
	doc.head.appendChild(style);
}

export function PromoSiteTour() {
	const [format] = useState<Format>(getFormat);
	const [cycle, setCycle] = useState(0);
	const [scale, setScale] = useState(1);
	const [showEndCard, setShowEndCard] = useState(false);
	const [introDone, setIntroDone] = useState(false);
	const [showHint, setShowHint] = useState(true);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const stage = FORMATS[format];

	const iframeScale = stage.frameW / stage.designW;
	const viewportH = stage.frameH - CHROME_H;

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

	// Space / R restarts the tour.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.code === "Space" || e.key === "r" || e.key === "R") {
				e.preventDefault();
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

	// The tour timeline.
	useEffect(() => {
		const state = { cancelled: false };
		const iframe = iframeRef.current;
		if (!iframe) return;

		const run = async () => {
			// Wait for the landing page to be ready.
			while (!state.cancelled) {
				const doc = iframe.contentDocument;
				if (doc?.readyState === "complete" && doc.querySelector("main section"))
					break;
				await sleep(200, state);
			}
			if (state.cancelled) return;
			const win = iframe.contentWindow;
			const doc = iframe.contentDocument;
			if (!win || !doc) return;
			hideScrollbars(doc);

			// Type the URL, then reveal the page.
			setIntroDone(false);
			setShowEndCard(false);
			win.scrollTo(0, 0);
			await sleep(1400, state);
			setIntroDone(true);
			await sleep(400, state);

			while (!state.cancelled) {
				for (const stop of TOUR) {
					if (state.cancelled) return;
					const target = resolveTarget(doc, stop.match);
					if (target !== null) {
						const dist = Math.abs(target - win.scrollY);
						if (dist > 4) {
							const duration = Math.min(1700, Math.max(700, dist * 0.55));
							await tweenScroll(win, target, duration, state);
						}
					}
					await sleep(stop.hold, state);
				}
				if (state.cancelled) return;
				setShowEndCard(true);
				await sleep(END_CARD_MS, state);
				// Reset behind the end card, then reveal the hero again.
				win.scrollTo(0, 0);
				await sleep(400, state);
				setShowEndCard(false);
				await sleep(800, state);
			}
		};
		run();
		return () => {
			state.cancelled = true;
		};
	}, [cycle]);

	return (
		<div className="fixed inset-0 flex cursor-none items-center justify-center overflow-hidden bg-zinc-950">
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
				<style>{`
					@keyframes glow-pulse {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.6; }
					}
					@keyframes caret-blink {
						0%, 100% { opacity: 1; }
						50% { opacity: 0; }
					}
				`}</style>

				{/* Browser frame */}
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.div
						key={`frame-${cycle}`}
						className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/60"
						style={{ width: stage.frameW, height: stage.frameH }}
						initial={{ opacity: 0, y: 24, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
					>
						{/* Chrome bar */}
						<div
							className="flex items-center gap-4 border-b border-zinc-800 bg-zinc-900 px-5"
							style={{ height: CHROME_H }}
						>
							<div className="flex items-center gap-2">
								<span className="h-3 w-3 rounded-full bg-zinc-700" />
								<span className="h-3 w-3 rounded-full bg-zinc-700" />
								<span className="h-3 w-3 rounded-full bg-zinc-700" />
							</div>
							<div className="flex h-8 flex-1 items-center justify-center rounded-lg bg-zinc-800/80 font-mono text-sm text-zinc-300">
								<TypedUrl key={`url-${cycle}`} />
							</div>
							<div className="w-14" />
						</div>
						{/* Real site in an iframe, scaled to fit the frame */}
						<div
							className="relative overflow-hidden bg-zinc-950"
							style={{ height: viewportH }}
						>
							<iframe
								ref={iframeRef}
								src="/"
								title="effect.website"
								className="pointer-events-none origin-top-left border-0"
								style={{
									width: stage.designW,
									height: viewportH / iframeScale,
									transform: `scale(${iframeScale})`,
								}}
							/>
							{/* Cover while the URL types */}
							<AnimatePresence>
								{!introDone && (
									<motion.div
										className="absolute inset-0 bg-zinc-950"
										initial={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.6 }}
									/>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>

				{/* End card */}
				<AnimatePresence>
					{showEndCard && (
						<motion.div
							className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-10 bg-zinc-950/90 backdrop-blur-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.7 }}
						>
							<motion.img
								src={getAssetPath(
									"/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg",
								)}
								alt="Effect"
								className="h-20 w-auto"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
							/>
							<motion.div
								className="flex items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-900/80 px-8 py-4 font-mono text-2xl text-zinc-200"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
							>
								<span className="text-zinc-500">$</span> bun add effect
							</motion.div>
							<motion.p
								className="font-mono text-3xl font-medium tracking-wide text-[#22c55e]"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.5 }}
							>
								effect.website
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Recording hint — fades out, never returns */}
				<AnimatePresence>
					{showHint && (
						<motion.p
							className="absolute left-1/2 z-20 -translate-x-1/2 font-mono text-xs text-zinc-600"
							style={{ bottom: 16 }}
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
		</div>
	);
}

function TypedUrl() {
	const text = "effect.website";
	const [count, setCount] = useState(0);
	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		const timeout = setTimeout(() => {
			let i = 0;
			interval = setInterval(() => {
				i++;
				setCount(i);
				if (i >= text.length) clearInterval(interval);
			}, 70);
		}, 400);
		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, []);
	return (
		<span>
			<span className="mr-1.5 text-zinc-500">https://</span>
			{text.slice(0, count)}
			{count < text.length && (
				<span className="animate-[caret-blink_1s_step-end_infinite] text-zinc-400">
					▏
				</span>
			)}
		</span>
	);
}
