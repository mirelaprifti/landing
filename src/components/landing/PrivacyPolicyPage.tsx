import { Link } from "@/components/ui";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const LAST_UPDATED = "July 22, 2026";

export function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white">
			<Navigation activePath="/privacy" />

			{/* Hero Section */}
			<section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
						// Legal
					</p>
					<h1 className="leading-tighter text-3xl font-bold text-white md:text-4xl">
						Privacy Policy
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-zinc-400">
						Last updated: {LAST_UPDATED}
					</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="pb-24 md:pb-32">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="max-w-3xl space-y-12">
						<div className="space-y-4">
							<p className="text-base leading-relaxed text-zinc-300">
								This website is operated by Effectful Technologies Inc.
								(&quot;Effectful,&quot; &quot;we,&quot; or &quot;us&quot;). We
								keep data collection to a minimum. We do not use advertising
								trackers, cross-site profiling, or analytics cookies.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								1. Analytics
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We use PostHog in cookieless mode to understand how this website
								is used.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								PostHog may collect usage information such as page views,
								clicks, browser and device information, and referring pages. We
								use this information to understand general website usage and
								improve the site.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								2. Information you give us
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If you email us or submit one of our forms, we receive the
								information you provide, typically your name, email address, and
								message.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								We use this information to respond to your request and retain it
								only for as long as reasonably necessary.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								Some forms are hosted using Google Forms. When you submit a
								form, Google may process information under its own privacy
								policy.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								3. Cookies and local storage
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We do not use analytics or advertising cookies.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								The site may store limited functional preferences in your
								browser&apos;s local storage, such as your theme choice.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								4. Hosting
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								This website is hosted using third-party infrastructure,
								including Vercel. Our hosting providers may process technical
								information such as IP addresses, request details, and browser
								or device information to deliver, operate, and secure the
								website.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								Their respective privacy policies apply to this processing.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								5. Third-party services
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Some pages link to or embed content from third-party services,
								such as YouTube, Discord, GitHub, our events calendar, and our
								merchandise store.
							</p>
							<p className="text-base leading-relaxed text-zinc-400">
								When you interact with those services, their own privacy
								policies apply.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								6. Contact
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Questions about this policy or your data? Contact us at{" "}
								<Link href="mailto:contact@effectful.co" variant="inline">
									contact@effectful.co
								</Link>
								.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								7. Changes to this policy
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If we change how this website handles data, we will update this
								page and the date at the top.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer activePath="/privacy" />
		</div>
	);
}
