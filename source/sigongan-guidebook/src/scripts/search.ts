document.getElementById("search-js-note")?.setAttribute("hidden", "");
import { normalize, search, type SearchSection } from "./search-core";
const form = document.querySelector<HTMLFormElement>("#guide-search");
const input = document.querySelector<HTMLInputElement>("#search-query");
const results = document.querySelector<HTMLOListElement>("#search-results");
const status = document.querySelector<HTMLElement>("#search-status");
let index: SearchSection[] | undefined;
let searchRun = 0;
function highlighted(text: string, query: string) {
  const fragment = document.createDocumentFragment();
  const terms = query.normalize("NFKC").split(/\s+/).filter(Boolean);
  if (normalize(query).includes("대체텍스트"))
    terms.push("대체텍스트", "대체 텍스트", "alt");
  if (normalize(query).includes("wa인증"))
    terms.push("WA 인증", "웹 접근성 인증", "인증");
  if (!terms.length) {
    fragment.append(text);
    return fragment;
  }
  const pattern = new RegExp(
    terms
      .sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "giu",
  );
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    fragment.append(document.createTextNode(text.slice(last, match.index)));
    const mark = document.createElement("mark");
    mark.textContent = match[0];
    fragment.append(mark);
    last = (match.index || 0) + match[0].length;
  }
  fragment.append(document.createTextNode(text.slice(last)));
  return fragment;
}
async function run(query: string) {
  if (!input || !results || !status) return;
  const runId = ++searchRun;
  input.value = query;
  results.replaceChildren();
  if (!query.trim()) {
    status.textContent = "검색어를 입력하고 검색 버튼을 눌러 주세요.";
    return;
  }
  status.textContent = "가이드를 검색하고 있습니다.";
  try {
    if (!index) {
      const response = await fetch("/search-index.json");
      if (!response.ok) throw Error("index unavailable");
      index = await response.json();
    }
    if (runId !== searchRun) return;
    const matches = search(index!, query);
    status.textContent = matches.length
      ? `‘${query}’ 검색 결과 ${matches.length}개`
      : `‘${query}’에 대한 검색 결과가 없습니다. 추천 검색어나 전체 목차를 이용해 주세요.`;
    for (const item of matches) {
      const li = document.createElement("li");
      const chapter = document.createElement("p");
      chapter.className = "result-chapter";
      chapter.textContent = item.chapter;
      const h = document.createElement("h2");
      const a = document.createElement("a");
      a.href = item.url;
      a.append(highlighted(item.heading, query));
      h.append(a);
      const p = document.createElement("p");
      const normalizedToken = normalize(query).split(" ")[0];
      const offset = Math.max(
        0,
        normalize(item.body).indexOf(normalizedToken) - 45,
      );
      const snippet =
        (offset > 0 ? "… " : "") +
        item.body.slice(offset, offset + 180) +
        (item.body.length > offset + 180 ? " …" : "");
      p.append(highlighted(snippet, query));
      li.append(chapter, h, p);
      results.append(li);
    }
  } catch {
    status.textContent =
      "검색 자료를 불러오지 못했습니다. 잠시 후 다시 검색하거나 전체 목차를 이용해 주세요.";
  }
}
if (form && input) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = input.value.trim();
    const url = new URL(location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    history.pushState({}, "", url);
    run(q);
  });
  window.addEventListener("popstate", () =>
    run(new URL(location.href).searchParams.get("q") || ""),
  );
  run(new URL(location.href).searchParams.get("q") || "");
}
