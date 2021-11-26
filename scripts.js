//gameBoard function (module pattern)

const gameBoard = (function() {

})();

//displayController function (module pattern)

const displayController = (function() {

})();

//createPlayer function (factory pattern)
function createPlayer (name, marker) {
    return {
        name,
        marker
    }
}

