import { useRef, useState } from "react";
import { Button } from "@/components/ui";
import { getAssetPath } from "../../utils/assetPath";
import { Icon } from "@/components/ui/Icon";

function VideoWithPosterOverlay() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showOverlay, setShowOverlay] = useState(true);

	const startPlayback = () => {
		setShowOverlay(false);
		videoRef.current?.play();
	};

	const handlePlay = () => setShowOverlay(false);
	const handlePause = () => setShowOverlay(true);
	const handleEnded = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
		}
		setShowOverlay(true);
	};

	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black">
			<video
				ref={videoRef}
				src={getAssetPath("/videos/ben-davis-video.mp4")}
				poster={getAssetPath("/assets/images/ben-davis-thumbnail.png")}
				controls={!showOverlay}
				playsInline
				preload="metadata"
				onPlay={handlePlay}
				onPause={handlePause}
				onEnded={handleEnded}
				className="h-full w-full object-contain"
			>
				<track kind="captions" />
			</video>

			{/* Thumbnail + play-button overlay — fades in/out on play/pause */}
			<img
				src={getAssetPath("/assets/images/ben-davis-thumbnail.png")}
				alt=""
				aria-hidden="true"
				className={`pointer-events-none absolute inset-0 h-full w-full bg-black object-contain transition-opacity duration-300 ease-out ${
					showOverlay ? "opacity-100" : "opacity-0"
				}`}
			/>
			<button
				type="button"
				onClick={startPlayback}
				aria-label="Play video"
				tabIndex={showOverlay ? 0 : -1}
				aria-hidden={!showOverlay}
				className={`group absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ease-out hover:bg-black/40 ${
					showOverlay ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				<span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-zinc-900 backdrop-blur-sm transition-transform group-hover:scale-105">
					<Icon name="play" className="translate-x-0.5 text-3xl" aria-hidden="true" />
				</span>
			</button>
		</div>
	);
}

export function AISection() {
	return (
		<section className="relative w-full overflow-hidden py-24 md:pt-40 md:pb-24">
			{/* Subtle gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-zinc-100/50 dark:from-zinc-950/0 dark:via-zinc-950/0 dark:to-zinc-900/50" />

			<div className="relative mx-auto w-full max-w-[73.75rem]">
				{/* Header row - Two columns: heading left, video right */}
				<div className="mb-12 grid grid-cols-1 gap-8 px-4 lg:grid-cols-2 lg:items-center">
					{/* Left column - Heading section */}
					<div>
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
							// LLMs ❤️ Effect
						</p>
						<h2 className="leading-tighter max-w-2xl text-2xl font-semibold text-zinc-900 dark:text-white md:text-3xl">
							Write Effect code with AI
						</h2>
						<p className="mt-4 max-w-lg text-lg leading-snug text-zinc-600 dark:text-zinc-400">
							Effect's declarative patterns and strong type system make it
							easier for LLMs to generate correct, production-ready code.
						</p>
						<Button
							href="https://www.effect.solutions/"
							variant="secondary"
							className="mt-6 inline-flex items-center gap-2"
						>
							Quick start LLM guide
							<Icon name="arrow-up-right" className="text-base" />
						</Button>
					</div>

					{/* Right column - Video */}
					<VideoWithPosterOverlay />
				</div>

				{/* Features - 1x4 grid */}
				<div className="px-4">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
						<div className="flex flex-col gap-2">
							<span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
								01
							</span>
							<p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
								<span className="font-medium text-zinc-900 dark:text-white">
									Predictable structure:
								</span>{" "}
								every operation follows a declarative pattern, no guesswork for
								LLMs.
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
								02
							</span>
							<p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
								<span className="font-medium text-zinc-900 dark:text-white">
									Typed feedback loop:
								</span>{" "}
								detailed error traces show what failed, enabling precise
								self-repair.
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
								03
							</span>
							<p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
								<span className="font-medium text-zinc-900 dark:text-white">
									Built-in reliability:
								</span>{" "}
								error handling, supervision, and recovery, production-ready by
								default.
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
								04
							</span>
							<p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
								<span className="font-medium text-zinc-900 dark:text-white">
									Rich toolbox:
								</span>{" "}
								from schema validation to workflows, build in a language LLMs
								understand.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
