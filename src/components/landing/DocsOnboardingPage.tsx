import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { DocsSectionTabs } from "./DocsLayout";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const FIRST_PROGRAM = `import { Effect } from "effect"

const program = Effect.gen(function* () {
  const name = yield* Effect.succeed("world")
  yield* Effect.log("Hello, " + name + "!")
})

Effect.runPromise(program)`;

const LEARNING_PATH = [
	{
		step: "01",
		title: "Understand the core idea",
		desc: "An Effect is a value that describes a program: what it produces, how it can fail, and what it needs to run. Everything else builds on this one type.",
		linkLabel: "The Effect Type",
		href: "/docs/the-effect-type",
	},
	{
		step: "02",
		title: "Set up your project",
		desc: "Install the library and configure TypeScript. Effect is a single dependency with zero required tooling.",
		linkLabel: "Installation",
		href: "/docs/installation",
	},
	{
		step: "03",
		title: "Write your first program",
		desc: "Create effects, compose them with generators, and run them at the edge of your app.",
		linkLabel: "Creating Effects",
		href: "/docs/creating-effects",
	},
	{
		step: "04",
		title: "Handle errors the Effect way",
		desc: "Errors are typed values, not surprises. Learn expected vs unexpected failures, fallbacks, and retries.",
		linkLabel: "Two Types of Errors",
		href: "/docs/two-types-of-errors",
	},
	{
		step: "05",
		title: "Go concurrent",
		desc: "Run effects in parallel with bounded concurrency, race them, and let structured concurrency clean up after you.",
		linkLabel: "Basic Concurrency",
		href: "/docs/basic-concurrency",
	},
];

const NEXT_STEPS = [
	{
		title: "Guides",
		desc: "The in-depth documentation: every topic from pipelines to PubSub, structured to read in order or dip into.",
		href: "/docs/introduction",
	},
	{
		title: "References",
		desc: "The complete API reference for every Effect module, versioned per release.",
		href: "/docs/api/v3",
	},
	{
		title: "Playground",
		desc: "Run Effect in your browser with a full editor, no local setup needed. Ideal as a second tab while you learn.",
		href: "/play",
	},
];

const CAPABILITIES = [
	{
		name: "Typed errors",
		desc: "Failures live in the signature and are handled like data.",
	},
	{
		name: "Retries and scheduling",
		desc: "Backoff policies you compose instead of loops you write.",
	},
	{
		name: "Structured concurrency",
		desc: "Bounded parallel work that cleans up after itself.",
	},
	{
		name: "Resource safety",
		desc: "Acquisition and release are guaranteed, even when things fail.",
	},
	{
		name: "Dependency injection",
		desc: "Services wired through the type system, trivial to swap in tests.",
	},
	{
		name: "Observability",
		desc: "Tracing, metrics, and structured logging built into the runtime.",
	},
	{
		name: "Streaming",
		desc: "Backpressured streams that use the same operators as everything else.",
	},
	{
		name: "Schema validation",
		desc: "Parse and transform data with types that match reality.",
	},
	{
		name: "Configuration",
		desc: "Typed config from the environment, validated at startup, secrets redacted.",
	},
	{
		name: "A consistent ecosystem",
		desc: "HTTP, SQL, CLI, AI, and platform packages built on the same core.",
	},
];

const linkClass =
	"text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300";

