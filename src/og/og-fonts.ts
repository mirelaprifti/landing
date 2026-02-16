import fs from "node:fs";
import path from "node:path";

let fontsCache: { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[] | null = null;

export async function loadFonts() {
  if (fontsCache) return fontsCache;

  const regularPath = path.join(process.cwd(), "src/og/fonts/Inter-Regular.ttf");
  const boldPath = path.join(process.cwd(), "src/og/fonts/Inter-Bold.ttf");

  const regularData = fs.readFileSync(regularPath);
  const boldData = fs.readFileSync(boldPath);

  fontsCache = [
    { name: "Inter", data: regularData.buffer as ArrayBuffer, weight: 400, style: "normal" as const },
    { name: "Inter", data: boldData.buffer as ArrayBuffer, weight: 700, style: "normal" as const },
  ];

  return fontsCache;
}
