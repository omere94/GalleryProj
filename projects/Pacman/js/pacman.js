'use strict';

const PACMAN = '😷';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 5,
      j: 7,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(ev);
  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCell === WALL) return;
  // hitting a ghost?  call gameOver
  if (nextCell === GHOST && !gPacman.isSuper) {
    gameOver();
    return;
  }
  if (nextCell === FOOD) {
    updateScore(1);
  }

  if (nextCell === SUPER_FOOD && gPacman.isSuper) return;
  if (nextCell === CHERRY) updateScore(10);
  if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
    updateScore(10);
    gPacman.isSuper = true;
    gPacman.currCellContent = SUPER_FOOD;
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    renderCell(gPacman.location, EMPTY);

    setTimeout(() => (gPacman.isSuper = false), 5000);
  }
  if (nextCell === GHOST && gPacman.isSuper) {
    killGhost(nextLocation);
  }

  // moving from corrent position:
  // update the model
  // // update the DOM
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  renderCell(gPacman.location, EMPTY);
  // Move the pacman to new location
  // update the model
  gPacman.location = {
    i: nextLocation.i,
    j: nextLocation.j,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(gPacman.location, getPacmanHTML(ev.code));
  if (gGame.score >= 97) {
    isVictory();
    return;
  }
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}

function getPacmanHTML(direction) {
  var deg;
  switch (direction) {
    case 'ArrowUp':
      deg = '180';
      break;
    case 'ArrowDown':
      deg = '0';
      break;
    case 'ArrowRight':
      deg = '270';
      break;
    case 'ArrowLeft':
      deg = '90';
      break;
  }
  deg += 'deg';
  return `<div class="pacman" style="transform: rotate(${deg})">${PACMAN}</div>`;
}
