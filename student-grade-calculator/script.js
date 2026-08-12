const gradeForm = document.getElementById("gradeForm");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

gradeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value;

    const math = Number(document.getElementById("math").value);
    const english = Number(document.getElementById("english").value);
    const computer = Number(document.getElementById("computer").value);
    const science = Number(document.getElementById("science").value);
    const socialStudies = Number(
        document.getElementById("socialStudies").value
    );

    const total = math + english + computer + science + socialStudies;

    const average = total / 5;

    let grade;

    if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    } else {
        grade = "E";
    }

    const status = average >= 50 ? "Pass" : "Fail";
    const statusClass = average >= 50 ? "pass" : "fail";

result.innerHTML = `
    <h2>Student Results</h2>
    <p><strong>Name:</strong> ${studentName}</p>
    <p><strong>Total:</strong> ${total} / 500</p>
    <p><strong>Average:</strong> ${average.toFixed(2)}%</p>
    <p class="grade"><strong>Grade:</strong> ${grade}</p>
    <p class="status ${statusClass}">
        <strong>Status:</strong> ${status}
    </p>
`;
    const marks = [math, english, computer, science, socialStudies];

const hasInvalidMarks = marks.some(function (mark) {
    return mark < 0 || mark > 100 || isNaN(mark);
});

if (hasInvalidMarks) {
    result.innerHTML = `
        <p class="error">
            Please enter valid marks between 0 and 100 for all subjects.
        </p>
    `;
    return;
}
});
resetButton.addEventListener("click", function () {
    gradeForm.reset();
    result.innerHTML = "";
});