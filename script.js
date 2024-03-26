// Module pattern
const gameboard = (function() { // Store gameboard state
    const gameboard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ];
    const players = [];
    return {gameboard, players};
})(); // IIFE

// Factory pattern
function createPlayer(playerName, playerMarker) { // Store player
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
}

// Module pattern
const GameController = (function() { // Game functions
    const init = function() {
        console.log('Running GameController.init')
        this._turn = true;
        gameboard.players = [];
    };
    const playRound = function(row, col){
        player = this._turn ? gameboard.players[0] : gameboard.players[1];
        if (gameboard.gameboard[row][col] == '-'){
            gameboard.gameboard[row][col] = player.marker; // update gameboard
            this._turn = !this._turn;
            cellButtons.forEach(element => {
                element.style.setProperty('--player-color', 'lightblue');
                element.style.setProperty('--player-marker', "url('imgs/o.svg')");
            });
        }
        else {
            console.log('This space is taken, please choose another.');
        }
    };
    const checkWin = function(){
        let win = false;
        let playerWin;
        let cols = [[],[],[]];
        for (let row of gameboard.gameboard) { // check rows
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
        if ((gameboard.gameboard[0][0] == gameboard.gameboard[1][1]) && (gameboard.gameboard[1][1] == gameboard.gameboard[2][2]) && gameboard.gameboard[1][1]!='-') { // check diagonals
            win = true;
            playerWin = _winningPlayer(gameboard.gameboard[1][1]);
        }
        if ((gameboard.gameboard[0][2] == gameboard.gameboard[1][1]) && (gameboard.gameboard[1][1] == gameboard.gameboard[2][0]) && gameboard.gameboard[1][1]!='-') {
            win = true;
            playerWin = _winningPlayer(gameboard.gameboard[1][1]);
        }
        if (![].concat(...gameboard.gameboard).find((item) => item == '-') && !win) { // check draw
            console.log(`It's a draw!`);
        }
        if (win) {
            console.log(`${playerWin.name} wins!`);
        }
        return win;
    };
    const _winningPlayer = function(marker) {
        if (gameboard.players[0].marker == marker) {
            playerWin = gameboard.players[0];
        }
        else {
            playerWin = gameboard.players[1];
        }
        return playerWin;
    };
    return {init, playRound, checkWin};
})(); // IIFE

// Module Pattern
const DisplayController = (function(){
    const init = function() {
        console.log('Running DisplayController.init');
        _cacheDom();
        _bindEvents();
        gameboard.gameboard = [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ];
        render();
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
    const _bindEvents = function() {
        this.dialogSubmit.addEventListener('click', _submitPlayers);
        this.gameboardContainer.addEventListener('click', _selectCell);
    };
    const _submitPlayers = function(e) {
        e.preventDefault();
        const names = [player1Input.value, player2Input.value];
        const markers = ['X', 'O'];
        for (let i = 0; i < 2; i++) {
                gameboard.players[i] = createPlayer(names[i], markers[i]);
                console.log(`    ${names[i]} (${markers[i]}) created`)
            };
        dialog.close();
    };
    const _selectCell = function(e) {
        cellIndex = Array.prototype.indexOf.call(cellButtons, e.target);
        row = Math.floor(cellIndex / 3);
        col = cellIndex % 3;
        GameController.playRound(row, col);
        render();
        GameController.checkWin();
    };
    const playerDialog = function() {
        console.log('Running DisplayController.playerDialog')
        dialog.showModal();
    };
    const render = function() {
        console.log('Running DisplayController.render')
        gameboardFlat = [].concat(...gameboard.gameboard);
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

// console.table(gameboard.gameboard)

GameController.init();
DisplayController.init();

DisplayController.playerDialog();
