document.addEventListener("DOMContentLoaded", function () {
  // Sidebar Dropdown Toggle Logic
  const sidebarDropdownToggles = document.querySelectorAll(".sidebar .dropdown-toggle");

  sidebarDropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle("show");
      this.classList.toggle("active");
    });
  });

  // View Button Dropdown Logic
  const dropdownWrappers = document.querySelectorAll(".view-dropdown-wrapper");

  dropdownWrappers.forEach(wrapper => {
    const button = wrapper.querySelector(".view-dropdown-toggle");
    const menu = wrapper.querySelector(".view-dropdown-menu");

    // When clicking the View ▼ button
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent closing immediately
      // Hide all other open dropdowns
      document.querySelectorAll(".view-dropdown-menu").forEach(m => {
        if (m !== menu) m.classList.add("hidden");
      });
      // Toggle current
      menu.classList.toggle("hidden");
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", function () {
    document.querySelectorAll(".view-dropdown-menu").forEach(menu => {
      menu.classList.add("hidden");
    });
  });

  // Modal Logic for Dropdown Items
  const emailModal = document.getElementById("emailModal");
  const linkModal = document.getElementById("linkModal");
  const closeEmailModal = document.getElementById("closeEmailModal");
  const closeLinkModal = document.getElementById("closeLinkModal");

  document.querySelectorAll(".view-dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // ← ADD THIS LINE FIRST
      const action = e.target.textContent.trim();
      console.log("Clicked:", action);

      if (action === "View/Edit") {
        window.location.href = "./RPconfigure.html";
      }
      if (action === "Send link to Single/Multiple Users") {
        emailModal.classList.remove("hidden");
      } else if (action === "Send link to Group") {
        linkModal.classList.remove("hidden");
      }
    });
  });

  closeEmailModal?.addEventListener("click", () => {
    emailModal.classList.add("hidden");
  });

  closeLinkModal?.addEventListener("click", () => {
    linkModal.classList.add("hidden");
  });

});

const rowsPerPageSelect = document.querySelector(".entries-select");
const searchInput = document.querySelector(".search-input");
const table = document.querySelector(".config-table tbody");
const paginationControls = document.getElementById("pagination-controls");

let currentPage = 1;

function isRowEmpty(row) {
  return Array.from(row.cells).every(cell => cell.textContent.trim() === "");
}

function getFilteredRows() {
  const allRows = Array.from(table.querySelectorAll("tr"));
  const nonEmptyRows = allRows.filter(row => !isRowEmpty(row));
  const searchValue = searchInput.value.toLowerCase();

  if (!searchValue) return nonEmptyRows;

  return nonEmptyRows.filter(row =>
    Array.from(row.cells).some(cell =>
      cell.textContent.toLowerCase().includes(searchValue)
    )
  );
}

function paginateTable() {
  const filteredRows = getFilteredRows();
  const rowsPerPage = parseInt(rowsPerPageSelect.value);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  Array.from(table.querySelectorAll("tr")).forEach(row => row.style.display = "none");

  if (totalPages <= 1) {
    filteredRows.forEach(row => row.style.display = "");
    paginationControls.innerHTML = "";
    return;
  }

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  filteredRows.slice(start, end).forEach(row => row.style.display = "");

  paginationControls.innerHTML = "";

  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.onclick = () => {
      currentPage--;
      paginateTable();
    };
    paginationControls.appendChild(prevBtn);
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      paginateTable();
    };
    paginationControls.appendChild(btn);
  }

  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => {
      currentPage++;
      paginateTable();
    };
    paginationControls.appendChild(nextBtn);
  }
}

rowsPerPageSelect.addEventListener("change", () => {
  currentPage = 1;
  paginateTable();
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  paginateTable();
});

// Initial call on load
paginateTable();

// Redirect to RPconfigure.html when "Add Configuration Form" is clicked
const addButton = document.querySelector(".capture-btn");
if (addButton) {
  addButton.addEventListener("click", function () {
    window.location.href = "./RPconfigure.html";
  });
}
