import { type ReactNode, useEffect, useState } from "react";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared article styles for docs page bodies (also used by /styleguide).
 * Extracted verbatim from the live v4 API reference on effect.website:
 * prose-sm on mobile, prose-base from md up, 15px paragraphs on a 24px
 * line, tight heading rhythm, neutral code chips, and dark bordered code
 * blocks (Shiki github-light/github-dark supplies token colors on the
 * live site). Links keep the site's fade-out underline.
 */
export const DOCS_ARTICLE_CLASS =
	"prose prose-zinc dark:prose-invert prose-sm md:prose-base max-w-4xl prose-headings:font-semibold prose-headings:tracking-tight prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3 prose-p:text-[0.9375rem] prose-p:leading-6 prose-a:transition-colors prose-a:duration-200 hover:prose-a:decoration-transparent prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-code:rounded prose-code:bg-zinc-200 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:text-zinc-700 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-zinc-700 prose-pre:bg-zinc-900 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200";

type NavItem = { slug: string; label: string; href?: string };
type NavSection = { title: string; items: NavItem[] };

/**
 * Top-level docs sections, shown as a horizontal sub-nav directly below
 * the site navbar. Each section swaps in its own sidebar tree, so the
 * educational content and the API reference all live under one docs
 * shell. Cookbooks / Guides to follow.
 */
export type DocsSectionKey =
	| "docs"
	| "tutorials"
	| "guides"
	| "cookbooks"
	| "api";

const SECTIONS: {
	key: DocsSectionKey | "play";
	label: string;
	href: string;
}[] = [
	// Docs holds the narrative documentation; Tutorials/Guides/Cookbooks
	// pages don't exist yet and route to Introduction as a stand-in. The
	// ?section= param preserves the selection when arriving from a page
	// outside DocsLayout (e.g. the API reference).
	{
		key: "docs",
		label: "Docs",
		href: "/docs/introduction",
	},
	{
		key: "tutorials",
		label: "Tutorials",
		href: "/docs/introduction?section=tutorials",
	},
	{
		key: "guides",
		label: "Guides",
		href: "/docs/introduction?section=guides",
	},
	{
		key: "cookbooks",
		label: "Cookbooks",
		href: "/docs/introduction?section=cookbooks",
	},
	{
		key: "api",
		label: "API Reference",
		href: "/docs/api/v3",
	},
	{
		key: "play",
		label: "Play",
		href: "/play",
	},
];

/**
 * Section switcher (Astro-docs-style): a soft inset panel at the top of
 * the sidebar; the active section is a filled pill, siblings are quiet
 * icon+label rows. Switching sections swaps the whole nav tree below.
 * Shared by DocsLayout and ApiReferenceLayout. The dark active pill is
 * zinc-700 (one step lighter than the tree's zinc-800 pill) so it keeps
 * the same relative contrast against the zinc-900 panel behind it.
 */
/**
 * Docs section links rendered inline in the top navbar (via Navigation's
 * links slot), shared by DocsLayout and the API reference. Same voice as
 * the site's default navbar links.
 */
export function DocsSectionLinks({
	section,
	onSelect,
}: {
	section: DocsSectionKey;
	/**
	 * When provided, sections other than API Reference and Playground
	 * become in-place selections (buttons) instead of navigations; those
	 * two always navigate since they live in different layouts.
	 */
	onSelect?: (key: DocsSectionKey) => void;
}) {
	return (
		<>
			{SECTIONS.map((s) => {
				const key = s.key;
				const isActive = key === section;
				const itemClass = `border-b border-transparent text-sm font-medium whitespace-nowrap transition-colors hover:border-current ${
					isActive
						? "text-zinc-900 dark:text-white"
						: "text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
				}`;
				return onSelect && key !== "api" && key !== "play" ? (
					<button
						key={key}
						type="button"
						onClick={() => onSelect(key)}
						aria-current={isActive ? "true" : undefined}
						className={`cursor-pointer ${itemClass}`}
					>
						{s.label}
					</button>
				) : (
					<a
						key={key}
						href={getAssetPath(s.href)}
						aria-current={isActive ? "true" : undefined}
						className={itemClass}
					>
						{s.label}
					</a>
				);
			})}
		</>
	);
}

