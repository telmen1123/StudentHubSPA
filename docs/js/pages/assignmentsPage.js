
import { assignments } from "../data/assignments.js";

const STORAGE_KEY = "studenthub-assignments";

function getAssignments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Даалгавар уншихад алдаа гарлаа:", error);
  }

  return assignments.map((item) => ({ ...item }));
}

export function renderAssignmentsPage() {
  const items = getAssignments();

  const completedCount = items.filter(
    (item) => item.completed
  ).length;

  const rows = items.map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.course}</td>
      <td>${item.deadline}</td>
      <td>
        <span class="tag ${
          item.completed ? "is-success" : "is-warning"
        }">
          ${item.completed ? "Хийгдсэн" : "Хүлээгдэж байна"}
        </span>
      </td>
      <td>
        <button
          class="button is-small ${
            item.completed ? "is-light" : "is-primary"
          }"
          data-assignment-id="${item.id}"
        >
          ${item.completed ? "Буцаах" : "Хийгдсэн"}
        </button>
      </td>
    </tr>
  `).join("");

  return `
    <section class="section">
      <div class="container">
        <h1 class="title">Миний даалгаврууд</h1>

        <p class="subtitle">
          Хичээлийн даалгавар болон гүйцэтгэлийн төлөв
        </p>

        <div class="notification is-info is-light">
          Нийт: <strong>${items.length}</strong>
          &nbsp; | &nbsp;
          Хийгдсэн: <strong>${completedCount}</strong>
          &nbsp; | &nbsp;
          Үлдсэн: <strong>${items.length - completedCount}</strong>
        </div>

        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Даалгавар</th>
                  <th>Хичээл</th>
                  <th>Дуусах хугацаа</th>
                  <th>Төлөв</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindAssignmentsEvents() {
  document.querySelectorAll("[data-assignment-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.assignmentId);
        const items = getAssignments();

        const item = items.find(
          (assignment) => assignment.id === id
        );

        if (!item) return;

        item.completed = !item.completed;

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );

        document.getElementById("app").innerHTML =
          renderAssignmentsPage();

        bindAssignmentsEvents();
      });
    });
}
