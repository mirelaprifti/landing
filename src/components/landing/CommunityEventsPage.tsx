import { Button } from "@/components/ui";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const FORM_URL =
	"https://docs.google.com/forms/d/e/1FAIpQLSdiqkoogZ8a2h10oF2ANRTDE_m9l-huR8cpoedbMpjAd29tNw/viewform";

const SUPPORT_ITEMS: {
	title: string;
	description: string;
	icon: string;
}[] = [
	{
		title: "Speaker kit",
		description:
			"Talk ideas for different audiences, slide templates, abstract and CFP templates, and demo examples where useful.",
		icon: "ri-slideshow-line",
	},
	{
		title: "Prep support",
		description:
			"Feedback on your topic, abstract, or slides — and an optional prep session with the Effect team.",
		icon: "ri-chat-check-line",
	},
	{
		title: "Promotion",
		description:
			"We share your event with the Effect community, repost recordings, slides, and recaps, and add useful videos to our community thread.",
		icon: "ri-megaphone-line",
	},
	{
		title: "Swag",
		description:
			"Mini swag kits for smaller local events, and larger kits for accepted talks at bigger events.",
		icon: "ri-t-shirt-line",
	},
];

const TALK_IDEAS: { label: string; href?: string }[] = [
	{
		label: "Reliable TypeScript for production systems",
		href: "https://effect.website/docs/getting-started/why-effect/",
	},
	{
		label: "Stop agent slop with Effect",
		href: "https://effect.website/blog/the-one-weird-git-trick-that-makes-coding-agents-more-effect-ive/",
	},
	{
		label: "Typed errors in TypeScript",
		href: "https://effect.website/docs/error-management/two-error-types",
	},
	{
		label: "Retries, timeouts, and cancellation",
		href: "https://effect.website/docs/error-management/retrying",
	},
	{
		label: "Building AI agents with Effect",
		href: "https://effect.website/docs/ai/introduction",
	},
	{
		label: "Production-grade TypeScript for the AI era",
		href: "https://www.effect.solutions/",
	},
	{
		label: "What's new in Effect v4",
		href: "https://effect.website/blog/effect-v4-beta",
	},
];

function FormButton({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
	return (
		<Button href={FORM_URL} variant={variant} size="md" className="group">
			Tell us about your Effect talk
			<i
				className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				aria-hidden="true"
			/>
		</Button>
	);
}

export function CommunityEventsPage() {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white">
			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation activePath="/effect-talks" />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative z-10 pt-16">
				{/* Hero */}
				<section className="relative w-full pt-16 pb-12 md:pt-24 md:pb-16">
					{/* Grid background */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
								linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
							`,
							backgroundSize: "196.6px 171px",
							backgroundPosition: "calc(50% + 97px) 0",
						}}
					/>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
						}}
					/>
					{/* Subtle glow */}
					<div
						className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
						style={{
							background: `
								radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
								radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
							`,
						}}
					/>

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Effect talks
						</p>
						<h1 className="leading-tighter text-3xl font-bold text-white md:text-4xl">
							Bring Effect to your community events
						</h1>
						<p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
							Speaking about Effect at a meetup, conference, workshop, podcast,
							livestream, or any developer event? Share it with us — we'll
							support it and help more people discover it.
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<FormButton />
							<Button
								href="#talk-ideas"
								variant="secondary"
								size="md"
								className="group"
							>
								Browse talk ideas
								<i
									className="ri-arrow-down-line text-base transition-transform group-hover:translate-y-0.5"
									aria-hidden="true"
								/>
							</Button>
						</div>

						{/* Support strip — what speakers get */}
						<p className="mt-14 font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase">
							Speaker kit · Prep sessions · Promotion · Swag
						</p>
					</div>
				</section>

				{/* How we can help */}
				<section className="border-t border-zinc-800 py-24 md:pt-40 md:pb-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Support
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							What we can help with
						</h2>

						<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
							{SUPPORT_ITEMS.map((item) => (
								<div
									key={item.title}
									className="flex flex-col border border-zinc-700 bg-zinc-900/40 p-6 md:p-8"
								>
									<i
										className={`${item.icon} mb-4 text-2xl text-zinc-300`}
										aria-hidden="true"
									/>
									<h3 className="leading-tighter text-lg font-semibold text-white">
										{item.title}
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-zinc-400">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Talk ideas */}
				<section
					id="talk-ideas"
					className="border-t border-zinc-800 py-24 md:pt-40 md:pb-24"
				>
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
							// Talk ideas
						</p>
						<h2 className="leading-tighter text-2xl font-semibold text-white md:text-3xl">
							Not sure what to talk about?
						</h2>
						<p className="mt-4 max-w-2xl text-lg leading-normal text-zinc-400">
							A few Effect-friendly angles to get you started:
						</p>

						<ul className="mt-8 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
							{TALK_IDEAS.map((idea) => (
								<li
									key={idea.label}
									className="flex items-center gap-2.5 text-base text-zinc-200"
								>
									<i
										className="ri-check-line text-zinc-500"
										aria-hidden="true"
									/>
									{idea.href ? (
										<a
											href={idea.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
										>
											{idea.label}
											<i
												className="ri-arrow-right-up-line text-sm text-zinc-500 transition-colors group-hover:text-zinc-300"
												aria-hidden="true"
											/>
										</a>
									) : (
										idea.label
									)}
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* Final CTA */}
				<section className="relative overflow-hidden border-t border-zinc-800 py-24 md:py-32">
					{/* Grid background */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(to right, rgba(39, 39, 42, 0.8) 1px, transparent 1px),
								linear-gradient(to bottom, rgba(39, 39, 42, 0.8) 1px, transparent 1px)
							`,
							backgroundSize: "196.6px 180px",
							backgroundPosition: "calc(50% + 97px) 0",
						}}
					/>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, #09090b 0%, transparent 25%, transparent 75%, #09090b 100%)",
						}}
					/>

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<div className="flex flex-col items-center text-center">
							<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
								// Get in touch
							</p>
							<h2 className="leading-tighter max-w-2xl text-3xl font-bold text-white md:text-4xl">
								Bringing Effect to a developer event?
							</h2>
							<p className="mt-4 max-w-[40rem] text-lg leading-normal text-zinc-400">
								Tell us what you're planning — even if you don't need help.
								We'd love to know about it and help more people discover your
								talk.
							</p>
							<div className="mt-10">
								<FormButton />
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/effect-talks" />
		</div>
	);
}
