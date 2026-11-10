import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface NavMenuItem {
	label: string;
	description: string;
	href: string;
	/** Path prefix that marks this item (and its menu) as the current section. */
	match?: string;
	external?: boolean;
}

interface NavMenuProps {
	label: string;
	items: NavMenuItem[];
	activePath?: string;
	transparent?: boolean;
}

/** Delay before a hover-opened menu closes, so the pointer can cross into the panel. */
const CLOSE_DELAY = 120;

/**
 * Header dropdown: a nav-styled trigger that opens a 2-column panel of
 * title + description links. Opens on hover (pointer) and on click (touch,
 * keyboard); closes on Escape, outside click, or focus leaving the menu.
 */
export function NavMenu({
	label,
	items,
	activePath,
	transparent = false,
}: NavMenuProps) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeTimer = useRef<number | undefined>(undefined);
	const lastPointer = useRef("");
	const panelId = useId();

	const isActive = (item: NavMenuItem) =>
		!!item.match && !!activePath?.startsWith(item.match);
	const sectionActive = items.some(isActive);

	const cancelClose = () => window.clearTimeout(closeTimer.current);
	const scheduleClose = () => {
		cancelClose();
		closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
	};

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
			}
		};
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	useEffect(() => () => window.clearTimeout(closeTimer.current), []);

	return (
		// Hover-to-open is a pointer convenience; the button is the real control.
		// biome-ignore lint/a11y/noStaticElementInteractions: hover/blur wrapper only
		<div
			ref={rootRef}
			className="relative"
			onPointerEnter={(e) => {
				if (e.pointerType !== "mouse") return;
				cancelClose();
				setOpen(true);
			}}
			onPointerLeave={(e) => {
				if (e.pointerType === "mouse") scheduleClose();
			}}
			onBlur={(e) => {
				if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
			}}
		>
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={panelId}
				onPointerDown={(e) => {
					lastPointer.current = e.pointerType;
				}}
				onClick={() => {
					// A mouse already opened the menu on hover, so a click keeps it
					// open instead of toggling it shut. Touch and keyboard toggle.
					const viaMouse = lastPointer.current === "mouse";
					lastPointer.current = "";
					setOpen((o) => (viaMouse ? true : !o));
				}}
				className={cn(
					"flex items-center gap-1 border-b border-transparent text-sm font-medium transition-colors",
					transparent
						? "text-white hover:text-white/80"
						: open || sectionActive
							? "text-zinc-900 dark:text-white"
							: "text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
				)}
			>
				{label}
				<Icon
					name="chevron-down"
					aria-hidden="true"
					className={cn(
						"text-base transition-transform duration-200",
						open && "rotate-180",
					)}
				/>
			</button>

			{/* pt-5 bridges the trigger to the nav's bottom edge so hovering
			    across the gap never closes the menu; the panel itself hangs
			    just below the bar. */}
			<div
				id={panelId}
				hidden={!open}
				className="absolute top-full -left-4 pt-5"
			>
				<ul className="grid w-[34rem] grid-cols-2 gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
					{items.map((item) => {
						const active = isActive(item);
						return (
							<li key={item.href}>
								<a
									href={item.href}
									aria-current={active ? "page" : undefined}
									{...(item.external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className={cn(
										"block rounded-md px-3 py-2.5 transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800",
										active && "bg-zinc-100 dark:bg-zinc-800",
									)}
								>
									<span className="flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-white">
										{item.label}
										{item.external && (
											<Icon
												name="arrow-up-right"
												aria-label="(opens in a new tab)"
												className="text-sm text-zinc-500 dark:text-zinc-400"
											/>
										)}
									</span>
									<span className="mt-0.5 block text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">
										{item.description}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
