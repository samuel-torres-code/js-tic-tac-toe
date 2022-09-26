const player_x_class = 'x'
const player_o_class = 'o'

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_o_turn = false

startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
    console.log('restart')
    isPlayer_o_turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(player_x_class)
        cell.classList.remove(player_o_class)
        cell.innerText = ''
        
        cell.removeEventListener('click',handleCellClick)
        cell.addEventListener('click',handleCellClick,{once: true})

    })
    winningMessageTextElement.innerText = ''
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayer_o_turn ? player_o_class : player_x_class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {

        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = "Draw";
    }
    else {
        console.log(`${isPlayer_o_turn ? "o":"x"} Wins`)
        winningMessageTextElement.innerText = `${isPlayer_o_turn ? "o":"x"} Wins`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player_x_class) || cell.classList.contains(player_o_class) 
    })
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
    cell.innerText = currentClass;
}
function swapTurns() {
    isPlayer_o_turn = !isPlayer_o_turn;
}
function checkWin(currentClass) {
    let winBool = true
    // horizontal expand 2d array into list
    // [o x x]
    // [o _ _]
    // [o _ _]
    // [o x x o _ _ o _ _]

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(!cellElements[i*3+j].classList.contains(currentClass)) {
                winBool = false
            }
        }
        if(winBool) {
            return true;
        }
        else {
            winBool = true
        }
        
    }
    //vertical
    for(let j = 0; j < 3; j++) {
        for(let i = 0; i < 3; i++) {
            if(!cellElements[i*3+j].classList.contains(currentClass)) {
                winBool = false
            }
        }
        if(winBool) {
            return true;
        }
        else {
            winBool = true
        }
        
    }
    //diagonal
    for(let both = 0; both < 3; both++) {
        if(!cellElements[both*3+both].classList.contains(currentClass)) {
            winBool = false
        }
        
    }
    if(winBool) {
        return true;
    }
    else {
        winBool = true
    }

    for(let both = 2; both >=0; both--) {
        if(!cellElements[both*3+both].classList.contains(currentClass)) {
            winBool = false
        }
        
    }
    if(winBool) {
        return true;
    }
    else {
        winBool = true
    }


    return false;
}

function setBoardHoverClass() {

}