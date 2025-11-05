import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	output: "static",
	integrations: [
		react({
			include: ["**/react/*", "**/components/**/*", "**/examples/**/*"],
		}),
	],
	adapter: vercel(),
	image: {
		remotePatterns: [
			{ protocol: "https", hostname: "pbs.twimg.com" },
			{ protocol: "https", hostname: "i.pravatar.cc" },
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },
			{ protocol: "https", hostname: "cdn.discordapp.com" },
		],
	},
	redirects: {
		"/events": "https://effect.website/events/effect-days",
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
		ssr: {
			noExternal: ["effect", "motion"],
		},
	},
});
