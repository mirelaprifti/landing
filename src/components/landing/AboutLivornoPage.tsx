import { Button, Link } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

/* Canonical text styles copied verbatim from TypographyStyleguidePage (/styleguide). */
const text = {
	pageTitleSub:
		"leading-[1.1] text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white",
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
const sectionRhythm = "py-24 md:pt-40 md:pb-24";
const card = "rounded-md border border-zinc-200 p-6 dark:border-zinc-800";

const NAV_ANCHORS = [
	{ href: "#airports", label: "Nearest airports" },
	{ href: "#transport", label: "Local transport" },
	{ href: "#tips", label: "Practical tips" },
	{ href: "#see", label: "What to see" },
	{ href: "#do", label: "Things to do" },
	{ href: "#eat", label: "What to eat" },
];

/* Shared scale for the distance tracks, slightly past Rome so its marker
   stays inside the card. */
const DISTANCE_SCALE_KM = 320;

const AIRPORTS: Array<{
	name: string;
	distance: string;
	km: number;
	intro: string;
	train: string;
	car: string;
	bus?: React.ReactNode;
}> = [
	{
		name: "Pisa · PSA",
		distance: "~20 km from Livorno",
		km: 20,
		intro: "The closest airport.",
		train:
			"Take the Pisamover shuttle from Pisa Airport to Pisa Centrale, then a direct train to Livorno Centrale.",
		car: "Around 20-25 minutes by taxi or private car.",
	},
	{
		name: "Florence · FLR",
		distance: "~90 km from Livorno",
		km: 90,
		intro: "A good range of European flights.",
		train:
			"Take the shuttle bus or tram to Florence SMN Station, then a train to Livorno Centrale. Total journey time is about 2 hours.",
		car: "Around 1.5 hours by taxi or private car.",
	},
	{
		name: "Bologna · BLQ",
		distance: "~180 km from Livorno",
		km: 180,
		intro: "Well-connected to major European cities.",
		train:
			"The Marconi Express takes you to Bologna Centrale, then a train to Florence SMN, then a train to Livorno Centrale. All in ~2.5 hours.",
		car: "Around 2 hours by taxi or private car.",
	},
	{
		name: "Rome · FCO",
		distance: "~300 km from Livorno",
		km: 300,
		intro: "Widest choice of international flights.",
		train:
			"Take the Leonardo Express to Roma Termini, then a direct train to Livorno Centrale along the coast. Total journey time is about 3.5 hours.",
		car: "Around 3.5 hours by taxi or private car.",
		bus: (
			<>
				<Link
					href="https://www.flixbus.com/bus-routes/bus-rome-fiumicino-airport-livorno"
					variant="inline"
				>
					FlixBus
				</Link>{" "}
				runs direct buses to Livorno in about 4 hours.
			</>
		),
	},
];

const SIGHTS = [
	{
		title: "Terrazza Mascagni",
		description:
			"One of the most iconic spots in Livorno, Terrazza Mascagni is a beautiful seafront promenade offering breathtaking views of the Tyrrhenian Sea. A perfect place for a leisurely stroll, especially at sunset.",
		image: "/assets/images/livorno-terrazza.avif",
		mapQuery: "Terrazza+Mascagni+Livorno",
	},
	{
		title: "Old & New Fortress",
		description:
			"Explore Livorno's history at the Old Fortress, a massive fortification dating back to the 16th century. The fortress offers panoramic views of the city and the harbor.",
		image: "/assets/images/livorno-fortezza.avif",
		mapQuery: "Fortezza+Vecchia+Livorno",
	},
	{
		title: "The New Venice District",
		description:
			"Livorno's picturesque canal district, often compared to Venice, is lined with charming bridges, historic buildings, and inviting cafes.",
		image: "/assets/images/livorno-venezia-nuova.avif",
		mapQuery: "Venezia+Nuova+Livorno",
	},
	{
		title: "Mercato Centrale",
		description:
			"One of the largest indoor markets in Europe. Here you can find fresh produce, seafood, meats, and local specialties. A great place to experience the local culture and cuisine.",
		image: "/assets/images/livorno-mercato.avif",
		mapQuery: "Mercato+delle+Vettovaglie+Livorno",
	},
	{
		title: "Livorno Aquarium",
		description:
			"A family-friendly destination featuring a wide variety of marine species, including sharks, sea turtles, and jellyfish. An educational and enjoyable experience for all ages.",
		image: "/assets/images/livorno-acquario.avif",
		mapQuery: "Acquario+di+Livorno",
	},
	{
		title: "Lungomare",
		description:
			"Perfect for a relaxing walk or bike ride, the Lungomare offers access points to various beaches, rocky coves, and natural rock pools.",
		image: "/assets/images/livorno-lungomare.avif",
		mapQuery: "Lungomare+di+Livorno",
	},
];

const FOOD = [
	{
		title: "Cacciucco",
		description:
			"Livorno's signature dish, Cacciucco, is a hearty fish stew made with a variety of seafood, tomatoes, garlic, and red wine. A must-try for seafood lovers!",
		image: "/assets/images/eat-cacciucco.avif",
	},
	{
		title: "Cecina",
		description:
			"This savory chickpea flatbread is a popular street food in Livorno. Enjoy it on its own or inside a sandwich with fillings like grilled eggplant.",
		image: "/assets/images/eat-cecina.webp",
	},
	{
		title: "Ponce alla Livornese",
		description:
			"A strong coffee-based drink with rum and lemon zest, Ponce Livornese is perfect for warming up after a day of exploring. A traditional Livornese beverage with a unique kick.",
		image: "/assets/images/eat-ponce.avif",
	},
	{
		title: "Frati Fritti",
		description:
			"A type of sweet, deep-fried doughnut, Frati Fritti are soft and fluffy, often sprinkled with sugar. A local favorite for breakfast or as a sweet treat throughout the day.",
		image: "/assets/images/eat-frati-fritti.avif",
	},
	{
		title: "Livorno street food",
		description:
			'A reflection of its coastal charm and diverse cultural influences, the street markets offer an authentic taste of Tuscan flavors such as the "5 e 5" sandwich and seafood delicacies like fried calamari and baccalà.',
		image: "/assets/images/eat-cinque-e-cinque.avif",
	},
	{
		title: "Fresh seafood",
		description:
			"From red mullet fish (triglie alla livornese) to calamari and mussels, you'll find a wide range of delicious options at local restaurants and trattorias.",
		image: "/assets/images/eat-triglie.avif",
	},
];

const ACTIVITIES = [
	{
		title: "Boat tour",
		icon: "life-buoy",
		tag: "On the water",
		description:
			"Take a boat tour through the Venezia Nuova district's canals. A relaxing way to see the city's landmarks.",
	},
	{
		title: "Beach day",
		icon: "sun",
		tag: "By the sea",
		description:
			"Enjoy a day by the sea at one of Livorno's beaches. Relax and soak up the Mediterranean sun.",
	},
	{
		title: "Arts & museums",
		icon: "palette",
		tag: "In the city",
		description:
			"The Museo Civico Giovanni Fattori hosts works from the Macchiaioli movement, alongside smaller galleries and cultural centers worth exploring.",
	},
	{
		title: "Day trips",
		icon: "map-pin",
		tag: "Beyond Livorno",
		description:
			"Pisa & Florence are perfect for day trips. If you have more time, you can visit Elba Island, known for its crystal-clear waters and picturesque villages.",
	},
] as const;

/* Full-width divider between sections. */
function SectionDivider() {
	return <div className="border-t border-zinc-200 dark:border-zinc-800" />;
}

export function AboutLivornoPage() {
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

			<Navigation activePath="/events" />
			<GridOverlay />

			{/* Vertical border lines container — behind content, so full-bleed images cover them */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-800" />
				</div>
			</div>

			<main id="main-content" className="relative z-10 w-full pt-16">
				{/* Hero */}
				<section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24">
					{/* Right half — Livorno photo (lg+), full-bleed */}
					<div className="absolute inset-y-0 right-0 z-10 hidden w-1/2 overflow-hidden lg:block">
						<img
							src={getAssetPath("/assets/images/livorno-6.avif")}
							alt="Canal-side buildings and boats in Livorno's Venezia Nuova district"
							className="h-full w-full object-cover"
						/>
						{/* Blend into the dark page */}
						<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
						{/* Photo caption */}
						<p className="absolute bottom-3 left-4 font-mono text-xs font-medium tracking-wider text-zinc-300 uppercase">
							{"// "}Venezia Nuova · Livorno
						</p>
					</div>

					<div className={`relative ${container}`}>
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
							{/* Left — copy */}
							<div>
								<Link
									href="/events/effect-days"
									variant="subtle"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									<Icon name="arrow-left" className="text-xs" />
									Back to Effect Days
								</Link>
								<h1 className={`${text.pageTitleSub} mt-6`}>
									Welcome to Livorno!
								</h1>

								{/* Section anchors — 3 per row */}
								<div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
									{NAV_ANCHORS.map((anchor) => (
										<Button
											key={anchor.href}
											href={anchor.href}
											variant="secondary"
											size="sm"
										>
											{anchor.label}
										</Button>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Post-hero content — center dashed deco line scoped to this area */}
				<div className="relative">
					<div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
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

					<SectionDivider />

					{/* Nearest airports */}
					<section id="airports" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}Getting Here</p>
							<h2 className={text.sectionTitle}>The nearest airports</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
								{[AIRPORTS.slice(0, 2), AIRPORTS.slice(2)].map((pair) => (
									<div
										key={pair[0].name}
										className="grid grid-cols-1 gap-4 md:grid-cols-2"
									>
										{pair.map((airport) => (
											<div key={airport.name} className={card}>
												<p className={text.micro}>{airport.distance}</p>
												{/* Distance track — marker position on a scale shared by all cards */}
												<div className="relative mt-3 h-2" aria-hidden="true">
													<div
														className="absolute top-1/2 right-0 left-0 -translate-y-1/2 text-zinc-300 dark:text-zinc-700"
														style={{
															height: "1px",
															backgroundImage:
																"repeating-linear-gradient(to right, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
														}}
													/>
													<div className="absolute top-1/2 left-0 h-2 w-px -translate-y-1/2 bg-zinc-400 dark:bg-zinc-600" />
													<div
														className="absolute top-1/2 h-2 w-2 -translate-y-1/2 bg-zinc-900 dark:bg-white"
														style={{
															left: `calc(${(airport.km / DISTANCE_SCALE_KM) * 100}% - 4px)`,
														}}
													/>
												</div>
												<h3 className={`${text.cardTitle} mt-4`}>
													{airport.name}
												</h3>
												<p className={text.cardBody}>{airport.intro}</p>
												<div className="mt-6 border-t border-dashed border-zinc-200 pt-4 dark:border-zinc-800">
													<h4 className={text.smallHeading}>By train</h4>
													<p className={text.cardBody}>{airport.train}</p>
												</div>
												<div className="mt-4">
													<h4 className={text.smallHeading}>By car</h4>
													<p className={text.cardBody}>{airport.car}</p>
												</div>
												{airport.bus && (
													<div className="mt-4">
														<h4 className={text.smallHeading}>By bus</h4>
														<p className={text.cardBody}>{airport.bus}</p>
													</div>
												)}
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</section>

					<SectionDivider />

					{/* Local transportation */}
					<section id="transport" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}Local Transportation</p>
							<h2 className={text.sectionTitle}>Moving around Livorno</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
								<div className={card}>
									<h3 className={text.cardTitle}>By taxi</h3>
									<p className={text.cardBody}>
										A taxi ride from the station to the seaside or Palazzo
										Pancaldi takes ~10-15 minutes and ~€12. Uber is not
										available in Italy.
									</p>
									<div className="mt-6 space-y-2 border-t border-dashed border-zinc-200 pt-4 dark:border-zinc-800">
										<p className={text.cardBody}>
											Taxi Livorno Consortium (CoTaLi):{" "}
											<Link href="tel:+390586883377" variant="inline">
												+39 586 88 33 77
											</Link>
										</p>
										<p className={text.cardBody}>
											Taxi Labronica Association (AsTaLa):{" "}
											<Link href="tel:+390586882020" variant="inline">
												+39 586 88 20 20
											</Link>
										</p>
									</div>
								</div>
								<div className={card}>
									<h3 className={text.cardTitle}>By bus</h3>
									<p className={text.cardBody}>
										Local buses (lines 1+, 2+, or 8N) run from Livorno Centrale
										Station to Viale Italia, close to Palazzo Pancaldi. The bus
										ride takes around 20 minutes. Check the{" "}
										<Link
											href="https://www.at-bus.it/en/travel/lines-and-timetables/livorno"
											variant="inline"
										>
											local bus schedule
										</Link>{" "}
										for exact timings.
									</p>
								</div>
								<div className={card}>
									<h3 className={text.cardTitle}>Bike rentals</h3>
									<p className={text.cardBody}>
										Livorno is a bike-friendly city with several cycling paths
										along the seafront and through the city center. The
										relatively flat terrain makes it ideal for cycling. You can
										rent bikes from several locations around the city.
									</p>
								</div>
							</div>
						</div>
					</section>

					<SectionDivider />

					{/* Practical tips */}
					<section id="tips" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}Practical Tips</p>
							<h2 className={text.sectionTitle}>Before you travel</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
								<div className={card}>
									{/* Header row — icon chip and meta tag share one line */}
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600">
											<Icon
												name="sun"
												className="text-zinc-700 dark:text-zinc-200"
											/>
										</div>
										<span className={text.micro}>10-13°C</span>
									</div>
									<h3 className={`${text.cardTitle} mt-6`}>December weather</h3>
									<p className={text.cardBody}>
										Livorno winters are mild: daytime temperatures around
										10-13°C (50-55°F), with sunny spells between occasional rain
										showers. A warm jacket and an umbrella are all you need.
									</p>
								</div>
								<div className={card}>
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600">
											<Icon
												name="clock"
												className="text-zinc-700 dark:text-zinc-200"
											/>
										</div>
										<span className={text.micro}>Trenitalia</span>
									</div>
									<h3 className={`${text.cardTitle} mt-6`}>
										Check train schedules
									</h3>
									<p className={text.cardBody}>
										Use the{" "}
										<Link
											href="https://www.trenitalia.com/en.html"
											variant="inline"
										>
											Trenitalia website
										</Link>{" "}
										or app to check train schedules and book tickets. Make sure
										to check in before boarding the train.
									</p>
								</div>
								<div className={card}>
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600">
											<Icon
												name="download"
												className="text-zinc-700 dark:text-zinc-200"
											/>
										</div>
										<span className={text.micro}>at bus · Tabnet</span>
									</div>
									<h3 className={`${text.cardTitle} mt-6`}>
										Local transport apps
									</h3>
									<p className={text.cardBody}>
										Consider downloading apps like{" "}
										<Link href="https://www.at-bus.it/en" variant="inline">
											at bus
										</Link>{" "}
										or{" "}
										<Link href="https://www.tabnet.it/" variant="inline">
											Tabnet
										</Link>{" "}
										for real-time updates on local public transport and easy
										ticket purchasing.
									</p>
								</div>
							</div>
						</div>
					</section>

					<SectionDivider />

					{/* What to see */}
					<section id="see" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}What to See</p>
							<h2 className={text.sectionTitle}>Sights worth your time</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{SIGHTS.map((sight) => (
									<div
										key={sight.title}
										className="flex flex-col overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
									>
										<img
											src={getAssetPath(sight.image)}
											alt={sight.title}
											className="aspect-3/2 w-full object-cover"
										/>
										<div className="flex flex-1 flex-col p-6">
											<h3 className={text.cardTitle}>{sight.title}</h3>
											<p className={text.cardBody}>{sight.description}</p>
											<Link
												href={`https://www.google.com/maps/search/?api=1&query=${sight.mapQuery}`}
												variant="subtle"
												className="mt-4 inline-flex items-center gap-1.5 pt-2 font-medium"
											>
												View on map
												<Icon name="arrow-up-right" className="text-xs" />
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					<SectionDivider />

					{/* Things to do */}
					<section id="do" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}Things to Do</p>
							<h2 className={text.sectionTitle}>Make a trip of it</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
								{ACTIVITIES.map((activity) => (
									<div key={activity.title} className={card}>
										{/* Header row — icon chip and meta tag share one line */}
										<div className="flex items-center justify-between">
											<div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600">
												<Icon
													name={activity.icon}
													className="text-zinc-700 dark:text-zinc-200"
												/>
											</div>
											<span className={text.micro}>{activity.tag}</span>
										</div>
										<h3 className={`${text.cardTitle} mt-6`}>
											{activity.title}
										</h3>
										<p className={text.cardBody}>{activity.description}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					<SectionDivider />

					{/* What to eat */}
					<section id="eat" className={`scroll-mt-16 ${sectionRhythm}`}>
						<div className={container}>
							<p className={text.eyebrow}>{"// "}What to Eat</p>
							<h2 className={text.sectionTitle}>Taste of Livorno</h2>

							<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{FOOD.map((dish) => (
									<div
										key={dish.title}
										className="flex flex-col overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
									>
										<img
											src={getAssetPath(dish.image)}
											alt={dish.title}
											className="aspect-3/2 w-full object-cover"
										/>
										<div className="flex flex-1 flex-col p-6">
											<h3 className={text.cardTitle}>{dish.title}</h3>
											<p className={text.cardBody}>{dish.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</div>
			</main>

			<Footer activePath="/events" hideCommunityBorder />
		</div>
	);
}
