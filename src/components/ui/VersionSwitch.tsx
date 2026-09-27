import { useId, useState } from "react";

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
 * can't navigate — so instead of a link it's a button that expands an
 * explanation under the switch on demand. On demand, not persistent: the
 * sidebar stays compact by default, the dimmed half stays visible so the
 * two-version model stays visible, and the interaction is the same expand/
 * collapse idiom the docs sidebar already uses for its nav groups — no
 * overlay, no clipping, works identically in every container the switch
 * appears in (docs sidebar, API sidebar, mobile panel). The button carries
 * `aria-disabled` so screen readers hear it's unavailable while staying
 * operable — activating it is exactly how you learn why.
 *
 * The note is just the explanation, nothing more: the reader wanted *this
 * page* in the other version, and a "browse that version instead" link
 * can't deliver it — the other world's index is reachable through the nav
 * for anyone who wants it.
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

// Unavailable = no page on the other side: two steps quieter than idle and no
// pill — but still a button. Hover brightens a step to signal it's operable;
// clicking expands the explanation under the switch instead of navigating.
const ITEM_DISABLED =
	"cursor-pointer text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400";

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
 * When `href` returns `null` for the *other* version, that half can't
 * navigate: it renders dimmed as a button, and activating it expands a note
 * under the switch explaining the page doesn't exist there. The note expands
 * in flow (pushing content down, like the sidebar's own nav groups), never
 * as an overlay.
 */
export function VersionSwitchLinks({
	value,
	href,
	/** Stretch to the container width, halves sharing it evenly. */
	block = false,
	labels = VERSION_LABELS,
	unavailableNote,
	className = "",
	"aria-label": ariaLabel = "Effect version",
}: {
	value: EffectVersion;
	/**
	 * Target per version. Return `null` when this page has no equivalent in
	 * that version — that half of the switch turns into an explainer toggle.
	 */
	href: (version: EffectVersion) => string | null;
	block?: boolean;
	labels?: Record<EffectVersion, string>;
	/** Note copy override. */
	unavailableNote?: (version: EffectVersion) => string;
	className?: string;
	"aria-label"?: string;
}) {
	const noteId = useId();
	const [openVersion, setOpenVersion] = useState<EffectVersion | null>(null);
	const note =
		unavailableNote ??
		((version: EffectVersion) =>
			`This page does not exist in ${labels[version]}${version === "v4" ? " yet" : ""}.`);
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
					if (target === null && !active) {
						const open = openVersion === version;
						return (
							<button
								key={version}
								type="button"
								aria-disabled="true"
								aria-expanded={open}
								aria-controls={`${noteId}-${version}`}
								onClick={() => setOpenVersion(open ? null : version)}
								className={`${block ? "flex-1" : ""} ${ITEM} ${ITEM_DISABLED}`}
							>
								{labels[version]}
							</button>
						);
					}
					if (target === null) {
						// Active version with no self-link (shouldn't happen — the
						// reader is on this page). Keep the pill, inert.
						return (
							<span
								key={version}
								className={`${block ? "flex-1" : ""} ${ITEM} ${ITEM_ACTIVE}`}
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
				if (openVersion !== version) return null;
				return (
					<div key={version} id={`${noteId}-${version}`} className="mt-2 px-1">
						<p className="text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
							{note(version)}
						</p>
					</div>
				);
			})}
		</div>
	);
}
