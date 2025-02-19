function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function updateGameStatus(message) {
  document.getElementById("game-status").textContent = message;
}

function playRound(humanChoice, computerChoice) {
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return {
      humanScore: 1,
      computerScore: 0,
      message: `You win! ${humanChoice} beats ${computerChoice}`,
    };
  } else if (humanChoice === computerChoice) {
    return {
      humanScore: 0,
      computerScore: 0,
      message: `It's a tie! You both chose ${computerChoice}`,
    };
  } else {
    return {
      humanScore: 0,
      computerScore: 1,
      message: `You lose! ${computerChoice} beats ${humanChoice}`,
    };
  }
}

function startGame() {
  document.querySelector(".selections").style.display = "flex"; // Show player & computer choices
  const gameContainer = document.querySelector(".results");

  // Replace Play button with game status paragraph
  gameContainer.innerHTML = `
    <div class="game-status-container">
      <p id="game-status">Make your choice!</p>
    </div>
  `;

  // Re-enable selection buttons
  document.querySelectorAll(".selection-btn").forEach((button) => {
    button.disabled = false;
  });

  playGame();
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  const gameContainer = document.querySelector(".results");
  const gameStatusContainer = document.querySelector(".game-status-container");

  document.querySelectorAll(".selection-btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (humanScore < 5 && computerScore < 5) {
        const humanChoice = this.id.replace("-btn", "");
        const computerChoice = getComputerChoice();
        const roundResult = playRound(humanChoice, computerChoice);

        humanScore += roundResult.humanScore;
        computerScore += roundResult.computerScore;

        updateGameStatus(
          `${roundResult.message} | Score: You ${humanScore} - ${computerScore} Alfred`
        );

        if (humanScore === 5 || computerScore === 5) {
          updateGameStatus(
            `Game Over! ${
              humanScore === 5 ? "You win!" : "You lose!"
            } Final Score: You ${humanScore} - ${computerScore} Alfred`
          );

          // Disable the selection buttons after the game ends
          document.querySelectorAll(".selection-btn").forEach((button) => {
            button.disabled = true;
          });

          if (!document.getElementById("play-again-btn")) {
            const playAgainBtn = document.createElement("button");
            playAgainBtn.textContent = "Play Again";
            playAgainBtn.classList.add("playBtn");
            playAgainBtn.id = "play-again-btn";
            playAgainBtn.addEventListener("click", () => location.reload()); // Reload page to restart game
            gameContainer.appendChild(playAgainBtn);
          }
        }
      }
    });
  });
}

// Initial Play button setup
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".results");

  // Show the initial Play button
  gameContainer.innerHTML = `<button class="playBtn" id="start-game">Play</button>`;

  document.getElementById("start-game").addEventListener("click", startGame);
});
