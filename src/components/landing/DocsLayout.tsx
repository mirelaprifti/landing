import { type ReactNode, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

/**
 * Shared article styles for docs page bodies (also used by /styleguide).
 * Extracted verbatim from the live v4 API reference on effect.website:
 * prose-sm on mobile, prose-base from md up, 15px paragraphs on a 24px
 * line, tight heading rhythm, neutral code chips, and dark bordered code
 * blocks (Shiki github-light/github-dark supplies token colors on the
 * live site). Links keep the site's fade-out underline.
 */
export const DOCS_ARTICLE_CLASS =
	"prose prose-zinc dark:prose-invert prose-sm md:prose-base max-w-4xl prose-headings:font-semibold prose-headings:tracking-tight prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3 prose-p:text-[0.9375rem] prose-p:leading-6 prose-a:transition-colors prose-a:duration-200 prose-a:hover:decoration-transparent prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-code:rounded prose-code:bg-zinc-200 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:text-zinc-700 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-zinc-700 prose-pre:bg-zinc-900 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200";

type NavItem = { slug: string; label: string; href?: string };
type NavSection = { title: string; items: NavItem[] };

/**
 * Top-level docs sections, shown as a horizontal sub-nav directly below
 * the site navbar. Each section swaps in its own sidebar tree, so the
 * educational content and the API reference all live under one docs
 * shell. Cookbooks / Guides to follow.
 */
export type DocsSectionKey = "docs" | "guides" | "api";

const SECTIONS: {
	key: DocsSectionKey;
	label: string;
	href: string;
}[] = [
	// Docs holds the narrative documentation; Guides pages don't exist
	// yet and route to Introduction as a stand-in. The ?section= param
	// preserves the selection when arriving from a page outside
	// DocsLayout (e.g. the API reference).
	{
		key: "docs",
		label: "Onboarding",
		href: "/docs/onboarding",
	},
	{
		key: "guides",
		label: "Guides",
		href: "/docs/introduction",
	},
	{
		key: "api",
		label: "Reference",
		href: "/docs/api/v3",
	},
];

/**
 * Horizontal docs section tabs: a slim sticky bar directly below the
 * navbar. Inter labels with a 2px underline indicator sitting on the
 * bar's hairline; every tab navigates to its section's landing page.
 * The bar opens with the v3/v4 switch for the versioned API area
 * (segmented control per the EventsPage tabs idiom); v3 is selected by
 * default.
 */
export function DocsSectionTabs({
	section,
	version = "v3",
}: {
	section: DocsSectionKey;
	/** Active API reference version; defaults to v3 (the current stable). */
	version?: "v3" | "v4";
}) {
	return (
		<div className="sticky top-16 z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
			<nav
				aria-label="Docs sections"
				className="mx-auto flex w-full max-w-[88rem] items-center gap-6 px-4"
			>
				{/* Dark active pill is zinc-700 — one step lighter than the
				    zinc-900 container — mirroring the sidebar-pill contrast
				    precedent. */}
				<div
					role="group"
					aria-label="API reference version"
					className="inline-flex shrink-0 gap-1 rounded-md border border-zinc-300 bg-zinc-100 p-0.5 dark:border-zinc-700 dark:bg-zinc-900"
				>
					{(["v3", "v4"] as const).map((v) => (
						<a
							key={v}
							href={getAssetPath(`/docs/api/${v}`)}
							aria-current={version === v ? "page" : undefined}
							className={`rounded-sm px-3 py-1 text-center font-mono text-xs transition-all duration-200 ${
								version === v
									? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-700 dark:text-white"
									: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
							}`}
						>
							{v}
						</a>
					))}
				</div>
				<div
					className="h-4.5 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800"
					aria-hidden="true"
				/>
				<ul className="flex items-center gap-8 overflow-x-auto">
					{SECTIONS.map((s) => {
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
								<a
									href={getAssetPath(s.href)}
									aria-current={isActive ? "true" : undefined}
									className={itemClass}
								>
									{inner}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

const SIDEBARS: Record<DocsSectionKey, NavSection[]> = {
	// Onboarding: a guided path into Effect — why, setup, first steps —
	// all getting-started material lives here, not under Guides.
	docs: [
		{
			title: "Start Here",
			items: [
				{ slug: "onboarding", label: "Welcome" },
				{ slug: "why-effect", label: "Why Effect?" },
				{ slug: "installation", label: "Installation" },
			],
		},
		{
			title: "Getting Started",
			items: [
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
			title: "Next Steps",
			items: [
				{ slug: "guides", label: "Guides", href: "/docs/introduction" },
				{ slug: "api", label: "API Reference", href: "/docs/api/v3" },
				{ slug: "play", label: "Playground", href: "/play" },
			],
		},
	],
	// Guides: the in-depth documentation; getting-started material lives
	// under Onboarding.
	guides: [
		{
			title: "Overview",
			items: [{ slug: "introduction", label: "Introduction" }],
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
	tocItems,
	children,
}: {
	activeSlug: string;
	section?: DocsSectionKey;
	tocItems: { id: string; label: string }[];
	children: ReactNode;
}) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const sidebar = SIDEBARS[section];

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

	// When the current page isn't in the section's tree, open all groups
	// so the tree isn't a wall of collapsed headers.
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
			<Navigation activePath="/docs" wide compactSearch />
			<div className="relative w-full pt-16">
				<DocsSectionTabs section={section} />
				{/* Mobile docs nav: sticky disclosure below the section tabs */}
				<div className="sticky top-26 z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
					<button
						type="button"
						onClick={() => setMobileNavOpen((open) => !open)}
						aria-expanded={mobileNavOpen}
						aria-controls="docs-mobile-nav"
						className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
							className="max-h-[60vh] overflow-y-auto border-t border-zinc-200 px-4 py-4 dark:border-zinc-800"
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
							className="sticky top-26 max-h-[calc(100vh-6.5rem)] overflow-y-auto px-4 py-8"
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
							className="sticky top-26 max-h-[calc(100vh-6.5rem)] overflow-y-auto px-4 py-10"
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
