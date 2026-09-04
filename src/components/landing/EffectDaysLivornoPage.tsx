import { useState } from "react";
import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { EffectDaysNavigation } from "./EffectDaysNavigation";
import { EnjoyEffectDaysCTA } from "./EnjoyEffectDaysCTA";
import { Footer } from "./Footer";
import { SaveToCalendar } from "./SaveToCalendar";

/* Canonical text styles copied verbatim from TypographyStyleguidePage (/styleguide). */
const text = {
	pageTitle:
		"leading-[1.1] text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-white",
	eyebrow:
		"mb-3 font-mono text-sm font-medium tracking-wider text-zinc-600 uppercase dark:text-zinc-400",
	sectionTitle:
		"leading-tighter text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white",
	subtitle: "mt-4 text-lg text-zinc-600 dark:text-zinc-400",
	cardTitle: "text-lg font-semibold text-zinc-900 dark:text-white",
	smallHeading: "text-base font-semibold text-zinc-900 dark:text-white",
	body: "text-base leading-relaxed text-zinc-600 dark:text-zinc-400",
	cardBody: "mt-1 text-sm leading-normal text-zinc-600 dark:text-zinc-400",
	micro:
		"font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400",
};

/* Styleguide chrome strings — copy verbatim. */
const container = "mx-auto w-full max-w-[73.75rem] px-4";
/* Mobile rhythm is tighter than the styleguide's py-24: 64 top and bottom, so
   consecutive sections sit 128px apart instead of 192px. Desktop is unchanged. */
const sectionRhythm = "pt-16 pb-16 md:pt-40 md:pb-24";
/* Boxed mono label — the "Early bird" and per-pass tags in the tickets section,
   matching the timeline's "Next stop" chip. */
const chip =
	"border border-zinc-400 bg-white px-2 py-0.5 dark:border-zinc-600 dark:bg-zinc-950";

const PROGRAM = [
	{
		step: "01",
		day: "Wed",
		date: "Dec 9",
		title: "Effect Workshop",
		description: "Full-day sessions led by Effect experts.",
	},
	{
		step: "02",
		day: "Thu",
		date: "Dec 10",
		title: "Effect Conference",
		description: "Engaging talks, afterparty & swags!",
	},
	{
		step: "03",
		day: "Fri",
		date: "Dec 11",
		title: "Community Day",
		description: "More learning, networking, and fun!",
	},
];

/* Confirmed speakers, in announcement order. A card with no `photo` yet falls
   back to the initials placeholder below and switches over on its own once a
   path is dropped in. Four across on desktop, so the last row runs short at any
   count that is not a multiple of four. */
const SPEAKERS: {
	name: string;
	role: string;
	company: string;
	photo?: string;
	/** X handle, without the @. The card shows the icon only where one is set. */
	x?: string;
}[] = [
	{
		name: "Dillon Mulroy",
		role: "Principal Engineer",
		company: "Cloudflare",
		photo: "/assets/effect-days/dillon-mulroy.png",
		x: "dillon_mulroy",
	},
	{
		name: "Kit Langton",
		role: "+9,000x Developer",
		company: "OpenCode",
		photo: "/assets/effect-days/kit-langton.png",
		x: "kitlangton",
	},
	{
		name: "Rhys Sullivan",
		role: "Founder",
		company: "Executor",
		photo: "/assets/effect-days/rhys-sullivan.png",
		x: "RhysSullivan",
	},
	{
		name: "Leonie Gräßel",
		role: "Founder",
		company: "Novelcrafter",
		photo: "/assets/effect-days/leonie-2.png",
		x: "spaceemotion",
	},
	{
		name: "Kyle Mistele",
		role: "CTO",
		company: "HumanLayer",
		photo: "/assets/effect-days/kyle-mistele.png",
		x: "0xblacklight",
	},
	{
		name: "Adam Rankin",
		role: "CTO",
		company: "Warp",
		photo: "/assets/effect-days/adam-rankin.png",
		x: "rankintweets",
	},
	{
		name: "Sam Goodwin",
		role: "Founder",
		company: "Alchemy",
		photo: "/assets/effect-days/sam-goodwin.png",
		x: "samgoodwin89",
	},
	{
		name: "Devin Jameson",
		role: "Creator",
		company: "Foldkit",
		photo: "/assets/effect-days/devin-jameson.jpg",
		x: "devinjameson",
	},
	{
		name: "John A. De Goes",
		role: "CEO",
		company: "Ziverge",
		photo: "/assets/effect-days/jdg.png",
		x: "jdegoes",
	},
	{
		name: "Michael Arnaldi",
		role: "Creator",
		company: "Effect",
		photo: "/assets/effect-days/mike-race.png",
		x: "MichaelArnaldi",
	},
];

/* Early bird runs first. False once regular pricing starts, which drops the
   tag from the pass chips, prices the purchase rows at the regular figure with
   no strike-through, and restores the group-discount note under the passes.
   The early-bird figures stay on the passes below so the period can be run
   again for a future edition without re-entering them. */
const EARLY_BIRD_ON_SALE = false;

