import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { BLOG_ARTICLE_CLASS } from "./BlogPostPage";
import { DOCS_ARTICLE_CLASS } from "./DocsLayout";

/**
 * Internal styleguide for the entire website: canonical text elements and
 * spacing, plus the blog article styles (BLOG_ARTICLE_CLASS) rendered with the
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
		"leading-[1.1] text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white",
	/** Subpage title (h1) — blog posts, policies, listings. */
	pageTitleSub:
		"leading-[1.1] text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white",
	/** Section eyebrow — the mono label above every section title. */
	eyebrow:
		"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400",
	/** Section title (h2). */
	sectionTitle:
		"leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white",
	/** Subtitle — the paragraph directly under a page/section title. */
	subtitle: "mt-4 text-lg text-zinc-600 dark:text-zinc-400",
	/** Card / subsection title (h3). */
	cardTitle: "text-lg font-semibold text-zinc-900 dark:text-white",
	/** Small heading (h4) — fine-grained structure inside cards. */
	smallHeading: "text-base font-semibold text-zinc-900 dark:text-white",
	/** Standard body copy. */
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
	/** Card body copy — sits under a card title with mt-1. */
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
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
	{ label: "mt-1", px: 4, use: "card title → card body" },
	{ label: "mt-4", px: 16, use: "title → subtitle / body" },
	{ label: "px-4", px: 16, use: "container side gutter" },
	{ label: "p-6 / gap-6", px: 24, use: "card padding, card grids" },
	{ label: "mt-12", px: 48, use: "section header → content" },
	{ label: "py-24", px: 96, use: "section rhythm (mobile)" },
	{ label: "md:pt-40", px: 160, use: "section top (desktop)" },
];

const ELEMENT_SPECS: {
	label: string;
	cls: string;
	sample: string;
}[] = [
	{
		label: "h1 · hero",
		cls: text.pageTitle,
		sample: "Ship reliable software",
	},
	{
		label: "h1 · subpage",
		cls: text.pageTitleSub,
		sample: "Effect 4.0 enters beta",
	},
	{
		label: "eyebrow",
		cls: text.eyebrow,
		sample: "// Why Effect",
	},
	{
		label: "h2 · section",
		cls: text.sectionTitle,
		sample: "Everything you need",
	},
	{
		label: "subtitle",
		cls: text.subtitle,
		sample: "Typed errors, concurrency, and DI out of the box.",
	},
	{
		label: "h3 · card",
		cls: text.cardTitle,
		sample: "Typed errors",
	},
	{
		label: "h4 · small",
		cls: text.smallHeading,
		sample: "Retry policies",
	},
	{
		label: "body",
		cls: text.body,
		sample:
			"Fibers are supervised and cleaned up when their parent scope closes.",
	},
	{
		label: "card body",
		cls: text.cardBody,
		sample: "Failure cases show up in the signature.",
	},
	{
		label: "micro",
		cls: text.micro,
		sample: "Last updated · Jul 29, 2026",
	},
];

/**
 * A single class string, or one labeled entry per role for multi-part specs.
 * `value` must stay a pure, paste-ready class string — context goes in `hint`.
 */
type SpecClasses = string | { label: string; value: string; hint?: string }[];

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			type="button"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				} catch {
					// noop
				}
			}}
			aria-label={copied ? "Copied" : "Copy classes"}
			className="absolute top-2 right-2 rounded-md border border-zinc-200 bg-white/90 px-2 py-0.5 font-mono text-xs text-zinc-500 opacity-0 transition-opacity group-hover/chip:opacity-100 hover:text-zinc-900 focus-visible:opacity-100 dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-400 dark:hover:text-white"
		>
			{copied ? "copied" : "copy"}
		</button>
	);
}

/** Copyable class-string chip: mono value, optional role label and hint. */
function ClassChip({
	label,
	value,
	hint,
	className,
}: {
	label?: string;
	value: string;
	hint?: string;
	className?: string;
}) {
	return (
		<div
			className={`group/chip relative rounded-md bg-zinc-100 px-4 py-3 dark:bg-zinc-900 ${className ?? ""}`}
		>
			{label && (
				<p className="mb-1.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
					{label}
				</p>
			)}
			<pre className="whitespace-pre-wrap">
				<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
					{value}
				</code>
			</pre>
			{hint && (
				<p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
					{hint}
				</p>
			)}
			<CopyButton text={value} />
		</div>
	);
}

