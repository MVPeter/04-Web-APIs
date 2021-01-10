var questions1 = [["Question 1", "What is used to separate elements in an array?", "A comma , "], ["A comma , ", "A semicolon ; ", "A question mark ? ", "Wrong Answer 13"]];
var questions2 = [["Question 2", "What should be at the end of each line?", "A semicolon ; "], ["A period . ", "Two front slashes // ", "A semicolon ; ", "Wrong Answer 23"]];
var questions3 = [["Question 3", "Which answer sets a variable?", "var i = 0 "], ["x", "var i = 0 ", "function() ", "Wrong Answer 33"]];
var questions4 = [["Question 4", "What is 3 + 4", "Correct Answer 4"], ["Correct Answer 4", "Wrong Answer 41", "Wrong Answer 42", "Wrong Answer 43"]];



var playerInput = document.querySelector("#player");
var questionQ = document.getElementById("questionQ");
var timerEl = document.getElementById("timeLeft");
var questionA = document.getElementById("dquestionA");
var questionNumber = document.getElementById("questionNumber")
var startButton = document.getElementById("startB");
var qSubmit = document.querySelector("#submitQ");
var msgDiv = document.querySelector("#msg");
var highScoreBoard = document.getElementById("highScore1");
var radio1 = document.getElementById("answer1");
var radio2 = document.getElementById("answer2");
var radio3 = document.getElementById("answer3");
var radioText1 = document.getElementById("answer1Text");
var radioText2 = document.getElementById("answer2Text");
var radioText3 = document.getElementById("answer3Text");
var updateArticle = document.getElementById("mainArticle");
var updateImg = document.getElementById("startImg");
var countDownId = 0;
var qCount = 0;
var timeStart = 30;
var tScore = localStorage.getItem("topScore");

if (tScore == null) {
    localStorage.setItem("topName", "Name")
    localStorage.setItem("topScore", 0)
}

highScoreBoard.innerHTML = localStorage.getItem("topName") + ": " + localStorage.getItem("topScore");

var countDownId = 0;

//Timer
function startTimer() {
    countDownId = setInterval("countDown()", 1000);
}

function countDown() {
    if (timeStart > 0) {
        timeStart = timeStart - 1;
        timerEl.innerHTML = timeStart;
    } else
    checkTimer()
}

function checkTimer() {
    if (timeStart === 0) {
        for (var i = 0; i < radioSelection.length; i++)
            radioSelection[i].checked = false;
        updateScore()
        clearInterval(countDownId);
        resetImage()

    }
}


// Function to remove main article and setup the start image.
function resetImage() {
    updateImg.removeAttribute("class", "hide");
    questionQ.setAttribute("class", "hide");
    var imgDivelement = document.createElement("div");
    imgDivelement.setAttribute("id", "startImg");
    updateArticle.appendChild(imgDivelement);
    qCount = 0;
}


// Function to remote the Image and replace it with the Main article
function mainArticle(questionsNum) {
    var qNum = "questions" + qCount.toString()
    updateImg.setAttribute("class", "hide");
    questionQ.removeAttribute("class", "hide");
    updateQuestionText(qNum);
};

// Function to update the Questions
function updateQuestionText(questionsNum) {
    var qNum = "questions" + qCount.toString();
    var arrayName = window[qNum];
    var questionA = document.getElementById("questionA");
    questionA.innerHTML = arrayName[0][1];
    radioText1.innerHTML = arrayName[1][0];
    radio1.value = arrayName[0][2]
    radioText2.innerHTML = arrayName[1][1];
    radio1.value = arrayName[0][2]
    radioText3.innerHTML = arrayName[1][2];
    radio1.value = arrayName[0][2]
}

// Start questions
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    timeStart = 30
    startTimer();
    localStorage.setItem("score", 0);
    msgDiv.innerHTML = "";
    qCount++;
    var qNum = "questions" + qCount.toString()
    // grab player name and save it to local storage
    var playerName = document.querySelector("#player").value;
    localStorage.setItem("Name", playerName);

    // setup main article
    mainArticle(qNum);


});

// Check for correct answer
function correctAnswerCheck(qNum, text) {
    var qNum = "questions" + qCount.toString();
    var arrayName = window[qNum];
    var correctAnswer = arrayName[0][2];

    if (text === correctAnswer) {
        qCount++;
        updateQuestionText(qNum);
    } else {
        timeStart = timeStart - 10;
        localStorage.setItem("score", timeStart);
        qCount++;
        updateQuestionText(qNum);
    }
}

// Check which radio is active
function checkSelection(qNum, text) {
    if (radio1.checked === true) {
        text = radioText1.textContent;
        correctAnswerCheck(qNum, text);
    } else if
        (radio2.checked === true) {
        text = radioText2.textContent;
        correctAnswerCheck(qNum, text);
    } else if
        (radio3.checked === true) {
        text = radioText3.textContent;
        correctAnswerCheck(qNum, text);
    } else console.log("Nothing Checked")

}

//Submit button for each question.
qSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var radioSelection = document.getElementsByName("answer");
    if (qCount < 3 && timeStart > 0) {
        //check for correct answer
        var qNum = "questions" + qCount.toString();
        checkSelection(qNum)
        //clear Checked radio

        for (var i = 0; i < radioSelection.length; i++)
            radioSelection[i].checked = false;
    } else {
        for (var i = 0; i < radioSelection.length; i++)
            radioSelection[i].checked = false;
        updateScore()
        clearInterval(countDownId);
        timerEl.innerHTML = ""
        resetImage()
    }
});

//Update score, set localstorage items
function updateScore() {
    localStorage.setItem("score", timeStart);
    var tNScore = Number(localStorage.getItem("topScore"));
    var lName = localStorage.getItem("Name");
    var nScore = Number(localStorage.getItem("score"));
    var lScore = localStorage.getItem("score");
    msgDiv.innerHTML = lName + "'s score is " + lScore;
    if (nScore > tNScore) {
        localStorage.setItem("topName", lName);
        localStorage.setItem("topScore", lScore);
        highScoreBoard.innerHTML = localStorage.getItem("topName") + ": " + localStorage.getItem("topScore");
    }
}
