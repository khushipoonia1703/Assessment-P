document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const cameraError = document.getElementById("camera-error");

  const experienceYears = document.getElementById("experienceYears");
  const experienceMonths = document.getElementById("experienceMonths");
  const experienceError = document.getElementById("experienceError");
  const form = document.getElementById("interview-form");

  // === Turn on camera ===
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      cameraError.textContent = "Camera access is required to proceed.";
      cameraError.classList.remove("hidden");
    });

  // === Show error for negative input ===
  function validateExperience() {
    const years = parseInt(experienceYears.value, 10);
    const months = parseInt(experienceMonths.value, 10);

    if (years < 0 || months < 0) {
      experienceError.textContent = "⚠️ Experience cannot be negative.";
      experienceError.classList.remove("hidden");
      return false;
    }

    experienceError.textContent = "";
    experienceError.classList.add("hidden");
    return true;
  }

  // Live validation as user types
  experienceYears.addEventListener("input", validateExperience);
  experienceMonths.addEventListener("input", validateExperience);

  // Prevent form submit if experience is invalid
  form.addEventListener("submit", function (e) {
    if (!validateExperience()) {
      e.preventDefault();
    }
  });
});
