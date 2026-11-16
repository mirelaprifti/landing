import { Icon } from "@/components/ui/Icon";
import { BLOG_POSTS, getPostUrl } from "../../data/blog";
import { EPISODES } from "../../data/episodes";
import { getAssetPath } from "../../utils/assetPath";
import { entryOf, MODULES, MOTW_URL, moduleTitle } from "./moduleOfTheWeek";

/** Kind badge, verbatim from the styleguide. */
const BADGE =
	"rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400";

/** Section eyebrow, verbatim from the styleguide. */
const EYEBROW =
	"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400";

const META =
	"font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400";

/**
 * Upcoming events, soonest first. The tile shows the first one that hasn't
 * ended by build time, so it rolls forward on its own as the site rebuilds.
 */
const EVENTS = [
	{
		title: "Effect Days 2026",
		detail:
			"Sold out. The talks will be on YouTube a few weeks after the event.",
		meta: "Dec 9–11 · Livorno, Italy",
		ends: "2026-12-12",
		href: "/effect-days",
		action: "See the lineup",
	},
];

type Tile = {
	kind: string;
	/** Pulsing green dot: this tile is the one that changes weekly. */
	live?: boolean;
	meta: string;
	title: string;
	detail: string;
	href: string;
	external?: boolean;
	action: string;
};

function buildTiles(): Tile[] {
	const tiles: Tile[] = [];

	// Newest release by date, so a pinned/featured older post never wins
	const release = BLOG_POSTS.filter((p) => p.tags.includes("Release")).sort(
		(a, b) => Date.parse(b.date) - Date.parse(a.date),
	)[0];
	if (release) {
		const href = getPostUrl(release);
		tiles.push({
			kind: "Release",
			meta: release.date,
			title: release.title,
			detail: release.excerpt,
			href,
			external: href.startsWith("http"),
			action: "Read the release",
		});
	}

	const motw = MODULES[0];
	if (motw) {
		tiles.push({
			kind: "Module of the Week",
			live: true,
			meta: `${String(entryOf(motw)).padStart(2, "0")} · ${motw.date}`,
			title: moduleTitle(motw),
			detail: motw.excerpt,
			href: getAssetPath(MOTW_URL),
			action: motw.video ? "Watch the module" : "Read the module",
		});
	}

	const episode = EPISODES[0];
	if (episode) {
		tiles.push({
			kind: "Podcast",
			meta: `Ep ${episode.number} · ${episode.duration}`,
			title: episode.title,
			detail: `With ${episode.guest}, ${episode.company}.`,
			href: getAssetPath(`/podcast/episodes/${episode.slug}`),
			action: "Listen",
		});
	}

	const today = new Date().toISOString().slice(0, 10);
	const event = EVENTS.find((e) => e.ends > today);
	if (event) {
		tiles.push({
			kind: "Next event",
			meta: event.meta,
			title: event.title,
			detail: event.detail,
			href: getAssetPath(event.href),
			action: event.action,
		});
	}

	return tiles;
}

function TileCell({ tile }: { tile: Tile }) {
	return (
		<article className="group relative flex min-w-0 flex-col bg-white px-5 py-6 transition-colors hover:bg-zinc-50 lg:px-6 lg:py-7 dark:bg-zinc-950 dark:hover:bg-zinc-900/60">
			<span className={`${BADGE} inline-flex items-center gap-2 self-start`}>
				{tile.live && (
					<span className="relative flex size-1.5" aria-hidden="true">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:animate-none" />
						<span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
					</span>
				)}
				{tile.kind}
			</span>

			<p className={`mt-10 ${META}`}>{tile.meta}</p>
			<h3 className="mt-3 text-lg leading-snug font-semibold text-balance text-zinc-900 dark:text-white">
				<a
					href={tile.href}
					{...(tile.external
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-zinc-400"
				>
					{tile.title}
				</a>
			</h3>
			<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
				{tile.detail}
			</p>

			<span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
				{tile.action}
				<Icon
					name={tile.external ? "arrow-up-right" : "arrow-right"}
					className="text-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</span>
		</article>
	);
}

/**
 * "What's new": the homepage's one living section. Each tile reads the newest
 * entry from content the site already publishes (releases, Module of the Week,
 * podcast, events), so the homepage stays current without copy edits.
 */
export function WhatsNewSection() {
	const tiles = buildTiles();
	if (tiles.length === 0) return null;
	return (
		<section className="relative w-full py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				<p className={EYEBROW}>// What's new</p>
				<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
					What's happening in Effect
				</h2>

				<div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
					{tiles.map((tile) => (
						<TileCell key={tile.kind} tile={tile} />
					))}
				</div>
			</div>
		</section>
	);
}
