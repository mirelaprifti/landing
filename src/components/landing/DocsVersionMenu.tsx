import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { EffectVersion } from "@/components/ui/VersionSwitch";
import { cn } from "@/lib/utils";

/**
 * The docs version picker: a quiet "v4 ▾" in the navbar, beside docs search.
 *
 * v4 is the docs; v3 is an archive you can still reach. So version is no
 * longer a sidebar-heading toggle that presents both as equals — it's chrome,
 * found where developers look for it (top right, next to the search it
 * scopes), and invisible until needed. Readers who land on v3 from a search
 * engine or an old link are caught by {@link DocsLegacyNotice} instead.
 *
 * Click-to-open only (no hover): switching version navigates away, so the
 * menu should never open by accident on the way to search or the theme toggle.
 */

const VERSION_META: Record<EffectVersion, { label: string }> = {
	v4: { label: "v4" },
	v3: { label: "v3" },
};

const MENU_ORDER: readonly EffectVersion[] = ["v4", "v3"];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export type DocsVersionHrefs = Record<EffectVersion, string>;

export function DocsVersionMenu({
	value,
	hrefs,
	align = "right",
	className,
}: {
	value: EffectVersion;
	/** Where each version lives for the current page (its twin, or that version's index). */
	hrefs: DocsVersionHrefs;
	/** Which edge of the trigger the panel hangs from. */
	align?: "left" | "right";
	className?: string;
}) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelId = useId();
	const reduceMotion = useReducedMotion();

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

	return (
		<div
			ref={rootRef}
			className={cn("relative", className)}
			onBlur={(e) => {
				if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
			}}
		>
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={open ? panelId : undefined}
				aria-label={`Docs version: ${VERSION_META[value].label}. Change version`}
				onClick={() => setOpen((o) => !o)}
				className={cn(
					// Filled, borderless chip (#18181B in dark), 34px tall to line up
					// with the docs search pill beside it.
					"flex items-center gap-1.5 rounded-md py-[7px] pr-2 pl-2.5 font-mono text-[13px] leading-5 font-medium text-zinc-900 transition-colors dark:text-white",
					open
						? "bg-zinc-300/70 dark:bg-zinc-800"
						: "bg-zinc-200 hover:bg-zinc-300/70 dark:bg-zinc-900 dark:hover:bg-zinc-800",
				)}
			>
				{VERSION_META[value].label}
				<Icon
					name="chevron-down"
					aria-hidden="true"
					className={cn(
						"text-sm transition-transform duration-200 motion-reduce:transition-none",
						open && "rotate-180",
					)}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						id={panelId}
						className={cn(
							"absolute top-full z-50 pt-2",
							align === "right"
								? "right-0 origin-top-right"
								: "left-0 origin-top-left",
						)}
						initial={
							reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }
						}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								duration: reduceMotion ? 0.12 : 0.18,
								ease: EASE_OUT,
							},
						}}
						exit={{
							opacity: 0,
							y: reduceMotion ? 0 : -3,
							transition: { duration: 0.12, ease: "easeIn" },
						}}
					>
						<div className="w-28 rounded-lg border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
							<ul aria-label="Docs version">
								{MENU_ORDER.map((version) => {
									const active = version === value;
									const meta = VERSION_META[version];
									return (
										<li key={version}>
											<a
												href={hrefs[version]}
												aria-current={active ? "page" : undefined}
												className={cn(
													"flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors duration-150 hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:focus-visible:outline-zinc-500",
												)}
											>
												<span className="flex-1 font-mono text-[13px] font-medium text-zinc-900 dark:text-white">
													{meta.label}
												</span>
												{active && (
													<Icon
														name="check"
														aria-hidden="true"
														className="text-sm text-zinc-900 dark:text-white"
													/>
												)}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

/**
 * Shown at the top of every v3 page. Most v3 traffic arrives from search
 * engines and old links, not from the version menu — this is where those
 * readers find out there's a newer version, and get one click to it.
 */
export function DocsLegacyNotice({
	v4Href,
	className,
}: {
	v4Href: string;
	className?: string;
}) {
	return (
		<aside
			aria-label="Version notice"
			className={cn(
				"flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400",
				className,
			)}
		>
			<span>
				You're viewing{" "}
				<span className="font-mono text-zinc-900 dark:text-white">v3</span>, a
				previous version of Effect.
			</span>
			<a
				href={v4Href}
				className="group inline-flex items-center gap-1 font-medium text-zinc-900 dark:text-white"
			>
				Switch to v4
				<Icon
					name="arrow-right"
					aria-hidden="true"
					className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</a>
		</aside>
	);
}
