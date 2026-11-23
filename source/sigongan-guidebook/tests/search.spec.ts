import { test, expect } from "@playwright/test";
import { normalize, search } from "../src/scripts/search-core";
test("Korean spacing, case, Unicode, synonyms and AND semantics", () => {
  const data = [
    {
      chapter: "가이드",
      heading: "대체텍스트 작성",
      body: "키보드 사용",
      url: "#alt",
    },
    {
      chapter: "WA 인증 취득",
      heading: "심사 비용",
      body: "웹 접근성 인증",
      url: "#wa",
    },
  ];
  expect(search(data, "alt 키보드").map((x) => x.url)).toEqual(["#alt"]);
  expect(search(data, "대체 텍스트").map((x) => x.url)).toEqual(["#alt"]);
  expect(search(data, "ＡＬＴ").map((x) => x.url)).toEqual(["#alt"]);
  expect(search(data, "wa 인증").map((x) => x.url)).toEqual(["#wa"]);
  expect(search(data, "웹 접근성 인증").map((x) => x.url)).toEqual(["#wa"]);
  expect(search(data, "alt 비용")).toHaveLength(0);
  expect(normalize("  ＡＬＴ   ")).toBe("대체텍스트");
});
for (const q of ["대체텍스트", "alt", "대체 텍스트", "WA 인증", "키보드"])
  test(`search query ${q}`, async ({ page }) => {
    await page.goto("/ko/guide/search/?q=" + encodeURIComponent(q));
    await expect(page.locator("#search-status")).toContainText(
      /검색 결과 \d+개/,
    );
    const links = page.locator("#search-results h2 a");
    expect(await links.count()).toBeGreaterThan(0);
    await expect(links.first()).toHaveAttribute("href", /^\/ko\/guide\/.+\/#/);
    await links.first().click();
    await expect(page.locator("h1")).toBeVisible();
    expect(new URL(page.url()).hash).not.toBe("");
  });
test("submitted query, empty result, history and XSS text are safe", async ({
  page,
}) => {
  await page.goto("/ko/guide/search/");
  const input = page.getByRole("searchbox", { name: "가이드 검색어" });
  await input.fill("검색에없는말12345");
  await page.getByRole("button", { name: "검색", exact: true }).click();
  await expect(page.locator("#search-status")).toContainText(
    "검색 결과가 없습니다",
  );
  await expect(input).toHaveValue("검색에없는말12345");
  await input.fill("<img src=x onerror=alert(1)>");
  await page.getByRole("button", { name: "검색", exact: true }).click();
  await expect(page.locator("#search-status")).toContainText(
    "<img src=x onerror=alert(1)>",
  );
  await expect(page.locator("#search-results img")).toHaveCount(0);
  await page.goBack();
  await expect(input).toHaveValue("검색에없는말12345");
});
