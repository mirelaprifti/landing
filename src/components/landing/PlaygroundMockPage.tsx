import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { useState } from "react";
import { GridOverlay } from "../GridOverlay";
import { Button } from "../ui/Button";
import { Navigation } from "./Navigation";

type TreeNode =
	| { type: "folder"; name: string; children: TreeNode[] }
	| { type: "file"; name: string };

const TREE: TreeNode[] = [
	{
		type: "folder",
		name: "src",
		children: [
			{ type: "file", name: "main.ts" },
			{ type: "file", name: "DevTools.ts" },
		],
	},
	{ type: "file", name: "package.json" },
	{ type: "file", name: "dprint.json" },
	{ type: "file", name: "tsconfig.json" },
];

// Token classes — color replaced with weight + muted grays
const tokenClass = {
	kw: "font-semibold text-zinc-900 dark:text-white", // keywords
	id: "text-zinc-700 dark:text-zinc-300", // identifiers / foreground
	str: "text-zinc-500 dark:text-zinc-400", // strings (muted)
	cmt: "text-zinc-500 dark:text-zinc-500 italic", // comments
	num: "text-zinc-700 dark:text-zinc-300", // numbers
	punct: "text-zinc-500 dark:text-zinc-500", // punctuation
};

function Token({ kind, children }: { kind: keyof typeof tokenClass; children: React.ReactNode }) {
	return <span className={tokenClass[kind]}>{children}</span>;
}

