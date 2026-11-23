import { test, expect } from "@playwright/test";
test("theme and text size persist; reset removes only the owned key", async ({
  page,
}) => {
  await page.goto("/ko/guide/");
  await page.evaluate(() => localStorage.setItem("unrelated-test", "keep"));
  await page.getByRole("button", { name: "접근성 설정", exact: true }).click();
  await page.getByRole("radio", { name: "다크", exact: true }).check();
  await page.getByRole("radio", { name: "아주 크게", exact: true }).check();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute(
    "data-text-size",
    "xlarge",
  );
  await page.getByRole("button", { name: "접근성 설정", exact: true }).click();
  await page.getByRole("button", { name: "설정 초기화" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  expect(
    await page.evaluate(() => localStorage.getItem("unrelated-test")),
  ).toBe("keep");
  expect(
    await page.evaluate(() =>
      localStorage.getItem("sigongan-guide-preferences-v1"),
    ),
  ).toBeNull();
});
test("system changes apply; explicit choice remains", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/ko/guide/");
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(16, 19, 34)");
  await page.emulateMedia({ colorScheme: "light" });
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(255, 255, 255)");
  await page.getByRole("button", { name: "접근성 설정", exact: true }).click();
  await page.getByRole("radio", { name: "다크", exact: true }).check();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("blocked storage and corrupt settings do not break reading", async ({
  browser,
}) => {
  for (const mode of ["blocked", "corrupt", "invalid"]) {
    const context = await browser.newContext();
    await context.addInitScript((mode) => {
      if (mode === "blocked")
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new Error("blocked");
          },
        });
      else
        window.localStorage.setItem(
          "sigongan-guide-preferences-v1",
          mode === "corrupt"
            ? "{oops"
            : JSON.stringify({
                themePreference: "javascript:bad",
                textSize: "9000",
              }),
        );
    }, mode);
    const page = await context.newPage();
    await page.goto("/ko/guide/alt-text-principles/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
    await page
      .getByRole("button", { name: "접근성 설정", exact: true })
      .click();
    await page.getByRole("radio", { name: "다크", exact: true }).check();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await context.close();
  }
});
test("no JS keeps all chapter links and rendered content", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/ko/guide/alt-text-principles/");
  await expect(page.locator("#guide-menu")).toBeVisible();
  await expect(page.locator(".guide-sidebar .nav-group a")).toHaveCount(6);
  await expect(page.locator("#concise")).toBeVisible();
  await expect(page.locator("[data-settings-toggle]")).toBeHidden();
  await page.goto("/ko/guide/search/");
  await expect(page.locator("#search-js-note")).toContainText(
    "JavaScript가 필요",
  );
  await context.close();
});
test("code examples remain escaped, copy success and failure preserve focus", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/ko/guide/alt-text-principles/#decorative");
  await expect(page.locator("[data-guide-content] img")).toHaveCount(0);
  const button = page.locator("[data-copy]").first();
  await button.click();
  await expect(page.locator(".copy-status").first()).toContainText(
    "코드를 복사했습니다",
  );
  await expect(button).toBeFocused();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    '<img src="divider.svg" alt="">',
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("blocked");
    };
  });
  await button.click();
  await expect(page.locator(".copy-status").first()).toContainText("직접 선택");
  await expect(button).toBeFocused();
});
test("checklist starts empty and resets on refresh", async ({ page }) => {
  await page.goto("/ko/guide/alt-text-principles/#checklist");
  const boxes = page.locator(".checklist input");
  await expect(boxes.first()).not.toBeChecked();
  await boxes.first().check();
  await page.reload();
  await expect(boxes.first()).not.toBeChecked();
});
