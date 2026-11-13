
import {
  t,
  getLanguage,
  toggleLanguage
} from "../i18n/i18n.js";

// Navbar HTML үүсгэх
export function mountNavbar(root) {
  if (!root) return;

  root.innerHTML = `
    <nav class="navbar is-white student-navbar"
         role="navigation"
         aria-label="main navigation">

      <div class="container">

        <!-- Logo -->
        <div class="navbar-brand">

          <a class="navbar-item student-brand" href="#/">
            <span class="icon mr-2">
              <i class="fas fa-graduation-cap"></i>
            </span>
            StudentHub
          </a>

          <!-- Mobile burger -->
          <a role="button"
             class="navbar-burger"
             aria-label="menu"
             aria-expanded="false"
             data-target="studentNavbarMenu">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>

        <!-- Navbar menu -->
        <div id="studentNavbarMenu" class="navbar-menu">

          <div class="navbar-start">

            <a class="navbar-item" href="#/">
              ${t("nav.home")}
            </a>

            <a class="navbar-item" href="#/courses">
              ${t("nav.courses")}
            </a>

            <a class="navbar-item" href="#/schedule">
              ${t("nav.schedule")}
            </a>

            <a class="navbar-item" href="#/assignments">
              ${t("nav.assignments")}
            </a>

            <a class="navbar-item" href="#/grades">
              ${t("nav.grades")}
            </a>

          </div>

          <!-- Language button -->
          <div class="navbar-end">

            <div class="navbar-item">
              <button
                id="languageToggle"
                class="button is-primary is-light"
                type="button"
                aria-label="Change language">

                <span class="icon">
                  <i class="fas fa-globe"></i>
                </span>

                <span>
                  ${getLanguage().toUpperCase()}
                </span>

              </button>
            </div>

          </div>

        </div>

      </div>
    </nav>
  `;

  bindNavbarEvents(root);
  updateActiveMenu(root);
}

// Navbar event-үүд
function bindNavbarEvents(root) {
  const burger = root.querySelector(".navbar-burger");
  const menu = root.querySelector(".navbar-menu");
  const languageButton =
    root.querySelector("#languageToggle");

  // Mobile menu
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isActive =
        burger.classList.toggle("is-active");

      menu.classList.toggle("is-active", isActive);

      burger.setAttribute(
        "aria-expanded",
        String(isActive)
      );
    });
  }

  // Language toggle
  if (languageButton) {
    languageButton.addEventListener("click", () => {
      toggleLanguage();
    });
  }

  // Menu link дарахад mobile menu хаах
  root.querySelectorAll(".navbar-start .navbar-item")
    .forEach((link) => {
      link.addEventListener("click", () => {
        burger?.classList.remove("is-active");
        menu?.classList.remove("is-active");

        burger?.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
}

// Идэвхтэй хуудсыг тодруулах
function updateActiveMenu(root) {
  const currentPath =
    window.location.hash || "#/";

  root.querySelectorAll(".navbar-start .navbar-item")
    .forEach((link) => {
      const isActive =
        link.getAttribute("href") === currentPath;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
}

// Хуудас солигдоход Navbar шинэчлэх
window.addEventListener("hashchange", () => {
  const root = document.getElementById("navbar");

  if (root) {
    updateActiveMenu(root);
  }
});

// Хэл солигдоход Navbar дахин зурах
window.addEventListener("languageChanged", () => {
  const root = document.getElementById("navbar");

  if (root) {
    mountNavbar(root);
  }
});
