import { motion } from "motion/react";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const codeLines = [
	// Line 0: import { Effect } from "effect"
	<>
		<span className="tok-keyword">import</span>
		<span className="tok-fg">{" { "}</span>
		<span className="tok-fg">Effect</span>
		<span className="tok-fg">{" } "}</span>
		<span className="tok-keyword">from</span>
		<span className="tok-string">{' "effect"'}</span>
	</>,
	// Line 1: (empty line)
	null,
	// Line 2: const page = Effect.fail("404: Not Found").pipe(
	<>
		<span className="tok-keyword">const</span>
		<span className="tok-constant"> page</span>
		<span className="tok-fg">{" = "}</span>
		<span className="tok-fg">Effect</span>
		<span className="tok-fg">.</span>
		<span className="tok-constant">fail</span>
		<span className="tok-fg">{"("}</span>
		<span className="tok-string">{'"404: Not Found"'}</span>
		<span className="tok-fg">{")."}</span>
		<span className="tok-constant">pipe</span>
		<span className="tok-fg">{"("}</span>
	</>,
	// Line 3:   Effect.catchAll(() => Effect.succeed("/"))
	<>
		<span className="tok-fg">{"  "}</span>
		<span className="tok-fg">Effect</span>
		<span className="tok-fg">.</span>
		<span className="tok-constant">catchAll</span>
		<span className="tok-fg">{"(() => "}</span>
		<span className="tok-fg">Effect</span>
		<span className="tok-fg">.</span>
		<span className="tok-constant">succeed</span>
		<span className="tok-fg">{"("}</span>
		<span className="tok-string">{'"/"'}</span>
		<span className="tok-fg">{"))"}</span>
	</>,
	// Line 4: )
	<>
		<span className="tok-fg">{")"}</span>
	</>,
];

export function NotFoundPage() {
	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.03] dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-200 px-6 py-4 font-semibold text-zinc-900 no-underline dark:bg-zinc-800 dark:text-white focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<Navigation />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 dark:hidden"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, rgb(228 228 231) 0px, rgb(228 228 231) 2px, transparent 2px, transparent 4px)",
						}}
					/>
					<div
						className="absolute top-0 bottom-0 left-1/2 hidden -translate-x-1/2 dark:block"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main
				id="main-content"
				className="relative z-10 flex min-h-screen items-center pt-24 md:pt-20 pb-8"
			>
				<section className="w-full py-16 md:py-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4 sm:px-6">
						<div className="flex flex-col items-center gap-10">
							{/* Top: text */}
							<div className="w-full max-w-4xl text-center">
								<p className="mb-3 font-mono text-lg font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
									{"// 404"}
								</p>
								<h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl dark:text-white">
									Page not found
								</h1>
								<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
									This route couldn't be resolved, but we can recover.
								</p>
								<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
									<Button href={getAssetPath("/")} variant="primary" size="md">
										<Icon name="arrow-left" className="text-base" />
										Back to home
									</Button>
									<Button
										href="https://effect.website/docs/"
										variant="secondary"
										size="md"
									>
										<Icon name="book-open" className="text-base" />
										Read the docs
									</Button>
								</div>
							</div>

							{/* Bottom: code snippet */}
							<div className="w-full max-w-2xl">
								<div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
									<div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-700">
										<span
											className="inline-block h-2.5 w-2.5 rounded-full"
											style={{ backgroundColor: "#ff5f57" }}
										/>
										<span
											className="inline-block h-2.5 w-2.5 rounded-full"
											style={{ backgroundColor: "#febc2e" }}
										/>
										<span
											className="inline-block h-2.5 w-2.5 rounded-full"
											style={{ backgroundColor: "#28c840" }}
										/>
										<span className="ml-2 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											not-found.ts
										</span>
									</div>
									<pre className="px-4 py-4 font-mono text-sm leading-loose sm:px-5 sm:text-base">
										{codeLines.map((line, i) => (
											<motion.div
												key={`code-line-${i.toString()}`}
												initial={{ opacity: 0, x: -6 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.3,
													delay: 0.3 + i * 0.08,
													ease: "easeOut",
												}}
											>
												{line ?? "\u00A0"}
											</motion.div>
										))}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
