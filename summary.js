document.addEventListener("DOMContentLoaded", function () {
  // 1️⃣ Sidebar Dropdown Logic
  const sidebarDropdownToggles = document.querySelectorAll(".sidebar .dropdown-toggle");

  sidebarDropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle("show");
      this.classList.toggle("active");
    });
  });

  // 2️⃣ View Button Dropdown Logic in Table
  const actionDropdowns = document.querySelectorAll(".dropdown-action");

  actionDropdowns.forEach(drop => {
    const button = drop.querySelector(".dropdown-toggle");
    const menu = drop.querySelector(".dropdown-menu");

    // Toggle visibility on button click
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent bubbling up
      // Close all other open dropdowns
      document.querySelectorAll(".dropdown-menu").forEach(m => {
        if (m !== menu) m.classList.add("hidden");
      });
      menu.classList.toggle("hidden");
    });
  });

  // 3️⃣ Global click to close any open dropdowns
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.classList.add("hidden");
    });
  });
});
