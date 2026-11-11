import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
	type EffectVersion,
	VERSION_LABELS,
	VERSIONS,
} from "@/components/ui/VersionSwitch";
import { cn } from "@/lib/utils";

/**
 * Docs-sidebar version selector: one row in the same shape as the section
 * links below it (15px Inter, 39px tall, rounded-md), so the top of the
 * sidebar reads as one family of controls. Opens a small menu of links.
 *
 * The playground keeps the segmented `VersionSwitch` — there both versions
 * sit side by side in a toolbar; here the control heads a list.
 *
 * `href` returning `null` means this page has no twin in that version: the
 * option stays listed (the two-version model stays visible) but is inert and
 * says why.
 */

const DESCRIPTIONS: Record<EffectVersion, string> = {
	v4: "Release candidate",
	v3: "Current stable",
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function VersionSelect({
	value,
	href,
	"aria-label": ariaLabel = "Effect version",
}: {
	value: EffectVersion;
	href: (version: EffectVersion) => string | null;
	"aria-label"?: string;
}) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuId = useId();
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
				buttonRef.current?.focus();
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
		// Blur wrapper only: closes the menu when focus leaves it.
		// biome-ignore lint/a11y/noStaticElementInteractions: focus-out listener, not a control
		<div
			ref={rootRef}
			className="relative"
			onBlur={(e) => {
				if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
			}}
		>
			<button
				ref={buttonRef}
				type="button"
				aria-expanded={open}
				aria-controls={open ? menuId : undefined}
				aria-label={`${ariaLabel}: Effect ${VERSION_LABELS[value]}`}
				onClick={() => setOpen((o) => !o)}
				className={cn(
					"flex w-full items-center gap-2.5 rounded-md border px-3 py-[7px] text-[15px] font-medium transition-colors",
					"border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-700",
					open && "border-zinc-300 dark:border-zinc-700",
				)}
			>
				<Icon
					name="git-branch"
					aria-hidden="true"
					className="text-base text-zinc-500 dark:text-zinc-400"
				/>
				<span>
					Effect{" "}
					<span className="font-mono text-[13px]">{VERSION_LABELS[value]}</span>
				</span>
				<Icon
					name="chevron-down"
					aria-hidden="true"
					className={cn(
						"ml-auto text-base text-zinc-500 transition-transform duration-200 motion-reduce:transition-none dark:text-zinc-400",
						open && "rotate-180",
					)}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						id={menuId}
						aria-label={ariaLabel}
						className="absolute top-full right-0 left-0 z-20 mt-1 flex flex-col gap-0.5 rounded-md border border-zinc-200 bg-white p-1 shadow-lg shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40"
						initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: reduceMotion ? 0.12 : 0.18,
								ease: EASE_OUT,
							},
						}}
						exit={{ opacity: 0, transition: { duration: 0.1 } }}
					>
						{VERSIONS.map((version) => {
							const active = version === value;
							const target = href(version);
							const body = (
								<>
									<span className="flex flex-col">
										<span className="font-mono text-[13px] font-medium">
											{VERSION_LABELS[version]}
										</span>
										<span className="text-[13px] text-zinc-500 dark:text-zinc-400">
											{target === null && !active
												? `This page isn't in ${VERSION_LABELS[version]} yet`
												: DESCRIPTIONS[version]}
										</span>
									</span>
									{active && (
										<Icon
											name="check"
											aria-hidden="true"
											className="ml-auto text-base"
										/>
									)}
								</>
							);
							const row =
								"flex items-center gap-2 rounded-sm px-2.5 py-2 transition-colors";
							return (
								<li key={version}>
									{target === null && !active ? (
										<span
											aria-disabled="true"
											className={cn(row, "text-zinc-400 dark:text-zinc-600")}
										>
											{body}
										</span>
									) : (
										<a
											href={target ?? "#"}
											aria-current={active ? "page" : undefined}
											onClick={() => setOpen(false)}
											className={cn(
												row,
												"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400",
												active
													? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
													: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
											)}
										>
											{body}
										</a>
									)}
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}
