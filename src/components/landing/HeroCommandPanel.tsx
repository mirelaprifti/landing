import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "@/utils/assetPath";

const INSTALL_COMMANDS: Record<string, string> = {
	npm: "npm install effect",
	pnpm: "pnpm add effect",
	yarn: "yarn add effect",
	bun: "bun add effect",
	deno: "deno add npm:effect",
};

const PM_ICONS: Record<string, string> = {
	bun: "/assets/icons-svgs/bun-logo-box.svg",
	npm: "/assets/icons-svgs/npm-brands-solid-full.svg",
	pnpm: "/assets/icons-svgs/pnpm-logo.svg",
	yarn: "/assets/icons-svgs/yarn-logo.svg",
	deno: "/assets/icons-svgs/deno-logo-box.svg",
};

const PM_OPTIONS = ["bun", "deno", "npm", "yarn", "pnpm"] as const;

// Icons whose SVG source is pure white — need darkening on light backgrounds
const WHITE_PM_ICONS = new Set(["npm", "yarn", "deno"]);

const AGENT_PROMPT = `Help me build an Effect app in TypeScript. Start by reading https://effect.website/docs/getting-started and follow it exactly: scaffold a fresh TypeScript project, install \`effect\`, create a \`main.ts\` with a simple \`Effect.gen\` program that logs "hello, world", and run it with \`bun run main.ts\` (or the npm/pnpm/yarn equivalent) so I see it execute. Confirm it runs before moving on.

Then STOP and ASK ME what I want to build. From there, consult only the docs you need for what I asked for — don't march me through every guide.

Guides — foundations, work through whichever parts I haven't touched:
  https://effect.website/docs/getting-started/why-effect      Why Effect
  https://effect.website/docs/error-management/two-error-types Error tracking
  https://effect.website/docs/requirements-management/services Services & dependency injection
  https://effect.website/docs/concurrency/fibers              Concurrency
  https://effect.website/docs/observability/tracing           Observability

For everything else (Schema, Platform, RPC, AI SDK, Cluster), fetch https://effect.website/llms.txt — it's the index of every doc on the site. Use it to look up the specific page you need instead of guessing URLs.

Important:
- Confirm with me before each install or deploy. Don't batch.
- Use \`bun add effect\` (or the npm/pnpm/yarn equivalent).
- VERSION_NOTE
- Effect uses \`Effect.gen\` with generators, not async/await — don't try to mix them.`;

const VERSION_NOTES = {
	beta: "Effect v4 is in beta — if I'm using v3, follow the v3 docs; if I'm starting fresh, use v4 from https://effect.website/blog/effect-v4-beta.",
	stable:
		"Use Effect v4 — it's the current stable version. If I'm on v3, follow the v3 docs and see the migration guide at https://effect.website/blog/effect-v4.",
};

const AGENT_PREVIEW = "Help me build an Effect app in TypeScript…";

type Mode = "install" | "prompt";

