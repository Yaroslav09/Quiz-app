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
let timer;


let questions = [];

fetch("question.json")
    .then(res => {
        return res.json();    
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startQuiz();
    })
    .catch(err => {
        console.error(err);
    })

const CORRECT_QUIZ = 10;
const MAX_QUESTIONS = 10;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];    
    getNewQuestion();
} 

getNewQuestion = () => {   

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("https://yaroslav09.github.io/Quiz-app/result.html");
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
    
    startTimer();
    
    acceptingAnswes = true;
};

startTimer = () => {
    clearInterval(timer);
    let timeLimitInSeconds = 20; 
    timer = setInterval(() => {
        timeLimitInSeconds--;        
        document.getElementById('timer').innerText = `${timeLimitInSeconds}s`;
        if (timeLimitInSeconds <= 0) {
            clearInterval(timer);            
            handleTimeOut();
        }
    }, 1000);
};

handleTimeOut = () => {    
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    getNewQuestion();
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
    score += num;
    scoreText.innerText = score;
}
