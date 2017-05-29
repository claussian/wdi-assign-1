 var Game = function() {

 // The render function. It will be called 60/sec
    function render(){ //? For each new game 
    }

    var orc = new Orc();
    var counter = 0;

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
              console.log(counter++);
            })();

            
}

var g = new Game();