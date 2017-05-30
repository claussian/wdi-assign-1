 var Game = function() {


   // Game settings
   var settings ={}
   settings.gravity = 3;
   settings.speed = 2;

   // World
   var frameCounter = 0;
   var assets = [];
   var fellowship = new Fellowship(settings); // create new fellowship object
   assets.push(fellowship);

   // Interactions
   var interactions = {};
   interactions.up = false;              // Up arrow key pressed
   interactions.down = false;            // Down arrow key pressed
   interactions.left = true;            // Left arrow key pressed
   interactions.right = false;           // Right arrow ket pressed
   interactions.keychange = false;                // New key pressed


   function spawnOrc(){
     assets.push(new Orc(settings));
   }

   function startFellowship() {
    //
   }

   // Setup event listeners
    function setupEvents() {

      document.addEventListener('keyup', function(event){
        var keyName = event.key;

        interactions.keychange = true;
        // switch(keyName) {
        //   case "ArrowRight":
        //       interactions.right = false;
        //       break;
        //   case "ArrowLeft":
        //       interactions.left = false;
        //       break;
        //   case "ArrowUp":
        //       interactions.up = false;
        //       break;
        //   case "ArrowDown":
        //       interactions.down = false;
        //       break;
        //   default:
        //       break;
        //}
      });

      document.addEventListener('keydown', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = true;
              interactions.left = false;
              interactions.up = false;
              interactions.down = false;
              interactions.keychange = false;
              break;
          case "ArrowLeft":
              interactions.left = true;
              interactions.right = false;
              interactions.up = false;
              interactions.down = false;
              interactions.keychange = false;
              break;
          case "ArrowUp":
              interactions.up = true;
              interactions.down = false;
              interactions.left = false;
              interactions.right = false;
              interactions.keychange = false;
              break;
          case "ArrowDown":
              interactions.down = true;
              interactions.up = false;
              interactions.left = false;
              interactions.right = false;
              interactions.keychange = false;
              break;
          default:
              break;
        }
      });
    }

    function init() {
      setupEvents();
    }


 // The render function. It will be called 60/sec
    this.render = function (){ //? For each new game
      for(var i=0;i<assets.length;i++){                             
        assets[i].render(interactions, frameCounter);
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
                window.setTimeout(callback, 1000 / 1);
              };
            })();


            (function animloop(){
              requestAnimFrame(animloop);
              self.render(); // recursive
            })();

            init();
}

var g = new Game();
