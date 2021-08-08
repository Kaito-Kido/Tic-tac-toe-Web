const X_CLASS ='x'
const O_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winning-message')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restart = document.getElementById('restartButton')
let circleTurn

startGame()

restart.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass  = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    swapTurns()
    setBoardHoverClass()
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function  placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn =!circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(O_CLASS)
    board.classList.remove(X_CLASS)
    if(circleTurn){
        board.classList.add(O_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS)
    })
}