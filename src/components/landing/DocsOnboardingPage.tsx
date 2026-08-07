import { getAssetPath } from "../../utils/assetPath";
import { DocsLayout } from "./DocsLayout";

const TOC = [
	{ id: "overview", label: "Overview" },
	{ id: "why-effect", label: "Why Effect?" },
	{ id: "learning-path", label: "Your Learning Path" },
	{ id: "practice", label: "Practice as You Learn" },
	{ id: "join-our-community", label: "Join our Community" },
];

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
		desc: "An Effect is a value that describes a program — what it produces, how it can fail, and what it needs to run. Everything else builds on this one type.",
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

const linkClass =
	"text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300";

export function DocsOnboardingPage() {
	return (
		<DocsLayout activeSlug="onboarding" sectionTabs={false} tocItems={TOC}>
			<article className="max-w-3xl">
				<h1
					id="overview"
					className="text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white"
				>
					Welcome to Effect
				</h1>

				<div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Effect is a TypeScript library for building production-grade
						software — applications that need typed error handling, structured
						concurrency, resource safety, and observability, without bolting on
						a different tool for each.
					</p>
					<p>
						This page is your starting point: why Effect exists, and the
						shortest path from zero to productive.
					</p>
				</div>

				<h2
					id="why-effect"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Why Effect?
				</h2>
				<div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						TypeScript is excellent at describing your data, but it says almost
						nothing about your programs: a function&apos;s signature
						doesn&apos;t tell you what can fail, what dependencies it needs, or
						whether it can be safely retried, timed out, or interrupted. As
						applications grow, teams end up hand-rolling those guarantees with
						ad-hoc try/catch, unstructured promises, and libraries that
						don&apos;t compose.
					</p>
					<p>
						Effect closes that gap with a single building block: the{" "}
						<code className="rounded-md bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-900 dark:bg-zinc-700/60 dark:text-zinc-100">
							Effect
						</code>{" "}
						type — a value that fully describes a program, including its success
						value, its possible errors, and its requirements. Because programs
						are values, they compose: retries, timeouts, concurrency, resource
						handling, and tracing are operators you apply, not architectures you
						rebuild.
					</p>
					<p>
						For the full case — with side-by-side comparisons to plain
						TypeScript — read{" "}
						<a href={getAssetPath("/docs/why-effect")} className={linkClass}>
							Why Effect?
						</a>
						.
					</p>
				</div>

				<h2
					id="learning-path"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Your Learning Path
				</h2>
				<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					Effect rewards learning in order — each step below builds on the one
					before it. Following this spine takes most developers a few focused
					days; everything else in the Guides branches off from it.
				</p>
				<ol className="mt-8 space-y-4">
					{LEARNING_PATH.map((item) => (
						<li
							key={item.step}
							className="flex gap-5 rounded-md border border-zinc-200 p-5 dark:border-zinc-800"
						>
							<span
								className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500"
								aria-hidden="true"
							>
								{item.step}
							</span>
							<div>
								<h3 className="text-base font-semibold text-zinc-900 dark:text-white">
									{item.title}
								</h3>
								<p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
									{item.desc}
								</p>
								<a
									href={getAssetPath(item.href)}
									className={`mt-2 inline-block text-sm ${linkClass}`}
								>
									{item.linkLabel} →
								</a>
							</div>
						</li>
					))}
				</ol>
				<div className="mt-8 space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Here&apos;s the kind of program you&apos;ll be writing within the
						first hour:
					</p>
				</div>
				<pre className="mt-4 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-900">
					<code className="font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
						{FIRST_PROGRAM}
					</code>
				</pre>

				<h2
					id="practice"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Practice as You Learn
				</h2>
				<div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						You don&apos;t need a local setup to experiment: the{" "}
						<a href={getAssetPath("/play")} className={linkClass}>
							Playground
						</a>{" "}
						runs Effect in your browser, with the same editor experience
						you&apos;d have locally. Keep it open in a second tab and try each
						concept as you read about it — the ideas stick much faster when you
						run them.
					</p>
					<p>
						When you&apos;re ready to go deeper, the{" "}
						<a href={getAssetPath("/docs/introduction")} className={linkClass}>
							Guides
						</a>{" "}
						cover every topic in depth, and the{" "}
						<a href={getAssetPath("/docs/api/v3")} className={linkClass}>
							API Reference
						</a>{" "}
						documents every module.
					</p>
				</div>

				<h2
					id="join-our-community"
					className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
				>
					Join our Community
				</h2>
				<p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					Effect has an active, friendly community — most questions get answered
					within minutes. Join us on{" "}
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
			</article>
		</DocsLayout>
	);
}
