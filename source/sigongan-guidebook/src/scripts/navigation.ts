document.documentElement.classList.add("js-ready");
const header = document.querySelector<HTMLElement>("[data-header]");
const updateHeader = () => {
  if (header)
    document.documentElement.style.setProperty(
      "--header-offset",
      `${Math.ceil(header.getBoundingClientRect().height) + 8}px`,
    );
};
updateHeader();
if (header) new ResizeObserver(updateHeader).observe(header);
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const shell = document.querySelector<HTMLElement>(".sidebar-shell");
const menu = document.getElementById("guide-menu");
if (toggle && shell && menu) {
  toggle.hidden = false;
  const close = () => {
    if (menu.contains(document.activeElement)) toggle.focus();
    shell.removeAttribute("data-menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    if (shell.hasAttribute("data-menu-open")) close();
    else {
      shell.setAttribute("data-menu-open", "");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
const details = document.querySelector<HTMLDetailsElement>(
  ".on-this-page details",
);
const desktop = matchMedia("(min-width:1280px)");
const syncDetails = () => {
  if (details) details.open = desktop.matches;
};
syncDetails();
desktop.addEventListener("change", syncDetails);
if (details)
  details.querySelector("summary")?.addEventListener("click", (e) => {
    if (desktop.matches) e.preventDefault();
  });
const tableRegions = document.querySelectorAll<HTMLElement>(
  "[data-table-scroll]",
);
const updateTables = () =>
  tableRegions.forEach((region) => {
    if (region.scrollWidth > region.clientWidth + 1) region.tabIndex = 0;
    else region.removeAttribute("tabindex");
  });
tableRegions.forEach((region) =>
  new ResizeObserver(updateTables).observe(region),
);
updateTables();
const headings = [
  ...document.querySelectorAll<HTMLElement>(
    "[data-guide-content] h2[id], [data-guide-content] h3[id]",
  ),
];
const tocLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"),
];
let queued = false;
const updateToc = () => {
  queued = false;
  const offset = header ? header.getBoundingClientRect().height + 50 : 150;
  let current = headings[0];
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= offset) current = h;
    else break;
  }
  tocLinks.forEach((a) => {
    if (current && a.hash === "#" + current.id)
      a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
};
window.addEventListener(
  "scroll",
  () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateToc);
    }
  },
  { passive: true },
);
updateToc();
document.fonts.ready.then(() => {
  updateHeader();
  updateTables();
  if (location.hash) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    target?.scrollIntoView({ block: "start" });
  }
});
document.addEventListener("focusin", () => {
  const el = document.activeElement;
  if (!(el instanceof HTMLElement) || el.closest(".site-header")) return;
  const top = el.getBoundingClientRect().top;
  const offset = header ? header.getBoundingClientRect().height + 12 : 0;
  if (top >= 0 && top < offset) window.scrollBy(0, top - offset);
});

export {};
