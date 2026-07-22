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
								cross-site profiling, and no analytics cookies. This page
								explains what little we do collect, why, and what your rights
								are.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								1. Analytics
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We use PostHog in cookieless mode to understand aggregate usage
								of this site — which pages are visited and how often. This mode
								stores nothing on your device. Your IP address and browser user
								agent are processed transiently to compute a salted identifier
								that resets daily and cannot be used to track you across days or
								across sites. We do not build individual profiles from this
								data.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								2. Information you give us
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If you contact us by email or submit one of our forms (for
								example, to tell us about an Effect talk), we receive the
								information you provide — typically your name, email address,
								and your message. We use it only to respond and to provide the
								support you asked for, and we keep it no longer than needed for
								that purpose. Forms are hosted by Google, whose privacy policy
								applies to the submission process.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								3. Cookies and local storage
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								We do not use analytics or advertising cookies, which is why you
								see no cookie banner. The site stores a small number of
								functional preferences in your browser&apos;s local storage —
								such as your theme choice or a dismissed announcement banner.
								These never leave your device and are not shared with us or
								anyone else.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								4. Hosting and server logs
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Like virtually every website, our hosting infrastructure keeps
								standard technical logs (IP address, user agent, requested
								pages) for security and operational purposes. These are retained
								briefly and are not used for profiling.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								5. Third-party services
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Some pages link to or embed content from third parties — for
								example YouTube videos, our Discord community, GitHub, our
								events calendar, and our merch store. When you follow those
								links or interact with embedded content, the respective
								provider&apos;s privacy policy applies. We do not control what
								those services collect.
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								6. Legal basis
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Where the GDPR applies, we process the data described above on
								the basis of our legitimate interest in operating, securing, and
								improving this site (Art. 6(1)(f)), and — for information you
								send us — to take steps at your request (Art. 6(1)(b)).
							</p>
						</div>

						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								7. Your rights
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Depending on where you live, you may have the right to access,
								correct, or delete personal data we hold about you, to object to
								its processing, or to lodge a complaint with a supervisory
								authority. To exercise any of these rights, email us — we&apos;ll
								respond promptly.
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
								If we change how this site handles data, we&apos;ll update this
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
