// Get li list of cellList
function getCellElementList() {
  return document.querySelectorAll("#cellList > li");
}

// Get current turn element
function getCurrentTurnElement() {
  return document.getElementById("currentTurn");
}

// Get li element at index
function getCellElementAtIdx(index) {
  return document.querySelector(`#cellList > li:nth-child(${index + 1})`);
}

// Get game status element
function getGameStatusElement() {
  return document.getElementById("gameStatus");
}

// Get replay game button
function getReplayGameButton() {
  return document.getElementById("replayGame");
}

// TODO LIST
// Update game status span
// Update the current turn
// Update the li element when click
// Update the replay button when win

// Declaration for turn
const TURN = {
  CROSS: "cross",
  CIRCLE: "circle",
};

// Declaration for cell value
const CELL_VALUE = {
  CROSS: "X",
  CIRCLE: "O",
  WIN: "win",
};

// Declaration for game status
const GAME_STATUS = {
  PLAYING: "PLAYING",
  ENDED: "END",
  X_WIN: "X WIN",
  O_WIN: "O WIN",
};

let currentTurn = "cross";
let isGameEnded = false;
let cellValues = new Array(9).fill("");
let countPlay = 0;

function checkCountPlay(countPlay) {
  return countPlay % 2 === 0;
}

function checkGameStatus(cellValues) {
  return (
    (cellValues[0] &&
      cellValues[0] === cellValues[1] &&
      cellValues[1] === cellValues[2]) ||
    (cellValues[0] &&
      cellValues[0] === cellValues[3] &&
      cellValues[3] === cellValues[6]) ||
    (cellValues[2] &&
      cellValues[2] === cellValues[5] &&
      cellValues[5] === cellValues[8]) ||
    (cellValues[6] &&
      cellValues[6] === cellValues[7] &&
      cellValues[7] === cellValues[8]) ||
    (cellValues[0] &&
      cellValues[0] === cellValues[4] &&
      cellValues[4] === cellValues[8]) ||
    (cellValues[2] &&
      cellValues[2] === cellValues[4] &&
      cellValues[4] === cellValues[6]) ||
    (cellValues[1] &&
      cellValues[1] === cellValues[4] &&
      cellValues[4] === cellValues[7]) ||
    (cellValues[3] &&
      cellValues[3] === cellValues[4] &&
      cellValues[4] === cellValues[5])
  );
}

function checkWhichWin(cellValues) {
  if (
    (cellValues[0] === "O" &&
      cellValues[0] === cellValues[1] &&
      cellValues[1] === cellValues[2]) ||
    (cellValues[0] === "O" &&
      cellValues[0] === cellValues[3] &&
      cellValues[3] === cellValues[6]) ||
    (cellValues[2] === "O" &&
      cellValues[2] === cellValues[5] &&
      cellValues[5] === cellValues[8]) ||
    (cellValues[6] === "O" &&
      cellValues[6] === cellValues[7] &&
      cellValues[7] === cellValues[8]) ||
    (cellValues[0] === "O" &&
      cellValues[0] === cellValues[4] &&
      cellValues[4] === cellValues[8]) ||
    (cellValues[2] === "O" &&
      cellValues[2] === cellValues[4] &&
      cellValues[4] === cellValues[6]) ||
    (cellValues[1] === "O" &&
      cellValues[1] === cellValues[4] &&
      cellValues[4] === cellValues[7]) ||
    (cellValues[3] === "O" &&
      cellValues[3] === cellValues[4] &&
      cellValues[4] === cellValues[5])
  ) {
    return "O";
  } else {
    return "X";
  }
}

