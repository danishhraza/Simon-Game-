var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}


$(document).on("keypress",function(){
  if (gameStarted==false){
    gameStarted=true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    if (gameStarted){
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      level = 0;
      gameStarted = false;
      gamePattern = [];
      userClickedPattern = [];
    }
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
 var randomNumber = Math.floor(Math.random()*3)+1;

 var randomChosenColor = buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);

 $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColor);

}
