const startBtn = document.querySelector(".start-btn");
const popupinfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quisBox = document.querySelector(".quis-box");


startBtn.onclick = () => {
  popupinfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupinfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupinfo.classList.remove("active");
  main.classList.remove("active");
  quisBox.classList.add("active");

  showQuestions(0);
};

let questionCount = 0;
let questionNumb = 1;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);
  }
  else {
    console.log('Question Completed');
  }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
      <div class="option"><span>${questions[index].options[1]}</span></div>
      <div class="option"><span>${questions[index].options[2]}</span></div>
      <div class="option"><span>${questions[index].options[3]}</span></div>`

      optionList.innerHTML  = optionTag;

      const option = document.querySelectorAll('.option');
      for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
   }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add('correct');
  }
  else {
   answer.classList.add('incorrect');
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }
}
  

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length}  Questions`;
}
