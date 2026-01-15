import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { getAssetPath } from "../../utils/assetPath";

const PAST_EDITIONS = [
  {
    year: "2025",
    location: "Livorno, Italy",
    dates: "Mar 19-21, 2025",
    talks: 19,
    badge: "Past Edition",
    description: "A more in-depth event spotlighting advanced use cases and real production stories, showing how Effect has evolved into a mature, scalable library.",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
  },
  {
    year: "2024",
    location: "Vienna, Austria",
    dates: "Feb 22-24, 2024",
    talks: 15,
    badge: "Inaugural Edition",
    description: "Where the Effect community gathered for the first time to share how they were using it in real-world, from early experiments to production systems.",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
  },
];

const STATS = [
  { value: "4600+", label: "Discord members" },
  { value: "100%", label: "Community-driven" },
  { value: "Global", label: "Developer network" },
];

export function EffectDaysPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Dithered background overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
        }}
      />

      <Navigation />

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-16 md:pt-28 md:pb-24">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: "196.6px 179px",
              backgroundPosition: "calc(50% + 97px) 0",
            }}
          />

          {/* Fade out grid at top and bottom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
            }}
          />

          {/* Subtle glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
            style={{
              background: `
                radial-gradient(ellipse 60% 80% at 50% -20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 40% 60% at 30% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
              `,
            }}
          />

          <div className="relative mx-auto w-full max-w-[73.75rem] px-4">
            <p className="mb-4 font-mono text-sm font-medium tracking-wide text-zinc-400 uppercase">
              Conference
            </p>
            <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              Effect Days
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
              For engineers shipping production systems in TypeScript
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <a
                href="https://discord.gg/effect-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 py-3 pr-6 pl-4 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
              >
                <i className="ri-discord-fill text-lg" />
                Join the community
              </a>
              <a
                href="#past-editions"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
              >
                <i className="ri-play-circle-line text-lg" />
                Watch past talks
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-mono uppercase tracking-wide text-zinc-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Past Editions Section */}
        <section id="past-editions" className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <h2 className="text-sm font-mono uppercase font-semibold tracking-wide text-zinc-400 mb-10">
                Past Editions
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {PAST_EDITIONS.map((edition) => (
                  <div
                    key={edition.year}
                    className="flex flex-col rounded-lg bg-zinc-900/30 border border-zinc-800 p-6 md:p-8"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Effect Days {edition.year}
                        </h3>
                        <p className="mt-1 text-zinc-400">
                          <i className="ri-map-pin-line mr-1" />
                          {edition.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1">
                        <span className="text-sm font-mono text-zinc-300">{edition.badge}</span>
                      </div>
                    </div>

                    <p className="text-base text-zinc-400 mb-4 flex-1">
                      {edition.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                      <div className="flex items-center gap-2">
                        <i className="ri-calendar-line" />
                        {edition.dates}
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-presentation-line" />
                        {edition.talks} Talks
                      </div>
                    </div>

                    <a
                      href={edition.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
                    >
                      <i className="ri-youtube-fill text-lg text-red-500" />
                      <span className="border-b border-transparent group-hover:border-current">
                        Watch the full playlist
                      </span>
                      <i className="ri-arrow-right-up-line text-sm" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <h2 className="text-sm font-mono uppercase font-semibold tracking-wide text-zinc-400 mb-10">
                What to Expect
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center rounded-lg bg-zinc-900/30 border border-zinc-800 h-32">
                    <i className="ri-presentation-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Technical Talks</h3>
                  <p className="text-base text-zinc-400">
                    Deep dives into Effect patterns, real-world case studies, and advanced TypeScript techniques.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center rounded-lg bg-zinc-900/30 border border-zinc-800 h-32">
                    <i className="ri-tools-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Hands-on Workshops</h3>
                  <p className="text-base text-zinc-400">
                    Full-day workshops led by Effect maintainers and experienced practitioners.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center rounded-lg bg-zinc-900/30 border border-zinc-800 h-32">
                    <i className="ri-team-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Community</h3>
                  <p className="text-base text-zinc-400">
                    Connect with fellow Effect developers, core maintainers, and the broader TypeScript community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Edition CTA Section */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-b border-zinc-800 py-16">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Ready for Effect Days 2026?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
                  Join our Discord community to be the first to know about the next edition, early bird tickets, and speaker announcements.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a
                    href="https://discord.gg/effect-ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-md bg-white py-3 pr-6 pl-4 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-200"
                  >
                    <i className="ri-discord-fill text-lg" />
                    Join Discord
                  </a>
                  <a
                    href="https://twitter.com/EffectTS_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
                  >
                    <i className="ri-twitter-x-fill text-lg" />
                    Follow for updates
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
