import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { VersionSwitchLinks } from "@/components/ui/VersionSwitch";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import {
	API_PACKAGE_GROUPS,
	API_PACKAGES,
	type ApiPackage,
} from "./apiReferenceData";
import { DocsNavigation } from "./DocsNavigation";
import { Footer } from "./Footer";

function packageBySlug(slug: string): ApiPackage {
	const pkg = API_PACKAGES.find((p) => p.slug === slug);
	if (!pkg) throw new Error(`Unknown API package: ${slug}`);
	return pkg;
}

function npmUrl(pkg: ApiPackage): string {
	return `https://www.npmjs.com/package/${pkg.name}`;
}

function githubUrl(pkg: ApiPackage): string {
	const dir =
		pkg.slug === "ai"
			? "ai/ai"
			: pkg.slug.startsWith("ai-")
				? `ai/${pkg.slug.slice(3)}`
				: pkg.slug;
	return `https://github.com/Effect-TS/effect/tree/main/packages/${dir}`;
}

export type ApiTocItem = { id: string; label: string; depth: number };
export type ApiVersion = "v3" | "v4";

export function ApiReferenceLayout({
	activeSlug,
	activeModule,
	tocItems,
	version = "v3",
	children,
}: {
	activeSlug?: string;
	/** When set, the active package expands in the sidebar to list its modules. */
	activeModule?: string;
	tocItems?: ApiTocItem[];
	version?: ApiVersion;
	children: ReactNode;
}) {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (!tocItems || tocItems.length === 0) return;
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

	const toggleSection = (title: string) => {
		setOpenSections((prev) => {
			const currentlyOpen = prev[title] ?? true;
			return { ...prev, [title]: !currentlyOpen };
		});
	};

	return (
		<div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white">
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-100 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>
			<DocsNavigation section="api" />
			<div className="relative w-full pt-16">
				<div
					className={`mx-auto grid w-full max-w-[88rem] grid-cols-1 ${
						tocItems
							? "lg:grid-cols-[240px_1fr_240px]"
							: "lg:grid-cols-[240px_1fr]"
					}`}
				>
					{/* Left sidebar: packages */}
					<aside className="hidden border-r border-zinc-200 lg:block dark:border-zinc-800">
						<nav
							aria-label="API packages"
							className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-8"
						>
							{/* The version switch heads the sidebar: it scopes everything
							    below it, so it reads before the package tree. */}
							<div className="mb-5">
								<VersionSwitchLinks
									value={version}
									href={(v) => getAssetPath(`/docs/api/${v}`)}
									block
									aria-label="API reference version"
								/>
							</div>
							<a
								href={getAssetPath(`/docs/api/${version}`)}
								aria-current={activeSlug === undefined ? "page" : undefined}
								className={`mb-3 block rounded-md px-3 py-2 font-mono text-sm font-medium transition-colors ${
									activeSlug === undefined
										? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
										: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900/60 dark:hover:text-white"
								}`}
							>
								API reference
							</a>
							{version === "v4" && (
								<p className="px-1 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
									The v4 reference is coming soon.
								</p>
							)}
							{version === "v3" &&
								API_PACKAGE_GROUPS.map((group) => {
									const isOpen = openSections[group.title] ?? true;
									const panelId = `api-group-${group.title.toLowerCase().replace(/\s+/g, "-")}`;
									return (
										<div key={group.title} className="mb-1 last:mb-0">
											<button
												type="button"
												onClick={() => toggleSection(group.title)}
												aria-expanded={isOpen}
												aria-controls={panelId}
												className="flex w-full items-center justify-between py-2.5 font-mono text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
											>
												<span>{group.title}</span>
												<Icon
													name="chevron-down"
													className={`text-base transition-transform ${isOpen ? "rotate-180" : ""}`}
													aria-hidden="true"
												/>
											</button>
											{isOpen && (
												<ul id={panelId} className="flex flex-col gap-0.5 pb-4">
													{group.slugs.map((slug) => {
														const pkg = packageBySlug(slug);
														const isActive = slug === activeSlug;
														return (
															<li key={slug}>
																<a
																	href={getAssetPath(`/docs/api/v3/${slug}`)}
																	aria-current={
																		isActive && !activeModule
																			? "page"
																			: undefined
																	}
																	title={pkg.name}
																	className={`block truncate rounded-md py-1.5 pl-3 font-mono text-[13px] transition-colors ${
																		isActive
																			? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
																			: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
																	}`}
																>
																	{pkg.slug}
																</a>
																{isActive && activeModule && (
																	<ul className="mt-1 mb-2 ml-3 flex flex-col gap-0.5 border-l border-zinc-200 pl-2 dark:border-zinc-800">
																		{pkg.modules.map((mod) => {
																			const isActiveModule =
																				mod.name === activeModule;
																			return (
																				<li key={mod.name}>
																					<a
																						href={getAssetPath(mod.href)}
																						aria-current={
																							isActiveModule
																								? "page"
																								: undefined
																						}
																						className={`block truncate rounded py-1 pl-2 font-mono text-xs transition-colors ${
																							isActiveModule
																								? "bg-zinc-200 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
																								: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
																						}`}
																					>
																						{mod.name}
																					</a>
																				</li>
																			);
																		})}
																	</ul>
																)}
															</li>
														);
													})}
												</ul>
											)}
										</div>
									);
								})}
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
					{tocItems && (
						<aside className="hidden border-l border-zinc-200 lg:block dark:border-zinc-800">
							<nav
								aria-label="On this page"
								className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-8"
							>
								<p className="mb-4 font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300">
									On this page
								</p>
								<div className="mb-5 h-px bg-zinc-200 dark:bg-zinc-800" />
								<ul className="flex flex-col gap-2.5">
									{tocItems.map((item) => {
										const isActive = activeId === item.id;
										return (
											<li key={item.id}>
												<a
													href={`#${item.id}`}
													aria-current={isActive ? "location" : undefined}
													className={`block truncate text-sm leading-snug transition-colors ${
														item.depth > 0 ? "font-mono text-[13px]" : ""
													} ${
														isActive
															? "font-semibold text-zinc-900 dark:text-white"
															: "text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
													}`}
													style={{ paddingLeft: `${item.depth * 12}px` }}
												>
													{item.label}
												</a>
											</li>
										);
									})}
								</ul>
							</nav>
						</aside>
					)}
				</div>
			</div>
			<Footer activePath="/docs" />
			<GridOverlay />
		</div>
	);
}

