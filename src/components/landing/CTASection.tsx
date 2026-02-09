export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden py-36 md:py-[114px]">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
					`,
          backgroundSize: "196.6px 99px",
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

      {/* Texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[73.75rem] px-4">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 font-mono text-base font-semibold tracking-wider">
            <span className="text-violet-400">import</span> <span className="text-zinc-300">{"{ "}<span className="text-white">Effect</span>{" }"}</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">"effect"</span>
          </p>
          <h2 className="max-w-3xl text-4xl leading-tight font-bold text-white">
            Stop installing a new package for every problem
          </h2>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
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
        </div>
      </div>
    </section>
  )
}
