import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, getPostUrl } from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import { Link } from "@/components/ui";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Icon } from "@/components/ui/Icon";

/** Shared prose configuration for blog article bodies (also used by /styleguide). */
export const BLOG_PROSE_CLASS =
	"prose prose-zinc prose-headings:font-semibold prose-h2:mt-14 prose-h2:mb-3 prose-h2:text-[1.5rem] prose-h2:leading-[1.33] prose-h2:tracking-[-0.012em] prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[1.25rem] prose-h3:leading-[1.4] prose-h4:mt-7 prose-h4:mb-2.5 prose-h4:text-[1.0625rem] prose-h4:leading-[1.4] prose-p:my-5 prose-p:text-[1.0625rem] prose-p:leading-[1.6] prose-p:text-zinc-700 prose-a:text-zinc-900 prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 hover:prose-a:decoration-zinc-600 prose-strong:text-zinc-900 prose-code:rounded-md prose-code:bg-zinc-200/60 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:text-zinc-800 prose-code:before:content-none prose-code:after:content-none prose-pre:my-8 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50 prose-pre:text-sm prose-pre:leading-[1.6] [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 prose-ul:my-5 prose-ol:my-5 prose-li:my-2 prose-li:text-[1.0625rem] prose-li:leading-[1.6] prose-li:text-zinc-700 prose-li:marker:text-zinc-400 prose-blockquote:my-10 prose-blockquote:border-none prose-blockquote:p-0 prose-blockquote:not-italic prose-blockquote:font-semibold prose-blockquote:text-[1.5rem] prose-blockquote:leading-[1.33] prose-blockquote:tracking-[-0.012em] prose-blockquote:text-zinc-900 [&>img]:my-12 prose-figure:my-12 prose-figcaption:mt-2 prose-figcaption:text-sm prose-figcaption:text-zinc-500 prose-table:my-8 prose-table:text-base prose-th:text-left prose-th:font-semibold prose-th:text-zinc-900 prose-td:text-zinc-700 prose-hr:my-12 prose-hr:border-zinc-200 dark:prose-invert dark:prose-p:text-zinc-400 dark:prose-a:text-zinc-200 dark:prose-a:decoration-zinc-400 dark:hover:prose-a:decoration-zinc-300 dark:prose-strong:text-zinc-200 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200 dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-900/80 dark:prose-li:text-zinc-400 dark:prose-li:marker:text-zinc-500 dark:prose-blockquote:text-zinc-200 dark:prose-figcaption:text-zinc-400 dark:prose-th:text-zinc-200 dark:prose-td:text-zinc-400 dark:prose-hr:border-zinc-800";

