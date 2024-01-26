var colours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function(){
if(!started){
    $("#level-title").text("level " + level);
    gameSequence();
    started = true;
}
});
$(".btn").on("click", function(){
    var selectedColour = $(this).attr("id");
    userClickedPattern.push(selectedColour);
    playSound(selectedColour);
    animatePress(selectedColour);
    checkAnswer(userClickedPattern.length-1);
 })
 function playSound(name){
    var a1 = new Audio("sounds/" + name + ".mp3");
    a1.play();
 }
 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
         console.log("success");
         if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                gameSequence()
            },1000);
         }
    }else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    } 

 }
 function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
 }
function gameSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = colours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(300);
    playSound(randomChosenColour); 
   
}
function animatePress(name){
$("#"+name).addClass("pressed");
setTimeout(function(){
    $("#"+name).removeClass("pressed");
}, 100);
}
