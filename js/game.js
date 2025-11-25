const stickMan = document.getElementById("stickMan");
const startBtn = document.getElementById("startBtn");

const minesContainer = document.getElementById("minesContainer");
let mines = [];

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = dd + "-" + mm + "-" + yyyy;

const gameData = {
  date: today,
  score: 0,
};

let gameTimer = null;
let gameRunning = false;

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  gameData.score = 0;

  startBtn.style.visibility = "hidden";
  stickMan.style.visibility = "visible";

  spawnMines(gameData.score);

  gameTimer = setTimeout(() => {
    closeGame();
  }, 30000);
}

function closeGame() {
  if (!gameRunning) return;

  gameRunning = false;

  clearTimeout(gameTimer);

  saveGameScore();

  stickMan.style.visibility = "hidden";
  startBtn.style.visibility = "visible";

  gameData.score = 0;

  minesContainer.innerHTML = "";
  mines = [];
}

function changePosition() {
  if (!gameRunning) return;

  gameData.score++;

  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  const newRandomX = Math.floor(Math.random() * (screenX - 200)) + 40;
  const newRandomY = Math.floor(Math.random() * (screenY - 100)) + 40;

  stickMan.style.top = `${newRandomY}px`;
  stickMan.style.left = `${newRandomX}px`;

  spawnMines(gameData.score);
}

function saveGameScore() {
  const gameDatas = localStorage.getItem("gameScore");
  if (!gameDatas) {
    gameScore = [gameData];
    localStorage.setItem("gameScore", JSON.stringify(gameScore));
  } else {
    const parseGameDatas = JSON.parse(gameDatas);
    parseGameDatas.push(gameData);
    localStorage.setItem("gameScore", JSON.stringify(parseGameDatas));
  }
}

function spawnMines(amount) {
  minesContainer.innerHTML = "";
  mines = [];

  const safetyRadius = 120;

  const stickRect = stickMan.getBoundingClientRect();
  const stickX = stickRect.left + stickRect.width / 2;
  const stickY = stickRect.top + stickRect.height / 2;

  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  for (let i = 0; i < amount; i++) {
    let x, y, distanceOk = false;

    while (!distanceOk) {
      x = Math.floor(Math.random() * (screenX - 100));
      y = Math.floor(Math.random() * (screenY - 100));

      const dx = x - stickX;
      const dy = y - stickY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > safetyRadius) {
        distanceOk = true;
      }
    }

    const mine = document.createElement("div");
    mine.classList.add("mine");

    mine.style.left = `${x}px`;
    mine.style.top = `${y}px`;

    mine.addEventListener("mouseover", () => {
      if (gameRunning) {
        alert("💥 You moved your mouse over a mine! Game Over!");
        closeGame();
      }
    });

    minesContainer.appendChild(mine);
    mines.push(mine);
  }
}

