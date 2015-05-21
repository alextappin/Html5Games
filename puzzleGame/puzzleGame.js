var DARK_PURPLE = "#400d12";
var DARK_BLUE = "#4fd5d6";
var RED = "#ff0000";
var LIGHT_BLUE = "#cdffff";

var BUTTON_HEIGHT = 140;

$(document).ready(
    function()
{
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    
    var score = 0;
    var problemText = "5 + 3 = 7";
    
    function Initialize()
    {
        DrawMap();
        DrawButtons();
        DrawScore();
        DrawProblem();
    }
    
    function DrawMap()
    {
        context.fillStyle = LIGHT_BLUE;
        context.fillRect(0,0,width,height);
        context.strokeStyle = DARK_BLUE;
        context.strokeRect(0,0,width,height);
    }
    
    function DrawButtons()
    {
        //Button One True text
        context.fillStyle = RED;
        context.fillRect(0, height-BUTTON_HEIGHT, width/2 - 5,BUTTON_HEIGHT);
        context.fillStyle = LIGHT_BLUE;
        context.font = "italic 40pt Calibri";
        context.textAlign = "center";
        context.fillText("True", width/4, height-60);

        //Button two False text
        context.fillStyle = DARK_BLUE;
        context.fillRect(width/2 + 5, height-BUTTON_HEIGHT, width/2,BUTTON_HEIGHT);
        context.fillStyle = LIGHT_BLUE;
        context.font = "italic 40pt Calibri";
        context.textAlign = "center";
        context.fillText("False", width - width/4, height-60);
    }
    
    function DrawScore()
    {
        var scoreText = "Score: " + score;
	    context.font = 'italic 40pt Calibri';
	    context.fillStyle = "black";
	    context.textAlign = "center";
        context.fillText(scoreText,width/2,100);
    }
    
    function DrawProblem()
    {
	    context.font = "italic 40pt Calibri";
	    context.fillStyle = "black";
	    context.textAlign = "center";
        context.fillText(problemText,width/2,height/2 - 20);
    }
    
    Initialize();
})