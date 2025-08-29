// ===== Dropdown Toggle =====
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownToggle.classList.toggle("active");
      dropdownMenu.classList.toggle("show");
    });
  }

  // ===== Table Search Filter =====
  const searchInput = document.getElementById("search-box");
  const table = document.querySelector(".config-table tbody");

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");

    Array.from(rows).forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(filter) ? "" : "none";
    });
  });
});
