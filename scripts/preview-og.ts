import { generateOgImage } from "../src/og/og-image";
import fs from "node:fs";

const png = await generateOgImage({
  title: "Effect - Build production-grade software in TypeScript",
  description: "The TypeScript library for building production-grade software. One package, everything you need.",
});

fs.writeFileSync("dist/og-preview.png", png);
console.log("Written to dist/og-preview.png");
