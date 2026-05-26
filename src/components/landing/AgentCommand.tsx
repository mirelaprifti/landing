import { useState } from "react";

const AGENT_COMMANDS: Record<string, string> = {
	clone: "git clone https://github.com/Effect-TS/effect",
};

const AGENT_LABELS: Record<string, string> = {
	clone: "Clone Effect repository",
};

const AGENT_OPTIONS = ["clone"] as const;

export function AgentCommand() {
	const [active, setActive] = useState<string>("clone");
	const [copied, setCopied] = useState(false);

	const command = AGENT_COMMANDS[active];

	const copy = () => {
		navigator.clipboard.writeText(command).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<div className="overflow-hidden rounded-md bg-zinc-900/50 p-1 ring-1 ring-zinc-700 ring-inset">
			{/* Tabs */}
			<div className="flex border-b border-zinc-800">
				{AGENT_OPTIONS.map((opt) => (
					<button
						key={opt}
						type="button"
						onClick={() => setActive(opt)}
						className={`group relative flex items-center gap-1.5 px-3 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
							active === opt
								? "text-white"
								: "text-zinc-400 hover:text-zinc-300"
						}`}
					>
						{AGENT_LABELS[opt]}
						{active === opt && (
							<div className="absolute right-0 bottom-0 left-0 h-px bg-white" />
						)}
					</button>
				))}
			</div>

			{/* Command */}
			<button
				type="button"
				onClick={copy}
				className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-2 font-mono text-sm text-zinc-300 transition-colors hover:bg-zinc-800/30"
				aria-label="Copy command for AI agents"
			>
				<span className="truncate">{command}</span>
				{copied ? (
					<i className="ri-check-line shrink-0 text-base text-zinc-200" />
				) : (
					<i className="ri-file-copy-line shrink-0 text-base text-zinc-400" />
				)}
			</button>
		</div>
	);
}
