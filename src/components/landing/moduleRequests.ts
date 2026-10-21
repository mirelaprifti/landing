/**
 * Storage for Module of the Week suggestions and votes.
 *
 * Suggestions are picked from the real module list (the API reference data,
 * ~580 modules across ~36 packages), never typed freely, so every vote lands
 * on one exact module — no duplicates, typos or spam to moderate. A module
 * is identified by "package/Module" (e.g. "effect/Schedule"), because some
 * names exist in more than one package.
 *
 * The page talks only to the `ModuleRequestsStore` interface, so the backend
 * can be swapped without touching the UI. The site is deployed as static
 * files (GitHub Pages), so a real store has to live outside this repo — a
 * hosted database such as Supabase, or an API if the site moves to Vercel.
 *
 * `localStore` below is a stand-in for design review only: it keeps votes in
 * this browser's localStorage, so nobody else sees them. Replace it before
 * launch; the seed votes are placeholders.
 */

/** A module that can be suggested. */
export interface ModuleRef {
	/** "package/Module", e.g. "effect/Schedule". */
	id: string;
	pkg: string;
	name: string;
}

/** A module on the ranking, with its votes. */
export interface ModuleRequest extends ModuleRef {
	votes: number;
	/** Whether the current visitor has +1'd it. */
	voted: boolean;
}

export interface ModuleRequestsStore {
	/** Every module that has at least one vote. */
	list(): Promise<ModuleRequest[]>;
	/** Adds or removes the visitor's +1, adding the module to the list on
	 *  its first vote. */
	vote(module: ModuleRef, on: boolean): Promise<ModuleRequest>;
}

/**
 * Matches for a search, best first: names starting with the query, then
 * names containing it, then package matches. Case-insensitive.
 */
export function searchModules(
	index: ModuleRef[],
	query: string,
	limit = 8,
): ModuleRef[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const rank = (m: ModuleRef) => {
		const name = m.name.toLowerCase();
		if (name === q) return 0;
		if (name.startsWith(q)) return 1;
		if (name.includes(q)) return 2;
		if (m.id.toLowerCase().includes(q)) return 3;
		return -1;
	};
	return index
		.map((m) => ({ m, r: rank(m) }))
		.filter(({ r }) => r >= 0)
		.sort(
			(a, b) =>
				a.r - b.r ||
				a.m.name.length - b.m.name.length ||
				a.m.name.localeCompare(b.m.name),
		)
		.slice(0, limit)
		.map(({ m }) => m);
}

// ── Local stand-in ────────────────────────────────────────────────────

type StoredRequest = { id: string; pkg: string; name: string; votes: number };
type StoredState = { requests: StoredRequest[]; voted: string[] };

const STORAGE_KEY = "effect:motw-requests:v3";

/** Placeholder votes so the ranking has something to show in review. */
const SEED: StoredRequest[] = [
	["effect", "Schedule", 42],
	["effect", "STM", 37],
	["effect", "Stream", 31],
	["effect", "FiberRef", 24],
	["effect", "Deferred", 18],
	["effect", "PubSub", 15],
	["effect", "RequestResolver", 11],
	["workflow", "Workflow", 9],
	["effect", "Pool", 6],
	["effect", "Mailbox", 4],
	["effect", "Cache", 3],
	["effect", "Scope", 2],
].map(([pkg, name, votes]) => ({
	id: `${pkg}/${name}`,
	pkg: pkg as string,
	name: name as string,
	votes: votes as number,
}));

let memory: StoredState | null = null;

function read(): StoredState {
	if (memory) return memory;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw) {
			memory = JSON.parse(raw) as StoredState;
			return memory;
		}
	} catch {
		// Storage blocked (private mode, etc.): fall back to memory below
	}
	memory = { requests: SEED.map((r) => ({ ...r })), voted: [] };
	return memory;
}

function write(state: StoredState) {
	memory = state;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// Keep working in memory for this visit
	}
}

const view = (r: StoredRequest, voted: string[]): ModuleRequest => ({
	...r,
	voted: voted.includes(r.id),
});

export const localStore: ModuleRequestsStore = {
	async list() {
		const { requests, voted } = read();
		return requests.filter((r) => r.votes > 0).map((r) => view(r, voted));
	},

	async vote(module, on) {
		const state = read();
		const already = state.voted.includes(module.id);
		const existing = state.requests.find((r) => r.id === module.id);
		if (on === already && existing) return view(existing, state.voted);
		const base: StoredRequest = existing ?? { ...module, votes: 0 };
		const updated = {
			...base,
			votes: Math.max(0, base.votes + (on === already ? 0 : on ? 1 : -1)),
		};
		const voted = on
			? [...new Set([...state.voted, module.id])]
			: state.voted.filter((v) => v !== module.id);
		write({
			requests: existing
				? state.requests.map((r) => (r.id === module.id ? updated : r))
				: [...state.requests, updated],
			voted,
		});
		return view(updated, voted);
	},
};
