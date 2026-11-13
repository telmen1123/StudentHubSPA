
import { renderHomePage } from "./pages/homePage.js";
import { renderCoursesPage } from "./pages/coursesPage.js";
import { renderSchedulePage } from "./pages/schedulePage.js";

import {
  renderAssignmentsPage,
  bindAssignmentsEvents
} from "./pages/assignmentsPage.js";

import { renderGradesPage } from "./pages/gradesPage.js";

function renderSimplePage(title, description) {
  return `
    <section class="section">
      <div class="container">
        <h1 class="title">${title}</h1>
        <p class="subtitle">${description}</p>
      </div>
    </section>
  `;
}

export const routes = {
  "/": renderHomePage,

  "/courses": renderCoursesPage,

  "/schedule": renderSchedulePage,

  "/assignments": {
    render: renderAssignmentsPage,
    bind: bindAssignmentsEvents
  },

  "/grades": renderGradesPage,

  "/404": () =>
    renderSimplePage(
      "404 - Хуудас олдсонгүй",
      "Таны сонгосон хуудас байхгүй байна."
    )
};
