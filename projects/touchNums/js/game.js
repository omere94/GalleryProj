'use strict';

const LEVELS = [16, 25, 36];
const CORRECT_AUDIO = new Audio('');
const VICTORY_AUDIO = new Audio('/sound/victory.mp3');
var gNums;
var gCounter = 1;
var gCurrLevelIdx = 0;
var gBoardCells;
var gTimer;


function createBoard() {
    var board = [];
    for (var i = 0; i < LEVELS[gCurrLevelIdx]; i++) {
        board.push(i + 1);
    }
    return board;
}

function initGame() {

    gNums = shuffle(createBoard());
    renderBoard(gNums);
}

function renderBoard() {
    var strHTML = '';
    var copygNums = gNums.length;
    for (var i = 0; i < Math.sqrt(copygNums); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(copygNums); j++) {
            var currCell = gNums.pop();
            strHTML += `<td onclick="cellClicked(${currCell}, this)">${currCell}</td>`;
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function cellClicked(clickedNum, elCell) {

    if (clickedNum === 1 && gCounter === 1) {
        gTimer = setInterval(setTime, 1000);
    }
    if (gCounter === clickedNum) {
        elCell.classList.add('correct');
        playSound();
        gCounter++;
        console.log(gCounter);
    }
    if (gCounter === LEVELS[gCurrLevelIdx] + 1) {
        VICTORY_AUDIO.play();
        clearInterval(gTimer);
    }
}

function changeLevel(num) {
    gBoardCells = num;

    if (gBoardCells === 16) {
        gCurrLevelIdx = 0;
        restart();
    } else if (gBoardCells === 25) {
        gCurrLevelIdx = 1;
        restart();
    } else if (gBoardCells === 36) {
        gCurrLevelIdx = 2;
        restart();
    }
}

function restart() {
    totalSeconds = 0;
    clearInterval(gTimer);
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    initGame();
    gCounter = 1;
}




