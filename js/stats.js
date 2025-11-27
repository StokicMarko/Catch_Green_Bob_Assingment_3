const scores = JSON.parse(localStorage.getItem("gameScore")) || [];

const bestScoreElement = document.getElementById("bestScore");
const scoreElement = document.getElementById("score");

if (scores.length > 0) {
  const bestScore = Math.max(...scores.map(game => game.score));
  bestScoreElement.textContent = bestScore;

  const lastGame = scores[scores.length - 1];
  scoreElement.textContent = lastGame.score;
} 
