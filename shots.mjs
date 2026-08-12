import { chromium } from "playwright";
const out = "/private/tmp/claude-505/-Users-matechsgarage-Code-lp-new/e6b68669-3978-4ca2-a59f-e7230047f85f/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.addInitScript(() => localStorage.setItem("theme", "dark"));
await page.goto("http://localhost:4321/play", { waitUntil: "networkidle" });
await page.waitForTimeout(2200); // boot loader

for (const placement of ["toolbar", "sidebar", "navbar"]) {
  await page.getByRole("tab", { name: placement, exact: true }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/place-${placement}.png`, clip: { x: 0, y: 0, width: 1440, height: 420 } });
}

// switch version from the toolbar placement and watch the rebuild
await page.getByRole("tab", { name: "toolbar", exact: true }).click();
await page.getByRole("button", { name: "v4 (rc)" }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/switch-rebuilding.png`, clip: { x: 300, y: 200, width: 840, height: 400 } });
await page.waitForTimeout(2500);
// open package.json to confirm the file agrees with the control
await page.getByRole("button", { name: "package.json" }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/switch-after.png`, clip: { x: 0, y: 60, width: 1440, height: 560 } });
console.log("errors:", errors);
await browser.close();
