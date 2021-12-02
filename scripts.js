
//gameBoard function (module pattern) - creates gameboard array

const gameBoard = (function() {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const checkWinConditions = () => {
        let finalResult;
        const col1 = [board[0][0], board[1][0], board[2][0]];
        const col2 = [board[0][1], board[1][1], board[2][1]];
        const col3 = [board[0][2], board[1][2], board[2][2]];
        const row1 = board[0];
        const row2 = board[1];
        const row3 = board[2];
        const diag1 = [board[0][0], board[1][1], board[2][2]];
        const diag2 = [board[0][2], board[1][1], board[2][0]];
        let winConditions = [col1, col2, col3, row1, row2, row3, diag1, diag2];
        const allEqual = arr => arr.every(val => val === arr[0]);
        const isWin = () => {
            for (let i = 0; i < winConditions.length; i++) {
                let result = allEqual(winConditions[i]);
                    if (result === true && winConditions[i][0] != "") {
                        finalResult = true;
                        return finalResult
                    }
            }
        }
        return isWin();      
    }
return {
    board,
    checkWinConditions,
    }
})();

//createPlayer function (factory pattern)
function Player(marker, name) {
    name = prompt(`Please enter your desired display name`, "Player")
    const playerMove = ([i],[j]) => {    
        let id = '[' + i + ']' + '[' + j + ']'
        let square = document.getElementById(id);
        if (square.textContent == marker) {
            alert("Sorry, you already have that spot.");
        } 
        else if (square.textContent != marker && square.textContent != "") {
            alert("Looks like your opponent has already played there.");
        }
        else {
            square.textContent = marker;
        }
    }
    return {
        playerMove,
        marker,
        name
    }
};

let player1 = Player('X');
let player2 = Player('O');

//displayController function (module pattern) - displays array on screen as a table, provides game logic

const displayController = (function() {
    let square;
    const container = document.getElementById('gameBoardContainer');
    let totalMoves = 0;
    let gameState = 'playing'
    const resetGame = () => {
        let square = document.getElementsByClassName('gameBoardSquare');
            for (i = 0; i < square.length; i++) {
                square[i].textContent = "";
            }
        for (i = 0; i < gameBoard.board.length; i++) {
            for (p = 0; p < gameBoard.board[i].length; p++) {
                gameBoard.board[i][p] = "";
            }
        }
        currentTurn = player1.name;
        totalMoves = 0;
        gameState = 'playing';
        updateDisplay();  
    }
    const checkDraw = (totalMoves) => {
        if (totalMoves == 9 && gameState != 'over') {
        alert("Sorry, looks like a tie.");
        gameState = 'over';
        resetGame();
    }};
    let currentTurn = player1.name;
    const currentTurnDisplay = document.getElementById('currentTurn');
    const updateDisplay = () => currentTurnDisplay.textContent = `Current Turn: ${currentTurn}`;
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetGame);
    const makeSquares = () => {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                square = document.createElement('div');
                square.classList.add("gameBoardSquare");
                square.id = '[' + i + ']' + '[' + j + ']';
                square.addEventListener('click', () => {
                    if (currentTurn == player1.name) {
                        gameBoard.board[i][j] = player1.marker;
                        player1.playerMove([i],[j]);
                        totalMoves++;
                        console.log(totalMoves);
                        checkDraw(totalMoves);
                        let results = gameBoard.checkWinConditions();
                            if (results == true) {
                                alert(`${player1.name} Wins!`);
                                gameState = 'over';
                                resetGame();
                            }
                            else {
                            };
                        currentTurn = player2.name;
                        updateDisplay();
                    }
                    else if (currentTurn == player2.name) {
                        gameBoard.board[i][j] = player2.marker;
                        player2.playerMove([i],[j]);
                        totalMoves++;
                        console.log(totalMoves);
                        checkDraw(totalMoves);
                        let results = gameBoard.checkWinConditions();
                            if (results == true) {
                                alert(`${player2.name} Wins!`);
                                gameState = 'over';
                                resetGame();
                            }
                            else {
                            };
                        currentTurn = player1.name;
                        updateDisplay();
                    }
                return totalMoves;
                });
                container.appendChild(square);
            }
        }
    };
    updateDisplay();
    makeSquares();
    return {
        totalMoves,
        currentTurn,
        square,
        checkDraw
    };
})();




