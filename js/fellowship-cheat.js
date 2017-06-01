var Fellowship = function(settings) {

	/* Global variables */

	var fellowship = ['gandalf','frodo','samwise'];

	var fellowshipP = [45,46,47];  // fellowship positions

	var fellowshipR = ['boromir','strider','legolas','gimli','merry','pippin']; // remaining fellowship members

	var message = []; // array containing instructions telling dom elements where to go based on index

	var keyHistory = []; // array containing key history

	var cells = document.getElementsByTagName("td"); // enable cell dom elements to be inspected globally

	// var cellIndex = []; // index of cell data-num

	// for (var i = 0; i < cells.length; i++) {
	// 	cellIndex.push(i);
	// }

	/* Interactions: define here so that message array can be populated on init */

   	var interaction = {};
   	interaction.up = false;              // Up arrow key pressed
   	interaction.down = false;            // Down arrow key pressed
   	interaction.left = true;            // Left arrow key pressed
   	interaction.right = false;			// Right arrow key pressed
   	interaction.keyup = false;			// New key released


	/* Check to see if wall has been hit (illegal interaction while in a certain cell) */

	function wallChecker(instruction, num) {
		var wall = [];

		if(instruction.up) {
			wall = [0,1,2,3,4,5,6];
		}
        if(instruction.left) {
          	wall = [0,7,14,21,28,35,42];
        } 
        if(instruction.right) {
        	wall = [6,13,20,27,34,41,48];
        }
        if(instruction.down) {
        	wall = [42,43,44,45,46,47,48];
        }

        return wall.indexOf(num) > -1 ? true : false;      
	}

	/* Check for illegal moves. Up cannot be followed by down and vice-versa; ditto left-right */

	function checkIllegalMove(key1, key2) {
		return (key1.up && key2.down || key1.down && key2.up || key1.right && key2.left || key1.left && key2.right) ? true : false
	}


   	/* Move the fellowship chain by passing a value of instruction and the data-num of the current cell */

    function move(instruction, currentCell) { // interaction key is local in scope

      if(instruction.up){
        return parseInt(currentCell) - 7;
      }

      if(instruction.down){
        return parseInt(currentCell) + 7;
      }

      if(instruction.left){
        return parseInt(currentCell) - 1;
      }

      if(instruction.right){
        return parseInt(currentCell) + 1;
      }

    }

    /* Check which animation to call from Daniel Eden's animate.css */

    function animate(instruction, old) { // interaction key is local in scope

      if(instruction.up){
        return old ? "none" : "slideInUp" //"slideOutUp";
      }

      if(instruction.down){
        return old ? "none" : "slideInDown" // slideOutDown";
      }

      if(instruction.left){
        return old ? "none" : "slideInRight" // "slideOutLeft";
      }

      if(instruction.right){
        return old ? "none" : "slideInLeft" // "slideOutRight";
      }

    }

    /* Switch the faces of old and new data-num; do not couple the switches yet  */

    function switchClass (dataNum, fellowElement, interaction, old) {
    	
    	var cell;
    	
    	// get the cell which needs to be changed

    	cell = cells[dataNum];

    	// for (var i = 0; i < cells.length; i++) { 
    	// 	if (parseInt(cells[i].getAttribute('data-num')) === dataNum) {
    	// 		cell = cells[i];
    	// 	}
    	// }

    	cell.style.animationName = animate(interaction, old); // set animation first
    	// console.log(cell.style.animationName);

    	if (old) { // if old cell, change id to null
    		cell.classList.remove(cell.className); // method to trigger animation
    		cell.classList.add("empty");
    		cell.setAttribute("id","null");
    	}
    	else { // if new cell, change id to the fellowship element
    		cell.classList.remove(cell.className);
    		cell.classList.add("fellowship");
    		cell.setAttribute("id", fellowElement);
    	}	
    	
    }

    /* Function to invoke when key is pressed, rendered per frame */

    function actualizeKey(interactions, frameCounter, proceed) {
    	
    	console.log(frameCounter);


    	if (interactions.keyup) {

    		// push new key to the head of the key history
    		keyHistory.unshift(interactions);

    		// remove new key if illegal move
    		if (checkIllegalMove(keyHistory[0], keyHistory[1])) {
    			keyHistory.shift();
    		}

    		
    		console.log("Key pressed!");

    		interactions.keyup = false;

    	}

    	// update message
    	message.unshift(keyHistory[0]);
    	// message.pop();

    	// console.log("current valid key");
    	// console.log(keyHistory[0]);

    	console.log("message");
    	console.log(message[0], message[1], message[2]);


    	/* apply translation instruction to each fellowship element */

		for (var i = 0; i < fellowship.length; i++) {

			var oldDataNum = document.getElementById(fellowship[i]).getAttribute('data-num');

			if (wallChecker(interactions, parseInt(oldDataNum))) {
				// Hit the wall; stop game
				console.log("Hit wall!");
				proceed = false;
				i += fellowship.length; // exit the loop so that subsequent fellowship members do not execute the next move 

			}
			else {

				// translate each fellowship element according to its position and turn, within the message index
				switchClass(parseInt(oldDataNum), fellowship[i], interactions, true); // old class to turn 

				var newDataNum = move(message[i], parseInt(oldDataNum));

				switchClass(newDataNum, fellowship[i], interactions, false); // new class to turn
			}									

		}
    	
    }

    this.render = function (interactions, frameCounter) {
    	actualizeKey(interactions, frameCounter);
    }

    function init() {
    	// board = document.getElementsByTagName("td");

    	// initialise message
    	for (var i = 0; i < fellowship.length; i++) {
    		message.push(interaction);
    	}

    	// initialise key history
    	keyHistory.push(interaction);
    }

    init();
}

