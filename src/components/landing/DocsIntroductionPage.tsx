import { DocsLayout } from "./DocsLayout";

const TOC = [
	{ id: "overview", label: "Overview" },
	{ id: "how-to-use-these-docs", label: "How to Use These Docs" },
	{ id: "coding-with-llms", label: "Coding with LLMs" },
	{ id: "join-our-community", label: "Join our Community" },
];

const FEATURES = [
	{
		name: "Concurrency",
		desc: "Achieve highly-scalable, ultra low-latency applications through Effect's fiber-based concurrency model.",
	},
	{
		name: "Composability",
		desc: "Construct highly maintainable, readable, and flexible software through the use of small, reusable building blocks.",
	},
	{
		name: "Resource Safety",
		desc: "Safely manage acquisition and release of resources, even when your program fails.",
	},
	{
		name: "Type Safety",
		desc: "Leverage the TypeScript type system to the fullest with Effect's focus on type inference and type safety.",
	},
	{
		name: "Error Handling",
		desc: "Handle errors in a structured and reliable manner using Effect's built-in error handling capabilities.",
	},
	{
		name: "Asynchronicity",
		desc: "Write code that looks the same, whether it is synchronous or asynchronous.",
	},
	{
		name: "Observability",
		desc: "With full tracing capabilities, you can easily debug and monitor the execution of your Effect program.",
	},
];

export function DocsIntroductionPage() {
	return (
		<DocsLayout activeSlug="introduction" tocItems={TOC}>
			<article className="max-w-3xl">
				<h1
					id="overview"
					className="text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
				>
					Introduction
				</h1>

				<div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>Welcome to the Effect documentation!</p>
					<p>
						Effect is a powerful TypeScript library designed to help developers
						easily create complex, synchronous, and asynchronous programs.
					</p>
					<p>Some of the main Effect features include:</p>
				</div>

				{/* Features table */}
				<div className="mt-8 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
								<th className="px-4 py-3 font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
									Feature
								</th>
								<th className="px-4 py-3 font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
									Description
								</th>
							</tr>
						</thead>
						<tbody>
							{FEATURES.map((feature) => (
								<tr
									key={feature.name}
									className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
								>
									<td className="px-4 py-3 align-top text-sm font-semibold text-zinc-900 dark:text-white">
										{feature.name}
									</td>
									<td className="px-4 py-3 align-top text-sm text-zinc-700 dark:text-zinc-300">
										{feature.desc}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<h2
					id="how-to-use-these-docs"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					How to Use These Docs
				</h2>
				<div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						The documentation is structured in a sequential manner, starting from
						the basics and progressing to more advanced topics. This allows you to
						follow along step-by-step as you build your Effect application.
						However, you have the flexibility to read the documentation in any
						order or jump directly to the pages that are relevant to your specific
						use case.
					</p>
					<p>
						To facilitate navigation within a page, you will find a table of
						contents on the right side of the screen. This allows you to easily
						jump between different sections of the page.
					</p>
				</div>

				<h2
					id="coding-with-llms"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Coding with LLMs
				</h2>
				<div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						The following article describes how to use Effect with LLMs:{" "}
						<a
							href="https://effect.website/blog/the-one-weird-git-trick-that-makes-coding-agents-more-effect-ive/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
						>
							<span className="sr-only">(opens in new tab) </span>
							The one weird git trick that makes coding agents more Effect-ive
						</a>
						.
					</p>
					<p>
						When using LLMs it is also very important to optimize the feedback loop
						to be as tight as possible. That can include writing custom linting
						rules to fit your style preferences and patterns. An example of a
						repository optimized for agentic coding can be found at{" "}
						<a
							href="https://github.com/mikearnaldi/accountability"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
						>
							<span className="sr-only">(opens in new tab) </span>
							mikearnaldi/accountability
						</a>
						.
					</p>
					<p>
						A key part of optimizing the feedback loop (and the developer
						experience in general when using Effect) is to use the Effect LSP
						plugin. We advise using the latest <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">tsgo</code> implementation at{" "}
						<a
							href="https://github.com/Effect-TS/tsgo"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
						>
							<span className="sr-only">(opens in new tab) </span>
							Effect-TS/tsgo
						</a>
						.
					</p>
				</div>

				<h2
					id="join-our-community"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Join our Community
				</h2>
				<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					If you have questions about anything related to Effect, you're always
					welcome to ask our community on{" "}
					<a
						href="https://discord.gg/effect-ts"
						target="_blank"
						rel="noopener noreferrer"
						className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
					>
						Discord
					</a>
					.
				</p>
			</article>
		</DocsLayout>
	);
}
