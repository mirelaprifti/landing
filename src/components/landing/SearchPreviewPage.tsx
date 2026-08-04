import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Design preview for the docs/API search modal — not wired to a real
 * search backend.
 *
 * Three source-filtering UX options, switchable from the page header
 * (scope-tabs, grouped-list, and scope-dropdown variants were explored
 * and cut — tabs/grouping are subsumed by "View all", and a dropdown
 * hides the filter):
 * - A · View all: the federated pattern (GitHub docs, Algolia's
 *   recommendation) — top 2 per source with a "View all N" drill-in
 *   per section and an "All results" row to back out.
 * - B · Scope tokens: Slack/Notion-style — an in:docs token rendered
 *   as a removable chip in the input scopes the query; composable
 *   with future filters (version, package).
 * - C · Merged (A+B): one state model, two entry points — the overview
 *   is A's federated list, but "View all" applies B's in:source token;
 *   removing the chip (× or ⌫) returns to the overview with the query
 *   preserved.
 * - D · Merged + Ask AI: C plus a pinned "Ask AI" row above results in
 *   every scope (the Stripe/Supabase/Mintlify pattern) — it absorbs
 *   the exploratory queries that scope filters serve worst. Clicking
 *   it transforms the modal in place into a conversation view: the
 *   query becomes the first message, the answer streams with source
 *   citations, the input becomes the follow-up prompt, and Esc / the
 *   back row returns to results with the query preserved.
 *
 * Shared decisions across variants:
 * - One visible version context (the "v4 ▾" switcher in the input row)
 *   filters the versioned sources (API, Docs); Blog is unversioned and
 *   passes through. Filtering also dedupes: one context means one card
 *   per symbol. Results hidden by the context surface as a "N more
 *   results in v3" tail row and in the empty state, so a wrong version
 *   guess costs one click, never a dead end. In production the context
 *   is inherited from versioned pages and defaults to current
 *   elsewhere — no hidden per-user memory. (A dedupe-by-identity mode
 *   — canonical v4 cards with per-card "also in v3" links — was
 *   explored and cut: it forces minority-version users to resolve the
 *   version on every result instead of once.)
 * - Source tags share one filled-chip shape; the API tag carries the
 *   site's indigo accent as the single pop of color, Docs and Blog
 *   stay zinc.
 * - The version lives inside the tag ("API · V4") so it can't be missed.
 * - API rows use mono Module.symbol titles + description (no signature);
 *   docs rows use Inter titles + a prose snippet.
 * - A page result can nest its matching subheadings as indented child
 *   rows, preserving page→subheading grouping.
 */

type Variant = "viewall" | "tokens" | "merged" | "askai";

