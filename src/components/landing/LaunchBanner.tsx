import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "v4-launch-banner-dismissed";

/**
 * Slim site-wide launch banner. Sits above the fixed navbar.
 * Dismissible; the choice persists in localStorage.
 */
export function LaunchBanner({
	onVisibilityChange,
}: {
	onVisibilityChange?: (visible: boolean) => void;
}) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const dismissed = localStorage.getItem(DISMISS_KEY) === "true";
		if (dismissed) {
			setVisible(false);
			onVisibilityChange?.(false);
		}
	}, [onVisibilityChange]);

	const dismiss = () => {
		setVisible(false);
		localStorage.setItem(DISMISS_KEY, "true");
		onVisibilityChange?.(false);
	};

	if (!visible) return null;

	return (
		<div className="fixed top-0 right-0 left-0 z-[110] flex h-10 items-center justify-center bg-zinc-900 px-10 text-zinc-100 dark:bg-white dark:text-zinc-900">
			<a
				href="/blog/effect-v4"
				className="group flex min-w-0 items-center gap-2 text-sm font-medium"
			>
				<span className="hidden font-mono text-xs tracking-wider uppercase opacity-70 sm:inline">
					// New
				</span>
				<span className="truncate">
					Effect 4.0 is here — faster runtime, 71% smaller bundles
				</span>
				<i
					className="ri-arrow-right-line shrink-0 text-base transition-transform group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</a>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss announcement"
				className="absolute right-3 flex h-6 w-6 items-center justify-center opacity-60 transition-opacity hover:opacity-100"
			>
				<X size={15} aria-hidden="true" />
			</button>
		</div>
	);
}
