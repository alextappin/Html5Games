
$(document).ready(
    function()
{
    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    
    //Background Image Stuff
    var backImage = new Image();
    backImage.src = 'gumballSeedsBackgroundSmall.PNG';
    backImage.onload = function(){
       context.drawImage(backImage,0,0, width, height);
   };
    
    function drawPattern() 
    {
        context.fillStyle = context.createPattern(backImage, "repeat");
        context.fillRect(0, 0, width, height);
    }
  
    function Initialize()
    {
        drawPattern();
    }
    
    function DrawMap()
    {
        context.fillStyle = "#8CFFF4";
        context.fillRect(0,0,width,height);
        context.strokeStyle = "white";
	    context.strokeRect(0,0,width,height);
    }
    //Initialize();
});