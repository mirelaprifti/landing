interface YouTubeEmbedProps {
	videoId: string;
	title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
	return (
		<div className="not-prose my-8">
			<div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
				<div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
					<iframe
						src={`https://www.youtube.com/embed/${videoId}`}
						title={title ?? "YouTube video"}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						className="absolute inset-0 h-full w-full"
					/>
				</div>
			</div>
			{title && (
				<p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
					{title}
				</p>
			)}
		</div>
	);
}
