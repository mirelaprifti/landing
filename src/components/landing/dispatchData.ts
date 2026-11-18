/**
 * Shared data for The Effect Dispatch (homepage section) and the site-wide
 * Effect agent: upcoming events, the numbers strip, date helpers, and the
 * context the agent is allowed to answer from.
 */
import { BLOG_POSTS, type BlogPost, getPostUrl } from "../../data/blog";
import { JOBS } from "../../data/effect-jobs";
import { getAssetPath } from "../../utils/assetPath";
import type { AgentContext } from "./EffectAgent";
import { MODULES, MOTW_URL, moduleTitle } from "./moduleOfTheWeek";

/** The community calendar every event below is listed on. */
export const LUMA_URL = "https://luma.com/effect-community";

/**
 * Upcoming events, mirrored from the Luma calendar. Add one here and it
 * slots in once it's within EVENT_LEAD_DAYS; it leaves when it's over.
 */
export type Event = {
	title: string;
	/** As printed: "Nov 17", "Dec 9–11". */
	date: string;
	place: string;
	status?: string;
	starts: string;
	ends: string;
	href: string;
	/** The event's cover; Luma CDN or a local asset. */
	image: string;
	/** The image is a mark, not a photo: inset it on white, like a Luma cover. */
	logo?: boolean;
	/** One line on what's happening, for when the event is the top story. */
	detail?: string;
};
export const EVENTS: Event[] = [
	{
		title: "Effect Warsaw #2",
		date: "Nov 17",
		place: "Warsaw, Poland",
		starts: "2026-11-17",
		ends: "2026-11-18",
		href: "https://luma.com/k5o7m2pg",
		// From the Luma page: "Sam Grace, Fullstack Effect"
		detail: "Sam Grace on Fullstack Effect",
		image:
			"https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=96,height=96/uploads/cb/2bc25c67-80d6-407f-8aea-b9064647ef05.png",
	},
	{
		title: "Effect Office Hours",
		date: "Nov 18",
		place: "YouTube · 10:00 AM ET",
		starts: "2026-11-18",
		ends: "2026-11-19",
		href: "https://www.youtube.com/@Effect-TS/streams",
		// The stream thumbnail crops badly at this size; the logomark reads
		image: "/assets/effect-logo/Logo%20symbol/SVG/effect-logomark-black.svg",
		logo: true,
	},
	{
		title: "Effect Days 2026",
		date: "Dec 9–11",
		place: "Livorno, Italy",
		status: "Sold out",
		starts: "2026-12-09",
		ends: "2026-12-12",
		href: "/effect-days",
		image: "/assets/effect-days/ed-25-3.png",
	},
];

export const DAY = 86_400_000;

/** Whole calendar days, so something from this morning reads "Today". */
export function daysFrom(now: number, date: number) {
	const midnight = (t: number) => new Date(t).setHours(0, 0, 0, 0);
	return Math.round((midnight(date) - midnight(now)) / DAY);
}

/** "Today", "3 days ago", "2 weeks ago"; "In 23 days" for the future. */
export function relative(date: number, now: number) {
	const days = daysFrom(now, date);
	if (days > 1) return `In ${days} days`;
	if (days === 1) return "Tomorrow";
	if (days === 0) return "Today";
	if (days === -1) return "Yesterday";
	if (days > -14) return `${-days} days ago`;
	return `${Math.round(-days / 7)} weeks ago`;
}

export const eventHref = (e: Event) =>
	e.href.startsWith("http") ? e.href : getAssetPath(e.href);

/**
 * Numbers that move daily. In this design copy they're snapshots; on the live
 * site each is fetched on every rebuild (see the auto-feed plan). Sources and
 * snapshot dates are noted so they're easy to refresh by hand meanwhile.
 */
export const STATS = [
	{
		// TWiE #144, Nov 16 2026
		value: "4.1.4",
		label: "Latest patch",
		href: "https://github.com/Effect-TS/effect/releases",
	},
	{
		// npm downloads API (what npmx.dev shows): 71,167,025 for Nov 10–16, 2026
		value: "71.2M",
		label: "Weekly downloads",
		href: "https://npmx.dev/package/effect",
	},
	{
		// github.com/Effect-TS/effect, Nov 17 2026
		value: "17.6k",
		label: "GitHub stars",
		href: "https://github.com/Effect-TS/effect",
	},
	{
		// Live: the site's own job board
		value: String(JOBS.length),
		label: "Open roles",
		href: "/effect-jobs",
	},
];

/* ─── Community picks (from This Week in Effect) ─── */

const COMMUNITY_SLOTS = 4;
/** How far back to look for picks: the last few issues. */
const COMMUNITY_ISSUES = 3;

/**
 * Community work from the latest issues of This Week in Effect: top picks
 * first, then newest issue first. External links, called out as such.
 */
export function communityPicks(now: number) {
	return BLOG_POSTS.filter(
		(p) => p.tags.includes("This Week In Effect") && Date.parse(p.date) <= now,
	)
		.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
		.slice(0, COMMUNITY_ISSUES)
		.flatMap((issue, order) =>
			(issue.community ?? []).map((pick) => ({ pick, order, issue })),
		)
		.sort(
			(a, b) =>
				Number(!!b.pick.top) - Number(!!a.pick.top) || a.order - b.order,
		)
		.slice(0, COMMUNITY_SLOTS);
}

/** What the agent may answer from: the same data the section shows. */
export function agentContext(now: number): AgentContext {
	const published = (p: BlogPost) => Date.parse(p.date) <= now;
	const newest = (tag: string) =>
		BLOG_POSTS.filter((p) => p.tags.includes(tag) && published(p)).sort(
			(a, b) => Date.parse(b.date) - Date.parse(a.date),
		)[0];
	const issue = newest("This Week In Effect");
	const release = newest("Release");
	const module = MODULES.find(published);
	const ago = (p: BlogPost) => relative(Date.parse(p.date), now);
	return {
		events: EVENTS.filter((e) => Date.parse(e.ends) > now)
			.sort((a, b) => Date.parse(a.starts) - Date.parse(b.starts))
			.map((e) => ({
				title: e.title,
				date: e.date,
				place: e.place,
				status: e.status,
				when: relative(Date.parse(e.starts), now),
				href: eventHref(e),
			})),
		issue: issue && {
			number: issue.title.match(/#(\d+)/)?.[1] ?? "",
			highlights: issue.highlights ?? [issue.excerpt],
			when: ago(issue),
			href: getPostUrl(issue),
		},
		release: release && {
			title: release.title,
			highlights: release.highlights ?? [],
			when: ago(release),
			href: getPostUrl(release),
		},
		module: module && {
			title: moduleTitle(module),
			pkg: module.packageName,
			when: ago(module),
			href: getAssetPath(MOTW_URL),
		},
		stats: {
			patch: STATS[0].value,
			downloads: STATS[1].value,
			stars: STATS[2].value,
			roles: JOBS.length,
		},
		community: communityPicks(now).map(({ pick }) => pick),
		jobsHref: getAssetPath("/effect-jobs"),
		lumaHref: LUMA_URL,
	};
}
