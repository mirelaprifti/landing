// ── Types ────────────────────────────────────────────────────────

export type Category = "Article" | "Learning" | "Other" | "Tools" | "Video";

export const CATEGORIES: Category[] = [
	"Article",
	"Learning",
	"Other",
	"Tools",
	"Video",
];

/** URL-friendly slug for each category */
export const CATEGORY_SLUGS: Record<Category, string> = {
	Article: "articles",
	Learning: "learning",
	Other: "other",
	Tools: "tools",
	Video: "videos",
};

/** Reverse lookup: slug → category */
export const SLUG_TO_CATEGORY: Record<string, Category> = Object.fromEntries(
	Object.entries(CATEGORY_SLUGS).map(([cat, slug]) => [slug, cat as Category]),
) as Record<string, Category>;

/** Category accent colors (used for section headers, badges) */
export const CATEGORY_COLORS: Record<
	Category,
	{ text: string; bg: string; border: string; dot: string }
> = {
	Article: {
		text: "text-blue-400",
		bg: "bg-blue-500/10",
		border: "border-blue-500/20",
		dot: "bg-blue-400",
	},
	Learning: {
		text: "text-emerald-400",
		bg: "bg-emerald-500/10",
		border: "border-emerald-500/20",
		dot: "bg-emerald-400",
	},
	Other: {
		text: "text-zinc-400",
		bg: "bg-zinc-500/10",
		border: "border-zinc-500/20",
		dot: "bg-zinc-400",
	},
	Tools: {
		text: "text-amber-400",
		bg: "bg-amber-500/10",
		border: "border-amber-500/20",
		dot: "bg-amber-400",
	},
	Video: {
		text: "text-rose-400",
		bg: "bg-rose-500/10",
		border: "border-rose-500/20",
		dot: "bg-rose-400",
	},
};

/** Remixicon icon name for each category */
export const CATEGORY_ICONS: Record<Category, string> = {
	Article: "ri-article-line",
	Learning: "ri-graduation-cap-line",
	Other: "ri-shapes-line",
	Tools: "ri-tools-line",
	Video: "ri-play-circle-line",
};

/** Human-readable display names for each category */
export const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
	Article: "Articles",
	Learning: "Learning Effect",
	Other: "Other",
	Tools: "Tools",
	Video: "Videos",
};

export interface CommunityItem {
	/** Display title */
	title: string;
	/** Short description (1-2 sentences) */
	description: string;
	/** External URL */
	url: string;
	/** Category for filtering */
	category: Category;
	/** Author or organization name */
	author: string;
	/** Author URL (GitHub, Twitter, personal site) */
	authorUrl?: string;
	/** Optional tags for display on cards */
	tags?: string[];
	/** Date added (YYYY-MM-DD) — used for sorting */
	dateAdded: string;
	/** Whether to feature this item at the top */
	featured?: boolean;
	/** Thumbnail image URL (e.g. YouTube thumbnail) */
	thumbnail?: string;
}

// ── Data ─────────────────────────────────────────────────────────