/* Prices carry both figures; which one is live is EARLY_BIRD_ON_SALE's call. */
const PASSES: {
	name: string;
	days: { date: string; name: string; included: boolean }[];
	/** Brighter border — marks the pass to buy. It moves when one sells out,
	 *  rather than drawing the eye to something nobody can take. */
	featured: boolean;
	/** Gone. The chip says so and the purchase rows give way to an inert one;
	 *  the day list stays, since what the pass covered is still worth reading. */
	soldOut?: boolean;
	pricing: {
		self: { earlyBird: string; regular: string; url: string };
		business: { earlyBird: string; regular: string; url: string };
	};
}[] = [
	{
		name: "Workshop, Conference & Community Pass",
		days: [
			{ date: "Dec 9", name: "Workshop Day", included: true },
			{ date: "Dec 10", name: "Conference Day", included: true },
			{ date: "Dec 11", name: "Community Day", included: true },
		],
		featured: false,
		soldOut: true,
		pricing: {
			self: {
				earlyBird: "€349",
				regular: "€449",
				url: "https://book.stripe.com/dRm6oH1Ncf6z9eJgF39oc0P",
			},
			business: {
				earlyBird: "€549",
				regular: "€649",
				url: "https://book.stripe.com/9B68wPgI6bUnbmRagF9oc0N",
			},
		},
	},
	{
		name: "Conference & Community Pass",
		days: [
			{ date: "Dec 9", name: "Workshop Day", included: false },
			{ date: "Dec 10", name: "Conference Day", included: true },
			{ date: "Dec 11", name: "Community Day", included: true },
		],
		featured: true,
		pricing: {
			self: {
				earlyBird: "€249",
				regular: "€299",
				url: "https://book.stripe.com/7sY00j77wbUnfD760p9oc0K",
			},
			business: {
				earlyBird: "€399",
				regular: "€449",
				url: "https://book.stripe.com/bJedR94ZobUnduZ3Sh9oc0O",
			},
		},
	},
];

/* Sponsors, grouped by tier. Rank is carried by how much of the row a frame
   takes and by how tall it stands — a main sponsor gets a half, the partner a
   half, the whole community tier one full-width frame — so the ladder reads at
   a glance and a tier can be added without a new visual device.

   Every mark renders in a single ink (see SponsorLogo). A sponsor's own colour
   would rank it by palette rather than by tier: the loudest brand in the list
   would read as the biggest backer whatever row it sat in. That also means one
   file per sponsor — no light/dark pair, since the ink follows the theme. */

const SPONSOR_TIERS: {
	tier: string;
	/** Columns the row splits into — the width step between tiers. Unset on a
	 *  grouped tier, which is a single tile however many marks it holds. */
	cols?: string;
	/** Whole tier in one tile, sharing a frame and a chip, rather than a tile
	 *  per sponsor. */
	grouped?: boolean;
	/** Tile padding and logo-to-chip gap — the height step between tiers. */
	tileClass: string;
	/** Fixed logo slot, one per tier, so marks in a tier line up however tall
	 *  each one is set. */
	logoBox: string;
}[] = [
	{
		tier: "Main sponsor",
		cols: "grid-cols-1 sm:grid-cols-2 lg:gap-8",
		tileClass: "py-12 gap-4",
		logoBox: "h-12",
	},
	{
		tier: "Partner",
		cols: "grid-cols-1 sm:grid-cols-2 lg:gap-8",
		tileClass: "py-9 gap-4",
		logoBox: "h-12",
	},
	{
		/* A community mark does not carry a frame of its own: the tier shares one,
		   under one chip. That keeps the ladder honest as the tier grows — five
		   small tiles would out-weigh the two above them by sheer count, where one
		   box holding five marks still reads as the bottom rung. */
		tier: "Community",
		grouped: true,
		tileClass: "py-7 gap-5",
		logoBox: "h-12",
	},
];

const SPONSORS: {
	name: string;
	/** Tier, shown as a chip on the tile; keys the row it lands in. */
	tier: string;
	/** Any colour: it is flattened to the wall's ink. Marks with a knockout
	 *  need the cut-out to be transparent rather than a light fill, or it
	 *  flattens shut along with everything else. */
	logo: string;
	/** Capped per mark, by eye, so marks set at different proportions read at
	 *  the same optical size. */
	logoHeight: string;
	websiteUrl: string;
}[] = [
	{
		name: "Effectful",
		tier: "Main sponsor",
		logo: "/assets/effect-days/Effectful-white.svg",
		/* Effectful's wordmark is short and heavy, so it runs taller than Ziverge's
		   wider lockup for the two to read at the same size. */
		logoHeight: "h-12",
		websiteUrl: "https://effectful.co/",
	},
	{
		name: "Ziverge",
		tier: "Main sponsor",
		logo: "/assets/effect-days/ziverge.svg",
		logoHeight: "h-8",
		websiteUrl: "https://www.ziverge.com/",
	},
	{
		name: "Betalyra",
		tier: "Partner",
		logo: "/assets/effect-days/betalyra-dark.svg",
		logoHeight: "h-12",
		websiteUrl: "https://betalyra.com/",
	},
	{
		name: "Novelcrafter",
		tier: "Community",
		logo: "/assets/effect-days/novelcrafter.svg",
		/* Its lockup is nearly five times as wide as it is tall, so it caps
		   shorter than Betalyra's to sit at the same optical size. */
		logoHeight: "h-8",
		websiteUrl: "https://www.novelcrafter.com/",
	},
	{
		name: "Executor",
		tier: "Community",
		/* Its own file ships the disc solid with a light glyph on top, which the
		   ink flattens shut. This one cuts the glyph out of the disc instead, so
		   the tile shows through it in either theme. */
		logo: "/assets/effect-days/executor-mono.png",
		logoHeight: "h-8",
		websiteUrl: "https://executor.sh/",
	},
	{
		name: "August",
		tier: "Community",
		logo: "/assets/effect-days/august.png",
		/* Serif caps and no icon-side padding make it read large, so it caps a
		   step shorter than the two marks beside it. */
		logoHeight: "h-7",
		websiteUrl: "https://www.augusthealth.com/",
	},
];

