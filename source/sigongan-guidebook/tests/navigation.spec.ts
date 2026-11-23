import { test, expect } from "@playwright/test";
import chapters from "../src/data/navigation.json" with { type: "json" };
test("all six chapters have correct structure and directly reload", async ({
  page,
}) => {
  for (const c of chapters) {
    const response = await page.goto(c.route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(c.title);
    await expect(
      page.locator(`.guide-sidebar a[aria-current="page"]`),
    ).toHaveAttribute("href", c.route);
    await page.reload();
    await expect(page.locator("h1")).toHaveText(c.title);
  }
});
test("keyboard skip link, chapter navigation and previous next", async ({
  page,
}) => {
  await page.goto("/ko/guide/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "본문으로 건너뛰기" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const c3 = page
    .locator(".guide-sidebar a")
    .filter({ hasText: "대체텍스트 작성 7원칙" });
  await c3.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/alt-text-principles/);
  const c5 = page
    .locator(".guide-sidebar a")
    .filter({ hasText: "산업별 적용 가이드" });
  await c5.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/industry-guides/);
  const next = page
    .getByRole("navigation", { name: "이전 다음 장" })
    .getByRole("link", { name: /다음 장/ });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/wa-certification/);
  await expect(
    page.getByRole("navigation", { name: "이전 다음 장" }).getByRole("link"),
  ).toHaveCount(1);
});
for (const id of [
  "concise",
  "context",
  "image-words",
  "avoid-duplication",
  "decorative",
  "accurate-functional",
  "punctuation",
])
  test(`chapter 3 deep link #${id} is not obscured`, async ({ page }) => {
    await page.goto("/ko/guide/alt-text-principles/#" + id);
    await page.evaluate(() => document.fonts.ready);
    const title = page.locator("#" + id);
    await expect(title).toBeVisible();
    await expect
      .poll(async () => {
        const box = await title.boundingBox();
        const header = await page.locator("[data-header]").boundingBox();
        return box!.y - header!.height;
      })
      .toBeGreaterThanOrEqual(8);
  });
for (const width of [1440, 1024, 900, 899, 390, 320])
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/ko/guide/",
      "/ko/guide/alt-text-principles/",
      "/ko/guide/wa-certification/",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBeTruthy();
      if (width < 900) {
        await expect(
          page.getByRole("button", { name: "전체 목차", exact: true }),
        ).toBeVisible();
        await expect(page.locator("#guide-menu")).toBeHidden();
      } else { await expect(page.locator("#guide-menu")).toBeVisible(); await expect(page.getByRole("button",{name:"전체 목차",exact:true})).toBeHidden(); }
    }
    if (width < 900) {
      const b = page.getByRole("button", { name: "전체 목차", exact: true });
      await b.press("Enter");
      await expect(b).toHaveAttribute("aria-expanded", "true");
      await page.locator("#guide-menu a").first().focus();
      await page.keyboard.press("Escape");
      await expect(b).toBeFocused();
      await expect(b).toHaveAttribute("aria-expanded", "false");
    }
  });
test("404 offers recovery", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("페이지를 찾을 수 없습니다");
  await expect(page.getByRole("link", { name: "가이드 홈으로" })).toBeVisible();
});
