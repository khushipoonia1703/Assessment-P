document.getElementById("interview-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const role = document.getElementById("jobRole").value.trim();

  if (!name || !email || !phone || !role) {
    alert("Please fill out all fields.");
    return;
  }

  // OPTIONAL: Save to localStorage or sessionStorage if needed
  // localStorage.setItem("userInfo", JSON.stringify({ name, email, phone, role }));

  window.location.href = "assessment.html";
});
