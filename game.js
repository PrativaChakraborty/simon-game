// arrays

var gamePattern = [];
var counter = 0;
var level = 1;
var comments = ["Good", "Great", "Impressive", "Nice", "Execellent"];
var buttonColours = ["red", "blue", "green", "yellow"];
$(".btn").on("click", (e) => handlerfunction(e));
$(document).on("keydown", () => begin());
function begin() {
  $("#level-title").text("Level " + level);
  removeHints();
  nextSequence();
}
function reset() {
  gamePattern = [];
  counter = 0;
  level = 1;
  $("#level-title").text("Game Over. Press any key to restart");
}
// Random colour
function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function handlerfunction(e) {
  console.log("tap");
  var tappedColor = $(e.currentTarget).attr("id");
  if (tappedColor == gamePattern[counter]) {
    addhint(tappedColor);
    animationCorrectPress(e.currentTarget);
    counter++;
    if (counter == level) {
      level++;
      counter = 0;
      var randomNumber = Math.floor(Math.random() * comments.length);
      $("#level-title").text(comments[randomNumber]);
      setTimeout(() => begin(), 800);
    }
  } else {
    removeHints();
    animationWrongPress();
    reset();
  }
}
function addhint(tappedColor) {
  $(".footer").append('<div class="btn2 ' + tappedColor + '" ></div>');
}
function removeHints() {
  $(".footer").html("");
}
function animationCorrectPress(element) {
  var tappedColor = $(element).attr("id");
  var audio = new Audio("sounds/" + tappedColor + ".mp3");
  audio.play();
  $(element)
    .addClass("pressed")
    .delay(100)
    .queue(function (next) {
      $(this).removeClass("pressed");
      next();
    });
}
function animationWrongPress() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body")
    .addClass("game-over")
    .delay(100)
    .queue(function (next) {
      $(this).removeClass("game-over");
      next();
    });
}

// $(document).ready();
// function ready(){
//     setInterval(() => {
//         $("#"+randomChosenColour).fadeIn();
//         $("#"+randomChosenColour).fadeOut();
//     }, 500);
//  };
