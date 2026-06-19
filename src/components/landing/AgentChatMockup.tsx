// Token classes mirror the editorial syntax treatment used in the Playground mock
const tk = {
	kw: "font-semibold text-indigo-300",
	id: "text-zinc-300",
	str: "text-emerald-400",
	cmt: "italic text-zinc-500",
	punct: "text-zinc-500",
};

function T({ kind, children }: { kind: keyof typeof tk; children: React.ReactNode }) {
	return <span className={tk[kind]}>{children}</span>;
}

const CODE_LINES: React.ReactNode[] = [
	<>
		<T kind="kw">import</T> <T kind="punct">{"{"}</T> <T kind="id">Effect</T>
		<T kind="punct">,</T> <T kind="id">Schedule</T>{" "}
		<T kind="punct">{"}"}</T> <T kind="kw">from</T>{" "}
		<T kind="str">"effect"</T>
	</>,
	<>
		<T kind="kw">import</T> <T kind="punct">{"{"}</T>{" "}
		<T kind="id">HttpServer</T> <T kind="punct">{"}"}</T>{" "}
		<T kind="kw">from</T> <T kind="str">"@effect/platform"</T>
	</>,
	<></>,
	<>
		<T kind="kw">const</T> <T kind="id">handler</T>{" "}
		<T kind="punct">=</T> <T kind="id">HttpServer</T>
		<T kind="punct">.</T>
		<T kind="id">handler</T>
		<T kind="punct">.</T>
		<T kind="id">make</T>
		<T kind="punct">(</T>
	</>,
	<>
		{"  "}
		<T kind="id">Effect</T>
		<T kind="punct">.</T>
		<T kind="id">gen</T>
		<T kind="punct">(</T>
		<T kind="kw">function</T>
		<T kind="punct">*()</T> <T kind="punct">{"{"}</T>
	</>,
	<>
		{"    "}
		<T kind="kw">const</T> <T kind="id">body</T> <T kind="punct">=</T>{" "}
		<T kind="kw">yield</T>* <T kind="id">request</T>
		<T kind="punct">.</T>
		<T kind="id">json</T>
	</>,
	<>
		{"    "}
		<T kind="kw">yield</T>* <T kind="id">processWebhook</T>
		<T kind="punct">(</T>
		<T kind="id">body</T>
		<T kind="punct">).</T>
		<T kind="id">pipe</T>
		<T kind="punct">(</T>
	</>,
	<>
		{"      "}
		<T kind="id">Effect</T>
		<T kind="punct">.</T>
		<T kind="id">retry</T>
		<T kind="punct">(</T>
		<T kind="punct">{"{"}</T>
	</>,
	<>
		{"        "}
		<T kind="id">schedule</T>
		<T kind="punct">:</T> <T kind="id">Schedule</T>
		<T kind="punct">.</T>
		<T kind="id">exponential</T>
		<T kind="punct">(</T>
		<T kind="str">"100 millis"</T>
		<T kind="punct">),</T>
	</>,
	<>
		{"        "}
		<T kind="id">times</T>
		<T kind="punct">:</T> <T kind="id">3</T>
		<T kind="punct">,</T>
	</>,
	<>
		{"      "}
		<T kind="punct">{"})"}</T>
	</>,
	<>
		{"    "}
		<T kind="punct">)</T>
	</>,
	<>
		{"  "}
		<T kind="punct">{"})"}</T>
	</>,
	<>
		<T kind="punct">)</T>
	</>,
];

export function AgentChatMockup() {
	return (
		<div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
				<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					// agent chat
				</p>
				<div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
					ready
				</div>
			</div>

			{/* Prompt — user bubble */}
			<div className="border-b border-zinc-800 px-4 py-3">
				<p className="mb-1 font-mono text-[10px] font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					You
				</p>
				<p className="text-sm leading-relaxed text-zinc-200">
					Build a webhook handler that retries on 5xx.
				</p>
			</div>

			{/* Response — agent code */}
			<div className="px-4 py-3">
				<p className="mb-2 font-mono text-[10px] font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					Effect Agent
				</p>
				<pre className="m-0 overflow-x-auto">
					<code className="block font-mono text-[12.5px] leading-6">
						{CODE_LINES.map((line, i) => (
							<div key={i} className="min-h-6 whitespace-pre">
								{line}
							</div>
						))}
					</code>
				</pre>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
				<span>typed · retryable · production-ready</span>
				<span>14 lines · 0 errors</span>
			</div>
		</div>
	);
}
