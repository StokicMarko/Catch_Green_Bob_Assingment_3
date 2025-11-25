const stickMan = document.getElementById("stickMan");
const startBtn = document.getElementById("startBtn");

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

  gameTimer = setTimeout(() => {
    closeGame();
  }, 30000);
}

function closeGame() {
  if (!gameRunning) return;

  gameRunning = false;

  clearTimeout(gameTimer);

  const gameDatas = localStorage.getItem("gameScore");
  if (!gameDatas) {
    gameScore = [gameData];
    localStorage.setItem("gameScore", JSON.stringify(gameScore));
  } 
  else {
    const parseGameDatas = JSON.parse(gameDatas);
    parseGameDatas.push(gameData);
    localStorage.setItem("gameScore", JSON.stringify(parseGameDatas));
  }

  stickMan.style.visibility = "hidden";
  startBtn.style.visibility = "visible";

  gameData.score = 0;
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
}
