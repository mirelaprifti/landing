import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Design preview for the docs/API search modal — not wired to a real
 * search backend. Distinguishes result sources structurally, without
 * color or per-row badges:
 *
 * - Results are grouped under the site's eyebrow-style section headers
 *   ("// API Reference", "// Docs").
 * - API rows read as code: mono titles + a signature line. Docs rows
 *   read as articles: Inter titles + a prose snippet.
 * - Version is quiet right-aligned meta; V3 is muted, V4 carries the
 *   normal text weight.
 */

type SearchResult = {
	version: "v3" | "v4";
	path: string;
	title: string;
	signature?: string;
	snippet: React.ReactNode;
	selected?: boolean;
};

const API_RESULTS: SearchResult[] = [
	{
		version: "v4",
		path: "effect / Iterable",
		title: "forEach",
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
		version: "v4",
		path: "effect / Array",
		title: "forEach",
		signature:
			"declare const forEach: { <A>(f: (a: A, i: number) => void): (self: ReadonlyArray<A>) => void }",
		snippet: (
			<>
				Runs a side-effect for each element. The callback receives (element,
				index).
			</>
		),
	},
];

const DOCS_RESULTS: SearchResult[] = [
	{
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

function VersionMeta({ version }: { version: SearchResult["version"] }) {
	return (
		<span
			className={`shrink-0 font-mono text-xs tabular-nums ${
				version === "v4"
					? "text-zinc-700 dark:text-zinc-300"
					: "text-zinc-400 dark:text-zinc-600"
			}`}
		>
			{version.toUpperCase()}
		</span>
	);
}

function ResultRow({
	result,
	mono,
}: {
	result: SearchResult;
	mono: boolean;
}) {
	return (
		<a
			href="#result"
			aria-current={result.selected ? "true" : undefined}
			className={`group block rounded-md px-3 py-3 transition-colors ${
				result.selected
					? "bg-zinc-100 dark:bg-zinc-900"
					: "hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
			}`}
		>
			{/* Title row: title left, version meta right */}
			<div className="flex items-baseline justify-between gap-4">
				<p
					className={`min-w-0 truncate text-base font-semibold text-zinc-900 dark:text-white ${
						mono ? "font-mono" : ""
					}`}
				>
					{result.title}
				</p>
				<VersionMeta version={result.version} />
			</div>

			<p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
				{result.path}
			</p>

			{result.signature && (
				<p className="mt-2 truncate font-mono text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
					{result.signature}
				</p>
			)}

			<p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-zinc-800 dark:[&_code]:bg-zinc-800 dark:[&_code]:text-zinc-200">
				{result.snippet}
			</p>
		</a>
	);
}

function ResultGroup({
	label,
	results,
	mono,
	first,
}: {
	label: string;
	results: SearchResult[];
	mono: boolean;
	first?: boolean;
}) {
	return (
		<div className={first ? "" : "mt-2 border-t border-zinc-200 pt-4 dark:border-zinc-800"}>
			<p className="px-3 pb-2 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
				// {label}
			</p>
			<div className="space-y-1">
				{results.map((result) => (
					<ResultRow
						key={`${result.path}-${result.title}`}
						result={result}
						mono={mono}
					/>
				))}
			</div>
		</div>
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
			<div className="max-h-[28rem] overflow-y-auto p-3">
				<ResultGroup label="API Reference" results={API_RESULTS} mono first />
				<ResultGroup label="Docs" results={DOCS_RESULTS} mono={false} />
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
