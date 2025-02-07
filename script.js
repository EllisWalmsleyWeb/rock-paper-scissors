let getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
};

let getHumanChoice = () => {
  let choice = prompt("rock, paper, or scissors?").toLowerCase();

  if (choice === "rock" || choice === "paper" || choice === "scissors") {
    return choice;
  }

  return "Invalid choice. Please refresh and enter rock, paper, or scissors.";
};

let playGame = () => {
  let humanScore = 0;
  let computerScore = 0;

  let playRound = (humanChoice, computerChoice) => {
    if (humanChoice === computerChoice) {
      return "It's a tie!";
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "scissors" && computerChoice === "paper") ||
      (humanChoice === "paper" && computerChoice === "rock")
    ) {
      humanScore++;
      return `You win! ${humanChoice} beats ${computerChoice}`;
    } else {
      computerScore++;
      return `You lose! ${computerChoice} beats ${humanChoice}`;
    }
  };

  const playFiveRounds = (round) => {
    if (round > 5) {
      console.log(
        `Final Score: You - ${humanScore}, Computer - ${computerScore}`
      );
      if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
      } else if (computerScore > humanScore) {
        console.log("You lost the game. Better luck next time!");
      } else {
        console.log("It's a tie game!");
      }
      return;
    }

    let humanSelection = getHumanChoice();
    if (humanSelection.startsWith("Invalid")) {
      console.log(humanSelection);
      return;
    }

    let computerSelection = getComputerChoice();
    console.log(`Round ${round}:`);
    console.log(`Computer chose: ${computerSelection}`);
    console.log(`You chose: ${humanSelection}`);
    console.log(playRound(humanSelection, computerSelection));

    playFiveRounds(round + 1);
  };

  playFiveRounds(1);
};

playGame();
