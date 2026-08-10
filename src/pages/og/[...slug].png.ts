import type { APIRoute, GetStaticPaths } from "astro";
import { generateOgImage, generateHomepageOgImage } from "../../og/og-image";
import { EPISODES } from "../../data/episodes";

interface OgPageDefinition {
	slug: string;
	title: string;
	description?: string;
	subtitle?: string;
}

const ogPages: OgPageDefinition[] = [
	{
		slug: "index",
		title: "Effect - Build production-grade software in TypeScript",
		description:
			"The TypeScript library for building production-grade software. One package, everything you need.",
	},
	{
		slug: "podcast",
		title: "Cause & Effect Podcast",
		description:
			"A podcast exploring how engineers are using Effect to build reliable, production-grade software in TypeScript",
	},
	{
		slug: "brand-assets",
		title: "Logo Guidelines - Effect",
		description: "Official Effect brand assets and logo usage guidelines",
	},
	{
		slug: "merch",
		title: "Merch - Effect",
		description: "Effect-branded merchandise for the community",
	},
	{
		slug: "events",
		title: "Events - Effect",
		description: "Effect community events and conferences",
	},
	{
		slug: "effect-days",
		title: "Effect Days - Conference for TypeScript Engineers",
		description: "The conference for TypeScript engineers building with Effect",
	},
	{
		slug: "events/code-of-conduct",
		title: "Code of Conduct - Effect Days",
		description: "Effect Days code of conduct",
	},
	{
		slug: "llms",
		title: "Effect for LLMs",
		description: "The missing standard library for TypeScript applications",
	},
	// Podcast episodes
	...EPISODES.map((episode) => ({
		slug: `podcast/episodes/episode-${episode.number}`,
		title: episode.title,
		description: episode.description,
		subtitle: `Cause & Effect — with ${episode.guest} (${episode.company})`,
	})),
];

export const getStaticPaths: GetStaticPaths = () => {
	return ogPages.map((page) => ({
		params: { slug: page.slug },
		props: {
			title: page.title,
			description: page.description,
			subtitle: page.subtitle,
		},
	}));
};

export const GET: APIRoute = async ({ params, props }) => {
	const { title, description, subtitle } = props as {
		title: string;
		description?: string;
		subtitle?: string;
	};

	const png =
		params.slug === "index"
			? await generateHomepageOgImage()
			: await generateOgImage({ title, description, subtitle });

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
