 var Game = function() {


   // Game settings
   var settings ={}
   settings.gravity = 5;

   // World
   var frameCounter = 0;
   var assets = [];


   function spawnOrc(){
     assets.push(new Orc(settings));
   }


 // The render function. It will be called 60/sec
    function render(){ //? For each new game
      for(var i=0;i<assets.length;i++){
        assets[i].render();
      }

      if(frameCounter%300 === 0 ){
        spawnOrc();
      }

      frameCounter++;
    }

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
            })();


            (function animloop(){
              requestAnimFrame(animloop);
              render(); // recursive
            })();
}

var g = new Game();
