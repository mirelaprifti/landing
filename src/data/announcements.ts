/**
 * Site-wide banner schedule. The site is static, so the visitor's browser picks
 * the active entry at load time: the first one whose window contains "now" and
 * that has somewhere to point. Outside every window there is no banner at all.
 *
 * Each entry has its own id, so dismissing one never hides the next.
 * Preview any entry regardless of date with `?announcement=<id>`.
 */
export type Announcement = {
	id: string;
	/** ISO timestamp, inclusive. Omit to start immediately. */
	from?: string;
	/** ISO timestamp, exclusive. Omit to run until removed. */
	until?: string;
	/** Where the banner points. `null` keeps the entry switched off. */
	href: string | null;
	/** Read out in full by screen readers. */
	label: string;
	title: string;
	/** Middle beat — the first thing dropped on narrow screens. */
	detail?: string;
	/** Closing call to action with an arrow. Omit for a plain statement. */
	action?: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
	{
		id: "effect-days-2026-live",
		from: "2026-12-09T00:00:00+01:00",
		until: "2026-12-12T00:00:00+01:00",
		href: "/effect-days",
		label: "Effect Days 2026, Livorno, December 9–11",
		title: "Effect Days 2026",
		detail: "Livorno, Dec 9–11",
	},
	{
		id: "effect-days-2026-talks",
		from: "2026-12-12T00:00:00+01:00",
		// Paste the YouTube playlist URL here once the recordings are published.
		href: null,
		label: "Effect Days 2026 talks are out: watch on YouTube",
		title: "Effect Days 2026",
		detail: "Talks are out",
		action: "Watch now",
	},
];
