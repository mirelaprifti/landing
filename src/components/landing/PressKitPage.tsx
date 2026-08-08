import { Icon } from "@/components/ui/Icon";
import { getAssetPath } from "../../utils/assetPath";
import { GridOverlay } from "../GridOverlay";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

const COMBINATION_MARK = {
	name: "// Combination mark",
	description: "The primary way we show the Effect brand.",
	files: {
		svg: {
			black: "effect-logo/Combination mark/SVG/effect-logo-black.svg",
			white: "effect-logo/Combination mark/SVG/effect-logo-white.svg",
		},
		png: {
			black: "effect-logo/Combination mark/PNG/effect-logo-black.png",
			white: "effect-logo/Combination mark/PNG/effect-logo-white.png",
		},
	},
};

const LOGO_SYMBOL = {
	name: "// Logo symbol",
	description: "Used when there is not enough space for the combination mark.",
	files: {
		svg: {
			black: "effect-logo/Logo symbol/SVG/effect-logomark-black.svg",
			white: "effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
		},
		png: {
			black: "effect-logo/Logo symbol/PNG/effect-logomark-black.png",
			white: "effect-logo/Logo symbol/PNG/effect-logomark-white.png",
		},
	},
};

function DownloadLink({ href, label }: { href: string; label: string }) {
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = href;
		link.download = href.split("/").pop() || label;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button
			type="button"
			onClick={handleDownload}
			className="cursor-pointer text-sm text-zinc-900 underline transition-colors hover:no-underline dark:text-white"
		>
			{label}
		</button>
	);
}

