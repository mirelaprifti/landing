// Restrained 2-accent palette — indigo for keywords, emerald for strings.
const tk = {
	kw: "tok-keyword",
	id: "tok-fg",
	str: "tok-string",
	cmt: "tok-comment",
	punct: "tok-fg",
};

function T({
	kind,
	children,
}: {
	kind: keyof typeof tk;
	children: React.ReactNode;
}) {
	return <span className={tk[kind]}>{children}</span>;
}

const LINES: React.ReactNode[] = [
	<>
		<T kind="kw">import</T> <T kind="punct">{"{"}</T> <T kind="id">Effect</T>
		<T kind="punct">,</T> <T kind="id">Schedule</T>
		<T kind="punct">,</T> <T kind="id">Schema</T> <T kind="punct">{"}"}</T>{" "}
		<T kind="kw">from</T> <T kind="str">"effect"</T>
	</>,
	<>
		<T kind="kw">import</T> <T kind="punct">{"{"}</T>{" "}
		<T kind="id">HttpClient</T> <T kind="punct">{"}"}</T> <T kind="kw">from</T>{" "}
		<T kind="str">"@effect/platform"</T>
	</>,
	<></>,
	<>
		<T kind="kw">const</T> <T kind="id">fetchUser</T> <T kind="punct">=</T>{" "}
		<T kind="punct">(</T>
		<T kind="id">id</T>
		<T kind="punct">:</T> <T kind="id">string</T>
		<T kind="punct">)</T> <T kind="punct">{"=>"}</T>
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
		<T kind="kw">yield</T>* <T kind="id">Effect</T>
		<T kind="punct">.</T>
		<T kind="id">log</T>
		<T kind="punct">(</T>
		<T kind="str">{"`fetching ${id}`"}</T>
		<T kind="punct">)</T>
	</>,
	<>
		{"    "}
		<T kind="kw">const</T> <T kind="id">client</T> <T kind="punct">=</T>{" "}
		<T kind="kw">yield</T>* <T kind="id">HttpClient</T>
	</>,
	<>
		{"    "}
		<T kind="kw">const</T> <T kind="id">res</T> <T kind="punct">=</T>{" "}
		<T kind="kw">yield</T>* <T kind="id">client</T>
		<T kind="punct">.</T>
		<T kind="id">get</T>
		<T kind="punct">(</T>
		<T kind="str">{"`/users/${id}`"}</T>
		<T kind="punct">)</T>
	</>,
	<>
		{"    "}
		<T kind="kw">return</T> <T kind="kw">yield</T>* <T kind="id">Schema</T>
		<T kind="punct">.</T>
		<T kind="id">decode</T>
		<T kind="punct">(</T>
		<T kind="id">User</T>
		<T kind="punct">)(</T>
		<T kind="id">res</T>
		<T kind="punct">.</T>
		<T kind="id">body</T>
		<T kind="punct">)</T>
	</>,
	<>
		{"  "}
		<T kind="punct">{"})"}</T>
		<T kind="punct">.</T>
		<T kind="id">pipe</T>
		<T kind="punct">(</T>
	</>,
	<>
		{"    "}
		<T kind="id">Effect</T>
		<T kind="punct">.</T>
		<T kind="id">retry</T>
		<T kind="punct">(</T>
		<T kind="id">Schedule</T>
		<T kind="punct">.</T>
		<T kind="id">exponential</T>
		<T kind="punct">(</T>
		<T kind="str">"200 millis"</T>
		<T kind="punct">)),</T>
	</>,
	<>
		{"    "}
		<T kind="id">Effect</T>
		<T kind="punct">.</T>
		<T kind="id">withSpan</T>
		<T kind="punct">(</T>
		<T kind="str">"fetchUser"</T>
		<T kind="punct">)</T>
	</>,
	<>
		{"  "}
		<T kind="punct">)</T>
	</>,
];

export function HeroCodeSnippet() {
	return (
		<div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
				<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
					// Effect
				</p>
				<p className="font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
					main.ts
				</p>
			</div>

			{/* Code */}
			<pre className="m-0 overflow-x-auto">
				<code className="block px-5 py-4 font-mono text-[13px] leading-6">
					{LINES.map((line, i) => (
						<div key={i} className="min-h-6 whitespace-pre">
							{line}
						</div>
					))}
				</code>
			</pre>

			{/* Footer — implicit capabilities exercised */}
			<div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zinc-800 px-4 py-2.5 font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
				<span>Services</span>
				<span className="text-zinc-700">·</span>
				<span>Schema</span>
				<span className="text-zinc-700">·</span>
				<span>Retry</span>
				<span className="text-zinc-700">·</span>
				<span>Tracing</span>
				<span className="text-zinc-700">·</span>
				<span>Logging</span>
			</div>
		</div>
	);
}
