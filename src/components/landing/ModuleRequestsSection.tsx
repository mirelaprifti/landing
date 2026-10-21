import {
	type FormEvent,
	type KeyboardEvent,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { Icon } from "@/components/ui/Icon";
import {
	localStore,
	type ModuleRef,
	type ModuleRequest,
	type ModuleRequestsStore,
	searchModules,
} from "./moduleRequests";

/** Modules shown at first, and added per "Show more" (three full rows of
 *  four on desktop). */
const STEP = 12;
/** Columns per breakpoint: phones 1, sm 2, lg 4. */
const COLS = { base: 1, sm: 2, lg: 4 } as const;

/** Display classes for something shown only where the flag holds per width. */
const showAt = (base: boolean, sm: boolean, lg: boolean, display = "flex") =>
	`${base ? display : "hidden"} ${sm ? `sm:${display}` : "sm:hidden"} ${lg ? `lg:${display}` : "lg:hidden"}`;

const byVotes = (a: ModuleRequest, b: ModuleRequest) =>
	b.votes - a.votes || a.name.localeCompare(b.name);

const voteLabel = (n: number) => `${n} ${n === 1 ? "vote" : "votes"}`;

/**
 * "What should we cover next?": people search the real module list (~580
 * modules) and +1 the ones they want covered. The search doubles as the way
 * to find a module already on the ranking, so the ranking itself only needs
 * to show the top twelve. Its order is fixed for the visit (re-sorted on
 * load and when a module joins), so a row never jumps away from the pointer.
 */
export function ModuleRequestsSection({
	moduleIndex,
	covered = [],
	store = localStore,
}: {
	moduleIndex: ModuleRef[];
	/** Module ids the series has already covered: shown, not votable. */
	covered?: string[];
	store?: ModuleRequestsStore;
}) {
	const [requests, setRequests] = useState<ModuleRequest[] | null>(null);
	const [order, setOrder] = useState<string[]>([]);
	const [count, setCount] = useState(STEP);
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const [message, setMessage] = useState<{
		tone: "ok" | "error";
		text: string;
	} | null>(null);
	const [highlight, setHighlight] = useState<string | null>(null);
	const listboxId = useId();
	const inputRef = useRef<HTMLInputElement>(null);

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

	const votesById = useMemo(
		() => new Map((requests ?? []).map((r) => [r.id, r])),
		[requests],
	);
	const coveredIds = useMemo(() => new Set(covered), [covered]);
	const results = useMemo(
		() => searchModules(moduleIndex, query),
		[moduleIndex, query],
	);

	const flash = (id: string) => {
		setHighlight(id);
		window.setTimeout(() => setHighlight((h) => (h === id ? null : h)), 2400);
	};

	const toggleVote = async (request: ModuleRequest) => {
		const updated = await store.vote(request, !request.voted);
		setRequests((list) =>
			(list ?? []).map((r) => (r.id === updated.id ? updated : r)),
		);
	};

	/** +1 a module picked from the search. */
	const pick = async (module: ModuleRef) => {
		setOpen(false);
		setQuery("");
		if (coveredIds.has(module.id)) {
			setMessage({
				tone: "error",
				text: `${module.name} has already been covered. Find it in the modules above.`,
			});
			return;
		}
		// Name plus package, since some names exist in more than one package
		const label = `${module.name} (${module.pkg})`;
		const existing = votesById.get(module.id);
		const wasVoted = existing?.voted ?? false;
		if (!wasVoted) await store.vote(module, true);
		const list = await store.list();
		setRequests(list);
		const nextOrder = existing
			? order
			: [...list].sort(byVotes).map((r) => r.id);
		if (!existing) setOrder(nextOrder);
		setMessage({
			tone: "ok",
			text: wasVoted
				? `You've already +1'd ${label}.`
				: existing
					? `+1 added to ${label}.`
					: `Added ${label} with your +1.`,
		});
		// Make sure its row is on screen, then mark it
		const index = nextOrder.indexOf(module.id);
		if (index >= count) setCount(Math.ceil((index + 1) / STEP) * STEP);
		flash(module.id);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setOpen(true);
			setActive((i) => Math.min(i + 1, results.length - 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	};

	const submit = (event: FormEvent) => {
		event.preventDefault();
		const choice = results[active] ?? results[0];
		if (!query.trim()) {
			inputRef.current?.focus();
			setMessage({ tone: "error", text: "Search for a module to +1." });
		} else if (!choice) {
			setMessage({
				tone: "error",
				text: `No module matches "${query.trim()}". Try another name.`,
			});
		} else {
			pick(choice);
		}
	};

	// The ranking shows the top `count` modules at every width
	const total = ordered.length;
	const shown = Math.min(total, count);
	const smFill = shown % COLS.sm ? 1 : 0;
	const lgFill = (COLS.lg - (shown % COLS.lg)) % COLS.lg;
	const fillers = Array.from({ length: Math.max(smFill, lgFill) }, (_, n) => ({
		key: `filler-${n}`,
		className: showAt(false, n < smFill, n < lgFill, "block"),
	}));
	const showDrop = open && query.trim().length > 0;

	return (
		<section
			// #vote: linked from the hero and shareable (Discord, video
			// descriptions); scroll-mt clears the sticky navbar
			id="vote"
			aria-labelledby="requests-title"
			className="scroll-mt-16"
		>
			{/* Section header as the site's canonical section (styleguide
			    text styles; header in the left half, up to the page's centre
			    line; py-24 md:pt-40 rhythm; mt-12 to the content) */}
			<div className="mx-auto w-full max-w-[73.75rem] px-4 py-24 md:pt-40">
				<div className="lg:w-1/2 lg:pr-4">
					<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
						{"// Vote for the next module"}
					</p>
					<h2
						id="requests-title"
						className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
					>
						What should we cover next?
					</h2>

					{/* Search the module list; picking a result +1s it */}
					<form onSubmit={submit} className="relative mt-8">
						<label htmlFor="module-search" className="sr-only">
							Search for a module to +1
						</label>
						{/* One joined control: the search and its action share a
						    frame, split by a hairline. `search-pill` (globals.css)
						    draws the focus ring once around the frame, as the navbar
						    and API reference searches do. */}
						<div className="search-pill flex overflow-hidden rounded-md border border-zinc-300 transition-colors focus-within:border-zinc-500 dark:border-zinc-600 dark:focus-within:border-zinc-500">
							<div className="relative min-w-0 flex-1">
								<Icon
									name="search"
									aria-hidden="true"
									className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-base text-zinc-500 dark:text-zinc-400"
								/>
								<input
									ref={inputRef}
									id="module-search"
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
										setActive(0);
										setOpen(true);
										if (message?.tone === "error") setMessage(null);
									}}
									onFocus={() => setOpen(true)}
									onBlur={() => window.setTimeout(() => setOpen(false), 120)}
									onKeyDown={onKeyDown}
									autoComplete="off"
									spellCheck={false}
									placeholder={`Search ${moduleIndex.length} modules`}
									role="combobox"
									aria-expanded={showDrop}
									aria-controls={listboxId}
									aria-autocomplete="list"
									aria-activedescendant={
										showDrop && results[active]
											? `${listboxId}-${active}`
											: undefined
									}
									aria-describedby="module-suggestion-message"
									aria-invalid={message?.tone === "error"}
									className="w-full bg-transparent py-2.5 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none dark:text-white dark:placeholder:text-zinc-400"
								/>
							</div>
							<button
								type="submit"
								className="inline-flex shrink-0 cursor-pointer items-center gap-2 border-l border-zinc-300 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800"
							>
								<Icon name="plus" className="text-sm" />
								Suggest
							</button>
						</div>

						{/* Results: name, package, and where it stands */}
						{showDrop && (
							<div
								id={listboxId}
								role="listbox"
								aria-label="Matching modules"
								className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-md border border-zinc-300 bg-white shadow-lg shadow-black/10 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-black/40"
							>
								{results.length === 0 ? (
									<div className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">
										No module matches “{query.trim()}”
									</div>
								) : (
									results.map((module, i) => {
										const request = votesById.get(module.id);
										const isCovered = coveredIds.has(module.id);
										return (
											<div
												key={module.id}
												tabIndex={-1}
												id={`${listboxId}-${i}`}
												role="option"
												aria-selected={i === active}
												aria-disabled={isCovered}
												onMouseDown={(e) => {
													e.preventDefault();
													pick(module);
												}}
												onMouseEnter={() => setActive(i)}
												className={`flex cursor-pointer items-baseline gap-3 px-4 py-2.5 text-sm ${
													i === active ? "bg-zinc-100 dark:bg-zinc-900" : ""
												}`}
											>
												<span
													className={`font-medium ${isCovered ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-900 dark:text-white"}`}
												>
													{module.name}
												</span>
												<span className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
													{module.pkg}
												</span>
												<span className="ml-auto shrink-0 font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
													{isCovered
														? "Covered"
														: request?.voted
															? "Your +1 ✓"
															: request
																? voteLabel(request.votes)
																: "+1"}
												</span>
											</div>
										);
									})
								)}
							</div>
						)}
					</form>
					{/* Confirmation or error, right under the search */}
					<p
						id="module-suggestion-message"
						aria-live="polite"
						className={`text-sm ${
							message
								? `mt-3 ${
										message.tone === "error"
											? "text-red-600 dark:text-red-400"
											: "text-zinc-600 dark:text-zinc-400"
									}`
								: "sr-only"
						}`}
					>
						{message?.text}
					</p>
				</div>

				{/* Ranking: four across on desktop, two on tablet, one on
				    phones, read left to right then down */}
				<div className="mt-12 border border-zinc-200 dark:border-zinc-800">
					{requests === null ? (
						<p className="px-4 py-6 text-sm text-zinc-500 lg:px-5 dark:text-zinc-400">
							Loading suggestions…
						</p>
					) : (
						<ol className="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4 dark:bg-zinc-800">
							{ordered.map((request, i) => (
								<li
									key={request.id}
									className={`${i < count ? "flex" : "hidden"} items-center gap-3 px-4 py-2.5 transition-colors duration-700 lg:px-5 ${
										highlight === request.id
											? "bg-zinc-100 dark:bg-zinc-900"
											: "bg-white dark:bg-zinc-950"
									}`}
								>
									<span className="w-6 shrink-0 font-mono text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="flex min-w-0 flex-1 flex-col">
										<span className="truncate text-sm font-medium text-zinc-900 dark:text-white">
											{request.name}
										</span>
										<span className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
											{request.pkg}
										</span>
									</span>
									<button
										type="button"
										onClick={() => toggleVote(request)}
										aria-pressed={request.voted}
										aria-label={`${request.voted ? "Remove your +1 from" : "+1"} ${request.name}, ${voteLabel(request.votes)}`}
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

					{/* Grow twelve at a time; collapse back once expanded */}
					{(total > count || count > STEP) && (
						<div className="flex border-t border-zinc-200 dark:border-zinc-800">
							<button
								type="button"
								onClick={() => setCount((c) => c + STEP)}
								className={`${total > count ? "flex" : "hidden"} flex-1 cursor-pointer items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white`}
							>
								Show more
								<Icon name="chevron-down" className="text-sm" />
							</button>
							{count > STEP && (
								<button
									type="button"
									onClick={() => setCount(STEP)}
									className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-l border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors first:border-l-0 hover:bg-zinc-100/60 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
								>
									Show fewer
									<Icon name="chevron-down" className="rotate-180 text-sm" />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
