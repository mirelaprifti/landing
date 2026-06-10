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
		url: "https://expand.ai/careers/founding-engineer",
		logo: "/assets/effect-jobs-logos/expand-ai-icon.png",
	},
	{
		company: "Freckle.io",
		role: "Full-stack Engineers",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/freckle-icon.png",
	},
	{
		company: "Gale",
		role: "SWE Intern",
		location: "Remote · CAN/US",
		type: "Internship",
		url: "https://forms.galevisa.com/r/m6gr7e",
		logo: "/assets/effect-jobs-logos/gale-icon.png",
	},
	{
		company: "Goblins",
		role: "Product Founding Engineer",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/goblins-icon.png",
	},
	{
		company: "HumanLayer",
		role: "Founding Product Engineer",
		url: "https://workatastartup.com/jobs/84491",
		logo: "/assets/effect-jobs-logos/humanlayer.png",
	},
	{
		company: "Joymore",
		role: "Backend and Full Stack Engineers",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/joymore-icon.svg",
	},
	{
		company: "PhosPhor",
		role: "Engineers with Effect experience",
		url: "https://phosphor.co/",
		logo: "/assets/effect-jobs-logos/phosphor-icon.png",
	},
	{
		company: "Reap",
		role: "Backend / Cloud Engineer",
		location: "Remote-friendly · HK",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/reap.png",
	},
	{
		company: "Sellhub",
		role: "Backend Engineer",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/sellhub.png",
	},
	{
		company: "SIWorks",
		role: "Senior Full-Stack Engineer",
		type: "Part-time",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/siworks.png",
	},
	{
		company: "Solid",
		role: "Early engineering team",
		location: "Bay Area",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
		logo: "/assets/effect-jobs-logos/solid.png",
	},
	{
		company: "Supermemory",
		role: "Founding Backend / Infrastructure Engineer",
		url: "https://x.com/i/jobs/1928194391946186862",
		logo: "/assets/effect-jobs-logos/supermemory-icon.png",
	},
	{
		company: "Superwall",
		role: "Full-stack Mobile Developer",
		url: "https://x.com/jakemor/status/1972770955500876070",
		logo: "/assets/effect-jobs-logos/sw-icon.png",
	},
	{
		company: "Temper",
		role: "Founding Engineer",
		url: "https://news.ycombinator.com/item?id=47224903",
		logo: "/assets/effect-jobs-logos/temper.png",
	},
	{
		company: "Tranched",
		role: "Full-stack Engineer — Web3",
		url: "https://tranched.fi/careers/fullstack-developer-web3",
		logo: "/assets/effect-jobs-logos/tranched.png",
	},
	{
		company: "Trellis AI",
		role: "Product Engineer",
		location: "San Francisco",
		url: "https://www.ycombinator.com/companies/trellis-ai",
		logo: "/assets/effect-jobs-logos/trellis.png",
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
		url: "https://www.masterclass.com",
		h: "0.75rem",
	},
	{
		name: "Vercel",
		logo: "/assets/quotes-logos/vercel-logotype-dark.svg",
		url: "https://vercel.com",
	},
	{
		name: "Spiko",
		logo: "/assets/quotes-logos/spiko-logo.svg",
		url: "https://spiko.io",
	},
	{
		name: "Acemate",
		logo: "/assets/effect-jobs-logos/acemate.png",
		url: "https://acemate.ai",
		invert: true,
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
];
