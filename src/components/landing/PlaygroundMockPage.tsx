import {
	Check,
	ChevronDown,
	ChevronRight,
	CircleCheck,
	Copy,
	Download,
	File,
	Folder,
	LoaderCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GridOverlay } from "../GridOverlay";
import { Button } from "../ui/Button";
import {
	type EffectVersion,
	VERSION_LABELS,
	VersionSwitch,
} from "../ui/VersionSwitch";
import { Navigation } from "./Navigation";

/**
 * v3 / v4 switcher — placement study.
 *
 * Three candidate placements, switchable from the rail in the bottom-left, so
 * they can be compared in place rather than argued about. Pick one, then delete
 * the other two and the rail.
 *
 * - toolbar · beside Reset / Share. Groups the switch with the other two
 *   consequential actions, and the only one of the three still on screen below
 *   md — though at 390px the cluster already overhangs the code, so shipping
 *   this means giving the whole cluster a narrow-width treatment, not just the
 *   switch.
 * - sidebar · above the file tree, as in the reference shot. Reads as project
 *   config, sits near package.json — but the sidebar is `hidden md:flex`, so
 *   this placement has no mobile home at all (measured: 0 controls at 390px).
 * - navbar · the docs navbar's slot, one shape site-wide. Cheapest to learn,
 *   but in docs each half is a link; here it rebuilds the sandbox. Hidden below
 *   md too, exactly as the docs control is.
 *
 * Decisions that hold whichever placement wins:
 * - Segmented, not dropdown, while exactly two versions exist — both visible,
 *   one click. (Same reasoning logged in SearchPreviewPage; a third version
 *   flips it to a dropdown.)
 * - The target label carries its `(rc)` qualifier. "v4" alone understates that
 *   you are pointing an experiment at a release candidate.
 * - Switching is a rebuild, not a filter: it rewrites package.json, reinstalls
 *   in the webcontainer and reboots the dev server. The mock replays the real
 *   boot sequence on every switch so the cost is visible in the comparison.
 * - Switching keeps the buffer. The playground is for trying things, and Reset
 *   is already a separate confirmed action — a switch that silently discarded
 *   edits would be a second, unlabelled reset. In the real playground this
 *   needs a confirm only when the buffer is dirty; the mock has no editing, so
 *   it switches straight away.
 * - package.json is in the file tree, so it has to agree with the control —
 *   open it under either version and the dependency matches.
 */

type Placement = "toolbar" | "stacked" | "bar" | "sidebar" | "navbar";

const PLACEMENTS: { value: Placement; label: string }[] = [
	{ value: "toolbar", label: "toolbar" },
	{ value: "stacked", label: "stacked" },
	{ value: "bar", label: "bar" },
	{ value: "sidebar", label: "sidebar" },
	{ value: "navbar", label: "navbar" },
];

/** Dependency pinned per version — what package.json shows under each. */
const VERSION_DEPS: Record<
	EffectVersion,
	{ effect: string; platform: string }
> = {
	v3: { effect: "^3.19.0", platform: "^0.96.0" },
	v4: { effect: "4.0.0-rc.5", platform: "1.0.0-rc.3" },
};

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

// GitHub color scheme — tok-* classes from globals.css (Shiki github-light/dark values).
const tokenClass = {
	kw: "tok-keyword", // keywords
	id: "tok-fg", // identifiers / foreground
	str: "tok-string", // strings
	cmt: "tok-comment", // comments
	num: "tok-constant", // numbers
	punct: "tok-fg", // punctuation
};

function Token({
	kind,
	children,
}: {
	kind: keyof typeof tokenClass;
	children: React.ReactNode;
}) {
	return <span className={tokenClass[kind]}>{children}</span>;
}

