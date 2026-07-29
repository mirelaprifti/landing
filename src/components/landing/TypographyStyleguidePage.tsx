import { Button, Link } from "@/components/ui";
import { getAssetPath } from "../../utils/assetPath";
import { BLOG_PROSE_CLASS } from "./BlogPostPage";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

/**
 * Internal styleguide for the entire website: canonical text elements and
 * spacing, plus the blog prose styles (BLOG_PROSE_CLASS) rendered with the
 * exact class lists real pages use. Visit with the theme toggle to check
 * both modes. When a style needs to change, change it here first, then
 * roll it out to the pages that drift from it.
 */

/**
 * Canonical text styles. Copy these class strings verbatim.
 * All colors are themeable pairs — on dark-only pages the dark: variant
 * applies automatically, and the page stays ready for a light mode.
 */
const text = {
	/** Hero page title (h1) — landing/marketing heroes. */
	pageTitle:
		"leading-tighter text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white",
	/** Subpage title (h1) — blog posts, policies, listings. */
	pageTitleSub:
		"leading-tighter text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white",
	/** Section eyebrow — the mono label above every section title. */
	eyebrow:
		"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400",
	/** Section title (h2). */
	sectionTitle:
		"leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white",
	/** Section lede — the paragraph directly under a page/section title. */
	lede: "mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400",
	/** Card / subsection title (h3). */
	cardTitle: "text-lg font-semibold text-zinc-900 dark:text-white",
	/** Small heading (h4) — fine-grained structure inside cards. */
	smallHeading: "text-base font-semibold text-zinc-900 dark:text-white",
	/** Standard body copy. */
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
	/** Card body copy — sits under a card title with mt-3. */
	cardBody: "mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
	/** Micro label / caption — timestamps, figure captions, meta rows. */
	micro:
		"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
};

/** Labels for this page's own chrome — one step up from text.micro for readability. */
const rowLabel =
	"font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400";

const TYPE_SCALE = [
	{ name: "text-xs", rem: "0.7rem", px: "11.2px", leading: "1.5" },
	{ name: "text-sm", rem: "0.875rem", px: "14px", leading: "1.5" },
	{ name: "text-base", rem: "1rem", px: "16px", leading: "1.5" },
	{ name: "text-lg", rem: "1.25rem", px: "20px", leading: "1.375" },
	{ name: "text-xl", rem: "1.563rem", px: "25px", leading: "1.375" },
	{ name: "text-2xl", rem: "1.953rem", px: "31.25px", leading: "1.375" },
	{ name: "text-3xl", rem: "2.441rem", px: "39.06px", leading: "1.25" },
	{ name: "text-4xl", rem: "3.052rem", px: "48.83px", leading: "1.25" },
	{ name: "text-5xl", rem: "3.815rem", px: "61.04px", leading: "1.15" },
	{ name: "text-6xl", rem: "4.768rem", px: "76.29px", leading: "1.15" },
];

const SPACING_STEPS = [
	{ label: "mb-3", px: 12, use: "eyebrow → section title" },
	{ label: "mt-3", px: 12, use: "card title → card body" },
	{ label: "mt-4", px: 16, use: "title → lede / body" },
	{ label: "p-6 / gap-6", px: 24, use: "card padding, card grids" },
	{ label: "mb-12", px: 48, use: "section header → content" },
	{ label: "py-24", px: 96, use: "section rhythm (mobile)" },
	{ label: "md:pt-40", px: 160, use: "section top (desktop)" },
];

function ClassBlock({ classes }: { classes: string }) {
	return (
		<pre className="mt-5 rounded-md bg-zinc-100 px-4 py-3 whitespace-pre-wrap dark:bg-zinc-900">
			<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
				{classes}
			</code>
		</pre>
	);
}

function SpecRow({
	title,
	note,
	classes,
	children,
}: {
	title: string;
	note?: string;
	classes?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0 dark:border-zinc-800">
			<p className={rowLabel}>{title}</p>
			{note && (
				<p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
					{note}
				</p>
			)}
			<div className="mt-5">{children}</div>
			{classes && <ClassBlock classes={classes} />}
		</div>
	);
}

