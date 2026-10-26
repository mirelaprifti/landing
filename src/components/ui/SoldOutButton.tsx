import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Icon } from "./Icon";

/**
 * Stands in for a ticket CTA once there is nothing left to buy: a disabled
 * secondary Button, so it keeps the slot's size and the site's button styling
 * exactly. The system's 50% fade made it near-invisible on the dark pages, so
 * the ring and fill stay at full strength and only the label steps down to
 * the muted text tone. Disabled already drops hover and pointer events.
 */
function SoldOutButton({
	size,
	className,
}: {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
}) {
	return (
		<Button
			variant="secondary"
			size={size}
			disabled
			className={cn(
				"text-zinc-500 disabled:opacity-100 dark:text-zinc-400",
				className,
			)}
		>
			<Icon
				name="ticket"
				className={size === "sm" ? "text-base" : "text-lg"}
				aria-hidden="true"
			/>
			Sold out
		</Button>
	);
}

export { SoldOutButton };
