const questions = [
  { text: "Define API and give an example.", type: "text" },
  { text: "What are the main principles of OOP?", type: "text" },
  {
    text: "Which of the following is a JavaScript framework?",
    type: "mcq",
    options: ["Django", "React", "Laravel", "Spring"]
  },
  {
    text: "CSS Flexbox is used for?",
    type: "mcq",
    options: ["Database", "Layout", "Authentication", "Hosting"]
  },
  { text: "Explain Git branching.", type: "text" }
];

let current = 0;
const answers = new Array(questions.length).fill(null);
const statuses = new Array(questions.length).fill(""); // '', 'visited', 'revisit'

function renderButtons() {
  const container = document.getElementById("question-buttons");
  container.innerHTML = "";
  questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = (i === current ? "active " : "") + statuses[i];
    btn.onclick = () => {
      saveAnswer();
      current = i;
      renderQuestion();
    };
    container.appendChild(btn);
  });
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById("question-text").textContent = q.text;

  const answerBox = document.getElementById("answer");
  const optionsBox = document.getElementById("options-container");

  if (q.type === "mcq") {
    answerBox.style.display = "none";
    optionsBox.innerHTML = q.options.map((opt, idx) => {
      const checked = answers[current] === opt ? "checked" : "";
      return `
        <label>
          <input type="radio" name="mcq" value="${opt}" ${checked}>
          ${opt}
        </label>`;
    }).join("");
  } else {
    optionsBox.innerHTML = "";
    answerBox.style.display = "block";
    answerBox.value = answers[current] || "";
  }

  renderButtons();
  updateCounts();
}

function saveAnswer() {
  const q = questions[current];
  if (q.type === "mcq") {
    const selected = document.querySelector('input[name="mcq"]:checked');
    answers[current] = selected ? selected.value : "";
  } else {
    answers[current] = document.getElementById("answer").value.trim();
  }
}

function updateCounts() {
  const attempted = answers.filter(a => a !== "" && a !== null).length;
  document.getElementById("attempted").textContent = attempted;
  document.getElementById("notAttempted").textContent = questions.length - attempted;
}

// Navigation Buttons
document.getElementById("next-btn").onclick = () => {
  saveAnswer();
  statuses[current] = "visited";
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  }
};

document.getElementById("prev-btn").onclick = () => {
  saveAnswer();
  if (current > 0) {
    current--;
    renderQuestion();
  }
};

document.getElementById("revisit-btn").onclick = () => {
  saveAnswer();
  statuses[current] = "revisit";
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  }
};

document.getElementById("submit-test-btn").onclick = () => {
  saveAnswer();
  console.log("Submitted Answers:", answers);
  alert("Test submitted!");
};

document.getElementById("end-test-btn").onclick = () => {
  saveAnswer();
  console.log("Final Answers:", answers);
  window.location.href = "endtest.html";
};

// Timer
let secondsLeft = 30 * 60;
setInterval(() => {
  if (secondsLeft > 0) {
    secondsLeft--;
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    document.getElementById("timer").textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }
}, 1000);

// Camera Access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const cam = document.getElementById("camera");
    cam.srcObject = stream;
  })
  .catch(() => alert("Unable to access camera."));

renderQuestion();

document.addEventListener("DOMContentLoaded", function () {
  // Show Modal
  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  // Hide Modal
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
  }

  // Trigger modals
  document.getElementById('end-test-btn').onclick = () => {
    openModal('endTestModal');
  };

  document.getElementById('submit-test-btn').onclick = () => {
    openModal('submitTestModal');
  };

  // After submit, open end test modal
  document.getElementById('confirmSubmit').onclick = () => {
    closeModal('submitTestModal');
    openModal('endTestModal'); // Chained to end test
  };

  // Final confirmation
  document.getElementById('confirmEnd').onclick = () => {
    window.location.href = "endtest.html"; // Redirect to final page
  };

  // Assign modal functions to window for cancel buttons
  window.closeModal = closeModal;
});

let switchCount = 0;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    switchCount++;

    if (switchCount < 4) {
      showTabSwitchWarning(switchCount);
    } else {
      // Redirect to disqualified page
      window.location.href = "disqualified.html";
    }
  }
});

function showTabSwitchWarning(count) {
  const warningModal = document.createElement('div');
  warningModal.classList.add('modal');
  warningModal.innerHTML = `
    <div class="modal-content">
      <p><strong>Warning ${count}/3:</strong> Tab switching is not allowed! After 3 warnings you will be disqualified.</p>
      <button onclick="this.parentElement.parentElement.classList.add('hidden')">OK</button>
    </div>
  `;
  document.body.appendChild(warningModal);

  // Optional: auto-remove modal after 5 seconds
  setTimeout(() => {
    if (warningModal && warningModal.parentNode) {
      warningModal.classList.add('hidden');
    }
  }, 5000);
}