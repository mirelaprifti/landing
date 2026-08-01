import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	site: "https://mirelaprifti.github.io",
	base: import.meta.env.PROD ? "/landing" : "/",
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
		"/effect-days": "/events/effect-days",
		"/effect-talks": "/community-hub",
		"/spread-the-effect": "/community-hub",
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
