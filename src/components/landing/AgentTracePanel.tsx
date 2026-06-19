type Span = {
	name: string;
	detail?: string;
	duration: string;
	status: "ok" | "err";
	depth: number;
	connector: "branch" | "last" | "child" | "lastChild";
};

const SPANS: Span[] = [
	{
		name: "agent.run",
		detail: "build webhook handler",
		duration: "2.4s",
		status: "ok",
		depth: 0,
		connector: "branch",
	},
	{
		name: "search_docs",
		detail: '"Effect Service"',
		duration: "412ms",
		status: "ok",
		depth: 1,
		connector: "branch",
	},
	{
		name: "generate_handler",
		duration: "1.1s",
		status: "ok",
		depth: 1,
		connector: "branch",
	},
	{
		name: "type_check",
		duration: "204ms",
		status: "ok",
		depth: 2,
		connector: "lastChild",
	},
	{
		name: "commit",
		detail: '"add webhook handler"',
		duration: "189ms",
		status: "ok",
		depth: 1,
		connector: "last",
	},
];

function Connector({ depth, connector }: { depth: number; connector: Span["connector"] }) {
	if (depth === 0) return null;
	const symbol =
		connector === "last" || connector === "lastChild" ? "└─" : "├─";
	return (
		<span
			aria-hidden="true"
			className="select-none font-mono text-xs text-zinc-600"
			style={{ paddingLeft: `${(depth - 1) * 1.25}rem` }}
		>
			{symbol}{" "}
		</span>
	);
}

export function AgentTracePanel() {
	return (
		<div className="rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
			{/* Header strip */}
			<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
				<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					// agent trace
				</p>
				<div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
					live
				</div>
			</div>

			{/* Span tree */}
			<ul className="flex flex-col font-mono text-sm">
				{SPANS.map((span, i) => (
					<li
						key={`${span.name}-${i}`}
						className="flex items-center justify-between gap-3 border-b border-zinc-800/50 px-4 py-2.5 last:border-b-0"
					>
						<div className="flex min-w-0 items-center">
							<Connector depth={span.depth} connector={span.connector} />
							<span
								className={`shrink-0 ${
									span.depth === 0
										? "font-semibold text-white"
										: "text-zinc-200"
								}`}
							>
								{span.name}
							</span>
							{span.detail && (
								<span className="ml-2 truncate text-zinc-500 dark:text-zinc-400">
									{span.detail}
								</span>
							)}
						</div>
						<div className="flex shrink-0 items-center gap-3">
							<span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
								{span.duration}
							</span>
							{span.status === "ok" ? (
								<i
									className="ri-check-line text-base text-emerald-400"
									aria-label="ok"
								/>
							) : (
								<i
									className="ri-close-line text-base text-red-400"
									aria-label="error"
								/>
							)}
						</div>
					</li>
				))}
			</ul>

			{/* Footer summary */}
			<div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
				<span>5 spans · 0 errors</span>
				<span>typed · structured · replayable</span>
			</div>
		</div>
	);
}
