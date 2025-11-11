import { useState } from "react";

export function FAQSection() {
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

	const faqs = [
		{
			question: "Why is the syntax different from typical TypeScript?",
			answer: (
				<>
					<p>
						Effect's syntax may feel unfamiliar at first: yield*, Effect.gen,
						TaggedError… But that's because it's doing something TypeScript
						can't do on its own.
					</p>
					<p className="mt-4">That "weirdness" unlocks:</p>
					<ul className="ml-5 mt-2 list-disc space-y-1">
						<li>Typed, composable errors.</li>
						<li>Dependency injection with no globals.</li>
						<li>Interruptible workflows.</li>
						<li>
							Business logic you can reason about, reuse, and test in isolation.
						</li>
					</ul>
				</>
			),
		},
		{
			question: "How long does it take to learn?",
			answer: (
				<p>
					You can be productive in a few days. Start by replacing await with
					yield*, everything else follows naturally.
				</p>
			),
		},
		{
			question: "How do I convince my team to start using Effect?",
			answer: (
				<>
					<p>Start small. Pick one problem everyone hates:</p>
					<ul className="mb-4 ml-5 mt-2 list-disc space-y-1">
						<li>Dependency injection…</li>
						<li>Error management…</li>
						<li>Concurrency…</li>
					</ul>
					<p>The code quality speaks for itself.</p>
				</>
			),
		},
		{
			question: "What about performance overhead?",
			answer: (
				<>
					<p>
						Effect adds minimal overhead and prevents the <em>real</em>{" "}
						performance killers:
					</p>
					<ul className="mb-4 ml-5 mt-2 list-disc space-y-1">
						<li>Memory leaks</li>
						<li>Orphaned async ops</li>
						<li>Resource exhaustion</li>
						<li>Inconsistent error handling</li>
					</ul>
					<p>
						The runtime overhead is minimal, and the structured approach leads
						to more efficient code organization and execution.
					</p>
				</>
			),
		},
		{
			question: "How does Effect compare to other libraries?",
			answer: (
				<>
					<p>
						Effect covers a broader scope than most libraries in the TypeScript
						ecosystem — combining async control, dependency management, error
						handling, and observability in one cohesive runtime.
					</p>
					<p className="mt-4">See how it compares to:</p>
					<ul className="ml-5 mt-2 list-disc space-y-1">
						<li>
							<a
								href="https://effect.website/docs/additional-resources/myths/#effect-is-the-same-as-rxjs-and-shares-its-problems"
								className="text-white underline transition-colors hover:text-zinc-300"
								target="_blank"
								rel="noopener noreferrer"
							>
								RxJS
							</a>
						</li>
						<li>
							<a
								href="https://effect.website/docs/additional-resources/effect-vs-fp-ts/"
								className="text-white underline transition-colors hover:text-zinc-300"
								target="_blank"
								rel="noopener noreferrer"
							>
								fp-ts
							</a>
						</li>
						<li>
							<a
								href="https://effect.website/docs/additional-resources/effect-vs-neverthrow/"
								className="text-white underline transition-colors hover:text-zinc-300"
								target="_blank"
								rel="noopener noreferrer"
							>
								Neverthrow
							</a>
						</li>
					</ul>
				</>
			),
		},
		{
			question: "Is it possible to adopt Effect in an existing codebase?",
			answer: (
				<>
					<p>
						Yes! You can start small, wrapping existing async code or APIs in
						Effect and expanding from there:
					</p>
					<pre className="mb-3 mt-3 overflow-x-auto rounded-lg bg-zinc-900 p-4">
						<code className="text-sm text-zinc-300 font-mono">
							<span style={{ color: "#7c7c7c" }}>
								{"// Enter the Effect world"}
							</span>
							{"\n"}
							{"Effect.tryPromise(() => nonEffectAPI())"}
							{"\n\n"}
							<span style={{ color: "#7c7c7c" }}>
								{"// Exit back to normal promises"}
							</span>
							{"\n"}
							{"Effect.runPromise(myProgram)"}
						</code>
					</pre>
					<p>
						From there, you can progressively refactor leaf modules into
						Effects, moving upward through your codebase. Many teams start by
						converting a few async functions or services, then gradually
						introduce layers (for dependency management) and runtime management
						to handle the rest of the app.
					</p>
				</>
			),
		},
	];

	return (
		<section className="relative w-full px-4 py-20 md:px-8 md:py-32">
			<div className="mx-auto w-full max-w-[80rem]">
				<div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
					{/* Left column - Heading */}
					<div className="lg:w-1/3">
						<h2 className="text-3xl font-bold leading-tight text-white">
							Questions we get asked a lot...
						</h2>
					</div>

					{/* Right column - FAQs */}
					<div className="flex flex-col gap-6 lg:w-2/3">
						{faqs.map((faq, index) => {
							const isOpen = openIndices.has(index);
							return (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: It's okay. Just chill, Biome.
									key={index}
									className="flex w-full flex-col border-b border-zinc-600 bg-zinc-950 pb-6"
								>
								<button
									type="button"
									onClick={() => {
										setOpenIndices((prev) => {
											const next = new Set(prev);
											if (next.has(index)) {
												next.delete(index);
											} else {
												next.add(index);
											}
											return next;
										});
									}}
									className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent text-left"
									aria-expanded={isOpen}
								>
									<span className={`pr-4 text-lg font-medium transition-colors ${isOpen ? "text-white" : "text-zinc-300"}`}>
										{faq.question}
									</span>
									<i
										className={`ri-arrow-right-s-line flex-shrink-0 text-[32px] leading-none transition-all ${
											isOpen ? "rotate-90 text-white" : "text-zinc-300"
										}`}
									/>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										isOpen ? "mt-5 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="text-base leading-relaxed text-zinc-300">
										{faq.answer}
									</div>
								</div>
							</div>
						);
					})}
					</div>
				</div>
			</div>
		</section>
	);
}
