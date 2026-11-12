/**
 * The v3 / v4 segmented control for the playground, where switching version
 * mutates state (rewrites package.json and rebuilds the sandbox) — callers
 * own the confirm/rebuild. Two versions means a segmented toggle there:
 * both worlds visible, one click to switch.
 *
 * The docs don't use this: there v4 is the docs and v3 an archive, so
 * version is a quiet navbar menu instead (landing/DocsVersionMenu.tsx).
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
