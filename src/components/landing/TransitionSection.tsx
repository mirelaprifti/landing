export function TransitionSection() {
	return (
		<section className="relative w-full overflow-hidden pt-12 md:pt-20">
			<div className="relative mx-auto w-full max-w-295 px-4">
				<div className="text-center max-w-[48rem] mx-auto">
					<p className="font-mono uppercase text-lg md:text-lg text-zinc-400">
						Effect gives TypeScript the missing pieces:
					</p>
					<p className="font-mono uppercase text-lg md:text-lg text-zinc-400 mt-1">
						typed errors, safe concurrency, built-in observability.
					</p>
				</div>

				{/* Dashed line connector */}
				<div
					className="mt-12 md:mt-16 h-px"
					style={{
						backgroundImage: 'repeating-linear-gradient(to right, rgb(39 39 42) 0px, rgb(39 39 42) 2px, transparent 2px, transparent 4px)'
					}}
				/>
			</div>
		</section>
	);
}
