
import { courses } from "../data/courses.js";
import { assignments } from "../data/assignments.js";
import { grades } from "../data/grades.js";
import { calculateGPA } from "../utils/gradeUtils.js";

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
    console.error(
      "Даалгаврын мэдээлэл уншихад алдаа:",
      error
    );
  }

  return assignments;
}

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

  // Даалгаврын хүснэгт
  const upcomingRows = upcoming.length
    ? upcoming.map((item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.course}</td>
          <td>${item.deadline}</td>
        </tr>
      `).join("")
    : `
        <tr>
          <td colspan="3" class="has-text-centered">
            Хүлээгдэж буй даалгавар байхгүй.
          </td>
        </tr>
      `;

  // GPA тооцоолох
  const gpa = calculateGPA(grades);

  return `
    <section class="section">
      <div class="container">

        <!-- Dashboard гарчиг -->
        <div class="mb-5">
          <h1 class="title">
            StudentHub Dashboard
          </h1>

          <p class="subtitle">
            Оюутны хичээлийн мэдээллийн нэгдсэн самбар
          </p>
        </div>

        <!-- Статистикийн картууд -->
        <div class="columns is-multiline">

          <!-- Нийт хичээл -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                Нийт хичээл
              </p>

              <p class="dashboard-value">
                ${courses.length}
              </p>

              <a href="#/courses">
                Хичээлүүд үзэх
              </a>
            </div>
          </div>

          <!-- Нийт кредит -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                Нийт кредит
              </p>

              <p class="dashboard-value">
                ${totalCredits}
              </p>

              <a href="#/courses">
                Дэлгэрэнгүй
              </a>
            </div>
          </div>

          <!-- Үлдсэн даалгавар -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                Үлдсэн даалгавар
              </p>

              <p class="dashboard-value">
                ${pending.length}
              </p>

              <a href="#/assignments">
                Даалгавар үзэх
              </a>
            </div>
          </div>

          <!-- Голч дүн -->
          <div class="column is-3-desktop is-6-tablet">
            <div class="box dashboard-card">
              <p class="dashboard-label">
                Голч дүн (GPA)
              </p>

              <p class="dashboard-value">
                ${gpa}
              </p>

              <a href="#/grades">
                Дүн харах
              </a>
            </div>
          </div>

        </div>

        <!-- Ойрын даалгаврууд -->
        <div class="box mt-5">

          <div class="is-flex is-justify-content-space-between
                      is-align-items-center mb-4">

            <h2 class="title is-5 mb-0">
              Ойрын даалгаврууд
            </h2>

            <a href="#/assignments">
              Бүгдийг үзэх
            </a>
          </div>

          <div class="table-container">
            <table class="table is-fullwidth is-striped">

              <thead>
                <tr>
                  <th>Даалгавар</th>
                  <th>Хичээл</th>
                  <th>Дуусах хугацаа</th>
                </tr>
              </thead>

              <tbody>
                ${upcomingRows}
              </tbody>

            </table>
          </div>
        </div>

        <!-- Түргэн холбоос -->
        <div class="box mt-5">

          <h2 class="title is-5">
            Түргэн холбоосууд
          </h2>

          <div class="buttons">

            <a href="#/courses"
               class="button is-primary">
              Хичээлүүд
            </a>

            <a href="#/schedule"
               class="button is-link is-light">
              Хуваарь
            </a>

            <a href="#/assignments"
               class="button is-info is-light">
              Даалгавар
            </a>

            <a href="#/grades"
               class="button is-success is-light">
              Дүн
            </a>

          </div>
        </div>

      </div>
    </section>
  `;
}
