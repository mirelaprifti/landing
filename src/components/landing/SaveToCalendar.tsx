import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "@/utils/assetPath";

/**
 * "Save to calendar" control for the Effect Days hero.
 *
 * Web calendars each need their own handoff — a prefilled compose URL — while
 * everyone else opens the .ics in `public/`, which Apple Calendar, desktop
 * Outlook, Thunderbird and Fastmail all read natively. Three clicks either way;
 * there is no browser API that adds an event without a handoff.
 *
 * Event details live here and in `public/effect-days-2026.ics` — keep them in
 * step if the dates or venue move.
 */

/** All-day, 9–11 Dec. The end date is exclusive in every format used here. */
const START = "20261209";
const END = "20261212";
const TITLE = "Effect Days 2026";
const LOCATION = "Palazzo Pancaldi, Viale Italia 56, 57127 Livorno LI, Italy";
const DETAILS =
	"Three days of workshops, talks, and community for Effect and TypeScript engineers.\n\nhttps://effect.website/effect-days";

/** 20261209 → 2026-12-09, the form the Outlook deep links expect. */
const iso = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

// `dates` keeps its literal slash — that is the form Google documents, and
// URLSearchParams would escape it to %2F.
const GOOGLE_URL =
	"https://calendar.google.com/calendar/render?action=TEMPLATE" +
	`&dates=${START}/${END}` +
	`&text=${encodeURIComponent(TITLE)}` +
	`&details=${encodeURIComponent(DETAILS)}` +
	`&location=${encodeURIComponent(LOCATION)}`;

/** outlook.live.com serves personal accounts, outlook.office.com work ones;
 *  the compose path and params are otherwise identical. */
const outlookUrl = (host: string) =>
	`https://${host}/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
	"&allday=true" +
	`&startdt=${iso(START)}` +
	`&enddt=${iso(END)}` +
	`&subject=${encodeURIComponent(TITLE)}` +
	`&body=${encodeURIComponent(DETAILS)}` +
	`&location=${encodeURIComponent(LOCATION)}`;

const MENU = [
	{ label: "Google Calendar", href: GOOGLE_URL, icon: "external-link" },
	{
		label: "Outlook.com",
		href: outlookUrl("outlook.live.com"),
		icon: "external-link",
	},
	{
		label: "Microsoft 365",
		href: outlookUrl("outlook.office.com"),
		icon: "external-link",
	},
] as const;

export function SaveToCalendar({
	fullWidth = false,
}: {
	/** Stretch to the container, for stacked CTA boxes. Default sizes to the label. */
	fullWidth?: boolean;
} = {}) {
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
		"flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white";

	return (
		<div
			ref={ref}
			className={`relative ${fullWidth ? "block w-full" : "block w-full sm:inline-block sm:w-auto"}`}
		>
			<Button
				variant="secondary"
				size="lg"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
				// text-sm to match the menu labels; py-3.5 puts the 4px that the
				// smaller line-height gives up back into the padding, so the button
				// stays 48px tall and level with "Get tickets" beside it.
				className={`cursor-pointer py-3.5 text-sm ${fullWidth ? "w-full" : "w-full sm:w-auto"}`}
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
					// w-full resolves against the relative wrapper, which is sized by the
					// button — so the menu tracks the button's width automatically.
					className="absolute top-full left-0 z-20 mt-2 w-full overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
				>
					{MENU.map((item) => (
						<a
							key={item.label}
							role="menuitem"
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setOpen(false)}
							className={itemClass}
						>
							<Icon
								name={item.icon}
								className="shrink-0 text-base text-zinc-500"
								aria-hidden="true"
							/>
							{item.label}
						</a>
					))}
					{/* No `download` attribute on purpose: it forces a file save, whereas
					    plain navigation lets Safari and iOS hand text/calendar straight to
					    the Calendar app. Chrome downloads it either way. */}
					<a
						role="menuitem"
						href={getAssetPath("/effect-days-2026.ics")}
						onClick={() => setOpen(false)}
						className={itemClass}
					>
						<Icon
							name="download"
							className="shrink-0 text-base text-zinc-500"
							aria-hidden="true"
						/>
						Apple, other (.ics)
					</a>
				</div>
			)}
		</div>
	);
}
