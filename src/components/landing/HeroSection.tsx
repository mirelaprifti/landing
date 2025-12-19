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

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-16 pb-12 md:pt-28 md:pb-16">
				{/* Headline */}
				<h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-[4.25rem] md:leading-[1.1]">
					Effect is TypeScript for building reliable systems
				</h1>

				{/* Subheadline */}
				<p className="mt-6 text-xl text-zinc-400">
					Resilient, observable, and safely concurrent by design.
				</p>

				{/* CTA buttons */}
				<div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
					<a
						href="https://effect.website/docs/getting-started/introduction"
						className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
					>
						See Effect in action
						<i className="ri-arrow-down-line text-sm" />
					</a>
					<div className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900/50">
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
						<img src={getAssetPath("/assets/logos/npm-brands-solid-full.svg")} alt="npm" className="h-6 w-6 opacity-60 group-hover:opacity-80 transition-opacity" />
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
		</section>
	);
}
