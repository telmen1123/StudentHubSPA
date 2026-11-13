
export function getGrade(score) {
    if (score >= 95) return { letter: "A", point: 3.8 };
    if (score >= 90) return { letter: "A-", point: 3.6 };
    if (score >= 85) return { letter: "B+", point: 3.4 };
    if (score >= 80) return { letter: "B", point: 3.0 };
    if (score >= 75) return { letter: "C+", point: 2.7 };
    if (score >= 70) return { letter: "C", point: 2.3 };
    if (score >= 65) return { letter: "D+", point: 1.7 };
    if (score >= 60) return { letter: "D", point: 1.0 };
  
    return { letter: "F", point: 0.0 };
  }
  
  export function calculateGPA(grades) {
    const totalCredits = grades.reduce(
      (sum, item) => sum + item.credit,
      0
    );
  
    const totalPoints = grades.reduce(
      (sum, item) =>
        sum + getGrade(item.score).point * item.credit,
      0
    );
  
    return totalCredits > 0
      ? (totalPoints / totalCredits).toFixed(1)
      : "0.0";
  }
  