// Petit script : menu mobile, apparition au scroll, lien actif dans la navigation.
(function () {
  // Menu mobile
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Apparition douce des blocs au scroll
  var items = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Lien de navigation actif
  var links = document.querySelectorAll('.nav-links a.l[href^="#"]');
  var sections = [];
  links.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) sections.push({ a: a, s: s });
  });
  function onScroll() {
    var y = window.scrollY + 120;
    var cur = null;
    sections.forEach(function (o) { if (o.s.offsetTop <= y) cur = o; });
    sections.forEach(function (o) { o.a.classList.toggle("on", o === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
