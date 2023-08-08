/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'orange',
    '-1': 'purple',
}

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/


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
    board.forEach(function(idx){
        const cellId = `c${idx}`
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = COLORS[idx];
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
