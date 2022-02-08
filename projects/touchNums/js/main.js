'use strict'

var gNextNum = 0;
var gStartTime;
var gTimer = 0;

var gNums = [];

function chooseBoard(size) {
    resetVars();
    createNums(size);
    renderBoard();
}

function resetVars() {
    clearInterval(gTimer);
    gNums = [];
    var elTimer = document.querySelector('.timer')
    var elMessage = document.querySelector('.message')
    elTimer.innerText = '';
    elMessage.innerText = '';
    gStartTime;
    gNextNum = 0;
    updateNextNum();
}

function createNums(size) {
    var nums = [];
    for (var i = 1; i <= size; i++) {
        nums.push(i);
    }
    gNums = shuffle(nums)
    return gNums;
}

function init() {
    createNums(16);
    renderBoard();
    updateNextNum();
}

function cellClicked(clickedNum) {
    if (+clickedNum.innerText === 1) {
        gStartTime = Date.now();
        startTime()
    }
    if (+clickedNum.innerText === gNextNum) {
        changeState(clickedNum);
        checkWin();
    }
}

function changeState(elBtn) {
    elBtn.classList.add('num-clicked');
}

function checkWin() {
    if (gNextNum === gNums.length) {
        var elMessage = document.querySelector('.message');
        elMessage.innerText = 'You Won!'
        clearInterval(gTimer);
    }
    else {
        updateNextNum();        
    }
}

function updateNextNum(){
    gNextNum++;
    var elNextNum = document.querySelector('.next-num');
    elNextNum.innerText = 'Next Number: ' + gNextNum;
}

function startTime() {
    var elTimer = document.querySelector('.timer')
    gTimer = setInterval(() => {
        var time = (Date.now() - gStartTime)
        elTimer.innerText = (+time / 1000).toFixed(3) + '';
        var seconds = parseInt(+time / 1000); //number
        var milliseconds = ((+time / 1000) - seconds).toFixed(3);
        elTimer.innerText = parseInt(+time / 1000) + milliseconds.substring(1,5);
    }, 1000);

}

function renderBoard() {
    var rows = Math.sqrt(gNums.length);
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < rows; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < rows; j++) {
            strHTML += `<td class="num" onclick="cellClicked(this)">${gNums[rows * i + j]}</td>`
        }

        strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;
}