const VARIANTS: { value: Variant; label: string }[] = [
	{ value: "viewall", label: "A" },
	{ value: "tokens", label: "B" },
	{ value: "merged", label: "C" },
	{ value: "askai", label: "D" },
];

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
		path: "effect / Effect",
		title: "Effect",
		symbol: "forEach",
		snippet: (
			<>
				Executes an effectful operation for each element of an{" "}
				<code>Iterable</code>; concurrency is configurable via{" "}
				<code>options</code>.
			</>
		),
		selected: true,
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
		source: "api",
		version: "v4",
		path: "effect / Stream",
		title: "Stream",
		symbol: "runForEach",
		snippet: (
			<>
				Consumes the stream, running an effectful callback for every emitted
				element.
			</>
		),
	},
	{
		source: "docs",
		version: "v4",
		path: "Concurrency / Basic concurrency",
		title: "Controlling concurrency",
		snippet: (
			<>
				<MatchText>Effect.forEach</MatchText> runs sequentially by default —
				pass <code>{"{ concurrency: 10 }"}</code> to fan out with a bound.
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
	{
		source: "api",
		version: "v4",
		path: "effect / Chunk",
		title: "Chunk",
		symbol: "forEach",
		snippet: (
			<>
				Applies <code>f</code> to each element of the Chunk, purely for its side
				effects.
			</>
		),
	},
	{
		source: "docs",
		version: "v4",
		path: "Streams / Consuming streams",
		title: "Consuming streams",
		snippet: (
			<>
				Use <MatchText>Stream.runForEach</MatchText> to process elements as they
				arrive, without collecting them into memory.
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
	{
		source: "api",
		version: "v3",
		path: "effect / Effect",
		title: "Effect",
		symbol: "forEach",
		snippet: (
			<>
				Iterates over an Iterable with an effectful callback — the v3 signature
				takes <code>options</code> as the second argument.
			</>
		),
	},
	{
		source: "blog",
		path: "Blog / Engineering",
		title: "Batching and concurrency, from first principles",
		snippet: (
			<>
				Why unbounded <MatchText>forEach</MatchText> melts your API quota, and
				how Effect's structured concurrency keeps it in check.
			</>
		),
	},
	{
		source: "api",
		version: "v4",
		path: "effect / HashMap",
		title: "HashMap",
		symbol: "forEach",
		snippet: (
			<>
				Applies <code>f</code> to every key/value entry of the HashMap.
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

const GROUPS: { source: SearchSource; label: string }[] = [
	{ source: "api", label: "API Reference" },
	{ source: "docs", label: "Documentation" },
	{ source: "blog", label: "Blog" },
];

type DocsVersion = "v3" | "v4";

function VersionSwitcher({
	version,
	onVersionChange,
}: {
	version: DocsVersion;
	onVersionChange: (version: DocsVersion) => void;
}) {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative shrink-0">
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label="Docs and API version"
				onClick={() => setOpen((o) => !o)}
				className="inline-flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 font-mono text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
			>
				{version}
				<Icon
					name="chevron-down"
					className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
					aria-hidden="true"
				/>
			</button>
			{open && (
				<div
					role="listbox"
					aria-label="Docs and API version"
					className="absolute top-full right-0 z-10 mt-1 w-20 overflow-hidden rounded-md border border-zinc-200 bg-white py-1 shadow-lg shadow-zinc-950/10 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40"
				>
					{(["v4", "v3"] as const).map((v) => (
						<button
							key={v}
							type="button"
							role="option"
							aria-selected={version === v}
							onClick={() => {
								onVersionChange(v);
								setOpen(false);
							}}
							className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left font-mono text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
								version === v
									? "font-medium text-zinc-900 dark:text-white"
									: "text-zinc-600 dark:text-zinc-300"
							}`}
						>
							<span>{v}</span>
							{version === v && (
								<Icon name="check" className="text-[11px]" aria-hidden="true" />
							)}
						</button>
					))}
				</div>
			)}
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

/**
 * Static mock of D's conversation mode: the query became the first
 * message, the answer "streamed" in with source citations, and the
 * back row (or Esc in the real implementation) returns to results.
 */
function AskAiConversation({ onBack }: { onBack: () => void }) {
	return (
		<div className="space-y-4">
			<button
				type="button"
				onClick={onBack}
				className="inline-flex items-center gap-1 px-1 font-mono text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				<Icon name="chevron-left" className="text-[10px]" aria-hidden="true" />
				Back to results
			</button>

			{/* The search query, replayed as the user's first message */}
			<div className="flex justify-end px-1">
				<p className="rounded-md bg-zinc-200 px-3 py-1.5 font-mono text-sm text-zinc-900 dark:bg-zinc-800 dark:text-white">
					forEach
				</p>
			</div>

			<div className="space-y-3 px-1">
				{/* Retrieval cue — shown while sources load, kept as provenance */}
				<p className="flex items-center gap-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
					<Icon name="sparkles" className="text-[11px]" aria-hidden="true" />
					Read: Effect.forEach · Looping and iteration
				</p>

				<div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-zinc-800 dark:[&_code]:bg-zinc-800 dark:[&_code]:text-zinc-200">
					<p>
						<code>Effect.forEach</code> runs an effectful callback for every
						element of an <code>Iterable</code> and collects the results. It
						executes sequentially by default — pass{" "}
						<code>{"{ concurrency: n }"}</code> to run up to <code>n</code>{" "}
						effects at once, or <code>{"{ discard: true }"}</code> when you only
						need the side effects.
					</p>
					<p className="mt-2">
						For streaming data, reach for <code>Stream.runForEach</code>{" "}
						instead, which consumes elements as they arrive.
					</p>
				</div>

				{/* Citations reuse the result cards' source chips */}
				<div className="space-y-1.5">
					<a
						href="#result"
						className="flex items-center gap-2 rounded-md border border-zinc-200 px-2.5 py-1.5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
					>
						<SourceChip source="api" version="v4" />
						<span className="truncate font-mono text-xs font-medium text-zinc-700 dark:text-zinc-200">
							Effect.forEach
						</span>
					</a>
					<a
						href="#result"
						className="flex items-center gap-2 rounded-md border border-zinc-200 px-2.5 py-1.5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
					>
						<SourceChip source="docs" version="v4" />
						<span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
							Looping and iteration
						</span>
					</a>
				</div>

				<div className="flex items-center justify-between">
					<p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
						AI-generated — may contain mistakes
					</p>
					<div className="flex items-center gap-1">
						<button
							type="button"
							aria-label="Good answer"
							className="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
						>
							<Icon name="thumbs-up" className="text-xs" aria-hidden="true" />
						</button>
						<button
							type="button"
							aria-label="Bad answer"
							className="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
						>
							<Icon name="thumbs-down" className="text-xs" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function SearchModalDemo({ variant }: { variant: Variant }) {
	const [scope, setScope] = useState<SearchScope>("all");

	// D only: the Ask AI row swaps the modal into a conversation view.
	const [askAiOpen, setAskAiOpen] = useState(false);

	// D is C plus the Ask AI row — everything else behaves identically.
	const merged = variant === "merged" || variant === "askai";

	// One visible version context; unversioned sources (Blog) pass through.
	const [version, setVersion] = useState<DocsVersion>("v4");
	const otherVersion: DocsVersion = version === "v4" ? "v3" : "v4";

	const pool = RESULTS.filter((r) => !r.version || r.version === version);
	const visible =
		scope === "all" ? pool : pool.filter((r) => r.source === scope);
	// What the version context is hiding, within the current scope
	const otherCount = RESULTS.filter(
		(r) =>
			r.version === otherVersion && (scope === "all" || r.source === scope),
	).length;

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
				{/* B + C + D: active scope rendered as a removable token before the query */}
				{(variant === "tokens" || merged) && scope !== "all" && (
					<span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-zinc-200 py-0.5 pr-1 pl-2 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
						in:{scope}
						<button
							type="button"
							aria-label={`Remove in:${scope} filter`}
							onClick={() => setScope("all")}
							className="flex h-4 w-4 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<Icon name="x" className="text-[10px]" aria-hidden="true" />
						</button>
					</span>
				)}
				<input
					key={askAiOpen ? "chat" : "search"}
					type="search"
					aria-label={
						askAiOpen ? "Ask a follow-up question" : "Search the docs"
					}
					defaultValue={askAiOpen ? "" : "forEach"}
					placeholder={askAiOpen ? "Ask a follow-up…" : undefined}
					className="min-w-0 flex-1 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-400"
				/>
				{!askAiOpen && (
					<VersionSwitcher version={version} onVersionChange={setVersion} />
				)}
				<button
					type="button"
					aria-label="Close search"
					className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
				>
					<Icon name="x" className="text-sm" aria-hidden="true" />
				</button>
			</div>

			{/* B + C + D: token suggestions until a scope token is applied —
			    shown in the merged variants too so the in: vocabulary is
			    introduced before "View all" applies it */}
			{(variant === "tokens" || merged) && scope === "all" && (
				<div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
					{SCOPES.filter((s) => s.value !== "all").map(({ value }) => (
						<button
							key={value}
							type="button"
							onClick={() => setScope(value)}
							className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
						>
							in:{value}
							<span className="text-zinc-400 dark:text-zinc-500">
								{pool.filter((r) => r.source === value).length}
							</span>
						</button>
					))}
				</div>
			)}

			{/* Results — or, in D's chat mode, the conversation */}
			<div className="max-h-[30rem] overflow-y-auto p-3">
				{askAiOpen ? (
					<AskAiConversation onBack={() => setAskAiOpen(false)} />
				) : (
					<>
						{/* D: pinned AI escape hatch, kept in every scope */}
						{variant === "askai" && (
							<button
								type="button"
								onClick={() => setAskAiOpen(true)}
								className="mb-2 flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
							>
								<Icon
									name="sparkles"
									className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400"
									aria-hidden="true"
								/>
								<span className="truncate text-sm font-medium text-zinc-900 dark:text-white">
									Ask AI
								</span>
							</button>
						)}

						{(variant === "viewall" || merged) && scope === "all" ? (
							// A + C + D: federated overview — top hits per source + "View all N"
							<div className="space-y-4">
								{GROUPS.map(({ source, label }) => {
									const grouped = pool.filter((r) => r.source === source);
									if (grouped.length === 0) return null;
									return (
										<section key={source} aria-label={label}>
											<div className="flex items-center justify-between px-1 pb-2">
												<p className="font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
													{label}
												</p>
												{grouped.length > 2 && (
													<button
														type="button"
														onClick={() => setScope(source)}
														className="inline-flex items-center gap-1 font-mono text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
													>
														View all {grouped.length}
														<Icon
															name="chevron-right"
															className="text-[10px]"
															aria-hidden="true"
														/>
													</button>
												)}
											</div>
											<div className="space-y-2">
												{grouped.slice(0, 2).map((result) => (
													<ResultCard
														key={`${result.path}-${result.title}-${result.version ?? "latest"}`}
														result={result}
													/>
												))}
											</div>
										</section>
									);
								})}
							</div>
						) : (
							<div className="space-y-2">
								{/* A + C + D scoped view: back row above the filtered list */}
								{(variant === "viewall" || merged) && (
									<button
										type="button"
										onClick={() => setScope("all")}
										className="inline-flex items-center gap-1 px-1 pb-1 font-mono text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
									>
										<Icon
											name="chevron-left"
											className="text-[10px]"
											aria-hidden="true"
										/>
										All results
									</button>
								)}
								{visible.map((result) => (
									<ResultCard
										key={`${result.path}-${result.title}-${result.version ?? "latest"}`}
										result={result}
									/>
								))}
								{visible.length === 0 && (
									<p className="px-2 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
										No {version} {scope === "all" ? "" : `${scope} `}results for
										“forEach”.
									</p>
								)}
							</div>
						)}

						{/* Cross-version escape hatch: what the context is hiding */}
						{otherCount > 0 && (
							<button
								type="button"
								onClick={() => setVersion(otherVersion)}
								className="mt-2 flex w-full items-center justify-center gap-1 rounded-md px-2 py-1.5 font-mono text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
							>
								{otherCount} more result{otherCount === 1 ? "" : "s"} in{" "}
								{otherVersion}
								<Icon
									name="chevron-right"
									className="text-[10px]"
									aria-hidden="true"
								/>
							</button>
						)}
					</>
				)}
			</div>

			{/* Footer */}
			<div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
				<span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
					Search powered by Mixedbread
				</span>
				<div className="flex items-center gap-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
					{askAiOpen ? (
						<>
							<span className="flex items-center gap-1.5">
								<Kbd>↵</Kbd> send
							</span>
							<span className="flex items-center gap-1.5">
								<Kbd>esc</Kbd> back
							</span>
						</>
					) : (
						<>
							<span className="flex items-center gap-1.5">
								<Kbd>↑</Kbd>
								<Kbd>↓</Kbd> navigate
							</span>
							{(variant === "tokens" || merged) && scope !== "all" && (
								<span className="flex items-center gap-1.5">
									<Kbd>⌫</Kbd> clear scope
								</span>
							)}
							{variant === "viewall" && scope !== "all" && (
								<span className="flex items-center gap-1.5">
									<Kbd>⌫</Kbd> back
								</span>
							)}
							<span className="flex items-center gap-1.5">
								<Kbd>↵</Kbd> select
							</span>
							<span className="flex items-center gap-1.5">
								<Kbd>esc</Kbd> close
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export function SearchPreviewPage() {
	const [variant, setVariant] = useState<Variant>("viewall");

	return (
		<div className="flex min-h-screen justify-center bg-zinc-100 px-4 py-16 dark:bg-zinc-900/80">
			<div className="w-full max-w-2xl">
				<div className="mb-6 flex items-center justify-between">
					<p className="font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
						// Search UI preview
					</p>
					<ThemeToggle />
				</div>

				<div className="relative">
					{/* Variant switcher: vertical rail beside the modal (row on mobile) */}
					<div
						role="tablist"
						aria-label="Search UX variant"
						aria-orientation="vertical"
						className="mb-4 inline-flex gap-1 rounded-md border border-zinc-200 bg-white p-1 sm:absolute sm:top-0 sm:left-full sm:mb-0 sm:ml-4 sm:flex-col dark:border-zinc-800 dark:bg-zinc-950"
					>
						{VARIANTS.map(({ value, label }) => {
							const active = variant === value;
							return (
								<button
									key={value}
									type="button"
									role="tab"
									aria-selected={active}
									onClick={() => setVariant(value)}
									className={`rounded px-3 py-1.5 text-center font-mono text-xs font-medium transition-colors ${
										active
											? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
											: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
									}`}
								>
									{label}
								</button>
							);
						})}
					</div>

					{/* key resets the modal's scope state when switching variants */}
					<SearchModalDemo key={variant} variant={variant} />
				</div>
			</div>
		</div>
	);
}
