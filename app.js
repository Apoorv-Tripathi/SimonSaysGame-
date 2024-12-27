let gamSeq = [];
let userSeq = [];
let bnts = ["yellow", "green", "red", "purple"];


let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Event listener to start the game when a key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Function to add a flash animation to a button
function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

// Function to progress to the next level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 4);
    let randColor = bnts[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gamSeq.push(randColor);
    console.log(gamSeq);
    userFlash(randBtn);
}

// Function to handle button presses
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkUserInput(userSeq.length - 1);
}

// Function to check the user's input
function checkUserInput(currentIndex) {
    if (userSeq[currentIndex] === gamSeq[currentIndex]) {
        if (userSeq.length === gamSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    console.log("Game Over");
    h2.innerText = "Game Over! Press any key to restart.";
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);

    resetGame();
}

// Function to reset the game
function resetGame() {
    level = 0;
    gamSeq = [];
    userSeq = [];
    started = false;
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
