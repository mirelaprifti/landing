import { Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function RefundPolicyPage() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white">
			<Navigation activePath="/events" />

			{/* Hero Section */}
			<section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<Link
						href="/events/effect-days"
						variant="subtle"
						className="mb-6 inline-flex items-center gap-2"
					>
						<Icon name="arrow-left" />
						Back to Effect Days
					</Link>
					<h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
						Ticket Refund Policy
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-zinc-400">
						How refunds are handled for Effect Days Conference tickets.
					</p>
					<p className="mt-4 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase">
						Last updated: August 30, 2024
					</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="pb-24 md:pb-32">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="max-w-3xl space-y-12">
						{/* Section 1 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								1. General policy
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								All ticket sales for Effect Days Conference are final and
								non-refundable unless stated otherwise. Refund requests are
								evaluated individually and require approval from Effectful
								Technologies Inc.
							</p>
						</div>

						{/* Section 2 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								2. Refund eligibility
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Effectful Technologies Inc. determines who qualifies for a
								refund. Approved refunds may be subject to processing fees,
								which will be deducted from the refund amount.
							</p>
						</div>

						{/* Section 3 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								3. Requesting a refund
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								To request a refund, contact the team at{" "}
								<Link
									href="mailto:contact@effectful.co?subject=Effect Days - Refund Request"
									variant="inline"
								>
									contact@effectful.co
								</Link>{" "}
								and include your order confirmation or ticket number. Additional
								information may be required to process your request.
							</p>
						</div>

						{/* Section 4 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								4. Processing fees
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If a refund is approved, processing fees may be deducted from
								the refund amount. Fee amounts vary by ticket type and payment
								method.
							</p>
						</div>

						{/* Section 5 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								5. Timing
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								Refunds are issued at the discretion of Effectful Technologies
								Inc. and take a reasonable amount of time to process.
							</p>
						</div>

						{/* Section 6 */}
						<div className="space-y-3">
							<h2 className="leading-tighter text-xl font-semibold text-white">
								6. Event cancellation
							</h2>
							<p className="text-base leading-relaxed text-zinc-400">
								If Effect Days Conference is canceled or rescheduled, registered
								attendees may be eligible for a full or partial refund.
							</p>
						</div>

						{/* Closing */}
						<div className="space-y-4 border-t border-zinc-800 pt-12">
							<p className="text-base leading-relaxed text-zinc-300">
								This policy may change. The current version is always the one
								published on this page and shown during purchase. If you have
								questions before buying, reach us at{" "}
								<Link
									href="mailto:contact@effectful.co?subject=Effect Days - Refund Policy"
									variant="inline"
								>
									contact@effectful.co
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer activePath="/events" />
			<GridOverlay />
		</div>
	);
}
