import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Unified button/link component for the Effect website.
 *
 * Variants consolidate all CTA patterns across the site into a single,
 * consistent API. Renders as `<a>` when `href` is provided, otherwise `<button>`.
 *
 * ## Variant guide
 *
 * | variant     | use case                                         |
 * |-------------|--------------------------------------------------|
 * | primary     | Main CTA — white bg, dark text                   |
 * | secondary   | Bordered ghost — dark bg, zinc border, white text |
 * | ghost       | No border/bg — text only with hover bg            |
 *
 * | size | padding          | text   |
 * |------|------------------|--------|
 * | sm   | px-4 py-2        | text-sm |
 * | md   | px-5 py-2.5      | text-sm |
 * | lg   | px-6 py-3        | text-base |
 * | xl   | px-6 py-4        | text-lg |
 */
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:pointer-events-none disabled:opacity-50 [&_i]:leading-none [&_svg]:shrink-0 dark:focus-visible:outline-white",
	{
		variants: {
			variant: {
				primary:
					"border border-transparent bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
				secondary:
					"border border-zinc-300 bg-white/50 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
				ghost:
					"border border-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white",
			},
			size: {
				sm: "px-4 py-2 text-sm",
				md: "px-5 py-2.5 text-sm",
				lg: "px-6 py-3 text-base",
				xl: "px-6 py-4 text-lg",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "md",
		},
	},
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// Anchor props (when href is provided)
type ButtonAsAnchor = {
	href: string;
	children: ReactNode;
	className?: string;
} & ButtonVariantProps &
	Omit<ComponentPropsWithoutRef<"a">, "className">;

// Button props (when href is NOT provided)
type ButtonAsButton = {
	href?: never;
	children: ReactNode;
	className?: string;
} & ButtonVariantProps &
	Omit<ComponentPropsWithoutRef<"button">, "className">;

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

function Button({ variant, size, className, children, ...props }: ButtonProps) {
	const classes = cn(buttonVariants({ variant, size }), className);

	if ("href" in props && props.href) {
		const { href, ...rest } = props as ButtonAsAnchor;
		const isExternal = href.startsWith("http");
		return (
			<a
				href={href}
				className={classes}
				{...(isExternal
					? { target: "_blank", rel: "noopener noreferrer" }
					: {})}
				{...rest}
			>
				{children}
			</a>
		);
	}

	return (
		<button className={classes} {...(props as ButtonAsButton)}>
			{children}
		</button>
	);
}

export { Button, buttonVariants };
export type { ButtonProps };