function ClassBlock({ classes }: { classes: SpecClasses }) {
	const entries =
		typeof classes === "string" ? [{ label: "", value: classes }] : classes;
	return (
		<div className="mt-5 space-y-2">
			{entries.map((entry) => (
				<ClassChip key={entry.label + entry.value} {...entry} />
			))}
		</div>
	);
}

/**
 * Renders the same example twice — once on a light surface, once on a dark
 * one. The dark panel carries the `dark` class, and the site's dark variant
 * (`&:where(.dark, .dark *)`) makes every `dark:` utility inside it apply,
 * so both themes are visible at once without a page-level switch.
 */
function ThemePair({ children }: { children: React.ReactNode }) {
	const panelLabel =
		"mb-4 font-mono text-xs font-medium tracking-wider uppercase";
	return (
		<div className="grid gap-3 lg:grid-cols-2">
			<div className="min-w-0 rounded-md border border-zinc-200 bg-white p-5">
				<p className={`${panelLabel} text-zinc-400`}>Light</p>
				{children}
			</div>
			<div className="dark min-w-0 rounded-md border border-zinc-800 bg-zinc-950 p-5">
				<p className={`${panelLabel} text-zinc-500`}>Dark</p>
				{children}
			</div>
		</div>
	);
}

function SpecRow({
	title,
	note,
	classes,
	pair = true,
	children,
}: {
	title: string;
	note?: string;
	classes?: SpecClasses;
	/** Set false for rows where a second theme adds nothing (scale tables). */
	pair?: boolean;
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
			<div className="mt-5">
				{pair ? <ThemePair>{children}</ThemePair> : children}
			</div>
			{classes && <ClassBlock classes={classes} />}
		</div>
	);
}

function GuideSection({
	id,
	eyebrow,
	title,
	subtitle,
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	subtitle?: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-16 pt-20 md:pt-28">
			<p className={text.eyebrow}>// {eyebrow}</p>
			<h2 className={text.sectionTitle}>{title}</h2>
			{subtitle && <p className={text.subtitle}>{subtitle}</p>}
			<div className="mt-12">{children}</div>
		</section>
	);
}

const NAV_ITEMS = [
	{ href: "#foundations", label: "Foundations" },
	{ href: "#text-elements", label: "Text elements" },
	{ href: "#links-buttons", label: "Links & buttons" },
	{ href: "#spacing", label: "Spacing" },
	{ href: "#blog", label: "Blog" },
	{ href: "#docs", label: "Docs" },
];

