import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Design preview for the docs/API search modal — not wired to a real
 * search backend.
 *
 * - A scope tab row under the input lets the user narrow results to
 *   Docs, API, or Blog (or see everything at once); each tab shows its
 *   result count so switching is never a guess.
 * - Source tags share one filled-chip shape; the API tag carries the
 *   site's indigo accent as the single pop of color, Docs and Blog
 *   stay zinc.
 * - The version lives inside the tag ("API · V4") so it can't be missed.
 * - API rows use mono Module.symbol titles + description (no signature);
 *   docs rows use Inter titles + a prose snippet.
 * - A page result can nest its matching subheadings as indented child
 *   rows, preserving page→subheading grouping.
 */

type SearchSource = "api" | "docs" | "blog";

type SearchScope = "all" | SearchSource;

type SearchChild = {
	title: string;
	snippet: React.ReactNode;
};

type SearchResult = {
	source: SearchSource;
	version?: "v3" | "v4";
	path: string;
	title: string;
	symbol?: string;
	snippet: React.ReactNode;
	children?: SearchChild[];
	selected?: boolean;
};

const RESULTS: SearchResult[] = [
	{
		source: "api",
		version: "v4",
		path: "effect / Iterable",
		title: "Iterable",
		symbol: "forEach",
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
				element of a collection.
			</>
		),
		children: [
			{
				title: "Concurrency options",
				snippet:
					"Bound how many effects run at once with the concurrency option.",
			},
			{
				title: "Discarding results",
				snippet:
					"Pass discard: true when you only need the effects' side effects.",
			},
			{
				title: "Iterating with index",
				snippet: "The callback receives the element and its index.",
			},
		],
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
	{
		source: "blog",
		path: "Blog / This Week in Effect",
		title: "Iterating effectfully: patterns for collections",
		snippet: (
			<>
				A tour of <MatchText>Effect.forEach</MatchText>, its concurrency
				options, and when to reach for streams instead.
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
	// Same chip shape for every source; the API tag carries the single
	// accent color, Docs and Blog stay neutral zinc.
	if (source === "api") {
		return (
			<span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100 px-2 py-0.5 font-mono text-xs font-medium text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">
				<Icon
					name="braces"
					className="-translate-y-[0.5px] text-[11px]"
					aria-hidden="true"
				/>
				API
				{version && (
					<>
						<span
							aria-hidden="true"
							className="text-indigo-400 dark:text-indigo-400/60"
						>
							·
						</span>
						{version.toUpperCase()}
					</>
				)}
			</span>
		);
	}
	return (
		<span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-200 px-2 py-0.5 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
			<Icon
				name={source === "blog" ? "newspaper" : "file-text"}
				className="-translate-y-[0.5px] text-[11px]"
				aria-hidden="true"
			/>
			{source === "blog" ? "Blog" : "Docs"}
			{version && (
				<>
					<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">
						·
					</span>
					{version.toUpperCase()}
				</>
			)}
		</span>
	);
}

const snippetClass =
	"line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-zinc-800 dark:[&_code]:bg-zinc-800 dark:[&_code]:text-zinc-200";

function ResultCard({ result }: { result: SearchResult }) {
	return (
		<div
			className={`rounded-md border transition-colors ${
				result.selected
					? "border-zinc-400 bg-zinc-100/60 dark:border-zinc-500 dark:bg-zinc-900/60"
					: "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
			}`}
		>
			<a
				href="#result"
				aria-current={result.selected ? "true" : undefined}
				className="group block rounded-md p-4 transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
			>
				{/* Meta row: source/version tag + path */}
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

				<p className={`mt-1.5 ${snippetClass}`}>{result.snippet}</p>
			</a>

			{/* Matching subheadings of the same page, nested under the parent */}
			{result.children && (
				<div className="mx-4 mb-3 border-l border-zinc-200 pl-3 dark:border-zinc-800">
					{result.children.map((child) => (
						<a
							key={child.title}
							href="#result"
							className="block rounded-md px-2 py-2 transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
						>
							<p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
								{child.title}
							</p>
							<p className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
								{child.snippet}
							</p>
						</a>
					))}
				</div>
			)}
		</div>
	);
}

const SCOPES: { value: SearchScope; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "docs", label: "Docs" },
	{ value: "api", label: "API" },
	{ value: "blog", label: "Blog" },
];

function ScopeTabs({
	scope,
	onScopeChange,
}: {
	scope: SearchScope;
	onScopeChange: (scope: SearchScope) => void;
}) {
	return (
		<div
			role="tablist"
			aria-label="Filter results by source"
			className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800"
		>
			{SCOPES.map(({ value, label }) => {
				const count =
					value === "all"
						? RESULTS.length
						: RESULTS.filter((r) => r.source === value).length;
				const active = scope === value;
				return (
					<button
						key={value}
						type="button"
						role="tab"
						aria-selected={active}
						onClick={() => onScopeChange(value)}
						className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
							active
								? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
								: "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
						}`}
					>
						{label}
						<span
							className={
								active
									? "text-zinc-500 dark:text-zinc-400"
									: "text-zinc-400 dark:text-zinc-500"
							}
						>
							{count}
						</span>
					</button>
				);
			})}
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
	const [scope, setScope] = useState<SearchScope>("all");

	const visible =
		scope === "all" ? RESULTS : RESULTS.filter((r) => r.source === scope);

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

			{/* Scope tabs: narrow results to a single source */}
			<ScopeTabs scope={scope} onScopeChange={setScope} />

			{/* Results */}
			<div className="max-h-[30rem] space-y-2 overflow-y-auto p-3">
				{visible.map((result) => (
					<ResultCard key={`${result.path}-${result.title}`} result={result} />
				))}
				{visible.length === 0 && (
					<p className="px-2 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
						No {scope === "all" ? "" : `${scope} `}results for “forEach”.
					</p>
				)}
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
						<Kbd>⇥</Kbd> scope
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
