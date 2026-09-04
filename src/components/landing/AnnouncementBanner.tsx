import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";

/**
 * Slim, dismissible site-wide banner above the fixed navbar.
 *
 * Visibility is driven by the `has-announcement` class on <html>, set by an
 * inline script in BaseLayout before first paint — so a visitor who already
 * dismissed it never sees a flash, and the navbar never jumps. Dismissing
 * removes the class and records it in localStorage.
 */
export const ANNOUNCEMENT_STORAGE_KEY = "effect-days-2026-banner-dismissed";

export function AnnouncementBanner({
	href = "/effect-days",
}: {
	/** Where the banner points. BaseLayout passes the tickets anchor when the
	 *  visitor is already on the Effect Days page. */
	href?: string;
}) {
	const dismiss = () => {
		document.documentElement.classList.remove("has-announcement");
		try {
			localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "1");
		} catch {
			/* Private mode or storage disabled — the banner simply returns next visit. */
		}
	};

	return (
		/* Padding is symmetric so the message centres on the full banner width;
		   3rem a side clears the absolutely-placed dismiss button, which sits
		   outside the flow and so reserves no space of its own. */
		<div
			data-announcement
			className="group fixed top-0 right-0 left-0 z-[110] hidden h-10 items-center justify-center border-b border-zinc-700/60 bg-zinc-900 px-12 text-zinc-100"
		>
			{/* Hover flourish: a white glow that grows out of the middle of the bottom
			    border and dissolves as it reaches the edges. Animation lives in
			    globals.css so it can key off `:has(a:hover)` and reduced motion. */}
			<span
				aria-hidden="true"
				className="announcement-sweep pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)] opacity-0"
			/>

			{/* Whole-banner click target, sat behind the close button */}
			<a
				href={getAssetPath(href)}
				aria-label="Effect Days 2026, December 9–11: get tickets"
				className="absolute inset-0"
			/>
			{/* Three beats — event, date, action — told apart by weight and colour
			    rather than by punctuation, so the line reads in one pass. */}
			<div className="pointer-events-none flex min-w-0 items-center gap-2 text-sm">
				<span className="truncate">
					<span className="font-medium text-zinc-100">Effect Days 2026</span>
					{/* Date is the first thing to go on narrow screens — a truncated
					    "Dec …" is worse than no date at all. It takes its leading dot
					    with it, so mobile keeps a single separator, not two. */}
					<span
						aria-hidden="true"
						className="hidden px-2 text-zinc-600 sm:inline"
					>
						·
					</span>
					<span className="hidden text-zinc-400 sm:inline">Dec 9–11</span>
				</span>
				<span aria-hidden="true" className="shrink-0 text-zinc-600">
					·
				</span>
				<span className="flex shrink-0 items-center gap-1.5 font-medium text-white">
					Get tickets
					<Icon
						name="arrow-right"
						className="text-base transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</span>
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
