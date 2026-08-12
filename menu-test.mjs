import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:4321";
const path = process.argv[3] || "/blog";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + path, { waitUntil: "networkidle" });

const state = () =>
  page.evaluate(() => {
    const menu = document.getElementById("mobile-menu");
    const panel = document.getElementById("mobile-menu-panel");
    const r = panel?.getBoundingClientRect();
    return {
      hidden: menu?.classList.contains("hidden"),
      x: Math.round(r?.x ?? -1),
      inline: panel?.style.transform,
      anim: panel?.className.split(" ").filter((c) => c.includes("mobile-menu")),
    };
  });

const burger = page.locator('button[aria-label="Open navigation menu"]');
const closeX = page.locator('button[aria-label="Close navigation menu"]');
const backdrop = page.locator("#mobile-menu-backdrop");

const step = async (label, fn, wait = 500) => {
  try {
    await fn();
  } catch (e) {
    console.log(label.padEnd(26), "CLICK FAILED:", e.message.split("\n")[0]);
    return;
  }
  await page.waitForTimeout(wait);
  console.log(label.padEnd(26), JSON.stringify(await state()));
};

console.log("initial".padEnd(26), JSON.stringify(await state()));
await step("open #1", () => burger.click({ timeout: 4000 }));
await step("close via X", () => closeX.click({ timeout: 4000 }));
await step("open #2", () => burger.click({ timeout: 4000 }));
await step("close via backdrop", () => backdrop.click({ timeout: 4000, position: { x: 20, y: 500 } }));
await step("open #3", () => burger.click({ timeout: 4000 }));
await step("close via X", () => closeX.click({ timeout: 4000 }));
await step("open #4 (rapid)", () => burger.click({ timeout: 4000 }), 100);
await step("close #4 attempt", () => closeX.click({ timeout: 4000 }), 100);
await step("open #5", () => burger.click({ timeout: 4000 }));
await browser.close();
