import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import {
	localStore,
	type ModuleRequest,
	type ModuleRequestsStore,
	NAME_MAX_LENGTH,
} from "./moduleRequests";

/** Rows shown before "Show all". */
const COLLAPSED_COUNT = 6;

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

	const visible = expanded ? ordered : ordered.slice(0, COLLAPSED_COUNT);

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
			if (index >= COLLAPSED_COUNT) setExpanded(true);
			flash(target.id);
		} finally {
			setBusy(false);
		}
	};

	return (
		<section aria-labelledby="requests-title" className="py-24 md:pt-32">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
					{"// Up next"}
				</p>
				<h2
					id="requests-title"
					className="leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white"
				>
					Vote for the next module
				</h2>
				<p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
					Suggest a part of Effect you'd like covered, or +1 the ones you want
					to see next.
				</p>

				<div className="mt-10 border border-zinc-200 dark:border-zinc-800">
					{/* Suggest */}
					<form
						onSubmit={submit}
						className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center lg:px-6 dark:border-zinc-800"
					>
						<label htmlFor="module-suggestion" className="sr-only">
							Suggest a module
						</label>
						<input
							id="module-suggestion"
							value={draft}
							onChange={(e) => {
								setDraft(e.target.value);
								if (message?.tone === "error") setMessage(null);
							}}
							maxLength={NAME_MAX_LENGTH}
							autoComplete="off"
							placeholder="Suggest a module, e.g. Schedule"
							aria-describedby="module-suggestion-message"
							aria-invalid={message?.tone === "error"}
							className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
						/>
						<Button type="submit" variant="secondary" disabled={busy}>
							<Icon name="plus" className="text-sm" />
							Suggest
						</Button>
					</form>
					<p
						id="module-suggestion-message"
						aria-live="polite"
						className={`px-4 text-sm lg:px-6 ${
							message
								? `border-b border-zinc-200 py-2.5 dark:border-zinc-800 ${
										message.tone === "error"
											? "text-red-600 dark:text-red-400"
											: "text-zinc-600 dark:text-zinc-400"
									}`
								: "sr-only"
						}`}
					>
						{message?.text}
					</p>

					{/* Ranking */}
					{requests === null ? (
						<p className="px-4 py-6 text-sm text-zinc-500 lg:px-6 dark:text-zinc-400">
							Loading suggestions…
						</p>
					) : (
						<ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
							{visible.map((request, i) => (
								<li
									key={request.id}
									className={`flex items-center gap-4 px-4 py-3 transition-colors duration-700 lg:px-6 ${
										highlight === request.id
											? "bg-zinc-100 dark:bg-zinc-900"
											: "bg-white dark:bg-zinc-950"
									}`}
								>
									<span className="w-6 shrink-0 font-mono text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="min-w-0 flex-1 truncate text-base font-medium text-zinc-900 dark:text-white">
										{request.name}
									</span>
									<button
										type="button"
										onClick={() => toggleVote(request)}
										aria-pressed={request.voted}
										aria-label={`${request.voted ? "Remove your +1 from" : "+1"} ${request.name}, ${request.votes} ${request.votes === 1 ? "vote" : "votes"}`}
										className={`inline-flex min-w-16 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors ${
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
						</ol>
					)}

					{ordered.length > COLLAPSED_COUNT && (
						<button
							type="button"
							onClick={() => setExpanded((e) => !e)}
							className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/60 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
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