function lightingLiElement(liList) {
  if (
    cellValues[0] &&
    cellValues[0] === cellValues[1] &&
    cellValues[1] === cellValues[2]
  ) {
    liList[0].classList.toggle("win");
    liList[1].classList.toggle("win");
    liList[2].classList.toggle("win");
  }
  if (
    cellValues[3] &&
    cellValues[3] === cellValues[4] &&
    cellValues[4] === cellValues[5]
  ) {
    liList[3].classList.toggle("win");
    liList[4].classList.toggle("win");
    liList[5].classList.toggle("win");
  }
  if (
    cellValues[6] &&
    cellValues[6] === cellValues[7] &&
    cellValues[7] === cellValues[8]
  ) {
    liList[6].classList.toggle("win");
    liList[7].classList.toggle("win");
    liList[8].classList.toggle("win");
  }
  if (
    cellValues[0] &&
    cellValues[0] === cellValues[3] &&
    cellValues[3] === cellValues[6]
  ) {
    liList[0].classList.toggle("win");
    liList[3].classList.toggle("win");
    liList[6].classList.toggle("win");
  }
  if (
    cellValues[2] &&
    cellValues[2] === cellValues[5] &&
    cellValues[5] === cellValues[8]
  ) {
    liList[2].classList.toggle("win");
    liList[5].classList.toggle("win");
    liList[8].classList.toggle("win");
  }
  if (
    cellValues[0] &&
    cellValues[0] === cellValues[4] &&
    cellValues[4] === cellValues[8]
  ) {
    liList[0].classList.toggle("win");
    liList[4].classList.toggle("win");
    liList[8].classList.toggle("win");
  }
  if (
    cellValues[2] &&
    cellValues[2] === cellValues[4] &&
    cellValues[4] === cellValues[6]
  ) {
    liList[2].classList.toggle("win");
    liList[4].classList.toggle("win");
    liList[6].classList.toggle("win");
  }
  if (
    cellValues[1] &&
    cellValues[1] === cellValues[4] &&
    cellValues[4] === cellValues[7]
  ) {
    liList[1].classList.toggle("win");
    liList[4].classList.toggle("win");
    liList[7].classList.toggle("win");
  }
}

function disableLiElement(liList) {
  liList.forEach((liElement) => {
    liElement.style.pointerEvents = "none";
  });
}

function checkStatusEachLiElement(status, liList, cellValues, replayButton) {
  if (countPlay === liList.length && !checkGameStatus(cellValues)) {
    isGameEnded = true;
    status.innerText = GAME_STATUS.ENDED;
    replayButton.classList.toggle("show");
  } else if (checkGameStatus(cellValues)) {
    isGameEnded = true;
    disableLiElement(liList);
    if (checkWhichWin(cellValues) === "O") status.innerText = GAME_STATUS.O_WIN;
    else status.innerText = GAME_STATUS.X_WIN;
    lightingLiElement(liList);
    replayButton.classList.toggle("show");
  }
}

function handleClickLi(liList, status, currentTurn, replayButton) {
  liList.forEach((liElement, index) => {
    liElement.addEventListener("click", function (e) {
      countPlay++;
      status.innerText = GAME_STATUS.PLAYING;
      if (checkCountPlay(countPlay)) {
        liElement.classList.add(TURN.CIRCLE);
        liElement.style.pointerEvents = "none";
        currentTurn.classList.toggle(TURN.CIRCLE);
        cellValues[index] = CELL_VALUE.CIRCLE;
        checkStatusEachLiElement(status, liList, cellValues, replayButton);
      } else {
        liElement.classList.add(TURN.CROSS);
        liElement.style.pointerEvents = "none";
        currentTurn.classList.toggle(TURN.CIRCLE);
        cellValues[index] = CELL_VALUE.CROSS;
        checkStatusEachLiElement(status, liList, cellValues, replayButton);
      }
    });
  });
}

function handleClickReplay(replayButton, status, currentTurn) {
  replayButton.addEventListener("click", function () {
    replayButton.classList.remove("show");
    status.innerText = "LOADING";
    currentTurn.classList.remove("circle", "cross");
    currentTurn.classList.add("cross");
    countPlay = 0;
    cellValues.fill("");
    isGameEnded = false;
    getCellElementList().forEach((liElement) => {
      liElement.classList.remove(TURN.CIRCLE);
      liElement.classList.remove(TURN.CROSS);
      liElement.classList.remove(CELL_VALUE.WIN);
      liElement.classList.remove("win");
      liElement.innerText = "";
      liElement.style.pointerEvents = "visible";
    });
  });
}

(() => {
  const liList = Array.from(getCellElementList());
  const replayButton = getReplayGameButton();
  const status = getGameStatusElement();
  const currentTurn = getCurrentTurnElement();
  handleClickLi(liList, status, currentTurn, replayButton);
  handleClickReplay(replayButton, status, currentTurn);
})();
