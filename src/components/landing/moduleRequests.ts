/**
 * Storage for Module of the Week suggestions and votes.
 *
 * The page talks only to the `ModuleRequestsStore` interface, so the backend
 * can be swapped without touching the UI. The site is deployed as static
 * files (GitHub Pages), so a real store has to live outside this repo — a
 * hosted database such as Supabase, or an API if the site moves to Vercel.
 *
 * `localStore` below is a stand-in for design review only: it keeps
 * suggestions and votes in this browser's localStorage, so nobody else sees
 * them. Replace it before launch; the seed list and counts are placeholders.
 */

export interface ModuleRequest {
	id: string;
	name: string;
	votes: number;
	/** Whether the current visitor has +1'd it. */
	voted: boolean;
}

export type SuggestResult =
	| { status: "created"; request: ModuleRequest }
	/** Already on the list (case-insensitive match); the existing entry. */
	| { status: "exists"; request: ModuleRequest }
	| { status: "invalid"; reason: string };

export interface ModuleRequestsStore {
	list(): Promise<ModuleRequest[]>;
	suggest(name: string): Promise<SuggestResult>;
	/** Adds or removes the visitor's +1. */
	vote(id: string, on: boolean): Promise<ModuleRequest>;
}

export const NAME_MAX_LENGTH = 60;

/** Trims and collapses whitespace; returns a reason when the name won't do. */
export function validateName(
	raw: string,
): { name: string } | { reason: string } {
	const name = raw.replace(/\s+/g, " ").trim();
	if (name.length < 2) return { reason: "Enter a module name." };
	if (name.length > NAME_MAX_LENGTH)
		return { reason: `Keep it under ${NAME_MAX_LENGTH} characters.` };
	if (/https?:\/\/|www\./i.test(name))
		return { reason: "Links aren't allowed." };
	return { name };
}

const normalise = (name: string) =>
	name.toLowerCase().replace(/\s+/g, " ").trim();

// ── Local stand-in ────────────────────────────────────────────────────

type StoredRequest = { id: string; name: string; votes: number };
type StoredState = { requests: StoredRequest[]; voted: string[] };

const STORAGE_KEY = "effect:motw-requests:v1";

/** Placeholder candidates so the ranking has something to show in review. */
const SEED: StoredRequest[] = [
	{ id: "schedule", name: "Schedule", votes: 42 },
	{ id: "stm", name: "STM", votes: 37 },
	{ id: "stream", name: "Stream", votes: 31 },
	{ id: "fiberref", name: "FiberRef", votes: 24 },
	{ id: "deferred", name: "Deferred", votes: 18 },
	{ id: "pubsub", name: "PubSub", votes: 15 },
	{ id: "request-resolver", name: "RequestResolver", votes: 11 },
	{ id: "workflow", name: "Workflow", votes: 9 },
	{ id: "pool", name: "Pool", votes: 6 },
	{ id: "mailbox", name: "Mailbox", votes: 4 },
];

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
		return requests.map((r) => view(r, voted));
	},

	async suggest(raw) {
		const checked = validateName(raw);
		if ("reason" in checked)
			return { status: "invalid", reason: checked.reason };
		const state = read();
		const existing = state.requests.find(
			(r) => normalise(r.name) === normalise(checked.name),
		);
		if (existing)
			return { status: "exists", request: view(existing, state.voted) };
		// A suggestion counts as its author's first +1
		const created: StoredRequest = {
			id: `${normalise(checked.name).replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
			name: checked.name,
			votes: 1,
		};
		write({
			requests: [...state.requests, created],
			voted: [...state.voted, created.id],
		});
		return { status: "created", request: { ...created, voted: true } };
	},

	async vote(id, on) {
		const state = read();
		const target = state.requests.find((r) => r.id === id);
		if (!target) throw new Error(`Unknown request: ${id}`);
		const already = state.voted.includes(id);
		if (on === already) return view(target, state.voted);
		const updated = {
			...target,
			votes: Math.max(0, target.votes + (on ? 1 : -1)),
		};
		const voted = on
			? [...state.voted, id]
			: state.voted.filter((v) => v !== id);
		write({
			requests: state.requests.map((r) => (r.id === id ? updated : r)),
			voted,
		});
		return view(updated, voted);
	},
};
