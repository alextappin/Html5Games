var CELL_WIDTH = 10;
$(document).ready(function(){
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var food;
    var score;
    var direction;
    
    var snakeArray;
    
    function Initialize()
    {
        //default direction
        direction = "right";
        CreateSnake();
        CreateFood();
        score = 0;
        
        //DrawSnake();
        //paints/draws to screen every 60 ms as long as the game_loop!=undefined
        if(typeof game_loop != 'undefined') clearInterval(game_loop);
		game_loop = setInterval(DrawSnake, 60);
    }
    function CreateSnake()
    {
        var snakeLength = 5;
        //empty snake array from the start
        snakeArray = [];
        for(var i = snakeLength-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			//basically pushes the array x but not y since it is horizontal
			snakeArray.push({x: i, y:0});
		}
    }
    
    function CreateFood()
	{
		food = {
			x: Math.round(Math.random()*(width-CELL_WIDTH)/CELL_WIDTH), 
			y: Math.round(Math.random()*(height-CELL_WIDTH)/CELL_WIDTH), 
		};
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	}
	
	function DrawSnake()
	{
	    context.fillStyle = "red";
	    context.fillRect(0,0,width,height);
	    context.strokeStyle = "black";
	    context.strokeRect(0,0,width,height);
	    
	    var nextX = snakeArray[0].x;
		var nextY = snakeArray[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(direction == "right") nextX++;
		else if(direction == "left") nextX--;
		else if(direction == "up") nextY--;
		else if(direction == "down") nextY++;
		
		if(nextX == -1 || nextX == width/CELL_WIDTH || nextY == -1 || nextY == height/CELL_WIDTH || CheckCollision(nextX, nextY, snakeArray))
		{
			//restart game
			Initialize();
			//Lets organize the code a bit now.
			return;
		}
		if(nextX == food.x && nextY == food.y)
		{
			var tail = {x: nextX, y: nextY};
			score++;
			//Create new food
			CreateFood();
		}
		else
		{
			var tail = snakeArray.pop(); //pops out the last cell
			tail.x = nextX; tail.y = nextY;
		}
		//The snake can now eat the food.
		
		snakeArray.unshift(tail); //puts back the tail as the first cell
		
		for(var i = 0; i < snakeArray.length; i++)
		{
			var c = snakeArray[i];
			//Lets paint 10px wide cells
			PaintCell(c.x, c.y);
		}
		
		//Lets paint the food
		PaintCell(food.x, food.y);
		//Lets paint the score
		var scoreText = "Score: " + score;
		context.fillText(scoreText, 5, height-5);
	}
	
	function PaintCell(x, y)
	{
	    context.fillStyle = "blue";
	    context.fillRect(x*CELL_WIDTH, y*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
	    context.strokeStyle = "white";
	    context.strokeRect(x*CELL_WIDTH, y*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
	}
	function CheckCollision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
		//The snake is now keyboard controllable
	})
	
	
	
	Initialize();
})