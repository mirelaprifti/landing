import { Icon } from "@/components/ui/Icon";
type SpanStatus = "ok" | "retry" | "err";

type Span = {
	name: string;
	detail?: string;
	durationMs: number;
	status: SpanStatus;
	depth: number;
	hasChildren?: boolean;
	isLastSibling?: boolean;
	retryCount?: number;
};

// Total represents the root span; bars are relative to this.
const TOTAL_MS = 2420;

const SPANS: Span[] = [
	{
		name: "agent.run",
		detail: "build webhook handler",
		durationMs: 2420,
		status: "ok",
		depth: 0,
		hasChildren: true,
	},
	{
		name: "Schema.decode",
		detail: '"AgentTask"',
		durationMs: 18,
		status: "ok",
		depth: 1,
	},
	{
		name: "Context.get",
		detail: "VectorStore",
		durationMs: 3,
		status: "ok",
		depth: 1,
	},
	{
		name: "search_docs",
		detail: '"Effect Service"',
		durationMs: 412,
		status: "retry",
		retryCount: 1,
		depth: 1,
	},
	{
		name: "generate_handler",
		durationMs: 1102,
		status: "ok",
		depth: 1,
		hasChildren: true,
	},
	{
		name: "type_check",
		detail: "0 errors",
		durationMs: 204,
		status: "ok",
		depth: 2,
		isLastSibling: true,
	},
	{
		name: "commit",
		detail: '"add webhook handler"',
		durationMs: 189,
		status: "ok",
		depth: 1,
		isLastSibling: true,
	},
];

function StatusGlyph({ status }: { status: SpanStatus }) {
	if (status === "err") {
		return (
			<Icon name="x" className="text-base text-red-400" aria-label="error" />
		);
	}
	if (status === "retry") {
		return (
			<Icon
				name="refresh-cw"
				className="text-base text-amber-300"
				aria-label="retried"
			/>
		);
	}
	return (
		<Icon name="check" className="text-base text-emerald-400" aria-label="ok" />
	);
}

function DurationBar({ ms, status }: { ms: number; status: SpanStatus }) {
	const pct = Math.max(2, Math.round((ms / TOTAL_MS) * 100));
	const color =
		status === "err"
			? "bg-red-400/70"
			: status === "retry"
				? "bg-amber-300/70"
				: "bg-emerald-400/60";
	return (
		<div
			className="h-1 w-16 overflow-hidden rounded-full bg-zinc-800"
			aria-hidden="true"
		>
			<div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
		</div>
	);
}

function formatMs(ms: number): string {
	if (ms < 1000) return `${ms}ms`;
	return `${(ms / 1000).toFixed(1)}s`;
}

function Connector({ span }: { span: Span }) {
	if (span.depth === 0) return null;
	// Use literal box-drawing characters with per-depth indent for cleanliness.
	const cells: string[] = [];
	for (let i = 1; i < span.depth; i++) {
		cells.push("│   ");
	}
	cells.push(span.isLastSibling ? "└─ " : "├─ ");
	return (
		<span
			aria-hidden="true"
			className="shrink-0 font-mono text-xs whitespace-pre text-zinc-700"
		>
			{cells.join("")}
		</span>
	);
}

export function AgentTracePanel() {
	const totalSpans = SPANS.length;
	const retried = SPANS.filter((s) => s.status === "retry").length;
	const errors = SPANS.filter((s) => s.status === "err").length;

	return (
		<div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
				<div className="flex items-center gap-3">
					<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
						// trace
					</p>
					<span className="font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
						a3f9 · 2.4s
					</span>
				</div>
				<div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					<span className="inline-flex items-center gap-1">
						<Icon name="check" className="text-xs text-emerald-400" />
						{totalSpans - retried - errors}
					</span>
					<span className="inline-flex items-center gap-1">
						<Icon name="refresh-cw" className="text-xs text-amber-300" />
						{retried}
					</span>
					<span className="inline-flex items-center gap-1">
						<Icon name="x" className="text-xs text-red-400" />
						{errors}
					</span>
				</div>
			</div>

			{/* Span rows */}
			<ul className="flex flex-col font-mono text-sm">
				{SPANS.map((span, i) => {
					const isRoot = span.depth === 0;
					return (
						<li
							key={`${span.name}-${i}`}
							className={`flex items-center gap-3 border-b border-zinc-800/50 px-4 py-2.5 last:border-b-0 ${
								isRoot ? "bg-zinc-800/30" : ""
							}`}
						>
							<div className="flex min-w-0 flex-1 items-center">
								<Connector span={span} />
								<span
									className={`shrink-0 ${
										isRoot ? "font-semibold text-white" : "text-zinc-200"
									}`}
								>
									{span.name}
								</span>
								{span.detail && (
									<span className="ml-2 truncate text-zinc-500 dark:text-zinc-400">
										{span.detail}
									</span>
								)}
								{span.retryCount && span.retryCount > 0 ? (
									<span className="ml-2 shrink-0 rounded-sm border border-amber-300/30 px-1 py-px font-mono text-[10px] tracking-wider text-amber-300 uppercase">
										{span.retryCount}× retry
									</span>
								) : null}
							</div>
							<div className="flex shrink-0 items-center gap-3">
								<DurationBar ms={span.durationMs} status={span.status} />
								<span className="w-14 text-right text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
									{formatMs(span.durationMs)}
								</span>
								<StatusGlyph status={span.status} />
							</div>
						</li>
					);
				})}
			</ul>

			{/* Footer */}
			<div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
				<span>typed · structured · replayable</span>
				<span>{totalSpans} spans</span>
			</div>
		</div>
	);
}
