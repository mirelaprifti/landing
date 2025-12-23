import { useState } from "react";

const TRADITIONAL_CODE = `// Traditional: runs immediately, errors are invisible
const user = await fetch('/api/user')
  .then(r => r.json())
  .catch(e => console.error(e)) // e is unknown

// What if it fails? What dependencies does it need?
// How do you test this? How do you trace it?`;

const EFFECT_CODE = `// Effect: composable, typed errors, observable
const getUser = Effect.tryPromise({
  try: () => fetch('/api/user').then(r => r.json()),
  catch: () => new ApiError({ endpoint: '/api/user' })
})

// Compose with retry, timeout, tracing
const program = getUser.pipe(
  Effect.retry(Schedule.exponential('100 millis')),
  Effect.timeout('5 seconds'),
  Effect.withSpan('get-user')
)

// Run when YOU decide
await Effect.runPromise(program)`;

export function WhatIsEffectSection() {
	const [activeTab, setActiveTab] = useState<"traditional" | "effect">("effect");

	return (
		<section className="relative w-full overflow-hidden py-16 md:pt-24 md:pb-24">
			<div className="relative mx-auto w-full max-w-295 px-4">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0">
					{/* Left column - Content */}
					<div className="flex flex-col pr-20">
						<p className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-500 uppercase">
							The mental model
						</p>
						<h2 className="text-2xl leading-tight font-semibold text-white md:text-3xl">
							An Effect is a blueprint, not an action
						</h2>
						<p className="mt-4 text-lg text-zinc-400">
							When you write <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-300">fetch('/api/user')</code>, it runs immediately. When you write <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-300">Effect.tryPromise(...)</code>, nothing happens yet.
						</p>
						<p className="mt-4 text-lg font-medium text-zinc-300">
							An Effect is a <span className="text-zinc-200">description</span> of what <em>should</em> happen, a recipe you can compose, retry, time out, or run in parallel. It only executes when you decide.
						</p>
						<p className="mt-4 text-lg text-zinc-400">
							This simple shift unlocks everything without changing how you think about your code.
						</p>

						{/* Key benefits */}
						<div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2">
							<div className="flex items-center gap-2">
								<i className="ri-checkbox-circle-line text-zinc-600" />
								<span className="text-sm text-zinc-300">Typed errors</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="ri-checkbox-circle-line text-zinc-600" />
								<span className="text-sm text-zinc-300">Composable operations</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="ri-checkbox-circle-line text-zinc-600" />
								<span className="text-sm text-zinc-300">Built-in observability</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="ri-checkbox-circle-line text-zinc-600" />
								<span className="text-sm text-zinc-300">Safe concurrency</span>
							</div>
						</div>
					</div>

					{/* Right column - Code comparison */}
					<div className="relative lg:-mr-4">
						<div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
							{/* Tabs */}
							<div className="flex border-b border-zinc-800">
								<button
									type="button"
									onClick={() => setActiveTab("traditional")}
									className={`flex-1 px-4 py-3 font-mono text-sm transition-colors ${
										activeTab === "traditional"
											? "bg-zinc-800/50 text-white"
											: "text-zinc-400 hover:text-zinc-200"
									}`}
								>
									Traditional
								</button>
								<button
									type="button"
									onClick={() => setActiveTab("effect")}
									className={`flex-1 px-4 py-3 font-mono text-sm transition-colors ${
										activeTab === "effect"
											? "bg-zinc-800/50 text-white"
											: "text-zinc-400 hover:text-zinc-200"
									}`}
								>
									With Effect
								</button>
							</div>

							{/* Code content */}
							<div className="overflow-x-auto p-5">
								<pre className="font-mono text-[13px] leading-relaxed">
									<code className="text-zinc-300">
										{(activeTab === "traditional" ? TRADITIONAL_CODE : EFFECT_CODE)
											.split("\n")
											.map((line: string, i: number) => (
												<div key={i} className="flex">
													<span className="w-6 pr-3 text-right text-zinc-600 select-none">
														{i + 1}
													</span>
													<span>{highlightLine(line)}</span>
												</div>
											))}
									</code>
								</pre>
							</div>
						</div>

						{/* Callout */}
						{activeTab === "effect" && (
							<div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
								<p className="text-sm text-emerald-300">
									<i className="ri-lightbulb-line mr-2" />
									<code className="rounded bg-emerald-500/10 px-1 font-mono text-xs">ApiError</code> is part of the type signature. You can't forget to handle it.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

// Simple syntax highlighting
function highlightLine(line: string): React.ReactNode {
	// Comments
	if (line.trim().startsWith("//")) {
		return <span className="text-zinc-500 italic">{line}</span>;
	}

	// Keywords
	const keywords = ["const", "await", "import", "from", "new", "return"];
	let result = line;
	const parts: React.ReactNode[] = [];

	// Split by strings first
	const stringPattern = /(["'`][^"'`]*["'`])/g;
	const segments = line.split(stringPattern);

	segments.forEach((segment, i) => {
		if (segment.startsWith('"') || segment.startsWith("'") || segment.startsWith("`")) {
			parts.push(
				<span key={i} className="text-emerald-400">
					{segment}
				</span>
			);
		} else {
			// Check for keywords in non-string segments
			let remaining = segment;
			const keywordParts: React.ReactNode[] = [];
			let keyIndex = 0;

			keywords.forEach((kw) => {
				const regex = new RegExp(`\\b(${kw})\\b`, "g");
				remaining = remaining.replace(regex, `<<<KW_${kw}>>>`);
			});

			const kwSegments = remaining.split(/(<<<KW_[^>]+>>>)/g);
			kwSegments.forEach((seg, j) => {
				const kwMatch = seg.match(/<<<KW_([^>]+)>>>/);
				if (kwMatch) {
					keywordParts.push(
						<span key={`${i}-${j}`} className="text-violet-400">
							{kwMatch[1]}
						</span>
					);
				} else {
					keywordParts.push(<span key={`${i}-${j}`}>{seg}</span>);
				}
			});

			parts.push(<span key={i}>{keywordParts}</span>);
		}
	});

	return <>{parts}</>;
}
