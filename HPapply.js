document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const cameraError = document.getElementById("camera-error");

  const experienceYears = document.getElementById("experienceYears");
  const experienceMonths = document.getElementById("experienceMonths");
  const experienceError = document.getElementById("experienceError");

  const form = document.getElementById("interview-form");

  let cameraReady = false;

  // 1. Start camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      cameraReady = true;
    })
    .catch(() => {
      cameraError.textContent = "❌ Camera access is required.";
      cameraError.classList.remove("hidden");
    });

  // 2. Validate experience
  function isExperienceValid() {
    const y = parseInt(experienceYears.value, 10);
    const m = parseInt(experienceMonths.value, 10);
    if (y < 0 || m < 0) {
      experienceError.textContent = "⚠️ Experience cannot be negative.";
      experienceError.classList.remove("hidden");
      return false;
    }
    experienceError.classList.add("hidden");
    return true;
  }

  experienceYears.addEventListener("input", isExperienceValid);
  experienceMonths.addEventListener("input", isExperienceValid);

  // 3. Handle form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form from reloading

    if (!isExperienceValid()) return;

    if (!cameraReady) {
      alert("Please allow camera access to proceed.");
      return;
    }

    // ✅ All good → redirect
    window.location.href = "instruction.html";
  });
});
