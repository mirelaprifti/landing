import { Icon } from "@/components/ui/Icon";
import { type Announcement, ANNOUNCEMENTS } from "@/data/announcements";
import { getAssetPath } from "../../utils/assetPath";

/**
 * Slim, dismissible site-wide banner above the fixed navbar.
 *
 * Every scheduled entry is rendered, all hidden. An inline script in
 * BaseLayout picks the active one before first paint and marks it on <html>,
 * so a visitor who already dismissed it never sees a flash, and the navbar
 * never jumps. Dismissing clears the mark and records it in localStorage.
 */
export const announcementStorageKey = (id: string) =>
	`announcement-dismissed:${id}`;

export function AnnouncementBanner() {
	return (
		<>
			{ANNOUNCEMENTS.filter((a) => a.href).map((a) => (
				<Banner key={a.id} announcement={a} />
			))}
		</>
	);
}

function Banner({ announcement: a }: { announcement: Announcement }) {
	const href = a.href ?? "";
	const external = /^https?:/.test(href);

	const dismiss = () => {
		const root = document.documentElement;
		root.classList.remove("has-announcement");
		delete root.dataset.activeAnnouncement;
		try {
			localStorage.setItem(announcementStorageKey(a.id), "1");
		} catch {
			/* Private mode or storage disabled — the banner simply returns next visit. */
		}
	};

	return (
		/* Padding is symmetric so the message centres on the full banner width;
		   3rem a side clears the absolutely-placed dismiss button, which sits
		   outside the flow and so reserves no space of its own. */
		<div
			data-announcement={a.id}
			className="group fixed top-0 right-0 left-0 z-[110] hidden h-10 items-center justify-center border-b border-zinc-700/60 bg-zinc-900 px-12 text-zinc-100"
		>
			{/* A white glow on the bottom border that grows once from the centre
			    out to the edges on load, then stays. Sits over the border, not
			    above it. Animation lives in globals.css so it can respect reduced
			    motion. */}
			<span
				aria-hidden="true"
				className="announcement-sweep pointer-events-none absolute inset-x-0 -bottom-px h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)]"
			/>

			{/* Hover: soft light rising from the glowing border into the strip, as
			    if the line were lighting it. Hover is keyed to the link, so the
			    close button never triggers it. */}
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_120%_at_50%_100%,rgba(255,255,255,0.09),transparent_70%)] opacity-0 transition-opacity duration-500 ease-out group-has-[a:hover]:opacity-100"
			/>

			{/* Whole-banner click target, sat behind the close button */}
			<a
				href={external ? href : getAssetPath(href)}
				{...(external && { target: "_blank", rel: "noopener noreferrer" })}
				aria-label={a.label}
				className="absolute inset-0"
			/>
			{/* Set like the hero eyebrow ("// Effect 4.0 — Release Candidate →") so
			    the strip speaks in the site's own voice: mono caps, one line,
			    parts joined by middle dots. */}
			<div className="pointer-events-none flex min-w-0 items-center gap-2 font-mono text-[12.5px] tracking-wider text-zinc-300 uppercase transition-colors duration-300 group-has-[a:hover]:text-white">
				<span
					aria-hidden="true"
					className="shrink-0 text-zinc-400 transition-colors duration-300 group-has-[a:hover]:text-zinc-300"
				>
					//
				</span>
				<span className="truncate">
					{a.title}
					{/* Detail is the first thing to go on narrow screens, taking its
					    dot with it. */}
					{a.detail && (
						<span className="hidden sm:inline"> · {a.detail}</span>
					)}
					{a.action && <> · {a.action}</>}
				</span>
				<Icon
					name="arrow-right"
					className="shrink-0 text-base text-zinc-400 transition duration-300 ease-out group-has-[a:hover]:translate-x-1 group-has-[a:hover]:text-white"
					aria-hidden="true"
				/>
			</div>

			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss announcement"
				className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
			>
				<Icon name="x" className="text-base" aria-hidden="true" />
			</button>
		</div>
	);
}
