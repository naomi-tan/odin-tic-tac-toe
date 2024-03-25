// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

// Module pattern
const Gameboard = (function() { // Store gameboard state
    const gameboard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']];
    return {gameboard};
})(); // IIFE

// Factory pattern
function createPlayer (name, marker) { // Store player
    const name = name;
    const marker = marker;
    return {name, marker};
}

// Module pattern
const game = (function() { // Game functions
    const turn = 0;
})(); // IIFE