const EDITIONS = [
	{
		year: "2024",
		location: "Vienna, Austria",
		dates: "Feb 22-24",
		status: "past",
		note: "Where the Effect community gathered for the first time: 15 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B_XZ8k3gD8R1k4-LBz8JmHP",
		image: "/assets/effect-days/ed-24-2.png",
		/* Greyscale strips the tint baked into this file, so the CSS duotone below
		   is the single source of the effect on every edition photo. */
		tint: true,
	},
	{
		year: "2025",
		location: "Livorno, Italy",
		dates: "Mar 19-21",
		status: "past",
		note: "Advanced use cases and real production stories: 19 talks, 2 workshops.",
		playlistUrl:
			"https://www.youtube.com/playlist?list=PLDf3uQLaK2B9vHzUNyvOSvoMv61LW7792",
		image: "/assets/effect-days/ed-25-3.png",
		tint: true,
	},
	{
		year: "2026",
		location: "Livorno, Italy",
		dates: "Dec 9-11",
		status: "next",
		note: "The 3rd edition. Back to the Tuscan coast, and you're invited.",
		playlistUrl: null,
		image: null,
		tint: false,
	},
];

const FAQS: Array<{ question: string; answer: React.ReactNode }> = [
	{
		question: "1. What is Effect Days?",
		answer: (
			<>
				Effect Days is a non-profit event dedicated to{" "}
				<Link href="https://effect.website" variant="inline">
					Effect
				</Link>
				, an open-source software library that offers an ecosystem of tools for
				building production-grade applications in TypeScript.
			</>
		),
	},
	{
		question: "2. When and where is Effect Days taking place?",
		answer: (
			<>
				Effect Days will take place on December 9-11, 2026 at{" "}
				<Link
					href="https://www.google.com/maps/search/?api=1&query=Palazzo+Pancaldi+Livorno"
					variant="inline"
				>
					Palazzo Pancaldi
				</Link>
				, Viale Italia, 56, 57127 Livorno LI, Italy.
			</>
		),
	},
	{
		question: "3. What is the schedule of the conference?",
		answer:
			"The conference schedule will be shared as we get closer to the event.",
	},
	{
		question: "4. Will the Effect Days conference be recorded?",
		answer: (
			<>
				The conference talks will be recorded and published on the{" "}
				<Link href="https://www.youtube.com/@effect-ts" variant="inline">
					Effect YouTube channel
				</Link>{" "}
				a few weeks later. In the meantime you can subscribe to our YouTube,
				follow{" "}
				<Link href="https://x.com/EffectTS_" variant="inline">
					Effect on X (Twitter)
				</Link>
				, or{" "}
				<Link href="https://discord.gg/effect-ts" variant="inline">
					join the community
				</Link>{" "}
				to stay updated.
			</>
		),
	},
	{
		question: "5. What is the Community Day?",
		answer:
			"Effect Days isn't just about talks, it's about real connections. The Community Day on December 11th is a full day dedicated to deeper discussions, networking, and community activities.",
	},
	{
		question: "6. Can I get a refund for my ticket?",
		answer: (
			<>
				Please refer to our{" "}
				<Link
					href={getAssetPath("/effect-days/refund-policy")}
					variant="inline"
				>
					Refund Policy
				</Link>{" "}
				for more details.
			</>
		),
	},
	{
		question: "7. How do I get to Livorno?",
		answer: (
			<>
				The closest airport is Pisa (PSA), about 30 minutes away by train or
				car. Florence (FLR) is roughly 90 minutes away. Livorno Centrale station
				has direct rail connections to both. See{" "}
				<Link
					href={getAssetPath("/effect-days/about-livorno#airports")}
					variant="inline"
				>
					the nearest airports
				</Link>{" "}
				for details.
			</>
		),
	},
	{
		question: "8. Is there a Code of Conduct?",
		answer: (
			<>
				Yes. Effect Days is dedicated to providing a harassment-free experience
				for everyone. Please read our{" "}
				<Link
					href={getAssetPath("/effect-days/code-of-conduct")}
					variant="inline"
				>
					Code of Conduct
				</Link>
				.
			</>
		),
	},
];

/* FAQs are split down the middle so each column opens independently. */
const FAQ_SPLIT = Math.ceil(FAQS.length / 2);

/* Stands in for the purchase rows once a pass is gone. It grows to fill the
   block, so it covers exactly the ground the purchase rows opposite it cover
   and the two cards read as a matched pair. Dashed outline and muted text
   rather than the buttons' ring — nothing here is clickable and none of it
   should look like it is. */
function SoldOutRow() {
	return (
		<p className="flex w-full flex-1 items-center justify-center border border-dashed border-zinc-300 px-4 py-4 text-base font-medium text-zinc-500 md:px-6 dark:border-zinc-700 dark:text-zinc-400">
			Sold out
		</p>
	);
}

/* Purchase row — a full-width Button; renders as an anchor once the Stripe
   checkout URL is filled in on the pass, and as a <button> until then. */
