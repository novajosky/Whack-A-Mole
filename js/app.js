/*----- constants -----*/
const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

/*----- app's state (variables) -----*/
let result = 0;
let hitPosition;
let currentTime = 10;
let timerId = null;
let gameActive;
let ignoreClicks;

/*----- cached element references -----*/
const startButton = document.getElementById("new-game")


/*----- event listeners -----*/
startButton.addEventListener("click", handleStart);

/*----- functions -----*/
init();

function init() {
    ignoreClicks = true;
    gameActive = false;
    render();
}

function render() {
    startButton.style.visibility = gameActive ? "hidden" : "visible";
}

function handleStart() {
    gameActive = true;
    render();
}

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 500)
}


moveMole()

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        document.getElementById("keyboard").innerHTML = "Game Over! Your final score is " + result;
    }
}

let countDownTimerId = setInterval(countDown, 1000)
