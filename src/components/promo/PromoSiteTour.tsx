import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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

/** Playback rate. ?speed=0.5 runs everything at half speed — used when
 * recording video (capture in slow motion, retime 2x in the encode) so every
 * output frame gets a freshly painted scroll position. */
const SPEED = (() => {
	if (typeof window === "undefined") return 1;
	const s = Number.parseFloat(
		new URLSearchParams(window.location.search).get("speed") ?? "1",
	);
	return Number.isFinite(s) && s >= 0.1 && s <= 2 ? s : 1;
})();

/** Tour stops, resolved against the live page by heading text. */
const TOUR: { match: string; hold: number }[] = [
	{ match: "Reliable TypeScript", hold: 1100 },
	{ match: "Effect.retry", hold: 800 },
	{ match: "Real-world production systems", hold: 800 },
	{ match: "Built-in solutions", hold: 800 },
	{ match: "Track successes, errors, dependencies", hold: 800 },
	{ match: "Write Effect code with AI", hold: 800 },
	{ match: "What developers are saying", hold: 800 },
	{ match: "Stop installing", hold: 900 },
];

function sleep(ms: number, state: { cancelled: boolean }) {
	return new Promise<void>((resolve) => {
		const t = setTimeout(resolve, ms / SPEED);
		if (state.cancelled) {
			clearTimeout(t);
			resolve();
		}
	});
}

/** Pan the full-height iframe with a compositor-driven WAAPI transform.
 * The landing page's main thread stalls 100-200ms at a time under real
 * scrolling (scroll-triggered work), which makes any scroll tween hitch;
 * a transform animation runs entirely on the compositor and stays smooth. */
function panTo(
	iframe: HTMLIFrameElement,
	iframeScale: number,
	fromY: number,
	toY: number,
	duration: number,
	state: { cancelled: boolean },
): Promise<void> {
	if (state.cancelled) return Promise.resolve();
	const anim = iframe.animate(
		[
			{ transform: `scale(${iframeScale}) translateY(${-fromY}px)` },
			{ transform: `scale(${iframeScale}) translateY(${-toY}px)` },
		],
		{
			duration: duration / SPEED,
			easing: "cubic-bezier(0.83, 0, 0.17, 1)",
			fill: "forwards",
		},
	);
	return anim.finished.then(
		() => undefined,
		() => undefined,
	);
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
	const [fadeOut, setFadeOut] = useState(false);
	const [introDone, setIntroDone] = useState(false);
	const [loopKey, setLoopKey] = useState(0);
	const [showHint, setShowHint] = useState(true);
	const [pageHeight, setPageHeight] = useState<number | null>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const posY = useRef(0);
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
			const doc = iframe.contentDocument;
			if (!doc) return;
			hideScrollbars(doc);

			// Render the whole page in the (clipped) iframe so panning is a
			// pure transform — no real scrolling happens at all.
			const contentH = doc.documentElement.scrollHeight;
			setPageHeight(contentH);
			const visibleH = viewportH / iframeScale;
			const maxY = Math.max(0, contentH - visibleH);
			await sleep(300, state);

			while (!state.cancelled) {
				// Reset behind the cover and type the URL from scratch. Cancel the
				// leftover fill-forwards pans, then pin the transform to the top
				// with a filling zero-length animation so nothing can leak through.
				setIntroDone(false);
				setLoopKey((k) => k + 1);
				for (const a of [...iframe.getAnimations()]) a.cancel();
				iframe.animate(
					[{ transform: `scale(${iframeScale}) translateY(0px)` }],
					{ duration: 1, fill: "forwards" },
				);
				posY.current = 0;
				setFadeOut(false);
				await sleep(1600, state);
				setIntroDone(true);
				await sleep(400, state);

				for (const stop of TOUR) {
					if (state.cancelled) return;
					const target = resolveTarget(doc, stop.match);
					if (target !== null) {
						const y = Math.min(target, maxY);
						const dist = Math.abs(y - posY.current);
						if (dist > 4) {
							const duration = Math.min(2000, Math.max(950, dist * 0.75));
							await panTo(iframe, iframeScale, posY.current, y, duration, state);
							posY.current = y;
						}
					}
					await sleep(stop.hold, state);
				}
				if (state.cancelled) return;
				// Fade to black, then start over from the URL typing.
				setFadeOut(true);
				await sleep(1100, state);
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
								<TypedUrl key={`url-${cycle}-${loopKey}`} />
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
									height: pageHeight ?? viewportH / iframeScale,
									transform: `scale(${iframeScale})`,
									willChange: "transform",
								}}
							/>
							{/* Cover while the URL types */}
							<AnimatePresence>
								{!introDone && (
									<motion.div
										className="absolute inset-0 bg-zinc-950"
										initial={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.6 / SPEED }}
									/>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>

				{/* Fade to black between loops */}
				<AnimatePresence>
					{fadeOut && (
						<motion.div
							className="absolute inset-0 z-10 bg-zinc-950"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8 / SPEED, ease: "easeInOut" }}
						/>
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
			}, 70 / SPEED);
		}, 400 / SPEED);
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