const LINES: React.ReactNode[] = [
	<>
		<Token kind="kw">import</Token> <Token kind="punct">{"{"}</Token>{" "}
		<Token kind="id">NodeRuntime</Token> <Token kind="punct">{"}"}</Token>{" "}
		<Token kind="kw">from</Token>{" "}
		<Token kind="str">"@effect/platform-node"</Token>
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

/**
 * package.json, rendered from the same pinned deps the switch writes — so the
 * file in the tree can never disagree with the control.
 */
function packageJsonLines(version: EffectVersion): React.ReactNode[] {
	const deps = VERSION_DEPS[version];
	const entry = (key: string, value: string, comma = true) => (
		<>
			{"    "}
			<Token kind="str">"{key}"</Token>
			<Token kind="punct">:</Token> <Token kind="str">"{value}"</Token>
			{comma ? <Token kind="punct">,</Token> : null}
		</>
	);
	return [
		<Token key="open" kind="punct">
			{"{"}
		</Token>,
		<>
			{"  "}
			<Token kind="str">"name"</Token>
			<Token kind="punct">:</Token>{" "}
			<Token kind="str">"effect-playground"</Token>
			<Token kind="punct">,</Token>
		</>,
		<>
			{"  "}
			<Token kind="str">"type"</Token>
			<Token kind="punct">:</Token> <Token kind="str">"module"</Token>
			<Token kind="punct">,</Token>
		</>,
		<>
			{"  "}
			<Token kind="str">"dependencies"</Token>
			<Token kind="punct">: {"{"}</Token>
		</>,
		entry("@effect/platform-node", deps.platform),
		entry("effect", deps.effect, false),
		<>
			{"  "}
			<Token kind="punct">{"}"}</Token>
		</>,
		<Token key="close" kind="punct">
			{"}"}
		</Token>,
	];
}

/**
 * Terminal transcript per version. Switching replays the install, so the cost
 * of the switch is legible in the panel rather than implied.
 */
function terminalLines(
	version: EffectVersion,
): { time: string; text: string; tone?: "ok" | "err" }[] {
	const deps = VERSION_DEPS[version];
	return [
		{ time: "18:00:04", text: `Installing effect@${deps.effect}` },
		{ time: "18:00:09", text: "Starting compilation in watch mode..." },
		{
			time: "18:00:10",
			text: "Found 0 errors. Watching for file changes.",
			tone: "ok",
		},
	];
}

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
								style={{
									paddingLeft: `${depth * 12 + 6}px`,
									paddingRight: "12px",
								}}
							>
								{isOpen ? (
									<ChevronDown
										className="h-3.5 w-3.5 shrink-0 text-zinc-500 dark:text-zinc-400"
										aria-hidden="true"
									/>
								) : (
									<ChevronRight
										className="h-3.5 w-3.5 shrink-0 text-zinc-500 dark:text-zinc-400"
										aria-hidden="true"
									/>
								)}
								<Folder
									className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400"
									aria-hidden="true"
								/>
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
							style={{
								paddingLeft: `${depth * 12 + 6}px`,
								paddingRight: "12px",
							}}
						>
							{/* Spacer to align with folder chevron */}
							<span
								className="inline-block h-3.5 w-3.5 shrink-0"
								aria-hidden="true"
							/>
							<File
								className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400"
								aria-hidden="true"
							/>
							<span className="truncate">{node.name}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

const BOOT_STEPS = [
	"Booting webcontainer",
	"Installing dependencies",
	"Starting dev server",
];

/** Steps replayed when the version switch rebuilds the sandbox. */
function rebuildSteps(version: EffectVersion): string[] {
	return [
		"Rewriting package.json",
		`Installing effect@${VERSION_DEPS[version].effect}`,
		"Restarting dev server",
	];
}

/**
 * Boot loader overlay in the editorial design system — mock version of the
 * playground's real loading screen, simulating the boot sequence on mount and
 * replayed (with `steps` describing the reinstall) on every version switch.
 */
function PlaygroundLoader({
	steps = BOOT_STEPS,
	title = "Loading Playground",
	onDone,
}: {
	steps?: string[];
	title?: string;
	onDone?: () => void;
}) {
	const [doneCount, setDoneCount] = useState(0);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		if (doneCount < steps.length) {
			const timer = setTimeout(() => setDoneCount((n) => n + 1), 400);
			return () => clearTimeout(timer);
		}
		const timer = setTimeout(() => {
			setHidden(true);
			onDone?.();
		}, 300);
		return () => clearTimeout(timer);
	}, [doneCount, steps.length, onDone]);

	const visibleSteps = steps.slice(0, Math.min(doneCount + 1, steps.length));

	return (
		<AnimatePresence initial={false}>
			{!hidden && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"
				>
					<div className="w-full max-w-sm rounded-md border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
						<p className="font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
							{title}
						</p>
						<div className="mt-4 mb-5 h-px bg-zinc-200 dark:bg-zinc-800" />
						<div className="flex flex-col space-y-3">
							<AnimatePresence initial={false}>
								{visibleSteps.map((step, index) => {
									const isDone = index < doneCount;
									return (
										<motion.div
											key={step}
											initial={{ opacity: 0, y: 12 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -12 }}
											transition={{ duration: 0.3, ease: "easeInOut" }}
											className="flex w-full items-center space-x-2.5"
										>
											{isDone ? (
												<CircleCheck className="h-4 w-4 shrink-0 text-green-500" />
											) : (
												<LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-zinc-400 dark:text-zinc-500" />
											)}
											<span
												className={`font-mono text-[13px] ${
													isDone
														? "text-zinc-500 dark:text-zinc-400"
														: "text-zinc-900 dark:text-white"
												}`}
											>
												{step}
											</span>
										</motion.div>
									);
								})}
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export function PlaygroundMockPage() {
	const [activeFile, setActiveFile] = useState("main.ts");
	const [activeTab, setActiveTab] = useState<"terminal" | "trace">("terminal");
	const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["src"]));
	const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
	const [shareOpen, setShareOpen] = useState(false);
	const [shareCopied, setShareCopied] = useState(false);
	const shareRef = useRef<HTMLDivElement>(null);

	// Placement study — see the header comment. Delete with the losing variants.
	const [placement, setPlacement] = useState<Placement>("toolbar");

	const [version, setVersion] = useState<EffectVersion>("v3");
	// Non-null while the sandbox is reinstalling after a switch.
	const [rebuildingTo, setRebuildingTo] = useState<EffectVersion | null>(null);

	const SHARE_URL = "https://effect.website/play#cb512fbe0b7a";

	// A switch is a rebuild: the version flips immediately (so the control never
	// lags the pointer), and the sandbox reinstalls behind the boot overlay.
	const switchVersion = (next: EffectVersion) => {
		if (next === version) return;
		setVersion(next);
		setRebuildingTo(next);
	};

	const versionSwitch = (
		<VersionSwitch
			value={version}
			onChange={switchVersion}
			aria-label="Effect version for this playground"
		/>
	);

	// package.json is the one file whose contents the switch actually rewrites;
	// every other file shows the sample either way.
	const fileLines =
		activeFile === "package.json" ? packageJsonLines(version) : LINES;

	const copyShareUrl = () => {
		navigator.clipboard.writeText(SHARE_URL).then(() => {
			setShareCopied(true);
			setTimeout(() => setShareCopied(false), 1500);
		});
	};

	// Reset + Share travel together, floating over the code in most placements
	// and sitting in the toolbar row in the `bar` one.
	const actionButtons = (
		<>
			<div className="pointer-events-auto">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setResetConfirmOpen(true)}
					className="inset-ring inset-ring-zinc-300 h-7.5 bg-zinc-50 px-3 py-0 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:inset-ring-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
				>
					Reset
				</Button>
			</div>
			<div ref={shareRef} className="pointer-events-auto relative">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setShareOpen((open) => !open)}
					aria-haspopup="dialog"
					aria-expanded={shareOpen}
					className="inset-ring inset-ring-zinc-300 h-7.5 bg-zinc-50 px-3 py-0 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:inset-ring-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
				>
					Share
				</Button>

				{/* Share popover */}
				{shareOpen && (
					<div
						role="dialog"
						aria-label="Share this playground"
						className="absolute top-full right-0 z-20 mt-2 w-96 animate-[dialogIn_0.25s_ease-out] rounded-md border border-zinc-300 bg-white p-5 font-sans shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
					>
						<h2 className="leading-tighter text-lg font-semibold text-zinc-900 dark:text-white">
							Share
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
							Use the link to share this playground with others.
						</p>

						{/* Link row */}
						<div className="mt-4 flex items-center gap-2">
							<input
								type="text"
								readOnly
								value={SHARE_URL}
								aria-label="Share link"
								onFocus={(e) => e.currentTarget.select()}
								className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
							/>
							<button
								type="button"
								onClick={copyShareUrl}
								aria-label="Copy share link"
								className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
							>
								{shareCopied ? (
									<Check size={16} aria-hidden="true" />
								) : (
									<Copy size={16} aria-hidden="true" />
								)}
							</button>
						</div>

						{/* Download row */}
						<div className="mt-4 flex items-center justify-between gap-2">
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								Or download the files locally
							</p>
							<button
								type="button"
								aria-label="Download playground files"
								className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
							>
								<Download size={16} aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);

	// Close share popover on outside click or Escape
	useEffect(() => {
		if (!shareOpen) return;
		const handlePointer = (e: MouseEvent) => {
			if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
				setShareOpen(false);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setShareOpen(false);
		};
		document.addEventListener("mousedown", handlePointer);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handlePointer);
			document.removeEventListener("keydown", handleKey);
		};
	}, [shareOpen]);

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
			{rebuildingTo ? (
				<PlaygroundLoader
					key={rebuildingTo}
					steps={rebuildSteps(rebuildingTo)}
					title={`Switching to ${VERSION_LABELS[rebuildingTo]}`}
					onDone={() => setRebuildingTo(null)}
				/>
			) : (
				<PlaygroundLoader />
			)}

			{/* Placement · navbar — preview shim. The switch belongs in the shared
			    Navigation's link row (where the docs navbar carries it); this stands
			    it in that row without touching the shared component, so the study
			    stays contained. If navbar wins, it moves into Navigation properly. */}
			{placement === "navbar" && (
				<div className="fixed top-0 right-66 z-101 hidden h-16 items-center in-[.has-announcement]:top-10 md:flex">
					{versionSwitch}
				</div>
			)}

			{/* Main playground shell — sidebar + editor row, then full-width bottom panel */}
			<div className="flex flex-1 overflow-hidden pt-16">
				{/* Sidebar — file tree */}
				<aside className="hidden w-60 shrink-0 flex-col overflow-y-auto border-r border-zinc-200 bg-zinc-50 px-3 py-3 md:flex dark:border-zinc-800 dark:bg-zinc-950">
					{/* Placement · sidebar — above the tree, stretched to the column */}
					{placement === "sidebar" && (
						<div className="mb-4">
							<VersionSwitch
								value={version}
								onChange={switchVersion}
								block
								aria-label="Effect version for this playground"
							/>
						</div>
					)}
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
					{/* Placement · bar — a real toolbar row in flow above the code,
					    carrying the filename, the switch and the actions together */}
					{placement === "bar" && (
						<div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
							<span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
								{activeFile}
							</span>
							<div className="ml-auto flex items-center gap-2">
								{versionSwitch}
								{actionButtons}
							</div>
						</div>
					)}

					{/* Floating actions — top-right of the editor */}
					{placement !== "bar" && (
						<div
							className={`pointer-events-none absolute top-2 right-3 z-10 flex ${
								placement === "stacked"
									? "flex-col items-end gap-2"
									: "items-center gap-2"
							}`}
						>
							{/* Placement · toolbar — leading the consequence cluster */}
							{placement === "toolbar" && (
								<div className="pointer-events-auto mr-1">{versionSwitch}</div>
							)}
							<div className="flex items-center gap-2">{actionButtons}</div>
							{/* Placement · stacked — a second row beneath the action cluster */}
							{placement === "stacked" && (
								<div className="pointer-events-auto">{versionSwitch}</div>
							)}
						</div>
					)}
					<pre className="m-0 flex">
						{/* Gutter */}
						<div
							aria-hidden="true"
							className="sticky left-0 shrink-0 select-none border-r border-zinc-200 bg-white px-4 py-4 text-right text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
						>
							{fileLines.map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: the index is the line number, and the buffer is regenerated wholesale when the file or version changes
								<div key={i} className="tabular-nums">
									{i + 1}
								</div>
							))}
						</div>
						{/* Code */}
						<code className="block flex-1 px-4 py-4">
							{fileLines.map((line, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: the index is the line number, and the buffer is regenerated wholesale when the file or version changes
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
				<div
					role="tablist"
					className="flex border-b border-zinc-200 dark:border-zinc-800"
				>
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
										: "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
							{terminalLines(version).map((line) => (
								<div key={`${line.time}-${line.text}`} className="flex gap-3">
									<span className="shrink-0 text-zinc-500 dark:text-zinc-400 tabular-nums">
										{line.time}
									</span>
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
						<p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
							// Trace view goes here. Mockup only.
						</p>
					)}
				</div>
			</div>

			{/* Placement rail — study affordance, not part of the design. Delete it
			    along with the two losing placements once one is chosen. */}
			<div className="fixed bottom-4 left-4 z-50 flex flex-col gap-1 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
				<p className="px-2 pt-1 pb-0.5 font-mono text-[10px] tracking-wider text-zinc-500 uppercase dark:text-zinc-500">
					{"// placement"}
				</p>
				<div role="tablist" aria-label="Version switch placement">
					{PLACEMENTS.map(({ value, label }) => {
						const active = placement === value;
						return (
							<button
								key={value}
								type="button"
								role="tab"
								aria-selected={active}
								onClick={() => setPlacement(value)}
								className={`block w-full rounded px-3 py-1.5 text-left font-mono text-xs font-medium transition-colors ${
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
			</div>

			<GridOverlay />

			{/* Reset confirmation dialog */}
			{resetConfirmOpen && (
				<div
					role="dialog"
					aria-modal="true"
					aria-labelledby="reset-dialog-title"
					aria-describedby="reset-dialog-description"
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
				>
					{/* Overlay */}
					<button
						type="button"
						aria-label="Close dialog"
						onClick={() => setResetConfirmOpen(false)}
						className="absolute inset-0 animate-[fadeIn_0.2s_ease-out] bg-black/25 backdrop-blur-xs"
					/>

					{/* Dialog panel */}
					<div className="relative w-full max-w-md animate-[dialogIn_0.25s_ease-out] rounded-md border border-zinc-300 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
						<h2
							id="reset-dialog-title"
							className="leading-tighter text-lg font-semibold text-zinc-900 dark:text-white"
						>
							Reset playground?
						</h2>
						<p
							id="reset-dialog-description"
							className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
						>
							This will discard your current code and restore the default
							example. This action can't be undone.
						</p>
						<div className="mt-6 flex items-center justify-end gap-3">
							<Button
								variant="secondary"
								size="md"
								onClick={() => setResetConfirmOpen(false)}
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="md"
								onClick={() => setResetConfirmOpen(false)}
							>
								Reset
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
