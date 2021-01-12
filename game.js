//-----> this is a reference to the html DOM element that is the source of the event.
//-----> $(this) is a jQuery wrapper around that element that enables usage of jQuery methods.

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];

var started = false;
var level = 0;


//El juego comienza con la primer tecla tocada pero no comienza de nuevo para otras teclas que se toquen
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//La funcion que crea la sequencia del juego a seguir
function nextSequence() {

  userChosenPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  var n = Math.floor(randomNumber * 4);

  var randomChosenColour = buttonColours[n];

  gamePattern.push(randomChosenColour);
  var chosenButton = $("#" + randomChosenColour);
  chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);
  console.log(gamePattern);

  makeSound(randomChosenColour);

}

//Cuando el jugador cliquea los botones
$(".btn").click(function() {

  var userChosenColor = ($(this).attr("id"));
  userChosenPattern.push(userChosenColor);

  makeSound(userChosenColor);
  animatePress(userChosenColor);

  console.log(userChosenPattern);
  checkAnswer(userChosenPattern.length - 1);

});

//Comparacion de los patrones del juego y del jugador
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    console.log("Success");
    if (userChosenPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    
    console.log("Wrong");
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}

//Funcion que reinicia mis valores para comenzar de nuevo
function startOver() {

  level = 0;
  started = false;
  gamePattern = [];
}

//Funciones de sonido y animacion
function animatePress(colour) {

  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed")}, 100);
}

function makeSound(colour) {

  var sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();
}
