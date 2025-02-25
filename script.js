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
  const playBtn = document.getElementById("start-game");
  if (playBtn) {
    playBtn.classList.add("fade-out");
  }

  // Give a slight delay before showing the game elements
  setTimeout(() => {
    // Set up game status container
    const gameContainer = document.querySelector(".results");
    gameContainer.innerHTML = `
      <div class="game-status-container">
        <p id="game-status">Make your choice!</p>
      </div>
    `;

    // Let the CSS handle the visibility with the active class
    const selections = document.querySelector(".selections");

    // Allow time for the DOM to update
    setTimeout(() => {
      document.querySelector(".game-status-container").classList.add("active");
      selections.classList.add("active");
    }, 50);

    // Re-enable selection buttons
    document.querySelectorAll(".selection-btn").forEach((button) => {
      button.disabled = false;
    });

    playGame();
  }, 300);
}

function resetGame() {
  let humanScore = 0;
  let computerScore = 0;

  // Create a fade out effect
  const gameStatusContainer = document.querySelector(".game-status-container");
  const selections = document.querySelector(".selections");
  const playAgainBtn = document.getElementById("play-again-btn");

  if (gameStatusContainer) {
    gameStatusContainer.classList.remove("active");
  }

  selections.classList.remove("active");

  if (playAgainBtn) {
    playAgainBtn.classList.add("fade-out");
  }

  // Short delay to allow for fade out animation
  setTimeout(() => {
    // Update the game status content
    const gameContainer = document.querySelector(".results");
    gameContainer.innerHTML = `
      <div class="game-status-container">
        <p id="game-status">Make your choice!</p>
      </div>
    `;

    // Re-enable selection buttons
    document.querySelectorAll(".selection-btn").forEach((button) => {
      button.disabled = false;
    });

    // Animate the status container back in
    setTimeout(() => {
      document.querySelector(".game-status-container").classList.add("active");
      selections.classList.add("active");
    }, 50);

    playGame();
  }, 300);
}

// Update this portion of the playGame function
function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  const gameContainer = document.querySelector(".results");

  // Clear previous click handlers to prevent multiple registrations
  document.querySelectorAll(".selection-btn").forEach((button) => {
    button.replaceWith(button.cloneNode(true));
  });

  // Reattach event listeners
  document.querySelectorAll(".selection-btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (humanScore < 5 && computerScore < 5) {
        const humanChoice = this.id.replace("-btn", "");
        const computerChoice = getComputerChoice();
        const roundResult = playRound(humanChoice, computerChoice);

        humanScore += roundResult.humanScore;
        computerScore += roundResult.computerScore;

        updateGameStatus(`${roundResult.message} | Score: You ${humanScore} - ${computerScore} Alfred`);

        if (humanScore === 5 || computerScore === 5) {
          const isWin = humanScore === 5;
          const winner = isWin ? "You win!" : "Alfred wins!";

          // Add animation to game status container based on win/loss
          const gameStatusContainer = document.querySelector(".game-status-container");

          // Remove any existing game-over classes first
          gameStatusContainer.classList.remove("game-over-win", "game-over-loss");

          // Add the appropriate class based on win or loss
          if (isWin) {
            gameStatusContainer.classList.add("game-over-win");
          } else {
            gameStatusContainer.classList.add("game-over-loss");
          }

          updateGameStatus(`Game Over! ${winner} Final Score: You ${humanScore} - ${computerScore} Alfred`);

          // Disable the selection buttons after the game ends
          document.querySelectorAll(".selection-btn").forEach((button) => {
            button.disabled = true;
            button.style.opacity = "1";
            button.style.transition = "opacity 0.3s";
          });

          if (!document.getElementById("play-again-btn")) {
            // Add a short delay before showing Play Again button
            setTimeout(() => {
              const playAgainBtn = document.createElement("button");
              playAgainBtn.textContent = "Play Again";
              playAgainBtn.classList.add("playBtn");
              playAgainBtn.id = "play-again-btn";
              playAgainBtn.addEventListener("click", resetGame);
              gameContainer.appendChild(playAgainBtn);
            }, 800);
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
