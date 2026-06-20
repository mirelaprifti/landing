import { useState } from "react";
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
- Effect v4 is in beta — if I'm using v3, follow the v3 docs; if I'm starting fresh, use v4 from https://effect.website/blog/effect-v4-beta.
- Effect uses \`Effect.gen\` with generators, not async/await — don't try to mix them.`;

const AGENT_PREVIEW = "Help me build an Effect app in TypeScript…";

type Mode = "install" | "prompt";

export function HeroCommandPanel() {
	const [mode, setMode] = useState<Mode>("install");
	const [activePM, setActivePM] = useState<string>("bun");
	const [copied, setCopied] = useState(false);

	const copyValue =
		mode === "install" ? INSTALL_COMMANDS[activePM] : AGENT_PROMPT;

	const copy = () => {
		navigator.clipboard.writeText(copyValue).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<div className="overflow-hidden rounded-md bg-zinc-900/50 p-1 ring-1 ring-zinc-700 ring-inset">
			{/* Mode tabs: Install | Prompt for AI agents */}
			<div role="tablist" className="flex border-b border-zinc-800">
				<button
					type="button"
					role="tab"
					aria-selected={mode === "install"}
					onClick={() => setMode("install")}
					className={`group relative flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
						mode === "install"
							? "text-white"
							: "text-zinc-500 hover:text-zinc-300 dark:text-zinc-400"
					}`}
				>
					Install
					{mode === "install" && (
						<span className="absolute right-0 bottom-0 left-0 h-px bg-white" />
					)}
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={mode === "prompt"}
					onClick={() => setMode("prompt")}
					className={`group relative flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
						mode === "prompt"
							? "text-white"
							: "text-zinc-500 hover:text-zinc-300 dark:text-zinc-400"
					}`}
				>
					Prompt for AI agents
					{mode === "prompt" && (
						<span className="absolute right-0 bottom-0 left-0 h-px bg-white" />
					)}
				</button>
			</div>

			{/* Copyable line — command takes the full width, PM picker sits to the right of it */}
			<button
				type="button"
				onClick={copy}
				className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left font-mono text-sm text-zinc-300 transition-colors hover:bg-zinc-800/30 hover:text-white"
				aria-label={
					mode === "install" ? "Copy install command" : "Copy prompt for AI agents"
				}
			>
				<span className="flex-1 truncate">
					{mode === "install" ? INSTALL_COMMANDS[activePM] : AGENT_PREVIEW}
				</span>
				{copied ? (
					<i className="ri-check-line shrink-0 text-base text-zinc-200" />
				) : (
					<i className="ri-file-copy-line shrink-0 text-base text-zinc-400" />
				)}
				{mode === "install" && (
					<div
						role="group"
						aria-label="Package manager"
						onClick={(e) => e.stopPropagation()}
						className="flex shrink-0 items-center gap-0.5 rounded-sm border-l border-zinc-800 bg-zinc-900/60 pl-2"
					>
						{PM_OPTIONS.map((pm) => (
							<button
								key={pm}
								type="button"
								onClick={() => setActivePM(pm)}
								aria-label={pm}
								aria-pressed={activePM === pm}
								className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm transition-colors ${
									activePM === pm ? "bg-zinc-800" : "hover:bg-zinc-800/60"
								}`}
							>
								<img
									src={getAssetPath(PM_ICONS[pm])}
									alt=""
									aria-hidden="true"
									className={`${pm === "npm" ? "h-4.5" : "h-4"} w-auto ${activePM === pm ? "opacity-100" : "opacity-60"}`}
								/>
							</button>
						))}
					</div>
				)}
			</button>
		</div>
	);
}
