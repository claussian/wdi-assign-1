var Fellowship = function(settings) {

	/* Global variables */

	var fellowship = ['gandalf','frodo','samwise'];

	// var fellowshipP = [45,46,47];  // fellowship positions

	var fellowshipR = ['boromir','strider','legolas','gimli','merry','pippin']; // remaining fellowship members

	var fellowshipNew = []; // newly spawned fellowship members, move if uncollided

	var newFellowCounter = {}; // skip a frame for newly spawned members

	var message = []; // array containing instructions telling dom elements where to go based on index

	var keyHistory = []; // array containing key history

	var cells = document.getElementsByTagName("td"); // enable cell dom elements to be inspected globally


	/* Interactions: define here so that message array can be populated on init */

   	var interaction = {};
   	interaction.up = false;              // Up arrow key pressed
   	interaction.down = false;            // Down arrow key pressed
   	interaction.left = true;            // Left arrow key pressed
   	interaction.right = false;			// Right arrow key pressed
   	interaction.keyup = false;			// New key released

   	var down; // instruction for newly spawned members


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

	/* Spawn new fellowship members randomly */

	function spawnFellowship() {

		var newFellow = fellowshipR[Math.floor(Math.random() * fellowshipR.length)]; // get new fellowship member
		var empty = document.getElementsByClassName("empty"); // get list of empty cells
		var randomEmptyCell = empty[Math.floor(Math.random() * empty.length)]; // choose a random cell

		// Change cell class and slideInDown
		randomEmptyCell.classList.remove("empty"); // remove and add method to trigger animation
    	randomEmptyCell.classList.add("fellowship");
    	randomEmptyCell.classList.add("new");
    	randomEmptyCell.setAttribute("id", newFellow);

    	randomEmptyCell.style.animationName = "bounceInDown";

    	// temporarily remove member and add to New array
    	fellowshipNew.push(fellowshipR.splice(fellowshipR.indexOf(newFellow),1)[0]);

    	// add counter to fellowship object
    	newFellowCounter[newFellow] = 0;

    	console.log("spawned " + newFellow);

	}

	/* Remove newly spawned fellowship member */
	function removeFellowship(member) {

		// get fellowship member to remove
		var targetCell = document.getElementById(member); // get list of empty cells
		//console.log(targetCell);

		removeAllClasses(targetCell);
     	targetCell.classList.add("empty");
     	targetCell.removeAttribute("id");

     	targetCell.style.animationName = "fadeOut";

	}

	/* Choose one of the fellowship members to remove randomly */

	function randomRemoveFellowship () {
		var removeThisGuy = fellowshipNew[Math.floor(Math.random() * fellowshipNew.length)];
		fellowship.push(fellowshipNew.splice(fellowshipNew.indexOf(removeThisGuy),1)[0]);
		removeFellowship(removeThisGuy);
	}

	/* De-class object completely */

	function removeAllClasses(cell) {
		classEnum = ['new','fellowship','empty'];

		for (var i = 0; i < classEnum.length; i++) {
			if(cell.classList.contains(classEnum[i])) {
				cell.classList.remove(classEnum[i]);
			}
		}

	}

	/* Detect collision */

	function headOnCollision(newDataNum) {
		var match = 0;
		var targetCell_1 = cells[newDataNum];
		//console.log("new cell", targetCell_1)
		var targetCell_2 = document.getElementsByClassName("new");
		//console.log("snakehead cell", targetCell_2);

		for (var i = 0; i < targetCell_2.length; i++) {
			if (parseInt(targetCell_2[i].getAttribute('data-num')) == parseInt(targetCell_1.getAttribute('data-num'))) {
				match++;
			}
		}
		
		return match;
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

    function switchClass (dataNum, fellowElement, interaction, old, move) {
    	
    	var cell;
    	
    	// get the cell which needs to be changed

    	cell = cells[dataNum];
    	
    	// console.log(cell.style.animationName);

    	if (old) { // if old cell, change id to null
    		removeAllClasses(cell);						// method to trigger animation 
    		cell.classList.add("empty");
    		cell.removeAttribute("id");
    	}
    	else { // if new cell, change id to the fellowship element
    		removeAllClasses(cell);
    		cell.classList.add("fellowship");
    		cell.setAttribute("id", fellowElement);
    	}

    	cell.style.animationName = animate(interaction, old);  // set animation after
    	
    }

    /* Function to invoke every cycle or when key is pressed, rendered per frame */

    function actualizeKey(interactions, frameCounter, fellowIndex) {
    	
    	console.log(frameCounter);

    	/*********************/
    	/* Spawn new members */
    	/*********************/

    	if (frameCounter % 7 == 0 && fellowshipR.length > 0) { // fellowship member takes maximum 7 seconds to move down the grid
    		spawnFellowship();
    	}

    	/**********************************************/
    	/* Remove new members sporadically if uncaught*/
    	/**********************************************/

    	if (frameCounter % 13 == 0 && fellowshipNew.length > 0) {
    		randomRemoveFellowship(); 
    	}


    	/**********************/
    	/* Update key history */
    	/**********************/

    	if (interactions.keyup) {

    		// CLONE interaction to get a new object

    		var clone = JSON.parse(JSON.stringify(interactions));

    		// push new key to the head of the key history
    		keyHistory.unshift(clone);

    		// remove new key if illegal move
    		if (checkIllegalMove(keyHistory[0], keyHistory[1])) {
    			keyHistory.shift();
    		}
  		
    		console.log("Key pressed!");

    		interactions.keyup = false;

    	}

    	/******************/
    	/* update message */
    	/******************/

    	message.unshift(keyHistory[0]);
    	message.pop();

    	// console.log("current valid key");
    	// console.log(keyHistory[0]);

    	// console.log("message");
    	// console.log(message[0], message[1], message[2]);

    	/************************************************************/
    	/* Apply translation instruction to each fellowship element */
    	/************************************************************/

		for (var i = 0; i < fellowship.length; i++) {

			var oldDataNum = document.getElementById(fellowship[i]).getAttribute('data-num');

			/******************/
			/* Check for wall */
			/******************/

			if (wallChecker(message[0], parseInt(oldDataNum))) { // Hit the wall; stop game
				
				console.log("Hit wall!");
				// proceed = false;
				i += fellowship.length; // exit the loop so that subsequent fellowship members do not execute the next move 

			}

			else {
				// translate each fellowship element according to its position and turn, within the message index

				var newDataNum = move(message[i], parseInt(oldDataNum));

				/***********************/
				/* COLLISION DETECTION */
				/***********************/


				if (headOnCollision(newDataNum) > 0) {
					console.log('Hit target!');

					/************************************************/
					/* Append the new guy to the head of fellowship */
					/************************************************/

					var newSnakeHead = cells[newDataNum].getAttribute('id');

					fellowship.unshift(newSnakeHead); // add new member to snakehead
					fellowshipNew.splice(fellowshipNew.indexOf(newSnakeHead),1); // remove from remaining members

					/********************************************/
					/* Append a new interaction for the new guy */
					/********************************************/

					var clone = JSON.parse(JSON.stringify(keyHistory[0])); // pass a copy of the direction of the original snakehead

   					// push new key to the head of the key history
    				keyHistory.unshift(clone);

					message.unshift(keyHistory[0]);

					console.log(message.slice(0,fellowship.length - 1));
					console.log(fellowship);

					/******************************/
					/* switch the new guy's class */
					/******************************/

					if (wallChecker(message[0], parseInt(newDataNum))) { // Hit the wall; stop game
				
						console.log("Hit wall!");
						// proceed = false;
						i += fellowship.length; // exit the loop so that subsequent fellowship members do not execute the next move 

					}
					else {

						switchClass(parseInt(newDataNum), fellowship[i], message[i], true, false); // old class to turn

						newnewDataNum = move(message[i], parseInt(newDataNum));

						switchClass(newnewDataNum, fellowship[i], message[i], false, false) // new class to turn
					}
					
				}

				else { // no collision

				switchClass(parseInt(oldDataNum), fellowship[i], message[i], true, false); // old class to turn

				
				switchClass(newDataNum, fellowship[i], message[i], false, false); // new class to turn

				}
				

			}									

		}

		/*******************************************************/
		/* Move newly spawned fellowship members independently */
		/*******************************************************/

		//  if (fellowshipNew.length > 0) { // there are members to move

		//  	for (var i = 0; i < fellowshipNew.length; i++) {

		// 		if (newFellowCounter[fellowshipNew[i]] > 0) { // skip the first frame

		// 			var oldDataNum = document.getElementById(fellowshipNew[i]).getAttribute('data-num');

		// 			if (wallChecker(down, parseInt(oldDataNum))) {
						
		// 				console.log("removing " + fellowshipNew[i]); // change the class first
		// 				removeFellowship(fellowshipNew[i]);

		// 				fellowshipNew.splice(fellowshipNew[i], 1); // remove from array

		// 			}

		// 			else {
		// 				// Move down each newly spawned and unappended fellowship element

		// 				switchClass(parseInt(oldDataNum), fellowshipNew[i], down, true, true); // old class to turn

		// 				var newDataNum = move(down, parseInt(oldDataNum));

		// 				switchClass(newDataNum, fellowshipNew[i], down, false, true); // new class to turn
		// 			}
		// 		}

		// 		newFellowCounter[fellowshipNew[i]] += 1; // add a frame
		// 	}
		// }

		/**************************************************/
		/* Newly spawned fellowship members stay in place and disappear after some time*/
		/**************************************************/


    }

    this.render = function (interactions, frameCounter) {
    	actualizeKey(interactions, frameCounter);
    }

    function init() {

    	// initialise message
    	for (var i = 0; i < fellowship.length; i++) {

    		/* CLONE interaction to get a separate object */

    		var clone = JSON.parse(JSON.stringify(interaction));
    		message.push(clone);
    	}

    	// initialise key history
    	keyHistory.push(interaction);

    	// initialise down movement for new fellowship members
    	down = JSON.parse(JSON.stringify(interaction));
    	down.left = false;
    	down.down = true; 
    }

    init();
}

