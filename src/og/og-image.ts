import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { loadFonts } from "./og-fonts";
import { createOgTemplate, createHomepageOgTemplate, type OgTemplateProps } from "./og-template";

export async function generateHomepageOgImage(): Promise<Buffer> {
  const fonts = await loadFonts();
  const template = createHomepageOgTemplate();

  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width" as const, value: 1200 },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

export async function generateOgImage(props: OgTemplateProps): Promise<Buffer> {
  const fonts = await loadFonts();
  const template = createOgTemplate(props);

  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width" as const, value: 1200 },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}
