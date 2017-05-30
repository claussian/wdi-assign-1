var Fellowship = function(settings) {

	var fellowship;
	var coordFirst = {};

    // Move the fellowship chain upon each keystroke
    function move(interactions, fellowElement) {

      if(interactions.up){
      	console.log(fellowElement.style.top);
        fellowElement.style.top = parseInt(fellowElement.style.top) - settings.speed + "px";
        console.log(fellowElement.style.top);
      }

      if(interactions.down){
        fellowElement.style.top = parseInt(fellowElement.style.top) + settings.speed + "px";
      }

      if(interactions.left){
        fellowElement.style.left = parseInt(fellowElement.style.left) - settings.speed + "px";
      }

      if(interactions.right){
        fellowElement.style.left = parseInt(fellowElement.style.left) + settings.speed + "px";
      }

      //if(settings.walls){
      //  wall();
      // }
    }

     // Get Frodo's position (first element of the chain) upon each keystroke

    function getCoordinates (fellowElement) {
    	var fellowRect = fellowElement.getBoundingClientRect();
		coordFirst.top = fellowRect.top;
		coordFirst.left = fellowRect.left;
		return coordFirst;
    }

    // function 
    function actualizeKey (interactions) {
    	if (interactions.up || interactions.down || interactions.left || interactions.right) {
    		for (var i = 0; i < fellowship.length; i++) {
    			if (i === 0) {
    				coordFirst = getCoordinates(fellowship[i]); // store coordinates of first element
    				console.log("Top:" + coordFirst.top + " Left:" + coordFirst.left);
    				move(interactions, fellowship[i]); // immediately invoke move()
    			}
    			else {
    				// subsequent characters in the chain: wait to arrive at first element's position before invoking move()
    				move(interactions,fellowship[i]);
    			}
    		}
    	}
    	// after element has passed a (x,y) coordinate,

    	// swap class to change from inline-block to block

    	// move each element 
    }
    
    // when render is called from game.js [assets], execute these functions recursively in every frame
    this.render = function(interactions) {
    	//for (var i = 0; i < fellowship.length; i++) {
    		// move(interactions, fellowship[0]);
    		// console.log("Prime mover!");
    	//}
    	actualizeKey(interactions);
    }

    // initialize by fetching fellowship dom elements
    function init () {
    	fellowship = document.getElementById('fellowship-board').childNodes; // get array of children of fellowship board
    	console.log(fellowship);
    	for (var i = 0; i < fellowship.length; i++) {
    		fellowship[i].style.top = "200px";
    		fellowship[i].style.left = "200px";
    		console.log("Top:" + fellowship[i].style.top + " Left:" + fellowship[i].style.left);
    	}
    	
    	// console.log(fellowship[0]);
    }

    init();
}