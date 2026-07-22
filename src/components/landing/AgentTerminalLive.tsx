import { useEffect, useRef, useState } from "react";

type Line =
	| { kind: "prompt"; text: string }
	| { kind: "info"; tag: string; text: string }
	| { kind: "call"; tag: string; name: string; result: string }
	| { kind: "blank" }
	| { kind: "done"; text: string };

const SCRIPT: Line[] = [
	{ kind: "prompt", text: "$ effect agents run" },
	{ kind: "blank" },
	{ kind: "info", tag: "INFO", text: "agent.start  runtime ready" },
	{
		kind: "prompt",
		text: '> "Build a webhook handler that retries on 5xx"',
	},
	{ kind: "blank" },
	{
		kind: "call",
		tag: "CALL",
		name: "search_docs",
		result: '→ "Effect.retry"',
	},
	{
		kind: "call",
		tag: "CALL",
		name: "generate",
		result: "→ 47 lines",
	},
	{
		kind: "call",
		tag: "CALL",
		name: "type_check",
		result: "→ ok (0 errors)",
	},
	{
		kind: "call",
		tag: "CALL",
		name: "commit",
		result: '→ "add webhook handler"',
	},
	{ kind: "blank" },
	{ kind: "done", text: "agent.done  2.4s · 5 spans · 0 errors" },
];

function lineLength(line: Line): number {
	if (line.kind === "blank") return 0;
	if (line.kind === "prompt") return line.text.length;
	if (line.kind === "done") return line.text.length;
	if (line.kind === "info") return line.tag.length + 2 + line.text.length;
	return line.tag.length + 2 + line.name.length + 1 + line.result.length;
}

function renderLine(line: Line, chars: number): React.ReactNode {
	if (line.kind === "blank") return <>&nbsp;</>;

	if (line.kind === "prompt") {
		return <span className="text-zinc-300">{line.text.slice(0, chars)}</span>;
	}

	if (line.kind === "done") {
		const visible = line.text.slice(0, chars);
		return <span className="text-emerald-400">{visible}</span>;
	}

	if (line.kind === "info") {
		const tagPart = `[${line.tag}]`;
		const fullText = ` ${line.text}`;
		const tagShown = tagPart.slice(0, chars);
		const textShown =
			chars > tagPart.length ? fullText.slice(0, chars - tagPart.length) : "";
		return (
			<>
				<span className="text-zinc-500 dark:text-zinc-400">{tagShown}</span>
				<span className="text-zinc-300">{textShown}</span>
			</>
		);
	}

	// call
	const tagPart = `[${line.tag}]`;
	const namePart = ` ${line.name}`;
	const resultPart = ` ${line.result}`;
	let remaining = chars;

	const tagShown = tagPart.slice(0, Math.min(remaining, tagPart.length));
	remaining -= tagShown.length;

	const nameShown = namePart.slice(0, Math.min(remaining, namePart.length));
	remaining -= nameShown.length;

	const resultShown = resultPart.slice(
		0,
		Math.min(remaining, resultPart.length),
	);

	return (
		<>
			<span className="text-emerald-400/80">{tagShown}</span>
			<span className="text-white">{nameShown}</span>
			<span className="text-zinc-500 dark:text-zinc-400">{resultShown}</span>
		</>
	);
}

export function AgentTerminalLive() {
	const [lineIdx, setLineIdx] = useState(0);
	const [chars, setChars] = useState(0);
	const reducedMotion = useRef(false);

	useEffect(() => {
		reducedMotion.current =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reducedMotion.current) {
			setLineIdx(SCRIPT.length);
		}
	}, []);

	useEffect(() => {
		if (reducedMotion.current) return;
		if (lineIdx >= SCRIPT.length) {
			// Pause at end, then loop
			const timeout = window.setTimeout(() => {
				setLineIdx(0);
				setChars(0);
			}, 3500);
			return () => window.clearTimeout(timeout);
		}

		const line = SCRIPT[lineIdx];
		const total = lineLength(line);

		if (line.kind === "blank") {
			const timeout = window.setTimeout(() => {
				setLineIdx((i) => i + 1);
				setChars(0);
			}, 100);
			return () => window.clearTimeout(timeout);
		}

		if (chars >= total) {
			const pause = line.kind === "prompt" ? 350 : 150;
			const timeout = window.setTimeout(() => {
				setLineIdx((i) => i + 1);
				setChars(0);
			}, pause);
			return () => window.clearTimeout(timeout);
		}

		const interval = window.setInterval(() => {
			setChars((c) => Math.min(c + 2, total));
		}, 18);
		return () => window.clearInterval(interval);
	}, [lineIdx, chars]);

	return (
		<div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
			{/* Window-chrome header */}
			<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
				<div className="flex items-center gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
					<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
					<span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
				</div>
				<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					// agent.run
				</p>
				<div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					<span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
					live
				</div>
			</div>

			{/* Terminal body */}
			<div className="min-h-[19rem] px-5 py-4 font-mono text-sm leading-6">
				{SCRIPT.slice(0, lineIdx).map((line, i) => (
					<div key={`done-${i}`}>{renderLine(line, lineLength(line))}</div>
				))}
				{lineIdx < SCRIPT.length && (
					<div>
						{renderLine(SCRIPT[lineIdx], chars)}
						<span
							aria-hidden="true"
							className="ml-0.5 inline-block h-[1em] w-[0.55ch] -translate-y-px animate-pulse bg-emerald-400/80 align-middle"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