function ModuleLink({ name, href }: { name: string; href: string }) {
	const isExternal = !href.startsWith("/");
	return (
		<a
			href={isExternal ? href : getAssetPath(href)}
			className="group flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
		>
			<span className="truncate font-mono text-sm text-zinc-800 group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white">
				{name}
			</span>
			<Icon
				name={isExternal ? "arrow-up-right" : "arrow-right"}
				className={`shrink-0 text-sm text-zinc-400 transition-opacity dark:text-zinc-500 ${
					isExternal ? "opacity-60" : "opacity-0 group-hover:opacity-100"
				}`}
				aria-hidden="true"
			/>
			{isExternal && <span className="sr-only">(external documentation)</span>}
		</a>
	);
}

function SearchInput({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
}) {
	return (
		<div className="search-pill flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-500 transition-colors focus-within:border-zinc-500 dark:border-zinc-600 dark:text-zinc-400 dark:focus-within:border-zinc-500">
			<Icon
				name="search"
				className="shrink-0 text-base font-medium"
				aria-hidden="true"
			/>
			<input
				type="search"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-label={placeholder}
				className="min-w-0 flex-1 bg-transparent text-zinc-900 placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-400"
			/>
		</div>
	);
}

export function ApiReferencePackagePage({ slug }: { slug: string }) {
	const pkg = packageBySlug(slug);
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return pkg.modules;
		return pkg.modules.filter((m) => m.name.toLowerCase().includes(q));
	}, [pkg, query]);

	const filteredNames = useMemo(
		() => new Set(filtered.map((m) => m.name)),
		[filtered],
	);
	const moduleByName = useMemo(
		() => new Map(pkg.modules.map((m) => [m.name, m])),
		[pkg],
	);

	const groups = pkg.moduleGroups
		?.map((group) => ({
			title: group.title,
			modules: group.modules
				.filter((name) => filteredNames.has(name))
				.map((name) => {
					const mod = moduleByName.get(name);
					if (!mod) throw new Error(`Unknown module in group: ${name}`);
					return mod;
				}),
		}))
		.filter((group) => group.modules.length > 0);

	return (
		<ApiReferenceLayout activeSlug={slug}>
			<article className="max-w-4xl">
				<nav
					aria-label="Breadcrumb"
					className="mb-6 font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
				>
					<a
						href={getAssetPath("/docs/api/v3")}
						className="transition-colors hover:text-zinc-900 dark:hover:text-white"
					>
						API Reference
					</a>
					<span className="mx-2" aria-hidden="true">
						/
					</span>
					<span className="text-zinc-900 dark:text-white">{pkg.name}</span>
				</nav>

				<h1 className="font-mono text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
					{pkg.name}
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					{pkg.description}
				</p>

				<div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
					<span className="font-mono">
						{pkg.modules.length} module{pkg.modules.length === 1 ? "" : "s"}
					</span>
					<a
						href={npmUrl(pkg)}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-900 dark:hover:text-white"
					>
						<i className="ri-npmjs-line text-base" aria-hidden="true" />
						npm
						<span className="sr-only">(opens in new tab)</span>
					</a>
					<a
						href={githubUrl(pkg)}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-900 dark:hover:text-white"
					>
						<i className="ri-github-line text-base" aria-hidden="true" />
						Source
						<span className="sr-only">(opens in new tab)</span>
					</a>
				</div>

				<div className="mt-10">
					<SearchInput
						value={query}
						onChange={setQuery}
						placeholder={`Search ${pkg.name} modules…`}
					/>
				</div>

				{filtered.length === 0 ? (
					<p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
						No modules match{" "}
						<span className="font-mono text-zinc-700 dark:text-zinc-300">
							“{query.trim()}”
						</span>
						.
					</p>
				) : groups ? (
					<div className="mt-10 space-y-14">
						{groups.map((group) => (
							<section key={group.title} aria-label={group.title}>
								<h2 className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
									{group.title}
								</h2>
								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
									{group.modules.map((mod) => (
										<ModuleLink
											key={mod.name}
											name={mod.name}
											href={mod.href}
										/>
									))}
								</div>
							</section>
						))}
					</div>
				) : (
					<div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
						{filtered.map((mod) => (
							<ModuleLink key={mod.name} name={mod.name} href={mod.href} />
						))}
					</div>
				)}
			</article>
		</ApiReferenceLayout>
	);
}

