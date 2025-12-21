import { useState } from "react"

export function FAQSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

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
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li>Typed, composable errors.</li>
            <li>Dependency injection with no globals.</li>
            <li>Interruptible workflows.</li>
            <li>
              Business logic you can reason about, reuse, and test in
              isolation.
            </li>
          </ul>
        </>
      )
    },
    {
      question: "How long does it take to learn?",
      answer: (
        <p>
          You can be productive in a few days. Start by replacing await with
          yield*, everything else follows naturally.
        </p>
      )
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
          <p>The code quality speaks for itself.</p>
        </>
      )
    },
    {
      question: "What about performance overhead?",
      answer: (
        <>
          <p>
            Effect adds minimal overhead and prevents the <em>real</em>{" "}
            performance killers:
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
      )
    },
    {
      question: "How does Effect handle dependency injection?",
      answer: (
        <>
          <p>
            Effect provides first-class dependency injection through Services and Layers.
            Unlike traditional DI frameworks, Effect's approach is:
          </p>
          <ul className="mt-2 mb-4 ml-5 list-disc space-y-1">
            <li>Fully type-safe — dependencies are tracked in the type signature</li>
            <li>No runtime reflection or decorators required</li>
            <li>Composable — build complex dependency graphs from simple pieces</li>
            <li>Testable — easily swap implementations for testing</li>
          </ul>
          <p>
            See the{" "}
            <a
              href="https://effect.website/docs/requirements-management/layers/"
              className="text-white underline transition-colors hover:text-zinc-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Layers documentation
            </a>
            {" "}to learn more.
          </p>
        </>
      )
    },
    {
      question: "How does Effect compare to other libraries?",
      answer: (
        <>
          <p>
            Effect covers a broader scope than most libraries in the
            TypeScript ecosystem — combining async control, dependency
            management, error handling, and observability in one cohesive
            runtime.
          </p>
          <p className="mt-4">See how it compares to:</p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
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
      )
    },
    {
      question: "Is it possible to adopt Effect in an existing codebase?",
      answer: (
        <>
          <p>
            Yes! You can start small, wrapping existing async code or APIs in
            Effect and expanding from there:
          </p>
          <pre className="mt-3 mb-3 overflow-x-auto border border-zinc-800 bg-zinc-900/50 p-4">
            <code className="font-mono text-sm text-zinc-300">
              <span className="text-zinc-500">
                {"// Enter the Effect world"}
              </span>
              {"\n"}
              {"Effect.tryPromise(() => nonEffectAPI())"}
              {"\n\n"}
              <span className="text-zinc-500">
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
      )
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section className="relative w-full py-16 md:pt-32 md:pb-4">
      <div className="mx-auto w-full max-w-[73.75rem]">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left column - Header and CTA (50%) */}
          <div className="w-full lg:w-1/2 px-4">
            <div>
              <p className="mb-2 font-mono text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                FAQ
              </p>
              <h2 className="text-2xl font-semibold text-white md:text-4xl">
                Questions we get asked a lot
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                Can't find what you're looking for? Our community is always
                happy to help.
              </p>

              {/* Discord CTA */}
              <a
                href="https://discord.gg/effect-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
              >
                <i className="ri-discord-fill text-base" />
                <span>Ask on Discord</span>
                <i className="ri-arrow-right-up-line text-xs text-zinc-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300" />
              </a>
            </div>
          </div>

          {/* Right column - FAQ items (50%) */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-3 pt-27 px-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndices.has(index)
                return (
                  <div
                    key={index}
                    className={`border transition-colors duration-200 ${
                      isOpen
                        ? "border-zinc-700 bg-zinc-900/40"
                        : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(index)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      {/* Question text */}
                      <span
                        className={`text-base leading-snug font-medium transition-colors ${
                          isOpen
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {faq.question}
                      </span>

                      {/* Toggle icon */}
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-200 ${
                          isOpen
                            ? "bg-white text-zinc-900"
                            : "bg-zinc-800/80 text-zinc-500 group-hover:bg-zinc-700"
                        }`}
                      >
                        <i
                          className={`ri-add-line text-sm transition-transform duration-200 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-[15px] leading-relaxed text-zinc-400">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
