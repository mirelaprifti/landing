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
			logo: getAssetPath("/assets/logos/vercel-logotype-dark.svg"),
			title: "Effect for Infra",
			href: "https://youtu.be/VZpr91dU03c",
			alt: "Vercel",
		},
		{
			logo: getAssetPath("/assets/logos/expand-ai.svg"),
			title: "Effect for AI Agents",
			href: "#",
			alt: "Expand Internal Tooling",
		},
		{
			logo: getAssetPath("/assets/logos/spiko-logo.svg"),
			title: "Effect for Fintech",
			href: "https://youtu.be/lFOHVZnJLew",
			alt: "Spiko",
		},
		{
			logo: getAssetPath("/assets/logos/open-router.svg"),
			title: "Effect for AI",
			href: "#",
			alt: "OpenRouter",
		},
		{
			logo: getAssetPath("/assets/logos/warp-logo-white.svg"),
			title: "Effect for DevTools",
			href: "#",
			alt: "Warp",
		},
	];

	return (
		<section className="relative overflow-hidden py-16 md:py-20 lg:pt-24 lg:pb-20">
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
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
					maskImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
				}}
			/>

			{/* Main Content Container */}
			<div className="relative mx-auto w-full">
				{/* Heading */}
				<h2 className="mb-12 text-center text-3xl font-bold leading-tight text-white md:mb-16">
					Designed for real-world complexity
				</h2>

				{/* 4 Use Case Cards with Decorative Line */}
				<div className="relative mb-20 w-full mx-auto max-w-[66.5rem]">
					{/* Decorative Lines (behind cards at text level) */}
					<div
						className="pointer-events-none absolute bottom-[48px] left-0 z-0 hidden h-[1px] w-full lg:block"
						style={{
							background: "#27272a",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Left dashed line */}
					<div
						className="pointer-events-none absolute z-0 hidden bottom-[48px]"
						style={{
							right: "100%",
							width: "calc((100vw - 66.5rem) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#27272a",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Right dashed line */}
					<div
						className="pointer-events-none absolute z-0 hidden bottom-[48px]"
						style={{
							left: "100%",
							width: "calc((100vw - 66.5rem) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#27272a",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Left dashed line - Top */}
					<div
						className="pointer-events-none absolute z-0 hidden top-[160px]"
						style={{
							right: "100%",
							width: "calc((100vw - 66.5rem) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#27272a",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Right dashed line - Top */}
					<div
						className="pointer-events-none absolute z-0 hidden top-[160px]"
						style={{
							left: "100%",
							width: "calc((100vw - 66.5rem) / 2)",
							minWidth: "80px",
							height: "1px",
							background: "#27272a",
							WebkitMask:
								"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Cards Container */}
					<div className="use-case-cards relative z-10 grid w-full grid-cols-1 gap-0 min-[480px]:grid-cols-2 lg:grid-cols-3">
						{useCases.map((useCase, index) => {
							const isLastInRow = (index + 1) % 3 === 0 || index === useCases.length - 1;
							const isLastRow = index >= useCases.length - 3;

							return (
							<a
								key={index}
								href={useCase.href}
								{...(useCase.href.startsWith("http")
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className={`group relative block h-[208px] w-full overflow-hidden border-t border-l border-zinc-800 transition-all ${
									isLastInRow ? "border-r" : ""
								} ${isLastRow ? "border-b" : ""}`}
								style={{
									borderRadius: "0px",
									background: "linear-gradient(to bottom, rgba(24, 24, 27, 0.3), #09090b)",
									backdropFilter: "blur(5px)",
									WebkitBackdropFilter: "blur(5px)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "linear-gradient(to bottom, rgba(39, 39, 42, 0.6), #18181b)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "linear-gradient(to bottom, rgba(24, 24, 27, 0.3), #09090b)";
								}}
							>
									<div className="relative h-full w-full">
										<img
											src={useCase.logo}
											alt={useCase.alt}
											className={`absolute left-1/2 -translate-x-1/2 ${
												useCase.alt === "Warp"
													? "h-[28px] top-[67px]"
													: useCase.alt === "OpenRouter"
													? "h-[32px] top-[64px]"
													: useCase.alt === "Expand Internal Tooling"
													? "h-[32px] top-[65px]"
													: "h-[32px] top-[62px]"
											}`}
										/>
										<div className="absolute bottom-0 left-0 right-0 flex flex-col px-2 py-3">
											{/* Dashed border above text */}
											<div
												className="absolute top-0 left-0 right-0 h-[1px]"
												style={{
													background: "#27272a",
													WebkitMask:
														"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
													mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
												}}
											/>
										<div className="flex flex-row items-center justify-center gap-1 whitespace-nowrap">
											<span className="text-base font-medium tracking-[0.16px] text-white/88 md:text-base">
												{useCase.title}
											</span>
											<i className="ri-arrow-right-up-line text-base text-white/88" />
										</div>
									</div>
									</div>
							</a>
							);
						})}
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
