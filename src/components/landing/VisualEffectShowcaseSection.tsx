import { EffectSucceedExample } from "@/examples/effect-succeed";
import { EffectFailExample } from "@/examples/effect-fail";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectSleepExample } from "@/examples/effect-sleep";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { getExampleMeta } from "@/lib/examples-manifest";
import type { ExampleComponentProps } from "@/lib/example-types";

const EXAMPLE_COMPONENTS: Record<
	string,
	React.ComponentType<ExampleComponentProps>
> = {
	"effect-succeed": EffectSucceedExample,
	"effect-fail": EffectFailExample,
	"effect-die": EffectDieExample,
	"effect-sleep": EffectSleepExample,
	"effect-orelse": EffectOrElseExample,
};

export function VisualEffectShowcaseSection() {
	// Grid layout examples - Row 1: succeed, die, fail; Row 2: orElse, sleep
	const row1Examples = ["effect-succeed", "effect-die", "effect-fail"];
	const row2Examples = ["effect-orelse", "effect-sleep"];

	return (
		<section className="relative w-full overflow-hidden pt-20 md:pt-32 pb-20 md:pb-24">
			{/* Top gradient border */}
			<div
				className="absolute left-0 right-0 top-0 h-[2px]"
				style={{
					background:
						"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(9, 9, 11, 0) 100%)",
				}}
			></div>

			<div className="container mx-auto w-full px-4 md:px-8">
				{/* Heading and Subheading */}
				<div className="mx-auto mb-8 flex w-full flex-col items-center gap-8">
					<h2 className="text-center text-3xl font-bold leading-tight text-white">
						See Effect in action
					</h2>
					<a
						href="https://effect.kitlangton.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 border border-zinc-600 rounded-lg px-4 py-2 font-inter font-medium text-base text-white transition-colors hover:bg-zinc-900/50 hover:border-zinc-300"
					>
						<span>Visualize Effect</span>
						<i className="ri-arrow-right-up-line text-base"></i>
					</a>
				</div>

				{/* Visual Effect Container */}
				<div className="mx-auto flex w-full max-w-[66.5rem] flex-col relative px-0 py-6">
					{/* Grid Layout for Examples */}
					<div className="flex flex-col gap-4">
						{/* Row 1: Effect.succeed, Effect.die, Effect.fail */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
							{row1Examples.map((exampleId, index) => {
								const metadata = getExampleMeta(exampleId);
								const Component = EXAMPLE_COMPONENTS[exampleId];
								return (
									<div key={exampleId} className="w-full text-sm h-full">
										{metadata && Component && (
											<Component
												metadata={metadata}
												exampleId={exampleId}
												index={index}
											/>
										)}
									</div>
								);
							})}
						</div>

						{/* Row 2: Effect.orElse, Effect.sleep */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
							{row2Examples.map((exampleId, index) => {
								const metadata = getExampleMeta(exampleId);
								const Component = EXAMPLE_COMPONENTS[exampleId];
								return (
									<div key={exampleId} className="w-full text-sm h-full">
										{metadata && Component && (
											<Component
												metadata={metadata}
												exampleId={exampleId}
												index={index + row1Examples.length}
											/>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
