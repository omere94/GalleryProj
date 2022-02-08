'use strict'

var gQuests;
var gCurrQuestIdx = 0;
var gNextId = 101;

function onInit() {
    gQuests = createQuests()
    renderQuests()
}

function createQuests() {
    return [
        {
            id: gNextId++,
            opts: ['Derrick Rose', 'Allen Iverson'],
            correctOptIndex: 1,
            img: 'picture/1.jpg'
        },
        {
            id: gNextId++,
            opts: ['Kyrie Irving', 'Ja Morant'],
            correctOptIndex: 0,
            img: 'picture/2.jpg'
        },
        {
            id: gNextId++,
            opts: ['Deni Avdija', 'Yotam Halprein'],
            correctOptIndex: 0,
            img: 'picture/3.png'
        },
        {
            id: gNextId++,
            opts: ['Adam Ariel', 'Omri Casspi'],
            correctOptIndex: 1,
            img: 'picture/4.jpg'
        }

    ]
}

function checkAnswer(idx) {
    var elContainerBtn = document.querySelector('.reset');
    var elVictory = document.querySelector('h2');

    var currQuest = gQuests[gCurrQuestIdx]
    console.log('currQuest', currQuest);

    if (idx === currQuest.correctOptIndex) {
        if (gCurrQuestIdx === gQuests.length - 1) {
            elVictory.style.display = 'block';
            elContainerBtn.style.display = 'block';
        } else {
            gCurrQuestIdx++;
            return renderQuests()
        }
    }
}

function renderQuests() {
    var elImg = document.querySelector('.quest-container img');
    var elContainerBtn = document.querySelector('.buttons-container');
    var currQuest = gQuests[gCurrQuestIdx];
    elImg.src = currQuest.img;
    var strHTML = '';
    for (var i = 0; i < currQuest.opts.length; i++) {
        var currOpt = currQuest.opts[i];
        strHTML += `<button onClick = "checkAnswer(${i})" >${currOpt}</button>`;
    }
    elContainerBtn.innerHTML = strHTML;
    
}

function newGame() {
    var elContainerBtn = document.querySelector('.reset');
    var elVictory = document.querySelector('h2');
    elContainerBtn.style.display = 'none';
    elVictory.style.display = 'none';
    gCurrQuestIdx = 0;
    renderQuests();
}


