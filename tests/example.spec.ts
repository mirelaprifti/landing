import { test, expect } from "@playwright/test";

test("homepage loads successfully", async ({ page }) => {
	await page.goto("/");

	// Wait for the page to load
	await expect(page).toHaveTitle(/Effect/i);
});

test("has visible content", async ({ page }) => {
	await page.goto("/");

	// Check that the page has some visible content
	const body = page.locator("body");
	await expect(body).toBeVisible();
});
