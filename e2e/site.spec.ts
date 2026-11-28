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
      page.on("console", (m) => /Content Security Policy|violates/i.test(m.text()) && errors.push(m.text()));
      await page.route("**/villa-tour/**", (route) => route.abort());
      await page.route("**/*tiktok*", (route) => route.abort());
      await page.goto(`/${l}${r}/`, { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("lang", l);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForTimeout(800); // let the 500 ms scroll reveal finish so axe does not read mid-fade colours
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

test("project quick view opens from the grid with URL state, deep link works, details page stays direct", async ({ page }) => {
  await page.goto("/en/projects/");
  await page.locator("article a").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveURL(/\?project=[a-z0-9-]+/);
  const url = page.url();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).not.toHaveURL(/project=/);
  await page.goto(url);
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.goto("/en/projects/store/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("root always opens English: fresh, after an Arabic visit, with an Arabic browser language and a stale cookie", async ({ browser }) => {
  for (const opts of [{}, { locale: "ar-EG" }]) {
    const ctx = await browser.newContext(opts);
    await ctx.addCookies([{ name: "NEXT_LOCALE", value: "ar", url: "http://localhost:4173" }]).catch(() => {});
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForURL(/\/en\/$/);
    await page.goto("/ar/");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await page.goto("/");
    await page.waitForURL(/\/en\/$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await ctx.close();
  }
});

test("locale switch keeps the corresponding page and stores nothing", async ({ page }) => {
  await page.goto("/en/projects/");
  await page.getByRole("link", { name: "العربية" }).first().click();
  await expect(page).toHaveURL(/\/ar\/projects\/$/);
  expect(await page.evaluate(() => document.cookie)).not.toContain("NEXT_LOCALE");
  await page.getByRole("link", { name: "English" }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/$/);
});

test("CSP meta is present and the tour starts and loads under it", async ({ page }) => {
  const csp: string[] = [];
  page.on("console", (m) => /Content Security Policy|violates/i.test(m.text()) && csp.push(m.text()));
  await page.goto("/en/tour/");
  await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);
  await page.getByRole("button").filter({ hasText: /start|begin|enter|explore/i }).first().click();
  const frame = page.locator("iframe").first();
  await expect(frame).toBeVisible();
  await expect(frame).toHaveAttribute("src", /villa-tour/);
  await page.waitForTimeout(1500);
  expect(csp).toEqual([]);
});

test("OpenGraph and Twitter image tags point at the shipped og.png", async ({ page, request }) => {
  await page.goto("/en/");
  const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  expect(og).toMatch(/og\.png$/);
  expect((await request.get("/og.png")).status()).toBe(200);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("gallery full screen opens, steps, closes with Escape and returns focus", async ({ page }) => {
  await page.goto("/en/projects/store/");
  const expand = page.getByRole("button", { name: /expand|full/i }).first();
  await expand.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("1 /");
  await dialog.getByRole("button", { name: /next/i }).click();
  await expect(dialog).toContainText("2 /");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(expand).toBeFocused();
});

test("estimator has 4 unit types, a 50-600 step 5 slider at 160, 7 tiers and 4 add-ons", async ({ page }) => {
  await page.goto("/en/estimator/");
  const range = page.locator('input[type="range"]');
  await expect(range).toHaveAttribute("min", "50");
  await expect(range).toHaveAttribute("max", "600");
  await expect(range).toHaveAttribute("step", "5");
  await expect(range).toHaveValue("160");
  await expect(page.getByRole("radio")).toHaveCount(7);
  await expect(page.locator('input[type="checkbox"]')).toHaveCount(4);
  for (const n of ["Apartment", "Villa / Duplex", "Corporate Office", "Retail Store"]) await expect(page.getByRole("button", { name: n })).toBeVisible();
  await page.getByRole("button", { name: "Retail Store" }).click();
  await expect(page.locator("aside")).not.toContainText("3,310,000");
});

test("lab: lighting has 3 modes, materials 3 presets, panorama 2 rooms with auto-rotate and reset", async ({ page }) => {
  await page.goto("/en/lab/lighting/");
  const modes = ["Morning Sun", "Golden Hour", "Night Architectural Scene"];
  for (const m of modes) await page.getByRole("button", { name: new RegExp(m) }).click();
  await expect(page.getByText("09:00 PM").first()).toBeVisible();
  await page.goto("/en/lab/materials/");
  await expect(page.getByRole("button", { name: /Royal Neoclassical|Warm Modern|Modern Executive/ })).toHaveCount(3);
  await page.getByRole("button", { name: /Warm Modern/ }).click();
  await page.goto("/en/lab/panorama/");
  await page.getByRole("button", { name: /Panoramic Master Suite/ }).click();
  await page.getByRole("button", { name: "Auto-rotate" }).click();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByRole("button", { name: /Modern Kitchen/ })).toBeVisible();
});

test("reels: only one TikTok player at a time, six videos", async ({ page }) => {
  await page.route("**/player/v1/**", (r) => r.abort());
  await page.goto("/en/reels/");
  const grid = page.locator("ul").filter({ has: page.locator("button") }).first();
  await expect(grid.locator("> li")).toHaveCount(6);
  await grid.locator("> li button").nth(0).click();
  await expect(page.locator("iframe[src*=tiktok]")).toHaveCount(1);
  await grid.locator("> li button").nth(1).click();
  await expect(page.locator("iframe[src*=tiktok]")).toHaveCount(1);
});

test("tour: poster first, iframe only after start, gone after leaving the route", async ({ page }) => {
  await page.route("**/villa-tour/**", (r) => r.abort());
  await page.goto("/en/tour/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Start the walkthrough" }).click();
  await expect(page.locator("iframe")).toHaveCount(1);
  await page.locator('header nav a[href$="/en/projects/"]').first().click();
  await expect(page).toHaveURL(/\/en\/projects\/$/);
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("mobile drawer opens, lists routes and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/en/");
  const toggle = page.locator('button[aria-controls="mobile-nav"]');
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav nav a").first()).toBeVisible();
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeHidden();
});

test("every header link navigates on a click from another route", async ({ page }) => {
  for (const [from, to] of [["/en/about/", "/en/estimator/"], ["/en/estimator/", "/en/reels/"], ["/en/reels/", "/en/projects/"], ["/en/projects/", "/en/tour/"], ["/en/tour/", "/en/about/"], ["/en/about/", "/en/"]]) {
    await page.goto(from);
    await page.locator(`header nav a[href$="${to}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  }
});
