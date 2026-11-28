import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["", "/about", "/projects", "/projects/store", "/reels", "/tour", "/estimator", "/lab/quiz", "/lab/lighting", "/lab/panorama", "/lab/materials"];
const locales = [
  { l: "en", dir: "ltr" },
  { l: "ar", dir: "rtl" },
];

for (const { l, dir } of locales) {
  for (const r of routes) {
    test(`${l}${r || "/"} renders with ${dir}, no page errors, no serious axe issues`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.route("**/villa-tour/**", (route) => route.abort());
      await page.route("**/*tiktok*", (route) => route.abort());
      await page.goto(`/${l}${r}/`, { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("lang", l);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
      await expect(page.locator("h1").first()).toBeVisible();
      const { violations } = await new AxeBuilder({ page }).analyze();
      const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id);
      expect(bad).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("estimator default is 3,310,000 EGP", async ({ page }) => {
  await page.goto("/en/estimator/");
  await expect(page.locator("aside")).toContainText("3,310,000");
  await expect(page.locator("aside")).toContainText("20,688");
});

test("industrial filter shows an empty state, all shows 16 projects", async ({ page }) => {
  await page.goto("/en/projects/");
  await expect(page.locator("article")).toHaveCount(16);
  await page.getByRole("button", { name: "Industrial" }).click();
  await expect(page.locator("article")).toHaveCount(0);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(16);
});

test("quiz gives a result and retake restarts", async ({ page }) => {
  await page.goto("/en/lab/quiz/");
  for (let i = 0; i < 3; i++) await page.locator("main button").first().click();
  await expect(page.getByRole("button", { name: /retake/i })).toBeVisible();
  await page.getByRole("button", { name: /retake/i }).click();
  await expect(page.locator("main")).toContainText("Question 1");
});

test("locale switch goes to the other language", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("link", { name: "العربية" }).first().click();
  await expect(page).toHaveURL(/\/ar\//);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});
