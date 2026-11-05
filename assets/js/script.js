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

// Download CV QR Code Popup
const downloadCvBtn = document.getElementById("downloadCvBtn");
const qrModal = document.getElementById("qrModal");
const closeQrModal = document.getElementById("closeQrModal");
const resumeQr = document.getElementById("resumeQr");

const resumeUrl = new URL(
    "assets/files/Chenz-Samuel-Resume.pdf",
    window.location.href
).href;

downloadCvBtn?.addEventListener("click", () => {
    if (!qrModal || !resumeQr) return;

    qrModal.classList.add("active");

    const qrApi = "https://api.qrserver.com/v1/create-qr-code/";

    resumeQr.src =
        `${qrApi}?size=200x200&data=${encodeURIComponent(resumeUrl)}`;
});

closeQrModal?.addEventListener("click", () => {
    qrModal.classList.remove("active");
});

qrModal?.addEventListener("click", (event) => {
    if (event.target === qrModal) {
        qrModal.classList.remove("active");
    }
});