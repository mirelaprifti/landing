import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "v4-launch-banner-dismissed";

/**
 * Slim site-wide launch banner. Sits above the fixed navbar.
 * Dismissible; the choice persists in localStorage.
 */
export function LaunchBanner({
	onVisibilityChange,
	glintKey = 0,
}: {
	onVisibilityChange?: (visible: boolean) => void;
	/** Increment to sweep a light sheen across the banner (finale of the grid pulse). */
	glintKey?: number;
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
		<div className="group fixed top-0 right-0 left-0 z-[110] flex h-10 items-center justify-center border-b border-zinc-700/60 bg-zinc-900 px-10 text-zinc-100 transition-colors has-[a:hover]:bg-zinc-800">
			{/* Border light-up — the grid pulse arrives at the banner: light
			    spreads from the center outward along the bottom hairline */}
			{glintKey > 0 && (
				<>
					<span
						key={glintKey}
						aria-hidden="true"
						className="pointer-events-none absolute bottom-[-1px] left-1/2 h-px -translate-x-1/2 motion-reduce:hidden"
						style={{
							background:
								"linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9), transparent)",
							animation: "banner-border-spread 12s ease-out 0.1s infinite both",
						}}
					/>
					<style>{`
						@keyframes banner-border-spread {
							/* Sweep (~1.9s), fade, then stay quiet for the rest of the 8s cycle */
							0% { width: 0%; opacity: 1; }
							18% { width: 110%; opacity: 1; }
							28% { width: 110%; opacity: 0; }
							28.1% { width: 0%; opacity: 0; }
							100% { width: 0%; opacity: 0; }
						}
					`}</style>
				</>
			)}
			{/* Whole-banner click target */}
			<a
				href="/blog/effect-v4"
				aria-label="Effect 4.0 is here — read the announcement"
				className="absolute inset-0"
			/>
			<div className="pointer-events-none flex min-w-0 items-center gap-2 text-sm font-medium">
				<span className="hidden font-mono text-xs tracking-wider text-emerald-400 uppercase sm:inline">
					// New
				</span>
				<span className="truncate">
					Effect 4.0 is here — faster runtime, 71% smaller bundles
				</span>
				<i
					className="ri-arrow-right-line shrink-0 text-base transition-transform group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</div>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss announcement"
				className="absolute right-3 z-10 flex h-6 w-6 items-center justify-center opacity-60 transition-opacity hover:opacity-100"
			>
				<X size={15} aria-hidden="true" />
			</button>
		</div>
	);
}
