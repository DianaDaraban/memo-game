const start = document.querySelector('.start');
const gameOverPage = document.querySelector('.end');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.stop-btn');
const restartBtn2 = document.querySelector('.restart-btn');

startBtn.addEventListener('click', () => {start.style.visibility = 'hidden';
moves.textContent = `0`
movesCount = 0;
timer.textContent =`00:00`
btnSelection()});

restartBtn.addEventListener('click', () => window.location.reload());
restartBtn2.addEventListener('click', () => window.location.reload());

const game = document.querySelector('.game');
const gameBoard = document.querySelector('.gameBoard');
const heading = document.querySelector('h3');
const whiteBoard = document.querySelector('.white-board');
const gameBoardBtn = document.getElementsByClassName('game-btn');
const cards = document.getElementsByClassName('cards');
const backFace = document.getElementsByClassName('back-face');
let timer = document.querySelector('.time-counter');
let moves = document.querySelector('.move-counter');
let finalTimer = document.querySelector('.total-time');
let finalMoves = document.querySelector('.total-moves-num');

const numOfCards = ['12', '20', '30'];
const arrRandomCards = [];
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;
let allFlippedCards = 0;


function btnSelection(){
    for (let i = 0; i < numOfCards.length; i++) {
        let rowCards = 4+i;
        let columnCards = 3+i;
        gameBoard.innerHTML += `<button class="game-btn" cards-value="${numOfCards[i]}">${rowCards} x ${columnCards}</button>`;
    }

    function addCards(e){
        const chosenLevel = Number(e.currentTarget.getAttribute('cards-value'));
        let i = 0;
        while(i < chosenLevel){
            whiteBoard.innerHTML += `<div class="cards cardNumber${i}"></div>`
            i++;
            if(chosenLevel == 20){
                whiteBoard.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
            } else if(chosenLevel == 30){
                whiteBoard.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
                for(c of cards){
                c.style.width = '8.5em';
                c.style.height = '8.5em';
                };
            };
        };
        
        for(c of cards) {
            let randomPosition = Math.floor(Math.random()*cards.length);
            c.style.order = randomPosition;
        };

    addPictures();
    
    for(c of cards){c.addEventListener('click', flipCard, false)} ;
    for(c of backFace){c.addEventListener('click', hideBackFace, false)};

    countingSeconds = setInterval(timeGenerator, 1000);

}
;


function addPictures(){
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML += `<img class="front-face" src="./img/card${i}.jpg" data-image="card${Math.floor(i/2)}" alt="front"/>`;
        cards[i].innerHTML += `<img class="back-face" src="./img/front.jpg" alt="back"/>`;             
    };
};

    for(b of gameBoardBtn){
    b.addEventListener('click', addCards, false);
    }
    gameBoard.addEventListener('click', hide, false);
    game.addEventListener('click', hide, false);
}


function hide(e) {
    e.currentTarget.style.visibility = 'hidden';
    heading.style.visibility = 'hidden';
};

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

        this.classList.add('flip');
        movesCounter();
        if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        matchCards();
    };
};

function matchCards(){
            if(firstCard.children[0].dataset.image == secondCard.children[0].dataset.image){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
                allFlippedCards += 2;
        resetBoard();

        } else {
            lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard.children[1].classList.remove('hidden');
            secondCard.children[1].classList.remove('hidden');

        resetBoard();
        }, 1200);
        };
        
        if(allFlippedCards == cards.length){
            gameOver();
        }
};

function hideBackFace(){
    if(lockBoard) return;
    if(this === firstCard) return;
            this.classList.toggle('hidden');

};

function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
};

function timeGenerator() {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    };

    let secondsValue = seconds < 10 ? `0${seconds}`: seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timer.textContent = `${minutesValue} : ${secondsValue}`;
};

function movesCounter(){
    movesCount += 1;
    moves.textContent = `${movesCount}`;
};

function gameOver() {
    clearInterval(countingSeconds);

    console.log(timer.tex)
    console.log(moves)
    gameOverPage.style.visibility = "visible";
    finalTimer.textContent = timer.textContent;
    finalMoves.textContent = moves.textContent;
}