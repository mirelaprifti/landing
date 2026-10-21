import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import {
	localStore,
	type ModuleRequest,
	type ModuleRequestsStore,
	NAME_MAX_LENGTH,
} from "./moduleRequests";

/** Rows shown before "Show all", at every width. */
const ROWS = 3;
/** Columns per breakpoint: phones 1, sm 2, lg 4. */
const COLS = { base: 1, sm: 2, lg: 4 } as const;
const LIMIT = {
	base: ROWS * COLS.base,
	sm: ROWS * COLS.sm,
	lg: ROWS * COLS.lg,
} as const;

/** Display classes for something shown only where `show` holds per width. */
const showAt = (base: boolean, sm: boolean, lg: boolean, display = "flex") =>
	`${base ? display : "hidden"} ${sm ? `sm:${display}` : "sm:hidden"} ${lg ? `lg:${display}` : "lg:hidden"}`;

/** How many items fit in three rows at the current width. */
const currentLimit = () =>
	window.matchMedia("(min-width: 64rem)").matches
		? LIMIT.lg
		: window.matchMedia("(min-width: 40rem)").matches
			? LIMIT.sm
			: LIMIT.base;

const byVotes = (a: ModuleRequest, b: ModuleRequest) =>
	b.votes - a.votes || a.name.localeCompare(b.name);

/**
 * "Vote for the next module": anyone can suggest a module or +1 the ones
 * they want covered. Ranked by votes; the order is fixed for the visit
 * (re-sorted on load and after a suggestion, not on every vote) so a row
 * never jumps away from under the pointer.
 */
