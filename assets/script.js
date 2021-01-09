var questions1 = [["Question 1", "How Many Colors", "Correct Answer 1"], ["Correct Answer 1", "Wrong Answer 11", "Wrong Answer 12", "Wrong Answer 13"]];
var questions2 = [["Question 2", "What is 1 + 1", "Correct Answer 22"], ["Wrong Answer 2", "Wrong Answer 21", "Correct Answer 22", "Wrong Answer 23"]];
var questions3 = [["Question 3", "What is 2 + 1", "Correct Answer 31"], ["Wrong Answer 3", "Correct Answer 31", "Wrong Answer 32", "Wrong Answer 33"]];
var questions4 = [["Question 4", "What is 3 + 4", "Correct Answer 4"], ["Correct Answer 4", "Wrong Answer 41", "Wrong Answer 42", "Wrong Answer 43"]];



var playerInput = document.querySelector("#player");
var questionQ = document.getElementById("questionQ");
var timerEl = document.getElementById("timeLeft");
var questionA = document.getElementById("dquestionA");
var questionNumber = document.getElementById("questionNumber")
var startButton = document.getElementById("startB");
var qSubmit = document.querySelector("#submitQ");
var msgDiv = document.querySelector("#msg");
var playerScore = "";
var playerHighScore = "";
var highScoreBoard = document.getElementById("highScore1");
var radio1 = document.getElementById("answer1");
var radio2 = document.getElementById("answer2");
var radio3 = document.getElementById("answer3");
var radioText1 = document.getElementById("answer1Text");
var radioText2 = document.getElementById("answer2Text");
var radioText3 = document.getElementById("answer3Text");
var updateArticle = document.getElementById("mainArticle");
var updateImg = document.getElementById("startImg");
// var startingImg = "./assets/quiz.jpg";
var qCount = 0;
var aCount = 0;
var timeStart = 30;
var secs = 0;
var tScore = localStorage.getItem("topScore");

if (tScore == null) {
    localStorage.setItem("topName", "Name")
    localStorage.setItem("topScore", 0)
}

highScoreBoard.innerHTML = localStorage.getItem("topName") + ": " + localStorage.getItem("topScore");


// var timer = setInterval(function () {
//     countDown--;
//     if (countDown === 0) {
//         clearInterval(timer);
//         localStorage.setItem("score", countDown);

//     } else {
//         localStorage.setItem("score", countDown);
//         clearInterval(timer);
//     }
// }, 1000);
// function starttimer() {
//     declimentTime = setInterval("declimentTime()", 1000);
// }

// function declimentTime() {
//     if(timeStart > 0 ) {
//         timeStart = timeStart - 1; 
//         timerEl.innterHTML = timeStart;
//     } else {
//         clearInterval()
//     }

// }

// function countDown() {
//     // var element = document.getElementById(elem);
//     timerEl.innerHTML = timeStart;
//     console.log(qCount + "  Countdown")
//     if (timeStart < 1 || qCount === 5) {
//         clearTimeout(timer);
//         timerEl.innerHTML = ""
//     } else {

//     }
//         timeStart--;
//         var timer = setTimeout('countDown(' + timeStart + ')', 1000);


// };


// var clock = 10;
var countDownId = 0;

function startTimer() {
    countDownId = setInterval("countDown()", 1000);
}

function countDown() {
    if (timeStart > 0) {
        timeStart = timeStart - 1;
        timerEl.innerHTML = timeStart;
    } else if (qCount >= 3) {
        clearInterval(countDownId);
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
    timeStart = 30
    var qNum = "questions" + qCount.toString()
    console.log(questionsNum + "           ArticleUpdate");
    console.log(qCount + " qCount after article update");
    var divQuestion = document.createElement("p");
    updateImg.setAttribute("class", "hide");
    questionQ.removeAttribute("class", "hide");
    updateQuestionText(qNum);
};

// Function to update the Questions
function updateQuestionText(questionsNum) {
    var qNum = "questions" + qCount.toString();
    var arrayName = window[qNum];
    console.log(questionsNum + "[0][1]");
    console.log(qCount + "       qCount after question update");
    var questionA = document.getElementById("questionA");
    questionA.innerHTML = arrayName[0][1];
    console.log(qNum + "     RadioUpdate");
    console.log(qCount);
    radioText1.innerHTML = arrayName[1][0];
    radio1.value = arrayName[0][2]
    radioText2.innerHTML = arrayName[1][1];
    radio1.value = arrayName[0][2]
    radioText3.innerHTML = arrayName[1][2];
    radio1.value = arrayName[0][2]
    // qCount++;
    console.log(qCount + " after ++");

}

// Start questions
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("score", 0);
    startTimer();
    // console.log("hit");
    qCount++;
    var qNum = "questions" + qCount.toString()
    console.log(qNum + "    StartButton");

    // grab player name and save it to local storage
    var playerName = document.querySelector("#player").value;
    // console.log(playerName + " clicked");
    localStorage.setItem("Name", playerName);

    // setup main article
    mainArticle(qNum);


});

