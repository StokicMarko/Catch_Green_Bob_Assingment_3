const stickMan = document.getElementById("stickMan");

function startGame() {
  const startBtn = document.getElementById("startBtn");
  startBtn.remove();

  stickMan.style.visibility = "visible";
}

function changePosition() {
  const screenX = window.innerWidth;
  const screenY = window.innerHeight;

  const newRandomX = Math.floor(Math.random() * (screenX - 200 + 1)) + 40;
  if (newRandomX < 0) newRandomX = newRandomX + 200;

  const newRandomY = Math.floor(Math.random() * (screenY - 100 + 1)) + 40;
  if (newRandomY < 0) newRandomY = newRandomY + 200;

  stickMan.style.top = `${newRandomY}px`;
  stickMan.style.left = `${newRandomX}px`;

  console.log(screenX, screenY, newRandomX, newRandomY);
}
