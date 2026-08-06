import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { BLOG_ARTICLE_CLASS } from "./BlogPostPage";
import { DOCS_ARTICLE_CLASS } from "./DocsLayout";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
		"leading-tighter text-2xl font-semibold text-zinc-900 md:text-3xl dark:text-white",
	/** Section lede — the paragraph directly under a page/section title. */
	lede: "mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400",
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
	{ label: "mt-4", px: 16, use: "title → lede / body" },
	{ label: "p-6 / gap-6", px: 24, use: "card padding, card grids" },
	{ label: "mb-12", px: 48, use: "section header → content" },
	{ label: "py-24", px: 96, use: "section rhythm (mobile)" },
	{ label: "md:pt-40", px: 160, use: "section top (desktop)" },
];

const ELEMENT_SPECS: {
	label: string;
	use: string;
	cls: string;
	sample: string;
}[] = [
	{
		label: "h1 · hero",
		use: "landing heroes · only font-bold",
		cls: text.pageTitle,
		sample: "Ship reliable software",
	},
	{
		label: "h1 · subpage",
		use: "blog, policies, listings",
		cls: text.pageTitleSub,
		sample: "Effect 4.0 enters beta",
	},
	{
		label: "eyebrow",
		use: "mono label above titles",
		cls: text.eyebrow,
		sample: "// Why Effect",
	},
	{
		label: "h2 · section",
		use: "opens every section",
		cls: text.sectionTitle,
		sample: "Everything you need",
	},
	{
		label: "lede",
		use: "under a title · max-w-2xl",
		cls: text.lede,
		sample: "Typed errors, concurrency, and DI out of the box.",
	},
	{
		label: "h3 · card",
		use: "cards, subsections",
		cls: text.cardTitle,
		sample: "Typed errors",
	},
	{
		label: "h4 · small",
		use: "fine structure",
		cls: text.smallHeading,
		sample: "Retry policies",
	},
	{
		label: "body",
		use: "paragraphs · stack with mt-4",
		cls: text.body,
		sample:
			"Fibers are supervised and cleaned up when their parent scope closes.",
	},
	{
		label: "card body",
		use: "inside cards · mt-1",
		cls: text.cardBody,
		sample: "Failure cases show up in the signature.",
	},
	{
		label: "micro",
		use: "captions, timestamps, meta",
		cls: text.micro,
		sample: "Last updated · Jul 29, 2026",
	},
];

/**
 * A single class string, or one labeled entry per role for multi-part specs.
 * `value` must stay a pure, paste-ready class string — context goes in `hint`.
 */
type SpecClasses =
	| string
	| { label: string; value: string; hint?: string }[];

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

