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

export function AnnouncementBanner() {
	const dismiss = () => {
		document.documentElement.classList.remove("has-announcement");
		try {
			localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "1");
		} catch {
			/* Private mode or storage disabled — the banner simply returns next visit. */
		}
	};

	return (
		<div
			data-announcement
			className="group fixed top-0 right-0 left-0 z-[110] hidden h-10 items-center justify-center border-b border-zinc-700/60 bg-zinc-900 pr-12 pl-4 text-zinc-100 transition-colors has-[a:hover]:bg-zinc-800"
		>
			{/* Whole-banner click target, sat behind the close button */}
			<a
				href={getAssetPath("/effect-days")}
				aria-label="Effect Days 2026: early bird tickets on sale"
				className="absolute inset-0"
			/>
			<div className="pointer-events-none flex min-w-0 items-center gap-2 text-sm font-medium">
				<span className="truncate">
					Effect Days returns, Dec 9–11 2026 · Early bird tickets on sale
				</span>
				<Icon
					name="arrow-right"
					className="shrink-0 text-base transition-transform group-hover:translate-x-0.5"
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
