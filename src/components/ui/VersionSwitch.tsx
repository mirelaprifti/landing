/**
 * The v3 / v4 segmented control.
 *
 * Two versions means a segmented toggle, not a dropdown — both worlds visible,
 * one click to switch. (Same call logged in SearchPreviewPage: a dropdown wins
 * once a third version exists.) The class lists are copied verbatim from the
 * docs navbar's version switch (DocsNavigation.tsx) so the control reads as one
 * shape site-wide; the styleguide has no segmented-control spec to defer to.
 *
 * Two modes, because the same shape carries two different consequences:
 * - `links`: each half navigates (docs, API reference). Cheap and reversible.
 * - `buttons`: each half mutates state (playground — rewrites package.json and
 *   rebuilds the sandbox). Callers own the confirm/rebuild.
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

const ITEM =
	"rounded-sm px-3 py-1 text-center font-mono text-xs transition-all duration-200";

const ITEM_ACTIVE =
	"bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-700 dark:text-white";

const ITEM_IDLE =
	"text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white";

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
