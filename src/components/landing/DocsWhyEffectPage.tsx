import { DocsLayout } from "./DocsLayout";

const TOC = [
	{ id: "overview", label: "Overview" },
	{ id: "the-effect-pattern", label: "The Effect Pattern" },
	{ id: "dont-re-invent-the-wheel", label: "Don't Re-Invent the Wheel" },
	{ id: "solving-practical-problems", label: "Solving Practical Problems" },
	{ id: "enjoy-building-and-learning", label: "Enjoy Building and Learning" },
];

function CodeBlock({ children }: { children: string }) {
	return (
		<pre className="my-6 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-5 py-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
			<code>{children}</code>
		</pre>
	);
}

export function DocsWhyEffectPage() {
	return (
		<DocsLayout activeSlug="why-effect" tocItems={TOC}>
			<article className="max-w-3xl">
				<h1
					id="overview"
					className="text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
				>
					Why Effect?
				</h1>

				<div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Programming is challenging. When we build libraries and apps, we look
						to many tools to handle the complexity and make our day-to-day more
						manageable. Effect presents a new way of thinking about programming in
						TypeScript.
					</p>
					<p>
						Effect is an ecosystem of tools that help you build better applications
						and libraries. As a result, you will also learn more about the
						TypeScript language and how to use the type system to make your
						programs more reliable and easier to maintain.
					</p>
					<p>
						In "typical" TypeScript, without Effect, we write code that assumes
						that a function is either successful or throws an exception. For
						example:
					</p>
				</div>

				<CodeBlock>{`const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Cannot divide by zero")
  }
  return a / b
}`}</CodeBlock>

				<div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Based on the types, we have no idea that this function can throw an
						exception. We can only find out by reading the code. This may not seem
						like much of a problem when you only have one function in your
						codebase, but when you have hundreds or thousands, it really starts to
						add up. It's easy to forget that a function can throw an exception,
						and it's easy to forget to handle that exception.
					</p>
					<p>
						Often, we will do the "easiest" thing and just wrap the function in a{" "}
						<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
							try/catch
						</code>{" "}
						block. This is a good first step to prevent your program from
						crashing, but it doesn't make it any easier to manage or understand
						our complex application/library. We can do better.
					</p>
					<p>
						One of the most important tools we have in TypeScript is the compiler.
						It is the first line of defense against bugs, domain errors, and
						general complexity.
					</p>
				</div>

				<h2
					id="the-effect-pattern"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					The Effect Pattern
				</h2>
				<div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						While Effect is a vast ecosystem of many different tools, if it had to
						be reduced down to just one idea, it would be the following:
					</p>
					<p>
						Effect's major unique insight is that we can use the type system to
						track <strong className="font-semibold text-zinc-900 dark:text-white">errors</strong> and{" "}
						<strong className="font-semibold text-zinc-900 dark:text-white">context</strong>, not only{" "}
						<strong className="font-semibold text-zinc-900 dark:text-white">success</strong> values as
						shown in the divide example above.
					</p>
					<p>
						Here's the same divide function from above, but with the Effect
						pattern:
					</p>
				</div>

				<CodeBlock>{`import { Effect } from "effect"

const divide = (
  a: number,
  b: number
): Effect.Effect<number, Error, never> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)`}</CodeBlock>

				<div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						With this approach, the function no longer throws exceptions. Instead,
						errors are handled as values, which can be passed along like success
						values. The type signature also makes it clear:
					</p>
					<ul className="ml-6 list-disc space-y-1">
						<li>
							What success value the function returns (
							<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
								number
							</code>
							).
						</li>
						<li>
							What error can occur (
							<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
								Error
							</code>
							).
						</li>
						<li>
							What additional context or dependencies are required (
							<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
								never
							</code>{" "}
							indicates none).
						</li>
					</ul>
				</div>

				<CodeBlock>{`         ┌─── Produces a value of type number
         │       ┌─── Fails with an Error
         │       │      ┌─── Requires no dependencies
         ▼       ▼      ▼
Effect<number, Error, never>`}</CodeBlock>

				<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					Additionally, tracking context allows you to provide additional
					information to your functions without having to pass in everything as an
					argument. For example, you can swap out implementations of live external
					services with mocks during your tests without changing any core business
					logic.
				</p>

				<h2
					id="dont-re-invent-the-wheel"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Don't Re-Invent the Wheel
				</h2>
				<div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Application code in TypeScript often solves the same problems over and
						over again. Interacting with external services, filesystems,
						databases, etc. are common problems for all application developers.
						Effect provides a rich ecosystem of libraries that provide
						standardized solutions to many of these problems.
					</p>
					<p>
						Managing challenges like error handling, debugging, tracing,
						async/promises, retries, streaming, concurrency, caching, resource
						management, and a lot more are made manageable with Effect. You don't
						have to re-invent the solutions to these problems, or install tons of
						dependencies.
					</p>
				</div>

				<h2
					id="solving-practical-problems"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Solving Practical Problems
				</h2>
				<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					Effect is heavily inspired by great work done in other languages, like
					Scala and Haskell. However, it's important to understand that Effect's
					goal is to be a practical toolkit, and it goes to great lengths to solve
					real, everyday problems that developers face when building applications
					and libraries in TypeScript.
				</p>

				<h2
					id="enjoy-building-and-learning"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Enjoy Building and Learning
				</h2>
				<div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Learning Effect is a lot of fun. Many developers in the Effect
						ecosystem are using Effect to solve real problems in their day-to-day
						work, and also experiment with cutting edge ideas for pushing
						TypeScript to be the most useful language it can be.
					</p>
					<p>
						You don't have to use all aspects of Effect at once, and can start with
						the pieces of the ecosystem that make the most sense for the problems
						you are solving. Effect is a toolkit, and you can pick and choose the
						pieces that make the most sense for your use case.
					</p>
					<p>
						The Effect community is always happy to help you learn and grow. Feel
						free to hop into our{" "}
						<a
							href="https://discord.gg/effect-ts"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
						>
							<span className="sr-only">(opens in new tab) </span>
							Discord
						</a>{" "}
						or discuss on{" "}
						<a
							href="https://github.com/Effect-TS"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
						>
							<span className="sr-only">(opens in new tab) </span>
							GitHub
						</a>
						!
					</p>
				</div>
			</article>
		</DocsLayout>
	);
}
