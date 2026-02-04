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

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <a
      href={`/podcast/episodes/episode-${episode.number}`}
      className="group flex flex-col gap-8 p-4 my-4 transition-colors hover:bg-zinc-900/90 md:flex-row md:gap-8"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden md:w-[40%]">
        <img
          src={episode.thumbnailUrl}
          alt={episode.guest}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Episode content */}
      <div className="flex flex-1 flex-col justify-center pr-8">
        <p className="mb-1 font-mono text-xs font-medium tracking-wider text-zinc-400 uppercase">
          // Episode #{episode.number.toString().padStart(2, "0")}
        </p>
        <h4 className="text-lg font-semibold text-white group-hover:text-zinc-200 md:text-xl">
          {episode.title}
        </h4>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400 md:text-base">
          {episode.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <span>{episode.date}</span>
          <span>·</span>
          <span>{episode.duration}</span>
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
        className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
      >
        Skip to main content
      </a>

      <Navigation />
      <GridOverlay />

      {/* Vertical border lines container */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
        </div>
      </div>

      {/* Center vertical line - dashed */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
        <div className="relative mx-auto h-full w-full max-w-[73.75rem]">
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
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
        <section className="relative w-full bg-zinc-950 pt-16 pb-12 md:pt-24 md:pb-16">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: "196.6px 186px",
              backgroundPosition: "calc(50% + 97px) 0"
            }}
          />

          {/* Fade out grid at top and bottom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)"
            }}
          />

          <div className="relative mx-auto max-w-[73.75rem] px-4">
            <div className="max-w-2xl">
              <p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
                // The Podcast
              </p>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                Cause & Effect
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                A podcast exploring how engineers are using Effect to build
                reliable, production-grade software in TypeScript
              </p>

              {/* Platform links */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {/* Apple Podcasts */}
                <a
                  href="https://podcasts.apple.com/us/podcast/cause-effect/id1781879869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white transition-opacity hover:opacity-70"
                  aria-label="Listen on Apple Podcasts"
                >
                  <svg className="h-5 w-5" viewBox="0 0 300 300">
                    <defs>
                      <linearGradient id="apple-podcast-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#833AB4" />
                        <stop offset="100%" stopColor="#E040FB" />
                      </linearGradient>
                    </defs>
                    <rect fill="url(#apple-podcast-gradient)" width="300" height="300" rx="65" />
                    <g fill="#fff">
                      <path d="M150 62c-48.6 0-88 39.4-88 88 0 30.4 15.5 57.2 39 73v-17.4c-14.6-13.3-23.8-32.4-23.8-53.6 0-40.2 32.6-72.8 72.8-72.8s72.8 32.6 72.8 72.8c0 21.2-9.2 40.3-23.8 53.6V223c23.5-15.8 39-42.6 39-73 0-48.6-39.4-88-88-88z"/>
                      <path d="M150 95c-30.4 0-55 24.6-55 55 0 19.2 9.8 36.1 24.7 46v-18.5c-7.4-7.3-12-17.4-12-28.5 0-22.1 17.9-40 40-40s40 17.9 40 40c0 11.1-4.6 21.2-12 28.5V196c14.9-9.9 24.7-26.8 24.7-46 0-30.4-24.6-55-55-55z"/>
                      <circle cx="150" cy="150" r="21"/>
                      <path d="M150 180c-11 0-20 4-24 12-3 6-3 14-2 26l6 42c1 7 5 12 12 14 3 1 5 1 8 1s5 0 8-1c7-2 11-7 12-14l6-42c1-12 1-20-2-26-4-8-13-12-24-12z"/>
                    </g>
                  </svg>
                  <span className="text-sm font-medium">Apple Podcasts</span>
                </a>

                {/* Spotify */}
                <a
                  href="https://open.spotify.com/show/4QTFiem4o0G9V2vXtv8vMU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white transition-opacity hover:opacity-70"
                  aria-label="Listen on Spotify"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1DB954">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className="text-sm font-medium">Spotify</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/playlist?list=PLDf3uQLaK2B_jaZ5Fy7IPNq0FIViV_CQl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white transition-opacity hover:opacity-70"
                  aria-label="Watch on YouTube"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#FF0000"
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                    />
                    <path
                      fill="#fff"
                      d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                    />
                  </svg>
                  <span className="text-sm font-medium">YouTube</span>
                </a>

                {/* RSS Feed */}
                <a
                  href="/podcast/rss.xml"
                  className="flex items-center gap-2 text-white transition-opacity hover:opacity-70"
                  aria-label="RSS Feed"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#fff">
                    <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93v-2.83z" />
                  </svg>
                  <span className="text-sm font-medium">RSS</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Section */}
        <section className="w-full gap-16 border-t border-zinc-800 bg-zinc-950 pb-24">
          <div className="mx-auto max-w-[73.75rem] px-4">
            <div className="flex flex-col">
              {EPISODES.map((episode, index) => (
                <div key={episode.number}>
                  <EpisodeCard episode={episode} />
                  {index < EPISODES.length - 1 && (
                    <div className="h-px w-full bg-zinc-800" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
