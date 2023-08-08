/*----- constants -----*/
const COLORS = {
    '0': null,
    '1': 'orange',
    '-1': 'purple',
}
const WIN_NUM = 3;

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleChoice);
buttonEl.addEventListener('click', init);
const divEls = [...document.querySelectorAll('#board > div')];

/*----- functions -----*/
init();

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = null;
    render();
}

function render(){
    renderBoard();
    renderMessages();
    renderControls();
}

function renderBoard(){
    board.forEach(function(value, idx){
        const idxEl = `c${idx}`;
        const cellEl = document.getElementById(idxEl);
        cellEl.style.backgroundColor = COLORS[value];
    });
}

function renderMessages() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins`;
    } else {
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    buttonEl.style.visibility = winner ? 'visible' : 'hidden';
}

function handleChoice(evt){
    const idx = divEls.indexOf(evt.target);
    console.log(idx);
    if(evt.target.id === "board") return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner() {
    return checkVerticalWin() || checkHorizontalWin() || checkDiagonalNESW() || checkDiagonalNWSE();
}

function checkVerticalWin() {
    const vertical1 = [board[0], board[3], board[6]];
    const vertical2 = [board[1], board[4], board[7]];
    const vertical3 = [board[2], board[5], board[8]];
    if (checkAdjacent(vertical1) >= WIN_NUM) { 
        return vertical1[0];
    } else if(checkAdjacent(vertical2) >= WIN_NUM) {
        return vertical2[0];
    } else if ((checkAdjacent(vertical3)) >= WIN_NUM) {
        return vertical3[0];
    } else{
        return null
    }
}

function checkHorizontalWin() {
    const horizontal1 = [board[0], board[1], board[2]];
    const horizontal2 = [board[3], board[4], board[5]];
    const horizontal3 = [board[6], board[7], board[8]];
    if (checkAdjacent(horizontal1) >= WIN_NUM) { 
        return horizontal1[0];
    } else if(checkAdjacent(horizontal2) >= WIN_NUM) {
        return horizontal2[0];
    } else if ((checkAdjacent(horizontal3)) >= WIN_NUM) {
        return horizontal3[0];
    } else{
        return null
    }
}

function checkDiagonalNESW() {
    const diagonalNESW = [board[0], board[4], board[8]];
    if (checkAdjacent(diagonalNESW) >= WIN_NUM){
        return diagonalNESW[0];
    } else {
        return null;
    }
}

function checkDiagonalNWSE() {
    const diagonalNWSE = [board[2], board[4], board[6]];
    if (checkAdjacent(diagonalNWSE) >= WIN_NUM){
        return diagonalNWSE[0];
    } else {
        return null;
    }
}

function checkAdjacent(arr){
    let count = 0;
    const num = arr[0]
    arr.forEach(function(value) {
        if(value === num){
            count++;
        }
    });
    return count;
}