/**
 * Horizontal docs section tabs: a slim sticky bar directly below the
 * navbar (the docs shell's original nav treatment, used by the "tabs"
 * variant). Inter labels with a 2px underline indicator sitting on the
 * bar's hairline; API Reference and Playground always navigate, the
 * rest switch in place when onSelect is provided.
 */
export function DocsSectionTabs({
	section,
	onSelect,
}: {
	section: DocsSectionKey;
	onSelect?: (key: DocsSectionKey) => void;
}) {
	return (
		<div className="sticky top-16 z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
			<nav aria-label="Docs sections" className="mx-auto w-full max-w-[88rem]">
				<ul className="flex items-center gap-8 overflow-x-auto px-6">
					{SECTIONS.filter((s) => s.key !== "play").map((s) => {
						const key = s.key;
						const isActive = key === section;
						const label = s.label;
						const itemClass = `relative flex h-10 items-center text-sm font-medium whitespace-nowrap transition-colors ${
							isActive
								? "text-zinc-900 dark:text-white"
								: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
						}`;
						const inner = (
							<>
								<span>{label}</span>
								{isActive && (
									<span
										className="absolute inset-x-0 bottom-0 h-0.5 bg-zinc-900 dark:bg-white"
										aria-hidden="true"
									/>
								)}
							</>
						);
						return (
							<li key={key}>
								{onSelect && key !== "api" && key !== "play" ? (
									<button
										type="button"
										onClick={() => onSelect(key)}
										aria-current={isActive ? "true" : undefined}
										className={`cursor-pointer ${itemClass}`}
									>
										{inner}
									</button>
								) : (
									<a
										href={getAssetPath(s.href)}
										aria-current={isActive ? "true" : undefined}
										className={itemClass}
									>
										{inner}
									</a>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

/**
 * Docs navbar treatments: "tabs" is the original shell (plain navbar,
 * sticky section-tabs bar below); "lockup" folds the section links into
 * the navbar next to an "Effect / Learn" brand lockup.
 */
export type DocsNavVariant = "tabs" | "lockup";

const SIDEBARS: Record<DocsSectionKey, NavSection[]> = {
	docs: [
		{
			title: "Getting Started",
			items: [
				{ slug: "introduction", label: "Introduction" },
				{ slug: "why-effect", label: "Why Effect?" },
				{ slug: "installation", label: "Installation" },
				{ slug: "devtools", label: "Devtools" },
				{ slug: "importing-effect", label: "Importing Effect" },
				{ slug: "the-effect-type", label: "The Effect Type" },
				{ slug: "creating-effects", label: "Creating Effects" },
				{ slug: "running-effects", label: "Running Effects" },
				{ slug: "using-generators", label: "Using Generators" },
				{ slug: "building-pipelines", label: "Building Pipelines" },
				{ slug: "control-flow", label: "Control Flow Operators" },
			],
		},
		{
			title: "Error Management",
			items: [
				{ slug: "two-types-of-errors", label: "Two Types of Errors" },
				{ slug: "expected-errors", label: "Expected Errors" },
				{ slug: "unexpected-errors", label: "Unexpected Errors" },
				{ slug: "fallback", label: "Fallback" },
				{ slug: "matching", label: "Matching" },
				{ slug: "retrying", label: "Retrying" },
				{ slug: "timing-out", label: "Timing Out" },
				{ slug: "sandboxing", label: "Sandboxing" },
				{ slug: "error-accumulation", label: "Error Accumulation" },
			],
		},
		{
			title: "Concurrency",
			items: [
				{ slug: "basic-concurrency", label: "Basic Concurrency" },
				{ slug: "fibers", label: "Fibers" },
				{ slug: "deferred", label: "Deferred" },
				{ slug: "queue", label: "Queue" },
				{ slug: "pubsub", label: "PubSub" },
			],
		},
	],
	// Tutorials/Guides/Cookbooks content doesn't exist yet — every item
	// routes to Introduction as a stand-in for the prototype.
	tutorials: [
		{
			title: "Hands-on",
			items: [
				{ slug: "play", label: "Playground", href: "/docs/introduction" },
				{
					slug: "courses",
					label: "Courses & Workshops",
					href: "/docs/introduction",
				},
			],
		},
		{
			title: "Watch & Listen",
			items: [
				{
					slug: "videos",
					label: "Videos & Talks",
					href: "/docs/introduction",
				},
				{ slug: "podcast", label: "Podcast", href: "/docs/introduction" },
			],
		},
	],
	guides: [
		{
			title: "How-to Guides",
			items: [
				{
					slug: "project-setup",
					label: "Project Setup",
					href: "/docs/introduction",
				},
				{
					slug: "dependency-injection",
					label: "Dependency Injection",
					href: "/docs/introduction",
				},
				{
					slug: "observability",
					label: "Observability",
					href: "/docs/introduction",
				},
				{
					slug: "migrating",
					label: "Migrating to Effect",
					href: "/docs/introduction",
				},
			],
		},
	],
	cookbooks: [
		{
			title: "Recipes",
			items: [
				{
					slug: "http-apis",
					label: "HTTP & APIs",
					href: "/docs/introduction",
				},
				{
					slug: "data-schema",
					label: "Data & Schema",
					href: "/docs/introduction",
				},
				{
					slug: "concurrency-patterns",
					label: "Concurrency Patterns",
					href: "/docs/introduction",
				},
				{
					slug: "testing",
					label: "Testing",
					href: "/docs/introduction",
				},
			],
		},
		{
			title: "Community",
			items: [
				{
					slug: "articles",
					label: "Community Articles",
					href: "/docs/introduction",
				},
			],
		},
	],
	api: [
		{
			title: "API Reference",
			items: [
				{ slug: "api/v3", label: "API Reference (v3)" },
				{ slug: "api", label: "API Reference (v4)" },
			],
		},
	],
};

export function DocsLayout({
	activeSlug,
	section = "docs",
	nav = "tabs",
	tocItems,
	children,
}: {
	activeSlug: string;
	section?: DocsSectionKey;
	nav?: DocsNavVariant;
	tocItems: { id: string; label: string }[];
	children: ReactNode;
}) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<DocsSectionKey>(section);

	// Allow ?section=tutorials|cookbooks to preselect a section when
	// arriving from outside DocsLayout (e.g. the API reference switcher).
	useEffect(() => {
		const param = new URLSearchParams(window.location.search).get("section");
		if (param && param in SIDEBARS) {
			setActiveSection(param as DocsSectionKey);
		}
	}, []);

	const selectSection = (key: DocsSectionKey) => {
		setActiveSection(key);
		const url = new URL(window.location.href);
		if (key === section) url.searchParams.delete("section");
		else url.searchParams.set("section", key);
		window.history.replaceState(null, "", url);
	};

	const sidebar = SIDEBARS[activeSection];

	const activeLabel = sidebar
		.flatMap((navSection) => navSection.items)
		.find((item) => item.slug === activeSlug)?.label;

	const toggleSection = (title: string) => {
		setOpenSections((prev) => {
			const containsActive = sidebar
				.find((s) => s.title === title)
				?.items.some((item) => item.slug === activeSlug);
			const currentlyOpen = prev[title] ?? containsActive ?? false;
			return { ...prev, [title]: !currentlyOpen };
		});
	};

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
				if (visible.length > 0) setActiveId(visible[0].target.id);
			},
			{ rootMargin: "-80px 0px -70% 0px", threshold: 0 },
		);

		for (const el of headings) observer.observe(el);
		return () => observer.disconnect();
	}, [tocItems]);

	// When the current page isn't in the selected section's tree (e.g.
	// previewing Tutorials while reading an Introduction page), open all
	// groups so the tree isn't a wall of collapsed headers.
	const treeHasActive = sidebar.some((navSection) =>
		navSection.items.some((item) => item.slug === activeSlug),
	);

	const renderSections = (idPrefix: string) =>
		sidebar.map((navSection) => {
			const containsActive = navSection.items.some(
				(item) => item.slug === activeSlug,
			);
			const isOpen =
				openSections[navSection.title] ?? (containsActive || !treeHasActive);
			const panelId = `${idPrefix}-${navSection.title.toLowerCase().replace(/\s+/g, "-")}`;
			return (
				<div key={navSection.title} className="mb-1 last:mb-0">
					<button
						type="button"
						onClick={() => toggleSection(navSection.title)}
						aria-expanded={isOpen}
						aria-controls={panelId}
						className="flex w-full items-center justify-between py-2.5 font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
					>
						<span>{navSection.title}</span>
						<Icon
							name="chevron-down"
							className={`text-base transition-transform ${isOpen ? "rotate-180" : ""}`}
							aria-hidden="true"
						/>
					</button>
					{isOpen && (
						<ul id={panelId} className="flex flex-col gap-0.5 pb-4">
							{navSection.items.map((item) => {
								const isActive = item.slug === activeSlug;
								return (
									<li key={item.slug}>
										<a
											href={getAssetPath(item.href ?? `/docs/${item.slug}`)}
											aria-current={isActive ? "page" : undefined}
											className={`block rounded-md py-1.5 pl-3 text-sm transition-colors ${
												isActive
													? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
													: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
											}`}
										>
											{item.label}
										</a>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			);
		});

	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>
			{nav === "lockup" ? (
				<Navigation activePath="/docs" wide compactSearch logoSuffix="Learn">
					<DocsSectionLinks section={activeSection} onSelect={selectSection} />
				</Navigation>
			) : (
				<Navigation activePath="/docs" wide compactSearch />
			)}
			<div className="relative w-full pt-16">
				{nav === "tabs" && (
					<DocsSectionTabs section={activeSection} onSelect={selectSection} />
				)}
				{/* Mobile docs nav: sticky disclosure below the navbar/tabs */}
				<div
					className={`sticky ${nav === "tabs" ? "top-26" : "top-16"} z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95`}
				>
					<button
						type="button"
						onClick={() => setMobileNavOpen((open) => !open)}
						aria-expanded={mobileNavOpen}
						aria-controls="docs-mobile-nav"
						className="flex w-full items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300"
					>
						<Icon name="menu" className="text-base" aria-hidden="true" />
						<span>Docs menu</span>
						{activeLabel && (
							<span className="truncate text-zinc-500 dark:text-zinc-400">
								/ {activeLabel}
							</span>
						)}
						<Icon
							name="chevron-down"
							className={`ml-auto text-base transition-transform ${mobileNavOpen ? "rotate-180" : ""}`}
							aria-hidden="true"
						/>
					</button>
					{mobileNavOpen && (
						<nav
							id="docs-mobile-nav"
							aria-label="Docs navigation"
							className="max-h-[60vh] overflow-y-auto border-t border-zinc-200 px-6 py-4 dark:border-zinc-800"
						>
							{renderSections("docs-mobile-section")}
						</nav>
					)}
				</div>
				<div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-[240px_1fr_240px]">
					{/* Left sidebar */}
					<aside className="hidden border-r border-zinc-200 lg:block dark:border-zinc-800">
						<nav
							aria-label="Docs navigation"
							className={`sticky overflow-y-auto px-6 py-8 ${nav === "tabs" ? "top-26 max-h-[calc(100vh-6.5rem)]" : "top-16 max-h-[calc(100vh-4rem)]"}`}
						>
							{renderSections("docs-section")}
						</nav>
					</aside>

					{/* Main content */}
					<main
						id="main-content"
						className="min-w-0 px-6 py-12 lg:px-12 lg:py-16"
					>
						{children}
					</main>

					{/* Right TOC */}
					<aside className="hidden border-l border-zinc-200 md:block dark:border-zinc-800">
						<nav
							aria-label="On this page"
							className={`sticky overflow-y-auto px-6 py-10 ${nav === "tabs" ? "top-26 max-h-[calc(100vh-6.5rem)]" : "top-16 max-h-[calc(100vh-4rem)]"}`}
						>
							<p className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
								On this page
							</p>
							<div className="mb-5 h-px bg-zinc-200 dark:bg-zinc-800" />
							<ul className="flex flex-col gap-3">
								{tocItems.map((item) => {
									const isActive = activeId === item.id;
									return (
										<li key={item.id}>
											<a
												href={`#${item.id}`}
												aria-current={isActive ? "location" : undefined}
												className={`block text-sm leading-snug transition-colors ${
													isActive
														? "font-semibold text-zinc-900 dark:text-white"
														: "text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
												}`}
											>
												{item.label}
											</a>
										</li>
									);
								})}
							</ul>
						</nav>
					</aside>
				</div>
			</div>
			<Footer activePath="/docs" />
			<GridOverlay />
		</div>
	);
}
