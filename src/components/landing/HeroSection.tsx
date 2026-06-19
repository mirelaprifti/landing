import { useState } from "react";
import { AgentChatMockup } from "./AgentChatMockup";
import { AgentCommand } from "./AgentCommand";
import { AgentTerminalLive } from "./AgentTerminalLive";
import { AgentTracePanel } from "./AgentTracePanel";
import { InstallCommand } from "./InstallCommand";

type Variant = "trace" | "chat" | "terminal";

export function HeroSection() {
	const [variant, setVariant] = useState<Variant>("trace");

	return (
		<section className="relative w-full">
			{/* Stripe-like grid background - full width, centered */}
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

			{/* Fade out grid at top and bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
				}}
			/>

			{/* Subtle glow - Stripe-style ambient light with pulse animation */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-[600px] animate-[glow-pulse_4s_ease-in-out_infinite]"
				style={{
					background: `
						radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
						radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
					`,
				}}
			/>
			{/* Noise texture overlay for organic glow effect */}
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

			<div className="relative mx-auto w-full max-w-[73.75rem] px-4 pt-20 pb-20 md:pt-24 md:pb-24">
				{/* 2-col layout: content left, agent visual right (top-aligned) */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
					{/* Left column — content */}
					<div className="max-w-2xl">
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
						<h1 className="leading-tighter text-4xl font-bold text-white md:text-5xl lg:text-[3.4rem]">
							Reliable TypeScript for the AI era
						</h1>

						{/* Subheadline */}
						<p className="mt-6 max-w-xl text-lg leading-snug text-zinc-400">
							Build production-ready systems with the structure, safety, and observability developers need — and AI agents can work with.
						</p>

						{/* Dual CTA — humans + agents (stacked) */}
						<div className="mt-8 flex flex-col gap-4">
							<InstallCommand />
							<AgentCommand />
						</div>
					</div>

					{/* Right column — visual panel with A/B/C comparison toggle */}
					<div>
						{/* Compare-mode toggle (demo only) */}
						<div
							role="group"
							aria-label="Compare hero visuals"
							className="mb-3 inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/60 p-0.5 font-mono text-[10px] tracking-wider uppercase"
						>
							{(
								[
									{ id: "trace", label: "A · Trace" },
									{ id: "chat", label: "B · Chat" },
									{ id: "terminal", label: "C · Terminal" },
								] as const
							).map((opt) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => setVariant(opt.id)}
									aria-pressed={variant === opt.id}
									className={`rounded px-2.5 py-1 transition-colors ${
										variant === opt.id
											? "bg-zinc-800 text-white"
											: "text-zinc-500 dark:text-zinc-400 hover:text-zinc-200"
									}`}
								>
									{opt.label}
								</button>
							))}
						</div>

						{variant === "trace" && <AgentTracePanel />}
						{variant === "chat" && <AgentChatMockup />}
						{variant === "terminal" && <AgentTerminalLive />}
					</div>
				</div>
			</div>
		</section>
	);
}