function GuideSection({
	id,
	eyebrow,
	title,
	lede,
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	lede?: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-24 pt-20 md:pt-28">
			<p className={text.eyebrow}>// {eyebrow}</p>
			<h2 className={text.sectionTitle}>{title}</h2>
			{lede && <p className={text.lede}>{lede}</p>}
			<div className="mt-12">{children}</div>
		</section>
	);
}

const NAV_ITEMS = [
	{ href: "#foundations", label: "Foundations" },
	{ href: "#text-elements", label: "Text elements" },
	{ href: "#links-buttons", label: "Links & buttons" },
	{ href: "#spacing", label: "Spacing" },
	{ href: "#rules", label: "Rules" },
	{ href: "#blog-prose", label: "Blog" },
];

export function TypographyStyleguidePage() {
	return (
		<div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
			<Navigation />

			<main className="relative w-full pt-16">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<header className="pt-16 pb-12 md:pt-24 md:pb-16">
						<p className={text.eyebrow}>// Styleguide</p>
						<h1 className={text.pageTitleSub}>Website styleguide</h1>
						<p className={text.lede}>
							Canonical text elements and spacing for every surface of the site,
							rendered with the exact classes pages should use. Copy the class
							strings verbatim; when a style needs to change, change it here
							first.
						</p>
						<nav
							aria-label="Styleguide sections"
							className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
						>
							{NAV_ITEMS.map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
								>
									{item.label}
								</a>
							))}
						</nav>
					</header>
				</div>

				{/* Full-viewport divider between hero and guide, as on blog posts */}
				<div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="max-w-3xl pb-24">
						<GuideSection
							id="foundations"
							eyebrow="01"
							title="Foundations"
							lede="Two typefaces and one type scale. Everything on the site is set in Inter, with JetBrains Mono for code, eyebrows, and micro labels."
						>
							<SpecRow
								title="Font families"
								note="Inter is the body default — never write font-inter, and never inline another mono font. font-mono resolves to JetBrains Mono globally."
							>
								<div className="space-y-4">
									<div>
										<p className="text-2xl text-zinc-900 dark:text-white">
											Inter — production-grade software in TypeScript
										</p>
										<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
											font-sans · body copy, headings, UI
										</p>
									</div>
									<div>
										<p className="font-mono text-xl text-zinc-900 dark:text-white">
											JetBrains Mono — Effect.gen(function* () {"{}"})
										</p>
										<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
											font-mono · code, eyebrows, labels, meta
										</p>
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Type scale"
								note="A 1.25-ratio scale defined in globals.css. Use these steps only — no arbitrary text-[15px] / text-[10px] sizes."
							>
								<div className="space-y-3">
									{TYPE_SCALE.map((step) => (
										<div
											key={step.name}
											className="flex items-baseline gap-6 border-b border-zinc-100 pb-3 dark:border-zinc-900"
										>
											<span className="w-44 shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-400">
												{step.name} · {step.px}
												<br />
												leading {step.leading}
											</span>
											<span
												className={`${step.name} min-w-0 truncate font-semibold text-zinc-900 dark:text-white`}
											>
												Ag
											</span>
										</div>
									))}
								</div>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="text-elements"
							eyebrow="02"
							title="Text elements"
							lede="One spec per role. Headings are bold only at the h1 level; everything below is semibold. All heading levels use leading-tighter and themeable color pairs."
						>
							<SpecRow
								title="Page title — hero (h1)"
								note="Landing and marketing heroes. The only place font-bold is used."
								classes={text.pageTitle}
							>
								<h1 className={text.pageTitle}>
									Build production-grade software
								</h1>
							</SpecRow>

							<SpecRow
								title="Page title — subpage (h1)"
								note="Blog posts, policies, listings — one step down from the hero."
								classes={text.pageTitleSub}
							>
								<p className={text.pageTitleSub}>Effect 4.0 enters beta</p>
							</SpecRow>

							<SpecRow
								title="Section eyebrow"
								note="The mono label above every section title. Always font-medium, tracking-wider, mb-3 — not font-semibold, not tracking-wide."
								classes={text.eyebrow}
							>
								<p className={`${text.eyebrow} mb-0!`}>// Why Effect</p>
							</SpecRow>

							<SpecRow
								title="Section title (h2)"
								note="Semibold, never bold. Steps text-2xl → md:text-3xl — no bigger jumps."
								classes={text.sectionTitle}
							>
								<p className={text.sectionTitle}>
									Everything you need to ship reliably
								</p>
							</SpecRow>

							<SpecRow
								title="Section lede"
								note="The paragraph directly under a page or section title. Capped at max-w-2xl."
								classes={text.lede}
							>
								<p className={`${text.lede} mt-0!`}>
									Effect gives you typed errors, structured concurrency, and
									dependency injection out of the box, so failure cases show up
									in the signature instead of in production.
								</p>
							</SpecRow>

							<SpecRow title="Card title (h3)" classes={text.cardTitle}>
								<p className={text.cardTitle}>Typed errors</p>
							</SpecRow>

							<SpecRow title="Small heading (h4)" classes={text.smallHeading}>
								<p className={text.smallHeading}>Retry policies</p>
							</SpecRow>

							<SpecRow
								title="Body copy"
								note="Standard paragraph text outside the blog. Stack paragraphs with mt-4."
								classes={text.body}
							>
								<p className={text.body}>
									Structured concurrency means fibers are supervised, cancelled,
									and cleaned up automatically when their parent scope closes,
									even when things fail halfway through.
								</p>
							</SpecRow>

							<SpecRow
								title="Card body"
								note="Copy inside cards, one size down, mt-3 below the card title."
								classes={text.cardBody}
							>
								<p className={`${text.cardBody} mt-0!`}>
									Every failure case is tracked in the type signature, so the
									compiler tells you what can go wrong before your users do.
								</p>
							</SpecRow>

							<SpecRow
								title="Micro label / caption"
								note="Timestamps, figure captions, meta rows, terminal chrome."
								classes={text.micro}
							>
								<p className={text.micro}>Last updated · Jul 29, 2026</p>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="links-buttons"
							eyebrow="03"
							title="Links & buttons"
							lede="Always use the ui/Link and ui/Button components — never hand-roll these. Buttons are rounded-md, font-medium; there is no rounded-lg button."
						>
							<SpecRow
								title="Links — ui/Link"
								note="Variants: inline (body copy), nav (header), footer, subtle (breadcrumbs, attributions), icon."
							>
								<div className="flex flex-wrap items-center gap-x-8 gap-y-4">
									<span className={text.body}>
										Read the{" "}
										<Link href={getAssetPath("/docs/introduction")}>
											getting started guide
										</Link>{" "}
										— inline
									</span>
									<Link href={getAssetPath("/blog")} variant="nav">
										Nav link
									</Link>
									<Link href={getAssetPath("/blog")} variant="subtle">
										Subtle link
									</Link>
								</div>
							</SpecRow>

							<SpecRow
								title="Buttons — ui/Button"
								note="Variants: primary (main CTA), secondary (default), ghost, discord. Sizes: sm, md (default), lg, xl."
							>
								<div className="flex flex-wrap items-center gap-4">
									<Button
										href={getAssetPath("/docs/introduction")}
										variant="primary"
										size="lg"
									>
										Get started
									</Button>
									<Button
										href={getAssetPath("/blog")}
										variant="secondary"
										size="lg"
									>
										Read the blog
									</Button>
									<Button variant="ghost" size="lg">
										Ghost
									</Button>
								</div>
								<div className="mt-5 flex flex-wrap items-center gap-4">
									<Button variant="primary" size="sm">
										Small
									</Button>
									<Button variant="primary" size="md">
										Medium
									</Button>
									<Button variant="primary" size="lg">
										Large
									</Button>
								</div>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="spacing"
							eyebrow="04"
							title="Spacing"
							lede="One container, one section rhythm, one text stack. Spacing is where the site drifts most — these are the only values to use."
						>
							<SpecRow
								title="Container"
								note="1180px, centered, 16px gutters. Use this literal string — not max-w-295, not a custom width."
								classes="mx-auto w-full max-w-[73.75rem] px-4"
							>
								<div className="rounded-md border border-dashed border-zinc-300 px-4 py-3 dark:border-zinc-700">
									<div className="flex h-10 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										max-w-[73.75rem] · 1180px
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Section rhythm"
								note="Every landing section: 96px vertical on mobile, 160px top / 96px bottom on desktop. The larger desktop top padding is what separates sections visually."
								classes="py-24 md:pt-40 md:pb-24"
							>
								<div className="rounded-md border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
									<div className="flex h-8 items-center justify-center bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										pt-40 (desktop) / pt-24 (mobile)
									</div>
									<div className="flex h-14 items-center justify-center font-mono text-sm text-zinc-500 dark:text-zinc-400">
										section content
									</div>
									<div className="flex h-6 items-center justify-center bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										pb-24
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Section header stack"
								note="Eyebrow, title, lede, content — with fixed gaps. This exact stack opens every section; GuideSection on this page is a live example."
								classes="eyebrow mb-3 → h2 → lede mt-4 → content mt-12"
							>
								<div className="rounded-md border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
									<p className={text.eyebrow}>// Eyebrow</p>
									<p className={text.sectionTitle}>Section title</p>
									<p className={text.lede}>
										Section lede sits 16px below the title.
									</p>
									<div className="mt-12 flex h-10 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										content · mt-12
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Cards & grids"
								note="Cards use p-6 padding and rounded-md with a zinc border; card grids use gap-6. Airy feature grids (no card chrome) may use gap-12 md:gap-16."
								classes="rounded-md border border-zinc-200 p-6 dark:border-zinc-800 · grid gap-6"
							>
								<div className="grid gap-6 md:grid-cols-2">
									{["Typed errors", "Structured concurrency"].map((title) => (
										<div
											key={title}
											className="rounded-md border border-zinc-200 p-6 dark:border-zinc-800"
										>
											<p className={text.cardTitle}>{title}</p>
											<p className={text.cardBody}>
												Card body copy sits 12px below the title, one size down
												from standard body copy.
											</p>
										</div>
									))}
								</div>
							</SpecRow>

							<SpecRow
								title="Spacing steps"
								note="The full set of vertical spacing values in use. If a gap is not on this list, round to the nearest step."
							>
								<div className="space-y-3">
									{SPACING_STEPS.map((step) => (
										<div key={step.label} className="flex items-center gap-4">
											<span className="w-32 shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-400">
												{step.label}
											</span>
											<div
												className="h-4 shrink-0 rounded-xs bg-zinc-300 dark:bg-zinc-700"
												style={{ width: `${step.px}px` }}
											/>
											<span className="text-sm text-zinc-600 dark:text-zinc-400">
												{step.px}px · {step.use}
											</span>
										</div>
									))}
								</div>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="rules"
							eyebrow="05"
							title="Rules"
							lede="The short version — the drift these rules exist to prevent is real and currently on the site."
						>
							<div className="grid gap-6 md:grid-cols-2">
								<div className="rounded-md border border-zinc-200 p-6 dark:border-zinc-800">
									<p className={rowLabel}>Do</p>
									<ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
										<li>
											Use the type scale and named leading values only —
											headings always get{" "}
											<code className="font-mono text-sm">leading-tighter</code>
											.
										</li>
										<li>
											h1 is <code className="font-mono text-sm">font-bold</code>
											; h2, h3, h4 are{" "}
											<code className="font-mono text-sm">font-semibold</code>.
										</li>
										<li>
											Write themeable color pairs (
											<code className="font-mono text-sm">
												text-zinc-900 dark:text-white
											</code>
											) even on dark-only pages.
										</li>
										<li>
											Use <code className="font-mono text-sm">ui/Button</code>{" "}
											and <code className="font-mono text-sm">ui/Link</code> for
											every CTA and link.
										</li>
										<li>
											Copy the container and section rhythm strings verbatim.
										</li>
									</ul>
								</div>
								<div className="rounded-md border border-zinc-200 p-6 dark:border-zinc-800">
									<p className={rowLabel}>Don't</p>
									<ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
										<li>
											No arbitrary sizes or leadings —{" "}
											<code className="font-mono text-sm">text-[15px]</code>,{" "}
											<code className="font-mono text-sm">text-[10px]</code>,{" "}
											<code className="font-mono text-sm">leading-[1.35]</code>.
										</li>
										<li>
											No <code className="font-mono text-sm">font-bold</code> on
											h2s, no{" "}
											<code className="font-mono text-sm">font-semibold</code>{" "}
											or{" "}
											<code className="font-mono text-sm">tracking-wide</code>{" "}
											eyebrows.
										</li>
										<li>
											No hand-rolled buttons —{" "}
											<code className="font-mono text-sm">rounded-lg</code> CTAs
											are off-spec.
										</li>
										<li>
											No <code className="font-mono text-sm">font-inter</code>{" "}
											class and no inline{" "}
											<code className="font-mono text-sm">Roboto Mono</code> —
											mono is always{" "}
											<code className="font-mono text-sm">font-mono</code>.
										</li>
										<li>
											No <code className="font-mono text-sm">max-w-295</code> or
											one-off container widths.
										</li>
									</ul>
								</div>
							</div>
						</GuideSection>

						<GuideSection
							id="blog-prose"
							eyebrow="06"
							title="Blog"
							lede="Every text element the blog body supports, rendered with BLOG_PROSE_CLASS — the exact styles real posts use. Fixes belong in that class so posts pick them up too."
						>
							<article className={BLOG_PROSE_CLASS}>
								<p>
									This paragraph shows the reading defaults: 17px body text with
									a 1.6 line-height. It includes{" "}
									<a href={getAssetPath("/docs/introduction")}>
										an inline link
									</a>
									, some <strong>bold emphasis</strong>, a touch of{" "}
									<em>italic text</em>, and inline code like{" "}
									<code>Effect.gen</code> sitting inside the sentence.
								</p>

								<h2>Second-level heading</h2>
								<p>
									An h2 opens a major section: 24px, semibold, tight leading and
									tracking, with clear air above and a snug gap below so it
									attaches to this paragraph rather than floating between
									sections.
								</p>

								<h3>Third-level heading</h3>
								<p>
									An h3 subdivides a section. Below is an unordered list with a
									deliberately long item to show wrapped lines and marker color:
								</p>
								<ul>
									<li>Typed errors surface failure cases in the signature</li>
									<li>
										Structured concurrency means fibers are supervised,
										cancelled, and cleaned up automatically when their parent
										scope closes, even when things fail halfway through
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
											The Effect blog, a longer link label to show how
											underlined links look when they wrap across lines
										</a>
									</li>
								</ul>

								<h4>Fourth-level heading</h4>
								<p>
									An h4 is the smallest heading: body-sized but semibold, for
									fine-grained structure. Here is an ordered list:
								</p>
								<ol>
									<li>Model the workflow as data</li>
									<li>Compose the pieces with pipes or generators</li>
									<li>Run it at the edge of your program</li>
								</ol>

								<blockquote>
									<p>
										Blockquotes render as large semibold statements in the
										emphasis color, wrapped in typographic quotes, in the style
										of Linear's blog.
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
										Figures render full-bleed with square corners; captions sit
										in small muted text.
									</figcaption>
								</figure>

								<table>
									<thead>
										<tr>
											<th scope="col">Function</th>
											<th scope="col">Input</th>
											<th scope="col">Output</th>
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
						</GuideSection>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
