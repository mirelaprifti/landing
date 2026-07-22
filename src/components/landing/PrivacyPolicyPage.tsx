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
								(&quot;Effectful&quot;, &quot;we&quot;, &quot;us&quot;). We keep
								data collection to a minimum: no advertising trackers, no
								cross-site profiling, and no analytics cookies.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								1. Analytics
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We use PostHog in cookieless mode to measure aggregate usage of
								this site. It stores nothing on your device. Your IP address and
								browser user agent are processed transiently to compute a salted
								identifier that resets daily and cannot track you across days or
								sites. We do not build individual profiles.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								2. Information you give us
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If you email us or submit one of our forms, we receive what you
								provide, typically your name, email address, and message. We use
								it only to respond and keep it no longer than needed. Forms are
								hosted by Google, whose privacy policy applies to the
								submission.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								3. Cookies and local storage
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We use no analytics or advertising cookies, which is why there
								is no cookie banner. The site stores a few functional
								preferences in your browser&apos;s local storage, such as your
								theme choice. These never leave your device.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								4. Hosting and server logs
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Our hosting infrastructure keeps standard technical logs (IP
								address, user agent, requested pages) for security and
								operational purposes. They are retained briefly and not used for
								profiling.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								5. Third-party services
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Some pages link to or embed content from third parties, such as
								YouTube, Discord, GitHub, our events calendar, and our merch
								store. When you interact with those services, their privacy
								policies apply.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								6. Legal basis
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Where the GDPR applies, we process this data based on our
								legitimate interest in operating and securing the site (Art.
								6(1)(f)) and, for information you send us, to take steps at your
								request (Art. 6(1)(b)).
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								7. Your rights
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Depending on where you live, you may have the right to access,
								correct, or delete your personal data, to object to its
								processing, or to complain to a supervisory authority. Email us
								to exercise any of these rights.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								8. Contact
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Questions about this policy or your data? Reach us at{" "}
								<Link href="mailto:contact@effectful.co" variant="inline">
									contact@effectful.co
								</Link>
								.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								9. Changes to this policy
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If we change how this site handles data, we will update this
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
