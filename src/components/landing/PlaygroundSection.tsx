import { useState, useRef } from "react";
import { getAssetPath } from "../../utils/assetPath";

export function PlaygroundSection() {
	const [hasStarted, setHasStarted] = useState(false);
	const [showPlayButton, setShowPlayButton] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handlePlayClick = () => {
		if (videoRef.current) {
			videoRef.current.play();
			setHasStarted(true);
			setShowPlayButton(false);
		}
	};

	const handleVideoClick = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
			} else {
				videoRef.current.pause();
			}
		}
	};

	const handleVideoPlay = () => {
		setHasStarted(true);
		setShowPlayButton(false);
	};

	const handleVideoEnded = () => {
		setShowPlayButton(true);
		if (videoRef.current) {
			videoRef.current.load(); // Reload video to show poster again
		}
	};

	return (
		<div className="relative w-full px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-24">
			{/* Dashed top border */}
			<div
				className="absolute left-0 right-0 top-0 h-[1px]"
				style={{
					background: "#3f3f46",
					WebkitMask:
						"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
					mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
				}}
			/>
			{/* Two Column Layout Container */}
			<div className="mx-auto w-full max-w-[66.5rem]">
				<div className="flex flex-col gap-8 lg:flex-row md:gap-20 lg:gap-8">
					{/* Left Column: Video */}
					<div className="flex w-full items-center md:max-w-[40rem]">
						<div className="relative w-full overflow-hidden rounded-lg border border-zinc-700" style={{ paddingBottom: "56.25%" }}>
							<video
								ref={videoRef}
								className="absolute inset-0 h-full w-full cursor-pointer"
								src={getAssetPath("/videos/effect-playground.mp4")}
								poster={getAssetPath("/assets/images/effect-playground-banner.png")}
								controls={hasStarted}
								preload="metadata"
								aria-label="Effect Playground demonstration video showing TypeScript development environment with real-time trace viewer"
								onClick={handleVideoClick}
								onPlay={handleVideoPlay}
								onEnded={handleVideoEnded}
							>
								<track kind="captions" />
								Your browser does not support the video tag.
							</video>

							{/* Custom centered play button overlay */}
							<button
								type="button"
								onClick={handlePlayClick}
								className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-black/80 ${
									showPlayButton ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
								}`}
								aria-label="Play video"
							>
								<i className="ri-play-fill text-5xl text-white" />
							</button>
						</div>
					</div>

					{/* Right Column: Text Content */}
					<div className="flex w-full flex-col gap-8 lg:w-1/3">
						<h3 className="text-2xl font-bold leading-[1.25] text-white">
							Run Effect code in the Effect Playground
						</h3>

						<div className="flex flex-col gap-4">
							<div className="flex flex-row gap-2">
								<div className="h-5 w-5">
									<i className="ri-braces-line text-base text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									TypeScript LSP & Node.js support
								</p>
							</div>

							<div className="flex flex-row gap-2">
								<div className="h-5 w-5">
									<i className="ri-bar-chart-horizontal-line text-base text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Real-time trace viewer built-in
								</p>
							</div>

							<div className="flex flex-row gap-2">
								<div className="h-5 w-5">
									<i className="ri-share-line text-base text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Share & collaborate on Effect programs
								</p>
							</div>

							<div className="flex flex-row gap-2">
								<div className="h-5 w-5">
									<i className="ri-book-open-line text-bas text-white" />
								</div>
								<p className="text-base leading-[1.35] text-zinc-300">
									Built-in examples & templates
								</p>
							</div>
						</div>

						<a
							href="https://effect.website/play/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex w-fit items-center justify-center gap-3 rounded-lg border border-zinc-600 bg-black px-5 py-5 text-lg font-medium text-white transition-colors hover:border-zinc-400"
						>
							<span className="flex h-6 w-6 items-center justify-center">
								<i className="ri-terminal-line text-lg leading-none text-white" />
							</span>
							<span>Effect Playground</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
