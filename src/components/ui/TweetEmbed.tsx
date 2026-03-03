import { useEffect, useRef } from "react";

interface TweetEmbedProps {
	tweetId: string;
}

export function TweetEmbed({ tweetId }: TweetEmbedProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Load Twitter widgets script if not already present
		const scriptId = "twitter-widgets-js";
		if (!document.getElementById(scriptId)) {
			const script = document.createElement("script");
			script.id = scriptId;
			script.src = "https://platform.twitter.com/widgets.js";
			script.async = true;
			document.head.appendChild(script);
			script.onload = () => {
				(window as any).twttr?.widgets?.createTweet(tweetId, container, {
					theme: document.documentElement.classList.contains("dark")
						? "dark"
						: "light",
					dnt: true,
					align: "center",
				});
			};
		} else {
			// Script already loaded, just create the tweet
			(window as any).twttr?.widgets?.createTweet(tweetId, container, {
				theme: document.documentElement.classList.contains("dark")
					? "dark"
					: "light",
				dnt: true,
				align: "center",
			});
		}

		return () => {
			if (container) {
				container.innerHTML = "";
			}
		};
	}, [tweetId]);

	return (
		<div className="not-prose my-8">
			<div
				ref={containerRef}
				className="flex min-h-[200px] items-center justify-center"
			>
				<div className="flex items-center gap-2 text-sm text-zinc-400">
					<i className="ri-twitter-x-line text-base" />
					Loading tweet...
				</div>
			</div>
		</div>
	);
}
