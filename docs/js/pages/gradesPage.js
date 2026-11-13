
import { grades } from "../data/grades.js";

import {
  getGrade,
  calculateGPA
} from "../utils/gradeUtils.js";

export function renderGradesPage() {
  const gpa = calculateGPA(grades);

  const rows = grades.map((item) => {
    const grade = getGrade(item.score);

    return `
      <tr>
        <td>${item.course}</td>
        <td>${item.credit}</td>
        <td>${item.score}</td>
        <td>
          <span class="tag is-primary is-light">
            ${grade.letter}
          </span>
        </td>
        <td>${grade.point.toFixed(1)}</td>
      </tr>
    `;
  }).join("");

  return `
    <section class="section">
      <div class="container">
        <h1 class="title">Миний дүн</h1>

        <p class="subtitle">
          Хичээлийн үнэлгээ болон голч дүн
        </p>

        <div class="columns">
          <div class="column">
            <div class="notification is-primary is-light">
              <p>Голч дүн (GPA)</p>
              <p class="title is-2">${gpa}</p>
            </div>
          </div>

          <div class="column">
            <div class="notification is-info is-light">
              <p>Нийт хичээл</p>
              <p class="title is-2">${grades.length}</p>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Хичээл</th>
                  <th>Кредит</th>
                  <th>Оноо</th>
                  <th>Үнэлгээ</th>
                  <th>GPA оноо</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>

        <p class="has-text-grey is-size-7">
          GPA нь жишээ үнэлгээний шатлалаар тооцоологдсон.
        </p>
      </div>
    </section>
  `;
}
