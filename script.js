// Module pattern
const gameboard = (function() { // Store gameboard state
    const gameboard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ];
    return {gameboard};
})(); // IIFE

// Factory pattern
function createPlayer(playerName, playerMarker) { // Store player
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
}

// Module pattern
const GameController = (function() { // Game functions
    let _turn;
    const init = function() {
        console.log('Running GameController.init')
        _turn = true;
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
    const playRound = function(){
        player = _turn ? players[0] : players[1];
        input = prompt(`${player.name}, enter coordinates of your next move`)
        while(input == null) {
            input = prompt(`${player.name}, enter coordinates of your next move`)
        };
        coords = input.split('');
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
                case '1':
                    row = 0;
                    break;
                case '2':
                    row = 1;
                    break;
                case '3':
                    row = 2;
                    break;
                default:
                    console.log('Invalid coordinates entered.');
                    break;
            };
        };
        if (row != null && col != null) {
            if (gameboard.gameboard[row][col] == '-'){
                gameboard.gameboard[row][col] = player.marker; // update gameboard
                _turn = !_turn;
            }
            else {
                console.log('This space is taken, please choose another.');
            }
        }
    };
    const checkWin = function(gameboard){
        let win = false;
        let playerWin;
        let cols = [[],[],[]];
        for (let row of gameboard) { // check rows
            n = row.filter(cell => cell==row[0] && cell!='-').length;
            if (n == 3) {
                win = true;
                playerWin = _winningPlayer(row[0]);
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
                playerWin = _winningPlayer(col[0]);
            };
        };
        if ((gameboard[0][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][2]) && gameboard[1][1]!='-') { // check diagonals
            win = true;
            playerWin = _winningPlayer(gameboard[1][1]);
        }
        if ((gameboard[0][2] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][0]) && gameboard[1][1]!='-') {
            win = true;
            playerWin = _winningPlayer(gameboard[1][1]);
        }
        if (![].concat(...gameboard).find((item) => item == '-') && !win) { // check draw
            console.log(`It's a draw!`);
        }
        if (win) {
            console.log(`${playerWin.name} wins!`);
        }
        return win;
    };
    const _winningPlayer = function(marker) {
        if (players[0].marker == marker) {
            playerWin = players[0];
        }
        else {
            playerWin = players[1];
        }
        return playerWin;
    };
    return {init, consoleDisplay, playRound, checkWin};
})(); // IIFE

// Module Pattern
const DisplayController = (function(){
    const init = function() {
        console.log('Running DisplayController.init');
        _cacheDom();
        gameboard.gameboard = [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ];
        render(gameboard.gameboard);
    };
    const _cacheDom = function() {
        console.log('Running DisplayController.cachDom')
        this.dialog = document.querySelector('dialog');
        this.player1Input = document.querySelector('#player1');
        this.player2Input = document.querySelector('#player2');
        this.dialogSubmit = document.querySelector('.submit');
        this.gameboardContainer = document.querySelector('.gameboard');
        this.cellButtons = document.querySelectorAll('.cell-button');
    };
    const _clickHandler = function() {};
    const playerDialog = function() {
        console.log('Running DisplayController.playerDialog')
        let Players = [];
        dialog.showModal();
        dialogSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const names = [player1Input.value, player2Input.value];
            const markers = ['X', 'O'];
            for (let i = 0; i < 2; i++) {
                 Players[i] = createPlayer(names[i], markers[i]);
                 console.log(`    ${names[i]} (${markers[i]}) created`)
             };
            dialog.close();
        });
        return Players;
    };
    const render = function(gameboard) {
        console.log('Running DisplayController.render')
        gameboardFlat = [].concat(...gameboard);
        let i = 0;
        for (let cell of gameboardFlat) {
            if (cell == '-') {
                // remove class x and o from button
                cellButtons[i].classList.remove('x');
                cellButtons[i].classList.remove('o');
            }
            else if (cell == 'X') {
                // add class x to button
                cellButtons[i].classList.add('x');
            }
            else {
                // add class o to button
                cellButtons[i].classList.add('o');
            }
            i++;
        }
    };
    return {init, playerDialog, render};
})(); // IIFE

GameController.init();
DisplayController.init();

Players = DisplayController.playerDialog();

// while(GameController.checkWin(gameboard.gameboard)==false) {
//     GameController.playRound();
//     DisplayController.render();
// }
