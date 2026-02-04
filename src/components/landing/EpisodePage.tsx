import { useState } from "react"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { GridOverlay } from "../GridOverlay"
import type { Episode } from "../../data/episodes"
import { formatTimestamp } from "../../utils/srtParser"

interface TranscriptParagraph {
  startTime: string
  text: string
}

interface EpisodePageProps {
  episode: Episode
  transcript?: TranscriptParagraph[]
}

export function EpisodePage({ episode, transcript = [] }: EpisodePageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
        {/* Episode header */}
        <section className="relative w-full bg-zinc-950 pb-12 pt-12">
          <div className="mx-auto max-w-[73.75rem] px-4">
            <a
              href="/podcast"
              className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <i className="ri-arrow-left-line" />
              <span>Back to all episodes</span>
            </a>

            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              // Episode #{episode.number}
            </p>
            <h1 className="text-3xl font-bold text-white">
              {episode.title}
            </h1>
          </div>
        </section>

        {/* Video + Transcript Section */}
        <section className="w-full border-t border-zinc-800 bg-zinc-950 py-8">
          <div className="mx-auto max-w-[73.75rem] px-4">
            {/* When expanded: Video is full width, content below in grid */}
            {isExpanded ? (
              <>
                {/* Full-width video */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>

                {/* Collapse button */}
                <div className="mt-4 hidden lg:block">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    <i className="ri-collapse-diagonal-line" />
                    <span>Collapse video</span>
                  </button>
                </div>

                {/* Content grid below video */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* About and Chapters - Main column */}
                  <div className="lg:col-span-2 lg:pr-16">
                    {/* About this episode */}
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        About this episode
                      </h3>
                      <div className="prose prose-invert prose-sm max-w-none">
                        {episode.fullDescription.split("\n\n").map((paragraph, i) => (
                          <p
                            key={i}
                            className="mb-3 text-sm leading-relaxed text-zinc-400"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Chapters */}
                    {episode.chapters && episode.chapters.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-lg font-semibold text-white">
                          Chapters
                        </h3>
                        <ul className="space-y-2">
                          {episode.chapters.map((chapter, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm"
                            >
                              <span className="font-mono text-zinc-500">
                                {chapter.time}
                              </span>
                              <span className="text-zinc-400">{chapter.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar - Guest info and Transcript */}
                  <div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Featured Guest
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {episode.guest}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                        <span>{episode.company}</span>
                        <span className="text-zinc-600">·</span>
                        <span>{episode.date}</span>
                        <span className="text-zinc-600">·</span>
                        <span>{episode.duration}</span>
                      </div>

                      {/* Listen on platforms */}
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Listen on
                        </p>
                        <div className="flex items-center gap-4">
                          <a
                            href="https://podcasts.apple.com/us/podcast/cause-effect/id1781879869"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                          >
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-linear-to-b from-purple-500 to-purple-700">
                              <i className="ri-mic-fill text-xs text-white" />
                            </div>
                            <span>Apple Podcasts</span>
                          </a>
                          <a
                            href="https://open.spotify.com/show/4QTFiem4o0G9V2vXtv8vMU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                          >
                            <i className="ri-spotify-fill text-lg text-green-500" />
                            <span>Spotify</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Transcript */}
                    {transcript && transcript.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-4 text-lg font-semibold text-white">
                          Transcript
                        </h3>
                        <div className="space-y-2">
                          {transcript.map((entry, i) => (
                            <div key={i} className="flex gap-4">
                              <span className="w-12 shrink-0 font-mono text-sm text-zinc-500">
                                {formatTimestamp(entry.startTime)}
                              </span>
                              <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                                {entry.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Collapsed: Video in grid with sidebar */
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Video, About, and Chapters - Main column */}
                <div className="lg:col-span-2 lg:pr-16">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                      title={episode.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>

                  {/* Expand button */}
                  <div className="mt-4 hidden lg:block">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      <i className="ri-expand-diagonal-line" />
                      <span>Expand video</span>
                    </button>
                  </div>

                  {/* About this episode */}
                  <div className="mt-8">
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      About this episode
                    </h3>
                    <div className="prose prose-invert prose-base max-w-none">
                      {episode.fullDescription.split("\n\n").map((paragraph, i) => (
                        <p
                          key={i}
                          className="mb-3 text-base leading-relaxed text-zinc-400"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Chapters */}
                  {episode.chapters && episode.chapters.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-semibold text-white">
                        Chapters
                      </h3>
                      <ul className="space-y-2">
                        {episode.chapters.map((chapter, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="font-mono text-zinc-500">
                              {chapter.time}
                            </span>
                            <span className="text-zinc-400">{chapter.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar - Guest info and Transcript */}
                <div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Featured Guest
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {episode.guest}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                      <span>{episode.company}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{episode.date}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{episode.duration}</span>
                    </div>

                    {/* Listen on platforms */}
                    <div className="mt-4 border-t border-zinc-800 pt-4">
                      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Listen on
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href="https://podcasts.apple.com/us/podcast/cause-effect/id1781879869"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded bg-linear-to-b from-purple-500 to-purple-700">
                            <i className="ri-mic-fill text-xs text-white" />
                          </div>
                          <span>Apple Podcasts</span>
                        </a>
                        <a
                          href="https://open.spotify.com/show/4QTFiem4o0G9V2vXtv8vMU"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                          <i className="ri-spotify-fill text-lg text-green-500" />
                          <span>Spotify</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Transcript */}
                  {transcript && transcript.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-4 text-lg font-semibold text-white">
                        Transcript
                      </h3>
                      <div className="max-h-[500px] space-y-2 overflow-y-auto pr-4">
                        {transcript.map((entry, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="w-12 shrink-0 font-mono text-sm text-zinc-500">
                              {formatTimestamp(entry.startTime)}
                            </span>
                            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                              {entry.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* More episodes CTA */}
        <section className="w-full border-t border-zinc-800 bg-zinc-950 py-12">
          <div className="mx-auto max-w-[73.75rem] px-4 text-center">
            <h3 className="mb-4 text-xl font-semibold text-white">
              Enjoy this episode?
            </h3>
            <p className="mb-6 text-zinc-400">
              Check out more conversations with engineers building with Effect
            </p>
            <a
              href="/podcast"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-100"
            >
              <span>Browse all episodes</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
