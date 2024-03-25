// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

// In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

// Module pattern
const gameboard = (function() { // Store gameboard state
    const gameboard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']];
    return {gameboard};
})(); // IIFE

// Factory pattern
function createPlayer(playerName, playerMarker) { // Store player
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
}

// Module pattern
const game = (function() { // Game functions
    let _turn;
    const createPlayers = function() {
        _turn = true;
        const markers = ['X', 'O'];
        let players = [];
        for (let i = 0; i < 2; i++) {
            playerName = prompt(`Player ${i+1} name:`);
            players[i] = createPlayer(playerName, markers[i]);
        };
        console.log(players);
        return players;
    };
    const consoleDisplay = function(gameboard) {
        displayBoard = [['-','A','B','C'],]
        let i = 0;
        for (let row of gameboard) {
            newRow = [`${i+1}`,];
            for (let cell of row) {
                newRow.push(cell);
            };
            displayBoard.push(newRow);
            i++;
        };
        console.table(displayBoard);
    };
    const turn = function(){
        player = _turn ? players[0] : players[1];
        coords = prompt(`${player.name}, enter coordinates of your next move`).split('');
        let row;
        let col;
        for (let coord of coords) {
            switch(coord) {
                case 'A':
                    col = 0;
                    break;
                case 'B':
                    col = 1;
                    break;
                case 'C':
                    col = 2;
                    break;
                default:
                    row = coord - 1;
            };
        };
        gameboard.gameboard[row][col] = player.marker; // update gameboard
        _turn = !_turn;
    };
    const checkWin = function(gameboard){
        let win = false;
        let cols = [[],[],[]];
        for (let row of gameboard) { // check rows
            n = row.filter(cell => cell==row[0] && cell!='-').length;
            if (n == 3) {
                win = true;
            };
            let i = 0;
            for (let cell of row) {
                cols[i].push(cell);
                i++;
            };
        };
        for (let col of cols) { // check cols
            n = col.filter(cell => cell==col[0] && cell!='-').length;
            if (n == 3) {
                win = true;
            };
        };
        if ((gameboard[0][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][2]) && gameboard[1][1]!='-') { // check diagonals
            win = true;
        }
        if ((gameboard[0][2] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][0]) && gameboard[1][1]!='-') {
            win = true;
        }
        return win;
    };
    return {createPlayers, consoleDisplay, turn, checkWin};
})(); // IIFE

players = game.createPlayers();
game.consoleDisplay(gameboard.gameboard);

while(game.checkWin(gameboard.gameboard)==false) {
    game.turn();
    game.consoleDisplay(gameboard.gameboard);
}
