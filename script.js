let humanScore = 0;
let computerScore = 0;

let getComputerChoice = (choice) => {
  choice = Math.floor(Math.random() * 3);
  if (choice == 0) {
    return "rock";
  } else if (choice == 1) {
    return "scissors";
  } else if (choice == 2) {
    return "paper";
  }
};

console.log("The computer chose " + getComputerChoice() + ".");

let getHumanChoice = () => {
  let choice = prompt("rock, paper, or scissors?").toLowerCase();

  if (choice === "rock" || choice === "paper" || choice === "scissors") {
    return choice; // Valid input, return it
  }

  alert("Invalid choice. Please enter rock, paper, or scissors.");
  return getHumanChoice(); // Recursively call the function again
};

console.log("You chose " + getHumanChoice() + ".");
