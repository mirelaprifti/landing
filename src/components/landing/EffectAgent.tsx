import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { agentContext } from "./dispatchData";

/**
 * The Effect agent: a terminal-style prompt docked to the bottom of every
 * page. Collapsed, it's one line; focused or asked, it opens a conversation
 * panel above the bar. Esc or × closes it.
 *
 * SIMULATION: this design copy has no AI backend. Questions are matched to
 * intents and answered only from the site's own data (events, newsletter,
 * release, module, numbers), with scripted "reading…" steps and a streamed
 * reply. On the live site the same UI would call a real agent grounded in
 * Effect's content (see the auto-feed plan, phase 3).
 */

export type AgentContext = {
	events: {
		title: string;
		date: string;
		place: string;
		status?: string;
		when: string;
		href: string;
	}[];
	issue?: { number: string; highlights: string[]; when: string; href: string };
	release?: { title: string; highlights: string[]; when: string; href: string };
	module?: { title: string; pkg?: string; when: string; href: string };
	stats: { patch: string; downloads: string; stars: string; roles: number };
	jobsHref: string;
	lumaHref: string;
};

type Line = { text: string; href?: string };
type Reply = { steps: string[]; lines: Line[] };
type Exchange = { question: string; reply: Reply };

/** Badge, verbatim from the styleguide; used for the suggestion chips. */
const BADGE =
	"rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";
const CARD_BODY = "text-sm leading-normal text-zinc-600 dark:text-zinc-400";
const MICRO =
	"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";

const SUGGESTIONS = [
	"What's new this week?",
	"Upcoming events",
	"What's in 4.1?",
	"Who's hiring?",
];

/** Words that name an event on their own ("days", "warsaw", "office"). */
const eventWords = (title: string) =>
	title
		.toLowerCase()
		.split(/[^a-z]+/)
		.filter((w) => w.length > 3 && w !== "effect");

/** Simulated agent: intent by keywords, answer from the site's data. */
function answer(q: string, ctx: AgentContext): Reply {
	const t = q.toLowerCase();
	const has = (...words: string[]) => words.some((w) => t.includes(w));

	// A question about one event answers about that event only
	const named = ctx.events.filter((e) =>
		eventWords(e.title).some((w) => t.includes(w)),
	);
	if (named.length)
		return {
			steps: ["Checking the Effect community calendar on Luma"],
			lines: named.map((e) => ({
				text: `${e.title}: ${e.date} (${e.when.toLowerCase()}), ${e.place}${e.status ? `. ${e.status}.` : "."}`,
				href: e.href,
			})),
		};

	if (has("event", "meetup", "conference", "next", "calendar"))
		return {
			steps: ["Checking the Effect community calendar on Luma"],
			lines: [
				{ text: `${ctx.events.length} upcoming:` },
				...ctx.events.map((e) => ({
					text: `${e.title} · ${e.date} (${e.when.toLowerCase()}) · ${e.place}${e.status ? ` · ${e.status.toLowerCase()}` : ""}`,
					href: e.href,
				})),
				{ text: "Full calendar on Luma", href: ctx.lumaHref },
			],
		};

	if (has("release", "version", "4.1", "patch", "upgrade", "changelog"))
		return {
			steps: ["Reading release notes", "Checking GitHub releases"],
			lines: [
				ctx.release
					? {
							text: `${ctx.release.title} came out ${ctx.release.when.toLowerCase()}. New: ${ctx.release.highlights.join(", ")}.`,
							href: ctx.release.href,
						}
					: { text: "No recent release notes." },
				{ text: `Latest patch: ${ctx.stats.patch}.` },
			],
		};

	if (has("module", "cluster", "workflow", "learn", "tutorial"))
		return {
			steps: ["Reading Module of the Week"],
			lines: ctx.module
				? [
						{
							text: `This week: ${ctx.module.title}${ctx.module.pkg ? ` (from "${ctx.module.pkg}")` : ""}, published ${ctx.module.when.toLowerCase()}.`,
							href: ctx.module.href,
						},
						{ text: "It's the last part of the Cluster series." },
					]
				: [{ text: "No module this week yet." }],
		};

	if (has("job", "hiring", "hire", "role", "work", "career"))
		return {
			steps: ["Checking the Effect Jobs board"],
			lines: [
				{
					text: `${ctx.stats.roles} open roles at companies building with Effect.`,
					href: ctx.jobsHref,
				},
			],
		};

	if (has("download", "star", "popular", "stats", "how many", "growth"))
		return {
			steps: ["Fetching npm and GitHub numbers"],
			lines: [
				{
					text: `${ctx.stats.downloads} weekly downloads on npm, ${ctx.stats.stars} stars on GitHub, ${ctx.stats.roles} open roles.`,
				},
			],
		};

	if (has("new", "week", "latest", "update", "news", "happening"))
		return {
			steps: [
				`Reading This Week in Effect #${ctx.issue?.number ?? ""}`,
				"Checking the calendar",
			],
			lines: [
				...(ctx.issue
					? [
							{
								text: `From issue #${ctx.issue.number} (${ctx.issue.when.toLowerCase()}):`,
							},
							...ctx.issue.highlights.map((h) => ({ text: `· ${h}` })),
						]
					: []),
				...(ctx.events[0]
					? [
							{
								text: `Next up: ${ctx.events[0].title}, ${ctx.events[0].when.toLowerCase()}.`,
								href: ctx.events[0].href,
							},
						]
					: []),
				...(ctx.issue
					? [{ text: "Read the full issue", href: ctx.issue.href }]
					: []),
			],
		};

	if (has("help", "what can you"))
		return {
			steps: [],
			lines: [
				{
					text: "Ask me about upcoming events, this week's news, releases, Module of the Week, jobs, or Effect's numbers.",
				},
			],
		};

	return {
		steps: ["Searching recent updates"],
		lines: [
			{ text: "Nothing about that in the latest updates." },
			{ text: "Try the docs", href: "/docs" },
		],
	};
}

