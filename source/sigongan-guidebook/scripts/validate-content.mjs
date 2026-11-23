import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
const nav = JSON.parse(await readFile("src/data/navigation.json", "utf8"));
const files = (await readdir("src/content/guide")).filter((f) =>
  f.endsWith(".mdx"),
);
assert.equal(files.length, 6);
assert.equal(new Set(nav.map((c) => c.route)).size, 6);
const anchors = [
  "overview",
  "concise",
  "context",
  "image-words",
  "avoid-duplication",
  "decorative",
  "accurate-functional",
  "punctuation",
  "complex-images",
  "checklist",
  "faq",
];
for (const item of nav) {
  const mdx = await readFile(`src/content/guide/${item.key}.mdx`, "utf8");
  assert(mdx.includes(`route: "${item.route}"`));
  assert(mdx.includes(`key: "${item.key}"`));
  assert(mdx.includes(`title: ${JSON.stringify(item.title)}`));
  assert(!mdx.includes("편집 검토 메모"));
  assert(!mdx.includes("공통 발행 점검"));
  assert(!/^# /m.test(mdx));
  assert(mdx.includes('reviewedAt: "2026-11-23"'));
  const ids = [...mdx.matchAll(/<h2 id="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  assert(ids.every((id) => /^[a-z][a-z-]*$/.test(id)));
  if (item.order === 3) assert.deepEqual(ids, anchors);
  const sections = JSON.parse(mdx.match(/^sections: (.+)$/m)[1]);
  const allIds = [...mdx.matchAll(/<h[23] id="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(sections.map((section) => section.id), allIds, `TOC mismatch: ${item.key}`);
  assert(allIds.every((id) => /^[a-z][a-z0-9-]*$/.test(id)));
}
console.log(
  "Content validation passed: 6 chapters, routes, reviewed dates, stable anchors, private notes excluded.",
);
