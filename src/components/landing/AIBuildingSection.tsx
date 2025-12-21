import { useState } from "react";

const CODE_EXAMPLE = `import { LanguageModel } from "@effect/ai"
import { AnthropicLanguageModel } from "@effect/ai-anthropic"
import { Effect } from "effect"

const program = Effect.gen(function*() {
  // Use default provider
  const joke1 = yield* LanguageModel.generateText({
    prompt: "Tell me a joke"
  })
  // Switch to Claude for this call
  const joke2 = yield* LanguageModel.generateText({
    prompt: "Tell me a joke"
  }).pipe(Effect.provide(AnthropicLanguageModel.model("claude-sonnet")))

  return { joke1, joke2 }
})`;

const FEATURES = [
	{
		title: "Type-safe data flows",
		description: "Connect AI outputs to frontend UI without schema mismatches.",
		icon: "ri-shape-line",
	},
	{
		title: "Deterministic concurrency",
		description: "Runs and scales agent pipelines safely.",
		icon: "ri-share-forward-line",
	},
	{
		title: "Durable agent execution",
		description: (
			<>
				Reliable communication between nodes with{" "}
				<a
					href="https://effect.website/docs/cluster/introduction"
					target="_blank"
					rel="noopener noreferrer"
					className="text-zinc-300 hover:text-white underline underline-offset-2 transition-colors"
				>
					Effect Cluster
				</a>
				.
			</>
		),
		icon: "ri-history-line",
	},
	{
		title: "Composable infrastructure",
		description: "Easily integrates LLMs, APIs, queues and vector DBs.",
		icon: "ri-stack-line",
	},
];

export function AIBuildingSection() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(CODE_EXAMPLE);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="relative w-full py-20 md:pt-32 md:pb-8 overflow-hidden">
			<div className="relative mx-auto w-full max-w-295">
				{/* Header row with heading, paragraph, links, and code snippet */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 mb-20">
					{/* Left column - Content */}
					<div className="flex flex-col pr-12 px-4 lg:pl-4 lg:pr-12">
						<p className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-500">
							Effect for AI
						</p>
						<h2 className="text-2xl font-semibold text-white md:text-4xl leading-tight">
							Build AI and Agentic Systems
						</h2>
						<p className="mt-4 text-lg text-zinc-400 ">
							Reliable orchestration, parallel execution, state management, and fault recovery — with type safety and semantic observability baked in.
						</p>

						{/* Links */}
						<div className="mt-8 flex gap-3">
							<a
								href="https://effect.website/docs/ai/introduction"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
							>
								<span>Read the docs</span>
								<i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
							</a>
							<a
								href="https://github.com/Effect-TS/effect/tree/main/packages/ai"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
							>
								<i className="ri-github-fill text-sm" />
								<span>GitHub</span>
							</a>
						</div>
					</div>

					{/* Right column - Code block */}
					<div className="relative">
						<div className="relative rounded-lg border border-zinc-800/90 bg-zinc-900 backdrop-blur-sm overflow-hidden ">
							{/* Code header */}
							<div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
								<span className="text-xs font-mono text-zinc-500">multi-provider.ts</span>
								<a
									href="https://effect.website/docs/ai/introduction"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
								>
									<span>Get started</span>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>

							{/* Code content */}
							<div className="relative p-5 overflow-x-auto">
								{/* Copy button inside code area */}
								<button
									type="button"
									onClick={handleCopy}
									className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer"
									aria-label="Copy code"
								>
									<i className={copied ? "ri-check-line text-green-400" : "ri-file-copy-line"} />
								</button>
								<pre className="font-mono text-[13px] leading-relaxed">
									<code className="text-zinc-300">
										{CODE_EXAMPLE.split("\n").map((line: string, i: number) => (
											<div key={i} className="flex">
												<span className="w-8 text-right pr-4 text-zinc-600 select-none">{i + 1}</span>
												<span>
													{highlightLine(line)}
												</span>
											</div>
										))}
									</code>
								</pre>
							</div>
						</div>
					</div>
				</div>

				{/* Features grid - 4 columns with dividers */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4">
					{FEATURES.map((feature, index) => (
						<div
							key={index}
							className={`flex flex-col pl-4 pr-8 py-0 ${
								index !== FEATURES.length - 1 ? `lg:border-r lg:border-dashed ${index === 1 ? "lg:border-transparent" : "lg:border-zinc-700/75"}` : ""
							} ${index === 0 ? "lg:pl-0" : ""} ${index === FEATURES.length - 1 ? "lg:pr-0" : ""}`}
						>
							<i className={`${feature.icon} text-lg text-zinc-500 mb-2`} />
							<h3 className="text-base font-semibold text-zinc-300">
								{feature.title}
							</h3>
							<p className="text-sm mt-1 text-zinc-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// Simple syntax highlighting
function highlightLine(line: string): React.ReactNode {
	// Comments
	if (line.trim().startsWith("//")) {
		return <span className="text-zinc-500">{line}</span>;
	}

	// Check for import statements
	if (line.includes("import") || line.includes("from")) {
		const parts: React.ReactNode[] = [];
		const segments = line.split(/(import|from|["'][^"']+["'])/g);
		segments.forEach((segment, i) => {
			if (segment === "import" || segment === "from") {
				parts.push(<span key={i} className="text-violet-400">{segment}</span>);
			} else if (segment.startsWith('"') || segment.startsWith("'")) {
				parts.push(<span key={i} className="text-emerald-400">{segment}</span>);
			} else {
				parts.push(<span key={i}>{segment}</span>);
			}
		});
		return <>{parts}</>;
	}

	// Check for const declarations
	if (line.includes("const ")) {
		const parts: React.ReactNode[] = [];
		const segments = line.split(/(const|["'][^"']+["'])/g);
		segments.forEach((segment, i) => {
			if (segment === "const") {
				parts.push(<span key={i} className="text-violet-400">{segment}</span>);
			} else if (segment.startsWith('"') || segment.startsWith("'")) {
				parts.push(<span key={i} className="text-emerald-400">{segment}</span>);
			} else {
				parts.push(<span key={i}>{segment}</span>);
			}
		});
		return <>{parts}</>;
	}

	// Highlight strings in other lines
	const stringParts = line.split(/(["'][^"']*["'])/g);
	if (stringParts.length > 1) {
		return (
			<>
				{stringParts.map((part, i) =>
					part.startsWith('"') || part.startsWith("'") ? (
						<span key={i} className="text-emerald-400">{part}</span>
					) : (
						<span key={i}>{part}</span>
					)
				)}
			</>
		);
	}

	return line;
}
