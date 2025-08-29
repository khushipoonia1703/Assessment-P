const questions = [
  {
    text: "In the past two weeks, I have felt cheerful and in good spirits.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I have felt calm and relaxed.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I have felt active and vigorous.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I woke up feeling fresh and rested.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "My daily life has been filled with things that interest me.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I found it hard to wind down after a stressful task.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I was aware of dryness in my mouth due to nervousness.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I felt that I was using a lot of nervous energy.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I found it difficult to relax.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  },
  {
    text: "I was worried about situations in which I might panic and make a fool of myself.",
    type: "mcq",
    options: ["Not at all", "Sometimes", "Often", "Most of the time"]
  }
];

function updateQuestionTypeCounts() {
  let objectiveCount = 0;
  let subjectiveCount = 0;

  questions.forEach(q => {
    if (["mcq", "mmcq", "truefalse"].includes(q.type.toLowerCase())) {
      objectiveCount++;
    } else {
      subjectiveCount++;
    }
  });

  document.getElementById("objective-count").textContent = objectiveCount;
  document.getElementById("subjective-count").textContent = subjectiveCount;
}


let current = 0;
const answers = new Array(questions.length).fill(null);
const statuses = new Array(questions.length).fill(""); // '', 'visited', 'revisit'

function getStatusClass(index) {
  if (statuses[index] === "revisit") return "revisit";
  if (answers[index] && answers[index].trim() !== "") return "visited";
  return "skipped";
}


function renderButtons() {
  const container = document.getElementById("question-buttons");
  container.innerHTML = ""; // Clear previous buttons
  questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = (i === current ? "active " : "") + getStatusClass(i);
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
  document.getElementById("question-number").textContent = `Question-${current + 1}`;

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
  updateQuestionTypeCounts();
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
  const revisited = statuses.filter(s => s === "revisit").length;
  const notAttempted = questions.length - attempted;

  document.getElementById("attempted").textContent = attempted;
  document.getElementById("notAttempted").textContent = notAttempted;
  document.getElementById("revisited").textContent = revisited;
}


// Navigation Buttons
document.getElementById("next-btn").onclick = () => {
  saveAnswer();
  if (!answers[current] || answers[current].trim() === "") {
    statuses[current] = "skipped";
  } else {
    statuses[current] = "visited";
  }

  if (current === questions.length - 1) {
    document.getElementById("submit-test-btn").click();
    return;
  }

  // Else, go to next question
  current++;
  renderQuestion();
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

document.getElementById('submit-test-btn').onclick = () => {
  saveAnswer();

  const revisitCount = statuses.filter(status => status === "revisit").length;
  const warningText = document.getElementById("revisit-warning");
  const confirmText = document.querySelector("#submitTestModal .modal-content p");

  if (revisitCount > 0) {
    // Hide the normal message and show only warning
    confirmText.style.display = "none";
    warningText.textContent = `⚠ You have ${revisitCount} question(s) marked for Revisit. Are you sure you want to submit?`;
  } else {
    // Show normal confirmation message
    confirmText.style.display = "block";
    warningText.textContent = "";
  }

  openModal('submitTestModal');
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

// Show Modal
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

// Hide Modal
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Track submission stage
let isSubmitConfirmed = false;

// Handle Submit Button Click


// Handle End Test Button Click
document.getElementById('end-test-btn').onclick = () => {
  openModal('endTestModal');
};

// Confirm Submit Logic
document.getElementById('confirmSubmit').onclick = () => {
  saveAnswer();
  closeModal('submitTestModal'); // Chain to End Test confirmation
  // Scoring logic
  const scoringMap = {
    "Not at all": 0,
    "Sometimes": 1,
    "Often": 2,
    "Most of the time": 3
  };

  let totalScore = 0;

  for (let i = 0; i < answers.length; i++) {
    const response = answers[i];
    if (!response) continue;

    if (i < 5) {
      // Questions 1-5: normal scoring
      totalScore += scoringMap[response];
    } else {
      // Questions 6-10: reverse scoring
      totalScore += 3 - scoringMap[response];
    }
  }

  const result = totalScore >= 18 ? "Pass" : "Fail";

  localStorage.setItem("travelFitResult", JSON.stringify({
    score: totalScore,
    result
  }));
  window.location.href = "submittedtest.html"; 
};

// Confirm End Test Logic
// Confirm End Test Logic
document.getElementById('confirmEnd').onclick = () => {
  saveAnswer();

  const attempted = answers.filter(a => a !== "" && a !== null && statuses[a] !== "revisit").length;
  const revisited = statuses.filter(s => s === "revisit").length;
  const notAttempted = questions.length - attempted - revisited;

  localStorage.setItem("examSummary", JSON.stringify({
    attempted,
    revisited,
    notAttempted
  }));

  // ✅ Corrected modal close
  closeModal('endTestModal');

  // ✅ This will now work properly
  window.location.href = "endtest.html";
};


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
  }, 5000);
}