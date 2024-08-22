const buttonColours = ['red', 'blue', 'green', 'yellow'];
let level = 0;
let currentTimes = 0;

let soundWrong = new Audio('/src/sounds/wrong.mp3');
let gamePattern = [];
let userClickedPattern = [];

function checkAnswer(colour) {
  if (gamePattern.length === currentTimes + 1) {
    if (gamePattern[currentTimes] === userClickedPattern[currentTimes]) {
      playSound(colour);
      animateColour(colour);
      userClickedPattern = [];
      currentTimes = 0;

      setTimeout(() => {
        nextSequence();
      }, 100)
    } else {
      gameOver();
    }
  } else {
    if (gamePattern[currentTimes] === userClickedPattern[currentTimes]) {
      playSound(colour);
      animateColour(colour);
      currentTimes++;
    } else {
      gameOver();
    }
  }


}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
  randomChosenColours(randomNumber);
  level++;
  upLevel();
}

function animateColour(colour) {
  $(`#${colour}`).addClass('pressed');

  setTimeout(() => {
    $(`#${colour}`).removeClass('pressed');
  }, 100);

}

function randomChosenColours(valueRandom) {
  gamePattern.push(buttonColours[valueRandom]);
  setTimeout(() => {
    animateColour(buttonColours[valueRandom]);
    playSound(buttonColours[valueRandom]);
  }, 500)
}

function userChosenColour(colour) {
  userClickedPattern.push(colour);
  checkAnswer(colour);
}

function playSound(colour) {
  let sound = new Audio(`/src/sounds/${colour}.mp3`);
  sound.play();
}

function gameOver() {
  soundWrong.play();
  $('body').addClass('game-over')
  $('h1').text(`GAMER OVER`);
  $('h2').text(`YOU REACHED LEVEL ${level} `)
  $('p').text('Press A key to play again.');

  setTimeout(() => {
    $('body').removeClass('game-over')
  }, 200);

  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Para un desplazamiento suave
  });

  currentTimes = 0;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}

function upLevel() {
  setTimeout(() => {
    $('h1').text(`Level ${level}`);
  }, 100)

}

$(document).keydown(function (event) {
  if ((event.key === 'a' || event.key === 'A') && level === 0) {
    $('h1').text('');
    $('h2').text('');
    $('p').text('');

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Para un desplazamiento suave
    });
    
    upLevel();
    nextSequence();
  }
});

$('.btn').click(function () {
  if (level >= 1) userChosenColour(this.id);
});