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

  const searchBox = document.getElementById("search-box");
  const tableRows = document.querySelectorAll(".config-table tbody tr");

  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    tableRows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const matches = [...cells].some(cell => 
        cell.textContent.toLowerCase().includes(query)
      );
      row.style.display = matches ? "" : "none";
    });
  });
});
