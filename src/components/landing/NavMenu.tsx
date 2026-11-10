import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

/** Ease-out curve: fast start, soft landing — reads as "responsive", not "floaty". */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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
	// Reduced motion: no movement or scaling, just a quick cross-fade.
	const reduceMotion = useReducedMotion();

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
				aria-controls={open ? panelId : undefined}
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
						"text-base transition-transform duration-200 motion-reduce:transition-none",
						open && "rotate-180",
					)}
				/>
			</button>

			{/* pt-5 bridges the trigger to the nav's bottom edge so hovering
			    across the gap never closes the menu; the panel itself hangs
			    just below the bar. */}
			<AnimatePresence>
				{open && (
					<motion.div
						id={panelId}
						className="absolute top-full -left-4 origin-top-left pt-5"
						initial={
							reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
						}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								duration: reduceMotion ? 0.12 : 0.2,
								ease: EASE_OUT,
							},
						}}
						exit={{
							opacity: 0,
							y: reduceMotion ? 0 : -4,
							transition: { duration: 0.12, ease: "easeIn" },
						}}
					>
						<ul className="flex w-76 flex-col gap-0.5 rounded-lg border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
							{items.map((item, i) => {
								const active = isActive(item);
								return (
									<motion.li
										key={item.href}
										initial={reduceMotion ? false : { opacity: 0, y: -3 }}
										animate={{
											opacity: 1,
											y: 0,
											transition: {
												duration: 0.2,
												delay: 0.03 + i * 0.025,
												ease: EASE_OUT,
											},
										}}
									>
										<a
											href={item.href}
											aria-current={active ? "page" : undefined}
											{...(item.external
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
											className={cn(
												"group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:focus-visible:outline-zinc-500",
												active && "bg-zinc-100 dark:bg-zinc-800",
											)}
										>
											<span className="flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-white">
												{item.label}
												{item.external ? (
													<Icon
														name="arrow-up-right"
														aria-label="(opens in a new tab)"
														className="text-sm text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:transform-none dark:text-zinc-400"
													/>
												) : (
													<Icon
														name="chevron-right"
														aria-hidden="true"
														className="text-sm text-zinc-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:transform-none dark:text-zinc-500"
													/>
												)}
											</span>
											<span className="mt-0.5 block text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">
												{item.description}
											</span>
										</a>
									</motion.li>
								);
							})}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