const isExternal = (href: string) => href.startsWith("http");

/** Streams an exchange: steps one by one, then the answer character by character. */
function ExchangeView({
	exchange,
	live,
	onDone,
}: {
	exchange: Exchange;
	live: boolean;
	onDone: () => void;
}) {
	const { steps, lines } = exchange.reply;
	const total = lines.reduce((n, l) => n + l.text.length, 0);
	const [shownSteps, setShownSteps] = useState(live ? 0 : steps.length);
	const [chars, setChars] = useState(live ? 0 : total);

	useEffect(() => {
		if (!live) return;
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setShownSteps(steps.length);
			setChars(total);
			onDone();
			return;
		}
		if (shownSteps < steps.length) {
			const t = window.setTimeout(() => setShownSteps((n) => n + 1), 550);
			return () => window.clearTimeout(t);
		}
		if (chars < total) {
			const t = window.setTimeout(
				() => setChars((c) => Math.min(c + 3, total)),
				16,
			);
			return () => window.clearTimeout(t);
		}
		onDone();
	}, [live, shownSteps, chars, steps.length, total, onDone]);

	let budget = chars;
	const thinking = live && shownSteps < steps.length;

	return (
		<div className="space-y-2">
			<p className="font-mono text-sm text-zinc-900 dark:text-white">
				<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">
					${" "}
				</span>
				{exchange.question}
			</p>
			{steps.slice(0, shownSteps).map((step) => (
				<p
					key={step}
					className="font-mono text-xs text-zinc-500 dark:text-zinc-400"
				>
					<span aria-hidden="true">↳ </span>
					{step}…
				</p>
			))}
			{thinking && (
				<p className="font-mono text-xs text-zinc-500 motion-safe:animate-pulse dark:text-zinc-400">
					thinking…
				</p>
			)}
			{!thinking && (
				<div className="space-y-1">
					{lines.map((line, i) => {
						if (budget <= 0) return null;
						const visible = line.text.slice(0, budget);
						budget -= line.text.length;
						const done = visible.length === line.text.length;
						return (
							<p key={i} className={CARD_BODY}>
								{line.href && done ? (
									<a
										href={line.href}
										{...(isExternal(line.href)
											? { target: "_blank", rel: "noopener noreferrer" }
											: {})}
										className="text-zinc-900 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900 dark:text-white dark:decoration-zinc-600 dark:hover:decoration-white"
									>
										{visible}
									</a>
								) : (
									visible
								)}
							</p>
						);
					})}
				</div>
			)}
		</div>
	);
}

