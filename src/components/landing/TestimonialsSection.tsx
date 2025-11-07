import { getAssetPath } from "../../utils/assetPath";

export function TestimonialsSection() {
	const useCases = [
		{
			logo: getAssetPath("/assets/logos/zendesk-logo.svg"),
			title: "Effect for Backend",
			href: "https://youtu.be/rNAqPHBQFEQ",
			alt: "Zendesk",
		},
		{
			logo: getAssetPath("/assets/logos/expand-ai.svg"),
			title: "Effect for AI Agents",
			href: "#",
			alt: "expand ai",
		},
		{
			logo: getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
			title: "Effect for Infra",
			href: "https://youtu.be/VZpr91dU03c",
			alt: "Vercel",
		},
		{
			logo: getAssetPath("/assets/logos/spiko-logo.svg"),
			title: "Effect for Fintech",
			href: "https://youtu.be/lFOHVZnJLew",
			alt: "Spiko",
		},
	];

	return (
		<section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24 lg:py-28">
			{/* Background Pattern */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					opacity: 1,
					backgroundImage: `url('${getAssetPath("/assets/BG-Pattern.svg")}')`,
					backgroundSize: "cover",
					backgroundPosition: "center bottom",
					backgroundRepeat: "no-repeat",
					WebkitMaskImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1))",
					maskImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 1))",
				}}
			/>

			{/* Main Content Container */}
			<div className="relative mx-auto w-full max-w-[1280px]">
				{/* Heading */}
				<h2 className="mb-12 text-center text-3xl font-bold leading-tight text-white md:mb-16">
					Designed for real-world complexity
				</h2>

				{/* 4 Use Case Cards with Decorative Line */}
				<div className="relative mb-24 w-full">
					{/* Decorative Lines (behind cards at text level) */}
					<img
						src={getAssetPath("/assets/deco-central-line.svg")}
						alt=""
						className="pointer-events-none absolute bottom-[40px] left-1/2 z-0 hidden h-[1px] w-full max-w-[1280px] -translate-x-1/2 lg:block"
					/>

					{/* Left dashed line */}
					<div
						className="pointer-events-none absolute bottom-[40px] z-0 hidden lg:block"
						style={{
							right: "100%",
							width: "calc((100vw - 1280px) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Right dashed line */}
					<div
						className="pointer-events-none absolute bottom-[40px] z-0 hidden lg:block"
						style={{
							left: "100%",
							width: "calc((100vw - 1280px) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Cards Container */}
					<div className="use-case-cards relative z-10 grid w-full grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
						{useCases.map((useCase, index) => (
							<div
								key={index}
								className="group h-[229px] w-full rounded-lg p-[1px] transition-all hover:-translate-y-1"
								style={{
									background: "linear-gradient(to bottom, #09090b, #3f3f46)",
								}}
							>
								<a
									href={useCase.href}
									{...(useCase.href.startsWith("http")
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="relative block h-full w-full overflow-hidden rounded-lg"
									style={{
										background: "linear-gradient(to bottom, #19171b, #000)",
									}}
								>
									<div className="relative h-full w-full">
										<img
											src={useCase.logo}
											alt={useCase.alt}
											className="absolute left-1/2 top-[73px] h-[32px] -translate-x-1/2"
										/>
										<div className="absolute bottom-[28px] left-1/2 flex -translate-x-1/2 flex-row items-center justify-center gap-1 whitespace-nowrap">
											<i className="ri-arrow-right-up-line text-[20px] text-white/88" />
											<span className="text-lg font-medium tracking-[0.16px] text-white/88 md:text-base">
												{useCase.title}
											</span>
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Logo Slider Section (Full Width) */}
			<div className="logo-slider-container relative h-[200px] w-full overflow-hidden">
				{/* Row 1: Scroll Left */}
				<div className="logo-row logo-row-left absolute left-0 flex items-center gap-12 whitespace-nowrap">
					{/* Duplicate for infinite scroll */}
					<div className="flex items-center gap-12">
						{[
							{
								name: "14.ai",
								logo: getAssetPath("/assets/logos/logo-14ai.svg"),
								logoClass: "h-3 w-6",
							},
							{
								name: "OpenRouter",
								logo: getAssetPath("/assets/logos/logo-openrouter.png"),
								logoClass: "h-4 w-4 object-cover",
							},
							{
								name: "Edge&Node",
								logo: getAssetPath("/assets/logos/logo-edgenode.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "0.mail",
								logo: getAssetPath("/assets/logos/logo-0mail.png"),
								logoClass: "h-4 w-4 object-cover",
							},
							{
								name: "adidas",
								logo: getAssetPath("/assets/logos/logo-adidas.svg"),
								logoClass: "h-[14px] w-[22px]",
							},
							{
								name: "Glide",
								logo: getAssetPath("/assets/logos/logo-glide.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "August Health",
								logo: getAssetPath("/assets/logos/logo-augusthealth.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Aware",
								logo: getAssetPath("/assets/logos/logo-aware.svg"),
								logoClass: "h-4 w-[17px]",
							},
							{
								name: "BTP Consultants",
								logo: getAssetPath("/assets/logos/logo-btpconsultants.svg"),
								logoClass: "h-4 w-4",
							},
						].map((company, index) => (
							<div
								key={`row1-first-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								<span className="text-base font-semibold text-[#b5b5be]">
									{company.name}
								</span>
							</div>
						))}
					</div>
					{/* Duplicate set for seamless loop */}
					<div className="flex items-center gap-12">
						{[
							{
								name: "14.ai",
								logo: getAssetPath("/assets/logos/logo-14ai.svg"),
								logoClass: "h-3 w-6",
							},
							{
								name: "OpenRouter",
								logo: getAssetPath("/assets/logos/logo-openrouter.png"),
								logoClass: "h-4 w-4 object-cover",
							},
							{
								name: "Edge&Node",
								logo: getAssetPath("/assets/logos/logo-edgenode.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "0.mail",
								logo: getAssetPath("/assets/logos/logo-0mail.png"),
								logoClass: "h-4 w-4 object-cover",
							},
							{
								name: "adidas",
								logo: getAssetPath("/assets/logos/logo-adidas.svg"),
								logoClass: "h-[14px] w-[22px]",
							},
							{
								name: "Glide",
								logo: getAssetPath("/assets/logos/logo-glide.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "August Health",
								logo: getAssetPath("/assets/logos/logo-augusthealth.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Aware",
								logo: getAssetPath("/assets/logos/logo-aware.svg"),
								logoClass: "h-4 w-[17px]",
							},
							{
								name: "BTP Consultants",
								logo: getAssetPath("/assets/logos/logo-btpconsultants.svg"),
								logoClass: "h-4 w-4",
							},
						].map((company, index) => (
							<div
								key={`row1-second-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								<span className="text-base font-semibold text-[#b5b5be]">
									{company.name}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Row 2: Scroll Right */}
				<div className="logo-row logo-row-right absolute left-0 top-[80px] flex items-center gap-12 whitespace-nowrap">
					<div className="flex items-center gap-12">
						{[
							{
								name: "Ender",
								logo: getAssetPath("/assets/logos/logo-ender.png"),
								logoClass: "h-5 w-[14px] object-contain",
							},
							{
								name: "CalcTree",
								logo: getAssetPath("/assets/logos/logo-calctree.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Candle.fi",
								logo: getAssetPath("/assets/logos/logo-candlefi.png"),
								logoClass: "h-5 w-5 object-cover",
							},
							{
								name: "CI Financial",
								logo: getAssetPath("/assets/logos/logo-cifinancial.png"),
								logoClass: "h-4 w-4 object-contain",
							},
							{
								name: "Coralogix",
								logo: getAssetPath("/assets/logos/logo-coralogix.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "dectus",
								logo: getAssetPath("/assets/logos/logo-dectus.svg"),
								logoClass: "h-5 w-[17px]",
							},
							{
								name: "dreifach.ai",
								logo: getAssetPath("/assets/logos/logo-dreifach-part1.svg"),
								logoClass: "h-4 w-5",
							},
							{
								name: "DXOS",
								logo: getAssetPath("/assets/logos/logo-dxos.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "EMBEDDED INSURANCE",
								logo: getAssetPath("/assets/logos/logo-embedded-insurance.svg"),
								logoClass: "h-[14px] w-[15px]",
								isTwoLine: true,
							},
							{
								name: "GEODIS",
								logo: getAssetPath("/assets/logos/logo-geodis.svg"),
								logoClass: "h-5 w-5",
							},
						].map((company, index) => (
							<div
								key={`row2-first-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								{company.isTwoLine ? (
									<div className="text-xs font-semibold leading-tight text-[#b5b5be]">
										<div>EMBEDDED</div>
										<div>INSURANCE</div>
									</div>
								) : (
									<span className="text-base font-semibold text-[#b5b5be]">
										{company.name}
									</span>
								)}
							</div>
						))}
					</div>
					<div className="flex items-center gap-12">
						{[
							{
								name: "Ender",
								logo: getAssetPath("/assets/logos/logo-ender.png"),
								logoClass: "h-5 w-[14px] object-contain",
							},
							{
								name: "CalcTree",
								logo: getAssetPath("/assets/logos/logo-calctree.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Candle.fi",
								logo: getAssetPath("/assets/logos/logo-candlefi.png"),
								logoClass: "h-5 w-5 object-cover",
							},
							{
								name: "CI Financial",
								logo: getAssetPath("/assets/logos/logo-cifinancial.png"),
								logoClass: "h-4 w-4 object-contain",
							},
							{
								name: "Coralogix",
								logo: getAssetPath("/assets/logos/logo-coralogix.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "dectus",
								logo: getAssetPath("/assets/logos/logo-dectus.svg"),
								logoClass: "h-5 w-[17px]",
							},
							{
								name: "dreifach.ai",
								logo: getAssetPath("/assets/logos/logo-dreifach-part1.svg"),
								logoClass: "h-4 w-5",
							},
							{
								name: "DXOS",
								logo: getAssetPath("/assets/logos/logo-dxos.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "EMBEDDED INSURANCE",
								logo: getAssetPath("/assets/logos/logo-embedded-insurance.svg"),
								logoClass: "h-[14px] w-[15px]",
								isTwoLine: true,
							},
							{
								name: "GEODIS",
								logo: getAssetPath("/assets/logos/logo-geodis.svg"),
								logoClass: "h-5 w-5",
							},
						].map((company, index) => (
							<div
								key={`row2-second-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								{company.isTwoLine ? (
									<div className="text-xs font-semibold leading-tight text-[#b5b5be]">
										<div>EMBEDDED</div>
										<div>INSURANCE</div>
									</div>
								) : (
									<span className="text-base font-semibold text-[#b5b5be]">
										{company.name}
									</span>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Row 3: Scroll Left */}
				<div className="logo-row logo-row-left absolute left-0 top-[160px] flex items-center gap-12 whitespace-nowrap">
					<div className="flex items-center gap-12">
						{[
							{
								name: "LiveStore",
								logo: getAssetPath("/assets/logos/logo-livestore.svg"),
								logoClass: "h-5 w-4",
							},
							{
								name: "kikin",
								logo: getAssetPath("/assets/logos/logo-kikin.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "ens labs",
								logo: getAssetPath("/assets/logos/logo-enslabs.svg"),
								logoClass: "h-4 w-[23px]",
							},
							{
								name: "freckle",
								logo: getAssetPath("/assets/logos/logo-freckle.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "Fortanix",
								logo: getAssetPath("/assets/logos/logo-fortanix.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Gale",
								logo: getAssetPath("/assets/logos/logo-gale.png"),
								logoClass: "h-5 w-5 object-contain",
							},
							{
								name: "GlobeCommerce",
								logo: getAssetPath("/assets/logos/logo-globecommerce.png"),
								logoClass: "h-5 w-5 object-cover",
							},
							{
								name: "Ping Identity",
								logo: getAssetPath("/assets/logos/logo-pingidentity.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "IYK",
								logo: getAssetPath("/assets/logos/logo-iyk.png"),
								logoClass: "h-[11px] w-[28px] object-cover",
							},
							{
								name: "inRev",
								logo: getAssetPath("/assets/logos/logo-inrev.svg"),
								logoClass: "h-4 w-[16px]",
							},
						].map((company, index) => (
							<div
								key={`row3-first-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								<span className="text-base font-semibold text-[#b5b5be]">
									{company.name}
								</span>
							</div>
						))}
					</div>
					<div className="flex items-center gap-12">
						{[
							{
								name: "LiveStore",
								logo: getAssetPath("/assets/logos/logo-livestore.svg"),
								logoClass: "h-5 w-4",
							},
							{
								name: "kikin",
								logo: getAssetPath("/assets/logos/logo-kikin.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "ens labs",
								logo: getAssetPath("/assets/logos/logo-enslabs.svg"),
								logoClass: "h-4 w-[23px]",
							},
							{
								name: "freckle",
								logo: getAssetPath("/assets/logos/logo-freckle.svg"),
								logoClass: "h-4 w-[13px]",
							},
							{
								name: "Fortanix",
								logo: getAssetPath("/assets/logos/logo-fortanix.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "Gale",
								logo: getAssetPath("/assets/logos/logo-gale.png"),
								logoClass: "h-5 w-5 object-contain",
							},
							{
								name: "GlobeCommerce",
								logo: getAssetPath("/assets/logos/logo-globecommerce.png"),
								logoClass: "h-5 w-5 object-cover",
							},
							{
								name: "Ping Identity",
								logo: getAssetPath("/assets/logos/logo-pingidentity.svg"),
								logoClass: "h-5 w-5",
							},
							{
								name: "IYK",
								logo: getAssetPath("/assets/logos/logo-iyk.png"),
								logoClass: "h-[11px] w-[28px] object-cover",
							},
							{
								name: "inRev",
								logo: getAssetPath("/assets/logos/logo-inrev.svg"),
								logoClass: "h-4 w-[16px]",
							},
						].map((company, index) => (
							<div
								key={`row3-second-${index}`}
								className="flex items-center gap-2"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
									<img
										src={company.logo}
										alt=""
										className={company.logoClass}
									/>
								</div>
								<span className="text-base font-semibold text-[#b5b5be]">
									{company.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
