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
	/** Optional height in tailwind units (h-5 = 20px). Defaults to 6. */
	h?: number;
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
		logo: "/assets/effect-jobs-logos/expand-ai.svg",
	},
	{
		company: "Freckle.io",
		role: "Full-stack Engineers",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "Gale",
		role: "SWE Intern",
		location: "Remote · CAN/US",
		type: "Internship",
		url: "https://forms.galevisa.com/r/m6gr7e",
	},
	{
		company: "Goblins",
		role: "Product Founding Engineer",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "HumanLayer",
		role: "Founding Product Engineer",
		url: "https://workatastartup.com/jobs/84491",
	},
	{
		company: "Joymore",
		role: "Backend and Full Stack Engineers",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "PhosPhor",
		role: "Engineers with Effect experience",
		url: "https://phosphor.co/",
	},
	{
		company: "Reap",
		role: "Backend / Cloud Engineer",
		location: "Remote-friendly · HK",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "Sellhub",
		role: "Backend Engineer",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "SIWorks",
		role: "Senior Full-Stack Engineer",
		type: "Part-time",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "Solid",
		role: "Early engineering team",
		location: "Bay Area",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
	},
	{
		company: "Supermemory",
		role: "Founding Backend / Infrastructure Engineer",
		url: "https://x.com/i/jobs/1928194391946186862",
	},
	{
		company: "Superwall",
		role: "Full-stack Mobile Developer",
		url: "https://x.com/jakemor/status/1972770955500876070",
	},
	{
		company: "Temper",
		role: "Founding Engineer",
		url: "https://news.ycombinator.com/item?id=47224903",
	},
	{
		company: "Tranched",
		role: "Full-stack Engineer — Web3",
		url: "https://tranched.fi/careers/fullstack-developer-web3",
	},
	{
		company: "Trellis AI",
		role: "Product Engineer",
		location: "San Francisco",
		url: "https://www.ycombinator.com/companies/trellis-ai",
	},
	{
		company: "Consumer Music Startup",
		role: "Effect Backend Consultant + Full-time Engineer",
		location: "New York City",
		url: "https://discord.gg/effect-ts",
		note: "Posted on Discord #job-board",
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
		h: 6,
	},
	{
		name: "Vercel",
		logo: "/assets/quotes-logos/vercel-logotype-dark.svg",
		url: "https://vercel.com",
		h: 5,
	},
	{
		name: "Spiko",
		logo: "/assets/quotes-logos/spiko-logo.svg",
		url: "https://spiko.io",
		h: 5,
	},
];