export function HeroCommandPanel({
	v4Stable = false,
}: {
	/** Launch variant: describe v4 as stable instead of beta in the AI prompt. */
	v4Stable?: boolean;
} = {}) {
	const agentPrompt = AGENT_PROMPT.replace(
		"VERSION_NOTE",
		v4Stable ? VERSION_NOTES.stable : VERSION_NOTES.beta,
	);
	const [mode, setMode] = useState<Mode>("install");
	const [activePM, setActivePM] = useState<string>("bun");
	const [copied, setCopied] = useState(false);
	const [pmOpen, setPmOpen] = useState(false);
	const pmRef = useRef<HTMLDivElement>(null);

	// Close popover on outside click or Escape
	useEffect(() => {
		if (!pmOpen) return;
		const handlePointer = (e: MouseEvent) => {
			if (pmRef.current && !pmRef.current.contains(e.target as Node)) {
				setPmOpen(false);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setPmOpen(false);
		};
		document.addEventListener("mousedown", handlePointer);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handlePointer);
			document.removeEventListener("keydown", handleKey);
		};
	}, [pmOpen]);

	const copyValue =
		mode === "install" ? INSTALL_COMMANDS[activePM] : agentPrompt;

	const copy = () => {
		navigator.clipboard.writeText(copyValue).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<div className="rounded-md bg-zinc-100/50 p-1 ring-1 ring-zinc-300 ring-inset dark:bg-zinc-900/50 dark:ring-zinc-700">
			{/* Mode tabs: Install | Prompt for AI agents */}
			<div
				role="tablist"
				className="flex border-b border-zinc-200 dark:border-zinc-800"
			>
				<button
					type="button"
					role="tab"
					aria-selected={mode === "install"}
					onClick={() => setMode("install")}
					className={`group relative flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
						mode === "install"
							? "text-zinc-900 dark:text-white"
							: "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
					}`}
				>
					Install
					{mode === "install" && (
						<span className="absolute right-0 bottom-0 left-0 h-px bg-zinc-900 dark:bg-white" />
					)}
				</button>
			</div>

			{/* Command row — same height for INSTALL and PROMPT modes */}
			<button
				type="button"
				onClick={copy}
				className="flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 py-1 text-left font-mono text-sm text-zinc-700 transition-colors hover:bg-zinc-200/40 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/30 dark:hover:text-white"
				aria-label={
					mode === "install"
						? "Copy install command"
						: "Copy prompt for AI agents"
				}
			>
				{mode === "install" && (
					<div
						ref={pmRef}
						className="relative shrink-0"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Active PM chip */}
						<button
							type="button"
							onClick={() => setPmOpen((open) => !open)}
							aria-haspopup="listbox"
							aria-expanded={pmOpen}
							aria-label={`Package manager: ${activePM}`}
							className="flex items-center gap-1.5 rounded-sm border-r border-zinc-200 py-0.5 pr-3 pl-1 text-xs text-zinc-700 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white"
						>
							<img
								src={getAssetPath(PM_ICONS[activePM])}
								alt=""
								aria-hidden="true"
								className={`${activePM === "npm" ? "h-4.5" : "h-4"} w-auto ${WHITE_PM_ICONS.has(activePM) ? "brightness-0 dark:brightness-100" : ""}`}
							/>
							<span>{activePM}</span>
							<i
								className={`ri-arrow-down-s-line text-base text-zinc-500 transition-transform ${
									pmOpen ? "rotate-180" : ""
								}`}
								aria-hidden="true"
							/>
						</button>

						{/* Popover list — anchored to the chip's left edge */}
						{pmOpen && (
							<ul
								role="listbox"
								className="absolute top-full left-0 z-20 mt-2 w-36 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
							>
								{PM_OPTIONS.map((pm) => (
									<li key={pm} role="option" aria-selected={activePM === pm}>
										<button
											type="button"
											onClick={() => {
												setActivePM(pm);
												setPmOpen(false);
											}}
											className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${
												activePM === pm
													? "text-zinc-900 dark:text-white"
													: "text-zinc-600 dark:text-zinc-400"
											}`}
										>
											<img
												src={getAssetPath(PM_ICONS[pm])}
												alt=""
												aria-hidden="true"
												className={`${pm === "npm" ? "h-4.5" : "h-4"} w-auto shrink-0 ${WHITE_PM_ICONS.has(pm) ? "brightness-0 dark:brightness-100" : ""}`}
											/>
											<span className="flex-1">{pm}</span>
											{activePM === pm && (
												<i
													className="ri-check-line shrink-0 text-zinc-500"
													aria-hidden="true"
												/>
											)}
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				<span className="flex-1 truncate">
					{mode === "install" ? INSTALL_COMMANDS[activePM] : AGENT_PREVIEW}
				</span>

				{copied ? (
					<i className="ri-check-line shrink-0 text-base text-zinc-800 dark:text-zinc-200" />
				) : (
					<i className="ri-file-copy-line shrink-0 text-base text-zinc-600 dark:text-zinc-400" />
				)}
			</button>
		</div>
	);
}
