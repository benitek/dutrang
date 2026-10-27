/* Du Trang — điều hướng theo hash (#ve-du-trang, #cau-chu, …).
   Thêm mục mới: tạo <article class="page" id="..."> và một liên kết trong <nav>. */
(() => {
  const DEFAULT_PAGE = "ve-du-trang";
  const SUFFIX = " — Du Trang";
  const pages = [...document.querySelectorAll(".page")];
  const links = [...document.querySelectorAll(".nav a")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  function show(id, { moveFocus = true } = {}) {
    const target = pages.find(p => p.id === id) || pages.find(p => p.id === DEFAULT_PAGE);
    pages.forEach(p => { p.hidden = p !== target; });
    links.forEach(a => {
      const on = a.dataset.page === target.id;
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    const h1 = target.querySelector("h1");
    document.title = h1.textContent + SUFFIX;
    window.scrollTo({ top: 0, behavior: "auto" });
    if (moveFocus) h1.focus({ preventScroll: true });
  }

  const fromHash = () => {
    try { return decodeURIComponent(location.hash.slice(1)); } catch { return ""; }
  };

  window.addEventListener("hashchange", () => show(fromHash()));

  // Bấm lại đúng mục đang mở: vẫn cuộn lên đầu trang.
  document.querySelectorAll(".wordmark, .nav a").forEach(a => {
    a.addEventListener("click", () => {
      if (a.hash === location.hash || (!location.hash && a.hash === "#" + DEFAULT_PAGE)) {
        show(fromHash());
        if (!reduceMotion) window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  pages.forEach(p => p.querySelector("h1").setAttribute("tabindex", "-1"));
  document.getElementById("year").textContent = new Date().getFullYear();
  show(fromHash(), { moveFocus: false });
})();