export function ApiReferenceIndexPage() {
	const [query, setQuery] = useState("");

	const q = query.trim().toLowerCase();
	const groups = API_PACKAGE_GROUPS.map((group) => ({
		title: group.title,
		packages: group.slugs
			.map(packageBySlug)
			.filter(
				(pkg) =>
					!q ||
					pkg.name.toLowerCase().includes(q) ||
					pkg.description.toLowerCase().includes(q),
			),
	})).filter((group) => group.packages.length > 0);

	return (
		<ApiReferenceLayout>
			<article className="max-w-4xl">
				<h1 className="text-3xl leading-tight font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
					API Reference
				</h1>
				<div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					<p>
						Effect is a powerful TypeScript library designed to help developers
						easily create complex, synchronous, and asynchronous programs. It
						consists of several packages that work together to help build robust
						TypeScript applications.
					</p>
					<p>
						The core package,{" "}
						<code className="rounded-md bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-zinc-900 dark:bg-zinc-700/60 dark:text-zinc-100">
							effect
						</code>
						, serves as the foundation, offering primitives for managing side
						effects, ensuring type safety, and supporting concurrency.
					</p>
				</div>

				<h2 className="mt-14 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
					Monorepo Structure
				</h2>
				<p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
					The Effect ecosystem is organized as a monorepo of packages, each
					extending the core functionality. Below is an overview of the packages
					included, organized by area.
				</p>

				<div className="mt-8">
					<SearchInput
						value={query}
						onChange={setQuery}
						placeholder="Search packages…"
					/>
				</div>

				{groups.length === 0 ? (
					<p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
						No packages match{" "}
						<span className="font-mono text-zinc-700 dark:text-zinc-300">
							“{query.trim()}”
						</span>
						.
					</p>
				) : (
					<div className="mt-10 space-y-14">
						{groups.map((group) => (
							<section key={group.title} aria-label={group.title}>
								<h2 className="mb-4 font-mono text-sm font-medium tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
									{group.title}
								</h2>
								<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
									{group.packages.map((pkg) => (
										<a
											key={pkg.slug}
											href={getAssetPath(`/docs/api/v3/${pkg.slug}`)}
											className="group rounded-md border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
										>
											<div className="flex items-center justify-between gap-2">
												<span className="truncate font-mono text-sm font-semibold text-zinc-900 dark:text-white">
													{pkg.name}
												</span>
												<span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
													{pkg.modules.length} modules
												</span>
											</div>
											<p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
												{pkg.description}
											</p>
										</a>
									))}
								</div>
							</section>
						))}
					</div>
				)}
			</article>
		</ApiReferenceLayout>
	);
}
