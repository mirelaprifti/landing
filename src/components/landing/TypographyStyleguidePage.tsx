import { getAssetPath } from "../../utils/assetPath";
import { BLOG_PROSE_CLASS } from "./BlogPostPage";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

/**
 * Internal preview of every text element the blog prose styles cover,
 * rendered with the exact class list used by real posts (BLOG_PROSE_CLASS).
 * Visit with the theme toggle to check both modes.
 */
export function TypographyStyleguidePage() {
	return (
		<div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
			<Navigation activePath="/blog" />

			<main className="relative w-full pt-16">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<header className="pt-16 md:pt-24">
						<p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
							// Styleguide
						</p>
						<h1 className="leading-tighter text-3xl font-bold md:text-4xl">
							Blog typography
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
							Every text element the blog body supports, rendered with the
							exact styles real posts use.
						</p>
					</header>

					<article className={`${BLOG_PROSE_CLASS} mt-4 max-w-3xl pb-24`}>
						<p>
							This paragraph shows the reading defaults: 18px body text with a
							1.75 line-height. It includes{" "}
							<a href={getAssetPath("/docs/introduction")}>an inline link</a>,
							some <strong>bold emphasis</strong>, a touch of{" "}
							<em>italic text</em>, and inline code like{" "}
							<code>Effect.gen</code> sitting inside the sentence.
						</p>

						<h2>Second-level heading</h2>
						<p>
							An h2 opens a major section: 31px, semibold, tight leading, with
							clear air above and a snug gap below so it attaches to this
							paragraph rather than floating between sections.
						</p>

						<h3>Third-level heading</h3>
						<p>
							An h3 subdivides a section. Below is an unordered list with a
							deliberately long item to show wrapped lines and marker color:
						</p>
						<ul>
							<li>Typed errors surface failure cases in the signature</li>
							<li>
								Structured concurrency means fibers are supervised, cancelled,
								and cleaned up automatically when their parent scope closes,
								even when things fail halfway through
							</li>
							<li>Dependency injection without wiring frameworks</li>
						</ul>

						<p>A list where every item is a link:</p>
						<ul>
							<li>
								<a href={getAssetPath("/docs/introduction")}>
									Getting started with Effect
								</a>
							</li>
							<li>
								<a href={getAssetPath("/docs/two-types-of-errors")}>
									Two types of errors
								</a>
							</li>
							<li>
								<a href={getAssetPath("/blog")}>
									The Effect blog, a longer link label to show how underlined
									links look when they wrap across lines
								</a>
							</li>
						</ul>

						<h4>Fourth-level heading</h4>
						<p>
							An h4 is the smallest heading: 20px, for fine-grained structure.
							Here is an ordered list:
						</p>
						<ol>
							<li>Model the workflow as data</li>
							<li>Compose the pieces with pipes or generators</li>
							<li>Run it at the edge of your program</li>
						</ol>

						<blockquote>
							<p>
								Blockquotes render as a plain pull with a left border, not
								italic: one shade dimmer than body text, for quoting people or
								docs without shouting.
							</p>
						</blockquote>

						<pre>
							<code>{`import { Effect } from "effect"

const program = Effect.gen(function* () {
  const result = yield* Effect.succeed(42)
  yield* Effect.log(\`The answer is \${result}\`)
})

Effect.runPromise(program)`}</code>
						</pre>

						<figure>
							<img
								src={getAssetPath("/assets/events/paris-april-4-web.jpg")}
								alt="An Effect community meetup in Paris"
							/>
							<figcaption>
								Figures render borderless with rounded corners; captions sit
								in small muted text.
							</figcaption>
						</figure>

						<table>
							<thead>
								<tr>
									<th>Function</th>
									<th>Input</th>
									<th>Output</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<code>Effect.runSync</code>
									</td>
									<td>Synchronous effect</td>
									<td>Value or thrown error</td>
								</tr>
								<tr>
									<td>
										<code>Effect.runPromise</code>
									</td>
									<td>Any effect</td>
									<td>Promise of the value</td>
								</tr>
								<tr>
									<td>
										<code>Effect.runFork</code>
									</td>
									<td>Any effect</td>
									<td>Running fiber</td>
								</tr>
							</tbody>
						</table>

						<hr />

						<p>
							After a horizontal rule, the closing paragraph. If any element
							above looks off in either theme, the fix belongs in{" "}
							<code>BLOG_PROSE_CLASS</code> so real posts pick it up too.
						</p>
					</article>
				</div>
			</main>

			<Footer activePath="/blog" />
		</div>
	);
}
