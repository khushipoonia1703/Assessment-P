const questions = [
  "Define API and give an example.",
  "What are the main principles of OOP?",
  "What is a closure in JavaScript?",
  "How does CSS Flexbox work?",
  "Explain Git branching."
];

let current = 0;
const answers = new Array(questions.length).fill('');

function renderButtons() {
  const btnContainer = document.getElementById('question-buttons');
  btnContainer.innerHTML = '';
  questions.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.textContent = idx + 1;
    btn.className = idx === current ? 'active' : '';
    btn.onclick = () => {
      saveAnswer();
      current = idx;
      renderQuestion();
    };
    btnContainer.appendChild(btn);
  });
}

function renderQuestion() {
  document.getElementById('question-text').textContent = questions[current];
  document.getElementById('answer').value = answers[current];
  renderButtons();
  updateCounts();
}

function saveAnswer() {
  answers[current] = document.getElementById('answer').value.trim();
}

document.getElementById('next-btn').onclick = () => {
  saveAnswer();
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  }
};

document.getElementById('end-test-btn').onclick = () => {
  saveAnswer();
  console.log("Answers:", answers);
  window.location.href = "endtest.html";
};


function updateCounts() {
  const attempted = answers.filter(ans => ans !== "").length;
  document.getElementById('attempted').textContent = attempted;
  document.getElementById('notAttempted').textContent = questions.length - attempted;
}

let secondsLeft = 30 * 60;
setInterval(() => {
  if (secondsLeft > 0) {
    secondsLeft--;
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    document.getElementById('timer').textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;
  }
}, 1000);

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const cam = document.getElementById('camera');
    cam.srcObject = stream;
  })
  .catch(() => alert("Unable to access camera."));

renderQuestion();
