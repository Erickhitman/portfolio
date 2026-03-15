window.addEventListener(
  "wheel",
  (event) => {
    if (event.deltaY > 0) {
      window.location.href = "#sobre";
    }
  },
  { once: true },
);
