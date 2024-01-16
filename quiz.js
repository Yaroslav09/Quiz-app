const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswes = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "2_Iside which HTML element do we put the JavaScript?",
        choice1: "11_<script>",
        choice2: "22_<javascript>",
        choice3: "33_<js>",
        choice4: "44_<scripting>",
        answer: 1
    },
    {
        question: "What is correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<1_script>",
        choice2: "<2_javascript>",
        choice3: "<3_js>",
        choice4: "<4_scripting>",
        answer: 3
    },
    {
        question: "How do you write 'Hello world' in an alert box?",
        choice1: "msgBox('Hello world')",
        choice2: "alertBox('Hello world')",
        choice3: "msg('Hello world')",
        choice4: "alert('Hello world')",
        answer: 4
    }
]


const CORRECT_QUIZ = 10;
const MAX_QUESTIONS = 3;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];    
    getNewQuestion();
} 

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);    
    acceptingAnswes = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswes) return;

        acceptingAnswes = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_QUIZ)
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);        
            getNewQuestion();
        }, 1000);        
    });
});

incrementScore = num => {
    score =+ num;
    scoreText.innerText = score;
}

startQuiz();