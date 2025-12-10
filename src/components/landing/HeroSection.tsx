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
	npm: getAssetPath("/assets/logos/npm-brands-solid-full.svg"),
	pnpm: getAssetPath("/assets/logos/pnpm-logo.svg"),
	yarn: getAssetPath("/assets/logos/yarn-logo.svg"),
	bun: getAssetPath("/assets/logos/bun-logo-box.svg"),
	deno: getAssetPath("/assets/logos/deno-logo-box.svg"),
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
		<section className="relative w-full overflow-hidden">
			{/* Layer 1: Subtle dot grid pattern */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			{/* Layer 2: Primary indigo gradient glow - top right */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "radial-gradient(ellipse 80% 60% at 75% -20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
				}}
			/>

			{/* Layer 3: Ambient white light from top center */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
				}}
			/>

			{/* Layer 4: Large geometric arc accent - visible on md+ */}
			<div className="pointer-events-none absolute -right-48 top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/3 md:block" />
			<div className="pointer-events-none absolute -left-64 top-1/3 hidden h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-white/2 md:block" />

			{/* Layer 5: Noise texture overlay */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					opacity: 0.015,
				}}
			/>

			{/* Bottom border */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-800" />

			<div className="relative mx-auto w-full max-w-3xl px-4 pt-16 pb-12 md:pt-24 md:pb-14">
				{/* Headline */}
				<h1 className="text-center text-4xl font-semibold tracking-tight text-white md:text-5xl">
					Effect is TypeScript for building reliable systems
				</h1>

				{/* Subheadline */}
				<p className="mt-4 text-center max-w-[36rem] mx-auto text-lg text-zinc-400">
					Resilient, observable, and safely concurrent by design.
				</p>

				{/* CTA buttons */}
				<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
					<a
						href="https://effect.website/docs/getting-started/introduction"
						className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
					>
						Get Started
						<i className="ri-arrow-right-line text-sm" />
					</a>
					<div className="inline-flex items-center rounded-lg border border-zinc-700 bg-zinc-900/50">
						<div className="relative" ref={dropdownRef}>
							<button
								type="button"
								onClick={() => setDropdownOpen(!dropdownOpen)}
								className="inline-flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-l-lg"
								aria-label="Select package manager"
							>
								<img src={PM_LOGOS[activePM]} alt={activePM} className="h-5 w-5" />
								<i className={`ri-arrow-down-s-line text-sm text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
							</button>
							{dropdownOpen && (
								<div className="absolute left-0 top-full mt-1 z-20 min-w-[120px] rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl">
									{PM_OPTIONS.map((pm) => (
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
							className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-mono text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-r-lg"
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
				<div className="mt-12 flex items-center justify-center">
					<div className="grid grid-cols-3 divide-x divide-zinc-800">
						<a
							href="https://github.com/Effect-TS/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 px-6 transition-colors"
						>
							<i className="ri-github-fill text-xl text-zinc-600 group-hover:text-zinc-400" />
							<div className="flex flex-col">
								<span className="text-sm font-medium text-white leading-none">12k+</span>
								<span className="text-[11px] text-zinc-500 mt-0.5">stars</span>
							</div>
						</a>
						<a
							href="https://www.npmjs.com/package/effect"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 px-6 transition-colors"
						>
							<i className="ri-download-2-line text-xl text-zinc-600 group-hover:text-zinc-400" />
							<div className="flex flex-col">
								<span className="text-sm font-medium text-white leading-none">6M+</span>
								<span className="text-[11px] text-zinc-500 mt-0.5">downloads</span>
							</div>
						</a>
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 px-6 transition-colors"
						>
							<i className="ri-discord-fill text-xl text-zinc-600 group-hover:text-zinc-400" />
							<div className="flex flex-col">
								<span className="text-sm font-medium text-white leading-none">6k+</span>
								<span className="text-[11px] text-zinc-500 mt-0.5">community</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
