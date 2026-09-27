import { useId } from "react";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/components/ui/Link";

/**
 * The v3 / v4 segmented control.
 *
 * Two versions means a segmented toggle, not a dropdown — both worlds visible,
 * one click to switch. (Same call logged in SearchPreviewPage: a dropdown wins
 * once a third version exists.) The class lists are copied verbatim from the
 * docs sidebar's version switch (DocsLayout.tsx) so the control reads as one
 * shape site-wide; the styleguide has no segmented-control spec to defer to.
 *
 * Two modes, because the same shape carries two different consequences:
 * - `VersionSwitchLinks`: each half navigates (docs sidebar, API reference).
 *   Cheap and reversible.
 * - `VersionSwitch`: each half mutates state (playground — rewrites
 *   package.json and rebuilds the sandbox). Callers own the confirm/rebuild.
 *
 * `VersionSwitchLinks` also covers the dead-end case: when the current page
 * has no equivalent in the other version (`href` returns `null`), that half
 * renders inert — dimmed, no hover, `cursor-not-allowed`, not a link — and a
 * persistent note under the switch says why. Persistent, not a tooltip: it
 * works on touch, is reachable by screen readers (`aria-disabled` +
 * `aria-describedby`), and matches the sidebar-note idiom already used under
 * this switch ("The v4 reference is coming soon."). An optional `fallback`
 * link offers the escape hatch into the other version's world (its index),
 * so the switch never dead-ends the reader.
 */

export type EffectVersion = "v3" | "v4";

/** v4 leads: it is where the library is going, so it reads first. */
export const VERSIONS: readonly EffectVersion[] = ["v4", "v3"] as const;

/** v4 carries its `(rc)` qualifier everywhere it is offered as a target. */
export const VERSION_LABELS: Record<EffectVersion, string> = {
	v3: "v3",
	v4: "v4 (rc)",
};

const CONTAINER =
	"shrink-0 gap-1 rounded-md border border-zinc-300 bg-zinc-100 p-0.5 dark:border-zinc-700 dark:bg-zinc-900";

// leading-4 pins the pill to 24px so the control lands on exactly 28px total
// (1px ring + 2px padding each side) — the same height as the Reset/Share pair.
const ITEM =
	"rounded-sm px-3 py-1 text-center font-mono text-xs leading-4 transition-all duration-200";

const ITEM_ACTIVE =
	"bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-700 dark:text-white";

const ITEM_IDLE =
	"text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white";

// Unavailable = no page on the other side: two steps quieter than idle, no
// hover, the cursor says the rest. Rendered as a span, so nothing to focus.
const ITEM_DISABLED = "cursor-not-allowed text-zinc-400 dark:text-zinc-600";

export function VersionSwitch({
	value,
	onChange,
	/** Stretch to the container width, halves sharing it evenly. */
	block = false,
	labels = VERSION_LABELS,
	className = "",
	"aria-label": ariaLabel = "Effect version",
}: {
	value: EffectVersion;
	onChange: (version: EffectVersion) => void;
	block?: boolean;
	labels?: Record<EffectVersion, string>;
	className?: string;
	"aria-label"?: string;
}) {
	return (
		<fieldset
			className={`${block ? "flex w-full" : "inline-flex"} ${CONTAINER} ${className}`}
		>
			<legend className="sr-only">{ariaLabel}</legend>
			{VERSIONS.map((version) => {
				const active = value === version;
				return (
					<button
						key={version}
						type="button"
						aria-pressed={active}
						onClick={() => onChange(version)}
						className={`${block ? "flex-1" : ""} ${ITEM} ${active ? ITEM_ACTIVE : ITEM_IDLE}`}
					>
						{labels[version]}
					</button>
				);
			})}
		</fieldset>
	);
}

/**
 * Navigating twin of {@link VersionSwitch}: same shape, but each half is a link
 * to that version's docs rather than a state mutation. Used at the top of the
 * docs and API-reference sidebars.
 *
 * When `href` returns `null` for the *other* version, that half renders as an
 * inert span (dimmed, `cursor-not-allowed`, `aria-disabled`) and a note under
 * the switch explains the page doesn't exist there. `fallback` adds a subtle
 * arrow link below the note — the escape hatch into that version's world.
 */
export function VersionSwitchLinks({
	value,
	href,
	/** Stretch to the container width, halves sharing it evenly. */
	block = false,
	labels = VERSION_LABELS,
	fallback,
	unavailableNote,
	className = "",
	"aria-label": ariaLabel = "Effect version",
}: {
	value: EffectVersion;
	/**
	 * Target per version. Return `null` when this page has no equivalent in
	 * that version — that half of the switch renders inert with a note.
	 */
	href: (version: EffectVersion) => string | null;
	block?: boolean;
	labels?: Record<EffectVersion, string>;
	/**
	 * Escape hatch shown under the unavailable note — usually the other
	 * version's index, so the reader can still enter that world.
	 */
	fallback?: (version: EffectVersion) => { href: string; label: string };
	/** Note copy override. */
	unavailableNote?: (version: EffectVersion) => string;
	className?: string;
	"aria-label"?: string;
}) {
	const noteId = useId();
	const note =
		unavailableNote ??
		((version: EffectVersion) =>
			`This page doesn't exist in ${labels[version]}${version === "v4" ? " yet" : ""}.`);
	const unavailable = VERSIONS.filter((v) => v !== value && href(v) === null);

	return (
		<div className={block ? "w-full" : "inline-block"}>
			<nav
				aria-label={ariaLabel}
				className={`${block ? "flex w-full" : "inline-flex"} ${CONTAINER} ${className}`}
			>
				{VERSIONS.map((version) => {
					const active = value === version;
					const target = href(version);
					if (target === null) {
						return (
							<span
								key={version}
								aria-disabled="true"
								aria-describedby={active ? undefined : `${noteId}-${version}`}
								className={`${block ? "flex-1" : ""} ${ITEM} ${active ? ITEM_ACTIVE : ITEM_DISABLED}`}
							>
								{labels[version]}
							</span>
						);
					}
					return (
						<a
							key={version}
							href={target}
							aria-current={active ? "page" : undefined}
							className={`${block ? "flex-1" : ""} ${ITEM} ${active ? ITEM_ACTIVE : ITEM_IDLE}`}
						>
							{labels[version]}
						</a>
					);
				})}
			</nav>
			{unavailable.map((version) => {
				const exit = fallback?.(version);
				return (
					<div key={version} className="mt-2 px-1">
						<p
							id={`${noteId}-${version}`}
							className="text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400"
						>
							{note(version)}
						</p>
						{exit && (
							<Link
								variant="subtle"
								href={exit.href}
								className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium"
							>
								{exit.label}
								<Icon
									name="arrow-right"
									className="text-xs"
									aria-hidden="true"
								/>
							</Link>
						)}
					</div>
				);
			})}
		</div>
	);
}
