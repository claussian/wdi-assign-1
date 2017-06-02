var Fellowship = function(settings) {

	/* Global variables */

	var fellowship = ['gandalf','frodo','samwise']; // initial fellowship members

	// var fellowshipP = [45,46,47];  // fellowship positions

	var fellowshipR = ['boromir','strider','legolas','gimli','merry','pippin']; // remaining fellowship members

	var fellowshipNew = []; // newly spawned fellowship members

	var orcNew = []; // newly spawned orcs, move if uncollided

	var orcIndex = 1; // orc ids to execute pause for newly spawned orcs

	var newOrcCounter = {}; // skip a frame for newly spawned orcs

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
		return (key1.up && key2.down || key1.down && key2.up || key1.right && key2.left || key1.left && key2.right || key1.up && key2.up || key1.down && key2.down || key1.left && key2.left || key1.right && key2.right) ? true : false
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
    	//newFellowCounter[newFellow] = 0;

    	console.log("spawned " + newFellow);

	}

	/* Spawn new orcs randomly */

	function spawnOrc() {

		var empty = document.getElementsByClassName("empty"); // get list of empty cells

		topRow = [];
		for (var i = 0; i < empty.length; i++) { // get empty cells in the top row
			if (parseInt(empty[i].getAttribute('data-num')) < 6 ) {
				topRow.push(empty[i]);
			}
		}

		var randomEmptyCell = topRow[Math.floor(Math.random() * topRow.length)]; // choose a random cell

		// Change cell class and rotateIn
		randomEmptyCell.classList.remove("empty"); // remove and add method to trigger animation
    	randomEmptyCell.classList.add("orc");
    	var orcId = "orc" + orcIndex;
    	randomEmptyCell.setAttribute('id', JSON.parse(JSON.stringify(orcId)));

    	randomEmptyCell.style.animationName = "rotateIn";

    	// add counter to orc object
    	newOrcCounter[JSON.parse(JSON.stringify(orcId))] = 0;

    	console.log("spawned Orc " + orcId);

    	// added new orc
    	orcNew.push(JSON.parse(JSON.stringify(orcId)));

    	orcIndex ++; 

	}

	/* Remove newly spawned fellowship member or Orc when it hits the wall */

	function removeOrc(member) {

		// get fellowship member to remove
		var targetCell = document.getElementById(member);
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
		classEnum = ['new','fellowship','empty','orc'];

		for (var i = 0; i < classEnum.length; i++) {
			if(cell.classList.contains(classEnum[i])) {
				cell.classList.remove(classEnum[i]);
			}
		}

	}

	/* Detect collision. Condition: data-num of intended cell movement and new fellowship member match */

	function headOnCollision(newDataNum, targetClass) {
		var match = 0;
		var targetCell_1 = cells[newDataNum];
		var targetCell_2 = document.getElementsByClassName(targetClass);

		for (var i = 0; i < targetCell_2.length; i++) {
			if (targetClass == "orc"){
				console.log("orc cell: " + parseInt(targetCell_2[i].getAttribute('data-num')));
				console.log("snake cell: " + parseInt(targetCell_1.getAttribute('data-num')));
			}
			
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

    function switchClass (dataNum, fellowElement, interaction, old, className) {
    	
    	var cell;
    	
    	// get the cell which needs to be changed

    	cell = cells[dataNum];
    	
    	// console.log(cell.style.animationName);

    	cell.style.animationName = animate(interaction, old);  // set animation after

    	if (old) { // if old cell, change id to null
    		removeAllClasses(cell);						// method to trigger animation 
    		cell.classList.add("empty");
    		cell.removeAttribute("id");
    	}
    	else { // if new cell, change id to the fellowship or orc element
    		removeAllClasses(cell);
    		cell.classList.add(className);
    		cell.setAttribute("id", fellowElement);
    	}   	
    }

	/* Alert board */

	function alertDisplay (type, member) {

		var alertBoard = document.getElementById('alert-board');
		var children = alertBoard.childNodes;
		while (children.length > 0) {
			alertBoard.removeChild(children[0]); // remove all existing nodes first
		}

		var scrawl = document.getElementById(type).textContent; // get the message to display from html
		console.log(scrawl);
    	
    	var firstM = document.createElement('h1');
    	if (type == "hit") {
    		firstM.textContent = scrawl.replace("{{fellowship}}", member); // replace with fellowship member's name
    	}
    	else {
    		firstM.textContent = scrawl;
    	}
    	// firstM.
    	alertBoard.appendChild(firstM);
    	firstM.classList.add("animated");
    	firstM.classList.add("tada");	
    	// firstM.style.animationName = "slideInRight";
    	//console.log(firstM);
    	

    	var secondM = document.createElement('h2'); // re-append secondary message
    	secondM.innerHTML = document.getElementById("secondHead").innerHTML;
    	// alertBoard.innerHTML = firstM + secondM;
		// console.log(secondM);
		alertBoard.appendChild(secondM);

	}


    /* Function to invoke every cycle or when key is pressed, rendered per frame */

    function actualizeKey(interactions, frameCounter, fellowIndex) {
    	
    	console.log(frameCounter);

    	/*********************/
    	/* Spawn new members */
    	/*********************/

    	if (frameCounter % 7 == 0 && fellowshipR.length > 0 && settings.disable == false) { // fellowship member takes maximum 7 seconds to move down the grid
    		spawnFellowship();
    	}

    	/**********************************************/
    	/* Remove new members sporadically if uncaught*/
    	/**********************************************/

    	// if (frameCounter % 13 == 0 && fellowshipNew.length > 0) { // resulted in buggy behaviour where collision is detected just before element is destroyed
    	// 	randomRemoveFellowship(); 
    	// }

    	/******************/
    	/* Spawn new Orcs */
    	/******************/

    	if (frameCounter % 13 == 0 && settings.orcs == true && settings.disable ==  false) {
    		spawnOrc();
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

			// console.log(fellowship[i]);
			var oldDataNum = document.getElementById(fellowship[i]).getAttribute('data-num');

			/******************/
			/* Check for wall */
			/******************/

			if (wallChecker(message[0], parseInt(oldDataNum))) { // Hit the wall; stop game
				
				/********************/
				/* Append a message */
				/********************/

				alertDisplay("dead");
				console.log("Hit wall!");

				/*******************************************/
				/* Stop all movement, switch to win class */
				/*******************************************/

				// var winFellows = document.getElementsByClassName("fellowship");
				// for (var i = 0; i < deadFellows.length; i++) {
				// 	 	var dataNum = deadFellows[i].getAttribute('data-num');
				// 	 	switchClass(parseInt(dataNum), "dead", down, false, "skull");
				// 	 }
				var bg = document.getElementsByTagName("table")[0];
				bg.classList.remove("play");
				bg.classList.add("one-ring");
				bg.animationName = "fadeIn";

				// proceed = false;
				i += fellowship.length; // exit the loop so that subsequent fellowship members do not execute the next move
				settings.disable = true; 

			}

			else if (settings.disable == false) {
				// translate each fellowship element according to its position and turn, within the message index

				var newDataNum = move(message[i], parseInt(oldDataNum)); // intended cell destination

				/***********************/
				/* COLLISION DETECTION */
				/***********************/


				if (headOnCollision(newDataNum, 'new') > 0) {
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

					console.log(message.slice(0,fellowship.length));
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

						switchClass(parseInt(newDataNum), fellowship[i], message[i], true, "fellowship"); // old class to turn

						newNewDataNum = move(message[i], parseInt(newDataNum));

						switchClass(newNewDataNum, fellowship[i], message[i], false, "fellowship") // new class to turn
					}

					// /********************/
					// /* Append a message */
					// *********************/

					if (fellowship.length == 9) {

						alertDisplay("win",fellowship[i]);

						/*******************************************/
						/* Stop all movement, switch to win class */
						/*******************************************/

						// var winFellows = document.getElementsByClassName("fellowship");
						// for (var i = 0; i < deadFellows.length; i++) {
						// 	 	var dataNum = deadFellows[i].getAttribute('data-num');
						// 	 	switchClass(parseInt(dataNum), "dead", down, false, "skull");
						// 	 }
						var bg = document.getElementsByTagName("table")[0];
						bg.classList.remove("play");
						bg.classList.add("gondor");
						bg.animationName = "fadeIn";

						i += fellowship.length; // exit loop
					}
					else {
						alertDisplay("hit",fellowship[i]);
					}
					
				}

				else { // no collision

				switchClass(parseInt(oldDataNum), fellowship[i], message[i], true, "fellowship"); // old class to turn

				
				switchClass(newDataNum, fellowship[i], message[i], false, "fellowship"); // new class to turn

				}
				

			}									

		}

		/*****************************************/
		/* Move newly spawned orcs independently */
		/*****************************************/

		  if (orcNew.length > 0) { // there are orcs to move

		  	for (var i = 0; i < orcNew.length; i++) {

		 		if (newOrcCounter[orcNew[i]] > 0) { // skip the first frame

		 			var oldDataNum = document.getElementById(orcNew[i]).getAttribute('data-num');

		 			if (wallChecker(down, parseInt(oldDataNum))) {
						
		 				console.log("removing " + orcNew[i]); // change the class first
		 				removeOrc(orcNew[i]);

		 				orcNew.splice(orcNew[i], 1); // remove from array

		 			}

		 			else {
		 				// Move down each newly spawned and unappended orc element
		 				
		 				var newDataNum = move(down, parseInt(oldDataNum)); // intended cell destination
		 				console.log("new orc cell: " + newDataNum);

		 				/***********************/
						/* COLLISION DETECTION */
						/***********************/

						if (headOnCollision(newDataNum, 'fellowship') > 0) {
							console.log('Orc hits fellowship!');

							/*******************************************/
							/* Stop all movement, switch to dead class */
							/*******************************************/

							var deadFellows = document.getElementsByClassName("fellowship");
							 for (var i = 0; i < deadFellows.length; i++) {
							 	var dataNum = deadFellows[i].getAttribute('data-num');
							 	switchClass(parseInt(dataNum), "dead", down, false, "skull");
							 }
							 var bg = document.getElementsByTagName("table")[0];
							 bg.classList.remove("play");
							 bg.classList.add("one-ring");
							 bg.animationName = "fadeIn";

							/*****************/
							/* Add a message */
							/*****************/

							// alertDisplay("dead", orcNew[i]);

							 i += 99; // exit loop

						}

						else {
							switchClass(parseInt(oldDataNum), orcNew[i], down, true, "orc"); // old class to turn

		 					switchClass(newDataNum, orcNew[i], down, false, "orc"); // new class to turn
						}
					
		 				
		 			}
		 		}

		 		newOrcCounter[orcNew[i]] += 1; // add a frame
		 	}
		 }

	


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