function PurchaseRow({
	label,
	passName,
	price,
}: {
	label: string;
	/** Named in the accessible label — without it the four buttons on this
	 *  section announce as "Buy self-pay / Buy business" twice over, with
	 *  nothing to say which pass they belong to. */
	passName: string;
	price: { earlyBird: string; regular: string; url: string | null };
}) {
	/* Spoken form of the row: the pass it buys, the payment route without its
	   footnote marker, and — while early bird runs — the struck-through price
	   named as the old one rather than read out as a second live price. */
	const route = label.replace(/\*$/, "");
	const ariaLabel = EARLY_BIRD_ON_SALE
		? `Buy the ${passName}, ${route}, ${price.earlyBird} early bird, reduced from ${price.regular}`
		: `Buy the ${passName}, ${route}, ${price.regular}`;

	const content = (
		<>
			<span className="flex items-baseline gap-2">
				Buy {label}
				{/* The separator sits back from the words it divides. */}
				<span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
					·
				</span>
				{/* Off early bird there is no old price to strike, so the regular
				    figure is simply the price. */}
				{EARLY_BIRD_ON_SALE && (
					<span className="text-sm text-zinc-500 line-through dark:text-zinc-400">
						{price.regular}
					</span>
				)}
				<span className="text-base font-semibold">
					{EARLY_BIRD_ON_SALE ? price.earlyBird : price.regular}
				</span>
			</span>
			{/* Trailing arrow marks the row as something that goes somewhere —
			    the affordance a touch device can't get from hover. */}
			<Icon
				name="arrow-up-right"
				className="shrink-0 text-zinc-500 dark:text-zinc-400"
				aria-hidden="true"
			/>
		</>
	);

	/* Three call-site overrides on the button:
	   - px-4 below md, or "Buy business*" plus both prices wraps at 390px;
	   - text-base against xl's text-lg, which is here for the padding only —
	     at 20px the label outweighs the pass title above it;
	   - a brighter inset-ring than secondary's zinc-300/700, so the purchase
	     rows hold the eye. Button never uses a border for its outline, so the
	     ring colour is the supported way to strengthen it. */
	const shared = {
		variant: "secondary" as const,
		size: "xl" as const,
		className:
			"w-full justify-between px-4 text-base inset-ring-zinc-400 hover:inset-ring-zinc-500 md:px-6 dark:inset-ring-zinc-500 dark:hover:inset-ring-zinc-300",
		"aria-label": ariaLabel,
	};

	return price.url ? (
		<Button
			href={price.url}
			target="_blank"
			rel="noopener noreferrer"
			{...shared}
		>
			{content}
		</Button>
	) : (
		<Button {...shared}>{content}</Button>
	);
}

/* Full-width divider between sections. */
function SectionDivider() {
	return <div className="border-t border-zinc-200 dark:border-zinc-800" />;
}

/**
 * The corner brackets the closing CTA and the merch previews frame things with.
 * Needs a `relative` parent; brightens with the parent's `group` on hover.
 *
 * `dim` marks the open sponsorship slot, so the filled tiles read louder than
 * the one inviting a logo.
 */
function TileBrackets({ dim = false }: { dim?: boolean }) {
	const edge = `absolute h-3 w-3 transition-colors duration-200 group-hover:border-zinc-900 dark:group-hover:border-white ${
		dim
			? "border-zinc-200 dark:border-zinc-800"
			: "border-zinc-300 dark:border-zinc-700"
	}`;
	return (
		<>
			<span className={`${edge} top-0 left-0 border-t border-l`} />
			<span className={`${edge} top-0 right-0 border-t border-r`} />
			<span className={`${edge} bottom-0 left-0 border-b border-l`} />
			<span className={`${edge} right-0 bottom-0 border-r border-b`} />
		</>
	);
}

/**
 * A sponsor's mark, flattened to the wall's single ink: `brightness-0` drops
 * whatever colour the file carries to black, and the dark tile inverts that
 * back to white. Alpha survives both, so a mark keeps its shape and any
 * knocked-out counters.
 *
 * One ink for every sponsor is what keeps the tier ladder legible — otherwise
 * the most saturated logo in the list reads as the biggest backer, whichever
 * row it is standing in.
 */
function SponsorLogo({ sponsor }: { sponsor: (typeof SPONSORS)[number] }) {
	return (
		<img
			src={getAssetPath(sponsor.logo)}
			alt={sponsor.name}
			className={`${sponsor.logoHeight} w-auto max-w-full object-contain brightness-0 dark:invert`}
		/>
	);
}

/**
 * One sponsor, one tile. The tier supplies the size — padding and the fixed
 * logo slot — so every tile in a row matches.
 */
function SponsorTile({
	sponsor,
	tier,
}: {
	sponsor: (typeof SPONSORS)[number];
	tier: (typeof SPONSOR_TIERS)[number];
}) {
	return (
		<a
			href={sponsor.websiteUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${sponsor.name} — visit website`}
			/* Opaque so the page's centre dashed line stops behind the tile rather
			   than running across the logo. */
			className={`group relative flex flex-col items-center justify-center bg-white px-6 dark:bg-zinc-950 ${tier.tileClass}`}
		>
			<TileBrackets />

			<span className={`flex ${tier.logoBox} items-center justify-center`}>
				<SponsorLogo sponsor={sponsor} />
			</span>

			<span className={`${text.micro} ${chip} mb-0`}>{sponsor.tier}</span>
		</a>
	);
}

/**
 * A whole tier in one tile: the marks share a frame and a single chip. The
 * frame is the tier, so each mark is only a link inside it.
 */
function GroupedSponsorTile({
	sponsors,
	tier,
	className = "",
}: {
	sponsors: (typeof SPONSORS)[number][];
	tier: (typeof SPONSOR_TIERS)[number];
	className?: string;
}) {
	return (
		<div
			className={`group relative flex flex-col items-center justify-center bg-white px-6 dark:bg-zinc-950 ${tier.tileClass} ${className}`}
		>
			<TileBrackets />

			{/* Spread across the frame on a wide screen, stacked on a phone. Left to
			    wrap on their own the marks break unevenly — a wide one takes a line
			    to itself and the rest crowd the next — so below `sm` each takes its
			    own line and stays centred. */}
			<div className="flex w-full flex-wrap items-center justify-evenly gap-x-10 gap-y-5">
				{sponsors.map((sponsor) => (
					<a
						key={sponsor.name}
						href={sponsor.websiteUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${sponsor.name} — visit website`}
						/* The frame's own hover covers the whole tile, so each mark
						   answers for itself to show it is separately clickable. */
						className={`flex w-full sm:w-auto ${tier.logoBox} items-center justify-center transition-opacity duration-200 hover:opacity-60`}
					>
						<SponsorLogo sponsor={sponsor} />
					</a>
				))}
			</div>

			<span className={`${text.micro} ${chip} mb-0`}>{tier.tier}</span>
		</div>
	);
}

