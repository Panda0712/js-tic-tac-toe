/**
 * Global variables
 */

import {
  getCurrentTurnElement,
  getGameStatusElement,
  getCellElementList,
  getReplayGameButton,
} from "./selectors.js";

import { TURN, CELL_VALUE, GAME_STATUS } from "./constants.js";

let isGameEnded = false;
let cellValues = new Array(9).fill("");
let countPlay = 0;

export function checkCountPlay(countPlay) {
  return countPlay % 2 === 0;
}
export function checkGameStatus(cellValues) {
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

export function checkWhichWin(cellValues) {
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

export function lightingLiElement(liList) {
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

export function disableLiElement(liList) {
  liList.forEach((liElement) => {
    liElement.style.pointerEvents = "none";
  });
}

export function checkStatusEachLiElement(
  status,
  liList,
  cellValues,
  replayButton
) {
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

export function handleClickLi(liList, status, currentTurn, replayButton) {
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

export function handleClickReplay(replayButton, status, currentTurn) {
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
/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
(() => {
  const liList = Array.from(getCellElementList());
  const replayButton = getReplayGameButton();
  const status = getGameStatusElement();
  const currentTurn = getCurrentTurnElement();
  handleClickLi(liList, status, currentTurn, replayButton);
  handleClickReplay(replayButton, status, currentTurn);
})();
