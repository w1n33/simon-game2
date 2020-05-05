var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = new Boolean(true);
var level = 0;
var currentGame = [];


//listens for first key being pressed
$("#start").click(function(event) {
  if (started == true) {
    $("#start").fadeOut();
    return nextSequence();
  }
})

//listens for keyboard button push passes it on to playsound() and animatePress()
$(".btn").click(function() {
  var buttonClicked = $(this).attr("id");
  userClickedPattern.push(buttonClicked);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("well done");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    loser();

    function loser() {
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);
    }
    new Audio("sounds/wrong.mp3").play();
    $("#level-title").text("Take the L loser!").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
      $("#level-title").text("Try again? or are you 🐓");
      $("#start").fadeIn();
    }, 1000);



    startOver();
  }
}

//selects a random button
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //flashes chosen button and passes it to playsound()
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //changes title text and shows level
  $("#level-title").text("Level " + level);
  level++;
  started = false;
  playSound(randomChosenColor);
}



//checks button color and plays correct sound
function playSound(name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      console.log();
  }
  //A more concise way of doing the same

  // var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  //   audio.play();
  // }return animatePress(name);
}

//gets type of button flash for clicked button from css and applies
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = true;
  level = 0;
}
