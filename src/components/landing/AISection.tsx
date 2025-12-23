export function AISection() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:pt-32 md:pb-8">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/0 to-zinc-900/50" />

      <div className="relative mx-auto w-full max-w-295">
        {/* Header row - Eyebrow + Title + Description */}
        <div className="mb-20 px-4">
          <p className="mb-4 font-mono text-base font-semibold tracking-wider text-zinc-400 uppercase">
            LLMs 🤍 Effect
          </p>
          <h2 className="max-w-2xl text-2xl leading-tight font-semibold text-white md:text-4xl">
            Ship AI-generated code you can trust in production
          </h2>
          <a
            href="https://www.effect.solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Effect Solutions
            <i className="ri-arrow-right-up-line" />
          </a>
        </div>

        {/* Two-column layout: Features left, Proof right */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-0">
          {/* Left column - Features (the "why") */}
          <div className="px-4">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Write better code with AI
            </h3>
            <p className="mb-6 max-w-xl text-lg leading-snug text-zinc-400">
              Effect excels at orchestration, parallel execution, state management, and fault recovery — using natural abstractions that feel intuitive to both AI and humans.
            </p>
            <div className="max-w-[32rem] space-y-3">
              <p className="flex items-start gap-3 text-base leading-relaxed text-zinc-400">
                <span className="font-mono text-sm text-zinc-500">01</span>
                <span>
                  <span className="font-medium text-white">
                    Predictable structure:
                  </span>{" "}
                  every operation follows a declarative pattern, no guesswork
                  for LLMs.
                </span>
              </p>
              <p className="flex items-start gap-3 text-base leading-relaxed text-zinc-400">
                <span className="font-mono text-sm text-zinc-500">02</span>
                <span>
                  <span className="font-medium text-white">
                    Typed feedback loop:
                  </span>{" "}
                  detailed error traces show what failed, enabling precise
                  self-repair.
                </span>
              </p>
              <p className="flex items-start gap-3 text-base leading-relaxed text-zinc-400">
                <span className="font-mono text-sm text-zinc-500">03</span>
                <span>
                  <span className="font-medium text-white">
                    Built-in reliability:
                  </span>{" "}
                  error handling, supervision, and recovery, production-ready
                  by default.
                </span>
              </p>
              <p className="flex items-start gap-3 text-base leading-relaxed text-zinc-400">
                <span className="font-mono text-sm text-zinc-500">04</span>
                <span>
                  <span className="font-medium text-white">
                    Rich toolbox:
                  </span>{" "}
                  schema validation to workflows in a language LLMs easily
                  understand.
                </span>
              </p>
            </div>
          </div>

          {/* Right column - Tweet + Video (the "proof") */}
          <div className="space-y-3">
            {/* Tweet card */}
            <a
              href="https://x.com/davis7/status/1988847914538672262"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm transition-colors hover:border-zinc-700/80 hover:bg-zinc-900/60"
            >
              {/* Author row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/images/bendavis.jpg"
                    alt="Ben Davis"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      Ben Davis
                    </div>
                    <div className="text-xs text-zinc-500">@davis7</div>
                  </div>
                </div>
                <i className="ri-twitter-x-line text-zinc-500" />
              </div>
              {/* Quote */}
              <p className="text-sm leading-relaxed text-zinc-300">
                <span className="text-zinc-400">@MichaelArnaldi</span>{" "}
                suggested cloning the effect repo as a git subtree, giving it
                to Claude, then using that as docs. It sounds absurd, but it's
                actually kind amazing...
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-zinc-500">
                Full post <i className="ri-arrow-right-up-line" />
              </span>
            </a>

            {/* Video container */}
            <div className="overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900 shadow-lg shadow-black/10">
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label="Demo video showing Effect being used with AI coding assistants"
              >
                <source
                  src="/assets/icons/bendavis-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
