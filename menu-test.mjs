import { chromium } from "playwright";

const base = "http://localhost:4322";
const path = process.argv[2] || "/blog";
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
      classes: panel?.className.split(" ").filter((c) => c.startsWith("mobile-menu")),
    };
  });

const burger = page.locator('button[aria-label="Open navigation menu"]');
const closeX = page.locator('button[aria-label="Close navigation menu"]');
const backdrop = page.locator("#mobile-menu-backdrop");

const step = async (label, fn) => {
  await fn();
  await page.waitForTimeout(500);
  console.log(label.padEnd(28), JSON.stringify(await state()));
};

console.log("initial".padEnd(28), JSON.stringify(await state()));
await step("open (burger)", () => burger.click());
await step("close (burger)", () => burger.click());
await step("open again (burger)", () => burger.click());
await step("close (X button)", () => closeX.click({ force: true }));
await step("open after X", () => burger.click());
await step("close (backdrop)", () => backdrop.click({ force: true, position: { x: 20, y: 400 } }));
await step("open after backdrop", () => burger.click());
await browser.close();
