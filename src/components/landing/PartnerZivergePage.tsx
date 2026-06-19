import {
	Cpu,
	GitBranch,
	LifeBuoy,
	type LucideIcon,
	ShieldCheck,
	Sparkles,
	Workflow,
} from "lucide-react";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Button } from "../ui/Button";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

type Service = {
	icon: LucideIcon;
	title: string;
	body: string;
};

const SERVICES: Service[] = [
	{
		icon: Workflow,
		title: "Effect adoption",
		body: "Audits, code reviews, and pair-programming sessions to bring Effect into your existing TypeScript codebase without rewriting from scratch.",
	},
	{
		icon: Cpu,
		title: "Architecture & systems",
		body: "Distributed systems, AI/ML pipelines, and cloud-native architecture designed around Effect's runtime, observability, and concurrency primitives.",
	},
	{
		icon: LifeBuoy,
		title: "Production support",
		body: "On-call expertise, incident response, and ongoing maintenance for teams running Effect at scale in production.",
	},
];

type CaseStudy = {
	client: string;
	headline: string;
	body: string;
	stat: { label: string; value: string };
};

const CASE_STUDIES: CaseStudy[] = [
	{
		client: "Placeholder Client A",
		headline: "Untangled a callback-heavy ingestion pipeline",
		body: "Rewrote a brittle, Promise-chained data layer as a single composable Effect graph. The on-call rotation stopped paging every weekend.",
		stat: { label: "Production pages, six months in", value: "−72%" },
	},
	{
		client: "Placeholder Client B",
		headline: "Walked a platform team off Promise chains",
		body: "Six months of pairing, code review, and incremental migration. The dependency graph now fits on one screen and the codebase lost half its lines.",
		stat: { label: "Lines of code", value: "−51%" },
	},
];

type Differentiator = { icon: LucideIcon; title: string; body: string };

const DIFFERENTIATORS: Differentiator[] = [
	{
		icon: GitBranch,
		title: "Deep Effect roots",
		body: "A decade-plus of work on effect systems — first on the JVM with ZIO, now in TypeScript with Effect. The team brings hard-won production experience to every engagement.",
	},
	{
		icon: ShieldCheck,
		title: "Production-grade by default",
		body: "Every engagement ships with observability, retry policies, and structured error handling baked in. No \"happy path\" demos.",
	},
	{
		icon: Sparkles,
		title: "Knowledge transfer included",
		body: "We don't disappear when the contract ends. Pairing, internal documentation, and team workshops are part of every engagement.",
	},
];

