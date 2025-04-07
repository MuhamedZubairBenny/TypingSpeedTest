const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

let timer;
let startTime;
let quote = '';
let correctChars = 0;

const quotes = [
    "apple", "brave", "chair", "dream", "eagle", "flame", "grape", "honey", "index", "jelly",
    "knife", "lemon", "mouse", "noble", "ocean", "piano", "queen", "river", "stone", "table",
    "unity", "vivid", "wheat", "xenon", "yacht", "zebra", "bloom", "candy", "daisy", "frost",
    "glove", "habit", "ivory", "jumpy", "koala", "lunar", "mango", "ninja", "oxide", "pearl",
    "quirk", "rider", "spice", "twist", "urban", "vapor", "whale", "yeast", "zesty", "vigor"
];

function getRandomQuote() {
    let selected = [];
    for (let i=0; i<5; i++){
        const randomIndex = Math.floor(Math.random() * quotes.length);
        selected.push(quotes[randomIndex]);
    }
    return selected.join(' ');
}

function displayQoute(newQuote) {
    quoteDisplay.innerHTML = '';
    newQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
}

function startTest() {
    quote = getRandomQuote();
    displayQoute(quote);
    quoteInput.value = '';
    timerEl.textContent = 0;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    correctChars = 0;
    clearInterval(timer);
    startTime = null;
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const seconds = Math.floor((new Date() - startTime) / 1000);
        timerEl.textContent = seconds;
    }, 1000);
}

quoteInput.addEventListener('input', () => {
    const input = quoteInput.value;
    const quoteSpans = quoteDisplay.querySelectorAll('span');
    let correct = true;
    let currentCorrect = 0;

    if(!startTime) startTimer();

    input.split('').forEach((char, i) => {
        const span = quoteSpans[i];
        if (!span) return;
        if(char === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
            currentCorrect++;
        } else{
            span.classList.add('incorrect');
            span.classList.remove('correct');
        }
    });

    correctChars = currentCorrect;
    const timeElapsed = (new Date() - startTime) / 60000;
    const wordsTyped = input.trim().split(/\s+/).length;
    const wpm = Math.floor((wordsTyped / timeElapsed) );
    wpmEl.textContent = isNaN(wpm) ? 0 : wpm;

    const accuracy = Math.floor((correctChars / input.length * 100));
    accuracyEl.textContent = isNaN(accuracy) ? 100 : accuracy;

    if (input === quote){
        clearInterval(timer);
    }
});

document.getElementById('quote-input').addEventListener('keydown', function(event){
    if (event.keyCode === 13){
        event.preventDefault();

        document.getElementById('restart-btn').click();
    }
});

restartBtn.addEventListener('click', startTest);

startTest(); 