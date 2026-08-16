(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.getElementById("header");
  const onScrollHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("nav-list");

  function setMenu(open) {
    navList.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  navToggle.addEventListener("click", () => setMenu(!navList.classList.contains("open")));
  navList.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => spy.observe(section));

  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealer.observe(el));
  }

  const codeLines = document.querySelectorAll(".code-line");
  if (prefersReducedMotion) {
    codeLines.forEach((line) => line.classList.add("on"));
  } else {
    codeLines.forEach((line, i) => {
      setTimeout(() => line.classList.add("on"), 600 + i * 260);
    });
  }

  if (!prefersReducedMotion) {
    const glow1 = document.querySelector(".glow-1");
    const glow2 = document.querySelector(".glow-2");
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight * 1.5) {
            glow1.style.transform = `translateY(${y * 0.08}px)`;
            glow2.style.transform = `translateY(${y * -0.05}px)`;
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }
})();