// function checkSelection() {
//     var radioSelection = document.getElementsByName("answer");
//     var qNum = "questions" + qCount.toString();
//     var arrayName = window[qNum];
//     var correctAnswer = arrayName[0][2]
//     // var aSelection = radioText1;
//     for (var i = 0; i < radioSelection.length; i++);{
//     if (radio[i].checked && radiotext[i] === correctAnswer) {
//         console.log( answer[i]);
//         updateQuestionText(qNum);
//     } else {
//         timeStart = timeStart - 10;
//         localStorage.setItem("score", timeStart);
//         updateQuestionText(qNum);
//         // timeStart--;

//     }}
// }

function correctAnswerCheck(qNum, text) {
    var qNum = "questions" + qCount.toString();
    var arrayName = window[qNum];
    console.log(qNum);
    var correctAnswer = arrayName[0][2];
    console.log(correctAnswer + "from array");
    console.log(text + "  from radio selection");
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

function checkSelection(qNum, text) {
    if (radio1.checked === true) {
        text = radioText1.textContent;
        console.log(radio1.checked + "radio1");
        correctAnswerCheck(qNum, text);
    } else if
        (radio2.checked === true) {
        text = radioText2.textContent;
        console.log(radio2.checked + "radio2");
        correctAnswerCheck(qNum, text);
    } else if
        (radio3.checked === true) {
        text = radioText3.textContent;
        console.log(radio3.checked + "radio3");
        correctAnswerCheck(qNum, text);
    } else console.log("Nothing Checked")

}

qSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var radioSelection = document.getElementsByName("answer");
    if (qCount < 3) {
        // var radioSelection = document.getElementsByName("answer");
        //check for correct answer
        var qNum = "questions" + qCount.toString();
        checkSelection(qNum)
        //clear Checked radio

        for (var i = 0; i < radioSelection.length; i++)
            radioSelection[i].checked = false;
        //run next question
        // updateQuestionText(qNum);

    } else {
        console.log("Updating top Score.")
        for (var i = 0; i < radioSelection.length; i++)
            radioSelection[i].checked = false;
        updateScore()
        clearInterval(countDownId);
        timerEl.innerHTML = ""
        resetImage()

    }
});

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

    //Update DOM 'highScore1'
    // }
}


// Create a timer 40 to 0 seconds
// function startTimer() {

// }

// function countDownTimer() {
//     countDown--;
//     if(CountDown ===0) {
//         clear
//     }
// });



// var timeInterval = setInterval(function() {
//     timerE1.textContent = timeleft + "seconds";
//     timeleft--;
//     if (timeleft ===0) {
//     }



// check corrent answer for question

// function answerQuestion1(A1) {
//     var correctAnswer = questions1[0, 1];
//     switch (A1) {
//         case correctAnswer:
//             // update text with 'Correct'
//             displayMessage("correct", "Correct:  Next question");
//             // continue to next question

//             break;
//         default:
//             // update text with "Incorrent"
//             displayMessage("incorrect", "Incorrect:  -10 seconds");
//         // Remove 10 seconds from timer
//         // continue to next quesiton   
//     }

//     if (a1 == questions1[0, 1]) {
//         alert("correct")
//         startAgain()
//     } else alert("dumbby")
// }

// function answerQuestion2(A2) {
//     var correctAnswer = questions2[0,1];
//     switch(A2) {
//         case correctAnswer:
//             // update text with 'Correct'
//             displayMessage("correct", "Correct:  Next question");
//             // continue to next question

//         break;
//      default:
//             // update text with "Incorrent"
//             displayMessage("incorrect", "Incorrect:  -10 seconds");
//             // Remove 10 seconds from timer
//             // continue to next quesiton   
//         }
// }



//update radio answers
// function updateRadioText(questionsNum) {

//     radioText1.textContent = questionsNum[1][1];
//     radioText2.textContent = questionsNum[1][2];
//     radioText3.textContent = questionsNum[1][3];
// }

// // count down timer
// var timerLeft = setInterval(function () {


// }, 1000);

// Subtrack from local store timer 
// function removeTenSec() {
//     count--;
//     counter.textContent = count;

//     localStorage.setItem("score", count);
// };


// Check High score.