function SpecRow({
	title,
	note,
	classes,
	children,
}: {
	title: string;
	note?: string;
	classes?: SpecClasses;
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
		<section id={id} className="scroll-mt-32 pt-20 md:pt-28">
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
	{ href: "#blog", label: "Blog" },
	{ href: "#docs", label: "Docs" },
];

export function TypographyStyleguidePage() {
	return (
		<div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
			<Navigation activePath="/styleguide" />

			<main className="relative w-full pt-16">
				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<header className="pt-16 pb-12 md:pt-24 md:pb-16">
						<p className={text.eyebrow}>// Styleguide</p>
						<h1 className={text.pageTitleSub}>Website styleguide</h1>
					</header>
				</div>

				{/* Sticky section nav — pins below the site nav and doubles as the
				    divider between hero and guide */}
				<nav
					aria-label="Styleguide sections"
					className="sticky top-16 z-40 border-y border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95"
				>
					<div className="mx-auto flex w-full max-w-[73.75rem] flex-wrap gap-x-6 gap-y-2 px-4 py-4">
						{NAV_ITEMS.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
							>
								{item.label}
							</a>
						))}
					</div>
				</nav>

				<div className="mx-auto w-full max-w-[73.75rem] px-4">
					<div className="max-w-3xl pb-24">
						<GuideSection
							id="foundations"
							eyebrow="01"
							title="Foundations"
							lede="Inter for everything, JetBrains Mono for code and labels, one 1.25-ratio scale."
						>
							<SpecRow
								title="Font families"
								note="font-sans is the default. font-mono resolves to JetBrains Mono; never font-inter."
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

							<SpecRow
								title="Code snippets"
								note="One scheme site-wide: the GitHub palette. Shiki github-light/dark on API pages; tok-* classes (globals.css) everywhere else."
								classes={[
									{
										label: "tokens",
										value:
											"tok-keyword · tok-string · tok-constant · tok-entity · tok-comment · tok-fg",
									},
								]}
							>
								<pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 font-mono text-sm leading-[1.6] dark:border-zinc-800 dark:bg-zinc-950">
									<code className="tok-fg">
										<span className="tok-keyword">import</span>
										{" { Array } "}
										<span className="tok-keyword">from</span>{" "}
										<span className="tok-string">"effect"</span>
										{"\n\n"}
										<span className="tok-keyword">const</span>
										{" result "}
										<span className="tok-keyword">=</span>
										{" Array."}
										<span className="tok-constant">append</span>
										{"([1, 2, 3], 4)\nconsole."}
										<span className="tok-constant">log</span>
										{"(result) "}
										<span className="tok-comment">{"// [1, 2, 3, 4]"}</span>
									</code>
								</pre>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="text-elements"
							eyebrow="02"
							title="Text elements"
							lede="One spec per role: sample on the right, class string one click away."
						>
							<div>
								{ELEMENT_SPECS.map((el) => (
									<div
										key={el.label}
										className="border-b border-zinc-100 py-5 first:pt-0 last:border-b-0 dark:border-zinc-900"
									>
										<div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
											<span className="w-44 shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-400">
												{el.label}
												<br />
												<span className="text-zinc-400 dark:text-zinc-500">
													{el.use}
												</span>
											</span>
											<div className="min-w-0 flex-1">
												<p className={`${el.cls} mt-0! mb-0!`}>{el.sample}</p>
												<details className="mt-2">
													<summary className="cursor-pointer font-mono text-xs tracking-wider text-zinc-400 uppercase select-none dark:text-zinc-500">
														Class
													</summary>
													<pre className="mt-2 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
														<code className="font-mono text-xs leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
															{el.cls}
														</code>
													</pre>
												</details>
											</div>
										</div>
									</div>
								))}
							</div>
							<p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
								Never skip a heading level. The eyebrow is a label (renders as a
								p), not a heading.
							</p>
						</GuideSection>

						<GuideSection
							id="links-buttons"
							eyebrow="03"
							title="Links & buttons"
							lede="Always ui/Link and ui/Button — never hand-rolled."
						>
							<SpecRow
								title="Links — ui/Link"
								note="Variants: inline, nav, footer, subtle, icon. Inline = muted underline that fades on hover."
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
									<Link href={getAssetPath("/blog")} variant="subtle">
										Subtle link
									</Link>
								</div>
							</SpecRow>

							<SpecRow
								title="Buttons — ui/Button"
								note="Variants: primary, secondary, ghost, discord. Sizes: sm, md, lg, xl."
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

							<SpecRow
								title="Section header action"
								note="Secondary md Button beside the h2, trailing arrow (up-right = external). Row is items-center."
								classes="flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
							>
								<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
									<h2 className={text.sectionTitle}>Join an upcoming event</h2>
									<Button
										href="https://luma.com/effect-community"
										variant="secondary"
										className="shrink-0"
									>
										View events calendar
										<Icon name="arrow-up-right" className="text-base" />
									</Button>
								</div>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="spacing"
							eyebrow="04"
							title="Spacing"
							lede="One container, one section rhythm, one text stack."
						>
							<SpecRow
								title="Container"
								note="Use this literal string."
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
								note="96px mobile · 160px top / 96px bottom desktop."
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
								note="This exact stack opens every section."
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
								note="p-6 cards, gap-6 grids. Airy chrome-less grids: gap-12 md:gap-16."
								classes={[
									{
										label: "card",
										value:
											"rounded-md border border-zinc-200 p-6 dark:border-zinc-800",
									},
									{ label: "grid", value: "grid gap-6" },
								]}
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

						<GuideSection
							id="rules"
							eyebrow="05"
							title="Rules"
							lede="The short version."
						>
							<div className="grid gap-6 md:grid-cols-2">
								<div className="rounded-md border border-zinc-200 p-6 dark:border-zinc-800">
									<p className={rowLabel}>Do</p>
									<ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
										<li>Type scale + named leadings only</li>
										<li>h1 font-bold · h2–h4 font-semibold</li>
										<li>Themeable color pairs, even on dark-only pages</li>
										<li>ui/Button and ui/Link for every CTA and link</li>
										<li>Container and section-rhythm strings verbatim</li>
										<li>Code color via tok-* tokens only; chips stay zinc</li>
									</ul>
								</div>
								<div className="rounded-md border border-zinc-200 p-6 dark:border-zinc-800">
									<p className={rowLabel}>Don't</p>
									<ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
										<li>
											No arbitrary sizes or leadings (text-[15px],
											leading-[1.35])
										</li>
										<li>No font-bold h2s, no tracking-wide eyebrows</li>
										<li>No hand-rolled or rounded-lg buttons</li>
										<li>No font-inter, no inline Roboto Mono</li>
										<li>No max-w-295 or one-off containers</li>
									</ul>
								</div>
							</div>
						</GuideSection>

						<GuideSection
							id="blog"
							eyebrow="06"
							title="Blog"
							lede="Every element the blog body supports, rendered with BLOG_ARTICLE_CLASS. Fix styles there, not per-post."
						>
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
									<code>BLOG_ARTICLE_CLASS</code> so real posts pick it up too.
								</p>
							</article>
						</GuideSection>

						<GuideSection
							id="docs"
							eyebrow="07"
							title="Docs"
							lede="Matched to the live v4 API reference on effect.website — mono for everything that names code, neutral zinc chrome, Shiki-highlighted code blocks. Article bodies use DOCS_ARTICLE_CLASS, exported from DocsLayout."
						>
							<SpecRow
								title="Docs heading hierarchy"
								note="The corrected hierarchy — the live page inverts h1/h2 sizes and emits 450+ h4 scaffold headings. Rules: mono h1 is the largest heading on the page; sans h2 categories one step below; mono h3 entries with a kind badge; scaffold labels are paragraphs."
							>
								<div className="space-y-8">
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h1 · module page
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												mono — named after code
											</span>
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
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												sans — Layers, Models…
											</span>
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
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												mono + kind badge
											</span>
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
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												a p — never a heading
											</span>
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
								note="One h1, first in the document. TOC builds from h2 + h3 only. Chrome (sidebar labels, footer) never gets heading tags. Scaffold labels are paragraphs — a 140-entry module yields ~170 outline nodes instead of the live page's 622."
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
								note="The live reference's article styles: prose-sm on mobile, prose-base from md up, 15px paragraphs on a 24px line, tight heading rhythm, neutral code chips, and dark bordered code blocks. Shiki (github-light / github-dark) supplies token colors on the live site."
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
									<pre>
										<code>
											<span className="text-rose-400">import</span>
											{" { Effect } "}
											<span className="text-rose-400">from</span>{" "}
											<span className="text-sky-300">"effect"</span>
											{"\n\n"}
											<span className="text-rose-400">const</span>{" "}
											<span className="text-blue-400">program</span>{" "}
											<span className="text-rose-400">=</span>
											{" Effect."}
											<span className="text-blue-400">succeed</span>
											{"(42)"}
										</code>
									</pre>
								</div>
							</SpecRow>

							<SpecRow
								title="Docs shell"
								note="A 1408px grid: 240px sidebar from lg up, article column, 240px table of contents from xl up. Side columns carry hairline borders and hold sticky, independently scrolling navs; the article is capped at max-w-4xl."
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
									{ label: "article", value: "max-w-4xl" },
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
								note="Every reference page opens with a mono uppercase trail above the h1; links darken on hover, separated by plain slashes."
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
								note="Everything mono — sidebar entries are code symbols. The module label is small caps; links get a rounded soft fill on hover; the active entry is a filled pill, semibold."
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
								note="Right column from xl up: a mono small-caps label over a hairline, sans semibold category links, and mono entries indented beneath each category — no panel box."
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

			<Footer />
		</div>
	);
}
