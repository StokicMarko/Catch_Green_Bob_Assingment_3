const stickMan = document.getElementById("stickMan");
const startBtn = document.getElementById("startBtn");

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;

const gameData = {
  date: today,
  score: 0
}

function startGame() {
  startBtn.style.visibility = "hidden";
  stickMan.style.visibility = "visible";
}

function closeGame() {
  stickMan.style.visibility = "hidden";
  startBtn.style.visibility = "visible";
}

function changePosition() {
  gameData.score++;

  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  const newRandomX = Math.floor(Math.random() * (screenX - 200 + 1)) + 40;
  if (newRandomX < 0) newRandomX = newRandomX + 200;

  const newRandomY = Math.floor(Math.random() * (screenY - 100 + 1)) + 40;
  if (newRandomY < 0) newRandomY = newRandomY + 200;

  stickMan.style.top = `${newRandomY}px`;
  stickMan.style.left = `${newRandomX}px`;

  console.log(screenX, screenY, newRandomX, newRandomY);
  console.log(gameData);
  
}