const LINES: React.ReactNode[] = [
	<>
		<Token kind="kw">import</Token> <Token kind="punct">{"{"}</Token>{" "}
		<Token kind="id">NodeRuntime</Token> <Token kind="punct">{"}"}</Token>{" "}
		<Token kind="kw">from</Token> <Token kind="str">"@effect/platform-node"</Token>
	</>,
	<>
		<Token kind="kw">import</Token> <Token kind="punct">{"{"}</Token>{" "}
		<Token kind="id">Effect</Token> <Token kind="punct">{"}"}</Token>{" "}
		<Token kind="kw">from</Token> <Token kind="str">"effect"</Token>
	</>,
	<>
		<Token kind="kw">import</Token> <Token kind="punct">{"{"}</Token>{" "}
		<Token kind="id">DevToolsLive</Token> <Token kind="punct">{"}"}</Token>{" "}
		<Token kind="kw">from</Token> <Token kind="str">"./DevTools"</Token>
	</>,
	<></>,
	<>
		<Token kind="kw">const</Token> <Token kind="id">program</Token> ={" "}
		<Token kind="id">Effect</Token>.<Token kind="id">gen</Token>
		<Token kind="punct">(</Token>
		<Token kind="kw">function</Token>
		<Token kind="punct">*()</Token> <Token kind="punct">{"{"}</Token>
	</>,
	<>
		{"  "}
		<Token kind="kw">yield</Token>* <Token kind="id">Effect</Token>.
		<Token kind="id">log</Token>
		<Token kind="punct">(</Token>
		<Token kind="str">"Welcome to the Effect Playground!"</Token>
		<Token kind="punct">)</Token>
	</>,
	<>
		<Token kind="punct">{"}"}</Token>
		<Token kind="punct">).</Token>
		<Token kind="id">pipe</Token>
		<Token kind="punct">(</Token>
		<Token kind="id">Effect</Token>.<Token kind="id">withSpan</Token>
		<Token kind="punct">(</Token>
		<Token kind="str">"program"</Token>
		<Token kind="punct">, {"{"}</Token>
	</>,
	<>
		{"  "}
		<Token kind="id">attributes</Token>
		<Token kind="punct">:</Token> <Token kind="punct">{"{"}</Token>{" "}
		<Token kind="id">source</Token>
		<Token kind="punct">:</Token> <Token kind="str">"Playground"</Token>{" "}
		<Token kind="punct">{"}"}</Token>
	</>,
	<>
		<Token kind="punct">{"}))"}</Token>
	</>,
	<></>,
	<>
		<Token kind="id">program</Token>.<Token kind="id">pipe</Token>
		<Token kind="punct">(</Token>
	</>,
	<>
		{"  "}
		<Token kind="id">Effect</Token>.<Token kind="id">provide</Token>
		<Token kind="punct">(</Token>
		<Token kind="id">DevToolsLive</Token>
		<Token kind="punct">),</Token>
	</>,
	<>
		{"  "}
		<Token kind="id">NodeRuntime</Token>.<Token kind="id">runMain</Token>
	</>,
	<>
		<Token kind="punct">)</Token>
	</>,
];

const TERMINAL_LINES: { time: string; text: string; tone?: "ok" | "err" }[] = [
	{ time: "18:00:09", text: "Starting compilation in watch mode..." },
	{ time: "18:00:10", text: "Found 0 errors. Watching for file changes.", tone: "ok" },
];

function Tree({
	nodes,
	depth,
	activeFile,
	openFolders,
	onSelect,
	onToggleFolder,
}: {
	nodes: TreeNode[];
	depth: number;
	activeFile: string;
	openFolders: Set<string>;
	onSelect: (name: string) => void;
	onToggleFolder: (name: string) => void;
}) {
	return (
		<ul className="flex flex-col">
			{nodes.map((node) => {
				if (node.type === "folder") {
					const isOpen = openFolders.has(node.name);
					return (
						<li key={`folder-${node.name}`}>
							<button
								type="button"
								onClick={() => onToggleFolder(node.name)}
								aria-expanded={isOpen}
								className="flex w-full items-center gap-1.5 rounded-md py-1.5 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
								style={{ paddingLeft: `${depth * 12 + 6}px`, paddingRight: "12px" }}
							>
								{isOpen ? (
									<ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
								) : (
									<ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
								)}
								<Folder className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
								<span className="truncate">{node.name}</span>
							</button>
							{isOpen && node.children.length > 0 && (
								<Tree
									nodes={node.children}
									depth={depth + 1}
									activeFile={activeFile}
									openFolders={openFolders}
									onSelect={onSelect}
									onToggleFolder={onToggleFolder}
								/>
							)}
						</li>
					);
				}

				const isActive = node.name === activeFile;
				return (
					<li key={`file-${node.name}`}>
						<button
							type="button"
							onClick={() => onSelect(node.name)}
							aria-current={isActive ? "true" : undefined}
							className={`flex w-full items-center gap-1.5 rounded-md py-1.5 text-left text-sm transition-colors ${
								isActive
									? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
									: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
							}`}
							style={{ paddingLeft: `${depth * 12 + 6}px`, paddingRight: "12px" }}
						>
							{/* Spacer to align with folder chevron */}
							<span className="inline-block h-3.5 w-3.5 shrink-0" aria-hidden="true" />
							<File className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
							<span className="truncate">{node.name}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export function PlaygroundMockPage() {
	const [activeFile, setActiveFile] = useState("main.ts");
	const [activeTab, setActiveTab] = useState<"terminal" | "trace">("terminal");
	const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["src"]));

	const toggleFolder = (name: string) =>
		setOpenFolders((prev) => {
			const next = new Set(prev);
			if (next.has(name)) {
				next.delete(name);
			} else {
				next.add(name);
			}
			return next;
		});

	return (
		<div className="relative flex h-screen flex-col overflow-hidden bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<Navigation activePath="/play" fullWidth />

			{/* Main playground shell — sidebar + editor row, then full-width bottom panel */}
			<div className="flex flex-1 overflow-hidden pt-16">
				{/* Sidebar — file tree */}
				<aside className="hidden w-60 shrink-0 flex-col overflow-y-auto border-r border-zinc-200 bg-zinc-50 px-3 py-4 md:flex dark:border-zinc-800 dark:bg-zinc-950">
					<nav>
						<Tree
							nodes={TREE}
							depth={0}
							activeFile={activeFile}
							openFolders={openFolders}
							onSelect={setActiveFile}
							onToggleFolder={toggleFolder}
						/>
					</nav>
				</aside>

				{/* Editor surface */}
				<div className="relative min-w-0 flex-1 overflow-auto bg-white font-mono text-sm leading-6 dark:bg-zinc-900">
					{/* Floating actions — top-right of the editor */}
					<div className="pointer-events-none absolute top-2 right-3 z-10 flex items-center gap-1">
						<div className="pointer-events-auto">
							<Button variant="ghost" size="sm">
								Reset
							</Button>
						</div>
						<div className="pointer-events-auto">
							<Button variant="ghost" size="sm">
								Share
							</Button>
						</div>
					</div>
					<pre className="m-0 flex">
						{/* Gutter */}
						<div
							aria-hidden="true"
							className="sticky left-0 shrink-0 select-none border-r border-zinc-200 bg-white px-4 py-4 text-right text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
						>
							{LINES.map((_, i) => (
								<div key={i} className="tabular-nums">
									{i + 1}
								</div>
							))}
						</div>
						{/* Code */}
						<code className="block flex-1 px-4 py-4">
							{LINES.map((line, i) => (
								<div key={i} className="min-h-6 whitespace-pre">
									{line}
								</div>
							))}
						</code>
					</pre>
				</div>
			</div>

			{/* Bottom panel — full width, sits below sidebar + editor row */}
			<div className="flex h-56 shrink-0 flex-col border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
				{/* Tabs */}
				<div role="tablist" className="flex border-b border-zinc-200 dark:border-zinc-800">
					{[
						{ id: "terminal", label: "Terminal" },
						{ id: "trace", label: "Trace Viewer" },
					].map((t) => {
						const isActive = activeTab === t.id;
						return (
							<button
								key={t.id}
								type="button"
								role="tab"
								aria-selected={isActive}
								onClick={() => setActiveTab(t.id as "terminal" | "trace")}
								className={`-mb-px border-b-2 px-4 py-2.5 font-mono text-xs tracking-wider uppercase transition-colors ${
									isActive
										? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
										: "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
								}`}
							>
								{t.label}
							</button>
						);
					})}
				</div>

				{/* Panel content */}
				<div className="flex-1 overflow-auto bg-zinc-100 px-4 py-4 font-mono text-sm leading-6 dark:bg-zinc-900">
					{activeTab === "terminal" ? (
						<div className="space-y-1">
							{TERMINAL_LINES.map((line, i) => (
								<div key={i} className="flex gap-3">
									<span className="shrink-0 text-zinc-500 tabular-nums">{line.time}</span>
									<span
										className={
											line.tone === "err"
												? "text-red-500 dark:text-red-400"
												: "text-zinc-800 dark:text-zinc-300"
										}
									>
										- {line.text}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="font-mono text-xs text-zinc-500">
							// Trace view goes here. Mockup only.
						</p>
					)}
				</div>
			</div>

			<GridOverlay />
		</div>
	);
}