export function PartnerZivergePage() {
	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/implementation-partners" />

			<main id="main-content" className="relative w-full pt-16">
				{/* Hero */}
				<section className="relative overflow-hidden pb-10 md:pb-12">
					<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `
									linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
									linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
								`,
								backgroundSize: "196.6px 194px",
								backgroundPosition: "calc(50% + 97px) 0",
							}}
						/>
						{/* Light-mode fade */}
						<div
							className="absolute inset-0 dark:hidden"
							style={{
								background:
									"linear-gradient(to bottom, #fafafa 0%, transparent 20%, transparent 60%, #fafafa 100%)",
							}}
						/>
						{/* Dark-mode fade */}
						<div
							className="absolute inset-0 hidden dark:block"
							style={{
								background:
									"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
							}}
						/>
						<div
							className="absolute inset-x-0 top-0 h-[400px]"
							style={{
								background:
									"radial-gradient(ellipse 50% 80% at 50% -20%, rgba(255, 255, 255, 0.10) 0%, transparent 50%)",
							}}
						/>
					</div>

					<div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-4 pt-16 pb-20 md:pt-24 md:pb-28">
						<div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
							{/* Logo column */}
							<div className="md:col-span-4">
								<div className="flex h-32 w-full items-center justify-start border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
									<img
										src={getAssetPath("/assets/partner-logos/ziverge.svg")}
										alt="Ziverge"
										className="h-10 w-auto max-w-full object-contain"
									/>
								</div>
							</div>

							{/* Content column */}
							<div className="md:col-span-8">
								<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
									// Implementation Partner
								</p>
								<h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-white">
									Ziverge
								</h1>
								<p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
									Engineering expertise across distributed systems, AI/ML, and
									cloud-native architecture — delivered by the team behind some
									of the foundational work on effect systems.
								</p>

								<div className="mt-8 flex flex-wrap items-center gap-3">
									<Button
										href="https://www.ziverge.com/"
										variant="primary"
										size="md"
									>
										Visit ziverge.com
										<i
											className="ri-arrow-right-up-line text-base"
											aria-hidden="true"
										/>
									</Button>
									<Button href="#contact" variant="secondary" size="md">
										Talk to Ziverge
										<i
											className="ri-arrow-right-line text-base"
											aria-hidden="true"
										/>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* At a glance — fact strip */}
				<section className="border-y border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<dl className="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-3 dark:bg-zinc-800">
							{[
								{ label: "Region", value: "Global" },
								{ label: "Working language", value: "English" },
								{ label: "Certifications", value: "Effect Engineer Program" },
							].map((fact) => (
								<div
									key={fact.label}
									className="flex flex-col gap-1 bg-zinc-50 px-6 py-6 dark:bg-zinc-950"
								>
									<dt className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
										{fact.label}
									</dt>
									<dd className="text-xl font-semibold text-zinc-900 tabular-nums dark:text-white">
										{fact.value}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				{/* About */}
				<section className="border-b border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 py-16 md:py-20">
						<div className="grid grid-cols-1 gap-10 md:grid-cols-12">
							<div className="md:col-span-4">
								<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
									// About
								</p>
							</div>
							<div className="md:col-span-8">
								<p className="text-xl leading-relaxed text-zinc-900 dark:text-white">
									Ziverge has spent over a decade shipping effect systems in
									production — first on the JVM with ZIO, now in TypeScript
									with Effect.
								</p>
								<p className="mt-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
									Their engineers work alongside your team to adopt Effect
									pragmatically: not as a rewrite, not as a research project,
									but as a stepwise migration toward production-grade
									reliability.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* What we do */}
				<section className="border-b border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 py-16 md:py-20">
						<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
							// Services
						</p>
						<h2 className="mt-3 text-3xl leading-tight font-bold text-zinc-900 md:text-4xl dark:text-white">
							What Ziverge can do for your team
						</h2>

						<ul className="mt-12 grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:bg-zinc-800">
							{SERVICES.map((service) => {
								const Icon = service.icon;
								return (
									<li
										key={service.title}
										className="flex flex-col gap-4 bg-zinc-50 p-8 dark:bg-zinc-950"
									>
										<Icon
											className="h-6 w-6 text-zinc-500"
											aria-hidden="true"
										/>
										<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
											{service.title}
										</h3>
										<p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
											{service.body}
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* Featured work */}
				<section className="border-b border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 py-16 md:py-20">
						<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
							// In production
						</p>
						<h2 className="mt-3 text-3xl leading-tight font-bold text-zinc-900 md:text-4xl dark:text-white">
							What Ziverge has shipped
						</h2>

						<ul className="mt-12 grid grid-cols-1 gap-px bg-zinc-200 md:grid-cols-2 dark:bg-zinc-800">
							{CASE_STUDIES.map((cs) => (
								<li
									key={cs.client}
									className="flex flex-col gap-5 bg-zinc-50 p-8 md:p-10 dark:bg-zinc-950"
								>
									<p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
										{cs.client}
									</p>
									<h3 className="text-xl leading-tight font-semibold text-zinc-900 dark:text-white">
										{cs.headline}
									</h3>
									<p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
										{cs.body}
									</p>
									<div className="mt-auto border-t border-zinc-200 pt-5 dark:border-zinc-800">
										<p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
											{cs.stat.label}
										</p>
										<p
											className="mt-1 text-3xl font-bold tabular-nums"
											style={{ color: "#ff634b" }}
										>
											{cs.stat.value}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* Why Ziverge */}
				<section className="border-b border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 py-16 md:py-20">
						<div className="grid grid-cols-1 gap-10 md:grid-cols-12">
							<div className="md:col-span-4">
								<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
									// Why Ziverge
								</p>
								<h2 className="mt-3 text-3xl leading-tight font-bold text-zinc-900 md:text-4xl dark:text-white">
									What sets them apart
								</h2>
							</div>
							<div className="md:col-span-8">
								<ul className="flex flex-col">
									{DIFFERENTIATORS.map((d, idx) => {
										const Icon = d.icon;
										return (
											<li
												key={d.title}
												className={`flex gap-6 py-6 ${idx > 0 ? "border-t border-zinc-200 dark:border-zinc-800" : ""}`}
											>
												<Icon
													className="mt-1 h-5 w-5 shrink-0 text-zinc-500"
													aria-hidden="true"
												/>
												<div>
													<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
														{d.title}
													</h3>
													<p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
														{d.body}
													</p>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Contact CTA */}
				<section id="contact" className="border-b border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 py-20 md:py-28">
						<div className="grid grid-cols-1 gap-10 md:grid-cols-12">
							<div className="md:col-span-7">
								<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
									// Get in touch
								</p>
								<h2 className="mt-3 text-3xl leading-tight font-bold text-zinc-900 md:text-4xl lg:text-5xl dark:text-white">
									Work with Ziverge
								</h2>
								<p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
									Reach out directly, or tell us a bit about your project and
									we'll connect you with the right people on the Ziverge team.
								</p>
							</div>
							<div className="flex flex-col gap-3 md:col-span-5 md:items-end md:justify-end">
								<Button
									href="https://www.ziverge.com/contact"
									variant="primary"
									size="lg"
								>
									Contact Ziverge
									<i
										className="ri-arrow-right-up-line text-lg"
										aria-hidden="true"
									/>
								</Button>
								<Button
									href={getAssetPath("/implementation-partners")}
									variant="ghost"
									size="md"
								>
									Browse other partners
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/implementation-partners" />
			<GridOverlay />
		</div>
	);
}
