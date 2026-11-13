
import { courses } from "../data/courses.js";
import { assignments } from "../data/assignments.js";
import { grades } from "../data/grades.js";

import { calculateGPA } from "../utils/gradeUtils.js";
import { t, getLanguage } from "../i18n/i18n.js";

const STORAGE_KEY = "studenthub-assignments";

function getAssignments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Даалгавар уншихад алдаа:", error);
  }

  return assignments;
}

// Огноог сонгосон хэлээр харуулах
function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const locale = getLanguage() === "mn" ? "mn-MN" : "en-US";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

// Dashboard хуудас
export function renderHomePage() {
  const items = getAssignments();

  // Нийт кредит
  const totalCredits = courses.reduce(
    (sum, course) => sum + course.credit,
    0
  );

  // Хийгдээгүй даалгаврууд
  const pending = items.filter(
    (item) => !item.completed
  );

  // Ойрын 3 даалгавар
  const upcoming = [...pending]
    .sort((a, b) =>
      a.deadline.localeCompare(b.deadline)
    )
    .slice(0, 3);

  // GPA тооцоолох
  const gpa = calculateGPA(grades);

  // Даалгаврын хүснэгт
  const upcomingRows = upcoming.length
    ? upcoming.map((item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.course}</td>
          <td>${formatDate(item.deadline)}</td>
        </tr>
      `).join("")
    : `
        <tr>
          <td colspan="3" class="has-text-centered">
            ${t("home.noAssignments")}
          </td>
        </tr>
      `;

  return `
    <section class="section">
      <div class="container">

        <!-- Dashboard гарчиг -->
        <div class="mb-5">
          <h1 class="title">
            ${t("home.title")}
          </h1>

          <p class="subtitle">
            ${t("home.subtitle")}
          </p>
        </div>

        <!-- Статистикийн картууд -->
        <div class="columns is-multiline">

          <!-- Нийт хичээл -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                ${t("home.totalCourses")}
              </p>

              <p class="dashboard-value">
                ${courses.length}
              </p>

              <a href="#/courses">
                ${t("home.viewCourses")}
              </a>
            </div>
          </div>

          <!-- Нийт кредит -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                ${t("home.totalCredits")}
              </p>

              <p class="dashboard-value">
                ${totalCredits}
              </p>

              <a href="#/courses">
                ${t("home.details")}
              </a>
            </div>
          </div>

          <!-- Үлдсэн даалгавар -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                ${t("home.pendingAssignments")}
              </p>

              <p class="dashboard-value">
                ${pending.length}
              </p>

              <a href="#/assignments">
                ${t("home.viewAssignments")}
              </a>
            </div>
          </div>

          <!-- Голч дүн -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                ${t("home.gpa")}
              </p>

              <p class="dashboard-value">
                ${gpa}
              </p>

              <a href="#/grades">
                ${t("home.viewGrades")}
              </a>
            </div>
          </div>

        </div>

        <!-- Ойрын даалгаврууд -->
        <div class="box mt-5">

          <div class="is-flex is-justify-content-space-between
                      is-align-items-center mb-4">

            <h2 class="title is-5 mb-0">
              ${t("home.upcoming")}
            </h2>

            <a href="#/assignments">
              ${t("home.viewAll")}
            </a>
          </div>

          <div class="table-container">
            <table class="table is-fullwidth is-striped">

              <thead>
                <tr>
                  <th>${t("assignments.assignment")}</th>
                  <th>${t("common.course")}</th>
                  <th>${t("common.deadline")}</th>
                </tr>
              </thead>

              <tbody>
                ${upcomingRows}
              </tbody>

            </table>
          </div>
        </div>

        <!-- Түргэн холбоосууд -->
        <div class="box mt-5">

          <h2 class="title is-5">
            ${t("home.quickLinks")}
          </h2>

          <div class="buttons">

            <a href="#/courses"
               class="button is-primary">
              ${t("nav.courses")}
            </a>

            <a href="#/schedule"
               class="button is-link is-light">
              ${t("nav.schedule")}
            </a>

            <a href="#/assignments"
               class="button is-info is-light">
              ${t("nav.assignments")}
            </a>

            <a href="#/grades"
               class="button is-success is-light">
              ${t("nav.grades")}
            </a>

          </div>
        </div>

      </div>
    </section>
  `;
}
