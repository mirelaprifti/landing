import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { getAssetPath } from "../../utils/assetPath"

const PAST_EDITIONS = [
  {
    year: "2024",
    location: "Vienna, Austria 🇦🇹",
    dates: "Feb 22-24, 2024",
    talks: 15,
    workshops: 2,
    badge: "Inaugural Edition",
    description:
      "Where the Effect community gathered for the first time to share from early experiments to production systems.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
    image: "/assets/images/ed-24-2.png"
  },
  {
    year: "2025",
    location: "Livorno, Italy 🇮🇹",
    dates: "Mar 19-21, 2025",
    talks: 19,
    workshops: 2,
    badge: "Past Edition",
    description:
      "A more in-depth event spotlighting advanced use cases and real production stories, showing the evolution of Effect.",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
    image: "/assets/images/ed-25-2.png"
  }
]

const STATS = [
  { value: "3rd", label: "Edition", icon: "/assets/icons-svgs/edition-graphic.svg" },
  { value: "100%", label: "Community-driven", icon: "/assets/icons-svgs/community-graphic.svg" },
  { value: "Global", label: "Developer network", icon: "/assets/icons-svgs/globe-graphic.svg" }
]

export function EffectDaysPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Dithered background overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px"
        }}
      />

      <Navigation transparent />

      {/* Vertical border lines container */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 bottom-0 z-[101] hidden lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          {/* Left vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-600/50" />
          {/* Right vertical line */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-600/50" />
        </div>
      </div>

      {/* Center vertical line - dashed, behind content */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 z-0 hidden px-8 lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: '1px',
              backgroundImage: 'repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)'
            }}
          />
        </div>
      </div>

      <main className="relative z-10 w-full pt-16">
        {/* Background image with gradient overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] -z-10 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9, 9, 11, 0.1) 0%, rgba(9, 9, 11, 0.2) 50%, #09090b 100%), url(${getAssetPath("/assets/images/malaga-bg-1.png")})`,
            backgroundSize: "100% 40rem",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.75
          }}
        />

        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-16 md:pt-22 md:pb-28">
          <div className="relative mx-auto w-full max-w-[73.75rem] px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              {/* Left side - Main content */}
              <div className="flex-1">
                <p className="mb-4 font-mono text-base font-semibold tracking-wide text-zinc-100">
                  <span className="text-violet-400">import</span> {"{"} yourTicket {"}"} <span className="text-violet-400">from</span> <span className="text-emerald-400">"effect-days-2026"</span>
                </p>
                <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                  Effect Days 2026
                </h1>
                <p className="mt-4 text-base text-white font-mono font-semibold uppercase tracking-wide">
                  Workshop Day · Conference Day · Community Day
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                  <a
                    href="#tickets"
                    className="group inline-flex items-center gap-2 rounded-md bg-white py-3 pr-6 pl-5 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-200"
                  >
                    <i className="ri-coupon-line text-lg" />
                    Get your ticket
                  </a>
                  <a
                    href="https://discord.gg/effect-ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-800/30 backdrop-blur-sm py-3 pr-6 pl-5 text-base font-medium text-white transition-all hover:border-zinc-400 hover:bg-zinc-800/50"
                  >
                    <i className="ri-discord-fill text-lg" />
                    Join the community
                  </a>
                </div>
              </div>

              {/* Right side - Event info (ticket stub style) */}
              <div className="mt-10 lg:mt-0 shrink-0 hidden lg:block">
                {/* Hidden SVG for clip-path definition - must be rendered first */}
                <svg className="absolute w-0 h-0" aria-hidden="true">
                  <defs>
                    <clipPath id="ticket-clip-path" clipPathUnits="userSpaceOnUse">
                      {/* Ticket shape with semicircular cutouts on both sides */}
                      <path d="M 0,0 H 280 V 48 A 12,12 0 0 0 280,72 V 120 H 0 V 72 A 12,12 0 0 0 0,48 Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="relative w-[280px] h-[120px]">
                  {/* Backdrop blur layer with clip-path */}
                  <div
                    className="absolute inset-0 bg-zinc-700/10 backdrop-blur-[5px]"
                    style={{
                      clipPath: 'url(#ticket-clip-path)'
                    }}
                  />

                  {/* SVG for border */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 120" fill="none">
                    {/* Border - top, bottom, and sides (without perforations) */}
                    <path
                      d="M 0.5,48 V 0.5 H 279.5 V 48"
                      fill="none"
                      stroke="rgb(161, 161, 170)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 279.5,72 V 119.5 H 0.5 V 72"
                      fill="none"
                      stroke="rgb(161, 161, 170)"
                      strokeWidth="1"
                    />
                    {/* Solid perforation arcs - curving outward (into the cutout) */}
                    <path
                      d="M 279.5,48 A 11.5,11.5 0 0 0 279.5,72"
                      fill="none"
                      stroke="rgb(161, 161, 170)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 0.5,72 A 11.5,11.5 0 0 0 0.5,48"
                      fill="none"
                      stroke="rgb(161, 161, 170)"
                      strokeWidth="1"
                    />
                    {/* Dashed line between cutouts */}
                    <line
                      x1="20"
                      y1="60"
                      x2="260"
                      y2="60"
                      stroke="rgb(161, 161, 170)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  </svg>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col">
                    {/* Top section - Date */}
                    <div className="flex-1 flex items-center px-5">
                      <div className="flex items-center gap-2.5">
                        <i className="ri-calendar-line text-[1.1rem] text-zinc-200" />
                        <p className="text-[1.1rem] font-mono uppercase font-medium text-white">May 6–8, 2026</p>
                      </div>
                    </div>
                    {/* Bottom section - Location */}
                    <div className="flex-1 flex items-center px-5">
                      <div className="flex items-center gap-2.5">
                        <i className="ri-map-pin-2-line text-[1.1rem] text-zinc-200" />
                        <p className="text-[1.1rem] font-mono uppercase font-medium text-white">Málaga, Spain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pb-20">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-700 pt-20">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {STATS.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <img src={getAssetPath(stat.icon)} alt="" className="mb-4 h-10 w-10" />
                    <div className="text-3xl font-bold text-white md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-mono text-sm tracking-wide text-zinc-400 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Past Editions Section */}
        <section id="past-editions" className="pb-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <h2 className="mb-10 font-mono text-base font-semibold tracking-wide text-zinc-400 uppercase">
                // Relive Effect Days
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {PAST_EDITIONS.map((edition) => (
                  <div
                    key={edition.year}
                    className="flex flex-col border border-zinc-800 bg-zinc-900/20 overflow-hidden"
                  >
                    {/* Image with overlay */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={getAssetPath(edition.image)}
                        alt={`Effect Days ${edition.year}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <span className="inline-block rounded bg-white/10 backdrop-blur-sm px-2.5 py-1 text-xs font-mono uppercase font-medium text-white/90 border border-white/10">
                          {edition.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-xl font-semibold text-white">
                        Effect Days {edition.year}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <i className="ri-map-pin-line" />
                          {edition.location}
                        </span>
                        <span>·</span>
                        <span>{edition.dates}</span>
                      </div>

                      <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed">
                        {edition.description}
                      </p>

                      <div className="mt-5 flex items-center gap-4 border-t border-zinc-800 pt-5">
                        <div className="flex items-center gap-5 text-sm text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <i className="ri-mic-line" />
                            {edition.talks} talks
                          </span>
                          <span className="flex items-center gap-1.5">
                            <i className="ri-tools-line" />
                            {edition.workshops} workshops
                          </span>
                        </div>
                        <a
                          href={edition.playlistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-zinc-300"
                        >
                          <i className="ri-youtube-fill text-base" />
                          Full playlist
                          <i className="ri-arrow-right-up-line text-xs" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tickets Section */}
        <section id="tickets" className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <h2 className="mb-10 font-mono text-base font-semibold tracking-wide text-zinc-400 uppercase">
                // Effect Days Tickets
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="pb-4 pr-8 text-left">
                        <span className="text-sm font-mono uppercase tracking-wide text-zinc-500">Pass type</span>
                      </th>
                      <th className="pb-4 px-4 text-center">
                        <div className="text-sm text-zinc-300 font-medium">May 6</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">Workshop Day
                          
                        </div>
                      </th>
                      <th className="pb-4 px-4 text-center">
                        <div className="text-sm text-zinc-300 font-medium">May 7</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">Conference</div>
                      </th>
                      <th className="pb-4 px-4 text-center">
                        <div className="text-sm text-zinc-300 font-medium">May 8</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">Community</div>
                      </th>
                      <th className="pb-4 px-4 text-center">
                        <div className="text-sm text-zinc-300 font-medium">Extras</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">Food & swag</div>
                      </th>
                      <th className="pb-4 pl-8 text-right">
                        <span className="text-sm font-mono uppercase tracking-wide text-zinc-500">Price</span>
                      </th>
                      <th className="pb-4 pl-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Workshop & Conference Row */}
                    <tr className="border-t border-zinc-800">
                      <td className="py-5 pr-8">
                        <div>
                          <span className="text-base font-medium text-white">Workshop & Conference</span>
                          <p className="text-sm text-zinc-500 mt-0.5">Full 3-day experience</p>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 pl-8 text-right">
                        <div>
                          <span className="text-xl font-semibold text-white">$449</span>
                          <p className="text-xs text-zinc-600 mt-0.5">$549 business</p>
                        </div>
                      </td>
                      <td className="py-5 pl-6">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200"
                        >
                          Buy
                          <i className="ri-arrow-right-line text-xs" />
                        </a>
                      </td>
                    </tr>

                    {/* Conference Only Row */}
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-5 pr-8">
                        <div>
                          <span className="text-base font-medium text-white">Conference Only</span>
                          <p className="text-sm text-zinc-500 mt-0.5">2-day conference access</p>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-subtract-line text-zinc-700" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 px-4 text-center">
                        <i className="ri-check-line text-emerald-400" />
                      </td>
                      <td className="py-5 pl-8 text-right">
                        <div>
                          <span className="text-xl font-semibold text-white">$314</span>
                          <p className="text-xs text-zinc-600 mt-0.5">$399 business</p>
                        </div>
                      </td>
                      <td className="py-5 pl-6">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800"
                        >
                          Buy
                          <i className="ri-arrow-right-line text-xs" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-12">
              <h2 className="mb-10 font-mono text-sm font-semibold tracking-wide text-zinc-400 uppercase">
                What to Expect
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <div className="flex h-32 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <i className="ri-presentation-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Technical Talks
                  </h3>
                  <p className="text-base text-zinc-400">
                    Deep dives into Effect patterns, real-world case studies,
                    and advanced TypeScript techniques.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex h-32 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <i className="ri-tools-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Hands-on Workshops
                  </h3>
                  <p className="text-base text-zinc-400">
                    Full-day workshops led by Effect maintainers and
                    experienced practitioners.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex h-32 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/30">
                    <i className="ri-team-line text-4xl text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Community
                  </h3>
                  <p className="text-base text-zinc-400">
                    Connect with fellow Effect developers, core maintainers,
                    and the broader TypeScript community.
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
                  Join our Discord community to be the first to know about the
                  next edition, early bird tickets, and speaker announcements.
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
  )
}
