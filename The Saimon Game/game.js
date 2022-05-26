var gamePattern = []
var userClickedPattern = []

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var startGame = false;

$(document).keydown(function (event) {
    if (startGame == false) {
        nextSequence();
        $("#level-title").text("Level " + level)
        startGame = true;
    }
})



$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push("#" + userChosenColour)
    //console.log(userClickedPattern)
    playSound("#" + userChosenColour);
    animatePress("#" + userChosenColour);
    checkAnswer(userClickedPattern.length);
})


function checkAnswer(level) {
    if (gamePattern[level - 1] == userClickedPattern[level - 1]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)

        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        })
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = "#" + buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $(randomChosenColour).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);
}

function playSound(name) {
    switch (name) {
        case "#green":
            var audioGreen = new Audio("sounds/green.mp3");
            audioGreen.play();
            break;
        case "#red":
            var audioRed = new Audio("sounds/red.mp3");
            audioRed.play();
            break;
        case "#yellow":
            var audioYellow = new Audio("sounds/yellow.mp3");
            audioYellow.play();
            break;
        case "#blue":
            var audioBlue = new Audio("sounds/blue.mp3");
            audioBlue.play();
            break;
        case "wrong":
            var audioBlue = new Audio("sounds/wrong.mp3");
            audioBlue.play();
            break;
        default:
            console.log(name);
    }
}



function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function () {
        $(currentColour).removeClass("pressed");
    }, 100)


}

function startOver() {
    startGame = false;
    gamePattern = []
    level = 0;
}