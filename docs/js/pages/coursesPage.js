
import { courses } from "../data/courses.js";

export function renderCoursesPage() {
  const totalCredits = courses.reduce(
    (total, course) => total + course.credit,
    0
  );

  const courseCards = courses.map((course) => `
    <div class="column is-4-desktop is-6-tablet">
      <div class="box student-card">
        <span class="tag is-primary is-light">
          ${course.type}
        </span>

        <h2 class="title is-5 mt-3">
          ${course.name}
        </h2>

        <p class="mb-2">
          <strong>Багш:</strong> ${course.teacher}
        </p>

        <p>
          <strong>Кредит:</strong> ${course.credit}
        </p>
      </div>
    </div>
  `).join("");

  return `
    <section class="section">
      <div class="container">

        <h1 class="title">Миний хичээлүүд</h1>
        <p class="subtitle">
          Энэ улиралд судалж буй хичээлүүд
        </p>

        <div class="notification is-primary is-light">
          Нийт хичээл: <strong>${courses.length}</strong>
          &nbsp; | &nbsp;
          Нийт кредит: <strong>${totalCredits}</strong>
        </div>

        <div class="columns is-multiline">
          ${courseCards}
        </div>

      </div>
    </section>
  `;
}
