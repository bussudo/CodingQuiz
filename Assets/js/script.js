var queCount = 0;
var curQuestIndex = 0;
var timerId;
var timeUp;
var timer = questions.length * 15;
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var startPage = document.querySelector(".start-page");
var quizPage = document.querySelector("#quiz");
var scorePage = document.querySelector("#scorePage");
var lastSaveSection = document.querySelector("#lastPage");
var quizQuestion = document.querySelector("#question");
var quizAnswers = document.querySelector("#answers");
var quizCorrect = document.querySelector("#ansRight");
var quizEndEl = document.querySelector("#quizEnd");
var submitBtn = document.querySelector("#submit");
var restartBtn = document.querySelector("#restart");
var listHighScores = [];

var questionsEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var initialsEl = document.querySelector("#initials");
var responseEl = document.querySelector("#response");

var timerInterval;
var index = 1;
var counter = 60;
var score = 0;
startPage.style.display = "flex";
quizPage.style.display = "none";
scorePage.style.display = "none";
lastPage.style.display = "none";
console.log(lastPage);
var startCountdown;
// WHEN I click the start button
window.onload = function () {
  startBtn.onclick = () => {
    function countdown() {
      counter--;
      if (counter <= 0) {
        clearInterval(startCountdown);
        quizEnd();
      }
      let timeRem = document.querySelector("#timer");
      let timeTag = "<span>Time Left: " + counter + "</span>";
      timeRem.innerHTML = timeTag;
    }
    startPage.style.display = "none";
    quizPage.style.display = "flex";
    scorePage.style.display = "none";
    lastPage.style.display = "none";
    startCountdown = setInterval(countdown, 1000);
    getQuestion(question, curQuestIndex);
  };
};

function getQuestion() {
  var curQuest = questions[curQuestIndex];
  var questionEl = document.getElementById("question");
  questionEl.textContent = curQuest.question;
  // clears out old answers
  answersEl.innerHTML = "";
  curQuest.answers.forEach(function (answer, i) {
    i++;
    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", answer);
    answerNode.textContent = i + 1 + ". " + answer;
    //attach click event listener to each choice
    answerNode.onclick = questionClick;
    //display question
    answersEl.appendChild(answerNode);
  });
}

//user chooses wrong answer and is penalized
function questionClick() {
  if (this.value !== questions[curQuestIndex].ansRight) {
    counter -= 10;
    responseEl.textContent =
      "Wrong!  The correct answer is " + questions[curQuestIndex].ansRight;
  } else {
    responseEl.textContent = "Correct!";
    //add correct answer to score
    score = score + 5;
    console.log(score);
  }

  responseEl.setAttribute("class", "response");
  setTimeout(function () {
    responseEl.setAttribute("class", "response hide");
    checkforNext();
  }, 1000);
}
function checkforNext() {
  console.log("checking questions length");
  curQuestIndex++;

  if (curQuestIndex >= questions.length) {
    //  if (curQuestIndex === questions.length) {
    clearInterval(startCountdown);
    console.log(curQuestIndex);
    quizEnd();
  } else {
    getQuestion();
  }
}
//end quiz
function quizEnd() {
  clearInterval(timerId);
  lastPage.style.display = "block";
  startPage.style.display = "none";
  quizPage.style.display = "none";
  scorePage.style.display = "flex";
  var scoreEl = document.querySelector("#score");
  var scoreMsg = "You scored " + score + " out of " + questions.length * 5;
  var quizEndmsg = "QUIZ OVER!!";
  quizEndEl.textContent = quizEndmsg;
  scoreEl.textContent = scoreMsg;
}

submitBtn.addEventListener("click", saveScore);

function saveScore() {
  console.log("clicked to save the high scores");
  var initialsEl = document.getElementById("initials");
  // initialsEl.textContent = curScore.initials;
  initialsEl.textContent = initials;
  // document.getElementById('textbox_id').value
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    console.log(score);
    console.log(initials);
    var curScore = {
      score: score,
      initials: initials,
    };
    listHighScores.push(curScore);
    localStorage.setItem("list", JSON.stringify(listHighScores));
    console.log(curScore);
  }
}

function checkForEnter(event) {
  // "13" is enter key
  if (event.key === "Enter") {
    saveScore();
  }
}

// function nextQuestion() {
//   queCount++;
//   console.log(queCount);
//     if (queCount == queCount) {
//       quizEnd();
//     console.log("quizend2");
//   }
// }

function restart() {
  startPage.style.display = "flex";
  quizPage.style.display = "none";
  scorePage.style.display = "none";
  lastPage.style.display = "none";
  document.getElementById("score").innerHTML = "";
  timerEl.innerHTML = "";
  counter = 60;
  queCount = 0;
  curQuestIndex = 0;
  score = 0;
  timer = "";

  curScore = "";
}

submitBtn.onclick = saveScore;

restartBtn.onclick = restart;

initialsEl.onkeyup = checkForEnter;
