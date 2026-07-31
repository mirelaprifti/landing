import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Design preview for the docs/API search modal — not wired to a real
 * search backend. Distinguishes results without color:
 *
 * - Source tags: API is a filled chip with a braces glyph; Docs is an
 *   outlined chip with a document glyph — different fill, shape and icon.
 * - API rows use mono titles + a signature panel; docs rows use Inter
 *   titles + a prose snippet.
 * - Version tags stay quiet outlines: V4 a step stronger than V3.
 */

type SearchResult = {
	source: "api" | "docs";
	version: "v3" | "v4";
	path: string;
	title: string;
	symbol?: string;
	signature?: string;
	snippet: React.ReactNode;
	selected?: boolean;
};

const RESULTS: SearchResult[] = [
	{
		source: "api",
		version: "v4",
		path: "effect / Iterable",
		title: "Iterable",
		symbol: "forEach",
		signature:
			"declare const forEach: { <A>(f: (a: A, i: number) => void): (self: Iterable<A>) => void }",
		snippet: (
			<>
				Iterates over the Iterable, applying <code>f</code> to each element.
			</>
		),
		selected: true,
	},
	{
		source: "api",
		version: "v4",
		path: "effect / Array",
		title: "Array",
		symbol: "forEach",
		signature:
			"declare const forEach: { <A>(f: (a: A, i: number) => void): (self: ReadonlyArray<A>) => void }",
		snippet: (
			<>
				Runs a side-effect for each element. The callback receives (element,
				index).
			</>
		),
	},
	{
		source: "docs",
		version: "v4",
		path: "Getting started / Control flow",
		title: "Looping and iteration",
		snippet: (
			<>
				Use <MatchText>Effect.forEach</MatchText> to run an effect for every
				element of a collection, collecting the results with bounded
				concurrency.
			</>
		),
	},
	{
		source: "docs",
		version: "v3",
		path: "Guides / Collections",
		title: "Working with collections",
		snippet: (
			<>
				<MatchText>forEach</MatchText> discards the callback results — use{" "}
				<code>Effect.all</code> when you need the produced values.
			</>
		),
	},
];

function MatchText({ children }: { children: React.ReactNode }) {
	return (
		<mark className="bg-transparent font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-4 dark:text-white dark:decoration-zinc-500">
			{children}
		</mark>
	);
}

function SourceChip({
	source,
	version,
}: {
	source: SearchResult["source"];
	version: SearchResult["version"];
}) {
	// One tag carries both facts: the source (glyph + label) and the
	// version, joined inside the filled chip so neither goes unnoticed.
	return (
		<span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-200 px-2 py-0.5 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
			<Icon
				name={source === "api" ? "braces" : "file-text"}
				className="text-[11px]"
				aria-hidden="true"
			/>
			{source === "api" ? "API" : "Docs"}
			<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">
				·
			</span>
			{version.toUpperCase()}
		</span>
	);
}

function ResultCard({ result }: { result: SearchResult }) {
	return (
		<a
			href="#result"
			aria-current={result.selected ? "true" : undefined}
			className={`group block rounded-md border p-4 transition-colors ${
				result.selected
					? "border-zinc-400 bg-zinc-100/60 dark:border-zinc-500 dark:bg-zinc-900/60"
					: "border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100/60 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/60"
			}`}
		>
			{/* Meta row: combined source/version tag + path */}
			<div className="flex flex-wrap items-center gap-2">
				<SourceChip source={result.source} version={result.version} />
				<span className="font-mono text-xs font-medium text-zinc-600 dark:text-zinc-300">
					{result.path}
				</span>
			</div>

			{/* Title: Module.symbol in mono for API, Inter for docs pages */}
			<p
				className={`mt-3 text-base font-semibold text-zinc-900 dark:text-white ${
					result.source === "api" ? "font-mono" : ""
				}`}
			>
				{result.source === "api" && result.symbol
					? `${result.title}.${result.symbol}`
					: result.title}
			</p>

			{/* API results show the signature in the code-panel style */}
			{result.signature && (
				<pre className="mt-2 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/80">
					<code className="font-mono text-xs leading-relaxed whitespace-pre text-zinc-700 dark:text-zinc-300">
						{result.signature}
					</code>
				</pre>
			)}

			<p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-zinc-800 dark:[&_code]:bg-zinc-800 dark:[&_code]:text-zinc-200">
				{result.snippet}
			</p>
		</a>
	);
}

function Kbd({ children }: { children: React.ReactNode }) {
	return (
		<kbd className="inline-flex min-w-5 items-center justify-center rounded border border-zinc-300 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
			{children}
		</kbd>
	);
}

function SearchModalDemo() {
	return (
		<div
			role="dialog"
			aria-label="Search the docs"
			className="w-full max-w-2xl overflow-hidden rounded-md border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40"
		>
			{/* Input row */}
			<div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
				<Icon
					name="search"
					className="shrink-0 text-base text-zinc-500 dark:text-zinc-400"
					aria-hidden="true"
				/>
				<input
					type="search"
					aria-label="Search the docs"
					defaultValue="forEach"
					className="min-w-0 flex-1 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-400"
				/>
				<button
					type="button"
					aria-label="Close search"
					className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
				>
					<Icon name="x" className="text-sm" aria-hidden="true" />
				</button>
			</div>

			{/* Results */}
			<div className="max-h-[28rem] space-y-2 overflow-y-auto p-3">
				{RESULTS.map((result) => (
					<ResultCard key={`${result.path}-${result.title}`} result={result} />
				))}
			</div>

			{/* Footer */}
			<div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
				<span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
					Search powered by Mixedbread
				</span>
				<div className="flex items-center gap-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
					<span className="flex items-center gap-1.5">
						<Kbd>↑</Kbd>
						<Kbd>↓</Kbd> navigate
					</span>
					<span className="flex items-center gap-1.5">
						<Kbd>↵</Kbd> select
					</span>
					<span className="flex items-center gap-1.5">
						<Kbd>esc</Kbd> close
					</span>
				</div>
			</div>
		</div>
	);
}

export function SearchPreviewPage() {
	return (
		<div className="flex min-h-screen justify-center bg-zinc-100 px-4 py-16 dark:bg-zinc-900/80">
			<div className="w-full max-w-2xl">
				<div className="mb-6 flex items-center justify-between">
					<p className="font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
						// Search UI preview
					</p>
					<ThemeToggle />
				</div>
				<SearchModalDemo />
			</div>
		</div>
	);
}
