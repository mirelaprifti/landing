import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { getAssetPath } from "../../utils/assetPath"

const effectDaysEditions = [
  {
    year: "2026",
    location: "Malaga, Spain",
    date: "March 17-20, 2026",
    status: "upcoming" as const,
    href: "/events/effect-days",
    description: "Join us for four days of workshops and talks in Malaga, Spain.",
    thumbnail: getAssetPath("/assets/images/malaga-banner.webp"),
  },
  {
    year: "2025",
    location: "Livorno, Italy",
    date: "March 2025",
    status: "past" as const,
    href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP",
    description: "Two days of talks and workshops at the beautiful Tuscan coast.",
    thumbnail: getAssetPath("/assets/images/livorno-thumbnail.webp"),
    external: true,
  },
  {
    year: "2024",
    location: "Vienna, Austria",
    date: "February 2024",
    status: "past" as const,
    href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO",
    description: "The first Effect Days conference, held in Vienna.",
    thumbnail: getAssetPath("/assets/images/vienna-thumbnail.webp"),
    external: true,
  },
]

const communityResources = [
  {
    title: "Effect Meetups",
    description: "Join local Effect meetups around the world. Connect with developers in your area.",
    href: "https://luma.com/effect-community?k=c",
    icon: "ri-map-pin-line",
    external: true,
  },
  {
    title: "Cause & Effect Podcast",
    description: "Listen to conversations with developers using Effect in production.",
    href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE",
    icon: "ri-mic-line",
    external: true,
  },
  {
    title: "Discord Community",
    description: "Join 6,000+ developers discussing Effect, sharing knowledge, and helping each other.",
    href: "https://discord.gg/effect-ts",
    icon: "ri-discord-line",
    external: true,
  },
]

export function EventsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
            Community
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Effect Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Join the Effect community at conferences, meetups, and online events. Learn from fellow developers and share your experiences with Effect.
          </p>
        </div>
      </section>

      {/* Effect Days Section */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              Annual Conference
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Effect Days
            </h2>
            <p className="mt-3 max-w-2xl text-base text-zinc-400">
              Effect Days is the annual conference for TypeScript engineers using Effect. Each year we bring together the community for workshops, talks, and networking.
            </p>
          </div>

          {/* Effect Days Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {effectDaysEditions.map((edition) => (
              <a
                key={edition.year}
                href={edition.href}
                target={edition.external ? "_blank" : undefined}
                rel={edition.external ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  {edition.thumbnail ? (
                    <img
                      src={edition.thumbnail}
                      alt={`Effect Days ${edition.year}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                      <span className="text-4xl font-bold text-zinc-700">{edition.year}</span>
                    </div>
                  )}
                  {edition.status === "upcoming" && (
                    <div className="absolute top-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                      Upcoming
                    </div>
                  )}
                  {edition.status === "past" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-zinc-400">
                      <i className="ri-play-circle-line" />
                      Watch talks
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-white">
                      {edition.year}
                    </span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-sm text-zinc-400">{edition.location}</span>
                  </div>
                  <p className="mb-4 text-sm text-zinc-500">
                    {edition.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-sm text-zinc-400 transition-colors group-hover:text-white">
                    {edition.status === "upcoming" ? (
                      <>
                        <span>Get tickets</span>
                        <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
                      </>
                    ) : (
                      <>
                        <span>Watch recordings</span>
                        <i className="ri-arrow-right-up-line" />
                      </>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Community Resources Section */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              Connect
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Community Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {communityResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target={resource.external ? "_blank" : undefined}
                rel={resource.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
                  <i className={`${resource.icon} text-xl`} />
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-white">{resource.title}</h3>
                  <p className="text-sm text-zinc-500">{resource.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-sm text-zinc-400 transition-colors group-hover:text-white">
                  <span>Learn more</span>
                  <i className="ri-arrow-right-up-line" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 md:p-12">
            {/* Background gradient */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
              }}
            />

            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <h2 className="text-2xl font-semibold text-white">
                  Host an Effect Meetup
                </h2>
                <p className="mt-3 text-base text-zinc-400">
                  Interested in organizing a local Effect meetup? We'd love to support you. Reach out to us on Discord or via email to get started.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://discord.gg/effect-ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-base font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
                >
                  <i className="ri-discord-fill" />
                  Join Discord
                </a>
                <a
                  href="mailto:contact@effectful.co"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
                >
                  Contact us
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
