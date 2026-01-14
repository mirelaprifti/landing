import { InstallCommand } from "./InstallCommand"

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-[114px]">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
					`,
          backgroundSize: "196.6px 190px",
          backgroundPosition: "calc(50% + 97px) 0"
        }}
      />

      {/* Fade out grid at top and bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #09090b 0%, transparent 15%, transparent 80%, #09090b 100%)"
        }}
      />

      <div className="relative mx-auto w-full max-w-[73.75rem] px-4">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 font-mono text-base font-semibold tracking-wider text-zinc-400 uppercase">
            Get Started Now
          </p>
          <h2 className="max-w-xl text-3xl leading-tight font-bold text-white">
            Stop installing a new package for every problem
          </h2>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="https://effect.website/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 py-3 pr-6 pl-4 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
            >
              <i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-0.5" />
              Read the docs
            </a>
            <a
              href="https://effect.website/docs/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
            >
              <i className="ri-graduation-cap-line text-lg" />
              Learn Effect
            </a>
            <a
              href="https://discord.gg/effect-ts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
            >
              <i className="ri-discord-fill text-lg" />
              Join Discord
            </a>
          </div>

          {/* Install command */}
          <div className="mt-7 w-full max-w-lg">
            <p className="mb-3 text-base text-zinc-400">
              Or just install Effect:
            </p>
            <InstallCommand />
          </div>
        </div>
      </div>
    </section>
  )
}
