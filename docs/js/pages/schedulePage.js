import { schedule } from "../data/schedule.js";

export function renderSchedulePage() {
  const days = [
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан"
  ];

  const scheduleRows = days.map((day) => {
    const dayLessons = schedule.filter(
      (lesson) => lesson.day === day
    );

    return dayLessons.map((lesson) => `
      <tr>
        <td>${lesson.day}</td>
        <td>${lesson.time}</td>
        <td>${lesson.course}</td>
        <td>${lesson.room}</td>
        <td>
          <span class="tag is-info is-light">
            ${lesson.type}
          </span>
        </td>
      </tr>
    `).join("");
  }).join("");

  return `
    <section class="section">
      <div class="container">
        <h1 class="title">Хичээлийн хуваарь</h1>

        <p class="subtitle">
          Долоо хоногийн хичээлийн хуваарь
        </p>

        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Гараг</th>
                  <th>Цаг</th>
                  <th>Хичээл</th>
                  <th>Анги</th>
                  <th>Төрөл</th>
                </tr>
              </thead>

              <tbody>
                ${scheduleRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}
