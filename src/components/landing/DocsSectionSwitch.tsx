import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { getAssetPath } from "../../utils/assetPath";
import type { DocsSectionKey } from "./DocsLayout";

/**
 * Top-of-sidebar switch between the three docs sections. The docs pages use
 * the main site navigation, so the section choice lives here instead of in
 * a dedicated navbar. It sits above the version switch: section is the
 * widest scope, version narrows it, the tree below narrows further.
 */
const SECTIONS: {
	key: DocsSectionKey;
	label: string;
	href: string;
	icon: IconName;
}[] = [
	{
		key: "docs",
		label: "Onboarding",
		href: "/docs/onboarding",
		icon: "rocket",
	},
	{
		key: "guides",
		label: "Guides",
		href: "/docs/introduction",
		icon: "book-open",
	},
	{ key: "api", label: "Reference", href: "/docs/api/v3", icon: "braces" },
];

export function DocsSectionSwitch({
	section,
	horizontal = false,
	className,
}: {
	section: DocsSectionKey;
	/** Row layout for small screens where there's no sidebar. */
	horizontal?: boolean;
	className?: string;
}) {
	return (
		<ul
			aria-label="Docs sections"
			className={cn(
				horizontal ? "flex gap-1 overflow-x-auto" : "flex flex-col gap-0.5",
				className,
			)}
		>
			{SECTIONS.map((s) => {
				const active = s.key === section;
				return (
					<li key={s.key}>
						<a
							href={getAssetPath(s.href)}
							aria-current={active ? "true" : undefined}
							className={cn(
								"flex items-center rounded-md font-medium whitespace-nowrap transition-colors",
								horizontal
									? "gap-2 px-3 py-1.5 text-sm"
									: "gap-2.5 px-3 py-2 text-[15px]",
								active
									? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
									: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white",
							)}
						>
							<Icon
								name={s.icon}
								aria-hidden="true"
								className={cn(
									"text-base",
									active ? "" : "text-zinc-500 dark:text-zinc-500",
								)}
							/>
							{s.label}
						</a>
					</li>
				);
			})}
		</ul>
	);
}
