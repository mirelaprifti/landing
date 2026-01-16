import { useState } from "react";
import { getAssetPath } from "../../utils/assetPath";

const INSTALL_COMMANDS: Record<string, string> = {
	npm: "npm install effect",
	pnpm: "pnpm add effect",
	yarn: "yarn add effect",
	bun: "bun add effect",
	deno: "deno add npm:effect",
};

const PM_OPTIONS = ["npm", "pnpm", "yarn", "bun", "deno"] as const;

const PM_ICONS: Record<string, string> = {
	npm: getAssetPath("/assets/icons-svgs/npm.svg"),
	pnpm: getAssetPath("/assets/icons-svgs/pnpm-logo.svg"),
	yarn: getAssetPath("/assets/icons-svgs/yarn-logo.svg"),
	bun: getAssetPath("/assets/icons-svgs/bun-logo-box.svg"),
	deno: getAssetPath("/assets/icons-svgs/deno-logo-box.svg"),
};

export function InstallCommand() {
	const [activePM, setActivePM] = useState<string>("npm");
	const [copyFeedback, setCopyFeedback] = useState(false);

	const currentCommand = INSTALL_COMMANDS[activePM];

	const copyCommand = () => {
		navigator.clipboard.writeText(currentCommand).then(() => {
			setCopyFeedback(true);
			setTimeout(() => setCopyFeedback(false), 1500);
		});
	};

	return (
		<div className="rounded-md ring-1 ring-inset ring-zinc-700 bg-zinc-900/50 overflow-hidden p-1">
			{/* Tabs */}
			<div className="flex border-b border-zinc-800">
				{PM_OPTIONS.map((pm) => (
					<button
						key={pm}
						type="button"
						onClick={() => setActivePM(pm)}
						className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors relative cursor-pointer ${
							activePM === pm
								? "text-white"
								: "text-zinc-500 hover:text-zinc-300"
						}`}
					>
						<img src={PM_ICONS[pm]} alt={pm} className="w-4 h-4" />
						{pm}
						{activePM === pm && (
							<div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
						)}
					</button>
				))}
			</div>

			{/* Command */}
			<button
				type="button"
				onClick={copyCommand}
				className="w-full flex items-center justify-between gap-4 px-5 py-4 mt-1 font-mono text-base text-zinc-300 transition-colors hover:bg-zinc-800/30 cursor-pointer"
				aria-label="Copy install command"
			>
				<span>{currentCommand}</span>
				{copyFeedback ? (
					<i className="ri-check-line text-base text-green-400" />
				) : (
					<i className="ri-file-copy-line text-base text-zinc-500" />
				)}
			</button>
		</div>
	);
}
