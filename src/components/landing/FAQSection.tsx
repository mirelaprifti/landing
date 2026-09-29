import type { ReactNode } from "react";
import { Button, Link } from "@/components/ui";
import { type FAQItem, FAQList } from "./FAQList";

/** Inline code inside an FAQ answer. */
export const faqCode =
	"rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";

/**
 * The site's FAQ section. Defaults to the homepage content; other pages
 * pass their own heading, CTA, and questions so the design stays identical.
 */
export function FAQSection({
	id,
	className,
	title = "Questions we get asked a lot",
	subtitle = (
		<>
			Can't find what you're looking for? Our community is always happy to help.
		</>
	),
	cta,
	items,
}: {
	id?: string;
	className?: string;
	title?: string;
	subtitle?: ReactNode;
	cta?: ReactNode;
	items?: FAQItem[];
} = {}) {
	const defaultFaqs = [
		{
			question: "Why is the syntax different from typical TypeScript?",
			answer: (
				<>
					<p>
						Effect's syntax may feel unfamiliar at first:{" "}
						<code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
							yield*
						</code>
						,{" "}
						<code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
							Effect.gen
						</code>
						,{" "}
						<code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
							TaggedError
						</code>
						… But that's because it's doing something TypeScript can't do on its
						own.
					</p>
					<p className="mt-4">That "weirdness" unlocks:</p>
					<ul className="mt-2 ml-5 list-disc space-y-1">
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
					You can be productive in a few days. Start by replacing{" "}
					<code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
						await
					</code>{" "}
					with{" "}
					<code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
						yield*
					</code>
					, everything else follows naturally.
				</p>
			),
		},
		{
			question: "How do I convince my team to start using Effect?",
			answer: (
				<>
					<p>Start small. Pick one problem everyone hates:</p>
					<ul className="mt-2 mb-4 ml-5 list-disc space-y-1">
						<li>Dependency injection…</li>
						<li>Error management…</li>
						<li>Concurrency…</li>
					</ul>
					<p>Let the quality of the code speak for itself.</p>
				</>
			),
		},
		{
			question: "What about performance overhead?",
			answer: (
				<>
					<p>
						Effect prevents the <em>real</em> performance killers:
					</p>
					<ul className="mt-2 mb-4 ml-5 list-disc space-y-1">
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
					<ul className="mt-2 ml-5 list-disc space-y-1">
						<li>
							<Link
								href="https://effect.website/docs/additional-resources/myths/#effect-is-the-same-as-rxjs-and-shares-its-problems"
								variant="inline"
							>
								RxJS
							</Link>
						</li>
						<li>
							<Link
								href="https://effect.website/docs/additional-resources/effect-vs-fp-ts/"
								variant="inline"
							>
								fp-ts
							</Link>
						</li>
						<li>
							<Link
								href="https://effect.website/docs/additional-resources/effect-vs-neverthrow/"
								variant="inline"
							>
								Neverthrow
							</Link>
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
					<pre className="mt-3 mb-3 overflow-x-auto border border-zinc-200 bg-zinc-100/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
						<code className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
							<span className="text-zinc-600 dark:text-zinc-400">
								{"// Enter the Effect world"}
							</span>
							{"\n"}
							{"Effect.tryPromise(() => nonEffectAPI())"}
							{"\n\n"}
							<span className="text-zinc-600 dark:text-zinc-400">
								{"// Exit back to normal promises"}
							</span>
							{"\n"}
							{"Effect.runPromise(myProgram)"}
						</code>
					</pre>
					<p>
						From there, you can progressively refactor leaf modules into
						Effects, moving upward through your codebase.
					</p>
				</>
			),
		},
	];

	return (
		<section
			id={id}
			className={`relative w-full py-24 md:pt-40 md:pb-24 ${className ?? ""}`}
		>
			<div className="mx-auto w-full max-w-[73.75rem]">
				{/* Two-column layout */}
				<div className="flex flex-col lg:flex-row">
					{/* Left column - Header and CTA (50%) */}
					<div className="w-full px-4 lg:w-1/2">
						<div>
							<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
								// FAQ
							</p>
							<h2 className="leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white">
								{title}
							</h2>

							<p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
								{subtitle}
							</p>

							{cta ?? (
								<Button
									href="https://discord.gg/effect-ts"
									variant="secondary"
									size="md"
									className="mt-6"
								>
									<i className="ri-discord-fill text-base" />
									<span>Ask on Discord</span>
								</Button>
							)}
						</div>
					</div>

					{/* Right column - FAQ items (50%) */}
					<div className="w-full lg:w-1/2">
						<FAQList items={items ?? defaultFaqs} className="pt-27 pr-4 pl-3" />
					</div>
				</div>
			</div>
		</section>
	);
}
