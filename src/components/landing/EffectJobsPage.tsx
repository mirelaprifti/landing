import { JOBS, LOGO_COMPANIES, SUBMIT_URLS } from "../../data/effect-jobs";
import { getAssetPath } from "../../utils/assetPath";
import { Button } from "../ui/Button";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

function linkDisplay(url: string): string {
	try {
		const parsed = new URL(url);
		// Discord invite link → friendly label
		if (parsed.hostname.endsWith("discord.gg")) return "Discord #job-board";
		return parsed.hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

export function EffectJobsPage() {
	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/effect-jobs" />

			{/* Vertical border lines */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

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
						<div
							className="absolute inset-0"
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

					<div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-4">
						<p className="pt-16 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase md:pt-20">
							// Effect Jobs
						</p>

						<h1 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl dark:text-white">
							Companies hiring Effect engineers
						</h1>
						<p className="mt-4 text-lg leading-relaxed text-zinc-800 md:text-xl dark:text-zinc-400">
							A community-powered directory of open roles where Effect is part of
							the stack.
						</p>

						{/* CTA */}
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<Button href={SUBMIT_URLS.postJob} variant="primary" size="md">
								Post a job
								<i className="ri-arrow-right-up-line text-base" aria-hidden="true" />
							</Button>
						</div>
					</div>
				</section>

				{/* Open positions */}
				<section className="relative border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:gap-x-0 md:py-20">
							{/* Job list — Role · Company · Link · Location */}
							<ul className="md:col-span-12">
								{JOBS.map((job) => (
									<li key={`${job.company}-${job.role}`}>
										<a
											href={job.url}
											target="_blank"
											rel="noopener noreferrer"
											className="group block -mx-4 border-t border-zinc-300 px-4 py-4 transition-colors first:border-t-0 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/80"
										>
											<div className="grid grid-cols-12 items-baseline gap-4">
												{/* Role */}
												<h3 className="col-span-12 text-base font-semibold text-zinc-900 md:col-span-5 dark:text-white">
													<span className="sr-only">Role: </span>
													{job.role}
												</h3>
												{/* Company */}
												<p className="col-span-12 text-base text-zinc-700 transition-colors group-hover:text-zinc-900 md:col-span-3 dark:text-zinc-400 dark:group-hover:text-zinc-200">
													<span className="sr-only">Company: </span>
													{job.company}
												</p>
												{/* Location */}
												<p className="col-span-12 font-mono text-[10px] tracking-[0.12em] text-zinc-700 uppercase md:col-span-2 dark:text-zinc-400">
													<span className="sr-only">Location: </span>
													{job.location ?? ""}
												</p>
												{/* Link */}
												<p className="col-span-12 inline-flex items-baseline gap-1 truncate font-mono text-xs text-zinc-700 md:col-span-2 md:justify-end dark:text-zinc-400">
													<span className="sr-only">Apply: </span>
													<span className="truncate">
														{linkDisplay(job.url)}
													</span>
													<span className="sr-only"> (opens in new tab)</span>
													<i
														aria-hidden="true"
														className="ri-arrow-right-up-line shrink-0 text-base text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300"
													/>
												</p>
											</div>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{/* Disclaimer */}
				<section className="relative border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12">
							<div className="md:col-span-12">
								<p className="font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-400">
									// Disclaimer
								</p>
								<p className="mt-3 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
									Please note that these job postings are shared for informational
									purposes, and we encourage applicants to verify details directly
									with the hiring companies. Inclusion in the above list does not
									imply endorsement by the Effect team.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Past & current employers — 6×3 logo grid */}
				{LOGO_COMPANIES.length > 0 && (
					<section className="relative border-t border-zinc-200 dark:border-zinc-800">
						<div className="mx-auto w-full max-w-[73.75rem] px-4">
							<div className="py-16 md:py-20">
								<p className="mb-8 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Teams running Effect in production
								</p>

								<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
									{Array.from({ length: 18 }).map((_, idx) => {
										const company = LOGO_COMPANIES[idx];
										const cols = 6;
										const rows = 3;
										const col = idx % cols;
										const row = Math.floor(idx / cols);
										const isLastCol = col === cols - 1;
										const isLastRow = row === rows - 1;
										return (
											<li
												key={company?.name ?? `empty-${idx}`}
												className="relative flex aspect-5/2 items-center justify-center"
											>
												{/* Right vertical line — inset top/bottom to leave a gap at intersections */}
												{!isLastCol && (
													<span className="pointer-events-none absolute top-2 right-0 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
												)}
												{/* Bottom horizontal line — inset left/right to leave a gap at intersections */}
												{!isLastRow && (
													<span className="pointer-events-none absolute right-2 bottom-0 left-2 h-px bg-zinc-200 dark:bg-zinc-800" />
												)}
												{company ? (
													company.url ? (
														<a
															href={company.url}
															target="_blank"
															rel="noopener noreferrer"
															aria-label={company.name}
															className="flex h-full w-full items-center justify-center px-4 transition-opacity hover:opacity-100"
														>
															<img
																src={getAssetPath(company.logo)}
																alt={company.name}
																style={{ height: `${(company.h ?? 6) * 4}px` }}
																className="w-auto opacity-80 transition-opacity"
															/>
														</a>
													) : (
														<img
															src={getAssetPath(company.logo)}
															alt={company.name}
															style={{ height: `${(company.h ?? 6) * 4}px` }}
															className="w-auto opacity-80"
														/>
													)
												) : null}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</section>
				)}

			</main>

			<Footer activePath="/effect-jobs" />
		</div>
	);
}
