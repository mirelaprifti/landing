import { useState, useRef, useEffect } from "react";
import { getAssetPath } from "../../utils/assetPath";

const INSTALL_COMMANDS: Record<string, string> = {
	npm: "npm install effect",
	pnpm: "pnpm add effect",
	yarn: "yarn add effect",
	bun: "bun add effect",
	deno: "deno add npm:effect",
};

const PM_LOGOS: Record<string, string> = {
	npm: getAssetPath("/assets/npm-brands-solid-full.svg"),
	pnpm: getAssetPath("/assets/pnpm-logo.svg"),
	yarn: getAssetPath("/assets/yarn-logo.svg"),
	bun: getAssetPath("/assets/bun-logo-box.svg"),
	deno: getAssetPath("/assets/deno-logo-box.svg"),
};

const PM_OPTIONS = ["npm", "pnpm", "yarn", "bun", "deno"] as const;

export function HeroSection() {
	const [activePM, setActivePM] = useState<string>("npm");
	const [copyFeedback, setCopyFeedback] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const currentCommand = INSTALL_COMMANDS[activePM];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const copyCommand = () => {
		navigator.clipboard.writeText(currentCommand).then(() => {
			setCopyFeedback(true);
			setTimeout(() => setCopyFeedback(false), 1500);
		});
	};

	return (
		<section className="relative w-full">
			{/* Stripe-like grid background - full width, centered */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.55) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.55) 1px, transparent 1px)
					`,
					backgroundSize: "196.6px 104px",
					backgroundPosition: "calc(50% + 97px) 0",
				}}
			/>

			{/* Fade out grid at top and bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
				}}
			/>

			{/* Subtle glow - Stripe-style ambient light with pulse animation */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-[600px] animate-[glow-pulse_4s_ease-in-out_infinite]"
				style={{
					background: `
						radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
						radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
					`,
				}}
			/>
			{/* Noise texture overlay for organic glow effect */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-[0.15] mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					backgroundRepeat: "repeat",
				}}
			/>
			<style>{`
				@keyframes glow-pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.6; }
				}
			`}</style>
			

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-16 pb-12 md:pt-[96px] md:pb-16">
				{/* Content */}
				<div className="max-w-4xl">
					{/* Import statement */}
					<p className="mb-4 font-mono text-sm md:text-base">
						<span className="text-violet-400">import</span>
						<span className="text-zinc-300">{" { "}</span>
						<span className="text-white">Effect</span>
						<span className="text-zinc-300">{" } "}</span>
						<span className="text-violet-400">from</span>
						<span className="text-emerald-400">{" \"effect\""}</span>
					</p>
					{/* Headline */}
					<h1 className="text-4xl font-semibold text-white md:text-[4.5rem] leading-tight">
						Effect is TypeScript for building reliable systems
					</h1>

					{/* Subheadline */}
					<p className="mt-6 text-xl text-zinc-400">
						Resilient, observable, and safely concurrent by design.
					</p>

					{/* CTA buttons */}
					<div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
						<a
							href="#features"
							className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3.5 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
						>
							Effect Solutions
							<i className="ri-arrow-right-up-line text-base" />
						</a>
						<div className="inline-flex items-center rounded-md ring-1 ring-inset ring-zinc-700 bg-zinc-900/50">
							<div className="relative" ref={dropdownRef}>
								<button
									type="button"
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className="inline-flex items-center gap-2 pl-5 pr-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-l-lg"
									aria-label="Select package manager"
								>
									<img src={PM_LOGOS[activePM]} alt={activePM} className={activePM === "npm" ? "h-6 w-6" : "h-5 w-5"} />
									<i className={`ri-arrow-down-s-line text-lg text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
								</button>
								{dropdownOpen && (
									<div className="absolute left-0 top-full mt-1 z-20 min-w-[120px] rounded-md border border-zinc-700 bg-zinc-900 py-1 shadow-xl">
										{PM_OPTIONS.filter((pm) => pm !== activePM).map((pm) => (
											<button
												key={pm}
												type="button"
												onClick={() => {
													setActivePM(pm);
													setDropdownOpen(false);
												}}
												className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-zinc-800 ${
													activePM === pm ? "text-white" : "text-zinc-400"
												}`}
											>
												<img src={PM_LOGOS[pm]} alt={pm} className="h-5 w-5" />
												<span>{pm}</span>
											</button>
										))}
									</div>
								)}
							</div>
							<div className="h-6 w-px bg-zinc-700" />
							<button
								type="button"
								onClick={copyCommand}
								className="inline-flex items-center gap-3 px-5 py-3 text-base font-mono text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-r-lg"
								aria-label="Copy install command"
							>
								<span>{currentCommand}</span>
								{copyFeedback ? (
									<i className="ri-check-line text-sm text-green-400" />
								) : (
									<i className="ri-file-copy-line text-sm text-zinc-500" />
								)}
							</button>
						</div>
					</div>

					{/* Stats */}
					<div className="mt-8 flex items-center gap-6">
						<a
							href="https://github.com/Effect-TS/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2 transition-colors"
						>
							<i className="ri-github-fill text-xl text-zinc-400 group-hover:text-zinc-200" />
							<span className="text-sm font-medium text-white">12k+</span>
							<span className="text-sm text-zinc-400 -ml-1">stars</span>
						</a>
						<div className="h-4 w-px bg-zinc-800" />
						<a
							href="https://www.npmjs.com/package/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2 transition-colors"
						>
							<img src={getAssetPath("/assets/npm-brands-solid-full.svg")} alt="npm" className="h-6 w-6 opacity-60 group-hover:opacity-80 transition-opacity" />
							<span className="text-sm font-medium text-white">6M+</span>
							<span className="text-sm text-zinc-400 -ml-1">downloads</span>
						</a>
						<div className="h-4 w-px bg-zinc-800" />
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2 transition-colors"
						>
							<i className="ri-discord-fill text-xl text-zinc-400 group-hover:text-zinc-200" />
							<span className="text-sm font-medium text-white">6k+</span>
							<span className="text-sm text-zinc-400 -ml-1">community</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
