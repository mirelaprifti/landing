interface ButtonProps {
	href: string;
	icon: string;
	text: string;
	className?: string;
}

export function Button({ href, icon, text, className = "" }: ButtonProps) {
	const isExternal = href.startsWith("http");

	return (
		<a
			href={href}
			{...(isExternal
				? { target: "_blank", rel: "noopener noreferrer" }
				: {})}
			className={`flex w-fit items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-black px-5 py-5 text-lg font-medium text-white transition-colors hover:border-zinc-400 ${className}`}
		>
			<span className="flex h-6 w-6 items-center justify-center">
				<i className={`${icon} text-lg leading-none text-white`} />
			</span>
			<span>{text}</span>
		</a>
	);
}
