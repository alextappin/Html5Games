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
    var highScore = 0;
    var problemText = "5 + 3 = 7";
    var problemNumbers = 2;
    var correct = 0;
    //1 will be true, 0 will be false
    var clicked = -1;
    
    function Initialize()
    {
        DrawMap();
        DrawButtons();
        DrawScore();
        CreateProblem();
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
        //high score logic
        if(score >= highScore)
        {
            highScore = score;
        }
        
        var scoreText = "Score: " + score;
	    context.font = 'italic 40pt Calibri';
	    context.fillStyle = "black";
	    context.textAlign = "center";
        context.fillText(scoreText,width/2,100);
        
        scoreText = "HighScore: " + highScore;
        context.font = 'italic 14pt Calibri';
	    context.fillStyle = "black";
	    context.textAlign = "center";
        context.fillText(scoreText,50,30);
    }
    
    function DrawProblem()
    {
	    context.font = "italic 40pt Calibri";
	    context.fillStyle = "black";
	    context.textAlign = "center";
        context.fillText(problemText,width/2,height/2 - 20);
    }
    
    function CreateProblem()
    {
        //get an array of random numbers to use in the problem
        var randomNumberArray = [];
        var randomSignsArray = [];
        var i = problemNumbers;
        //Need to generate the numbers to use in the problem
        for (i = 0; i < problemNumbers; i++)
            randomNumberArray[i] = Math.floor((Math.random() * 10) + 1);
        //Need to generate the signs to use in the problem. will be the numbers-1  
        for (i = 0; i < problemNumbers - 1; i++)
        {
            //decide which sign to use based on the random number given
            switch (Math.floor((Math.random() * 4) + 1)) 
            {
                case 1: randomSignsArray[i] = "+";
                    break;
                case 2: randomSignsArray[i] = "-"; 
                    break;
                case 3: randomSignsArray[i] = "*";
                    break;
                case 4: randomSignsArray[i] = "/";
                    break;
                default:
                    break;
            }
        }
        //concat the problem with random generated
        problemText = randomNumberArray[0].toString() + randomSignsArray[0].toString() + randomNumberArray[1].toString();
        //decide whether to make it a true or false 
        if ((Math.floor((Math.random() * 2) + 1)) == 1)
        {
            //skew the results!
            //fixed the decimal place if it is a divide problem
            if(randomSignsArray[0] != "/")
                problemText += "=" + eval((randomNumberArray[0]+2).toString() + randomSignsArray[0].toString() + (randomNumberArray[1] + 1).toString()).toString();
            else
                problemText += "=" + eval((randomNumberArray[0]+2).toString() + randomSignsArray[0].toString() + (randomNumberArray[1] + 1).toString()).toFixed(2).toString();
            //false, it is not correct!
            correct = 0;
        }
        else
        {
            //Give true answer
            //fixed the decimal place if it is a divide problem
            if(randomSignsArray[0] != "/")
                problemText += "=" + eval(problemText).toString();
            else
                problemText += "=" + (eval(problemText).toFixed(2)).toString();
            //true! it is correct
            correct = 1;
        }
    }
    
    //check which button the user clicks!
    canvas.addEventListener("mousedown", getPosition, false);
    function getPosition(event)
    {
        var x = event.x;
        var y = event.y;

        var canvas = document.getElementById("canvas");

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        //if they click true
        if(x < width/2 && y > height - height/4)
            clicked = 1;
        //if they click false
        else if(x > width/2 && y > height - height/4)
            clicked = 0;
        //if they didnt click either
        else
            clicked = -1;
        //Evaluate their click!
        EvaluateClick();
    }
    
    function EvaluateClick()
    {
        //if what they clicked is the correct answer and they clicked a button 
        if(clicked == correct && clicked != -1)
        {
            score++;
            UpdateGame();
            clicked = -1;
        }
        else if(clicked != -1)
        {
            if(score < 3)
                score = 0;
            else
                score -= 2;
            UpdateGame();
            clicked = -1;
        }
    }
    
    function UpdateGame()
    {
        DrawMap();
        DrawButtons();
        DrawScore();
        CreateProblem();
        DrawProblem();
    }
    
    Initialize();
});