function ShareButtons({ title }: { title: string }) {
	const [copied, setCopied] = useState(false);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	const encodedUrl = encodeURIComponent(shareUrl);
	const encodedTitle = encodeURIComponent(title);
	const xUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
	const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

	const handleCopy = async () => {
		if (typeof window === "undefined") return;
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// noop
		}
	};

	const buttonClass =
		"inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white";

	return (
		<div className="flex items-center gap-3">
			<span className="font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
				Share
			</span>
			<div className="flex items-center gap-2">
				<a
					href={xUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Share on X"
					className={buttonClass}
				>
					<i className="ri-twitter-x-line text-lg" aria-hidden="true" />
				</a>
				<a
					href={linkedInUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Share on LinkedIn"
					className={buttonClass}
				>
					<i className="ri-linkedin-fill text-lg" aria-hidden="true" />
				</a>
				<button
					type="button"
					onClick={handleCopy}
					aria-label={copied ? "Link copied" : "Copy link"}
					className={buttonClass}
				>
					<Icon
						name={copied ? "check" : "link"}
						className="text-lg"
						aria-hidden="true"
					/>
				</button>
			</div>
		</div>
	);
}

function TableOfContents({
	className,
	showBackLink = true,
	postTitle,
	postDate,
}: {
	className?: string;
	showBackLink?: boolean;
	postTitle?: string;
	postDate?: string;
}) {
	// Built from the rendered article headings so it works for any post
	const [tocItems, setTocItems] = useState<
		{ id: string; label: string; depth: number }[]
	>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const els = document.querySelectorAll<HTMLElement>(
			"article h2[id], article h3[id]",
		);
		setTocItems(
			[...els].map((el) => ({
				id: el.id,
				label: el.textContent ?? "",
				depth: el.tagName === "H2" ? 0 : 1,
			})),
		);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const headings = tocItems
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length > 0) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: "-80px 0px -70% 0px", threshold: 0 },
		);

		headings.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [tocItems]);

	return (
		<nav className={cn("sticky top-[5.5rem]", className)}>
			<div className="rounded-md border border-zinc-200 bg-zinc-50/40 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
				<p className="mb-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
					On this page
				</p>
				<div className="mb-3 h-px bg-zinc-200 dark:bg-zinc-800" />
				<ul className="space-y-2">
					{tocItems.map((item) => {
						const isActive = activeId === item.id;
						return (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className={`block text-sm leading-snug transition-colors duration-150 ${
										item.depth === 0 ? "" : "pl-4"
									} ${
										isActive
											? "text-zinc-900 underline underline-offset-4 dark:text-white"
											: "text-zinc-600 hover:text-zinc-900 hover:underline hover:underline-offset-4 dark:text-zinc-400 dark:hover:text-white"
									}`}
								>
									{item.label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Share + Last updated + Back to blog */}
			{showBackLink && (
				<div className="mt-6">
					{postTitle && (
						<>
							<ShareButtons title={postTitle} />
							<div className="mt-5 border-t border-zinc-200 pt-5 dark:border-zinc-800" />
						</>
					)}
					{postDate && (
						<p className="flex flex-col gap-0.5">
							<span className="font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase dark:text-zinc-400">
								Last updated
							</span>
							<time className="font-mono text-xs text-zinc-700 tabular-nums dark:text-zinc-300">
								{postDate}
							</time>
						</p>
					)}
				</div>
			)}
		</nav>
	);
}

function PostNavigation({ currentSlug }: { currentSlug: string }) {
	const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === currentSlug);
	const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
	const nextPost =
		currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

	if (!prevPost && !nextPost) return null;

	const prevUrl = prevPost ? getPostUrl(prevPost) : null;
	const nextUrl = nextPost ? getPostUrl(nextPost) : null;
	const prevIsExternal = prevUrl?.startsWith("http") ?? false;
	const nextIsExternal = nextUrl?.startsWith("http") ?? false;

	return (
		<div className="mt-16 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-10 sm:grid-cols-2 dark:border-zinc-800">
			{prevPost && prevUrl ? (
				<a
					href={prevIsExternal ? prevUrl : getAssetPath(prevUrl)}
					{...(prevIsExternal
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className="group flex flex-col rounded-md border border-zinc-300 px-6 py-5 transition-colors duration-200 hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-500"
				>
					<span className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
						<Icon
							name="chevron-left"
							className="text-base transition-transform duration-200 group-hover:-translate-x-0.5"
						/>
						Previous
					</span>
					<span className="mt-2 line-clamp-1 text-base font-medium text-zinc-800 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white">
						{prevPost.title}
					</span>
				</a>
			) : (
				<div />
			)}
			{nextPost && nextUrl ? (
				<a
					href={nextIsExternal ? nextUrl : getAssetPath(nextUrl)}
					{...(nextIsExternal
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className="group flex flex-col items-end rounded-md border border-zinc-300 px-6 py-5 text-right transition-colors duration-200 hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-500"
				>
					<span className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
						Next
						<Icon
							name="chevron-right"
							className="text-base transition-transform duration-200 group-hover:translate-x-0.5"
						/>
					</span>
					<span className="mt-2 line-clamp-1 text-base font-medium text-zinc-800 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white">
						{nextPost.title}
					</span>
				</a>
			) : (
				<div />
			)}
		</div>
	);
}

function EffectV4BetaContent() {
	return (
		<>
			<h2 id="faster-runtime">Faster runtime. Leaner bundles.</h2>
			<p>
				The core fiber runtime has been rewritten from scratch to have lower
				memory overhead, faster execution, and simpler internals. Every Effect
				application benefits from these optimizations immediately.
			</p>

			<h3 id="bundle-size">Bundle size</h3>
			<p>
				A minimal program using Effect, Stream, and Schema drops from roughly{" "}
				<strong>70 kB</strong> in v3 to about <strong>20 kB</strong> in v4.
			</p>

			<pre>
				<code>{`import { Effect } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Effect.succeed(42)
  yield* Effect.log(\`The answer is \${result}\`)
})

Effect.runPromise(program)`}</code>
			</pre>

			<div className="not-prose my-8">
				<div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
					<video autoPlay controls loop muted playsInline width="100%">
						<source
							src="https://effect.website/video/bundle-size-viz.mp4"
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			<h2 id="one-version">One version. One ecosystem.</h2>

			<p>
				All Effect ecosystem packages now share a single version number and are
				released together. No more debugging version mismatches.
			</p>

			<h3 id="consolidated-core">A consolidated core</h3>
			<p>
				Functionality from <code>@effect/platform</code>,{" "}
				<code>@effect/rpc</code>, and <code>@effect/cluster</code> now lives
				directly inside <code>effect</code>.
			</p>

			<div className="not-prose my-8">
				<div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
					<video autoPlay controls loop muted playsInline width="100%">
						<source
							src="https://effect.website/video/core-package.mp4"
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			<h2 id="unstable-modules">Unstable modules</h2>
			<p>
				New capabilities ship via <code>effect/unstable/*</code> import paths
				without committing to semver stability for evolving APIs.
			</p>

			<h2 id="beta-phase">The beta phase</h2>
			<p>
				This is a beta. APIs will evolve as we incorporate real-world feedback.
				If you're running Effect in production, v3 remains recommended for now.
			</p>

			<h2 id="migrating">Migrating from Effect v3</h2>
			<p>
				The core programming model is the same. Changes are in package
				organization, module versioning, and specific API details. See the{" "}
				<a
					href="https://github.com/Effect-TS/effect-smol/blob/main/MIGRATION.md"
					target="_blank"
					rel="noopener noreferrer"
				>
					migration guide
				</a>
				.
			</p>

			<h2 id="try-it-now">Try it now</h2>
			<p>
				Port a project or module and{" "}
				<a
					href="https://github.com/Effect-TS/effect-smol/issues"
					target="_blank"
					rel="noopener noreferrer"
				>
					file an issue
				</a>{" "}
				with what you find. Join the{" "}
				<a
					href="https://discord.gg/effect-ts"
					target="_blank"
					rel="noopener noreferrer"
				>
					Discord
				</a>{" "}
				to share your experience.
			</p>
		</>
	);
}

function Twie128Content() {
	return (
		<>
			<p>Hi Effecters!</p>
			<p>
				Welcome back to This Week In Effect (<strong>TWIE</strong>) - your
				weekly update of the latest developments in the Effect community and
				ecosystem.
			</p>
			<p>
				Effect is a powerful TypeScript library that helps developers build
				complex, synchronous, and asynchronous programs. One key feature that
				sets Effect apart is how it leverages structured concurrency to provide
				features such as async cancellation and safe resource management,
				making it easier to build robust, scalable, and efficient programs.
			</p>
			<p>
				To get started, below you'll find links to our documentation and our
				guide for installing Effect. Enjoy!
			</p>
			<ul>
				<li>
					<a
						href="https://effect.website/docs/getting-started/introduction/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Effect Documentation
					</a>
				</li>
				<li>
					<a
						href="https://effect.website/docs/getting-started/installation/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Installing Effect
					</a>
				</li>
			</ul>
			<p>
				<strong>Recent major updates:</strong>
			</p>
			<ul>
				<li>
					<a
						href="https://effect.website/blog/releases/effect/40-beta/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Effect v4 Beta
					</a>{" "}
					Release! 🚀
				</li>
				<li>
					<a
						href="https://github.com/Effect-TS/effect/releases/tag/%40effect%2Fai%400.27.0"
						target="_blank"
						rel="noopener noreferrer"
					>
						Effect AI SDK
					</a>{" "}
					Release.
				</li>
				<li>
					Durable workflows in TypeScript with{" "}
					<a
						href="https://github.com/Effect-TS/effect/tree/main/packages/effect/src/unstable/workflow"
						target="_blank"
						rel="noopener noreferrer"
					>
						<code>@effect/workflow</code>
					</a>{" "}
					- currently in alpha.
				</li>
				<li>
					6500+ community members on{" "}
					<a
						href="https://discord.gg/effect-ts"
						target="_blank"
						rel="noopener noreferrer"
					>
						Discord
					</a>
					.
				</li>
			</ul>

			<h2 id="technology">Technology</h2>

			<h3 id="effect-v4-beta-updates">Effect v4 Beta updates</h3>
			<p>
				The first full week on the canonical <code>Effect-TS/effect</code>{" "}
				repository was packed, with a thorough <code>Cron</code> hardening
				pass, fiber runtime fixes, new core APIs, and continued AI and HTTP
				improvements — here are the most notable changes that landed this week.
			</p>
			<ul>
				<li>
					<strong>Cron hardening</strong>: Validated <code>Cron.make</code>{" "}
					field restrictions, fixed <code>Cron.prev</code> month day rollover
					and weekday wrapping, fixed alias normalization, added day and
					weekday intersection semantics in the inspection representation, and
					corrected JSDoc examples and documentation accuracy.
				</li>
				<li>
					<strong>Fiber runtime fixes</strong>: Fixed fiber self-interruption
					from inside a running observer, cleaned up more references on fiber
					exit, and fixed <code>Fiber.joinAll</code> observers leaking on
					interruption. Also fixed cache lookup to only interrupt when all
					awaiters are gone.
				</li>
				<li>
					<strong>New core APIs</strong>: Added <code>Effect.reduce</code> for
					folding over a collection of effects, and added discriminants to{" "}
					<code>Schema.toTaggedUnion</code> for more precise tagged union
					encoding.
				</li>
				<li>
					<strong>Schema improvements</strong>: Simplified the displayed{" "}
					<code>Type</code>, <code>Encoded</code>, and <code>Iso</code> types
					of required readonly <code>Schema.Struct</code> fields for cleaner
					hover types in editors, and preserved nested class construction when
					applying constructor defaults.
				</li>
				<li>
					<strong>HTTP fixes</strong>: Fixed <code>HttpRouter</code>{" "}
					middleware context inference, routed multipart errors to HTTP
					responses, fixed published pre-response handler types, handled
					aborted HEAD responses during <code>NodeHttpServer</code> disposal,
					and fixed the OpenAPI generator's handling of recursive schema
					forward references.
				</li>
				<li>
					<strong>AI</strong>: Fixed OpenRouter dynamic tools sending an empty
					parameters schema, preserved OpenAI Responses cache write token
					usage, and restricted nightly AI codegen to Effect-TS repositories.
				</li>
				<li>
					<strong>SQL</strong>: Added <code>disablePreparedStatements</code>{" "}
					option to <code>@effect/sql-mysql2</code>, and avoided creating a
					table when it's not needed.
				</li>
				<li>
					<strong>CLI</strong>: Removed the doubled "Expected" prefix from{" "}
					<code>InvalidValue</code> messages, and preserved chained vitest
					helpers like <code>it.describe.each</code> through the{" "}
					<code>it</code> proxy.
				</li>
				<li>
					<strong>MutableList</strong>: Fixed <code>filter</code> empty-state
					handling to prevent incorrect state after filtering all elements.
				</li>
				<li>
					<strong>Internals</strong>: Ran a dependency audit, moved pnpm
					config, and upgraded TSTyche.
				</li>
			</ul>
			<p>
				You can follow the full changelog in the{" "}
				<a
					href="https://github.com/Effect-TS/effect/commits/main"
					target="_blank"
					rel="noopener noreferrer"
				>
					effect repository
				</a>
				.
			</p>
			<p>
				To catch up on more updates, check out{" "}
				<a
					href="https://effect.website/blog/tags/effect-v4-beta-recaps/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<strong>Effect v4 Beta updates</strong>
				</a>
				.
			</p>
			<p>Other technical changes from the past week.</p>

			<h3 id="effect-core">Effect Core</h3>
			<ul>
				<li>
					<a
						href="https://github.com/Effect-TS/effect/pull/6507"
						target="_blank"
						rel="noopener noreferrer"
					>
						Suppress unhandled logs from timeout fibers
					</a>{" "}
					(Bug Fix)
				</li>
			</ul>

			<h2 id="cause-effect-podcast-episode-9">
				Cause &amp; Effect Podcast | Episode #9
			</h2>
			<p>
				<strong>Foldkit: An Effect-First Frontend Framework</strong>
			</p>
			<p>
				Devin Jameson joined Johannes Schickling on the Cause &amp; Effect
				podcast to talk about{" "}
				<a
					href="https://foldkit.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Foldkit
				</a>
				, an Effect-first frontend framework he's been building, inspired by
				Elm architecture. Devin and Johannes discussed why Foldkit takes a
				schema-first approach to frontend state, how it differs from React, how
				commands model side effects, and why this architecture may be
				especially useful in the age of AI-assisted coding.
			</p>
			<p>
				<a
					href="https://youtube.com/watch?v=MyKLh5CMpeY"
					target="_blank"
					rel="noopener noreferrer"
				>
					Watch the episode on YouTube →
				</a>
			</p>
			<p>
				The Cause &amp; Effect podcast, hosted by Johannes Schickling, features
				stories from software engineers and companies that use Effect in
				production and is available on{" "}
				<a
					href="https://www.youtube.com/@effect-ts"
					target="_blank"
					rel="noopener noreferrer"
				>
					YouTube
				</a>
				,{" "}
				<a
					href="https://x.com/EffectTS_/status/2079159381988626585"
					target="_blank"
					rel="noopener noreferrer"
				>
					X(Twitter)
				</a>
				, and audio platforms like{" "}
				<a
					href="https://open.spotify.com/episode/0xIquYRLjeHIwu1ZhvbmR9"
					target="_blank"
					rel="noopener noreferrer"
				>
					Spotify
				</a>{" "}
				and{" "}
				<a
					href="https://podcasts.apple.com/us/podcast/foldkit-an-effect-first-frontend-framework-9/id1781879869?i=1000777536363"
					target="_blank"
					rel="noopener noreferrer"
				>
					Apple Podcast
				</a>
				.
			</p>

			<h2 id="effect-website">Effect Website</h2>
			<p>
				We redesigned and rebuilt the Effect website!{" "}
				<a
					href="https://github.com/Effect-TS/website"
					target="_blank"
					rel="noopener noreferrer"
				>
					Check out the public repo
				</a>{" "}
				and feel free to post issues / pull requests there.
			</p>
			<p>
				The docs are still for Effect v3 for now. This new website gives us the
				foundation to build a much better documentation experience for Effect
				v4, which we'll continue developing as we move toward the release.
			</p>
			<blockquote>
				<p>
					We shipped a brand-new Effect website. Take it for a spin, click
					everything, and let us know what you think. Bugs, feedback,
					confusing bits, we want all of it.
				</p>
			</blockquote>
			<p>
				—{" "}
				<a
					href="https://twitter.com/EffectTS_/status/2080653731259920445"
					target="_blank"
					rel="noopener noreferrer"
				>
					Effect (@EffectTS_) on X
				</a>
			</p>

			<h2 id="community-highlights">Community Highlights</h2>
			<p>WELL WELL WELL LOOK HOW THE TURN TABLES -cit. Dillon Mulroy</p>
			<blockquote>
				<p>I am enjoying effect more and more these days</p>
			</blockquote>
			<p>
				—{" "}
				<a
					href="https://twitter.com/ThePrimeagen/status/2078203218807640075"
					target="_blank"
					rel="noopener noreferrer"
				>
					ThePrimeagen (@ThePrimeagen) on X
				</a>
			</p>
			<p>Effect 🧡 Cloudflare</p>
			<blockquote>
				<p>and Cloudflare (deployed another service today using Effect)</p>
			</blockquote>
			<p>
				—{" "}
				<a
					href="https://twitter.com/ericclemmons/status/2079736273036607822"
					target="_blank"
					rel="noopener noreferrer"
				>
					Eric Clemmons (@ericclemmons) on X
				</a>
			</p>
			<p>It's funny because it's true.</p>
			<blockquote>
				<p>
					the funny think about effect is that things that the @EffectTS_ team
					considers "unstable" are much more stable than most things that
					other folks consider "stable"
				</p>
			</blockquote>
			<p>
				—{" "}
				<a
					href="https://twitter.com/0xblacklight/status/2080036507558298070"
					target="_blank"
					rel="noopener noreferrer"
				>
					Kyle Mistele (@0xblacklight) on X
				</a>
			</p>
			<ul>
				<li>
					Building Loops for the Real World, by Kyle Mistele (HumanLayer) at
					AI Engineer World's Fair 2026.{" "}
					<a
						href="https://www.youtube.com/live/htM02KMNZnk?t=24389s"
						target="_blank"
						rel="noopener noreferrer"
					>
						Watch the livestream slot →
					</a>
				</li>
				<li>
					<strong>
						Effect.ts + GraphQL | Using Effect RPC to Serve GraphQL
					</strong>{" "}
					by Lucas Barake.{" "}
					<a
						href="https://youtube.com/watch?v=jgfS7s0XN6E"
						target="_blank"
						rel="noopener noreferrer"
					>
						Watch on YouTube →
					</a>
				</li>
				<li>
					Experimental project by Sandro Maglione: testing edge cases for the
					Machine module in Effect — fully type safe for your agent, fully
					explicit for you to read and understand.{" "}
					<a
						href="https://twitter.com/SandroMaglione/status/2079976425885475060"
						target="_blank"
						rel="noopener noreferrer"
					>
						See the thread on X →
					</a>
				</li>
				<li>
					<a
						href="https://github.com/mrtdurdenthe2/muster"
						target="_blank"
						rel="noopener noreferrer"
					>
						muster
					</a>{" "}
					- A keyboard-driven TUI for managing your GitHub issues across
					repositories, built with Effect. By mrtdurdenthe2.
				</li>
			</ul>

			<h2 id="effect-team-content-update">Effect Team Content Update</h2>
			<ul>
				<li>
					Effect v4 RC Prep, CLI Wizard Mode, HTTP API Patterns, Effect Office
					Hours 38 🔥{" "}
					<a
						href="https://youtube.com/watch?v=jgfS7s0XN6E"
						target="_blank"
						rel="noopener noreferrer"
					>
						Watch on YouTube →
					</a>
				</li>
				<li>
					Schema.struct vs Schema.class in V4, Schema.opaque vs Plain Struct
					schemas{" "}
					<a
						href="https://youtube.com/watch?v=6mNNOQlvYzI"
						target="_blank"
						rel="noopener noreferrer"
					>
						Watch on YouTube →
					</a>
				</li>
			</ul>

			<h2 id="effect-job-opportunities">Effect Job Opportunities</h2>
			<p>
				Looking for a role where you can work with Effect? We now have a
				dedicated Effect jobs page with open roles from companies using Effect.
				We'll keep it updated as new opportunities come in.
			</p>
			<p>
				<a
					href="https://www.effect.website/effect-jobs"
					target="_blank"
					rel="noopener noreferrer"
				>
					Explore Effect job opportunities →
				</a>
			</p>
			<p>
				New this week: <strong>Datapizza</strong> is hiring a Software Engineer
				in Milan, Italy.
			</p>
			<p>
				Disclaimer: Please note that these job postings are shared for
				informational purposes, and we encourage applicants to verify details
				directly with the hiring companies.
			</p>

			<h2 id="effect-merch-store">Effect Merch Store</h2>
			<p>
				The{" "}
				<a
					href="https://effect.website/merch"
					target="_blank"
					rel="noopener noreferrer"
				>
					Effect Merch Store
				</a>{" "}
				offers a selection of Effect-branded items designed for the community.
				All orders are processed and fully managed through{" "}
				<a
					href="https://www.printful.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Printful
				</a>
				.
			</p>

			<h2 id="closing-notes">Closing Notes</h2>
			<p>
				That's all for this week. Thank you for being a vital part of our
				community. Your feedback is highly valued as we fine-tune this format.
				Feel free to share your thoughts, and we'll do our best to tailor it to
				the needs of our community.
			</p>
			<p>Effect Community Team</p>
		</>
	);
}

export function BlogPostPage({ slug }: { slug: string }) {
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
				<Navigation activePath="/blog" />
				<main className="flex min-h-[60vh] items-center justify-center pt-16">
					<div className="flex flex-col items-center text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
							<Icon
								name="newspaper"
								className="text-3xl text-zinc-600 dark:text-zinc-400"
							/>
						</div>
						<p className="mt-5 text-lg text-zinc-700 dark:text-zinc-300">
							Post not found.
						</p>
						<a
							href={getAssetPath("/blog")}
							className="mt-5 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<Icon name="chevron-left" />
							Back to blog
						</a>
					</div>
				</main>
				<Footer activePath="/blog" />
			</div>
		);
	}

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

			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/blog" />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative w-full pt-16">
				{/* Hero background — absolute overlay, limited height */}
				<div className="pointer-events-none absolute inset-x-0 top-16 z-0 h-[520px] overflow-hidden">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
								linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
							`,
							backgroundSize: "196.6px 194px",
							backgroundPosition: "calc(50% + 97px) -26px",
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
								"radial-gradient(ellipse 50% 80% at 70% -20%, var(--hero-glow-a) 0%, transparent 50%)",
						}}
					/>
				</div>

				<div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-4">
					<nav
						aria-label="Breadcrumb"
						className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-16 pb-1 font-mono text-sm tracking-wider uppercase md:pt-24"
					>
						<a
							href={getAssetPath("/blog")}
							className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
						>
							Blog
						</a>
						<span
							className="text-zinc-600 dark:text-zinc-400"
							aria-hidden="true"
						>
							//
						</span>
						<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
							{[...post.tags]
								.sort((a, b) => a.localeCompare(b))
								.map((tag) => (
									<a
										key={tag}
										href={`${getAssetPath("/blog")}?category=${encodeURIComponent(tag)}`}
										className="text-zinc-800 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
									>
										{tag}
									</a>
								))}
						</div>
					</nav>

					{/* Unified 12-col grid: title (col 1-8) + TOC (col 10-12 spanning all rows) + full-width divider + article body */}
					<div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6">
						{/* Title block — col 1-8, row 1 */}
						<div className="md:col-span-8 md:row-start-1 md:pt-2 md:pb-10">
							<h1 className="text-3xl leading-tight font-bold tracking-tight text-zinc-900 dark:text-white">
								{post.title}
							</h1>
							<p className="mt-4 text-base leading-relaxed text-zinc-700 md:text-lg dark:text-zinc-300">
								{post.excerpt}
							</p>
							{/* Mobile-only byline (sidebar version shows on md+) */}
							<div className="mt-8 flex flex-wrap items-center gap-4 md:hidden">
								{post.authors.map((author) => (
									<Link
										key={author.name}
										href={author.url}
										variant="inline"
										className="group/byline flex items-center gap-3 no-underline"
									>
										<img
											src={getAssetPath(author.avatar)}
											alt={author.name}
											className="h-10 w-10 rounded-md object-cover"
										/>
										<span className="flex min-w-0 flex-col">
											<span className="truncate text-base font-medium text-zinc-800 group-hover/byline:underline dark:text-zinc-200">
												{author.name}
											</span>
											<span className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
												{author.title}
											</span>
										</span>
									</Link>
								))}
							</div>
						</div>

						{/* Sidebar — Author meta + TOC, aligned with article body (row 3) */}
						<aside className="hidden md:col-start-10 md:col-span-3 md:row-start-3 md:block md:pt-16 lg:pt-20">
							{/* Byline */}
							<div className="mb-8">
								{post.authors.map((author) => (
									<Link
										key={author.name}
										href={author.url}
										variant="inline"
										className="group/byline flex items-center gap-3 no-underline"
									>
										<img
											src={getAssetPath(author.avatar)}
											alt={author.name}
											className="h-12 w-12 rounded-md object-cover"
										/>
										<span className="flex min-w-0 flex-col">
											<span className="truncate text-base font-medium text-zinc-800 group-hover/byline:underline dark:text-zinc-200">
												{author.name}
											</span>
											<span className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">
												{author.title}
											</span>
										</span>
									</Link>
								))}
							</div>
							<TableOfContents postTitle={post.title} postDate={post.date} />
						</aside>

						{/* Article body — col 1-8, row 3 */}
						<article className="min-w-0 pb-20 md:col-span-8 md:row-start-3">
							{/* Mobile Table of Contents */}
							<div className="mt-10 mb-10 block md:hidden">
								<TableOfContents showBackLink={false} className="static" />
							</div>

							{/* Article content */}
							<div className={`${BLOG_PROSE_CLASS} mt-16 max-w-none md:mt-20`}>
								{slug === "this-week-in-effect-128" ? (
									<Twie128Content />
								) : (
									<EffectV4BetaContent />
								)}
							</div>

							{/* Mobile-only Share + Last updated */}
							<div className="mt-12 flex flex-col gap-6 border-t border-zinc-200 pt-8 md:hidden dark:border-zinc-800">
								<ShareButtons title={post.title} />
								<p className="flex flex-col gap-0.5">
									<span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
										Last updated
									</span>
									<time className="font-mono text-xs text-zinc-700 tabular-nums dark:text-zinc-300">
										{post.date}
									</time>
								</p>
							</div>

							{/* Post navigation */}
							<PostNavigation currentSlug={slug} />
						</article>
					</div>

					{/* Community CTA — aligned with body/sidebar columns */}
					<div className="mt-16 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
					<div className="grid grid-cols-1 items-center gap-6 py-12 md:grid-cols-12 md:gap-x-6 md:gap-y-8 md:py-20">
						{/* Content — cols 1-8 to match body */}
						<div className="md:col-span-8">
							<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
								// Effect Community
							</p>
							<h2 className="text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl dark:text-white">
								Join the conversation on Discord
							</h2>
							<p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
								Meet engineers running Effect in production.
							</p>
						</div>

						{/* CTA — col-start-9 col-span-4 */}
						<div className="md:col-start-9 md:col-span-4">
							<div className="relative mx-auto flex max-w-xs flex-col items-center gap-3 px-6 py-6 md:max-w-none">
								{/* Corner brackets */}
								<span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-zinc-300 dark:border-zinc-700" />
								<span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-zinc-300 dark:border-zinc-700" />
								<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-300 dark:border-zinc-700" />
								<span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-zinc-300 dark:border-zinc-700" />

								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
								>
									Join the Discord
									<Icon
										name="arrow-right"
										className="text-base"
										aria-hidden="true"
									/>
								</a>
								<a
									href="https://discord.gg/effect-ts"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
								>
									discord.gg/effect-ts
									<Icon name="arrow-up-right" aria-hidden="true" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer activePath="/blog" />
		</div>
	);
}