export function ModuleRequestsSection({
	store = localStore,
}: {
	store?: ModuleRequestsStore;
}) {
	const [requests, setRequests] = useState<ModuleRequest[] | null>(null);
	const [order, setOrder] = useState<string[]>([]);
	const [expanded, setExpanded] = useState(false);
	const [draft, setDraft] = useState("");
	const [message, setMessage] = useState<{
		tone: "ok" | "error";
		text: string;
	} | null>(null);
	const [highlight, setHighlight] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);

	const sync = (list: ModuleRequest[], resort: boolean) => {
		setRequests(list);
		if (resort) setOrder([...list].sort(byVotes).map((r) => r.id));
	};

	useEffect(() => {
		store.list().then((list) => {
			setRequests(list);
			setOrder([...list].sort(byVotes).map((r) => r.id));
		});
	}, [store]);

	const ordered = useMemo(() => {
		if (!requests) return [];
		const byId = new Map(requests.map((r) => [r.id, r]));
		return order.flatMap((id) => byId.get(id) ?? []);
	}, [requests, order]);

	const flash = (id: string) => {
		setHighlight(id);
		window.setTimeout(() => setHighlight((h) => (h === id ? null : h)), 2400);
	};

	const toggleVote = async (request: ModuleRequest) => {
		const updated = await store.vote(request.id, !request.voted);
		setRequests((list) =>
			(list ?? []).map((r) => (r.id === updated.id ? updated : r)),
		);
	};

	const submit = async (event: FormEvent) => {
		event.preventDefault();
		if (busy) return;
		setBusy(true);
		try {
			const result = await store.suggest(draft);
			if (result.status === "invalid") {
				setMessage({ tone: "error", text: result.reason });
				return;
			}
			let target = result.request;
			if (result.status === "exists" && !target.voted) {
				target = await store.vote(target.id, true);
			}
			sync(await store.list(), true);
			setDraft("");
			setMessage({
				tone: "ok",
				text:
					result.status === "created"
						? `Added "${target.name}" with your +1.`
						: `"${target.name}" is already on the list. Your +1 is in.`,
			});
			// Make sure the row is on screen, then mark it
			const index = [...(await store.list())]
				.sort(byVotes)
				.findIndex((r) => r.id === target.id);
			if (index >= currentLimit()) setExpanded(true);
			flash(target.id);
		} finally {
			setBusy(false);
		}
	};

	// Empty cells close the last row of the hairline grid at each width
	// Collapsed, each width shows three rows; the button appears only where
	// there's more than that.
	const total = ordered.length;
	const shownAt = (limit: number) =>
		expanded ? total : Math.min(total, limit);
	const smFill = shownAt(LIMIT.sm) % COLS.sm ? 1 : 0;
	const lgFill = (COLS.lg - (shownAt(LIMIT.lg) % COLS.lg)) % COLS.lg;
	const fillers = Array.from({ length: Math.max(smFill, lgFill) }, (_, n) => ({
		key: `filler-${n}`,
		className: showAt(false, n < smFill, n < lgFill, "block"),
	}));

	return (
		<section aria-labelledby="requests-title">
			{/* Section header as the site's canonical section (styleguide
			    text styles; header in the left half, up to the page's centre
			    line; py-24 md:pt-40 rhythm; mt-12 to the content) */}
			<div className="mx-auto w-full max-w-[73.75rem] px-4 py-24 md:pt-40">
				{/* Header row: the text in the left half, the suggest field in
				    the right half, bottom-aligned with the subtitle (the
				    Enterprise section's "action right" placement) */}
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
					<div className="lg:w-1/2 lg:pr-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							{"// Up next"}
						</p>
						<h2
							id="requests-title"
							className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
						>
							Vote for the next module
						</h2>
						<p className="mt-4 max-w-2xl text-lg text-pretty text-zinc-600 dark:text-zinc-400">
							Suggest a part of Effect you'd like covered, or +1 the ones you
							want to see next.
						</p>
					</div>

					<form onSubmit={submit} className="relative lg:w-1/2 lg:pl-4">
						<label htmlFor="module-suggestion" className="sr-only">
							Suggest a module
						</label>
						<div className="flex gap-3">
							<input
								id="module-suggestion"
								value={draft}
								onChange={(e) => {
									setDraft(e.target.value);
									if (message?.tone === "error") setMessage(null);
								}}
								maxLength={NAME_MAX_LENGTH}
								autoComplete="off"
								placeholder="Suggest a module"
								aria-describedby="module-suggestion-message"
								aria-invalid={message?.tone === "error"}
								className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
							/>
							<Button type="submit" variant="secondary" disabled={busy}>
								<Icon name="plus" className="text-sm" />
								Suggest
							</Button>
						</div>
						{/* Under the field, out of the flow so it never shifts the
						    header's alignment */}
						<p
							id="module-suggestion-message"
							aria-live="polite"
							className={`text-sm ${
								message
									? `mt-3 lg:absolute lg:top-full lg:right-0 lg:left-4 lg:mt-3 ${
											message.tone === "error"
												? "text-red-600 dark:text-red-400"
												: "text-zinc-600 dark:text-zinc-400"
										}`
									: "sr-only"
							}`}
						>
							{message?.text}
						</p>
					</form>
				</div>

				<div className="mt-12 border border-zinc-200 dark:border-zinc-800">
					{/* Ranking: four across on desktop, two on tablet, one on
					    phones, read left to right then down */}
					{requests === null ? (
						<p className="px-4 py-6 text-sm text-zinc-500 lg:px-5 dark:text-zinc-400">
							Loading suggestions…
						</p>
					) : (
						<ol className="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:bg-zinc-800">
							{ordered.map((request, i) => (
								<li
									key={request.id}
									className={`${
										expanded
											? "flex"
											: showAt(i < LIMIT.base, i < LIMIT.sm, i < LIMIT.lg)
									} items-center gap-3 px-4 py-2.5 transition-colors duration-700 lg:px-5 ${
										highlight === request.id
											? "bg-zinc-100 dark:bg-zinc-900"
											: "bg-white dark:bg-zinc-950"
									}`}
								>
									<span className="w-5 shrink-0 font-mono text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-900 dark:text-white">
										{request.name}
									</span>
									<button
										type="button"
										onClick={() => toggleVote(request)}
										aria-pressed={request.voted}
										aria-label={`${request.voted ? "Remove your +1 from" : "+1"} ${request.name}, ${request.votes} ${request.votes === 1 ? "vote" : "votes"}`}
										className={`inline-flex min-w-14 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs tabular-nums transition-colors ${
											request.voted
												? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
												: "border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
										}`}
									>
										<Icon name="arrow-up" className="text-xs" />
										{request.votes}
									</button>
								</li>
							))}
							{fillers.map((cell) => (
								<li
									key={cell.key}
									aria-hidden="true"
									className={`hidden bg-white dark:bg-zinc-950 ${cell.className}`}
								/>
							))}
						</ol>
					)}

					{total > LIMIT.base && (
						<button
							type="button"
							onClick={() => setExpanded((e) => !e)}
							className={`${showAt(total > LIMIT.base, total > LIMIT.sm, total > LIMIT.lg)} w-full cursor-pointer items-center justify-center gap-1.5 border-t border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/60 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white`}
						>
							{expanded ? "Show fewer" : `Show all ${ordered.length}`}
							<Icon
								name="chevron-down"
								className={`text-sm transition-transform ${expanded ? "rotate-180" : ""}`}
							/>
						</button>
					)}
				</div>
			</div>
		</section>
	);
}
