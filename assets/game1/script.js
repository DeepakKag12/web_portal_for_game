let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let h3 = document.querySelector("h3");
let btns = ["blue", "red", "yellow", "green"];

document.querySelector("#start-btn").addEventListener("click", () => {
    if (!start) {
        console.log("Game started");
        start = true;
        level = 0;
        userSeq = [];
        gameSeq = [];
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function playSound(type) {
    let audio;
    if (type === "click") {
        audio = new Audio("click.mp3"); 
    } else if (type === "burst") {
        audio = new Audio("burst.mp3"); 
    }
    if (audio) audio.play();
}

function levelup() {
    level++;
    h3.innerText = `Level: ${level}`;
    let ranidx = Math.floor(Math.random() * 4);
    let randomcol = btns[ranidx];
    let ranbtn = document.querySelector(`.${randomcol}`);
    gameSeq.push(randomcol);
    console.log("Game Sequence:", gameSeq);
    btnflash(ranbtn);
}

function checkAns() {
    let idx = userSeq.length - 1; 
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct move");
        playSound("click"); 
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000); 
            userSeq = []; 
        }
    } else {
        h3.innerText = "Bubble Bust! Press 'Start Game' to try again."; // Updated text
        console.log("Game Over");
        let incorrectBubble = document.querySelector(`#${userSeq[idx]}`);
        if (incorrectBubble) {
            incorrectBubble.classList.add("burst");
            playSound("burst"); 
            setTimeout(() => {
                incorrectBubble.classList.remove("burst");
            }, 500); 
        }
        let scoreElement = document.querySelector("#score");
        if (!scoreElement) {
            scoreElement = document.createElement("h2");
            scoreElement.setAttribute("id", "score");
            h3.after(scoreElement); 
        }
        scoreElement.innerText = `Your final score: ${level * 10}`;
        start = false;
        level = 0;
        gameSeq = [];
        userSeq = [];
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let userCol = btn.getAttribute("id");
    console.log("User pressed:", userCol);
    userSeq.push(userCol);
    checkAns();
}

let allbtns = document.querySelectorAll(".bubble");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
