import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "@/utils/assetPath";

/**
 * "Save to calendar" control for the Effect Days hero.
 *
 * Two routes, because one is never enough: Google users get a prefilled
 * template URL, everyone else downloads the .ics in `public/`, which Apple
 * Calendar, Outlook, Fastmail and friends all import natively.
 *
 * Event details live in both places, so keep them in step: the .ics is
 * `public/effect-days-2026.ics`.
 */

/** All-day, 9–11 Dec; the end date is exclusive in both iCalendar and Google. */
const START = "20261209";
const END = "20261212";
const TITLE = "Effect Days 2026";
const LOCATION = "Palazzo Pancaldi, Viale Italia 56, 57127 Livorno LI, Italy";
const DETAILS =
	"Three days of workshops, talks, and community for Effect and TypeScript engineers.\n\nhttps://effect.website/effect-days";

// `dates` keeps its literal slash — that is the form Google documents, and
// URLSearchParams would escape it to %2F.
const GOOGLE_URL =
	"https://calendar.google.com/calendar/render?action=TEMPLATE" +
	`&dates=${START}/${END}` +
	`&text=${encodeURIComponent(TITLE)}` +
	`&details=${encodeURIComponent(DETAILS)}` +
	`&location=${encodeURIComponent(LOCATION)}`;

export function SaveToCalendar() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	// Close on outside click or Escape
	useEffect(() => {
		if (!open) return;
		const handlePointer = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", handlePointer);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handlePointer);
			document.removeEventListener("keydown", handleKey);
		};
	}, [open]);

	const itemClass =
		"flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white";

	return (
		<div ref={ref} className="relative inline-block">
			<Button
				variant="secondary"
				size="lg"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
				className="cursor-pointer"
			>
				<Icon name="calendar" className="text-lg" aria-hidden="true" />
				Save to calendar
				<Icon
					name="chevron-down"
					className={`text-base text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
					aria-hidden="true"
				/>
			</Button>

			{open && (
				<div
					role="menu"
					className="absolute top-full left-0 z-20 mt-2 w-56 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
				>
					<a
						role="menuitem"
						href={GOOGLE_URL}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setOpen(false)}
						className={itemClass}
					>
						<Icon
							name="external-link"
							className="shrink-0 text-base text-zinc-500"
							aria-hidden="true"
						/>
						Google Calendar
					</a>
					<a
						role="menuitem"
						href={getAssetPath("/effect-days-2026.ics")}
						download="effect-days-2026.ics"
						onClick={() => setOpen(false)}
						className={itemClass}
					>
						<Icon
							name="download"
							className="shrink-0 text-base text-zinc-500"
							aria-hidden="true"
						/>
						Apple, Outlook, other
					</a>
				</div>
			)}
		</div>
	);
}
