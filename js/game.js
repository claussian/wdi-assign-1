 var Game = function() {


   // Game settings
   var settings ={}
   settings.gravity = 5;

   // World
   var frameCounter = 0;
   var assets = [];
   // var fellowshipChain = 


   function spawnOrc(){
     assets.push(new Orc(settings));
   }

   function startFellowship() {
    //
   }




 // The render function. It will be called 60/sec
    this.render = function (){ //? For each new game
      for(var i=0;i<assets.length;i++){                             
        assets[i].render();
      }

      if(frameCounter%300 === 0 ){
        spawnOrc();
      }

      frameCounter++;
    }

    var self = this;

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
              self.render(); // recursive
            })();
}

var g = new Game();
