var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;

var level = 0;
$(document).keypress(function(event){
   
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

     
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    $("body").addClass("game-over");

    $("#level-title").text("Game Over Press a Key to Restart")

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    setTimeout(function(){
      $("body").removeClass('game-over');
      //....and whatever else you need to do
     }, 200);
    
     startOver();
    console.log("fail")
  }
}


function nextSequence(){
  userClickedPattern = [];

  level += 1;
 
   $("#level-title").text("Level " + level);
 
   var randomvariable =  Math.floor(Math.random()*4);
   var randomChosenColour = buttonColors[randomvariable]; 
   gamePattern.push(randomChosenColour);
   
   
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   
 }
 
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass('pressed');
    //....and whatever else you need to do
}, 100);
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

