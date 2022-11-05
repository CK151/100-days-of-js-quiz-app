// creating classes 

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex]
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorreectAnswer(answer)) {
            this.score++;
        }

        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}




//create a question class

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answe = answer;
    }

    isCorreectAnswer(choice) {
        return this.answer == choice
    }
}


//display question 

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //show a question

        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text


        //show options

        let choices = quiz.getQuestionIndex().choices;

        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);

            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

//guess function

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}


//show quiz progress

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress")
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}` ;
};


//show function

function showScores() {
    let quizEndHtml = 
    `
        <h1>Quiz Completed</h1>
        <h2 id="score">You scored: ${quiz.score} of ${quiz.questions.length}</h2>

        <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again </a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");

    quizElement.innerHTML = quizEndHtml;
}

//create quiz questions

let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", ["JQuery", "CSS", "XHTML", "HTML"], "HTML"
    ),

    new Question(
        "Who is the World richest man?", ["Elon", "Benzos", "Mark", "Warren"], "Elon"
    ),

    new Question(
        "Who is the CEO of 4 companies?", ["Elon", "Jack", "Mark", "Warren"], "Elon"
    ),

    new Question(
        "Who is the CEO of ZinoTrust Academy", ["Anderson", "Afolabi", "Zino", "fs-j"], "Zino"
    ),

    new Question(
        "What is the average salary of a junior dev", ["2k", "30k-60k", "100k-150k", "10k"], "30k-60k"
    )

];


let quiz = new Quiz(questions);

//display questions
displayQuestion();

//add a count-down


let time = 10;

let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        }
        else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `
            Time: ${min} : ${sec}
            `;
        }
    }, 1000)
}

startCountDown();