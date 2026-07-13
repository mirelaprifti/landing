/**
 * Launch decoration #5: aurora glow. The hero's ambient glow becomes a slow
 * celebratory drift of emerald and violet for launch week. Ambient and
 * looping (not a one-shot event); purely decorative.
 */
export function LaunchAurora() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[620px] overflow-hidden motion-reduce:hidden"
		>
			<div
				className="absolute h-[520px] w-[840px] rounded-full opacity-[0.13] blur-3xl"
				style={{
					background:
						"radial-gradient(ellipse at center, #34d399 0%, transparent 65%)",
					top: "-260px",
					left: "8%",
					animation: "aurora-drift-a 11s ease-in-out infinite alternate",
				}}
			/>
			<div
				className="absolute h-[560px] w-[900px] rounded-full opacity-[0.12] blur-3xl"
				style={{
					background:
						"radial-gradient(ellipse at center, #8b5cf6 0%, transparent 65%)",
					top: "-300px",
					right: "4%",
					animation: "aurora-drift-b 13s ease-in-out infinite alternate",
				}}
			/>
			<div
				className="absolute h-[420px] w-[640px] rounded-full opacity-[0.08] blur-3xl"
				style={{
					background:
						"radial-gradient(ellipse at center, #38bdf8 0%, transparent 65%)",
					top: "-180px",
					left: "38%",
					animation: "aurora-drift-a 15s ease-in-out infinite alternate-reverse",
				}}
			/>
			<style>{`
				@keyframes aurora-drift-a {
					from { transform: translateX(0) translateY(0); }
					to { transform: translateX(90px) translateY(30px); }
				}
				@keyframes aurora-drift-b {
					from { transform: translateX(0) translateY(0); }
					to { transform: translateX(-110px) translateY(20px); }
				}
			`}</style>
		</div>
	);
}
