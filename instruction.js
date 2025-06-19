// File: instruction.js
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("agreeCheckbox");
  const startButton = document.getElementById("startButton");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      startButton.disabled = false;
      startButton.classList.add("enabled");
    } else {
      startButton.disabled = true;
      startButton.classList.remove("enabled");
    }
  });

  startButton.addEventListener("click", function () {
    if (!checkbox.checked) {
      alert("Please confirm you have read the instructions.");
    } else {
      // Replace with your redirection or exam start logic
      window.location.href = "exam.html";
    }
  });
});