export const COMMUNITY_ITEMS: CommunityItem[] = [
	// ── Featured ──────────────────────────────────────────────────
	{
		title: "The Simple Secret Behind Effect's Power",
		description:
			"A clear breakdown of the core idea that makes Effect so powerful — and why it changes how you think about TypeScript.",
		url: "https://www.youtube.com/watch?v=F5aWLtEdNjE&t=10s",
		category: "Video",
		author: "Kit Langton",
		authorUrl: "https://www.youtube.com/@kitlangton",
		tags: ["Beginner", "Concepts"],
		dateAdded: "2024-06-15",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/F5aWLtEdNjE/hqdefault.jpg",
	},
	{
		title: "Effect: the unreadable library that captured my heart",
		description:
			"A personal journey into Effect — from skepticism to understanding why its approach to TypeScript is worth the learning curve.",
		url: "https://www.youtube.com/watch?v=S2GChOwivwQ&t=52s",
		category: "Video",
		author: "Matt Pocock",
		authorUrl: "https://www.youtube.com/@mattpocockuk",
		tags: ["Overview", "Beginner"],
		dateAdded: "2024-08-10",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/S2GChOwivwQ/hqdefault.jpg",
	},
	{
		title: "Claude Code from Scratch with Effect",
		description:
			"Building a project from scratch using Claude Code and Effect — showcasing AI-assisted development with Effect's type-safe APIs.",
		url: "https://www.youtube.com/watch?v=aueu9lm2ubo",
		category: "Video",
		author: "Kit Langton",
		authorUrl: "https://www.youtube.com/@kitlangton",
		tags: ["AI", "Live Coding"],
		dateAdded: "2025-06-01",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/aueu9lm2ubo/hqdefault.jpg",
	},
	{
		title: "Theo should use Effect",
		description:
			"A compelling case for why Effect belongs in every TypeScript developer's toolkit — addressing common objections and showing real benefits.",
		url: "https://www.youtube.com/watch?v=kYAjBvt03xw",
		category: "Video",
		author: "Ethan Niser",
		authorUrl: "https://www.youtube.com/@ethanniser",
		tags: ["Overview", "Advocacy"],
		dateAdded: "2024-12-01",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/kYAjBvt03xw/hqdefault.jpg",
	},
	{
		title: "Dependency Injection Has Never Been This Easy in TypeScript",
		description:
			"How Effect's Layer system makes dependency injection intuitive and type-safe — no decorators or reflection needed.",
		url: "https://www.youtube.com/watch?v=YHmioxgxQY8",
		category: "Video",
		author: "Lucas Barake",
		authorUrl: "https://www.youtube.com/@lucas-barake",
		tags: ["Dependency Injection", "Layers"],
		dateAdded: "2024-11-15",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/YHmioxgxQY8/hqdefault.jpg",
	},
	{
		title: "Maybe I Was Wrong About Effect...",
		description:
			"A developer revisits Effect after initial skepticism — exploring whether the library's benefits truly outweigh the learning curve.",
		url: "https://www.youtube.com/watch?v=MHpf_XMz_aM",
		category: "Video",
		author: "Ben Davis",
		authorUrl: "https://www.youtube.com/@bmdavis419",
		tags: ["Review", "Beginner"],
		dateAdded: "2024-10-20",
		featured: true,
		thumbnail: "https://i.ytimg.com/vi/MHpf_XMz_aM/hqdefault.jpg",
	},

	// ── Tools & Libraries ────────────────────────────────────────
	{
		title: "effect-sql",
		description:
			"Type-safe SQL client for Effect with support for PostgreSQL, MySQL, SQLite, and MSSQL.",
		url: "https://github.com/Effect-TS/effect/tree/main/packages/sql",
		category: "Tools",
		author: "Tim Smart",
		authorUrl: "https://github.com/tim-smart",
		tags: ["SQL", "Database"],
		dateAdded: "2024-04-15",
	},
	{
		title: "effect-opentelemetry",
		description:
			"OpenTelemetry integration for Effect — automatic tracing, metrics, and context propagation.",
		url: "https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry",
		category: "Tools",
		author: "Tim Smart",
		authorUrl: "https://github.com/tim-smart",
		tags: ["Observability", "Tracing"],
		dateAdded: "2024-05-20",
	},
	{
		title: "effect-rpc",
		description:
			"Type-safe RPC framework for Effect with automatic serialization, error propagation, and streaming support.",
		url: "https://github.com/Effect-TS/effect/tree/main/packages/rpc",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["RPC", "Networking"],
		dateAdded: "2024-06-01",
	},
	{
		title: "effect-cluster",
		description:
			"Distributed systems primitives for Effect — virtual actors, sharding, and distributed pub/sub.",
		url: "https://github.com/Effect-TS/effect/tree/main/packages/cluster",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Distributed", "Clustering"],
		dateAdded: "2024-07-10",
	},
	{
		title: "sqlfx",
		description:
			"Community SQL toolkit for Effect with query builder, migrations, and connection pool management.",
		url: "https://github.com/tim-smart/sqlfx",
		category: "Tools",
		author: "Tim Smart",
		authorUrl: "https://github.com/tim-smart",
		tags: ["SQL", "Database"],
		dateAdded: "2024-02-28",
	},
	{
		title: "Effect MCP Server",
		description:
			"Model Context Protocol server built with Effect — connect LLMs to your Effect services.",
		url: "https://github.com/tim-smart/effect-mcp",
		category: "Tools",
		author: "Tim Smart",
		authorUrl: "https://github.com/tim-smart",
		tags: ["AI", "MCP"],
		dateAdded: "2024-11-10",
	},
	{
		title: "Effect Playground",
		description:
			"Browser-based interactive playground for experimenting with Effect code — instant feedback with full type checking.",
		url: "https://effect.website/play/",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Playground"],
		dateAdded: "2024-01-01",
	},
	{
		title: "Effect VS Code Extension",
		description:
			"Official VS Code extension with Effect-specific diagnostics, quick fixes, and pipeline visualization.",
		url: "https://marketplace.visualstudio.com/items?itemName=effectful-tech.effect-vscode",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["VS Code", "Developer Tools"],
		dateAdded: "2024-08-20",
	},
	{
		title: "Effect DevTools",
		description:
			"Browser extension for inspecting Effect fiber trees, tracing spans, and debugging concurrent workflows.",
		url: "https://github.com/Effect-TS/effect/tree/main/packages/experimental",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Debugging"],
		dateAdded: "2024-07-15",
	},
	{
		title: "Effect LSP",
		description:
			"Language server for Effect providing rich editor support — go-to-definition, hover info, and refactoring across Effect APIs.",
		url: "https://github.com/Effect-TS/language-service",
		category: "Tools",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["LSP", "Developer Tools"],
		dateAdded: "2024-09-15",
	},

	// ── Video ────────────────────────────────────────────────────
	{
		title: "Why Effect Is Taking Over TypeScript",
		description:
			"An overview of why Effect is gaining traction and how it solves real problems in production TypeScript codebases.",
		url: "https://www.youtube.com/watch?v=SloZE4i4Zfk",
		category: "Video",
		author: "Theo Browne",
		authorUrl: "https://twitter.com/t3dotgg",
		tags: ["Overview", "Beginner"],
		dateAdded: "2024-07-20",
	},
	{
		title: "Effect for React Developers",
		description:
			"How to integrate Effect into React applications for data fetching, state management, and error boundaries.",
		url: "https://www.youtube.com/watch?v=zrNr3JVUc8I",
		category: "Video",
		author: "Ethan Niser",
		authorUrl: "https://twitter.com/ethanniser",
		tags: ["React", "Intermediate"],
		dateAdded: "2024-08-05",
	},
	{
		title: "Building a Full-Stack App with Effect",
		description:
			"Live-coding a complete application using Effect for both server and client, with RPC and Schema.",
		url: "https://www.youtube.com/watch?v=grRHGQSn3hQ",
		category: "Video",
		author: "Michael Arnaldi",
		authorUrl: "https://github.com/mikearnaldi",
		tags: ["Full-Stack", "Advanced"],
		dateAdded: "2024-09-12",
	},
	{
		title: "Concurrency in Effect",
		description:
			"Deep dive into fibers, structured concurrency, and how Effect manages concurrent operations safely.",
		url: "https://www.youtube.com/watch?v=PW_7bTgJweg",
		category: "Video",
		author: "Tim Smart",
		authorUrl: "https://github.com/tim-smart",
		tags: ["Concurrency", "Advanced"],
		dateAdded: "2024-10-01",
	},
	{
		title: "Reimagining TypeScript with Effect",
		description:
			"Michael Arnaldi's keynote on the vision behind Effect and how it pushes TypeScript to its limits.",
		url: "https://www.youtube.com/watch?v=zrNr3JVUc8I",
		category: "Video",
		author: "Michael Arnaldi",
		authorUrl: "https://github.com/mikearnaldi",
		tags: ["Keynote"],
		dateAdded: "2024-03-16",
	},
	{
		title: "Scaling Effect at Effectful Technologies",
		description:
			"How the team behind Effect uses it internally to build production infrastructure and developer tools.",
		url: "https://www.youtube.com/watch?v=PW_7bTgJweg",
		category: "Video",
		author: "Maxwell Brown",
		authorUrl: "https://github.com/imax153",
		tags: ["Production", "Architecture"],
		dateAdded: "2024-03-17",
	},
	{
		title: "Effect Days Conference Talks",
		description:
			"All recorded talks from Effect Days — covering core concepts, ecosystem libraries, and real-world use cases.",
		url: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B-lRhTEEQ9vXCOsWDAboy_m",
		category: "Video",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Conference"],
		dateAdded: "2024-03-15",
	},
	{
		title: "Intro to Effect with TypeScript",
		description:
			"Free video course walking through Effect from zero, with exercises and real-world examples.",
		url: "https://www.youtube.com/playlist?list=PLDf3uQLaK2B9DLv6bR7xfAtCtiCf4Osp5",
		category: "Video",
		author: "Sandro Maglione",
		authorUrl: "https://twitter.com/SandroMaworx",
		tags: ["Beginner", "Course"],
		dateAdded: "2024-05-25",
	},

	// ── Learning ─────────────────────────────────────────────────
	{
		title: "Effect: A Practical Introduction",
		description:
			"Comprehensive written guide to Effect covering error handling, dependency injection, concurrency, and real-world patterns.",
		url: "https://effect.website/docs/getting-started/introduction/",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Beginner", "Official"],
		dateAdded: "2024-01-10",
	},
	{
		title: "Building REST APIs with Effect",
		description:
			"Step-by-step tutorial for building production-grade REST APIs using Effect's HTTP platform and Schema.",
		url: "https://effect.website/docs/guides/http-server/",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["HTTP", "API"],
		dateAdded: "2024-05-01",
	},
	{
		title: "Error Handling in Effect",
		description:
			"Learn how Effect's typed error channel gives you exhaustive error handling without try-catch boilerplate.",
		url: "https://effect.website/docs/guides/error-management/two-error-types/",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Error Handling", "Beginner"],
		dateAdded: "2024-02-15",
	},
	{
		title: "Dependency Injection with Layers",
		description:
			"How to use Effect's Layer system for compile-time safe dependency injection and modular service composition.",
		url: "https://effect.website/docs/guides/context-management/layers/",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Layers", "Intermediate"],
		dateAdded: "2024-04-10",
	},
	{
		title: "Effect Schema: Validation & Serialization",
		description:
			"A deep dive into @effect/schema for runtime validation, encoding/decoding, and type-safe data transformations.",
		url: "https://effect.website/docs/guides/schema/introduction/",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["Schema", "Validation"],
		dateAdded: "2024-03-05",
	},
	{
		title: "Effect + Next.js Starter",
		description:
			"Template combining Effect with Next.js for full-stack TypeScript applications with type-safe API routes.",
		url: "https://github.com/ethanniser/effect-nextjs-template",
		category: "Learning",
		author: "Ethan Niser",
		authorUrl: "https://twitter.com/ethanniser",
		tags: ["Next.js", "Template"],
		dateAdded: "2024-09-01",
	},
	{
		title: "Effect HTTP API Template",
		description:
			"Production-ready template for building HTTP APIs with Effect, including auth, database, and OpenAPI docs.",
		url: "https://github.com/Effect-TS/examples",
		category: "Learning",
		author: "Effect Team",
		authorUrl: "https://github.com/Effect-TS",
		tags: ["HTTP", "Template"],
		dateAdded: "2024-08-15",
	},

	// ── Articles ─────────────────────────────────────────────────
	{
		title: "Effect vs. fp-ts: A Migration Guide",
		description:
			"Practical comparison between fp-ts and Effect, with a step-by-step migration path for existing codebases.",
		url: "https://effect.website/blog/fp-ts-to-effect/",
		category: "Article",
		author: "Giulio Canti",
		authorUrl: "https://github.com/gcanti",
		tags: ["fp-ts", "Migration"],
		dateAdded: "2024-04-20",
	},
	{
		title: "Why We Chose Effect at Scale",
		description:
			"An engineering team's experience adopting Effect in production — what worked, what didn't, and what they'd do differently.",
		url: "https://dev.to/effect/why-effect-4k7f",
		category: "Article",
		author: "Sandro Maglione",
		authorUrl: "https://twitter.com/SandroMaworx",
		tags: ["Production", "Case Study"],
		dateAdded: "2024-11-05",
	},
	{
		title: "Typed Errors Are Underrated",
		description:
			"Why modeling errors in the type system matters, and how Effect makes it ergonomic with tagged unions and typed channels.",
		url: "https://ethanniser.dev/blog/effect-typed-errors/",
		category: "Article",
		author: "Ethan Niser",
		authorUrl: "https://twitter.com/ethanniser",
		tags: ["Error Handling", "TypeScript"],
		dateAdded: "2024-06-30",
	},
];