export function TypographyStyleguidePage() {
	return (
		<div className="min-h-screen bg-white text-zinc-900">
			<main className="relative w-full">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<header className="pt-12 pb-12 md:pt-16 md:pb-16">
						<p className={text.eyebrow}>// Styleguide</p>
						<h1 className={text.pageTitleSub}>Website styleguide</h1>
					</header>
				</div>

				{/* Sticky section nav — the page's only chrome; doubles as the
				    divider between hero and guide */}
				<nav
					aria-label="Styleguide sections"
					className="sticky top-0 z-40 border-y border-zinc-200 bg-white/95 backdrop-blur-sm"
				>
					<div className="mx-auto flex w-full max-w-[73.75rem] flex-wrap gap-x-6 gap-y-2 px-4 py-3">
						{NAV_ITEMS.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase transition-colors hover:text-zinc-900"
							>
								{item.label}
							</a>
						))}
					</div>
				</nav>

				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="pb-24">
						<GuideSection id="foundations" eyebrow="01" title="Foundations">
							<SpecRow
								title="Font families"
								note="font-sans is the default. font-mono resolves to JetBrains Mono; never font-inter."
							>
								<div className="space-y-4">
									<div>
										<p className="text-2xl text-zinc-900 dark:text-white">
											TypeScript for the AI Era
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
								pair={false}
								note="Only these steps — no arbitrary sizes."
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
							subtitle="Colors are always themeable pairs — write the dark: variant even on pages that are dark today."
						>
							<div>
								{ELEMENT_SPECS.map((el) => (
									<div
										key={el.label}
										className="border-b border-zinc-100 py-5 first:pt-0 last:border-b-0"
									>
										<span className="font-mono text-sm text-zinc-500">
											{el.label}
										</span>
										<div className="mt-3 grid gap-3 lg:grid-cols-2">
											<div className="min-w-0 rounded-md border border-zinc-200 bg-white p-4">
												<p className={`${el.cls} mt-0! mb-0!`}>{el.sample}</p>
											</div>
											<div className="dark min-w-0 rounded-md border border-zinc-800 bg-zinc-950 p-4">
												<p className={`${el.cls} mt-0! mb-0!`}>{el.sample}</p>
											</div>
										</div>
										<ClassChip className="mt-3" value={el.cls} />
									</div>
								))}
							</div>
						</GuideSection>

						<GuideSection
							id="links-buttons"
							eyebrow="03"
							title="Links & buttons"
						>
							<SpecRow
								title="Links"
								note="Variants: inline, nav, footer, subtle, icon. Inline = muted underline that fades on hover; subtle always takes an arrow (below)."
								classes={[
									{
										label: "inline",
										value:
											"text-zinc-900 underline decoration-zinc-300 underline-offset-4 duration-200 hover:decoration-transparent dark:text-zinc-200 dark:decoration-zinc-400",
									},
								]}
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
								</div>
							</SpecRow>

							<SpecRow
								title="Subtle link with arrow"
								note="Arrow direction carries the meaning: left = back, right = forward, up-right = leaves the page."
								classes={[
									{
										label: "link",
										value: "inline-flex items-center gap-1.5 font-medium",
									},
									{ label: "icon", value: "text-xs" },
								]}
							>
								<div className="flex flex-col items-start gap-3">
									<Link
										href={getAssetPath("/blog")}
										variant="subtle"
										className="inline-flex items-center gap-1.5 font-medium"
									>
										<Icon name="arrow-left" className="text-xs" />
										Back to blog
									</Link>
									<Link
										href={getAssetPath("/blog")}
										variant="subtle"
										className="inline-flex items-center gap-1.5 font-medium"
									>
										View all posts
										<Icon name="arrow-right" className="text-xs" />
									</Link>
									<Link
										href="https://github.com/Effect-TS/effect"
										variant="subtle"
										className="inline-flex items-center gap-1.5 font-medium"
									>
										Effect on GitHub
										<Icon name="arrow-up-right" className="text-xs" />
									</Link>
								</div>
							</SpecRow>

							<SpecRow
								title="Buttons"
								note="Variants: secondary (default), primary, ghost. Sizes: sm, md (default), lg, xl. secondary md is the site's workhorse; primary lg is the hero CTA. Never hand-roll a CTA."
							>
								<div className="flex flex-wrap items-center gap-4">
									<Button href={getAssetPath("/blog")} variant="secondary">
										Read the blog
									</Button>
									<Button
										href={getAssetPath("/docs/introduction")}
										variant="primary"
									>
										Get started
									</Button>
									<Button variant="ghost">Ghost</Button>
								</div>
								<div className="mt-5 flex flex-wrap items-center gap-4">
									<Button variant="secondary" size="sm">
										Small
									</Button>
									<Button variant="secondary" size="md">
										Medium
									</Button>
									<Button variant="secondary" size="lg">
										Large
									</Button>
									<Button variant="secondary" size="xl">
										XL
									</Button>
								</div>
							</SpecRow>
						</GuideSection>

						<GuideSection id="spacing" eyebrow="04" title="Spacing">
							<SpecRow
								title="Container"
								note="1180px max width, centred, with a 16px gutter on each side at every breakpoint."
								classes="mx-auto w-full max-w-[73.75rem] px-4"
							>
								<div className="rounded-md border border-dashed border-zinc-300 py-3 dark:border-zinc-700">
									<div className="flex items-stretch gap-1">
										<div className="w-4 shrink-0 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
										<div className="flex h-10 flex-1 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
											max-w-[73.75rem] · 1180px
										</div>
										<div className="w-4 shrink-0 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
									</div>
									<div className="mt-2 flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
										<span>px-4 · 16px</span>
										<span>px-4 · 16px</span>
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Section rhythm"
								pair={false}
								note="96px mobile · 160px top / 96px bottom desktop."
								classes="py-24 md:pt-40"
							>
								<div className="rounded-md border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
									<div className="flex h-8 items-center justify-center bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										pt-40 (desktop) / pt-24 (mobile)
									</div>
									<div className="flex h-14 items-center justify-center font-mono text-sm text-zinc-500 dark:text-zinc-400">
										section content
									</div>
									<div className="flex h-6 items-center justify-center bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										py-24 (both) / 96px
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Section header stack"
								note="This exact stack opens every section: eyebrow mb-3 → h2 → subtitle mt-4 → content mt-12."
							>
								<div className="rounded-md border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
									<p className={text.eyebrow}>// Eyebrow</p>
									<p className={text.sectionTitle}>Section title</p>
									<p className={text.subtitle}>
										Subtitle sits 16px below the title.
									</p>
									<div className="mt-12 flex h-10 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										content · mt-12
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Spacing steps"
								pair={false}
								note="Not on the list? Round to the nearest step."
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

						<GuideSection id="blog" eyebrow="05" title="Blog">
							<article className={BLOG_ARTICLE_CLASS}>
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
									<code>BLOG_ARTICLE_CLASS</code> so real posts pick it up too.
								</p>
							</article>
						</GuideSection>

						<GuideSection id="docs" eyebrow="06" title="Docs">
							<SpecRow
								title="Docs heading hierarchy"
								note="Mono h1 — always the largest · sans h2 category · mono h3 entry · scaffold labels as paragraphs."
							>
								<div className="space-y-8">
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h1 · module page
										</span>
										<div className="min-w-0 flex-1">
											<p className="truncate font-mono text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
												Array
											</p>
											<ClassChip
												className="mt-3"
												value="mb-4 font-mono text-4xl font-semibold tracking-tight md:mb-6"
												hint="Must stay the largest heading on the page — the live page renders it smaller than its h2s; don't copy that."
											/>
										</div>
									</div>
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h2 · category
										</span>
										<div className="min-w-0 flex-1">
											<p className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl dark:text-white">
												Combining
											</p>
											<ClassChip
												className="mt-3"
												value="mb-0 text-2xl font-semibold tracking-tight md:text-3xl"
												hint="One step below the h1, never larger."
											/>
										</div>
									</div>
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h3 · api entry
										</span>
										<div className="min-w-0 flex-1">
											<p className="flex min-w-0 items-center gap-3">
												<span className="font-mono text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
													LayerRef
												</span>
												<span className="rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400">
													Interface
												</span>
											</p>
											<ClassChip
												className="mt-3"
												value="m-0! flex items-center gap-3 font-mono text-xl! font-semibold tracking-tight"
											/>
											<ClassChip
												className="mt-2"
												label="kind badge"
												value="rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400"
											/>
										</div>
									</div>
									<div className="flex flex-col gap-2 md:flex-row md:gap-6">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											scaffold label
										</span>
										<div className="min-w-0 flex-1">
											<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
												When to use · Details · See · Signature
											</p>
											<ClassChip
												className="mt-3"
												value="mt-6 mb-2 font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
												hint="Rendered as a p element. One style for all four labels — the live page mixes unstyled h4s with a one-off Signature style."
											/>
										</div>
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Document outline"
								pair={false}
								note="One h1, first. TOC from h2 + h3 only; chrome and scaffold stay out — ~170 outline nodes, not the live page's 622."
							>
								<pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 font-mono text-sm leading-[1.9] text-zinc-200">
									<code>
										{"<h1>Array</h1>"}
										<span className="text-zinc-500">
											{"          // one per page, first — mono, largest"}
										</span>
										{"\n<h2>Combining</h2>"}
										<span className="text-zinc-500">
											{"      // category — TOC group"}
										</span>
										{"\n  <h3>append</h3>"}
										<span className="text-zinc-500">
											{"       // entry — mono + kind badge, TOC item"}
										</span>
										{"\n    <p>When to use</p>"}
										<span className="text-zinc-500">
											{" // scaffold label — styled, no outline slot"}
										</span>
										{"\n    <p>Signature</p>"}
										{"\n  <h3>appendAll</h3>"}
										{"\n<h2>Constructors</h2>"}
									</code>
								</pre>
							</SpecRow>

							<SpecRow
								title="Docs article body"
								note="prose-sm → md:prose-base · 15px/24px body · Shiki tokens on code."
								classes={[
									{
										label: "usage",
										value:
											'import { DOCS_ARTICLE_CLASS } from "@/components/landing/DocsLayout"',
										hint: "Apply to the article wrapper. Never copy the class string itself — fix styles in the constant so every docs page picks them up.",
									},
								]}
							>
								<div className={DOCS_ARTICLE_CLASS}>
									<h1>Introduction</h1>
									<p>
										Effect is a powerful TypeScript library for building
										complex, synchronous, and asynchronous programs. It includes{" "}
										<a href={getAssetPath("/docs/introduction")}>
											inline links
										</a>{" "}
										with the site underline, and inline code like{" "}
										<code>Effect.gen</code> as a soft chip.
									</p>
									<h2>Section heading</h2>
									<p>
										An h2 inside a docs article — 22px, semibold, tight leading
										and tracking, with clear air above so sections separate
										without rules:
									</p>
									<ul>
										<li>Typed errors surface failure cases in the signature</li>
										<li>Structured concurrency supervises every fiber</li>
									</ul>
								</div>
							</SpecRow>

							<SpecRow
								title="Docs shell"
								note="1408px · sidebar from lg, TOC from xl · sticky bordered asides."
								classes={[
									{
										label: "shell",
										value:
											"mx-auto grid w-full max-w-352 grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_240px]",
									},
									{
										label: "aside",
										value: "border-r border-zinc-200 dark:border-zinc-800",
										hint: "Left column; the right column mirrors it with border-l.",
									},
									{
										label: "aside nav",
										value:
											"sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8",
									},
									{
										label: "main",
										value: "min-w-0 px-6 pt-6 pb-12 lg:px-12 lg:py-16",
									},
									{
										label: "article",
										value: "max-w-4xl",
										hint: "Already included in DOCS_ARTICLE_CLASS — don't set it twice.",
									},
								]}
							>
								<div className="grid grid-cols-[56px_1fr_56px] gap-2 rounded-md border border-dashed border-zinc-300 p-4 md:grid-cols-[240px_1fr_240px] dark:border-zinc-700">
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										240
									</div>
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										article · max-w-4xl
									</div>
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										240
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Breadcrumb"
								note="Above the h1 on every reference page."
								classes={[
									{
										label: "trail",
										value:
											"mb-5 flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider text-zinc-600 uppercase lg:mb-8 dark:text-zinc-400",
									},
									{
										label: "link",
										value:
											"text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
									},
								]}
							>
								<p className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
									<span className="transition-colors hover:text-zinc-900 dark:hover:text-white">
										API Reference
									</span>
									<span aria-hidden="true">/</span>
									<span className="transition-colors hover:text-zinc-900 dark:hover:text-white">
										v4
									</span>
									<span aria-hidden="true">/</span>
									<span className="transition-colors hover:text-zinc-900 dark:hover:text-white">
										platform-node-shared
									</span>
								</p>
							</SpecRow>

							<SpecRow
								title="Sidebar navigation"
								note="Mono — entries are symbols. Active = filled pill."
								classes={[
									{
										label: "module label",
										value:
											"mb-4 block font-mono text-sm font-semibold tracking-widest text-zinc-900 uppercase dark:text-white",
									},
									{
										label: "link",
										value:
											"block truncate rounded-md py-1 pl-3 font-mono text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white",
									},
									{
										label: "active",
										value:
											"bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white",
									},
								]}
							>
								<div className="max-w-72">
									<p className="mb-4 font-mono text-sm font-semibold tracking-widest text-zinc-900 uppercase dark:text-white">
										Core
									</p>
									<span className="block truncate rounded-md bg-zinc-200 py-1 pl-3 font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white">
										NodeChildProcessSpawner
									</span>
									<span className="block truncate rounded-md py-1 pl-3 font-mono text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white">
										NodeClusterSocket
									</span>
									<span className="block truncate rounded-md py-1 pl-3 font-mono text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white">
										NodeCrypto
									</span>
								</div>
							</SpecRow>

							<SpecRow
								title="Table of contents"
								note="From xl up. Sans categories, mono entries — no panel box."
								classes={[
									{
										label: "label",
										value:
											"mb-4 font-mono text-sm font-semibold tracking-[0.14em] uppercase",
									},
									{
										label: "hairline",
										value: "mb-5 h-px bg-zinc-200 dark:bg-zinc-800",
									},
									{
										label: "category link",
										value:
											"block text-sm font-semibold transition-colors hover:text-zinc-950 dark:hover:text-white",
									},
									{
										label: "entry link",
										value:
											"flex min-w-0 items-baseline gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
										hint: "Entry list nests under its category: mt-2 space-y-2 pl-3.",
									},
								]}
							>
								<div className="max-w-60">
									<p className="mb-4 font-mono text-sm font-semibold tracking-[0.14em] text-zinc-900 uppercase dark:text-white">
										On this page
									</p>
									<div className="mb-5 h-px bg-zinc-200 dark:bg-zinc-800" />
									<ul className="space-y-5">
										<li>
											<span className="block text-sm font-semibold text-zinc-900 dark:text-white">
												Layers
											</span>
											<ul className="mt-2 space-y-2 pl-3">
												<li>
													<span className="flex min-w-0 items-baseline gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
														layer
													</span>
												</li>
											</ul>
										</li>
										<li>
											<span className="block text-sm font-semibold text-zinc-900 dark:text-white">
												Models
											</span>
											<ul className="mt-2 space-y-2 pl-3">
												<li>
													<span className="flex min-w-0 items-baseline gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
														<span className="truncate">FlattenedPipeline</span>
														<span className="shrink-0 text-zinc-400 dark:text-zinc-500">
															(interface)
														</span>
													</span>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</SpecRow>
						</GuideSection>
					</div>
				</div>
			</main>
		</div>
	);
}
