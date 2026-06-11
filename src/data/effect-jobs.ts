export type Job = {
	company: string;
	role: string;
	location?: string;
	type?: string;
	url: string;
	note?: string;
	/** Path under /public/ (e.g. "/assets/effect-jobs-logos/acemate.svg") */
	logo?: string;
	/** Free-form pay range, e.g. "$150K – $200K" or "€80K – €120K" */
	payRange?: string;
	/** 1–2 sentence summary of the JOB POSTING — what the role entails day-to-day. Not a company blurb. */
	description?: string;
};

export type LogoCompany = {
	name: string;
	logo: string;
	url?: string;
	/** Optional height override as a CSS length (e.g. "1rem"). Defaults to 1.25rem. */
	h?: string;
	/** Force the logo to render as white via CSS filter (useful for colored raster logos). */
	invert?: boolean;
};

export const SUBMIT_URLS = {
	postJob:
		"https://github.com/mirelaprifti/effect-jobs/issues/new?template=post-a-job.yaml",
	addDeveloper:
		"https://github.com/mirelaprifti/effect-jobs/issues/new?template=add-yourself.yaml",
	discord: "https://discord.gg/effect-ts",
	repo: "https://github.com/mirelaprifti/effect-jobs",
};

export const JOBS: Job[] = [
	{
		company: "Expand.ai",
		role: "Founding Engineer",
		location: "San Francisco, USA",
		url: "https://expand.ai/careers/founding-engineer",
		logo: "/assets/effect-jobs-logos/expand-ai-icon.png",
		description: "Help turn the internet into a database.",
	},
	{
		company: "Freckle.io",
		role: "Full-stack Engineers",
		location: "San Francisco · Remote (exceptional cases)",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1457982486310027408",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/freckle-icon.png",
		payRange: "$160K – $210K + equity",
		description: "Help build a data-enrichment product for GTM teams.",
	},
	{
		company: "Gale",
		role: "SWE Intern",
		location: "Remote · CAN/US",
		url: "https://forms.galevisa.com/r/m6gr7e",
		logo: "/assets/effect-jobs-logos/gale-icon.png",
		payRange: "CAD 35–38/hr · USD 22–28/hr",
		description: "Help American businesses get work authorization for their employees.",
	},
	{
		company: "Goblins",
		role: "Product Founding Engineer",
		location: "Brooklyn, NYC",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1439740311277404231",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/goblins-icon.png",
		description: "Build America's favorite teacher, starting with K–12 math.",
	},
	{
		company: "HumanLayer",
		role: "Founding Product Engineer",
		location: "San Francisco",
		url: "https://workatastartup.com/jobs/84491",
		logo: "/assets/effect-jobs-logos/humanlayer.png",
		payRange: "$180K – $250K",
		description: "Help CTOs and VPEs drive the transition to 99% AI-written code in their engineering orgs.",
	},
	{
		company: "Joymore",
		role: "Backend and Full Stack Engineers",
		location: "Remote · prefer SF / Sacramento area",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1506377610073215118",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/joymore-icon.svg",
		description: "High-growth startup, small team — building agents/copilots with heavy pipeline and task orchestration.",
	},
	{
		company: "LEAP Legal Software",
		role: "Full-stack Engineer",
		location: "Sydney · Hybrid",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1512445948662386889",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/leap.svg",
		description: "Join the LEAP CRM team to work on a greenfield project, still in its early stages.",
	},
	{
		company: "ManageSpace",
		role: "Full Stack Engineer (mid-level)",
		location: "UK · US · Europe",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1509855152184627340",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/managespace-icon 1.png",
		description: "AI-native platform for commercial real estate operators.",
	},
	{
		company: "PhosPhor",
		role: "Engineers with Effect experience",
		location: "Remote · NYC",
		url: "https://phosphor.co/",
		logo: "/assets/effect-jobs-logos/phosphor-icon.png",
		description: "Building non-dilutive growth engines for industrial and climate technology companies.",
	},
	{
		company: "Reap",
		role: "Backend / Cloud Engineer",
		location: "HK · Remote-friendly",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1494185541233541270",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/reap.png",
		description: "Fintech using Effect as part of the stack — looking for strong engineers with a solid functional-programming background.",
	},
	{
		company: "SIWorks",
		role: "Senior Full-Stack Engineer",
		location: "Remote · Portland / Vancouver WA preferred",
		type: "Part-time",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1501997185309347840",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/siworks.png",
		description: "Small profitable startup — mortgage marketing and transportation software.",
	},
	{
		company: "Solid",
		role: "Early engineering team",
		location: "Bay Area",
		url: "https://discord.com/channels/795981131316985866/796153351372275743/1455623052636459209",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/solid.png",
		payRange: "$150K – $250K + equity",
		description: "Building a code-first framework — all focused on enabling non-technical users to ship production-quality code.",
	},
	{
		company: "Supermemory",
		role: "Founding Backend / Infrastructure Engineer",
		location: "San Francisco, CA · Hybrid",
		url: "https://x.com/i/jobs/1928194391946186862",
		logo: "/assets/effect-jobs-logos/supermemory-icon.png",
		payRange: "$90K – $250K",
		description: "The leading context and memory engine in the world, serving tens of thousands of customers.",
	},
	{
		company: "Superwall",
		role: "Full-stack Mobile Developer",
		location: "Remote · Europe preferred",
		url: "https://x.com/jakemor/status/1972770955500876070",
		logo: "/assets/effect-jobs-logos/sw-icon.png",
		payRange: "$130K Yr 1 → $175K Yr 2",
		description: "If you're passionate about mobile apps and monetization, we'd love to chat.",
	},
	{
		company: "Tranched",
		role: "Full-stack Engineer — Web3",
		location: "Paris · London · Amsterdam",
		url: "https://tranched.fi/careers/fullstack-developer-web3",
		logo: "/assets/effect-jobs-logos/tranched.png",
		description: "Automating the structuring and management of complex securitisation transactions.",
	},
	{
		company: "Trellis AI",
		role: "Product Engineer",
		location: "San Francisco",
		url: "https://www.ycombinator.com/companies/trellis-ai",
		logo: "/assets/effect-jobs-logos/trellis.png",
		description: "AI for automating healthcare paperwork.",
	},
];

