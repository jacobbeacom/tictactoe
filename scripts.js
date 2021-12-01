
//gameBoard function (module pattern) - creates gameboard array

const gameBoard = (function() {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const boardUpdate = (i, j) => {
        board[i][j] = Player.marker;
    };
    
    
    return {
        board,
        boardUpdate
    };

})();

//createPlayer function (factory pattern)
function Player (marker) {
    const playerMove = (id) => {    
        if (id.textContent == marker) {
            alert("Sorry, you already have that spot.");
        } 
        else if (id.textContent != marker && id.textContent != "") {
            alert("Looks like your opponent has already played there.");
        }
        else {
            id.textContent = marker;
            return "success";
        }
    }
    return {
        playerMove,
        marker
    }

}

let player1 = Player('X');
let player2 = Player('O');

//displayController function (module pattern) - displays array on screen as a table, provides game logic

const displayController = (function() {
    let square;
    let getSquareContent;
    let container = document.getElementById('gameBoardContainer');
    makeSquares = () => {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                square = document.createElement('div');
                square.classList.add("gameBoardSquare");
                square.id = '[' + i + '] ' + '[' + j + ']';
                square.textContent = gameBoard.board[i][j];
                container.appendChild(square);
                getSquareContent = () => square.textContent;
                }
            }
    };
    makeSquares();
    const _boardSquares = document.getElementsByClassName('gameBoardSquare');
    for (let p = 0; p < _boardSquares.length; p++) {
        _boardSquares[p].addEventListener('click', () => {       
            let id = _boardSquares[p];
            let result = player1.playerMove(id);
                if (result == 'success') {
                    gameBoard.board[i][j] = player1.marker;
                }
    return {
        getSquareContent
    };
})}})();








