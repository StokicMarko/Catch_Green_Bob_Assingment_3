const stickMan = document.getElementById("stickMan");
const startBtn = document.getElementById("startBtn");
const minesContainer = document.getElementById("minesContainer");
const exitBtn = document.getElementById("exitContainer");

const timerMillSec = 30000;

let mines = [];
let gameTimer = null;
let gameRunning = false;

const gameData = {
  date: getFormattedDate(),
  score: 0,
};

setLastScore();

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  gameData.score = 0;

  toggleUI(true);
  spawnMines(gameData.score);

  gameTimer = setTimeout(closeGameByTime, timerMillSec);
}

function closeGameByTime() {
  alert("Time's up. You finish with a score of " + gameData.score)
  closeGame();
}

function closeGame() {
  if (!gameRunning) return;

  gameRunning = false;
  clearTimeout(gameTimer);

  saveGameScore();
  resetGameUI();
  setLastScore();

  window.location.href = "stats.html";
}

function changePosition() {
  if (!gameRunning) return;

  gameData.score++;

  moveStickManRandomly();
  spawnMines(gameData.score);
}

function spawnMines(count) {
  clearMines();

  const safetyRadius = 120;
  const stickCenter = getStickManCenter();

  for (let i = 0; i < count; i++) {
    const { x, y } = getSafeRandomPosition(stickCenter, safetyRadius);
    const mine = createMineElement(x, y);

    minesContainer.appendChild(mine);
    mines.push(mine);
  }
}

function toggleUI(isGameActive) {
  exitBtn.style.visibility = isGameActive ? "visible" : "hidden";
  startBtn.style.visibility = isGameActive ? "hidden" : "visible";
  stickMan.style.visibility = isGameActive ? "visible" : "hidden";
}

function resetGameUI() {
  toggleUI(false);
  gameData.score = 0;
  clearMines();
}

function clearMines() {
  minesContainer.innerHTML = "";
  mines = [];
}

function moveStickManRandomly() {
  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  const x = Math.floor(Math.random() * (screenX - 200)) + 40;
  const y = Math.floor(Math.random() * (screenY - 100)) + 40;

  stickMan.style.left = `${x}px`;
  stickMan.style.top = `${y}px`;
}

function getStickManCenter() {
  const rect = stickMan.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function createMineElement(x, y) {
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

  return mine;
}

function getSafeRandomPosition(avoidPoint, minDistance) {
  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  let x, y, distance;

  do {
    x = Math.floor(Math.random() * (screenX - 100));
    y = Math.floor(Math.random() * (screenY - 100));

    distance = Math.hypot(x - avoidPoint.x, y - avoidPoint.y);
  } while (distance < minDistance);

  return { x, y };
}

function saveGameScore() {
  const scores = JSON.parse(localStorage.getItem("gameScore")) || [];
  scores.push(gameData);
  localStorage.setItem("gameScore", JSON.stringify(scores));
}

function getFormattedDate() {
  const d = new Date();
  return (
    String(d.getDate()).padStart(2, "0") +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    d.getFullYear()
  );
}

function setLastScore() {
  const data = JSON.parse(localStorage.getItem("gameScore"));
  const lastGame = data[data.length - 1];
  document.getElementById("count").innerHTML = lastGame.score;
}
