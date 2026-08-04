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

/** A single class string, or one labeled entry per role for multi-part specs. */
type SpecClasses = string | { label: string; value: string }[];

function ClassBlock({ classes }: { classes: SpecClasses }) {
	const entries =
		typeof classes === "string" ? [{ label: "", value: classes }] : classes;
	return (
		<div className="mt-5 space-y-2">
			{entries.map((entry) => (
				<div
					key={entry.label + entry.value}
					className="rounded-md bg-zinc-100 px-4 py-3 dark:bg-zinc-900"
				>
					{entry.label && (
						<p className="mb-1.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
							{entry.label}
						</p>
					)}
					<pre className="whitespace-pre-wrap">
						<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
							{entry.value}
						</code>
					</pre>
				</div>
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

							<SpecRow
								title="Code snippets"
								note="Code blocks stay dark in both themes: zinc-950 panel, zinc-800 hairline, zinc-200 plain text. Tokens use rose for keywords and operators, blue for calls and bindings, sky for strings, muted zinc for comments. Inline code chips stay neutral zinc — no color."
								classes={[
									{
										label: "block",
										value:
											"rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-sm leading-[1.6] text-zinc-200",
									},
									{
										label: "tokens",
										value:
											"keyword/operator: text-rose-400 · call/binding: text-blue-400 · string: text-sky-300 · comment: text-zinc-500",
									},
								]}
							>
								<pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 font-mono text-sm leading-[1.6] text-zinc-200">
									<code>
										<span className="text-rose-400">import</span>
										{" { Array } "}
										<span className="text-rose-400">from</span>{" "}
										<span className="text-sky-300">"effect"</span>
										{"\n\n"}
										<span className="text-rose-400">const</span>{" "}
										<span className="text-blue-400">result</span>{" "}
										<span className="text-rose-400">=</span>
										{" Array."}
										<span className="text-blue-400">append</span>
										{"([1, 2, 3], 4)\nconsole."}
										<span className="text-blue-400">log</span>
										{"(result) "}
										<span className="text-zinc-500">{"// [1, 2, 3, 4]"}</span>
									</code>
								</pre>
							</SpecRow>
						</GuideSection>

						<GuideSection
							id="text-elements"
							eyebrow="02"
							title="Text elements"
							lede="One spec per role. Headings are bold only at the h1 level; everything below is semibold. Page titles (h1) use leading-[1.1]; lower heading levels use leading-tighter. All use themeable color pairs."
						>
							<SpecRow
								title="Heading hierarchy"
								note="Five levels, one job each: h1 opens the page (hero scale on landing pages, subpage scale everywhere else — never both), h2 opens a section, h3 titles a card or subsection, h4 handles fine structure. Never skip a level and never restyle a lower level to look like a higher one. The eyebrow is a label, not a heading — it renders as a p and takes no heading slot."
							>
								<div className="space-y-6">
									{[
										{
											label: "h1 · hero",
											detail: "one per landing page",
											cls: text.pageTitle,
											sample: "Ship reliable software",
										},
										{
											label: "h1 · subpage",
											detail: "one per subpage",
											cls: text.pageTitleSub,
											sample: "Effect 4.0 enters beta",
										},
										{
											label: "h2 · section",
											detail: "opens every section",
											cls: text.sectionTitle,
											sample: "Everything you need",
										},
										{
											label: "h3 · card",
											detail: "cards, subsections",
											cls: text.cardTitle,
											sample: "Typed errors",
										},
										{
											label: "h4 · small",
											detail: "fine structure",
											cls: text.smallHeading,
											sample: "Retry policies",
										},
									].map((level) => (
										<div
											key={level.label}
											className="flex flex-col gap-1 border-b border-zinc-100 pb-5 last:border-b-0 last:pb-0 md:flex-row md:items-baseline md:gap-6 dark:border-zinc-900"
										>
											<span className="w-44 shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-400">
												{level.label}
												<br />
												<span className="text-zinc-400 dark:text-zinc-500">
													{level.detail}
												</span>
											</span>
											<span className={`${level.cls} min-w-0`}>
												{level.sample}
											</span>
										</div>
									))}
								</div>
							</SpecRow>

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
								note="Copy inside cards, one size down, mt-1 below the card title."
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
								note="Variants: inline (body copy), nav (header), footer, subtle (breadcrumbs, attributions), icon. Inline links carry a muted underline with underline-offset-4 that fades out on hover over 200ms — never a full-strength underline or a dimming text color."
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

							<SpecRow
								title="Section header action"
								note="A section-level action sits in the header row next to the h2: a secondary Button (default md size) with a trailing arrow icon — arrow-up-right for external links, arrow-right for internal. Never a bare text link, and the row is items-center, not items-baseline."
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
											Use the type scale and named leading values only — page
											titles (h1) get{" "}
											<code className="font-mono text-sm">leading-[1.1]</code>
											{"; "}lower headings get{" "}
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
										<li>
											Color belongs to syntax tokens only — rose keywords, blue
											calls, sky strings inside dark code blocks; chips and all
											other text stay zinc.
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
							id="blog"
							eyebrow="06"
							title="Blog"
							lede="Every text element the blog body supports, rendered with BLOG_ARTICLE_CLASS — the exact styles real posts use. Fixes belong in that class so posts pick them up too."
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
							lede="Docs share the blog's reading language — quiet hairlines, muted underlines, mono micro labels — tuned for reference content. Article bodies use DOCS_ARTICLE_CLASS, exported from DocsLayout."
						>
							<SpecRow
								title="Docs heading hierarchy"
								note="The reading scale, one step smaller than the site ladder. h1 is the page title at 28px — never the marketing scale. h2 opens sections and names API entries (mono, with a kind badge). h3 handles named subsections. Repeated scaffold labels — When to use, Details, See, Signature — are not styled as headings at all: they render as mono labels so the entry name and content dominate."
							>
								<div className="space-y-8">
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h1 · page
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												one per docs page
											</span>
										</span>
										<div className="min-w-0 flex-1">
											<p className="text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.012em] text-zinc-900 dark:text-white">
												Models
											</p>
											<pre className="mt-3 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													text-[1.75rem] leading-[1.2] font-semibold
													tracking-[-0.012em]
												</code>
											</pre>
										</div>
									</div>
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h2 · section
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												guide sections
											</span>
										</span>
										<div className="min-w-0 flex-1">
											<p className="text-[1.375rem] leading-[1.35] font-semibold tracking-[-0.012em] text-zinc-900 dark:text-white">
												Running Effects
											</p>
											<pre className="mt-3 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													text-[1.375rem] leading-[1.35] font-semibold
													tracking-[-0.012em]
												</code>
											</pre>
										</div>
									</div>
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h2 · api entry
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												mono + kind badge
											</span>
										</span>
										<div className="min-w-0 flex-1">
											<p className="flex min-w-0 items-center gap-3">
												<span className="font-mono text-[1.375rem] leading-[1.35] font-semibold tracking-tight text-zinc-900 dark:text-white">
													LayerRef
												</span>
												<span className="rounded-full border border-zinc-300 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:border-zinc-700 dark:text-zinc-400">
													Interface
												</span>
											</p>
											<pre className="mt-3 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													font-mono text-[1.375rem] leading-[1.35]
													font-semibold tracking-tight
												</code>
											</pre>
											<pre className="mt-2 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													badge: rounded-full border border-zinc-300 px-2.5
													py-0.5 font-mono text-xs font-medium tracking-wider
													text-zinc-500 uppercase dark:border-zinc-700
													dark:text-zinc-400
												</code>
											</pre>
										</div>
									</div>
									<div className="flex flex-col gap-2 border-b border-zinc-100 pb-6 md:flex-row md:gap-6 dark:border-zinc-900">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											h3 · subsection
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												named subsections
											</span>
										</span>
										<div className="min-w-0 flex-1">
											<p className="text-[1.125rem] leading-[1.4] font-semibold text-zinc-900 dark:text-white">
												Layer caching semantics
											</p>
											<pre className="mt-3 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													text-[1.125rem] leading-[1.4] font-semibold
												</code>
											</pre>
										</div>
									</div>
									<div className="flex flex-col gap-2 md:flex-row md:gap-6">
										<span className="w-44 shrink-0 pt-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
											scaffold label
											<br />
											<span className="text-zinc-400 dark:text-zinc-500">
												repeated per entry
											</span>
										</span>
										<div className="min-w-0 flex-1">
											<p className="font-mono text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
												When to use · Details · See · Signature
											</p>
											<pre className="mt-3 rounded-md bg-zinc-100 px-3 py-2 whitespace-pre-wrap dark:bg-zinc-900">
												<code className="font-mono text-sm leading-relaxed wrap-break-word text-zinc-700 dark:text-zinc-300">
													mt-6 mb-2 font-mono text-sm font-medium
													tracking-wider text-zinc-500 uppercase
													dark:text-zinc-400
												</code>
											</pre>
										</div>
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Docs article body"
								note="16px body on a 1.65 line-height, one step down from the blog's 17px. Headings semibold with tight tracking; links use the site's muted underline; inline code as neutral chips; code blocks always dark with the syntax tokens from Foundations."
								classes={[
									{
										label: "usage",
										value:
											'import { DOCS_ARTICLE_CLASS } from "@/components/landing/DocsLayout" and apply it to the article wrapper — never copy the string itself. Element styles live in that one constant; fix them there so every docs page picks the change up.',
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
								note="The site container split into three columns: 220px sidebar, reading column, 240px table of contents. Side columns are sticky below the nav and scroll independently; the article is capped at max-w-2xl so lines stay readable."
								classes={[
									{
										label: "shell",
										value:
											"mx-auto grid w-full max-w-[73.75rem] px-4 lg:grid-cols-[220px_minmax(0,1fr)_240px] lg:gap-x-10",
									},
									{
										label: "aside",
										value:
											"sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-12",
									},
									{
										label: "article",
										value: "min-w-0 max-w-2xl py-12 lg:py-16",
									},
								]}
							>
								<div className="grid grid-cols-[56px_1fr_56px] gap-2 rounded-md border border-dashed border-zinc-300 p-4 md:grid-cols-[220px_1fr_240px] dark:border-zinc-700">
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										220
									</div>
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										article · max-w-2xl
									</div>
									<div className="flex h-24 items-center justify-center rounded-sm bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
										240
									</div>
								</div>
							</SpecRow>

							<SpecRow
								title="Sidebar navigation"
								note="Quiet text, no fills. Group labels are the site micro label; links are text-sm zinc-600 that darken on hover; the active page is simply medium weight in the emphasis color."
								classes={[
									{
										label: "group label",
										value:
											"mb-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
									},
									{
										label: "link",
										value:
											"block py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
									},
									{
										label: "active",
										value: "font-medium text-zinc-900 dark:text-white",
									},
								]}
							>
								<div className="max-w-60">
									<p className="mb-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
										Getting Started
									</p>
									<span className="block py-1.5 text-sm font-medium text-zinc-900 dark:text-white">
										Introduction
									</span>
									<span className="block py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
										Why Effect?
									</span>
									<span className="block py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
										Installation
									</span>
								</div>
							</SpecRow>

							<SpecRow
								title="Table of contents"
								note="Identical to the blog's — a soft bordered panel with a mono label and hairline; links darken on hover, and the active heading is underlined with the site offset."
								classes={[
									{
										label: "panel",
										value:
											"rounded-md border border-zinc-200 bg-zinc-50/40 p-5 dark:border-zinc-800 dark:bg-zinc-900/40",
									},
									{
										label: "link",
										value:
											"block text-sm leading-snug text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
									},
									{
										label: "active",
										value:
											"text-zinc-900 underline underline-offset-4 dark:text-white",
									},
								]}
							>
								<div className="max-w-60 rounded-md border border-zinc-200 bg-zinc-50/40 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
									<p className="mb-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
										On this page
									</p>
									<div className="mb-3 h-px bg-zinc-200 dark:bg-zinc-800" />
									<ul className="space-y-2">
										<li>
											<span className="block text-sm leading-snug text-zinc-900 underline underline-offset-4 dark:text-white">
												How to use these docs
											</span>
										</li>
										<li>
											<span className="block text-sm leading-snug text-zinc-600 transition-colors hover:text-zinc-900 hover:underline hover:underline-offset-4 dark:text-zinc-400 dark:hover:text-white">
												Coding with LLMs
											</span>
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
