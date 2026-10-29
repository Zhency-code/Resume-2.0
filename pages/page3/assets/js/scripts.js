/* ResumeV2 shared interactions */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const themeButton = document.querySelector(".theme-toggle");
  const progress = document.querySelector(".scroll-progress");

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme toggle; preference is kept for the current browser.
  const savedTheme = localStorage.getItem("resume-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    if (savedTheme === "light") root.dataset.theme = "light";
  }
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const lightMode = root.dataset.theme !== "light";
      if (lightMode) root.dataset.theme = "light";
      else delete root.dataset.theme;
      localStorage.setItem("resume-theme", lightMode ? "light" : "dark");
    });
  }

  // Scroll progress indicator
  const updateProgress = () => {
    if (!progress) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progress.style.width = `${percent}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Current page navigation state
  const currentPath = window.location.pathname;
  nav?.querySelectorAll("a").forEach((link) => {
    const target = new URL(link.href, window.location.href).pathname;
    link.classList.toggle("active", target === currentPath || (target.endsWith("index.html") && currentPath.endsWith("/")));
  });
});

// Prepare a message in the visitor's default email app. Replace the address below before publishing.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const note = document.querySelector("#form-note");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipient = "your.email@example.com";
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const subject = encodeURIComponent(`Resume website message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    if (recipient === "your.email@example.com") {
      note.textContent = "Replace the sample email address in assets/js/scripts.js before using this form.";
      return;
    }
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
