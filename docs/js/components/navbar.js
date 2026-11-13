
import {
  t,
  getLanguage,
  toggleLanguage
} from "../i18n/i18n.js";

export function mountNavbar(root) {
  if (!root) return;

  const menus = [
    {
      path: "#/",
      title: t("nav.home"),
      icon: "fa-house",
      color: "#ffb900"
    },
    {
      path: "#/courses",
      title: t("nav.courses"),
      icon: "fa-book-open",
      color: "#18b76a"
    },
    {
      path: "#/schedule",
      title: t("nav.schedule"),
      icon: "fa-calendar-days",
      color: "#4758ff"
    },
    {
      path: "#/assignments",
      title: t("nav.assignments"),
      icon: "fa-clipboard-list",
      color: "#55c8f4"
    },
    {
      path: "#/grades",
      title: t("nav.grades"),
      icon: "fa-chart-column",
      color: "#fa648a"
    }
  ];

  const menuHTML = menus.map((menu) => `
    <a class="navbar-item student-nav-link"
       href="${menu.path}">

      <span class="student-nav-icon"
            style="color: ${menu.color}">
        <i class="fas ${menu.icon}"></i>
      </span>

      <span>${menu.title}</span>
    </a>
  `).join("");

  root.innerHTML = `
    <nav class="navbar is-white student-navbar"
         role="navigation"
         aria-label="main navigation">

      <div class="container">

        <div class="navbar-brand">
          <a class="navbar-item student-brand"
             href="#/">
            <span class="icon mr-2">
              <i class="fas fa-graduation-cap"></i>
            </span>
            StudentHub
          </a>

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

        <div id="studentNavbarMenu"
             class="navbar-menu">

          <div class="navbar-start">
            ${menuHTML}
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <button id="languageToggle"
                      class="button is-primary is-light"
                      type="button">
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

function bindNavbarEvents(root) {
  const burger = root.querySelector(".navbar-burger");
  const menu = root.querySelector(".navbar-menu");
  const languageButton =
    root.querySelector("#languageToggle");

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

  languageButton?.addEventListener("click", () => {
    toggleLanguage();
  });

  root.querySelectorAll(".student-nav-link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        burger?.classList.remove("is-active");
        menu?.classList.remove("is-active");

        burger?.setAttribute("aria-expanded", "false");
      });
    });
}

function updateActiveMenu(root) {
  const currentPath = window.location.hash || "#/";

  root.querySelectorAll(".student-nav-link")
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

window.addEventListener("hashchange", () => {
  const root = document.getElementById("navbar");
  if (root) updateActiveMenu(root);
});

window.addEventListener("languageChanged", () => {
  const root = document.getElementById("navbar");
  if (root) mountNavbar(root);
});
