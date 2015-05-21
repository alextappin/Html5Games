var character1X = 15;
var character2X = 185;
var character3X = 350;
var character4X = 515;
var character5X = 680;
var character6X = 845;
var characterY = 10;

$(document).ready(
    function()
{
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    
    var imageCounter = 0;
    
    //Background Image Stuff
    var backImage = new Image();
    backImage.src = 'gumballSeedsBackgroundSmall.PNG';
    var characterImage = new Image();
    characterImage.src = 'LastFinalSprite.png';
    
    backImage.onload = function()
    {
       context.drawImage(backImage,0,0, width, height);
        //where in the picture to draw, how much to draw, where to place it, how big to blow it up
       context.drawImage(characterImage,character1X,characterY,140,130,200,340,100,100);
    };
    
    function DrawBackground() 
    {
        context.drawImage(backImage,0,0, width, height);
    }
  
    function Initialize()
    {
        DrawBackground();
        CharacterAnimation();
        
        if(typeof game_loop != 'undefined') clearInterval(game_loop);
		game_loop = setInterval(UpdateMap, 120);
    }
    
    function CharacterAnimation()
    {
        switch (imageCounter) {
            case 1: context.drawImage(characterImage,character1X,characterY,140,130,200,340,100,100);
                break;
            case 2: context.drawImage(characterImage,character2X,characterY,140,130,200,340,100,100);
                break;
            case 3: context.drawImage(characterImage,character3X,characterY,140,130,200,340,100,100);
                break;
            case 4: context.drawImage(characterImage,character4X,characterY,140,130,200,340,100,100);
                break;
            case 5: context.drawImage(characterImage,character5X,characterY,140,130,200,340,100,100);
                break;
            case 6: context.drawImage(characterImage,character6X,characterY,140,130,200,340,100,100);
                break;
            default:
                imageCounter = 2;
                context.drawImage(characterImage,character1X,characterY,140,130,200,340,100,100);
                break;
        }
        
        imageCounter++;
    }
    
    function UpdateMap()
    {
        DrawBackground();
        CharacterAnimation();
    }
    
    Initialize();
});