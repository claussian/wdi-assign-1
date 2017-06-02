 var Game = function() {


   // Game settings
   var settings ={}
   settings.gravity = 3;
   settings.speed = 2;
   settings.wall = true;
   settings.orcs = false;
   settings.disable = false;


   // World
   var frameCounter = 1;
   var assets = [];
   var fellowship = new Fellowship(settings); // create new fellowship object
   assets.push(fellowship);

   var proceed = true;

   // Interactions
   var interactions = {};
   interactions.up = false;              // Up arrow key pressed
   interactions.down = false;            // Down arrow key pressed
   interactions.left = true;            // Left arrow key pressed
   interactions.right = false;           // Right arrow ket pressed
   interactions.keyup = false;           // New key released


   // function spawnOrc() {
   //   assets.push(new Orc(settings));
   // }


   // Setup event listeners
    function setupEvents() {

      document.addEventListener('keyup', function(event){

        interactions.keyup = true;

      });

      document.addEventListener('keydown', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = true;
              interactions.left = false;
              interactions.up = false;
              interactions.down = false;
              interactions.keyup = false;
              break;
          case "ArrowLeft":
              interactions.left = true;
              interactions.right = false;
              interactions.up = false;
              interactions.down = false;
              interactions.keyup = false;
              break;
          case "ArrowUp":
              interactions.up = true;
              interactions.down = false;
              interactions.left = false;
              interactions.right = false;
              interactions.keyup = false;
              break;
          case "ArrowDown":
              interactions.down = true;
              interactions.up = false;
              interactions.left = false;
              interactions.right = false;
              interactions.keyup = false;
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

      // startFellowship(); // fellowship is not supposed to be rendered per cycle
      //console.log("proceed: " + proceed);
      //if (proceed) {
        for(var i = 0; i < assets.length; i++){                             
        assets[i].render(interactions, frameCounter);
        }
      // }
      

      // if(frameCounter % 5 === 0 ){ // spawn orcs generically
       // spawnOrc();
      //}

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

            var framesToSkip = 40;
            var counter = 0;
            
            (function animloop(){
                if (counter < framesToSkip) {
                counter++;
                requestAnimFrame(animloop); // recursive
                return;
                }
                self.render();
                counter = 0;
                requestAnimFrame(animloop);
            })();

            

            

            init();
}

var g = new Game();
// var mp3 = document.getElementById("audio-theme");
// mp3.loop = true;
