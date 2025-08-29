document.addEventListener("DOMContentLoaded", function () {
  // 🔁 1. Sidebar dropdown toggle logic (unchanged)
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle("show");
      this.classList.toggle("active");
    });
  });

  // ➕ 2. Passing Criteria: Add dynamic input rows on plus button click
  const addBtn = document.querySelector(".passing-criteria-add");
  const container = document.getElementById("passing-criteria-container");

  addBtn.addEventListener("click", () => {

    const row = document.createElement("div");
    row.classList.add("passing-criteria-row");

    row.innerHTML = `
      <input type="text" placeholder="Enter Experience Range" />
      <input type="number" placeholder="%" min="0" max="100" />
      <button type="button" class="passing-criteria-remove">x</button>
    `;

    const removeBtn = row.querySelector("button");
    removeBtn.classList.add("passing-criteria-remove");
    removeBtn.addEventListener("click", () => row.remove()); 

    container.appendChild(row);
  });

  // 🧩 3. Type of Questions Table Row Addition Logic
  const questionTypeBody = document.getElementById("questionTypeBody");
  const addRowBtn = document.getElementById("addQuestionTypeRowBtn");

  function createRow() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <select class="type-select">
        <option value="">Select Type</option>
        <option value="Objective">Objective</option>
        <option value="Subjective">Subjective</option>
      </select>
    </td>
    <td>
      <select class="subcategory-select">
        <option value="">Select Sub-category</option>
      </select>
    </td>
    <td><input type="number" placeholder="e.g. 4" /></td> <!-- Number of Options -->
    <td><input type="number" name="number[]" min="0" placeholder="e.g. 5" /></td>
    <td><input type="text" name="difficulty[]" placeholder="Optional" /></td>
    <td><input type="number" name="weightage[]" min="0" placeholder="%" /></td>
    <td><button type="button" class="remove-row-btn">x</button></td>
  `;

  // Add event listener to the remove button
  row.querySelector(".remove-row-btn").addEventListener("click", () => {
    row.remove();
  });

  // Add logic to dynamically update sub-category
  const typeSelect = row.querySelector(".type-select");
  const subCategorySelect = row.querySelector(".subcategory-select");

  typeSelect.addEventListener("change", () => {
    const type = typeSelect.value;

    // Clear current sub-category options
    subCategorySelect.innerHTML = '<option value="">Select Sub-category</option>';

    const objectiveOptions = ["MCQ", "MMCQ", "True/False", "Fill in the Blanks", "Match the Following"];
    const subjectiveOptions = ["Essay questions", "Short answer", "Code", "Long answer questions", "Case study responses"];

    const options = type === "Objective" ? objectiveOptions :
                    type === "Subjective" ? subjectiveOptions : [];

    options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      subCategorySelect.appendChild(opt);
    });
  });
// Bind sub-category logic for the existing row (the first static one)
const initialTypeSelect = document.querySelector("tbody .type-select");
const initialSubCategorySelect = document.querySelector("tbody .subcategory-select");

if (initialTypeSelect && initialSubCategorySelect) {
  initialTypeSelect.addEventListener("change", () => {
    const type = initialTypeSelect.value;

    // Clear old options
    initialSubCategorySelect.innerHTML = '<option value="">Select Sub-category</option>';

    const objectiveOptions = ["MCQ", "MMCQ", "True/False", "Fill in the Blanks", "Match the Following"];
    const subjectiveOptions = ["Essay questions", "Short answer", "Long answer questions", "Case study responses"];

    const options = type === "Objective" ? objectiveOptions :
                    type === "Subjective" ? subjectiveOptions : [];

    options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      initialSubCategorySelect.appendChild(opt);
    });
  });
}

  // Append the row to table body
  questionTypeBody.appendChild(row);
}


  if (addRowBtn && questionTypeBody) {
    addRowBtn.addEventListener("click", createRow);
    createRow(); // Add one default row
  }

  // ✅ Optional Clear Button Logic
  window.clearForm = function () {
    document.getElementById("configForm").reset();
    container.innerHTML = ""; // clear passing criteria
    questionTypeBody.innerHTML = ""; // clear table
    createRow(); // add one row back
  };
});
