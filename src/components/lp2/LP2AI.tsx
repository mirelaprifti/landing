import { getAssetPath } from "../../utils/assetPath";
import { Icon } from "@/components/ui/Icon";

const AI_BENEFITS = [
	{
		title: "Predictable structure",
		description:
			"Every operation follows a declarative pattern — no guesswork for LLMs.",
		icon: "layout-grid" as const,
	},
	{
		title: "Typed feedback loop",
		description:
			"Detailed error traces show what failed, enabling precise self-repair.",
		icon: "refresh-cw" as const,
	},
	{
		title: "Built-in reliability",
		description:
			"Error handling, supervision, and recovery — production-ready by default.",
		icon: "shield-check" as const,
	},
	{
		title: "Rich toolbox",
		description:
			"Schema validation to workflows in a language LLMs easily understand.",
		icon: "wrench" as const,
	},
];

export function LP2AI() {
	return (
		<section className="relative w-full py-16 md:py-24">
			<div className="mx-auto w-full max-w-[73.75rem] px-4">
				{/* Header */}
				<div className="mb-16 max-w-2xl">
					<p className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
						LLMs 🤍 Effect
					</p>
					<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
						Write better code with AI
					</h2>
					<p className="mt-4 text-lg text-zinc-400">
						Effect's declarative patterns and rich type information make it
						ideal for AI-assisted development. LLMs understand Effect code
						better and produce more reliable results.
					</p>
				</div>

				{/* Two columns: Benefits + Quote */}
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					{/* Left: Benefits grid */}
					<div className="grid gap-6 sm:grid-cols-2">
						{AI_BENEFITS.map((benefit, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center gap-2">
									<Icon name={benefit.icon} className="text-lg text-zinc-400" />
									<h3 className="text-base font-semibold text-white">
										{benefit.title}
									</h3>
								</div>
								<p className="pl-7 text-sm leading-relaxed text-zinc-400">
									{benefit.description}
								</p>
							</div>
						))}
					</div>

					{/* Right: Tweet quote */}
					<div className="flex flex-col justify-center">
						<a
							href="https://x.com/davis7/status/1988847914538672262"
							target="_blank"
							rel="noopener noreferrer"
							className="group block rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
						>
							{/* Author */}
							<div className="mb-4 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<img
										src={getAssetPath("/assets/images/bendavis.jpg")}
										alt="Ben Davis"
										className="h-10 w-10 rounded-full object-cover"
									/>
									<div>
										<div className="text-sm font-medium text-white">
											Ben Davis
										</div>
										<div className="text-xs text-zinc-400">@davis7</div>
									</div>
								</div>
								<i className="ri-twitter-x-line text-zinc-400" />
							</div>

							{/* Quote */}
							<p className="text-sm leading-relaxed text-zinc-300">
								<span className="text-zinc-400">@MichaelArnaldi</span> suggested
								cloning the effect repo as a git subtree, giving it to Claude,
								then using that as docs. It sounds absurd, but it's actually
								kind amazing...
							</p>

							<span className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-400">
								Read the full thread <Icon name="arrow-up-right" />
							</span>
						</a>
					</div>
				</div>

				{/* Bottom links */}
				<div className="mt-12 flex flex-wrap gap-4">
					<a
						href="https://www.effect.solutions/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
					>
						Quick start LLM guide
						<Icon name="arrow-up-right" />
					</a>
					<a
						href="https://effect.website/docs/ai/introduction"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-base font-medium text-zinc-400 transition-colors hover:text-white"
					>
						Effect AI docs
						<Icon name="arrow-right" />
					</a>
				</div>
			</div>
		</section>
	);
}
