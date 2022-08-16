/* NOTES
   The main idea is to use some functional programming here by compartmentalizing as much
   of the code into their own functions as I can, the DRY principle. Anything left in the
   global scope like the player/cpu scores and current round winner is done purposefully
   as for the functions themselves to reach out to and grab so that the program can stay
   neatly organized
   */

//Initialize player and CPU score
let playerScore= 0;
let cpuScore = 0;
let roundWin = '';

// 4. Three buttons with eventListeners that call playRound w/ correct playerChoice
// Can also use document.getElementById, but query selector covers more bases
const btnRock = document.querySelector('#btn-rock')
const btnPaper = document.querySelector('#btn-paper')
const btnScissors = document.querySelector('#btn-scissors')
const playerScorecard = document.querySelector('.player-score')
const cpuScorecard = document.querySelector('.cpu-score')
const messageBox = document.querySelector('.messageBox')
const buttons = document.querySelector('.buttons')
const gameWinner = document.querySelector('.gameWinner')

// Give the buttons the eventlisteners that will play the game
btnRock.addEventListener('click', () => clicked('ROCK'));
btnPaper.addEventListener('click', () => clicked('PAPER'));
btnScissors.addEventListener('click', () => clicked('SCISSORS'));

// Generates a random choice of RPS for the cpu to be called when clicked
const getRandomChoice = () => {
    let random = Math.floor(Math.random() * 3)
    switch (random) {
        case 0 :
            return 'ROCK'
        case 1 :
            return 'PAPER'
        case 2 : 
            return 'SCISSORS'
    }
}

// Main game logic; checks the winner as if it were RPS in real life
function playRound(playerChoice, cpuChoice) {
    if(cpuChoice == playerChoice){
        roundWin = 'tie';
    }
    // Use bitwise OR operator to test playerChoice's values against cpuChoice()'s values.
    else if (
        (playerChoice == 'ROCK') && (cpuChoice == 'SCISSORS') ||
        (playerChoice == 'SCISSORS') && (cpuChoice == 'PAPER') ||
        (playerChoice == 'PAPER') && (cpuChoice == 'ROCK')
    ) {
        playerScore++;
        roundWin = 'player';
    }
    else if (
        (cpuChoice == 'ROCK') && (playerChoice == 'SCISSORS') ||
        (cpuChoice == 'SCISSORS') && (playerChoice == 'PAPER') ||
        (cpuChoice == 'PAPER') && (playerChoice == 'ROCK')
    ) {
        cpuScore++;
        roundWin = 'cpu'
    }
}

// Adds the points necessary to the winner of the current round
const addPoints = () => {
    if (roundWin == 'tie') {
    } else if (roundWin == 'player') {
        playerScorecard.innerHTML = playerScore
    } else if (roundWin == 'cpu') {
        cpuScorecard.innerHTML = cpuScore
    }
}

// Returns true or false when the game is over.
const isGameOver = () => {
    return playerScore === 5 || cpuScore === 5;
}

/* Most of the game is 'played' from this button click, so we'll
   put all of our functions in there that get called when a button
   is clicked */
function clicked(playerChoice) {
    cpuChoice = getRandomChoice();
    playRound(playerChoice, cpuChoice);
    addPoints()
    if (isGameOver()) {
        gameOverScreen()
        buttons.remove();
    }
}

function gameOverScreen() {
    if (playerScore === 5) {
        gameWinner.innerHTML = 'PLAYER WINS'
    } else {
        gameWinner.innerHTML = 'CPU WINS'
    }
}
