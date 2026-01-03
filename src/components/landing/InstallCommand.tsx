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

interface InstallCommandProps {
	dropdownDirection?: "up" | "down";
}

export function InstallCommand({ dropdownDirection = "down" }: InstallCommandProps) {
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
		<div className="inline-flex h-[3rem] items-center rounded-md ring-1 ring-inset ring-zinc-700 bg-zinc-900/50">
			<div className="relative overflow-visible h-full" ref={dropdownRef}>
				<button
					type="button"
					onClick={() => setDropdownOpen(!dropdownOpen)}
					className="h-full inline-flex items-center justify-center gap-2 pl-5 pr-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-l-md"
					aria-label="Select package manager"
				>
					<img src={PM_LOGOS[activePM]} alt={activePM} className={activePM === "npm" ? "h-7 w-7" : "h-5 w-5"} />
					<i className={`ri-arrow-down-s-line text-lg text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
				</button>
				{dropdownOpen && (
					<div
						className={`absolute left-0 z-20 min-w-[120px] rounded-md border border-zinc-700 bg-zinc-900 py-1 shadow-xl ${
							dropdownDirection === "up" ? "bottom-full mb-1" : "top-full mt-1"
						}`}
					>
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
				className="inline-flex items-center gap-3 px-5 py-3 text-base font-mono text-zinc-300 transition-colors hover:bg-zinc-800/50 rounded-r-md"
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
	);
}
