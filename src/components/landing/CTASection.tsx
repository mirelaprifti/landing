import { Button } from "@/components/ui";
import { HeroCommandPanel } from "./HeroCommandPanel";
import { Icon } from "@/components/ui/Icon";

export function CTASection({
	v4Stable = false,
}: {
	/** Launch variant: describe v4 as stable instead of beta in the AI prompt. */
	v4Stable?: boolean;
} = {}) {
	return (
		<section className="relative w-full overflow-hidden py-36 md:py-24">
			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
						linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
					`,
					backgroundSize: "196.6px 180px",
					backgroundPosition: "calc(50% + 97px) 0",
				}}
			/>

			{/* Fade out grid at top and bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, var(--page-fade) 0%, transparent 15%, transparent 80%, var(--page-fade) 100%)",
				}}
			/>

			{/* Texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 hidden opacity-[0.015] dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				}}
			/>

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
				<div className="flex flex-col items-center text-center">
					<p className="mb-3 font-mono text-base text-zinc-500">
						<span>import {"{ "}</span>
						<span className="text-zinc-900 dark:text-white">Effect</span>
						<span>{" }"} from "effect"</span>
					</p>
					<h2 className="leading-tighter max-w-3xl text-4xl font-bold text-zinc-900 dark:text-white">
						Stop installing a new package for every problem
					</h2>

					{/* Unified install + AI prompt panel */}
					<div className="mt-8 w-full max-w-xl">
						<HeroCommandPanel v4Stable={v4Stable} />
					</div>

					{/* CTA Buttons */}
					<div className="mt-6 flex flex-row items-center justify-center gap-3">
						<Button
							href="https://effect.website/docs/"
							variant="secondary"
							size="lg"
							className="group w-44"
						>
							<Icon
								name="arrow-right"
								className="text-lg transition-transform group-hover:translate-x-0.5"
							/>
							Get started
						</Button>
						<Button
							href="https://discord.gg/effect-ts"
							variant="secondary"
							size="lg"
							className="w-44"
						>
							<i className="ri-discord-fill text-lg" />
							Join Discord
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
