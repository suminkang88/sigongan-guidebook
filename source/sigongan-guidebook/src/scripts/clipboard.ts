document
  .querySelectorAll<HTMLButtonElement>("[data-copy]")
  .forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const block = button.closest(".code-block");
      const code = block?.querySelector("code")?.textContent || "";
      const status = block?.querySelector<HTMLElement>('[role="status"]');
      if (!status) return;
      try {
        await navigator.clipboard.writeText(code);
        status.textContent = "코드를 복사했습니다.";
      } catch {
        status.textContent =
          "복사하지 못했습니다. 코드 영역에서 텍스트를 직접 선택해 복사해 주세요.";
      }
    });
  });

export {};