/**
 * The invitation to sponsor. It sits under the wall as a line of text rather
 * than in it as a tile: unsold inventory framed like a sponsor gives an empty
 * slot the same weight as a company that paid for one. The "your logo here"
 * caret went with the tile — it was the frame that made the phrase mean
 * anything.
 */
function OpenSponsorSlot() {
	return (
		<a
			href="mailto:contact@effectful.co?subject=Effect Days Livorno - Sponsorship"
			className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
		>
			Become a sponsor
			{/* mailto — leaves the page, so up-right */}
			<Icon name="arrow-up-right" className="text-xs" />
		</a>
	);
}

/**
 * Stand-in for a speaker portrait: the dashed empty slot the sponsors section
 * uses for its open spot, holding the speaker's initials. Reads as a frame
 * waiting for a photo rather than a broken image.
 */
function SpeakerPlaceholder({ name }: { name: string }) {
	const initials = name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);
	return (
		<div className="flex aspect-4/5 items-center justify-center border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
			<span className="flex h-16 w-16 items-center justify-center border border-dashed border-zinc-300 font-mono text-lg font-medium tracking-wider text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
				{initials}
			</span>
		</div>
	);
}

export function EffectDaysLivornoPage() {
	const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
	const toggleFaq = (index: number) => {
		setOpenFaqs((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	};

	const renderFaq = (faq: (typeof FAQS)[number], index: number) => {
		const isOpen = openFaqs.has(index);
		return (
			<div
				key={faq.question}
				className="border-b border-zinc-200 dark:border-zinc-800"
			>
				<h3>
					<button
						type="button"
						onClick={() => toggleFaq(index)}
						aria-expanded={isOpen}
						className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
					>
						<span className={text.smallHeading}>{faq.question}</span>
						<Icon
							name="chevron-down"
							className={`shrink-0 text-base text-zinc-500 transition-transform duration-200 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white ${
								isOpen ? "rotate-180" : ""
							}`}
						/>
					</button>
				</h3>

				<div
					className={`grid transition-all duration-300 ease-out ${
						isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
					}`}
				>
					<div className="overflow-hidden">
						<p className={`${text.body} pb-6`}>{faq.answer}</p>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="relative min-h-screen bg-zinc-950 text-white">
			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-999 rounded-br-lg bg-zinc-800 px-6 py-4 font-semibold text-white no-underline focus:top-0 focus:left-0"
			>
				Skip to main content
			</a>

			<EffectDaysNavigation activePath="/effect-days" />
			<GridOverlay />

			{/* Vertical border lines container — behind content, so full-bleed images cover them */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 text-zinc-200 dark:text-zinc-800"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative z-10 w-full pt-16">
				{/* Hero Section — copy left, photo bleeding off the right edge (lg+) */}
				<section className="relative w-full pt-16 pb-14 md:pt-24 md:pb-24 lg:pt-40 lg:pb-40">
					{/* Right half — photo from the Livorno edition (lg+), full-bleed */}
					<div className="absolute inset-y-0 right-0 z-10 hidden w-1/2 overflow-hidden lg:block">
						<img
							src={getAssetPath("/assets/effect-days/ed-25-2.png")}
							alt="The Effect community at Effect Days 2025 in Livorno"
							className="h-full w-full object-cover"
						/>
						{/* Blend into the dark page */}
						<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
						<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
							{"// "}Effect Days 2025 · Livorno
						</p>
					</div>

					<div className={`relative ${container}`}>
						<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<p className={text.eyebrow}>
									{"// "}Livorno, Italy · Dec 9–11, 2026
								</p>
								<h1 className={text.pageTitle}>Effect Days</h1>
								<p className={`${text.subtitle} max-w-md`}>
									For Effect and TypeScript engineers: three days of workshops,
									talks, and community.
								</p>

								<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
									<Button
										href="#tickets"
										variant="primary"
										size="lg"
										className="w-full sm:w-auto"
									>
										<Icon name="ticket" className="text-lg" />
										Get tickets
									</Button>
									<SaveToCalendar />
								</div>
							</div>

							{/* Below lg the absolute panel can't apply, so the same image runs
							    in flow here instead of vanishing */}
							<div className="relative overflow-hidden lg:hidden">
								<img
									src={getAssetPath("/assets/effect-days/ed-25-2.png")}
									alt="The Effect community at Effect Days 2025 in Livorno"
									className="aspect-16/9 w-full object-cover"
								/>
								<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
								<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
									{"// "}Effect Days 2025 · Livorno
								</p>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* The Program - pipeline */}
				<section id="program" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}The Program</p>
						<h2 className={text.sectionTitle}>The Effect Days experience</h2>
						<p className={text.subtitle}>
							A community-driven, non-profit event celebrating{" "}
							<br className="hidden md:inline" />
							the Effect ecosystem.
						</p>

						<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
							{PROGRAM.map((step) => (
								<div
									key={step.step}
									className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
								>
									{/* Header row — number chip and day/date share one line */}
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center border border-zinc-300 font-mono text-sm font-medium text-zinc-900 dark:border-zinc-600 dark:text-white">
											{step.step}
										</div>
										<span className={text.micro}>
											{step.day} · {step.date}
										</span>
									</div>
									<h3 className={`${text.cardTitle} mt-6`}>{step.title}</h3>
									<p className={text.cardBody}>{step.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Speakers — sits between the program and the venue, so the page
				    answers "who will I hear" before it asks for a ticket. */}
				<section id="speakers" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						{/* Title in the left half, the blurb in the right — the same split
						    header the sponsors section uses. */}
						<div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:items-baseline-last md:gap-8">
							<div>
								<p className={text.eyebrow}>{"// "}Speakers</p>
								<h2 className={text.sectionTitle}>Who you'll hear from</h2>
							</div>
							<p className={`${text.subtitle} md:mt-0`}>
								Engineers building on Effect in production, from the teams
								behind the tools you use. More speakers to be announced.
							</p>
						</div>

						{/* Two across in mobile portrait, three from mobile landscape
						    through tablet, four once there is desktop width.

						    On desktop the four cards read as two pairs: 16px inside each
						    pair and 32px down the middle, so the page's centre dashed line
						    has room to show through. That is one zero-width spacer track
						    between the pairs — with a uniform 16px gap either side of it,
						    the middle reads as 32. Each card is explicitly placed so
						    nothing auto-flows into the spacer, and keeping it a single grid
						    (rather than two half-grids) is what holds the card widths equal
						    and the row bottoms aligned across the centre. */}
						<div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-[repeat(2,1fr)_0px_repeat(2,1fr)] lg:[&>*:nth-child(4n+1)]:col-start-1 lg:[&>*:nth-child(4n+2)]:col-start-2 lg:[&>*:nth-child(4n+3)]:col-start-4 lg:[&>*:nth-child(4n)]:col-start-5">
							{SPEAKERS.map((speaker) => (
								<div
									key={speaker.name}
									/* Opaque, so the page's centre dashed line stops behind the
									   card rather than running across a portrait. */
									className="flex flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
								>
									{speaker.photo ? (
										/* Most sources are square, and covering this taller frame
										   crops their sides rather than the top and bottom —
										   centred is right for that. One is already 4:5 and so
										   sits uncropped; a source taller than 4:5 would crop
										   vertically instead and may want a per-card
										   object-position. */
										<img
											src={getAssetPath(speaker.photo)}
											alt={speaker.name}
											className="aspect-4/5 w-full border-b border-zinc-200 object-cover opacity-80 dark:border-zinc-800"
										/>
									) : (
										<SpeakerPlaceholder name={speaker.name} />
									)}
									{/* p-4 rather than the styleguide card's p-6 — four across
									    leaves each card narrow, and the tighter inset keeps the
									    role on one line more often. */}
									<div className="flex flex-1 flex-col p-4">
										<h3 className={text.cardTitle}>{speaker.name}</h3>
										{/* The X icon rides on the role line rather than the name:
										    that line is always one line deep, so the icon keeps a
										    fixed position even where a longer name wraps. */}
										<div className="flex items-center justify-between gap-2">
											<p className={text.cardBody}>
												{speaker.role}
												{" · "}
												{speaker.company}
											</p>
											{speaker.x && (
												<Link
													href={`https://x.com/${speaker.x}`}
													variant="icon"
													aria-label={`${speaker.name} on X`}
													className="mt-1 shrink-0 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
												>
													<i
														className="ri-twitter-x-fill text-base"
														aria-hidden="true"
													/>
												</Link>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* The Venue */}
				<section id="venue" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						{/* Header — copy in the left half, links in the right half */}
						<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 lg:items-baseline-last">
							<div>
								<p className={text.eyebrow}>{"// "}The Venue</p>
								<h2 className={text.sectionTitle}>Palazzo Pancaldi, Livorno</h2>
								<p className={text.subtitle}>
									A beautiful seaside location in the Tuscan riviera, where you
									can enjoy good food and the coastal views.
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
								<Link
									href={getAssetPath("/effect-days/about-livorno")}
									variant="subtle"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									About Livorno
									<Icon name="arrow-right" className="text-xs" />
								</Link>
								<Link
									href="https://www.google.com/maps/search/?api=1&query=Palazzo+Pancaldi+Livorno"
									variant="subtle"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									View on map
									<Icon name="arrow-up-right" className="text-xs" />
								</Link>
							</div>
						</div>

						<div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
							{/* Featured photo, full column height */}
							<div className="overflow-hidden">
								<img
									src={getAssetPath(
										"/assets/effect-days/pancaldi-exterior.avif",
									)}
									alt="Palazzo Pancaldi on the Livorno seafront"
									className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-full"
								/>
							</div>

							{/* Venue and city tiles */}
							<div className="grid grid-cols-2 gap-4">
								<img
									src={getAssetPath("/assets/effect-days/pancaldi-hall.avif")}
									alt="The conference hall at Palazzo Pancaldi"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-7.avif")}
									alt="Livorno's harborfront seen from the water"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-1.avif")}
									alt="Boats on a canal in Livorno's Venezia Nuova district"
									className="aspect-4/3 w-full object-cover"
								/>
								<img
									src={getAssetPath("/assets/effect-days/livorno-6.avif")}
									alt="Canal-side buildings and boats in Livorno"
									className="aspect-4/3 w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Tickets Section */}
				<section id="tickets" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}Only 100 tickets</p>
						<h2 className={text.sectionTitle}>Choose your pass</h2>

						<div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
							{PASSES.map((pass) => (
								<div
									key={pass.name}
									/* p-8 rather than the styleguide card's p-6 — these hold the
									   most content of any card on the page. */
									className={`flex flex-col border bg-white p-8 dark:bg-zinc-950 ${
										pass.featured
											? "border-zinc-400 dark:border-zinc-600"
											: "border-zinc-200 dark:border-zinc-800"
									}`}
								>
									{/* Day count comes from the pass itself, so it stays true if a
								    day is ever added or dropped. The tier rides in the same chip
								    and drops out with the early bird, leaving just "3-day pass".
								    A sold-out pass gives the chip over to saying so — it is the
								    one fact worth reading first, and the day list below still
								    carries the count. */}
									<span className={`${text.micro} ${chip} self-start`}>
										{pass.soldOut ? (
											"Sold out"
										) : (
											<>
												{EARLY_BIRD_ON_SALE ? "Early bird " : ""}
												{pass.days.filter((day) => day.included).length}-day
												pass
											</>
										)}
									</span>
									<h3 className={`${text.cardTitle} mt-4`}>{pass.name}</h3>

									{/* Day checklist, mono style. The marker is the same ticked box
									    the editions timeline uses, minus the opaque fill that only
									    exists there to mask the connector line. */}
									<div className="mt-6 space-y-3 font-mono text-sm">
										{pass.days.map((day) => (
											<div key={day.date} className="flex items-center gap-3">
												{/* Same muted tone as the · separator, so the checklist chrome sits
										    at one weight and only the marks distinguish the rows */}
												<span className="flex h-4 w-4 shrink-0 items-center justify-center border border-zinc-400 dark:border-zinc-600">
													{day.included && (
														<Icon
															name="check"
															className="text-[0.65rem] text-zinc-900 dark:text-white"
															aria-hidden="true"
														/>
													)}
												</span>
												<span
													className={
														day.included
															? "text-zinc-700 dark:text-zinc-200"
															: "text-zinc-500 dark:text-zinc-500"
													}
												>
													{day.date}
													<span className="px-1.5 text-zinc-400 dark:text-zinc-600">
														·
													</span>
													{day.name}
												</span>
											</div>
										))}
									</div>

									<div className="mt-6 border-t border-dashed border-zinc-200 dark:border-zinc-700" />

									{/* Purchase rows take the rest of the card. Everything above
									    this block is the same height on both cards and the grid
									    stretches the pair level, so the space left here is
									    identical too — which lets the single sold-out row grow to
									    exactly the height the two purchase rows opposite it make,
									    without either measurement being written down. */}
									<div className="mt-6 flex flex-1 flex-col gap-3">
										{pass.soldOut ? (
											<SoldOutRow />
										) : (
											<>
												<PurchaseRow
													label="self-pay"
													passName={pass.name}
													price={pass.pricing.self}
												/>
												{/* Keeps the asterisk so the invoicing note below still
													    has something to point at. */}
												<PurchaseRow
													label="business*"
													passName={pass.name}
													price={pass.pricing.business}
												/>
											</>
										)}
									</div>
								</div>
							))}
						</div>

						{/* One stacked run rather than two columns — the asterisk note used
						    to sit under the left card only, which read as belonging to that
						    pass even though both cards carry the marker. */}
						<div className="mt-4">
							<p className="text-sm leading-normal text-zinc-600 dark:text-zinc-400">
								*Suitable for invoicing.
							</p>
							<p className="text-sm leading-normal text-zinc-600 dark:text-zinc-400">
								Selecting a pass takes you to Stripe to complete your purchase.
							</p>
							{/* Group discounts are off the page while early bird is on sale —
							    flip EARLY_BIRD_ON_SALE to bring this back. */}
							{!EARLY_BIRD_ON_SALE && (
								<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
									Group of 4+?{" "}
									<Link
										href="mailto:contact@effectful.co?subject=Effect Days Livorno - Group Tickets"
										variant="inline"
									>
										Ask about business discounts
									</Link>
									.
								</p>
							)}
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Editions timeline */}
				<section id="past-editions" className={sectionRhythm}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}3rd Edition</p>
						<h2 className={text.sectionTitle}>The journey continues</h2>

						<div className="relative mt-12">
							{/* Timeline line (desktop) — fades out past the last node, so the
							    trailing run reads as the journey continuing rather than an
							    unterminated rule */}
							<div
								className="absolute top-3.5 right-0 left-8 hidden text-zinc-300 md:block dark:text-zinc-700"
								style={{
									height: "1px",
									backgroundImage:
										"repeating-linear-gradient(to right, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)",
									/* Full strength through the last node, then fading across the
									   run that follows it — the dashes thin out instead of stopping */
									maskImage:
										"linear-gradient(to right, #000 0%, #000 93%, transparent 100%)",
									WebkitMaskImage:
										"linear-gradient(to right, #000 0%, #000 93%, transparent 100%)",
								}}
							/>
							{/* Two across in mobile landscape (2024 beside 2025, 2026 starting
							    the next row), one column in portrait, all three in a row from
							    md where the dashed timeline connects them. */}
							<div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
								{EDITIONS.map((edition) => (
									<div
										key={edition.year}
										/* The next edition starts row two on its own in the sm
										   two-column layout, so it takes the full row rather than
										   leaving the cell beside it empty. */
										className={`relative ${
											edition.status === "next"
												? "sm:col-span-2 md:col-span-1"
												: ""
										}`}
									>
										{/* Timeline node — labels carry an opaque background so the
										    dashed line reads as a connector between nodes, not a
										    rule struck through the text */}
										<div className="relative z-10 mb-6 flex items-center">
											<span
												className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
													edition.status === "next"
														? "border-zinc-900 bg-zinc-200 dark:border-zinc-300 dark:bg-zinc-700"
														: "border-zinc-400 bg-white dark:border-zinc-600 dark:bg-zinc-950"
												}`}
											>
												{/* Past editions are ticked off; the next one stays an empty marker */}
												{edition.status === "past" && (
													<Icon
														name="check"
														className="text-[0.65rem] text-zinc-900 dark:text-white"
														aria-hidden="true"
													/>
												)}
											</span>
											{/* Never wraps — a second line here would push the next
											    edition's card below the other two. */}
											<h3
												className={`${text.cardTitle} bg-white px-3 whitespace-nowrap dark:bg-zinc-950`}
											>
												Effect Days {edition.year}
											</h3>
											{/* Title plus badge does not fit a third of the md grid, so
											    the badge waits for lg rather than wrapping the row. */}
											{edition.status === "next" && (
												<span
													className={`${text.micro} hidden shrink-0 border border-zinc-300 bg-white px-2 py-0.5 whitespace-nowrap lg:inline-block dark:border-zinc-600 dark:bg-zinc-950`}
												>
													Next stop
												</span>
											)}
										</div>

										<div
											className={`flex flex-col overflow-hidden border bg-white dark:bg-zinc-950 ${
												edition.status === "next"
													? "border-zinc-400 dark:border-zinc-600"
													: "border-zinc-200 dark:border-zinc-800"
											}`}
										>
											{edition.image ? (
												<div className="relative isolate aspect-21/9 overflow-hidden">
													<img
														src={getAssetPath(edition.image)}
														alt={`Effect Days ${edition.year}`}
														className={`h-full w-full object-cover ${
															edition.tint ? "grayscale" : ""
														}`}
													/>
													{/* Duotone — grayscale underneath, hue and saturation
													    from this layer, matching the pre-tinted photos */}
													{edition.tint && (
														<div className="pointer-events-none absolute inset-0 bg-[#5b5fc7] mix-blend-color" />
													)}
													<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
												</div>
											) : (
												<div className="flex aspect-21/9 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
													<span className="font-mono text-sm text-zinc-700 dark:text-zinc-200">
														Dec 9–11, 2026
														<span className="animate-[terminal-blink_1s_step-end_infinite]">
															{" ▊"}
														</span>
													</span>
												</div>
											)}
											<div className="flex flex-1 flex-col p-6">
												<div className="flex items-baseline justify-between gap-3">
													<span className={text.micro}>{edition.location}</span>
													<span className={text.micro}>{edition.dates}</span>
												</div>
												<p className={`${text.cardBody} mt-4`}>
													{edition.note}
												</p>
												{edition.playlistUrl ? (
													<Link
														href={edition.playlistUrl}
														variant="subtle"
														className="mt-4 inline-flex items-center gap-1.5 font-medium"
													>
														<i className="ri-youtube-fill text-base" />
														Full playlist
														<Icon name="arrow-up-right" className="text-xs" />
													</Link>
												) : (
													<Link
														href="#tickets"
														variant="subtle"
														className="mt-4 inline-flex items-center gap-1.5 font-medium"
													>
														Be part of it
														<Icon name="arrow-up" className="text-xs" />
													</Link>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				{/* Sponsors */}
				<section id="sponsors" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						{/* Title in the left half, the blurb in the right. Stacked on mobile
						    the columns close up to gap-0, so the subtitle's own mt-4 sets the
						    spacing instead of the grid. The sponsorship CTA is the last tile
						    in the grid below rather than a link sitting up here. */}
						<div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:items-baseline-last md:gap-8">
							<div>
								<p className={text.eyebrow}>{"// "}Sponsors</p>
								<h2 className={text.sectionTitle}>Made possible by</h2>
							</div>
							<p className={`${text.subtitle} md:mt-0`}>
								Effect Days is a non-profit event, run with the support of the
								companies backing the ecosystem.
							</p>
						</div>

						{/* One row per tier. How much of the row a frame takes, and how
						    tall it stands, carry the rank together: a half each for the
						    main sponsors, a half for the partner beside the open slot, and
						    a single full-width frame holding the community marks.

						    Keeping the tiers on separate rows is what makes the size step
						    safe — it lives between the rows, so no row can stretch its
						    tiles into the tier above. */}
						{SPONSOR_TIERS.map((tier, tierIndex) => {
							const marks = SPONSORS.filter(
								(sponsor) => sponsor.tier === tier.tier,
							);
							const spacing = tierIndex === 0 ? "mt-12" : "mt-4";

							if (tier.grouped) {
								return (
									<GroupedSponsorTile
										key={tier.tier}
										sponsors={marks}
										tier={tier}
										className={spacing}
									/>
								);
							}

							return (
								<div
									key={tier.tier}
									className={`grid gap-4 ${spacing} ${tier.cols}`}
								>
									{marks.map((sponsor) => (
										<SponsorTile
											key={sponsor.name}
											sponsor={sponsor}
											tier={tier}
										/>
									))}
								</div>
							);
						})}

						<OpenSponsorSlot />
					</div>
				</section>

				<SectionDivider />

				{/* FAQ Section */}
				<section id="faq" className={`scroll-mt-16 ${sectionRhythm}`}>
					<div className={container}>
						<p className={text.eyebrow}>{"// "}FAQ</p>
						<h2 className={text.sectionTitle}>Frequently Asked Questions</h2>

						{/* Two independent columns — opening one never reflows the other */}
						<div className="mt-12 grid grid-cols-1 items-start gap-x-4 md:grid-cols-2 md:gap-x-8">
							<div>
								{FAQS.slice(0, FAQ_SPLIT).map((faq, i) => renderFaq(faq, i))}
							</div>
							<div>
								{FAQS.slice(FAQ_SPLIT).map((faq, i) =>
									renderFaq(faq, FAQ_SPLIT + i),
								)}
							</div>
						</div>
					</div>
				</section>

				<SectionDivider />

				<EnjoyEffectDaysCTA />
			</main>

			<Footer activePath="/events" hideCommunityBorder />
		</div>
	);
}
