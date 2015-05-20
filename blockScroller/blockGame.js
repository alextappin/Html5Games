var CHARACTER_XY = 38;
var OBSTACLE_XY = 20;

$(document).ready(
    function()
{
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var characterXPos = 200;
    var characterYPos = 416;
    var obstacleXPos = width;
    var obstacleYPos = 434;
    //0 for false
    var jumping = 0;
    var jumpingCounter = 0;
    var resets = 0;
    var score = 0;
    
    function Initialize()
    {
        DrawMap();
        DrawCharacter();
        CreateObstacle();
        
        if(typeof game_loop != 'undefined') clearInterval(game_loop);
		game_loop = setInterval(UpdateMap, 10);
    }
    
    function DrawMap()
    {
        context.fillStyle = "#8CFFF4";
        context.fillRect(0,0,width,height);
        context.strokeStyle = "white";
	    context.strokeRect(0,0,width,height);
	    
	    context.fillStyle = "#3D91FF";
	    context.fillRect(0, height/1.1, width, 10);
	    
	    var scoreText = "Score: " + score;
	    context.font = 'italic 40pt Calibri';
		context.fillText(scoreText, width/2.6, height/2);
	    
    }
    function DrawCatcher()
    {   
        context.fillStyle = "#111111";
	    context.fillRect(0, height/1.2, CHARACTER_XY, 38);
	    context.fillStyle = "#111111";
	    context.fillRect(width-38, height/1.2, CHARACTER_XY, 38);
    }
    function DrawCharacter()
    {
        context.fillStyle = "#3DFF87";
        context.fillRect(characterXPos, characterYPos, CHARACTER_XY,CHARACTER_XY);
    }
    
    function CreateObstacle()
    { 
        ResetAfterCatcher();
        //position will update every time it is called. Get faster after every catch
        obstacleXPos -= 4 + resets;
        context.fillStyle = "#FF3D6A";
        context.fillRect(obstacleXPos, obstacleYPos, OBSTACLE_XY, OBSTACLE_XY);
    }
    
    function ResetAfterCatcher()
    {
        if (obstacleXPos < 1)
        {
            score++;
            obstacleXPos = width;
            if (resets < 5)
                resets+=.5;
        }
    }
    
    function ColisionWithCharacter()
    {
        //if obstacle is under it and if obstacle is hitting it. if obstacle has a Y hitting it
        if((obstacleXPos <= (characterXPos+CHARACTER_XY) && (obstacleXPos+OBSTACLE_XY) > characterXPos) && (obstacleYPos - OBSTACLE_XY) <= characterYPos)
        {
            obstacleXPos = width;
            resets = 0;
            score = 0;
        }
    }
    
    function UpdateMap()
    {
        DrawMap();
        CreateObstacle();
        Jumping();
        ColisionWithCharacter();
        DrawCharacter();
        DrawCatcher();

    }
    //jumping animation function
    function Jumping()
    {
        if(jumping == 1)
        {
            if (jumpingCounter >= 40)
            {
                jumping = 0;
                jumpingCounter = 0;
            }
            else if (jumpingCounter < 20)
            {
                if (jumpingCounter < 17)
                    characterYPos -= 3;
                else
                    characterYPos -= 1;
                jumpingCounter += 1;
            }
            else
            {
                if (jumpingCounter <= 37)
                    characterYPos += 3;
                jumpingCounter += 1;
            }
        }
    }
    
    $(document).keydown(function(e){
		var key = e.which;
		//if they push the space and it is not already jumping
		if (key == "32"){
		    jumping = 1;
		}
	})
    
    Initialize();
})