document.addEventListener("DOMContentLoaded", function () {

  // 1. Logika Navigasi Navbar & Menu Mobile (Fallback)
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navbar && navToggle && navLinks && !navToggle.dataset.initialized) {
    navToggle.dataset.initialized = "true";

    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Logika Carousel Slider pada Hero Section (Beranda)
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dotsWrap = document.getElementById("dots");
  var nextBtn = document.getElementById("next");
  var prevBtn = document.getElementById("prev");
  var slider = document.getElementById("slider");

  if (slides.length > 0 && dotsWrap) {
    var current = 0;
    var timer = null;
    var DELAY = 6000;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Ke slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".dot"));

    function goTo(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("active");
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      timer = setInterval(next, DELAY);
    }

    function stop() {
      clearInterval(timer);
    }

    function restart() {
      stop();
      start();
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        restart();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        restart();
      });
    }

    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);

      var touchX = null;
      slider.addEventListener("touchstart", function (e) {
        touchX = e.changedTouches[0].clientX;
      }, { passive: true });
      slider.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) {
          dx < 0 ? next() : prev();
          restart();
        }
        touchX = null;
      }, { passive: true });
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      start();
    }
  }

  // 3. Efek Section & Elemen Muncul Saat di-Scroll (Scroll Reveal)
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealSelector = [
      ".section-head",
      ".product-spotlight",
      ".keunggulan-row",
      ".spec-card",
      ".cta-inner",
      ".contact-list",
      ".contact-map-card"
    ].join(", ");

    var revealElements = document.querySelectorAll(revealSelector);

    revealElements.forEach(function (el) {
      el.classList.add("reveal");
    });

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
});
