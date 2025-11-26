const scores = JSON.parse(localStorage.getItem("gameScore")) || [];

const bestScoreElement = document.getElementById("bestScore");

if (scores.length > 0) {
  const bestScore = Math.max(...scores.map(game => game.score));
  bestScoreElement.textContent = bestScore;
} 
