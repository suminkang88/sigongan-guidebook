import { readFile, writeFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
import { load } from "cheerio";
const nav = JSON.parse(await readFile("src/data/navigation.json", "utf8"));
const source = JSON.parse(await readFile("docs/source/chapters.json", "utf8"));
const index = [];
const norm = (s) =>
  s
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[‘’'"“”`*]/g, "");
function markdownText(s) {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/〈(\d+)\. ([^〉]+)〉/g, "$1. $2")
    .replace(/^- \[ \] /gm, "")
    .replace(/^#{1,3} /gm, "")
    .replace(/^\d+\. /gm, "")
    .replace(/^- /gm, "")
    .replace(/^---$/gm, "")
    .replace(/^\|[ :|\-]+\|$/gm, "")
    .replace(/^\||\|$/gm, "")
    .replace(/\|/g, "");
}
for (const chapter of nav) {
  const html = await readFile(`dist${chapter.route}index.html`, "utf8");
  const $ = load(html);
  assert.equal($("h1").length, 1);
  assert.equal($("html").attr("lang"), "ko");
  const content = $("[data-guide-content]");
  const rendered = norm(content.text());
  const original = source.find((s) => s.key === chapter.key).body;
  // Verify every original prose block, table cell, list item and code example against rendered HTML.
  let fence = false;
  let code = [];
  let assertions = 0;
  for (const line of original.split("\n")) {
    if (line.startsWith("```")) {
      if (fence) {
        const expected = code.join("\n");
        assert(
          content
            .find("pre code")
            .toArray()
            .some((el) => $(el).text() === expected),
          `Missing code: ${chapter.key}`,
        );
        code = [];
        assertions++;
      }
      fence = !fence;
      continue;
    }
    if (fence) {
      code.push(line);
      continue;
    }
    if (!line.trim() || line === "---" || /^\|[ :|\-]+\|$/.test(line)) continue;
    const chunks = line.startsWith("|") ? line.slice(1, -1).split("|") : [line];
    for (let chunk of chunks) {
      chunk = chunk.replace(/^관련 장: /, "관련 장: ");
      if (
        chunk === "**핵심 요약**" ||
        chunk === "**Do**" ||
        chunk === "**Don’t**"
      )
        continue;
      const expected = norm(markdownText(chunk));
      if (expected)
        assert(
          rendered.includes(expected),
          `Content mismatch in ${chapter.key}: ${chunk.slice(0, 100)}`,
        );
      assertions++;
    }
  }
  content
    .find(".previous-next,.copy-status,.code-toolbar,.checklist-note")
    .remove();
  const headings = content.find("h2[id],h3[id]").toArray();
  for (let i = 0; i < headings.length; i++) {
    const h = $(headings[i]);
    const nodes = [];
    let node = headings[i].nextSibling;
    while (node) {
      if (
        node.type === "tag" &&
        (node.tagName === "h2" || node.tagName === "h3")
      )
        break;
      nodes.push(node);
      node = node.nextSibling;
    }
    const heading = h.text().trim();
    let text = "";
    if (h.parent().hasClass("source-list")) text = h.parent().text();
    else text = nodes.map((n) => $(n).text()).join(" ");
    const id = h.attr("id");
    index.push({
      chapter: chapter.title,
      heading,
      body: text.replace(/\s+/g, " ").trim(),
      url: chapter.route + "#" + id,
    });
  }
  console.log(
    `${chapter.key}: original content preserved (${assertions} checks).`,
  );
  for (const el of $('a[href^="/ko/guide/"]').toArray()) {
    const href = $(el).attr("href");
    const [path, hash] = href.split("#");
    await access(`dist${path}index.html`);
    if (hash) {
      const target = load(await readFile(`dist${path}index.html`, "utf8"));
      assert(target(`[id="${hash}"]`).length, `Missing anchor ${href}`);
    }
  }
  assert.equal($("table").length, $("table caption").length);
  assert.equal($('thead th:not([scope="col"])').length, 0);
  assert.equal(
    $("[data-guide-content] img").length,
    0,
    "Code examples must not execute",
  );
}
assert(index.length > 40);
assert(!JSON.stringify(index).includes("편집 검토 메모"));
assert(!JSON.stringify(index).includes("공통 발행 점검"));
await writeFile("dist/search-index.json", JSON.stringify(index));
await writeFile("public/search-index.json", JSON.stringify(index));
console.log(
  `Rendered content, local links, tables, escaped examples validated. Search index: ${index.length} sections.`,
);
