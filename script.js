// Select the elements you'll work on
// Selecting each div/cell on a object
const cells = {
  a1: document.querySelector(`[data-item='a1']`),
  a2: document.querySelector(`[data-item='a2']`),
  a3: document.querySelector(`[data-item='a3']`),
  b1: document.querySelector(`[data-item='b1']`),
  b2: document.querySelector(`[data-item='b2']`),
  b3: document.querySelector(`[data-item='b3']`),
  c1: document.querySelector(`[data-item='c1']`),
  c2: document.querySelector(`[data-item='c2']`),
  c3: document.querySelector(`[data-item='c3']`),
};

// Creating the wins possibilities here
const winPossibilities = {
  wp1: [cells.a1, cells.a2, cells.a3],
  wp2: [cells.b1, cells.b2, cells.b3],
  wp3: [cells.c1, cells.c2, cells.c3],
  wp4: [cells.a1, cells.b1, cells.c1],
  wp5: [cells.a2, cells.b2, cells.c2],
  wp6: [cells.a3, cells.b3, cells.c3],
  wp7: [cells.a1, cells.b2, cells.c3],
  wp8: [cells.a3, cells.b2, cells.c1],
};

// selecting player and winner to manipulate later
let player = document.querySelector(".player");
let winner = document.querySelector(".winner");

// Create a variable to know if the game is running
let runningGame = false;
let disableReset = true;

// making the start player random, so when u open the game, or reload
// the page, the player to start playing will be random

stopGame();

let whoStartTheGame = document.querySelector(".whoStartTheGame");
let gameName = document.querySelector(".game-name");

let buttonX = document.querySelector(".x").addEventListener("click", () => {
  player.style.color = "black";
  chooseX();
  whoStartTheGame.style.display = "none"; // this is to make the div element disappear when u choose X or O
  gameName.style.marginBottom = "112px";
});
let buttonO = document.querySelector(".o").addEventListener("click", () => {
  player.style.color = "black";
  chooseO();
  whoStartTheGame.style.display = "none";
  gameName.style.marginBottom = "112px";
});

function chooseX() {
  player.innerHTML = "X";
  runningGame = true;
  disableReset = false;
  startGame();
}

function chooseO() {
  player.innerHTML = "O";
  runningGame = true;
  disableReset = false;
  startGame();
}

//showing the player time on screen

//function to switch players
function switchPlayer() {
  if (runningGame == true) {
    player.innerHTML = player.innerHTML == "X" ? "O" : "X";
  }
}

//Making a for loop to go inside each item of the object Cells
// and do whatever is necessary
for (let i in cells) {
  document.querySelector(`[data-item=${i}]`).addEventListener("click", () => {
    if (cells[i].innerHTML == "") {
      cells[i].innerHTML = player.innerHTML;
      trackWin();
      switchPlayer();
    }
  });
}

//now we need to make a function to know when the player wins
function trackWin() {
  // do a for in inside winPossibilites to trck each item
  for (let i in winPossibilities) {
    const [cell1, cell2, cell3] = winPossibilities[i];
    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML == cell2.innerHTML &&
      cell1.innerHTML == cell3.innerHTML
    ) {
      cell1.style.color = "limegreen";
      cell1.style.fontSize = "50px";
      cell2.style.color = "limegreen";
      cell2.style.fontSize = "50px";
      cell3.style.color = "limegreen";
      cell3.style.fontSize = "50px";
      winner.style.color = "limegreen";
      winner.style.fontWeight = "bold";
      winner.innerHTML = `${player.innerHTML} won!`;
      runningGame = false;
      stopGame();
      disableReset = false;
      if (runningGame == true) {
        switchPlayer();
      }
    }
  }
}

//Making a function to stop the game when u win
function stopGame() {
  if (runningGame == false) {
    for (let i in cells) {
      cells[i].style.pointerEvents = "none";
    }
  }
}

//Making a function to reset all the elements when i click the reset button
function reset() {
  if (disableReset == false) {
    player.innerHTML = player.innerHTML;
    winner.innerHTML = "--";
    player.style.color = "black";
    winner.style.color = "white";
    //i'll need to clean all the div elements as well, so, for in of course
    for (let i in cells) {
      cells[i].innerHTML = "";
    }
    whoStartTheGame.style.display = "none";
    startGame();
  }
}

function startGame() {
  for (let i in cells) {
    runningGame = true;
    cells[i].style.pointerEvents = "auto";
    cells[i].style.color = "black";
    cells[i].style.fontSize = "40px";
  }
}

document.querySelector("#reset").addEventListener("click", () => {
  reset();
});
