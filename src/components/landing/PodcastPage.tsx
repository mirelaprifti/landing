import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { GridOverlay } from "../GridOverlay"

interface Episode {
  number: number
  title: string
  guest: string
  company: string
  companyLogo?: string
  description: string
  date: string
  duration: string
  youtubeId: string
  thumbnailUrl: string
}

const EPISODES: Episode[] = [
  {
    number: 7,
    title: "Reliable Payroll Systems in TypeScript with Effect",
    guest: "Adam Rankin",
    company: "Warp",
    description:
      "In this episode, Johannes Schickling talks with Adam Rankin, CTO at Warp, about using Effect to bring structure and composability to a growing TypeScript codebase, enabling a small, fast-moving team to stay productive while shipping reliable payment & payroll...",
    date: "Dec 16, 2025",
    duration: "59:54",
    youtubeId: "zxCR6rG4snY",
    thumbnailUrl: "https://img.youtube.com/vi/zxCR6rG4snY/hqdefault.jpg"
  },
  {
    number: 6,
    title: "Inside OpenRouter's Tech Stack and Use of Effect",
    guest: "Louis Vichy",
    company: "OpenRouter",
    description:
      "Louis Vichy, co-founder of OpenRouter, joins Johannes Schickling and Michael Arnaldi to talk about OpenRouter's TypeScript stack, internal tooling powered by Effect, and the engineering challenges of scaling an AI platform processing trillions of tokens weekly.",
    date: "Nov 11, 2025",
    duration: "86:11",
    youtubeId: "AVJIqQi11lM",
    thumbnailUrl: "https://img.youtube.com/vi/AVJIqQi11lM/hqdefault.jpg"
  },
  {
    number: 5,
    title: "Event-Driven Systems in FinTech. How Spiko Leverages Effect",
    guest: "Samuel Briole",
    company: "Spiko",
    description:
      "This podcast episode features Samuel Briole, CTO of Spiko, a Paris-based FinTech startup building infrastructure for issuing regulated financial products on public blockchains, specifically risk-free products. Spiko utilizes the Effect extensively from...",
    date: "Sep 15, 2025",
    duration: "58:03",
    youtubeId: "lFOHVZnJLew",
    thumbnailUrl: "https://img.youtube.com/vi/lFOHVZnJLew/hqdefault.jpg"
  },
  {
    number: 4,
    title: "From Skeptic to Advocate, Scaling Effect at Vercel",
    guest: "Dillon Mulroy",
    company: "Vercel",
    description:
      "In this episode of Cause & Effect, Johannes Schickling is joined by Dillon Mulroy, Domains Lead at Vercel, who shares his personal journey with Effect and how Vercel gradually adopted it across their Domains platform. Dillon explains why Effect feels like...",
    date: "Aug 4, 2025",
    duration: "53:53",
    youtubeId: "rPKohHGPqCY",
    thumbnailUrl: "https://img.youtube.com/vi/rPKohHGPqCY/hqdefault.jpg"
  },
  {
    number: 3,
    title: "Scaling Voice AI at MasterClass with Effect & TypeScript",
    guest: "David Golightly",
    company: "MasterClass",
    description:
      "In this episode Johannes Schickling had a conversation with David Golightly, Staff Engineer at MasterClass, to explore how his team built Cortex – a real-time voice AI orchestration layer that powers personalized conversations with celebrity instructors li...",
    date: "Jun 24, 2025",
    duration: "69:26",
    youtubeId: "x2bUuOZ-htU",
    thumbnailUrl: "https://img.youtube.com/vi/x2bUuOZ-htU/hqdefault.jpg"
  },
  {
    number: 2,
    title: "Scaling AI for Customer Support at Markprompt with Effect",
    guest: "Michael Fester",
    company: "Markprompt",
    description:
      "Join us as we talk with Michael Fester from Markprompt about scaling AI-powered customer support with Effect, building reliable and high-performance infrastructure, and enhancing developer productivity in a fast-evolving AI landscape.",
    date: "Mar 7, 2025",
    duration: "52:51",
    youtubeId: "8lz9-0y58Jc",
    thumbnailUrl: "https://img.youtube.com/vi/8lz9-0y58Jc/hqdefault.jpg"
  },
  {
    number: 1,
    title: "Adopting Effect at Zendesk with Attila Vecrek",
    guest: "Attila Vecrek",
    company: "Zendesk",
    description:
      "In this inaugural episode, Johannes Schickling speaks with Attila Vecrek, Tech Lead and Staff Engineer at Zendesk, about their journey adopting Effect incrementally within a large-scale, diverse codebase environment.",
    date: "Nov 26, 2024",
    duration: "80:31",
    youtubeId: "rNAqPHBQFEQ",
    thumbnailUrl: "https://img.youtube.com/vi/rNAqPHBQFEQ/hqdefault.jpg"
  }
]

