class Player {
    constructor(color) {
        this.color = color;
    }
};

//create main game class:
class Game {
    constructor(playerOne = new Player('red'), playerTwo = new Player('yellow'))
};

const playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset');

//loop over the possible cell locations
for (let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (ev) => {
        //log coordinates of the cells that would be clicked
        console.log(`${ev.target.parentElement.rowIndex}, ${ev.target.cellIndex}`)
    });
};

// player selection - type names when you start the game
while (!playerOne) {
    playerOne = prompt('Player One Enter your name. You are Red');
}


while (!playerTwo) {
    playerTwo = prompt('Player Two Enter your name. You are Yellow');
}

playerTurn.textContent = `${playerOne}'s Turn!`

//go through all of the cells on the board - make sure JS recognizes they aren't filled in
// and add an event listener on each cell to trigger color changing function

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white'

});

let currentPlayer = playerOne;

function handleClickEvent(e) {
    
    let column = e.target.cellIndex;
    let row = [];
    //for loop to check cell availability - start at the bottom row which is index 5
    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[column].style.backgroundColor === 'white') {
            row.push(tableRow[i].children[column]);
            //changes to the specific player's color once the loop confirms that there is an open space

            if (currentPlayer === playerOne) {
                row[0].style.backgroundColor = playerOneColor;
                if (horizontalCheck() || verticalCheck() || diagonalCheckOne() || diagonalCheckTwo()) {
                    playerTurn.textContent = `${playerOne} Wins!`;
                    playerTurn.style.color = playerOneColor;
                    return (alert(`${currentPlayer} Wins!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = 'Game is a draw';
                    return alert('DRAW!')
                } else {
                    playerTurn.textContent = `${playerTwo}'s Turn!`;
                    return currentPlayer = playerTwo;
                    }
            } else {
                row[0].style.backgroundColor = playerTwoColor;
                if (horizontalCheck() || verticalCheck() || diagonalCheckOne() || diagonalCheckTwo()) {
                    playerTurn.textContent = `${playerTwo} Wins!`;
                    playerTurn.style.color = playerTwoColor;
                    return (alert(`${currentPlayer} Wins!`));
                } else if (drawCheck()){
                    playerTurn.textContent = 'Game is a draw';
                    return alert('DRAW!');
                } else {
                    playerTurn.textContent = `${playerOne}'s Turn!`;
                    return currentPlayer = playerOne;
                }
            }
        }
    }
};


//win checks
// compare a function which compares 4 different slots to see if their colors match
function winCheck(one, two, three, four) {
    return (one == two && one == three && one == four && one !== 'white');
}


//horizontal check to see if there are 4 matching color rows side by side
function horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (winCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row].children[col + 1].style.backgroundColor,
                tableRow[row].children[col + 2].style.backgroundColor,
                tableRow[row].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

//vertical check to see if there are 4 matching vertical color rows above one another
function verticalCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (winCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor,
                tableRow[row + 3].children[col].style.backgroundColor)) {
                return true;
            }
        }
    }
};

// horizontal check - there are two horizontal checks to perform
function diagonalCheckOne() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (winCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor,
                tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

//next diagonal check;
function diagonalCheckTwo() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (winCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor,
                tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

function drawCheck() {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++) {
        if (tableCell[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCell[i]);
        }
    }

    if (fullSlot.length === tableCell.length) {
        return true;
    }
};

//reset button which allows for the continuation of the game, it will
// set the next turn as the person who just finished the game
resetBtn.addEventListener('click', () => {
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });

    playerTurn.style.color = 'black';
    return (currentPlayer == playerOne ? playerTurn.textContent == `${playerOne}'s Turn!` : playerTurn.textContent == `${playerTwo}'s turn!`);
});