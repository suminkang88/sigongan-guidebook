const key = "sigongan-guide-preferences-v1";
type Preferences = { themePreference: string; textSize: string };
const defaults: Preferences = { themePreference: "system", textSize: "normal" };
let preferences: Preferences = {
  themePreference: document.documentElement.dataset.theme || "system",
  textSize: document.documentElement.dataset.textSize || "normal",
};
const apply = () => {
  document.documentElement.dataset.theme = preferences.themePreference;
  document.documentElement.dataset.textSize = preferences.textSize;
  for (const name of ["themePreference", "textSize"] as const) {
    document
      .querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)
      .forEach((input) => {
        input.checked = input.value === preferences[name];
      });
  }
};
apply();
const toggle = document.querySelector<HTMLButtonElement>(
  "[data-settings-toggle]",
);
const panel = document.getElementById("accessibility-settings");
if (toggle && panel) {
  toggle.hidden = false;
  const close = () => {
    if (panel.contains(document.activeElement)) toggle.focus();
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    } else close();
  });
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  panel.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (
      input.name === "themePreference" &&
      ["system", "light", "dark", "high-contrast"].includes(input.value)
    )
      preferences.themePreference = input.value;
    if (
      input.name === "textSize" &&
      ["normal", "large", "xlarge"].includes(input.value)
    )
      preferences.textSize = input.value;
    apply();
    try {
      localStorage.setItem(key, JSON.stringify(preferences));
    } catch {
      const status = document.querySelector("[data-preference-status]");
      if (status)
        status.textContent =
          "설정을 적용했습니다. 브라우저 저장이 제한되어 새로고침하면 초기화됩니다.";
    }
  });
  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    preferences = { ...defaults };
    try {
      localStorage.removeItem(key);
    } catch {}
    apply();
    const status = document.querySelector("[data-preference-status]");
    if (status)
      status.textContent = "시스템 테마와 기본 글자 크기로 초기화했습니다.";
  });
}

export {};
