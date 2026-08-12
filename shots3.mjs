import { chromium } from "playwright";
const out = "/private/tmp/claude-505/-Users-matechsgarage-Code-lp-new/e6b68669-3978-4ca2-a59f-e7230047f85f/scratchpad";
const browser = await chromium.launch();

const p1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p1.addInitScript(() => localStorage.setItem("theme", "dark"));
await p1.goto("http://localhost:4321/play", { waitUntil: "networkidle" });
await p1.waitForTimeout(2200);
await p1.getByRole("tab", { name: "stacked", exact: true }).click();
await p1.waitForTimeout(300);
await p1.screenshot({ path: `${out}/place-stacked.png`, clip: { x: 0, y: 0, width: 1440, height: 330 } });
// with the share popover open, to check the second row does not collide
await p1.getByRole("button", { name: "Share" }).click();
await p1.waitForTimeout(400);
await p1.screenshot({ path: `${out}/stacked-share.png`, clip: { x: 700, y: 90, width: 740, height: 420 } });
await p1.close();

const p2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
await p2.addInitScript(() => localStorage.setItem("theme", "dark"));
await p2.goto("http://localhost:4321/play", { waitUntil: "networkidle" });
await p2.waitForTimeout(2200);
await p2.getByRole("tab", { name: "stacked", exact: true }).click();
await p2.waitForTimeout(300);
console.log("stacked switch on mobile:", await p2.getByRole("button", { name: "v4 (rc)" }).count());
await p2.screenshot({ path: `${out}/mobile-stacked.png`, clip: { x: 0, y: 0, width: 390, height: 300 } });
await browser.close();
