import { type ReactNode, useEffect, useState } from "react";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared article styles for docs page bodies (also used by /styleguide).
 * Same reading language as the blog (BLOG_ARTICLE_CLASS), tuned for
 * reference content: 16px body on a slightly tighter rhythm, headings
 * semibold with tight tracking, links with the site's muted underline,
 * and soft bordered code blocks.
 */
export const DOCS_ARTICLE_CLASS =
	"prose prose-zinc [&>:first-child]:mt-0! prose-headings:font-semibold prose-h1:mb-4 prose-h1:text-[1.75rem] prose-h1:leading-[1.2] prose-h1:tracking-[-0.012em] prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-[1.375rem] prose-h2:leading-[1.35] prose-h2:tracking-[-0.012em] prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[1.125rem] prose-h3:leading-[1.4] prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-base prose-h4:leading-[1.4] prose-p:my-4 prose-p:text-base prose-p:leading-[1.65] prose-p:text-zinc-700 prose-a:text-zinc-900 prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 prose-a:transition-colors prose-a:duration-200 hover:prose-a:decoration-transparent prose-strong:text-zinc-900 prose-code:rounded-md prose-code:bg-zinc-200/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-zinc-800 prose-code:before:content-none prose-code:after:content-none prose-pre:my-6 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50 prose-pre:text-sm prose-pre:leading-[1.6] [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-li:text-base prose-li:leading-[1.65] prose-li:text-zinc-700 prose-li:marker:text-zinc-400 prose-hr:my-10 prose-hr:border-zinc-200 dark:prose-invert dark:prose-p:text-zinc-400 dark:prose-a:text-zinc-200 dark:prose-a:decoration-zinc-400 dark:prose-strong:text-zinc-200 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200 dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-900/80 dark:prose-li:text-zinc-400 dark:prose-li:marker:text-zinc-500 dark:prose-hr:border-zinc-800";

type NavItem = { slug: string; label: string };
type NavSection = { title: string; items: NavItem[] };

const SIDEBAR: NavSection[] = [
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
	{
		title: "Reference",
		items: [{ slug: "api/v3", label: "API Reference" }],
	},
];

export function DocsLayout({
	activeSlug,
	tocItems,
	children,
}: {
	activeSlug: string;
	tocItems: { id: string; label: string }[];
	children: ReactNode;
}) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const activeLabel = SIDEBAR.flatMap((section) => section.items).find(
		(item) => item.slug === activeSlug,
	)?.label;

	const toggleSection = (title: string) => {
		setOpenSections((prev) => {
			const containsActive = SIDEBAR.find((s) => s.title === title)?.items.some(
				(item) => item.slug === activeSlug,
			);
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

	const renderSections = (idPrefix: string) =>
		SIDEBAR.map((section) => {
			const containsActive = section.items.some(
				(item) => item.slug === activeSlug,
			);
			const isOpen = openSections[section.title] ?? containsActive;
			const panelId = `${idPrefix}-${section.title.toLowerCase().replace(/\s+/g, "-")}`;
			return (
				<div key={section.title} className="mb-1 last:mb-0">
					<button
						type="button"
						onClick={() => toggleSection(section.title)}
						aria-expanded={isOpen}
						aria-controls={panelId}
						className="flex w-full items-center justify-between py-2.5 font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
					>
						<span>{section.title}</span>
						<Icon
							name="chevron-down"
							className={`text-base transition-transform ${isOpen ? "rotate-180" : ""}`}
							aria-hidden="true"
						/>
					</button>
					{isOpen && (
						<ul id={panelId} className="flex flex-col gap-0.5 pb-4">
							{section.items.map((item) => {
								const isActive = item.slug === activeSlug;
								return (
									<li key={item.slug}>
										<a
											href={getAssetPath(`/docs/${item.slug}`)}
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
			<Navigation activePath="/docs" wide />
			<div className="relative w-full pt-16">
				{/* Mobile docs nav: sticky disclosure below the navbar */}
				<div className="sticky top-16 z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
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
							className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8"
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
							className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10"
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
