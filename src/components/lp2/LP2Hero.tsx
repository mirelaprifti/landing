import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

export function LP2Hero() {
	return (
		<section className="relative w-full py-20 md:py-32">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Eyebrow */}
				<p className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-400">
					The TypeScript Library for Production
				</p>

				{/* Main headline */}
				<h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
					Why Effect?
				</h1>

				{/* Subheadline */}
				<p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
					Because your TypeScript deserves better than scattered try-catches,
					dependency chaos, and mystery crashes at 3am.
				</p>

				{/* Value proposition */}
				<p className="mt-4 max-w-2xl text-lg text-zinc-400">
					Effect gives you typed errors, built-in dependency injection,
					structured concurrency, and observability — all in one library.
				</p>

				{/* CTA Buttons */}
				<div className="mt-10 flex flex-wrap gap-4">
					<Button
						href="https://effect.website/docs/getting-started/introduction"
						variant="primary"
						size="lg"
						className="inline-flex items-center gap-2"
					>
						Get Started
						<Icon name="arrow-right" className="text-lg" />
					</Button>
					<Button
						href="https://effect.website/docs"
						variant="secondary"
						size="lg"
					>
						Read the Docs
					</Button>
				</div>

				{/* Quick stats */}
				<div className="mt-16 flex flex-wrap gap-12">
					<div>
						<p className="text-3xl font-bold text-white">50k+</p>
						<p className="text-sm text-zinc-400">Weekly Downloads</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-white">8k+</p>
						<p className="text-sm text-zinc-400">GitHub Stars</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-white">5k+</p>
						<p className="text-sm text-zinc-400">Discord Members</p>
					</div>
				</div>
			</div>
		</section>
	);
}
