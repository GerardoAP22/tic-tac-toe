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
    if(evt.target.id === "board") return;
    if (board[idx] !== 0) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner(idx);
    render();
}

function getWinner(idx) {
    //Will contain Vertical, horizontal and Diagonal conditions
    const conditions = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const arr of conditions) {
        if (arr.includes(idx) && checkAdjacent(arr) === WIN_NUM){
            return board[arr[0]];
        }
    }
    return null;
}

function checkAdjacent(arr){
    let count = 0;
    const num = board[arr[0]];
    arr.forEach(function(idx) {
        if(board[idx] === num){
            count++;
        }
    });
    return count;
}