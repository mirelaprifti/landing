import { Button } from "@/components/ui";
import { EffectDieExample } from "@/examples/effect-die";
import { EffectFailExample } from "@/examples/effect-fail";
import { EffectOrElseExample } from "@/examples/effect-orelse";
import { EffectSleepExample } from "@/examples/effect-sleep";
import { EffectSucceedExample } from "@/examples/effect-succeed";
import type { ExampleComponentProps } from "@/lib/example-types";
import { getExampleMeta } from "@/lib/examples-manifest";
import { Icon } from "@/components/ui/Icon";

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
		<section className="relative w-full overflow-hidden pt-20 pb-20 md:pt-32 md:pb-24">
			{/* Top gradient border */}
			<div
				className="absolute top-0 right-0 left-0 h-[2px]"
				style={{
					background:
						"linear-gradient(to right, rgba(9, 9, 11, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(9, 9, 11, 0) 100%)",
				}}
			></div>

			<div className="container mx-auto w-full px-12 md:px-8">
				{/* Visual Effect Container */}
				<div className="relative mx-auto flex w-full max-w-[66.5rem] flex-col px-0 py-6">
					{/* Heading, Description and Link */}
					<div className="mb-8 flex w-full flex-col items-center gap-4">
						<h2 className="leading-tighter text-2xl font-bold text-white">
							Visual Effect examples
						</h2>
						<p className="text-lg text-zinc-400">
							Tap an icon to run, interrupt, or reset an Effect.
						</p>
						<Button href="https://effect.kitlangton.com/" variant="secondary" size="lg">
							<span>Visualize Effect</span>
							<Icon name="arrow-up-right" className="text-base" />
						</Button>
					</div>

					{/* Grid Layout for Examples */}
					<div className="flex flex-col">
						{/* Row 1: Effect.succeed, Effect.die, Effect.fail */}
						<div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
							{row1Examples.map((exampleId, index) => {
								const metadata = getExampleMeta(exampleId);
								const Component = EXAMPLE_COMPONENTS[exampleId];
								return (
									<div key={exampleId} className="h-full w-full text-sm">
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
						<div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
							{row2Examples.map((exampleId, index) => {
								const metadata = getExampleMeta(exampleId);
								const Component = EXAMPLE_COMPONENTS[exampleId];
								return (
									<div key={exampleId} className="h-full w-full text-sm">
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
