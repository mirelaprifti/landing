import { type ReactNode, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type FAQItem = { question: string; answer: ReactNode };

/** Accordion of questions — any number can be open at once. */
export function FAQList({
	items,
	className,
}: {
	items: FAQItem[];
	className?: string;
}) {
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

	const toggleQuestion = (index: number) => {
		setOpenIndices((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	};

	return (
		<div className={`space-y-4 ${className ?? ""}`}>
			{items.map((faq, index) => {
				const isOpen = openIndices.has(index);
				return (
					<div
						key={faq.question}
						className={`rounded-md border transition-colors duration-200 ${
							isOpen
								? "border-zinc-300 bg-zinc-100/40 dark:border-zinc-700 dark:bg-zinc-900/40"
								: "border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100/50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/50"
						}`}
					>
						<button
							type="button"
							onClick={() => toggleQuestion(index)}
							className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
							aria-expanded={isOpen}
						>
							{/* Question text */}
							<span
								className={`text-base leading-snug font-medium transition-colors ${
									isOpen
										? "text-zinc-900 dark:text-white"
										: "text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white"
								}`}
							>
								{faq.question}
							</span>

							{/* Toggle icon */}
							<div
								className={`flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-200 ${
									isOpen
										? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
										: "bg-zinc-200/80 text-zinc-600 group-hover:bg-zinc-300 dark:bg-zinc-800/80 dark:text-zinc-400 dark:group-hover:bg-zinc-700"
								}`}
							>
								<Icon
									name="chevron-down"
									className={`text-base transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
								/>
							</div>
						</button>

						{/* Answer */}
						<div
							className={`grid transition-all duration-300 ease-out ${
								isOpen
									? "grid-rows-[1fr] opacity-100"
									: "grid-rows-[0fr] opacity-0"
							}`}
						>
							<div className="overflow-hidden">
								<div className="px-5 pb-5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
									{faq.answer}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
