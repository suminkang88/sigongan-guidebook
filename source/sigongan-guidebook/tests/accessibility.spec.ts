import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const route of [
  "",
  "introduction/",
  "legal-obligations/",
  "alt-text-principles/",
  "ai-alt-text/",
  "industry-guides/",
  "wa-certification/",
  "search/",
  "accessibility/",
])
  test(`axe ${route || "home"}`, async ({ page }) => {
    await page.goto("/ko/guide/" + route);
    const result = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
        "best-practice",
      ])
      .analyze();
    expect(result.violations).toEqual([]);
  });
for (const theme of ["light", "dark", "high-contrast"])
  test(`theme ${theme} at 320px with largest text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/ko/guide/wa-certification/");
    await page
      .getByRole("button", { name: "접근성 설정", exact: true })
      .click();
    await page
      .locator(`input[name="themePreference"][value="${theme}"]`)
      .check();
    await page.getByRole("radio", { name: "아주 크게", exact: true }).check();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
test("forced colors, reduced motion, 200% text and spacing preserve layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/ko/guide/alt-text-principles/");
  await page.addStyleTag({
    content:
      "html{font-size:200%!important} *{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "전체 목차", exact: true }).click();
  await expect(page.locator("#guide-menu")).toBeVisible();
  await expect(page.locator("h1")).toContainText("대체텍스트");
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBeTruthy();
});
test("tables expose caption, column/row headers and scroll regions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/ko/guide/wa-certification/");
  await expect(page.locator("table")).toHaveCount(2);
  for (const table of await page.locator("table").all()) {
    await expect(table.locator("caption")).not.toBeEmpty();
    expect(await table.locator("th[scope=col]").count()).toBeGreaterThan(0);
    expect(await table.locator("th[scope=row]").count()).toBeGreaterThan(0);
  }
  const region = page.locator("[data-table-scroll]").first();
  await expect(region).toHaveAttribute("tabindex", "0");
  await region.focus();
  const before = await region.evaluate((e) => e.scrollLeft);
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => region.evaluate((e) => e.scrollLeft))
    .toBeGreaterThan(before);
});
test("print styles retain content and sources", async ({ page }) => {
  await page.goto("/ko/guide/wa-certification/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".guide-sidebar")).toBeHidden();
  await expect(page.locator(".on-this-page")).toBeHidden();
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#sources")).toBeVisible();
  await expect(page.locator("caption")).toHaveCount(2);
  await page.pdf({
    path: "test-results/guide-print.pdf",
    format: "A4",
    printBackground: false,
  });
});
