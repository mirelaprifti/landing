import { useEffect, useState, type ReactNode } from "react";
import { getAssetPath } from "../../utils/assetPath";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
					.sort(
						(a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
					);
				if (visible.length > 0) setActiveId(visible[0].target.id);
			},
			{ rootMargin: "-80px 0px -70% 0px", threshold: 0 },
		);

		for (const el of headings) observer.observe(el);
		return () => observer.disconnect();
	}, [tocItems]);

	return (
		<div className="relative min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>
			<Navigation activePath="/docs" wide />
			<div className="relative w-full pt-16">
				<div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 lg:grid-cols-[240px_1fr_240px]">
					{/* Left sidebar */}
					<aside className="hidden border-r border-zinc-200 lg:block dark:border-zinc-800">
						<nav
							aria-label="Docs navigation"
							className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8"
						>
							{SIDEBAR.map((section) => (
								<div key={section.title} className="mb-8 last:mb-0">
									<p className="mb-3 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
										{section.title}
									</p>
									<ul className="flex flex-col gap-0.5">
										{section.items.map((item) => {
											const isActive = item.slug === activeSlug;
											return (
												<li key={item.slug}>
													<a
														href={getAssetPath(`/docs/${item.slug}`)}
														className={`block border-l border-transparent py-1.5 pl-3 text-sm transition-colors ${
															isActive
																? "border-zinc-900 font-medium text-zinc-900 dark:border-white dark:text-white"
																: "text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
														}`}
													>
														{item.label}
													</a>
												</li>
											);
										})}
									</ul>
								</div>
							))}
						</nav>
					</aside>

					{/* Main content */}
					<main id="main-content" className="min-w-0 px-6 py-12 lg:px-12 lg:py-16">
						{children}
					</main>

					{/* Right TOC */}
					<aside className="hidden border-l border-zinc-200 lg:block dark:border-zinc-800">
						<nav
							aria-label="On this page"
							className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10"
						>
							<p className="mb-4 font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
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
												className={`block border-l-2 pl-3 text-sm leading-snug transition-colors ${
													isActive
														? "border-zinc-900 font-medium text-zinc-900 dark:border-white dark:text-white"
														: "border-transparent text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
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
		</div>
	);
}
