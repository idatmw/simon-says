var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var wrongSound = new Audio("sounds/wrong.mp3");

var harray = [
  "You're amazing!!",
  "Look at you go!!",
  "You're on a streak!!",
  "Keep it up!",
  "Hoorray!",
  "Who's the best? That's right, you are!",
];

$(document).keypress(function () {
  if (!started) {
    started = true;
    startSequence();
  }
});

function startSequence() {
  level += 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  playSound(randomColour);
  animatePress(randomColour);
}

function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  replayPattern();
}

function restart() {
  level = 0;
  $("h1").text("Press A Key to Start");
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (userClickedPattern.length > gamePattern.length) {
    restart();
    return;
  }
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
      checks();
    }, 500);
  }
});

function checks() {
  if (gamePattern.length === userClickedPattern.length) {
    if (checkPatterns(gamePattern, userClickedPattern)) {
      var randomHooray = Math.floor(Math.random() * 6);
      alert(harray[randomHooray]);
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 500);
    } else {
      wrongSound.play();
      alert("You got it wrong. Press any Key to Restart");
      restart();
    }
  }
}

function checkPatterns(game, user) {
  return (
    Array.isArray(game) &&
    Array.isArray(user) &&
    game.length === user.length &&
    game.every((val, index) => val === user[index])
  );
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function replayPattern() {
  let i = 0;
  function outputItem() {
    if (i >= gamePattern.length) {
      return;
    }
    console.log("Game pattern:" + gamePattern[i]);
    animatePress(gamePattern[i]);
    playSound(gamePattern[i]);
    i++;
    setTimeout(outputItem, 800);
  }
  outputItem();
}
