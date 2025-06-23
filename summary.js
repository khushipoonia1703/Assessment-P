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

