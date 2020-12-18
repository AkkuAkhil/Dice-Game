'use strict';

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const scoreOne = document.getElementById('score--0');
const scoreTwo = document.getElementById('score--1');
const currentOne = document.getElementById('current--0');
const currentTwo = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let playing, currentScore, currentPlayer, scores;

const init = function () {
  playing = true;
  currentScore = 0;
  currentPlayer = 0;
  scores = [0, 0];

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;

  dice.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;

  currentPlayer = currentPlayer === 1 ? 0 : 1;

  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};
newButton.addEventListener('click', init);

rollButton.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden');

    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    dice.src = `dice-${randomNumber}.png`;

    if (randomNumber != 1) {
      currentScore += randomNumber;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] > 10) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});
