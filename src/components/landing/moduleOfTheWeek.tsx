import { BLOG_POSTS, type BlogPost } from "../../data/blog";

/** Module of the Week data and pieces shared by the series page and the
 *  homepage section. */

export const MOTW_URL = "/module-of-the-week";

// Posts are newest first, so the oldest is entry 01
export const MODULES = BLOG_POSTS.filter((p) =>
	p.tags.includes("Module of the Week"),
);

/** A module's number in the series: the oldest is 01. */
export const entryOf = (post: BlogPost) =>
	MODULES.length - MODULES.indexOf(post);

// "Module of the Week - Cluster, Part 2" → "Cluster, Part 2"
export const moduleTitle = (post: BlogPost) =>
	post.title.replace(/^Module of the Week\s*-\s*/, "");

export const videoUrl = (post: BlogPost) =>
	post.video ? `https://www.youtube.com/watch?v=${post.video.youtubeId}` : null;

/** Video thumbnail with the running time in its corner; links to YouTube. */
export function ModuleThumbnail({
	post,
	flush = false,
}: {
	post: BlogPost;
	/** Fill the cell edge to edge, without its own border. */
	flush?: boolean;
}) {
	const url = videoUrl(post);
	if (!post.video || !url) return null;
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Watch ${moduleTitle(post)} on YouTube`}
			className={`group relative block aspect-video overflow-hidden ${flush ? "h-full w-full" : "border border-zinc-200 dark:border-zinc-800"}`}
		>
			<img
				// sddefault (640px) is the largest these videos have; no maxres
				src={`https://i.ytimg.com/vi/${post.video.youtubeId}/sddefault.jpg`}
				alt=""
				loading="lazy"
				className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
			/>
			{/* Play mark + running time in the corner: reads as a video
			    without covering the title baked into the thumbnail */}
			<span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm bg-zinc-950/80 py-0.5 pr-1.5 pl-1 font-mono text-xs text-white tabular-nums transition-colors group-hover:bg-zinc-950">
				<i className="ri-play-fill text-sm leading-none" aria-hidden="true" />
				{post.video.duration}
			</span>
		</a>
	);
}
