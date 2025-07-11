var button=["red","green","blue","yellow"];
var gamePattern=[];
var userPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextseq();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userPattern.push(userChosenColour);

    playsound(userChosenColour);
    animatepressed(userChosenColour);

    checkanswer(userPattern.length-1);
});

function checkanswer(currentLevel){
    if (gamePattern[currentLevel]===userPattern[currentLevel]){
        
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextseq();
            },1000);
        }
    }
    else{
        
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over,press any key to restart");
        startover()
        
    }
}


function nextseq(){
    userPattern=[];
    level++;
    $("#level-title").text("level"+level);
    var random=Math.floor(Math.random()*4);
    var randomChoosenColour=button[random];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChoosenColour)
}
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatepressed(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed")
    },100);

}

function startover(){
    level=0;
    started=false;
    gamePattern=[]
}
