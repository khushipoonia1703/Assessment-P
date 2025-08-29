document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ DROPDOWN TOGGLE FUNCTIONALITY
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = toggle.nextElementSibling;

      // Close others
      dropdownToggles.forEach(other => {
        if (other !== toggle) {
          other.classList.remove('active');
          other.nextElementSibling?.classList.remove('show');
        }
      });

      toggle.classList.toggle('active');
      menu?.classList.toggle('show');
    });
  });

  // 2️⃣ CLOSE DROPDOWNS ON OUTSIDE CLICK
  window.addEventListener('click', (e) => {
    dropdownToggles.forEach(toggle => {
      const dropdown = toggle.closest('.dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        toggle.classList.remove('active');
        toggle.nextElementSibling?.classList.remove('show');
      }
    });
  });

  // 3️⃣ LOAD TRAVEL ASSESSMENT RESULT FROM LOCAL STORAGE AND SHOW FITNESS MESSAGE
    const resultData = JSON.parse(localStorage.getItem("travelFitResult"));
    const scoreEl = document.getElementById("finalScore");
    const resultEl = document.getElementById("finalResult");
    const fitnessEl = document.getElementById("fitnessMessage"); // 👈 Add <p id="fitnessMessage"> in HTML

    if (resultData && scoreEl && resultEl && fitnessEl) {
    const { score } = resultData;
    const result = score >= 18 ? "Pass" : "Fail";
    const message = score >= 18
        ? "✅ You are fit for travelling through ship."
        : "❌ You are not fit for travelling through ship.";

    scoreEl.textContent = `${score} / 30`;
    resultEl.textContent = result;
    fitnessEl.textContent = message;
    fitnessEl.classList.add(result === "Pass" ? "pass-message" : "fail-message");
    } else {
    if (scoreEl) scoreEl.textContent = "N/A";
    if (resultEl) resultEl.textContent = "No result found";
    if (fitnessEl) fitnessEl.textContent = "No fitness recommendation available.";
    }

});
