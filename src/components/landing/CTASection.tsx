export function CTASection() {
	return (
		<section className="relative w-full px-4 md:px-8">
			{/* Top gradient border */}
			<div
				className="absolute left-0 right-0 top-0 h-[2px]"
				style={{
					background:
						"linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
				}}
			/>

			<div className="mx-auto w-full max-w-[80rem]">
				{/* Content Wrapper */}
				<div className="relative mx-auto flex w-full flex-col items-center gap-12 py-20 md:py-32 lg:gap-16">
					{/* Left dashed border */}
					<div
						className="absolute bottom-0 left-0 top-[2px] w-[1px]"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Right dashed border */}
					<div
						className="absolute bottom-0 right-0 top-[2px] w-[1px]"
						style={{
							background: "#3f3f46",
							WebkitMask:
								"repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
							mask: "repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 4px)",
						}}
					/>

					{/* Heading and Description Container */}
					<div className="flex flex-col items-center gap-8 px-6">
						{/* Heading */}
						<h2 className="text-center text-[39px] font-bold leading-[1.25] text-white">
							Build with Effect? Let's connect!
						</h2>

						{/* Description */}
						<div className="flex flex-col items-center gap-4">
							<p className="text-center text-[20px] leading-[1.35] text-zinc-300">
								We'd love to hear how you're using Effect.
							</p>
						</div>
					</div>

					{/* Links Section */}
					<div className="flex w-full flex-col items-center gap-8">
						{/* Top dashed border */}
						<div
							className="h-[1px] w-full"
							style={{
								background: "#3f3f46",
								WebkitMask:
									"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
								mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							}}
						/>

						{/* CTA Links Container */}
						<div className="flex w-full flex-col items-stretch justify-center gap-5 px-8 md:flex-row md:items-center">
							{/* Link 1: What are you building? */}
							<a
								href="https://forms.gle/BHtNKorGC4ERA5o38"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-black px-5 py-5 transition-colors hover:border-zinc-400 min-[480px]:w-auto"
							>
								<span className="flex h-6 w-6 items-center justify-center">
									<i className="ri-arrow-right-up-line text-lg leading-none text-white" />
								</span>
								<span className="whitespace-nowrap text-lg font-medium text-white">
									What are you building?
								</span>
							</a>

							{/* Link 2: Join our community */}
							<a
								href="https://discord.gg/effect-ts"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-black px-5 py-5 transition-colors hover:border-zinc-400 min-[480px]:w-auto"
							>
								<span className="flex h-6 w-6 items-center justify-center">
									<i className="ri-discord-fill text-lg leading-none text-white" />
								</span>
								<span className="whitespace-nowrap text-lg font-medium text-white">
									Join our community
								</span>
							</a>
						</div>

						{/* Bottom dashed border */}
						<div
							className="h-[1px] w-full"
							style={{
								background: "#3f3f46",
								WebkitMask:
									"repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
								mask: "repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 4px)",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
