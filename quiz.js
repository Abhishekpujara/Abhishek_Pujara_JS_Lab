let questionDisplay = document.getElementById("question");
let choiceD = [];
let buttons = [];

for (var i=0; i < 4; i++) {
    choiceD.push( document.getElementById("choice"+i) );
    buttons.push( document.getElementById("btn"+i) );
}

let progress = document.getElementById("progress");


function Question( question, choices, answer ) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

var questions = [
    new Question("A Function Associated With An object is Called:", ["Functions", "Method","Link", "None"], "Method"),
    new Question("IsNaN() Evaluates And Argument To Determine if Given Value:", ["Is Not a Null", "Is Not a Number", "is Not a New Object", "None Of The Above"], "Is Not a Number"),
    new Question("If Button is clicked .......Event Handler is invoked.", ["OnSubmit()", "OnLoad()","IsPostBack()", "Onclick()"], "Onclick()"),
    new Question("Method Prompt() Contain ........Number of Parameters.", ["One", "Two", "Three", "Zero"], "Two"),
    new Question("GetMonth() returns The Month as:", ["Int", "Float", "Char", "String"], "Int")
  ];

function Quiz( questions ) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkAnswer = function( userChoice ) {
    if ( userChoice === this.getQuestionByIndex().answer ) {
        this.score += 1;
    }
    this.questionIndex++;
    if ( this.questionIndex == this.questions.length ) {
        endQuiz();
    }
}

var quiz = new Quiz( questions );

function loadPage() {
    var currentQuestion = quiz.getQuestionByIndex();

    questionDisplay.innerText  = currentQuestion.question;

    for (var i=0; i < currentQuestion.choices.length; i++) {
        choiceD[i].innerText = currentQuestion.choices[i];

        handleOptionButton( currentQuestion.choices[i], buttons[i] );
    }

    var indexActual = quiz.questionIndex + 1;
    progress.innerText = "Question " + indexActual + " of " + questions.length;
}

function handleOptionButton( choice, btn ) {
    btn.onclick = function() {
        quiz.checkAnswer( choice );
        loadPage();
    }
}

function endQuiz() {
    var userScore = quiz.score;
    var totalScore = quiz.questions.length;
    var scorePercentage = ( userScore / totalScore ) * 100;

    var quizDisplay = document.getElementById("quiz");
    quizDisplay.innerHTML = `
        <p id="score">
            Your score is ${userScore}/${totalScore}<br/>
            Percentage is ${scorePercentage}%
        </p>
    `;
}

loadPage();