/**
 * Companies that have posted Effect jobs — current openings and past hires.
 * Drop logos into `public/assets/jobs-logos/` and add an entry here.
 */
export const LOGO_COMPANIES: LogoCompany[] = [
	{
		name: "MasterClass",
		logo: "/assets/quotes-logos/masterclass-noM.svg",
		h: "1rem",
	},
	{
		name: "Vercel",
		logo: "/assets/quotes-logos/vercel-logotype-dark.svg",
	},
	{
		name: "Spiko",
		logo: "/assets/quotes-logos/spiko-logo.svg",
	},
	{
		name: "opencode",
		logo: "/assets/effect-jobs-logos/opencode-wordmark-dark.svg",
	},
	{
		name: "Embedded Insurance",
		logo: "/assets/effect-jobs-logos/embedded-insurance-logo.svg",
	},
	{
		name: "Inato",
		logo: "/assets/effect-jobs-logos/inato.png",
	},
	{
		name: "Interfere",
		logo: "/assets/effect-jobs-logos/intefere-white.svg",
		h: "1rem",
	},
	{
		name: "Manage Space",
		logo: "/assets/effect-jobs-logos/manage-space.svg",
		h: "0.75rem",
	},
	{
		name: "Platonic Systems",
		logo: "/assets/effect-jobs-logos/platonic-systems.svg",
		h: "1rem",
	},
	{
		name: "Precurion",
		logo: "/assets/effect-jobs-logos/precurion.png",
		h: "1rem",
	},
	{
		name: "Globe Commerce",
		logo: "/assets/effect-jobs-logos/globe-commerce.png",
	},
	{
		name: "Warp",
		logo: "/assets/effect-jobs-logos/warp.svg",
	},
	{
		name: "Samsung Food",
		logo: "/assets/effect-jobs-logos/samsung-food.svg",
		h: "1rem",
	},
	{
		name: "Tenzir",
		logo: "/assets/effect-jobs-logos/tenzir.svg",
		h: "1rem",
	},
	{
		name: "Acemate",
		logo: "/assets/effect-jobs-logos/acemate.png",
		h: "1rem",
		invert: true,
	},
	{
		name: "Wander",
		logo: "/assets/effect-jobs-logos/wander.svg",
	},
	{
		name: "Introw",
		logo: "/assets/effect-jobs-logos/introw.svg",
		h: "1rem",
	},
	{
		name: "Magentus",
		logo: "/assets/effect-jobs-logos/magentus 1.svg",
		h: "1rem",
	},
];