// Company logos as simple text or SVG icons
const companyLogos: Record<string, React.ReactNode> = {
  Warp: (
    <div className="flex items-center gap-1.5 text-white/90">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="text-sm font-medium">warp</span>
    </div>
  ),
  OpenRouter: (
    <div className="flex items-center gap-1.5 text-white/90">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
      <span className="text-sm font-medium">OpenRouter</span>
    </div>
  ),
  Spiko: (
    <div className="flex items-center gap-1.5 text-white/90">
      <span className="text-sm font-medium">⚡ spiko</span>
    </div>
  ),
  Vercel: (
    <div className="flex items-center gap-1.5 text-white/90">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2L2 19.5h20L12 2z" />
      </svg>
      <span className="text-sm font-medium">Vercel</span>
    </div>
  ),
  MasterClass: (
    <div className="flex items-center gap-1.5 text-white/90">
      <span className="text-sm font-medium">M MasterClass</span>
    </div>
  ),
  Markprompt: (
    <div className="flex items-center gap-1.5 text-white/90">
      <span className="text-sm font-medium">M!</span>
    </div>
  ),
  Zendesk: (
    <div className="flex items-center gap-1.5 text-white/90">
      <span className="text-sm font-medium">zendesk</span>
    </div>
  )
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-6 border-b border-zinc-800 py-8 transition-colors hover:bg-zinc-900/30 md:flex-row md:gap-8"
    >
      {/* Thumbnail with overlay */}
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden md:aspect-[4/5] md:w-56">
        <img
          src={episode.thumbnailUrl}
          alt={episode.guest}
          className="h-full w-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Cause & Effect branding */}
        <div className="absolute top-3 left-3 flex flex-col gap-0.5">
          <span className="text-[10px] font-medium tracking-wider text-white/70">
            Cause & Effect
          </span>
          <span className="text-[10px] text-white/50">#{episode.number.toString().padStart(2, "0")}</span>
        </div>

        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <i className="ri-play-fill text-3xl text-white" />
          </div>
        </div>

        {/* Guest info at bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold leading-tight text-white">
            {episode.guest}
          </h3>
          <div className="mt-1">{companyLogos[episode.company]}</div>
        </div>
      </div>

      {/* Episode content */}
      <div className="flex flex-1 flex-col">
        <h4 className="text-lg font-semibold text-white group-hover:text-zinc-200 md:text-xl">
          #{episode.number}: {episode.title}
        </h4>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400 md:text-base">
          {episode.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <span>{episode.date}</span>
          <span>·</span>
          <span>{episode.duration}</span>
          <span>·</span>
          <span>Episode #{episode.number}</span>
        </div>
      </div>
    </a>
  )
}

export function PodcastPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white antialiased">
      {/* Dithered background overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px"
        }}
      />

      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:left-0 focus:top-0"
      >
        Skip to main content
      </a>

      <Navigation />
      <GridOverlay />

      {/* Vertical border lines container */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[60] hidden lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-800" />
          <div className="absolute bottom-0 right-0 top-0 w-px bg-zinc-800" />
        </div>
      </div>

      {/* Center vertical line - dashed */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 hidden px-8 lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          <div
            className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2"
            style={{
              width: "1px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)"
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="relative w-full pt-16">
        {/* Hero Section */}
        <section className="relative w-full bg-zinc-950 pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-[73.75rem] px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                Cause & Effect
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400 md:text-xl">
                A podcast exploring how engineers are using Effect to build
                reliable, production-grade software in TypeScript
              </p>

              {/* Platform links */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://youtube.com/playlist?list=PLDf3uQLaK2B_jaZ5Fy7IPNq0FIViV_CQl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                >
                  <i className="ri-youtube-fill text-2xl text-red-500" />
                  <span className="text-sm">
                    <span className="text-[10px] text-zinc-500">Watch on</span>
                    <br />
                    <span className="font-medium">YouTube</span>
                  </span>
                </a>

                <a
                  href="https://podcasts.apple.com/us/podcast/cause-effect/id1781879869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-b from-purple-500 to-purple-700">
                    <i className="ri-mic-fill text-sm text-white" />
                  </div>
                  <span className="text-sm">
                    <span className="text-[10px] text-zinc-500">Listen on</span>
                    <br />
                    <span className="font-medium">Podcasts</span>
                  </span>
                </a>

                <a
                  href="https://open.spotify.com/show/4QTFiem4o0G9V2vXtv8vMU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                >
                  <i className="ri-spotify-fill text-2xl text-green-500" />
                  <span className="text-sm font-medium">Spotify</span>
                </a>

                <a
                  href="/podcast/rss.xml"
                  className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <i className="ri-rss-fill" />
                  <span>RSS Feed</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Section */}
        <section className="w-full bg-zinc-950 pb-24">
          <div className="mx-auto max-w-[73.75rem] px-4">
            <div className="flex flex-col">
              {EPISODES.map((episode) => (
                <EpisodeCard key={episode.number} episode={episode} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
