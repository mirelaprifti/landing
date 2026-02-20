import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { getAssetPath } from "../../utils/assetPath"

const upcomingEvents = [
  {
    title: "Effect Days Conference 2026",
    description: "The third edition of a community-driven, non-profit event celebrating the Effect ecosystem – for Effect and TypeScript developers.",
    date: "March 17-20, 2026",
    location: "Malaga, Spain",
    format: "In-person only",
    organizer: "Effectful Technologies",
    href: "/events/effect-days",
    thumbnail: getAssetPath("/assets/images/malaga-7.webp"),
  },
]

const podcastEpisodes = [
  {
    title: "Building Production Systems with Effect",
    guest: "Tim Smart",
    href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE",
  },
]

const liveCodingPlaylists = [
  {
    title: "Effect Cluster Series",
    href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B-bxMi0j7WuMBInbhJ2yKd",
  },
  {
    title: "Second revision of HTTP API",
    href: "https://www.youtube.com/watch?v=2L8kTVuIiVU",
  },
  {
    title: "Learning to Use STM",
    href: "https://www.youtube.com/watch?v=phrZVEdi_ZA",
  },
  {
    title: "Rebuilding Contentlayer with Effect",
    href: "https://www.youtube.com/watch?v=T31QHKwsbYM",
  },
  {
    title: "Building an Effect Warehouse App",
    href: "https://www.youtube.com/watch?v=PGYpeeFzliE",
  },
  {
    title: "Integrating Remix with Effect",
    href: "https://www.youtube.com/watch?v=X-_0cw7z1TM",
  },
]