export function PressKitPage() {
	return (
		<div className="relative min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
			{/* Dithered background overlay */}
			<div
				className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.03] dark:block"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
					backgroundSize: "4px 4px",
				}}
			/>
			{/* Skip Navigation Link */}
			<a
				href="#main-content"
				className="absolute -left-[9999px] z-[999] rounded-br-lg bg-zinc-200 px-6 py-4 font-semibold text-zinc-900 no-underline focus:top-0 focus:left-0 dark:bg-zinc-800 dark:text-white"
			>
				Skip to main content
			</a>

			<Navigation activePath="/brand-assets" />
			<GridOverlay />

			{/* Vertical border lines container */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[60] hidden lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					{/* Left vertical line */}
					<div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-200 dark:bg-zinc-800" />
					{/* Right vertical line */}
					<div className="absolute top-0 right-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Center vertical line - dashed, behind content */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 hidden px-8 lg:block">
				<div className="relative mx-auto h-full w-full max-w-[73.75rem]">
					<div
						className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 text-zinc-200 dark:text-zinc-800"
						style={{
							width: "1px",
							backgroundImage:
								"repeating-linear-gradient(to bottom, currentColor 0px, currentColor 2px, transparent 2px, transparent 4px)",
							maskImage:
								"linear-gradient(to bottom, black 0%, black 200px, transparent 300px, transparent 350px, black 450px, black 100%)",
							WebkitMaskImage:
								"linear-gradient(to bottom, black 0%, black 200px, transparent 300px, transparent 350px, black 450px, black 100%)",
						}}
					/>
				</div>
			</div>

			<main id="main-content" className="relative z-10 pt-16">
				{/* Hero Section */}
				<section className="relative w-full pt-16 pb-12 md:pt-20 md:pb-16">
					{/* Grid background */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							backgroundImage: `
                linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
              `,
							backgroundSize: "196.6px 171px",
							backgroundPosition: "calc(50% + 97px) -9px",
						}}
					/>

					{/* Fade out grid at top and bottom */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, var(--page-fade) 0%, transparent 20%, transparent 60%, var(--page-fade) 100%)",
						}}
					/>

					{/* Subtle glow */}
					<div
						className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
						style={{
							background: `
                radial-gradient(ellipse 50% 80% at 70% -20%, var(--hero-glow-b) 0%, transparent 50%),
                radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
              `,
						}}
					/>

					<div className="relative mx-auto w-full max-w-[73.75rem] px-4">
						<p className="mb-3 font-mono text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
							// Logo
						</p>
						<h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-white">
							Effect logo guidelines
						</h1>
						<p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
							Please follow our guidelines when using the Effect logo for
							presentations, articles, and other media.
						</p>
					</div>
				</section>

				{/* Logos Section - Two columns */}
				<section className="py-8">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-200 pt-24 dark:border-zinc-800">
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
								{/* Combination Mark */}
								<div>
									<h2 className="leading-tighter mb-4 font-mono text-sm tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
										{COMBINATION_MARK.name}
									</h2>

									{/* Logo Preview */}
									<div className="mb-2 flex items-center justify-start py-6">
										<img
											src={getAssetPath(
												`/assets/${COMBINATION_MARK.files.svg.black}`,
											)}
											alt="Effect combination mark"
											className="h-14 w-auto dark:invert"
										/>
									</div>

									<p className="mb-4 text-base text-zinc-600 dark:text-zinc-400">
										{COMBINATION_MARK.description}
									</p>

									{/* Download Links */}
									<div className="flex items-center gap-2">
										<Icon
											name="download"
											className="text-base text-zinc-600 dark:text-zinc-400"
										/>
										<span className="text-sm text-zinc-600 dark:text-zinc-400">
											Download:
										</span>
										<DownloadLink
											href={getAssetPath(
												`/assets/${COMBINATION_MARK.files.png.black}`,
											)}
											label="PNG"
										/>
										<DownloadLink
											href={getAssetPath(
												`/assets/${COMBINATION_MARK.files.svg.black}`,
											)}
											label="SVG"
										/>
									</div>
								</div>

								{/* Logo Symbol */}
								<div>
									<h2 className="leading-tighter mb-4 font-mono text-sm tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
										{LOGO_SYMBOL.name}
									</h2>

									{/* Logo Preview */}
									<div className="mb-2 flex items-center justify-start py-6">
										<img
											src={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.svg.black}`,
											)}
											alt="Effect logo symbol"
											className="h-14 w-auto dark:invert"
										/>
									</div>

									<p className="mb-4 text-base text-zinc-600 dark:text-zinc-400">
										{LOGO_SYMBOL.description}
									</p>

									{/* Download Links */}
									<div className="flex items-center gap-2">
										<Icon
											name="download"
											className="text-base text-zinc-600 dark:text-zinc-400"
										/>
										<span className="text-sm text-zinc-600 dark:text-zinc-400">
											Download:
										</span>
										<DownloadLink
											href={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.png.black}`,
											)}
											label="PNG"
										/>
										<DownloadLink
											href={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.svg.black}`,
											)}
											label="SVG"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Ground Rules Section */}
				<section className="pt-24">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="border-t border-zinc-200 pt-24 dark:border-zinc-800">
							<h2 className="leading-tighter mb-8 font-mono text-sm tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
								// Ground rules
							</h2>

							{/* Do's - 3 column grid */}
							<div className="mb-24 grid grid-cols-1 gap-4 md:grid-cols-3">
								{/* Use white on dark */}
								<div className="flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center border border-zinc-300/75 bg-zinc-950 dark:border-zinc-700/75">
										<img
											src={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.svg.white}`,
											)}
											alt="White logo on dark"
											className="h-24 w-auto"
										/>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Use the white logo on a dark background.
									</span>
								</div>

								{/* Use black on light */}
								<div className="flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center border border-zinc-300 bg-white">
										<img
											src={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.svg.black}`,
											)}
											alt="Black logo on light"
											className="h-24 w-auto"
										/>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Use the black logo on a light background.
									</span>
								</div>

								{/* Can use on image */}
								<div className="flex flex-col gap-3">
									<div
										className="relative flex h-52 items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800"
										style={{
											background:
												"linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.35) 100%)",
										}}
									>
										{/* Abstract shapes */}
										<div
											className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-30"
											style={{
												background:
													"radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
											}}
										/>
										<div
											className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-25"
											style={{
												background:
													"radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, transparent 70%)",
											}}
										/>
										<div
											className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full opacity-20"
											style={{
												background:
													"radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)",
											}}
										/>
										<img
											src={getAssetPath(
												`/assets/${LOGO_SYMBOL.files.svg.white}`,
											)}
											alt="Logo on image"
											className="relative z-10 h-24 w-auto"
										/>
									</div>
									<span className="text-base leading-tight text-zinc-600 dark:text-zinc-400">
										Use a gradient or image background, as long as the logo is
										clearly visible and legible.
									</span>
								</div>
							</div>

							{/* Don'ts - 2x2 grid */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-16">
								{/* Don't change colors */}
								<div className="flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center gap-16 border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Black logo correct"
												className="h-20 w-auto"
											/>
											<Icon
												name="circle-check"
												className="absolute -right-4 -bottom-4 text-lg text-green-500"
											/>
										</div>
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Colored logo wrong"
												className="h-20 w-auto"
												style={{
													filter:
														"brightness(0) saturate(100%) invert(45%) sepia(95%) saturate(1000%) hue-rotate(220deg)",
												}}
											/>
											<Icon
												name="circle-x"
												className="absolute -right-4 -bottom-4 text-lg text-red-500"
											/>
										</div>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Do not make the logo any color other than black or white.
									</span>
								</div>

								{/* Don't stretch */}
								<div className="mb-4 flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center gap-20 border border-zinc-200 bg-zinc-950 dark:border-zinc-800 px-8">
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Normal logo"
												className="h-20 w-auto"
											/>
											<Icon
												name="circle-check"
												className="absolute -right-4 -bottom-4 text-lg text-green-500"
											/>
										</div>
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Stretched logo wrong"
												className="h-20 w-auto"
												style={{ transform: "scaleX(1.4)" }}
											/>
											<Icon
												name="circle-x"
												className="absolute -right-4 -bottom-4 text-lg text-red-500"
											/>
										</div>
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Squished logo wrong"
												className="h-20 w-auto"
												style={{ transform: "scaleY(1.4)" }}
											/>
											<Icon
												name="circle-x"
												className="absolute -right-4 -bottom-4 text-lg text-red-500"
											/>
										</div>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Do not shrink or stretch the logo. Be sure to maintain the
										proportions.
									</span>
								</div>

								{/* Don't add shadows */}
								<div className="flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center gap-16 border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Normal logo"
												className="h-20 w-auto"
											/>
											<Icon
												name="circle-check"
												className="absolute -right-4 -bottom-4 text-lg text-green-500"
											/>
										</div>
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Shadow logo wrong"
												className="h-20 w-auto"
												style={{
													filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
												}}
											/>
											<Icon
												name="circle-x"
												className="absolute -right-4 -bottom-4 text-lg text-red-500"
											/>
										</div>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Do not place drop shadows.
									</span>
								</div>

								{/* Don't rotate */}
								<div className="flex flex-col gap-3">
									<div className="flex h-52 items-center justify-center gap-16 border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Normal logo"
												className="h-20 w-auto"
											/>
											<Icon
												name="circle-check"
												className="absolute -right-4 -bottom-4 text-lg text-green-500"
											/>
										</div>
										<div className="relative">
											<img
												src={getAssetPath(
													`/assets/${LOGO_SYMBOL.files.svg.white}`,
												)}
												alt="Rotated logo wrong"
												className="h-20 w-auto"
												style={{ transform: "rotate(15deg)" }}
											/>
											<Icon
												name="circle-x"
												className="absolute -right-4 -bottom-4 text-lg text-red-500"
											/>
										</div>
									</div>
									<span className="text-base text-zinc-600 dark:text-zinc-400">
										Do not rotate the logo.
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Clear Space & Minimum Size Section */}
				<section className="border-b border-zinc-200 pb-12 dark:border-zinc-800">
					<div className="mx-auto w-full max-w-[73.75rem] px-4">
						<div className="py-24">
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{/* Clear Space */}
								<div>
									<h2 className="leading-tighter mb-8 font-mono text-sm tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
										// Clear space
									</h2>
									<div className="flex flex-col gap-3">
										<div className="flex h-52 items-center justify-center gap-12 border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
											{/* Logo symbol with padding visualization */}
											<div
												className="relative p-4"
												style={{
													backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 3px,
                            rgba(113, 113, 122, 0.15) 3px,
                            rgba(113, 113, 122, 0.15) 3.5px
                          )`,
													backgroundColor: "rgba(113, 113, 122, 0.15)",
												}}
											>
												<div className="bg-zinc-900/30">
													<img
														src={getAssetPath(
															`/assets/${LOGO_SYMBOL.files.svg.white}`,
														)}
														alt="Logo symbol with clear space"
														className="h-10 w-auto"
													/>
												</div>
											</div>
											{/* Combination mark with padding visualization */}
											<div
												className="relative p-5"
												style={{
													backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 3px,
                            rgba(113, 113, 122, 0.15) 4px,
                            rgba(113, 113, 122, 0.15) 4px
                          )`,
													backgroundColor: "rgba(113, 113, 122, 0.15)",
												}}
											>
												<div className="bg-zinc-900/30">
													<img
														src={getAssetPath(
															`/assets/${COMBINATION_MARK.files.svg.white}`,
														)}
														alt="Combination mark with clear space"
														className="h-10 w-auto"
													/>
												</div>
											</div>
										</div>
										<span className="text-base text-zinc-600 dark:text-zinc-400">
											Maintain clear space of at least 50% of the logo height on
											all sides.
										</span>
									</div>
								</div>

								{/* Minimum Size */}
								<div>
									<h2 className="leading-tighter mb-8 font-mono text-sm tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
										// Minimum size
									</h2>
									<div className="flex flex-col gap-3">
										<div className="flex h-52 items-center justify-center gap-16 border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
											{/* Logo symbol minimum */}
											<div className="flex flex-col items-center gap-2 py-4">
												<img
													src={getAssetPath(
														`/assets/${LOGO_SYMBOL.files.svg.white}`,
													)}
													alt="Logo symbol minimum size"
													className="h-6 w-auto"
												/>
												<span className="mb-[-1] font-mono text-xs text-zinc-400">
													24px height
												</span>
											</div>
											{/* Combination mark minimum */}
											<div className="flex flex-col items-center gap-2">
												<img
													src={getAssetPath(
														`/assets/${COMBINATION_MARK.files.svg.white}`,
													)}
													alt="Combination mark minimum size"
													className="h-6 w-auto"
												/>
												<span className="mb-[-1] font-mono text-xs text-zinc-400">
													24px height
												</span>
											</div>
										</div>
										<span className="text-base text-zinc-600 dark:text-zinc-400">
											To ensure legibility, never scale the logo below the
											minimum size above.
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer activePath="/brand-assets" hideCommunityBorder />
		</div>
	);
}
