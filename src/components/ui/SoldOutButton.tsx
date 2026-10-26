import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button";

/**
 * Stands in for a ticket CTA once there is nothing left to buy. Same size
 * scale as Button, so it drops into the slot without moving anything, but it
 * renders as plain text: no link, no hover, no focus stop.
 *
 * Dashed outline and muted text, the same treatment as the tickets section's
 * sold-out row. A filled or ringed button would still read as an action. The
 * outline is drawn inside the box (negative offset), so like Button's
 * inset-ring it adds no height.
 */
function SoldOutButton({
	size,
	className,
	children = "Sold out",
}: {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	children?: ReactNode;
}) {
	return (
		<span
			className={cn(
				buttonVariants({ variant: null, size }),
				"cursor-default text-zinc-500 outline-1 -outline-offset-1 outline-zinc-300 outline-dashed select-none dark:text-zinc-400 dark:outline-zinc-700",
				className,
			)}
		>
			{children}
		</span>
	);
}

export { SoldOutButton };
