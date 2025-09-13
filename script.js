const startBtn = document.querySelector(".start-btn");
const popupinfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quisBox = document.querySelector(".quis-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let selectedQuestions = [];

function getRandomQuestions(allQuestions, count) {
  let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

startBtn.onclick = () => {
  popupinfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupinfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  selectedQuestions = getRandomQuestions(questions, 5);

  quizSection.classList.add("active");
  popupinfo.classList.remove("active");
  main.classList.remove("active");
  quisBox.classList.add("active");

  showQuestions(0);
  questionCounter(1);
  headerScore();
};

tryAgainBtn.onclick = () => {
  quisBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  selectedQuestions = getRandomQuestions(questions, 5);

  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

goHomeBtn.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
};

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < selectedQuestions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('active');
  }
  else {
    showResultBox();
  }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${selectedQuestions[index].question}`;

  let optionTag = `
      <div class="option"><span>${selectedQuestions[index].options[0]}</span></div>
      <div class="option"><span>${selectedQuestions[index].options[1]}</span></div>
      <div class="option"><span>${selectedQuestions[index].options[2]}</span></div>
      <div class="option"><span>${selectedQuestions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = selectedQuestions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add('correct');
    userScore += 1;
    headerScore();
  }
  else {
    answer.classList.add('incorrect');

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute('class', 'option correct');
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active');
}

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} dari ${selectedQuestions.length} Pertanyaan`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `Skor: ${userScore} / ${selectedQuestions.length}`;
}

function showResultBox() {
  quisBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Skor Kamu ${userScore} dari ${selectedQuestions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = (userScore / selectedQuestions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}

resultBox.addEventListener("click", function(e) {
  const circle = document.createElement("div");
  circle.classList.add("click-effect");
  circle.style.left = `${e.pageX - 10}px`;
  circle.style.top = `${e.pageY - 10}px`;
  document.body.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
});
