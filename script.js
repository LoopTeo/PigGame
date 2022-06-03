'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/*

// For your version to work (restart button) you have to uncomment this block of code and comment the teacher block

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0]; // This scores are the big ones not the current score.The acumulating ones
let currentScore = 0;
let activePlayer = 0;
let playing = true;

*/

// Teacher version of implementing restart button functionality

// let scores;
// let currentScore;
// let activePlayer;
// let playing;

// Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // We have to call the function in order to make the variables and the inside block code work

// Switch player function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/*
// My solution to make the restart button work

const restart = function () {
  // Resetting the scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  //Removing the Winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // Adding active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  // Hiding the dice
  diceEl.classList.add('hidden');
  // Setting the game to true again.
  playing = true;
};

*/

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // displaying the dice dynamicly creating the name with template literals
    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // building the id name dynamicly

      // current0El.textContent = currentScore; // change later because here is just setting the score just for player 1
    } else {
      //Switch to next player
      switchPlayer();
      //We moved this code to an individual function. like this we can reuse it everytime we need whitout repeating the code.
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

// Hold button functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player´s score
    scores[activePlayer] += currentScore; //Exemple: scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player´s score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

/*

// My solution to make the restart button work
btnNew.addEventListener('click', restart);

*/

// Teacher version of implementing restart button functionality

btnNew.addEventListener('click', init);
