function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  if (choice === 0) return "rock";
  else if (choice === 1) return "paper";
  else return "scissors";
}

function getHumanChoice() {
  let choice = prompt("rock, paper, or scissors?").toLowerCase();

  if (choice === "rock" || choice === "paper" || choice === "scissors") {
    return choice;
  }

  alert("Invalid choice. Please enter rock, paper, or scissors.");
  return getHumanChoice();
}

function playRound(humanChoice, computerChoice, round) {
  if (
    (humanChoice === "rock" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "rock")
  ) {
    console.log(
      `Round ${round}: You lose! ${computerChoice} beats ${humanChoice}`
    );
    return { humanScore: 0, computerScore: 1 };
  } else if (humanChoice === computerChoice) {
    console.log(
      `Round ${round}: It's a tie! You both picked ${computerChoice}`
    );
    return { humanScore: 0, computerScore: 0 };
  } else {
    console.log(
      `Round ${round}: You win! ${humanChoice} beats ${computerChoice}`
    );
    return { humanScore: 1, computerScore: 0 };
  }
}

function playGame(round = 1, humanScore = 0, computerScore = 0) {
  if (round > 5) {
    if (humanScore > computerScore) {
      console.log(`Game Over! You win ${humanScore} to ${computerScore}!`);
    } else if (computerScore > humanScore) {
      console.log(`Game Over! You lose ${humanScore} to ${computerScore}.`);
    } else {
      console.log(
        `Game Over! It's a tie at ${humanScore} to ${computerScore}.`
      );
    }
    return;
  }

  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();
  let scores = playRound(humanChoice, computerChoice, round);

  // Update scores
  playGame(
    round + 1,
    humanScore + scores.humanScore,
    computerScore + scores.computerScore
  );
}

// Start the game
playGame();