const pastEvents = [
  {
    year: "2025",
    events: [
      { flag: "🇮🇹", date: "Mar 19-21", title: "Effect Days Livorno", type: "conference", href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lZoJQ7BVtIbKs2P8i-xVmhP" },
      { flag: "🇫🇷", date: "Jun", title: "Effect Paris Meetup", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇺🇸", date: "May", title: "Effect Meetup SF", type: "meetup", href: "https://luma.com/effect-community?k=c" },
    ],
  },
  {
    year: "2024",
    events: [
      { flag: "🇦🇹", date: "Feb 21", title: "Effect Days Vienna", type: "conference", href: "https://www.youtube.com/playlist?list=PLDf3uQLaK2lY8cjMh4dmq3eFSGJVwPBPO" },
      { flag: "🇵🇱", date: "Jan 10", title: "WarsawJS Meetup", type: "meetup", href: "https://www.youtube.com/watch?v=example" },
      { flag: "🇫🇷", date: "Apr 23", title: "Effect Paris Meetup", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇺🇸", date: "May 8", title: "LambdaConf", type: "conference", href: "https://www.lambdaconf.us/" },
      { flag: "🇫🇷", date: "May 23", title: "Local-First Conf", type: "conference", href: "https://www.localfirstconf.com/" },
      { flag: "🇬🇧", date: "Jun 26", title: "London Node.js User Group", type: "meetup", href: "https://www.meetup.com/london-node-user-group/" },
      { flag: "🇫🇷", date: "Jun 25", title: "Effect Paris Meetup", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇪🇸", date: "Sep 21", title: "React Alicante Conference", type: "conference", href: "https://reactalicante.es/" },
      { flag: "🇺🇸", date: "Oct 21", title: "Effect Meetup SF", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇦🇹", date: "Nov 26", title: "React Meetup Vienna", type: "meetup", href: "https://www.meetup.com/reactvienna/" },
      { flag: "🇫🇷", date: "Nov 5", title: "Effect Paris Meetup", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇺🇸", date: "Nov 2", title: "Effect Meetup SF", type: "meetup", href: "https://luma.com/effect-community?k=c" },
      { flag: "🇫🇷", date: "Dec 12", title: "Paris TypeScript Meetup", type: "meetup", href: "https://www.meetup.com/paris-typescript/" },
    ],
  },
]

const communityBenefits = [
  "Share your events with the community and let us help promote it across our social media channels!",
  "Grow your network and connect with Effect developers around the world.",
  "Collaborate & contribute by sharing ideas with like-minded people in the community.",
  "Get direct support from the Effect team with talk materials and more!",
  "Be part of a growing ecosystem shaping the future of Effect!",
]

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    conference: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    meetup: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    podcast: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    webinar: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs ${styles[type] || styles.meetup}`}>
      {type}
    </span>
  )
}

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
            Get connected to the Effect community
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Enhance your skills with community-driven resources and connect with the Effect community, both in-person and online.
          </p>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Upcoming events", href: "#upcoming" },
              { label: "Podcast", href: "#podcast" },
              { label: "Live coding", href: "#live-coding" },
              { label: "Host a meetup", href: "#host" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming" className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              What's next
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Upcoming Events
            </h2>
          </div>

          {upcomingEvents.map((event) => (
            <a
              key={event.title}
              href={event.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900 md:flex-row"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 md:aspect-auto md:w-1/2">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                  Upcoming
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {event.title}
                </h3>
                <p className="mb-6 text-base text-zinc-400">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <i className="ri-calendar-line text-zinc-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-zinc-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-user-line text-zinc-500" />
                    <span>{event.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-building-line text-zinc-500" />
                    <span>{event.organizer}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors group-hover:bg-zinc-200">
                    Get your ticket
                    <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Podcast Section */}
      <section id="podcast" className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
            <div className="flex-1">
              <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
                Podcast
              </p>
              <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                Cause & Effect Podcast
              </h2>
              <p className="mb-4 text-base text-zinc-400">
                A podcast where we explore how software engineers are using Effect to build reliable, production-grade software with TypeScript.
              </p>
              <p className="mb-6 text-sm text-zinc-500">
                Hosted by <span className="text-zinc-300">Johannes Schickling</span> — DX professional from Germany, previously founded Prisma, and host of localfirst.fm podcast.
              </p>

              {/* Platform links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/playlist?list=PLDf3uQLaK2lbPLQT6I6xkiV_W3NxnPXRE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <i className="ri-youtube-line" />
                  YouTube
                </a>
                <a
                  href="https://podcasts.apple.com/podcast/cause-effect/id1738706923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <i className="ri-apple-line" />
                  Apple Podcasts
                </a>
                <a
                  href="https://open.spotify.com/show/20PGbpCqpsTuL6FNakJW4U"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <i className="ri-spotify-line" />
                  Spotify
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Coding Sessions */}
      <section id="live-coding" className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              Learn
            </p>
            <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
              Learn Effect with live coding sessions
            </h2>
            <p className="max-w-2xl text-base text-zinc-400">
              Level up your skills with live coding sessions from the Effect team and community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveCodingPlaylists.map((playlist) => (
              <a
                key={playlist.title}
                href={playlist.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
                  <i className="ri-play-circle-line text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{playlist.title}</h3>
                </div>
                <i className="ri-arrow-right-up-line text-zinc-500 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Host Your Own Event Section */}
      <section id="host" className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              Get Involved
            </p>
            <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
              Looking to host your own event?
            </h2>
            <p className="max-w-2xl text-base text-zinc-400">
              Want to bring the Effect community together in your city or online? Here's a set of resources to help you get started.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Meetup Repository Template */}
            <a
              href="https://github.com/effect-ts-community/meetup-template"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
                <i className="ri-github-line text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">
                Meetup Repository Template
              </h3>
              <p className="mb-4 text-sm text-zinc-400">
                Includes talk submissions as issues and other resources to help you organize.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
                  Submit talks as issues
                </span>
                <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
                  Code of conduct
                </span>
              </div>
            </a>

            {/* Event Promotional Assets */}
            <a
              href="https://www.figma.com/community/file/effect-event-assets"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-zinc-700 group-hover:text-white">
                <i className="ri-palette-line text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">
                Event Promotional Assets
              </h3>
              <p className="mb-4 text-sm text-zinc-400">
                Streamline your event planning and promotion with Effect branding material.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
                  Event &amp; speaker banners
                </span>
                <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
                  Effect logo guidelines
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
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

            <div className="relative">
              <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
                Join the Effect community
              </h2>

              <ul className="mb-8 space-y-3">
                {communityBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-zinc-400">
                    <i className="ri-check-line mt-0.5 shrink-0 text-emerald-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://discord.gg/effect-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                <i className="ri-discord-fill" />
                Join the community
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Timeline */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[73.75rem] px-4">
          <div className="mb-10">
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-zinc-400">
              Archive
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Past Events & Meetups
            </h2>
          </div>

          <div className="space-y-12">
            {pastEvents.map((yearGroup) => (
              <div key={yearGroup.year}>
                <h3 className="mb-4 font-mono text-lg font-semibold text-zinc-300">
                  {yearGroup.year}
                </h3>
                <div className="space-y-1">
                  {yearGroup.events.map((event, i) => (
                    <a
                      key={`${event.title}-${i}`}
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-md px-4 py-3 transition-colors hover:bg-zinc-900"
                    >
                      <span className="text-lg">{event.flag}</span>
                      <span className="w-20 shrink-0 font-mono text-sm text-zinc-500">
                        {event.date}
                      </span>
                      <span className="flex-1 text-sm text-zinc-300 group-hover:text-white">
                        {event.title}
                      </span>
                      <TypeBadge type={event.type} />
                      <i className="ri-arrow-right-up-line text-zinc-600 transition-colors group-hover:text-zinc-400" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