/** The docked agent, rendered once per page by the base layout. */
export function EffectAgent() {
	const context = useMemo(() => agentContext(Date.now()), []);
	const [open, setOpen] = useState(false);
	const [history, setHistory] = useState<Exchange[]>([]);
	const [busy, setBusy] = useState(false);
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const onDone = useCallback(() => setBusy(false), []);

	const ask = (question: string) => {
		const q = question.trim();
		if (!q || busy) return;
		setOpen(true);
		setBusy(true);
		setValue("");
		setHistory((h) => [
			...h.slice(-4),
			{ question: q, reply: answer(q, context) },
		]);
	};

	// ⌘I / Ctrl+I opens and focuses the prompt from anywhere; Esc closes
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
				e.preventDefault();
				setOpen(true);
				inputRef.current?.focus();
			} else if (e.key === "Escape" && open) {
				setOpen(false);
				inputRef.current?.blur();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	// Keep the newest reply in view while it streams
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const id = window.setInterval(() => {
			el.scrollTop = el.scrollHeight;
		}, 100);
		if (!busy) {
			el.scrollTop = el.scrollHeight;
			window.clearInterval(id);
		}
		return () => window.clearInterval(id);
	}, [busy, history.length]);

	return (
		<div
			className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4"
			style={{
				paddingBottom: "max(16px, env(safe-area-inset-bottom, 0px))",
			}}
		>
			<div className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
				{open && (
					<div className="border-b border-zinc-200 dark:border-zinc-800">
						<div className="flex items-center justify-between gap-3 px-4 py-3">
							<span className={MICRO}>Effect agent</span>
							<button
								type="button"
								onClick={() => setOpen(false)}
								aria-label="Close the Effect agent"
								className="font-mono text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-zinc-400 dark:text-zinc-400 dark:hover:text-white"
							>
								×
							</button>
						</div>
						<div
							ref={scrollRef}
							aria-live="polite"
							className="max-h-[50vh] space-y-6 overflow-y-auto px-4 pb-4"
						>
							{history.length === 0 ? (
								<div className="space-y-3">
									<p className={CARD_BODY}>
										Ask about events, this week's news, releases, Module of the
										Week, or jobs.
									</p>
									<div className="flex flex-wrap gap-2">
										{SUGGESTIONS.map((s) => (
											<button
												key={s}
												type="button"
												onClick={() => {
													ask(s);
													inputRef.current?.focus();
												}}
												className={`${BADGE} transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:hover:bg-zinc-900`}
											>
												{s}
											</button>
										))}
									</div>
								</div>
							) : (
								history.map((ex, i) => (
									<ExchangeView
										key={`${i}-${ex.question}`}
										exchange={ex}
										live={busy && i === history.length - 1}
										onDone={onDone}
									/>
								))
							)}
						</div>
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						ask(value);
					}}
					className="flex items-center gap-2 px-4 py-3 font-mono text-sm"
				>
					<label htmlFor="effect-agent-input" className="sr-only">
						Ask the Effect agent
					</label>
					<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-500">
						$
					</span>
					<input
						ref={inputRef}
						id="effect-agent-input"
						type="text"
						autoComplete="off"
						spellCheck={false}
						value={value}
						onFocus={() => setOpen(true)}
						onChange={(e) => setValue(e.target.value)}
						disabled={busy}
						placeholder={busy ? "" : "Ask Effect anything…"}
						className="min-w-0 flex-1 bg-transparent text-zinc-900 caret-zinc-900 outline-none placeholder:text-zinc-400 disabled:opacity-60 dark:text-white dark:caret-white dark:placeholder:text-zinc-500"
					/>
					<kbd
						aria-hidden="true"
						className="hidden shrink-0 rounded-sm border border-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-500 sm:block dark:border-zinc-800 dark:text-zinc-400"
					>
						⌘I
					</kbd>
				</form>
			</div>
		</div>
	);
}
