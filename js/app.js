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
let countDownTimerId = setInterval(countDown, 1000)

/*----- cached element references -----*/
const startButton = document.getElementById("new-game")


/*----- event listeners -----*/
startButton.addEventListener("click", handleStart);

/*----- functions -----*/

function handleStart() {
    window.location.reload();
    return false;
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
    render();
}