export function DocsOnboardingPage() {
	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>
			<Navigation activePath="/docs" wide compactSearch />
			<div className="relative w-full pt-16">
				<DocsSectionTabs section="docs" />
				<main
					id="main-content"
					className="mx-auto w-full max-w-[88rem] px-4 py-16 lg:py-24"
				>
					{/* Hero */}
					<section className="max-w-3xl">
						<h1 className="text-3xl leading-[1.1] font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
							Welcome to Effect
						</h1>
						<p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
							Effect is a TypeScript library for building production-grade
							software: typed error handling, structured concurrency, resource
							safety, and observability, all from one composable core.
						</p>
					</section>

					<div
						className="mt-12 h-px bg-zinc-200 dark:bg-zinc-800"
						aria-hidden="true"
					/>

					{/* Why Effect */}
					<section className="mt-12 max-w-3xl">
						<h2 className="text-2xl font-semibold tracking-tight">
							Why Effect?
						</h2>
						<div className="mt-6 space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
							<div>
								<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
									Typed data, untyped programs
								</h3>
								<p className="mt-2">
									TypeScript is excellent at describing your data, but it says
									almost nothing about your programs: a function&apos;s
									signature doesn&apos;t tell you what can fail, what
									dependencies it needs, or whether it can be safely retried,
									timed out, or interrupted. As applications grow, teams end up
									hand-rolling those guarantees with ad-hoc try/catch,
									unstructured promises, and libraries that don&apos;t compose.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
									Programs as values
								</h3>
								<p className="mt-2">
									Effect closes that gap with a single building block: the{" "}
									<code className="rounded-md bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-900 dark:bg-zinc-700/60 dark:text-zinc-100">
										Effect
									</code>{" "}
									type, a value that fully describes a program, including its
									success value, its possible errors, and its requirements.
									Because programs are values, they compose: retries, timeouts,
									concurrency, resource handling, and tracing are operators you
									apply, not architectures you rebuild.
								</p>
							</div>
							{/* Capability grid in the docs table language: bordered
							   container, mono-uppercase header bar, hairline rows;
							   two columns from sm up, ecosystem as a full-width
							   closing row. */}
							<div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
								<div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-xs font-medium tracking-wider text-zinc-700 uppercase dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
									Out of the box
								</div>
								<dl className="grid grid-cols-1 sm:grid-cols-2">
									{CAPABILITIES.map((c, i) => (
										<div
											key={c.name}
											className={`border-b border-zinc-200 px-4 py-3 last:border-b-0 sm:nth-last-2:border-b-0 dark:border-zinc-800 ${
												i % 2 === 1 ? "sm:border-l" : ""
											}`}
										>
											<dt className="text-sm font-semibold text-zinc-900 dark:text-white">
												{c.name}
											</dt>
											<dd className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
												{c.desc}
											</dd>
										</div>
									))}
								</dl>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
									Built for the AI era
								</h3>
								<p className="mt-2">
									The AI era raises the stakes. When coding agents write a
									growing share of your software, the bottleneck moves from
									writing code to trusting it. Effect makes a program&apos;s
									failure modes, dependencies, and lifecycle visible to the
									compiler, turning runtime surprises into precise feedback an
									agent can act on. And when the thing you are building is
									itself an AI application, flaky providers, retries, streaming,
									and rate limits are exactly the problems Effect solves out of
									the box.
								</p>
							</div>
						</div>
					</section>

					<div
						className="mt-12 h-px bg-zinc-200 dark:bg-zinc-800"
						aria-hidden="true"
					/>

					{/* Learning path */}
					<section id="learning-path" className="mt-12 max-w-4xl">
						<h2 className="text-2xl font-semibold tracking-tight">
							Your Learning Path
						</h2>
						<p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
							Effect rewards learning in order: each step builds on the one
							before it. Following this spine takes most developers a few
							focused days; everything else branches off from it.
						</p>
						<ol className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
							{LEARNING_PATH.map((item) => (
								<li key={item.step}>
									<a
										href={getAssetPath(item.href)}
										className="group flex items-baseline gap-6 py-5"
									>
										<span
											className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500"
											aria-hidden="true"
										>
											{item.step}
										</span>
										<span className="flex-1">
											<span className="text-base font-semibold text-zinc-900 underline-offset-4 group-hover:underline dark:text-white">
												{item.title}
											</span>
											<span className="mt-1 block text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
												{item.desc}
											</span>
										</span>
										<span
											className="hidden shrink-0 text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-900 md:block dark:text-zinc-400 dark:group-hover:text-white"
											aria-hidden="true"
										>
											{item.linkLabel} →
										</span>
									</a>
								</li>
							))}
						</ol>
						<div className="mt-12 max-w-3xl">
							<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
								Here&apos;s the kind of program you&apos;ll be writing within
								the first hour:
							</p>
							<pre className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-900">
								<code className="font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
									{FIRST_PROGRAM}
								</code>
							</pre>
						</div>
					</section>

					<div
						className="mt-12 h-px bg-zinc-200 dark:bg-zinc-800"
						aria-hidden="true"
					/>

					{/* Next steps */}
					<section className="mt-12 max-w-5xl">
						<h2 className="text-2xl font-semibold tracking-tight">
							Keep Going
						</h2>
						<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
							{NEXT_STEPS.map((item) => (
								<a
									key={item.title}
									href={getAssetPath(item.href)}
									className="group rounded-lg border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
								>
									<h3 className="text-base font-semibold text-zinc-900 dark:text-white">
										{item.title}
										<span
											className="ml-1 inline-block transition-transform group-hover:translate-x-0.5"
											aria-hidden="true"
										>
											→
										</span>
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
										{item.desc}
									</p>
								</a>
							))}
						</div>
					</section>

					<div
						className="mt-12 h-px bg-zinc-200 dark:bg-zinc-800"
						aria-hidden="true"
					/>

					{/* Community */}
					<section className="mt-12 max-w-2xl">
						<h2 className="text-2xl font-semibold tracking-tight">
							Join our Community
						</h2>
						<p className="mt-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
							Effect has an active, friendly community where most questions get
							answered within minutes. Join us on{" "}
							<a
								href="https://discord.gg/effect-ts"
								target="_blank"
								rel="noopener noreferrer"
								className={linkClass}
							>
								<span className="sr-only">(opens in new tab) </span>
								Discord
							</a>
							, and explore community projects, articles, and events in the{" "}
							<a href={getAssetPath("/community-hub")} className={linkClass}>
								Community Hub
							</a>
							.
						</p>
					</section>
				</main>
			</div>
			<Footer activePath="/docs" />
			<GridOverlay />
		</div>
	);
}
