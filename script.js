'use strict';

// Buttons
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

// Dice Image
const diceElement = document.querySelector('.dice');

// Score Elements
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

// Initialize variables
let scores, currentScore, activePlayer, playing;

// Initialize the game with certain conditions
const initGame = function () {
  // Hide dice at beginning
  diceElement.classList.add('hidden');

  // Total score for both players
  scores = [0, 0];

  // Storing state of game
  playing = true;

  // Current score
  currentScore = 0;

  // Active Players: 0 or 1
  activePlayer = 0;

  // Removing the winner class from active player
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');

  // Adding the active class to player 0 and removing from player 1
  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--active');

  // Resetting the actual scores
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;

    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
  }
};

// Initialize the game
initGame();

// Switching the players
const switchPlayer = function () {
  // Update the score to 0 again
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Changing the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

// Rolling dice function
const diceRolled = function () {
  console.log('Dice Rolled!');
  if (playing) {
    // Generating a random number between 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceElement.classList.remove('hidden');

    // Display dice image
    diceElement.src = `dice-${dice}.png`;

    // Check if rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;

      // Update the score in view
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to another player
      switchPlayer();
    }
  }
};

const holdScore = function () {
  console.log('Score hold!');
  if (playing) {
    // Add current score to the actual scores
    scores[activePlayer] += currentScore;

    // Update the scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is greater that 100 so that we declare winner
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      // Remove the dice image
      diceElement.classList.add('hidden');

      // Display winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch Player
      switchPlayer();
    }
  }
};

// Starting new game again
const startNewGame = function () {
  console.log('New game started!');
  initGame();
};

// Click events for buttons
rollDice.addEventListener('click', diceRolled);
hold.addEventListener('click', holdScore);
newGame.addEventListener('click', startNewGame);
