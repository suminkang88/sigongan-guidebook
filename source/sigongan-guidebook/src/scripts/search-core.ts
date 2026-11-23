export type SearchSection = {
  chapter: string;
  heading: string;
  body: string;
  url: string;
};
export function normalize(text: string) {
  return text
    .normalize("NFKC")
    .toLocaleLowerCase("ko")
    .replace(/웹\s*접근성\s*(?:품질\s*)?인증|\bwa(?:\s*인증)?/gi, "wa인증")
    .replace(/대체\s*텍스트|\balt\b/gi, "대체텍스트")
    .replace(/\s+/g, " ")
    .trim();
}
export function search(sections: SearchSection[], query: string) {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (!tokens.length) return [];
  return sections
    .map((section) => {
      const title = normalize(section.chapter),
        heading = normalize(section.heading),
        body = normalize(section.body);
      const match = tokens.every(
        (t) => title.includes(t) || heading.includes(t) || body.includes(t),
      );
      const score = tokens.reduce(
        (s, t) =>
          s +
          (title.includes(t) ? 12 : 0) +
          (heading.includes(t) ? 8 : 0) +
          (body.includes(t) ? 1 : 0),
        0,
      );
      return { ...section, score: match ? score : 0 };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
}
