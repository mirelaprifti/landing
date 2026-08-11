import { Button } from "@/components/ui";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SaveToCalendar } from "./SaveToCalendar";

/**
 * The "Enjoy Effect Days" closing CTA.
 *
 * Rendered on both the Effect Days page and About Livorno, which used to keep
 * byte-identical copies. It is one component so a change lands on both — the
 * pages differ only in where the ticket button points.
 *
 * Callers still place their own <SectionDivider /> above it.
 */

/* Canonical text styles copied verbatim from TypographyStyleguidePage (/styleguide). */
const text = {
	eyebrow:
		"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400",
	sectionTitle:
		"leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white",
	subtitle: "mt-4 text-lg text-zinc-600 dark:text-zinc-400",
};

/* Styleguide chrome strings — copy verbatim. */
const container = "mx-auto w-full max-w-[73.75rem] px-4";

export function EnjoyEffectDaysCTA({
	ticketsHref = "#tickets",
	/** arrow-up when tickets are further up the same page, arrow-right when the
	 *  button leaves for another one. */
	arrowIcon = "arrow-up",
}: {
	ticketsHref?: string;
	arrowIcon?: IconName;
} = {}) {
	return (
		<section className="relative overflow-hidden py-24 md:py-32">
			{/* Single horizontal line — sits on the CTA heading's first-line baseline.
			    The grid below is items-center, so anything that changes either
			    column's height moves the heading and this needs re-measuring. */}
			<div
				className="pointer-events-none absolute inset-0 hidden md:block"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(39, 39, 42, 0.8) 1px, transparent 1px)",
					backgroundSize: "100% 1px",
					backgroundPosition: "0px 210px",
					backgroundRepeat: "no-repeat",
				}}
			/>
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, #09090b 0%, transparent 25%, transparent 75%, #09090b 100%)",
				}}
			/>

			<div className={`relative ${container}`}>
				<div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-8">
					{/* Content */}
					<div className="text-center md:col-span-6 md:mt-2 md:pr-4 md:text-left">
						<p className={text.eyebrow}>
							{"// "}Dec 9–11, 2026 · Livorno, Italy
						</p>
						<h2 className={text.sectionTitle}>Enjoy Effect Days</h2>
						<p className={`${text.subtitle} max-w-md`}>
							Three days with the people building Effect{" "}
							<br className="hidden lg:inline" />
							and the people building with it.
						</p>
					</div>

					{/* CTA — bracket box centred in the right half (cols 7-12) */}
					<div className="md:col-span-6 md:col-start-7 md:mt-[9px] md:self-start">
						<div className="relative mx-auto flex max-w-xs flex-col items-center gap-3 px-6 py-6 md:max-w-[23rem]">
							{/* Corner brackets */}
							<span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-zinc-300 dark:border-zinc-700" />
							<span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-zinc-300 dark:border-zinc-700" />
							<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-300 dark:border-zinc-700" />
							<span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-zinc-300 dark:border-zinc-700" />

							<Button
								href={ticketsHref}
								variant="primary"
								size="lg"
								className="w-full"
							>
								Get tickets
								<Icon
									name={arrowIcon}
									className="text-base"
									aria-hidden="true"
								/>
							</Button>
							{/* Fallback for anyone who reached the end without buying — the
							    date is the next best thing to take away. */}
							<SaveToCalendar fullWidth />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
