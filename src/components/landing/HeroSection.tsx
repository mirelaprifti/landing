import { getAssetPath } from "@/utils/assetPath";
import { HeroCommandPanel } from "./HeroCommandPanel";

const HERO_LOGOS: { name: string; src: string; h: string; invert?: boolean }[] = [
	{ name: "opencode", src: "/assets/effect-jobs-logos/opencode-wordmark-dark.svg", h: "20px" },
	{ name: "T3 Chat", src: "/assets/test-logos/t3-chat.png", h: "16px", invert: true },
	{ name: "Cloudflare", src: "/assets/effect-jobs-logos/Cloudflare_logo_horizontal_wht 1.png", h: "20px" },
	{ name: "Vercel", src: "/assets/quotes-logos/vercel-logotype-dark.svg", h: "20px" },
	{ name: "MasterClass", src: "/assets/quotes-logos/masterclass-noM.svg", h: "16px" },
];

export function HeroSection() {
	return (
		<section className="relative w-full">
			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
					`,
					backgroundSize: "196.6px 194px",
					backgroundPosition: "calc(50% + 97px) 0",
				}}
			/>

			{/* Top/bottom fade */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
				}}
			/>

			{/* Subtle glow */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-[600px] animate-[glow-pulse_4s_ease-in-out_infinite]"
				style={{
					background: `
						radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
						radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
					`,
				}}
			/>
			{/* Noise overlay */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-[0.15] mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					backgroundRepeat: "repeat",
				}}
			/>
			<style>{`
				@keyframes glow-pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.6; }
				}
			`}</style>

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-20 pb-12 md:pt-24 md:pb-16">
				{/* Centered content */}
				<div className="mx-auto max-w-4xl text-center">
					{/* Eyebrow */}
					<a
						href="/blog/effect-v4-beta"
						className="group mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-zinc-300 uppercase transition-colors hover:text-white md:text-sm"
					>
						<span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-400">//</span>
						<span>Effect 4.0 — Now in Beta</span>
						<i className="ri-arrow-right-line text-base text-zinc-500 dark:text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-300" aria-hidden="true" />
					</a>
					{/* Headline */}
					<h1 className="leading-tighter text-4xl font-bold text-white md:text-5xl md:whitespace-nowrap lg:text-[3.4rem]">
						Reliable TypeScript for the AI era
					</h1>

					{/* Subheadline */}
					<p className="mx-auto mt-6 max-w-3xl text-xl leading-snug text-zinc-400 lg:max-w-3xl">
						Build production-ready systems your team can ship, customers can
						depend on — and AI agents can work with.
					</p>

					{/* Single consolidated command panel — Install + AI prompt */}
					<div className="mx-auto mt-8 max-w-xl">
						<HeroCommandPanel />
					</div>

					{/* Customer logos — trust strip */}
					<div className="mt-14 flex flex-col items-center gap-5">
						<p className="font-mono text-xs tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
							// In production at
						</p>
						<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
							{HERO_LOGOS.map((logo) => (
								<li key={logo.name} className="flex items-center">
									<img
										src={getAssetPath(logo.src)}
										alt={logo.name}
										style={{
											height: logo.h,
											filter: logo.invert ? "brightness(0) invert(1)" : undefined,
										}}
										className="w-auto opacity-90"
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
