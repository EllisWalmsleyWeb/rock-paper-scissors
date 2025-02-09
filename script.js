let humanScore = 0;
let computerScore = 0;

let getComputerChoice = () => {
  choice = Math.floor(Math.random() * 3);
  if (choice == 0) {
    return "rock";
  } else if (choice == 1) {
    return "paper";
  } else if (choice == 2) {
    return "scissors";
  }
};

let getHumanChoice = () => {
  let choice = prompt("rock, paper, or scissors?").toLowerCase();

  if (choice === "rock" || choice === "paper" || choice === "scissors") {
    return choice; // Valid input, return it
  }

  alert("Invalid choice. Please enter rock, paper, or scissors.");
  return getHumanChoice(); // Recursively call the function again
};

function playRound(humanChoice, computerChoice) {
  if (
    (humanChoice === "rock" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "rock")
  ) {
    computerScore++;
    return `You lose! ${computerChoice} beats ${humanChoice}`;
  } else if (humanChoice === computerChoice) {
    return `It's a tie! You both picked ${computerChoice}`;
  } else {
    humanScore++;
    return `You win! ${humanChoice} beats ${computerChoice}`;
  }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

console.log(playRound(humanSelection, computerSelection));
console.log("Computer score: " + computerScore);
console.log("Human score: " + humanScore);
