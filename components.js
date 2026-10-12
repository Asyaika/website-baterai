// 1. Komponen Header (Navbar)
class AppHeader extends HTMLElement {
  connectedCallback() {
    var activePage = this.getAttribute("active") || "";
    var isSolid = this.hasAttribute("solid") || window.location.href.includes("produk.html");

    this.innerHTML = `
      <header class="navbar ${isSolid ? "navbar-solid" : ""}" id="navbar">
        <div class="container nav-inner">
          <a href="index.html" class="logo">
            <img src="assets/logo.png" alt="Logo Evora" width="120">
          </a>

          <nav class="nav-links" id="navLinks">
            <a href="index.html" class="${activePage === "beranda" ? "active" : ""}">Beranda</a>
            <a href="produk.html" class="${activePage === "produk" ? "active" : ""}">Produk</a>
            <a href="index.html#kontak" class="${activePage === "kontak" ? "active" : ""}">Kontak</a>
            <a href="index.html#kontak" class="btn btn-nav">Hubungi Kami</a>
          </nav>

          <button class="nav-toggle" id="navToggle" aria-label="Buka menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    `;

    this.initNavbarEvents();
  }

  initNavbarEvents() {
    var navbar = this.querySelector("#navbar");
    var navToggle = this.querySelector("#navToggle");
    var navLinks = this.querySelector("#navLinks");
    var isSolid = this.hasAttribute("solid") || window.location.href.includes("produk.html");

    if (!navbar || !navToggle || !navLinks) return;
    navToggle.dataset.initialized = "true";

    function handleScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
        if (isSolid) {
          navbar.classList.add("navbar-solid");
        }
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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

    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !navbar.contains(e.target)) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// 2. Komponen CTA Banner
class AppCta extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="cta" id="cta">
        <div class="container">
          <div class="cta-inner">
            <div class="cta-content">
              <h2>Mari Mulai Perjalanan Bersama Evora</h2>
              <p>Mulai percakapan dengan tim kami untuk mengenal Evora Volt X dan teknologi di baliknya.</p>
              <div class="cta-actions">
                <a href="index.html#kontak" class="btn btn-secondary btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
            <div class="cta-media">
              <img src="assets/mobil.png" alt="Kendaraan Listrik Evora" class="cta-img" />
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

// 3. Komponen Footer
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer-container">
          <div class="footer-grid">
            <!-- Col 1: Brand & Slogan -->
            <div class="footer-col footer-col-brand">
              <a href="index.html#hero" class="logo footer-logo">
                <img src="assets/logo.png" alt="Logo Evora" width="130">
              </a>
              <p class="footer-slogan">
                Inovasi yang Membawa Anda Lebih Jauh.
              </p>
              <div class="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-btn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-btn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Col 2: Menu / Navigasi -->
            <div class="footer-col">
              <h4 class="footer-heading">Menu</h4>
              <ul class="footer-nav-list">
                <li><a href="index.html#hero">Beranda</a></li>
                <li><a href="index.html#produk">Informasi Produk</a></li>
                <li><a href="produk.html">Evora Volt X</a></li>
                <li><a href="index.html#kontak">Hubungi Kami</a></li>
              </ul>
            </div>

            <!-- Col 4: Informasi Kontak Lengkap -->
            <div class="footer-col footer-col-contact">
              <h4 class="footer-heading">Hubungi Kami</h4>
              <ul class="footer-contact-info">
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>Jl. Teknologi No. 88, Jakarta Selatan, DKI Jakarta 12340</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
                  </svg>
                  <a href="tel:+6281234567890">+62 812 3456 7890</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 5h16v14H4z" />
                    <path d="M4 6l8 6 8-6" />
                  </svg>
                  <a href="mailto:info@evora.id">info@evora.id</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Footer Bottom / Copyright & Legal -->
          <div class="footer-bottom">
            <p>&copy; 2026 PT Evora Energi Nusantara. Seluruh hak cipta dilindungi.</p>
            <div class="footer-legal">
              <a href="#">Kebijakan Privasi</a>
              <span>&bull;</span>
              <a href="#">Syarat &amp; Ketentuan</a>
              <span>&bull;</span>
              <a href="#">Garansi Resmi</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// Daftarkan semua Web Component Custom Elements
customElements.define("app-header", AppHeader);
customElements.define("app-cta", AppCta);
customElements.define("app-footer", AppFooter);
