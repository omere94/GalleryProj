'use strict';

const WALL = '#';
const FOOD = '.';
const SUPER_FOOD = '♔';
const EMPTY = ' ';
const CHERRY = '🍒';

var gSize = 10;
var gElPacman;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
var gEmptySlots;
var gCherryInterval;
function init() {
  // console.log('Hello')
  gGame.score = 0;

  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.score').innerText = gGame.score;

  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  // console.table(gBoard)
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gCherryInterval = setInterval(cherryDropper, 15000);
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gSize; i++) {
    board.push([]);
    for (var j = 0; j < gSize; j++) {
      board[i][j] = FOOD;
      if (
        (j == 1 && (i == 1 || i === gSize - 2)) ||
        (j === gSize - 2 && (i === gSize - 2 || i === 1))
      ) {
        board[i][j] = SUPER_FOOD;
      }
      if (
        i === 0 ||
        i === gSize - 1 ||
        j === 0 ||
        j === gSize - 1 ||
        (j === 3 && i > 4 && i < gSize - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  // update model and dom
  gGame.score += diff;
  document.querySelector('.score').innerText = gGame.score;
}

function cherryDropper() {
  gEmptySlots = [];
  for (var i = 1; i < gSize - 1; i++) {
    for (var j = 1; j < gSize - 1; j++) {
      var currCellContent = gBoard[i][j];
      if (currCellContent === EMPTY) {
        var location = {
          i,
          j,
        };
        gEmptySlots.push(location);
      }
    }
  }
  if (gEmptySlots.length) {
    var randLocationIdx = getRandomIntInclusive(0, gEmptySlots.length - 1);
    var randLocation = gEmptySlots[randLocationIdx];
    //update model
    gBoard[randLocation.i][randLocation.j] = CHERRY;
    //update Dom
    renderCell(randLocation, CHERRY);
  }
}

function checkVictory() {
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      if (gBoard[i][j] === FOOD || gBoard[i][j] === SUPER_FOOD) return false;
    }
  }
  return true;
}

function isVictory() {
  console.log('You Won!');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  document.querySelector('.modal').style.display = 'block';
  document.querySelector('.modal span').innerText = 'Won!';
  document.querySelector('.modal h2').style.color = 'green';
  document.querySelector('.modal button').style.backgroundColor = `green`;
}

function gameOver() {
  console.log('Game Over!');
  gGame.isOn = false;
  clearInterval(gCherryInterval);
  clearInterval(gIntervalGhosts);
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  document.querySelector('.modal').style.display = 'block';
  document.querySelector('.modal span').innerText = 'Lost!';
  document.querySelector('.modal h2').style.color = `red`;
  document.querySelector('.modal button').style.backgroundColor = `red`;
}

