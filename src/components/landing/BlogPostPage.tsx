import { cn } from "@/lib/utils";
import { BLOG_POSTS, type BlogPost, getPostUrl, getTagColor } from "../../data/blog";
import { getAssetPath } from "../../utils/assetPath";
import { Link } from "@/components/ui";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

function TableOfContents({
	className,
	showBackLink = true,
}: { className?: string; showBackLink?: boolean }) {
	const tocItems = [
		{
			id: "faster-runtime",
			label: "Faster runtime. Leaner bundles.",
			depth: 0,
		},
		{ id: "bundle-size", label: "Bundle size", depth: 1 },
		{ id: "one-version", label: "One version. One ecosystem.", depth: 0 },
		{ id: "consolidated-core", label: "A consolidated core", depth: 1 },
		{ id: "unstable-modules", label: "Unstable modules", depth: 0 },
		{ id: "beta-phase", label: "The beta phase", depth: 0 },
		{ id: "migrating", label: "Migrating from Effect v3", depth: 0 },
		{ id: "try-it-now", label: "Try it now", depth: 0 },
	];

	return (
		<nav className={cn("sticky top-[5.5rem]", className)}>
			<p className="mb-4 text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
				On this page
			</p>
			<ul className="space-y-0.5 border-l border-zinc-200 dark:border-zinc-800">
				{tocItems.map((item) => (
					<li key={item.id}>
						<a
							href={`#${item.id}`}
							className={`block border-l-2 border-transparent text-sm transition-all duration-150 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white ${
								item.depth === 0
									? "py-1.5 pl-4 text-zinc-700 dark:text-zinc-300"
									: "py-1.5 pl-7 text-zinc-600 dark:text-zinc-400"
							}`}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>

			{/* Back to all posts */}
			{showBackLink && (
				<div className="mt-8 border-t border-zinc-200 pt-5 dark:border-zinc-800">
					<a
						href={getAssetPath("/blog")}
						className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
					>
						<i className="ri-arrow-left-s-line text-base" />
						All posts
					</a>
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
					className="group flex flex-col rounded-lg border border-zinc-200 bg-zinc-50/50 px-6 py-5 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60"
				>
					<span className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
						<i className="ri-arrow-left-s-line text-base transition-transform duration-200 group-hover:-translate-x-0.5" />
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
					className="group flex flex-col items-end rounded-lg border border-zinc-200 bg-zinc-50/50 px-6 py-5 text-right transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60"
				>
					<span className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
						Next
						<i className="ri-arrow-right-s-line text-base transition-transform duration-200 group-hover:translate-x-0.5" />
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

export function BlogPostPage({ slug }: { slug: string }) {
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
				<Navigation activePath="/blog" />
				<main className="flex min-h-[60vh] items-center justify-center pt-16">
					<div className="flex flex-col items-center text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
							<i className="ri-article-line text-3xl text-zinc-400" />
						</div>
						<p className="mt-5 text-lg text-zinc-700 dark:text-zinc-300">
							Post not found.
						</p>
						<a
							href={getAssetPath("/blog")}
							className="mt-5 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<i className="ri-arrow-left-s-line" />
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
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_240px]">
						{/* Article */}
						<article className="min-w-0 pb-20 md:border-r md:border-zinc-200/60 md:pr-12 dark:md:border-zinc-800/60">
							{/* Back link + breadcrumb */}
							<div className="pt-10 pb-10 md:pt-14 md:pb-12">
								<nav className="mb-8 flex items-center gap-2 text-sm">
									<Link
										href={getAssetPath("/blog")}
										variant="subtle"
										className="group inline-flex items-center gap-1"
									>
										<i className="ri-arrow-left-s-line text-base" />
										Go to all posts
									</Link>
								</nav>

								{/* Tags */}
								<div className="mb-5 flex flex-wrap gap-2">
									{[...post.tags].sort((a, b) => a.localeCompare(b)).map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
										>
											<span
												className="h-1.5 w-1.5 rounded-full"
												style={{ backgroundColor: getTagColor(tag) }}
											/>
											{tag}
										</span>
									))}
								</div>

								{/* Title */}
								<h1 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-[2.75rem] dark:text-white">
									{post.title}
								</h1>

								{/* Excerpt */}
								<p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 md:text-lg dark:text-zinc-300">
									{post.excerpt}
								</p>

								{/* Meta */}
								<div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
									{/* Authors */}
									{post.authors.map((author) => (
										<Link
											key={author.name}
											href={author.url}
											variant="inline"
											className="flex items-center gap-2 font-medium no-underline hover:underline"
										>
											<img
												src={getAssetPath(author.avatar)}
												alt={author.name}
												className="h-6 w-6 rounded-full object-cover"
											/>
											<span>{author.name}</span>
										</Link>
									))}
									<span className="text-zinc-300 dark:text-zinc-700">
										&middot;
									</span>
									<time>{post.date}</time>
								</div>
							</div>

							{/* Divider */}
							<div className="h-px bg-zinc-200 dark:bg-zinc-800" />

							{/* Mobile Table of Contents */}
							<div className="mt-10 mb-10 block md:hidden">
								<TableOfContents showBackLink={false} className="static" />
							</div>

							{/* Article content */}
							<div className="prose prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-p:text-zinc-700 prose-p:text-base prose-p:leading-relaxed prose-a:text-zinc-900 prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 hover:prose-a:decoration-zinc-600 prose-strong:text-zinc-900 prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:text-zinc-800 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50 prose-pre:text-sm prose-li:text-zinc-700 prose-hr:border-zinc-200 dark:prose-invert dark:prose-p:text-zinc-300 dark:prose-a:text-white dark:prose-a:decoration-zinc-400 dark:hover:prose-a:decoration-zinc-300 dark:prose-strong:text-white dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200 dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-900/80 dark:prose-li:text-zinc-300 dark:prose-hr:border-zinc-800 mt-10 max-w-none">
								<h2 id="faster-runtime">Faster runtime. Leaner bundles.</h2>
								<p>
									The core fiber runtime has been rewritten from scratch to have
									lower memory overhead, faster execution, and simpler
									internals. Every Effect application benefits from these
									optimizations immediately.
								</p>

								<h3 id="bundle-size">Bundle size</h3>
								<p>
									A minimal program using Effect, Stream, and Schema drops from
									roughly <strong>70 kB</strong> in v3 to about{" "}
									<strong>20 kB</strong> in v4.
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
										<video
											autoPlay
											controls
											loop
											muted
											playsInline
											width="100%"
										>
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
									All Effect ecosystem packages now share a single version
									number and are released together. No more debugging version
									mismatches.
								</p>

								<h3 id="consolidated-core">A consolidated core</h3>
								<p>
									Functionality from <code>@effect/platform</code>,{" "}
									<code>@effect/rpc</code>, and <code>@effect/cluster</code> now
									lives directly inside <code>effect</code>.
								</p>

								<div className="not-prose my-8">
									<div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
										<video
											autoPlay
											controls
											loop
											muted
											playsInline
											width="100%"
										>
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
									New capabilities ship via <code>effect/unstable/*</code>{" "}
									import paths without committing to semver stability for
									evolving APIs.
								</p>

								<h2 id="beta-phase">The beta phase</h2>
								<p>
									This is a beta. APIs will evolve as we incorporate real-world
									feedback. If you're running Effect in production, v3 remains
									recommended for now.
								</p>

								<h2 id="migrating">Migrating from Effect v3</h2>
								<p>
									The core programming model is the same. Changes are in package
									organization, module versioning, and specific API details. See
									the{" "}
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
							</div>

							{/* Post navigation */}
							<PostNavigation currentSlug={slug} />
						</article>

						{/* Right sidebar - TOC */}
						<aside className="hidden py-14 pl-10 md:block">
							<TableOfContents />
						</aside>
					</div>
				</div>
			</main>

			<Footer activePath="/blog" />
		</div>
	);
}
