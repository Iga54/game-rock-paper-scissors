const game = {
  userChoice: '',
  aiChoice: '',
};

const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const handImages = [...document.querySelectorAll('.select img')];

function userSelection(e) {
  game.userChoice = this.dataset.option;
  handImages.forEach((handImage) => (handImage.style.boxShadow = ''));
  this.style.boxShadow = '0 0 0 4px red';
}
handImages.forEach((handImage) => handImage.addEventListener('click', userSelection));

function aiSelection() {
  return handImages[Math.floor(Math.random() * 3)].dataset.option;
}
function checkResult(user, ai) {
  if (user === ai) {
    return 'draw';
  } else if (
    (user === 'rock' && ai === 'scissors') ||
    (user === 'paper' && ai === 'rock') ||
    (user === 'scissors' && ai === 'paper')
  ) {
    return 'win';
  } else {
    return 'loss';
  }
}

function showResult(user, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = user;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
  if (result === 'win') {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="winner"]').textContent = 'You won with ai!';
    document.querySelector('[data-summary="winner"]').style.color = 'green';
  } else if (result === 'loss') {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="winner"]').textContent = 'Ai won!';
    document.querySelector('[data-summary="winner"]').style.color = 'red';
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="winner"]').textContent = "It's a draw!";
    document.querySelector('[data-summary="winner"]').style.color = 'navy';
  }
}

function finishGame() {
  document.querySelector(`[data-option = "${game.userChoice}"]`).style.boxShadow = '';
  game.userChoice = '';
  game.aiChoice = '';
}

function startGame() {
  if (game.userChoice === '') return alert('Choose option!');
  game.aiChoice = aiSelection();
  const gameResult = checkResult(game.userChoice, game.aiChoice);
  showResult(game.userChoice, game.aiChoice, gameResult);
  finishGame();
}

document.querySelector('.start').addEventListener('click', startGame);
