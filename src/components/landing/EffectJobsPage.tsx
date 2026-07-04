import { JOBS, LOGO_COMPANIES, SUBMIT_URLS } from "../../data/effect-jobs";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Button } from "../ui/Button";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

function linkDisplay(url: string): string {
	try {
		const parsed = new URL(url);
		// Discord invite / channel link → friendly label
		if (
			parsed.hostname.endsWith("discord.gg") ||
			parsed.hostname.endsWith("discord.com")
		)
			return "Discord #job-board";
		return parsed.hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

export function EffectJobsPage() {
	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
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
									linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
									linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
								`,
								backgroundSize: "196.6px 194px",
								backgroundPosition: "calc(50% + 97px) -34px",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to bottom, var(--page-fade) 0%, transparent 20%, transparent 60%, var(--page-fade) 100%)",
							}}
						/>
						<div
							className="absolute inset-x-0 top-0 h-[400px]"
							style={{
								background:
									"radial-gradient(ellipse 50% 80% at 50% -20%, var(--hero-glow-a) 0%, transparent 50%)",
							}}
						/>
					</div>

					<div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-4">
						<p className="pt-16 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase md:pt-20">
							// Effect Jobs
						</p>

						<h1 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
							Companies hiring Effect engineers
						</h1>
						<p className="mt-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-400">
							A community-powered directory of open roles where Effect is part of
							the stack.
						</p>

						{/* CTA */}
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<Button href={SUBMIT_URLS.postJob} variant="primary" size="lg">
								Post a job
								<i className="ri-arrow-right-up-line text-lg" aria-hidden="true" />
							</Button>
						</div>
					</div>
				</section>

				{/* Open positions — card grid */}
				<section className="relative border-t border-zinc-200 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="pt-4">
							<ul className="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:bg-zinc-800">
								{JOBS.map((job) => (
									<li key={`${job.company}-${job.role}`} className="bg-zinc-50 dark:bg-zinc-950">
										<a
											href={job.url}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex h-full flex-col p-6 transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 focus-visible:outline-none dark:hover:bg-zinc-900/80 dark:focus-visible:bg-zinc-900/80 dark:focus-visible:ring-white"
										>
											{/* Header: logo + company name on left, apply arrow on right */}
											<div className="flex items-center justify-between gap-4">
												<div className="flex min-w-0 items-center gap-4">
													<span
														aria-hidden="true"
														className="flex h-12 w-12 shrink-0 items-center justify-center"
													>
														{job.logo ? (
															<img
																src={getAssetPath(job.logo)}
																alt=""
																className="max-h-12 max-w-full object-contain"
															/>
														) : (
															<span className="h-9 w-9 rounded-sm border border-dashed border-zinc-300 dark:border-zinc-700" />
														)}
													</span>
													<p className="truncate text-base font-semibold text-zinc-900 dark:text-white">
														<span className="sr-only">Company: </span>
														{job.company}
													</p>
												</div>
												<i
													aria-hidden="true"
													className="ri-arrow-right-up-line shrink-0 text-xl text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300"
												/>
											</div>

											{/* Role (headline) */}
											<h3 className="mt-5 text-lg leading-tight font-semibold text-zinc-900 dark:text-white">
												<span className="sr-only">Role: </span>
												{job.role}
											</h3>

											{/* Description */}
											{job.description && (
												<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
													{job.description}
												</p>
											)}

											{/* Meta footer: pay + type above divider, location below */}
											<dl className="mt-auto flex flex-col gap-1.5 pt-6 font-mono text-sm text-zinc-700 dark:text-zinc-400">
												{job.payRange && (
													<div className="flex gap-2">
														<dt className="sr-only">Pay range</dt>
														<dd className="tabular-nums">{job.payRange}</dd>
													</div>
												)}
												{job.type && (
													<div className="flex gap-2">
														<dt className="sr-only">Type</dt>
														<dd>{job.type}</dd>
													</div>
												)}
												{job.location && (
													<div className="mt-2 flex gap-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
														<dt className="sr-only">Location</dt>
														<dd>{job.location}</dd>
													</div>
												)}
											</dl>

											{/* Screen-reader-only link target */}
											<span className="sr-only">
												Apply at {linkDisplay(job.url)} (opens in new tab)
											</span>
										</a>
									</li>
								))}

								{/* CTA card — invites teams to post a job */}
								<li className="bg-zinc-50 dark:bg-zinc-950 sm:col-span-2 lg:col-span-2">
									<a
										href={SUBMIT_URLS.postJob}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex h-full flex-col p-6 transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 focus-visible:outline-none dark:hover:bg-zinc-900/80 dark:focus-visible:bg-zinc-900/80 dark:focus-visible:ring-white"
									>
										{/* Header: dashed-frame placeholder + arrow */}
										<div className="flex items-center justify-between gap-4">
											<div className="flex min-w-0 items-center gap-4">
												<span
													aria-hidden="true"
													className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-dashed border-zinc-400 text-lg text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
												>
													<i className="ri-add-line" />
												</span>
												<p className="truncate font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
													// Post a job
												</p>
											</div>
											<i
												aria-hidden="true"
												className="ri-arrow-right-up-line shrink-0 text-xl text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-300"
											/>
										</div>

										{/* Headline */}
										<h3 className="mt-5 text-lg leading-tight font-semibold text-zinc-900 dark:text-white">
											Hiring Effect engineers?
										</h3>

										{/* Body */}
										<p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
											Open a GitHub issue with your role and we'll add it to this
											board.
										</p>

										<span className="sr-only">
											Opens GitHub issue template in a new tab
										</span>
									</a>
								</li>
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
							<div className="pt-16 pb-8 md:pt-20 md:pb-10">
								<p className="mb-8 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
									// Teams running Effect in production
								</p>

								<ul className="grid grid-cols-2 gap-px bg-zinc-200 sm:grid-cols-3 md:grid-cols-6 dark:bg-zinc-800">
									{Array.from({ length: 18 }).map((_, idx) => {
										const company = LOGO_COMPANIES[idx];
										return (
											<li
												key={company?.name ?? `empty-${idx}`}
												className="flex aspect-5/2 items-center justify-center bg-zinc-50 dark:bg-zinc-950"
											>
												{company ? (
													company.url ? (
														<a
															href={company.url}
															target="_blank"
															rel="noopener noreferrer"
															aria-label={company.name}
															className="flex h-full w-full items-center justify-center px-4 transition-opacity hover:opacity-90"
														>
															<img
																src={getAssetPath(company.logo)}
																alt={company.name}
																style={{
																	height: company.h ?? "20px",
																	filter: company.invert ? "brightness(0) invert(1)" : undefined,
																}}
																className="w-auto opacity-90"
															/>
														</a>
													) : (
														<img
															src={getAssetPath(company.logo)}
															alt={company.name}
															style={{
																height: company.h ?? "20px",
																filter: company.invert ? "brightness(0) invert(1)" : undefined,
															}}
															className="w-auto opacity-90"
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
			<GridOverlay />
		</div>
	);
}
