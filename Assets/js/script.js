var queCount = 0;
var curQuestIndex = 0;
var timerId;
var timeUp;
var timer = questions.length * 15;
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var startPage = document.querySelector(".start-page");
var quizPage = document.querySelector("#quiz");
var scorePage = document.querySelector("#score");
var quizQuestion = document.querySelector("#question");
var quizAnswers = document.querySelector("#answers");
var quizCorrect = document.querySelector("#ansRight");
var quizEndEl = document.querySelector("#quizEnd");

var questionsEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var responseEl = document.querySelector("#response");

var timerInterval;
var index = 1;
var counter = 60;
var score = 0;
var addInitials;
startPage.style.display = "flex";
quizPage.style.display = "none";
scorePage.style.display = "none";

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

    let timeRem = document.querySelector("#timer");
    let timeTag = "<span>Time Left: " + counter + "</span>";
    timeRem.innerHTML = timeTag;

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
    answerNode.textContent = i + ". " + answer;
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
    console.log(timer);
    responseEl.textContent =
      "Wrong!  The correct answer is " + questions[curQuestIndex].ansRight;
  } else if (this.value == questions[curQuestIndex].ansRight) {
    responseEl.textContent = "Correct!";
    //add correct answer to score
    score = score + 5;
    console.log(score);
  }
  responseEl.setAttribute("class", "response");
  setTimeout(function () {
    responseEl.setAttribute("class", "response hide");
  }, 1000);

  curQuestIndex++;

  if (curQuestIndex === questions.length) {
    clearInterval(startCountdown);
    quizEnd();
  } else {
    getQuestion();
  }
}

//end quiz
function quizEnd() {
  clearInterval(timerId);

  let timeRem = document.querySelector("#seconds-left");
  let timeTag = "<span>Time Left: " + counter + "</span>";
  timeRem.innerHTML = timeTag;
  startPage.style.display = "none";
  quizPage.style.display = "none";
  scorePage.style.display = "flex";
  var scoreEl = document.querySelector("#score");
  var scoreMsg = "You scored " + score + " out of " + questions.length * 5;
  var quizEndmsg = "QUIZ OVER!!";
  quizEndEl.textContent = quizEndmsg;
  scoreEl.textContent = scoreMsg;
}

var scoreEl = document.querySelector("score");

function nextQuestion() {
  queCount++;
  console.log("this one");
  if (queCount == queCount) {
    quizEnd();
  }
}
