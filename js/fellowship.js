var Fellowship = function(settings) {

	var fellowship;
	var message = []; // array containing instruction tapes telling dom elements where to go based on index
	var divSizeCounter = 0;
	var picSize = 150;

	// Interactions: initialize here so that message var can be populated
   	var interaction = {};
   	interaction.up = false;              // Up arrow key pressed
   	interaction.down = false;            // Down arrow key pressed
   	interaction.left = true;            // Left arrow key pressed
   	interaction.right = false;			// Right arrow key pressed
   	interaction.keychange = false;		// New key pressed




    /* Move the fellowship chain by passing a value of interaction */

    function move(message, fellowElement) { // interaction key is local in scope

      if(message.up){
        fellowElement.style.top = parseInt(fellowElement.style.top) - settings.speed + "px";
      }

      if(message.down){
        fellowElement.style.top = parseInt(fellowElement.style.top) + settings.speed + "px";
      }

      if(message.left){
        fellowElement.style.left = parseInt(fellowElement.style.left) - settings.speed + "px";
      }

      if(message.right){
        fellowElement.style.left = parseInt(fellowElement.style.left) + settings.speed + "px";
      }
      //if(settings.walls){
      //  wall();
      // }

    }

  //   function getCoordinates (fellowElement) {
  //   	var fellowRect = fellowElement.getBoundingClientRect();
		// coordFirst.top = fellowRect.top;
		// coordFirst.left = fellowRect.left;
		// return coordFirst;
  //   }

  //   // Evaluate whether to invoke actualise key operation
  //   function evaluateOperate (working) {
  //   	return working.length > 0 ? true : false;
  //   }

    /* Translate the head of the current array */

    // function translateHead (key, array) {
    // 	move(key, array[0]);
    // 	array.shift();
    // }

    /* Pack translation operation in units of repeated frames */

    function packer (key, repeat) {
    	var pack = [];
    	for (var i = 0; i < repeat; i++) {
    		pack.push(key);
    	}
    	return pack;
    }

    /* Function to invoke when key is pressed, rendered per frame */

    function actualizeKey (interactions, frameCounter) {

    	// Count the number of frames that have passed
    	

    	/* Store the current key to pass as an argument to perform translation */


    	if (interactions.keychange) { // && frameCounter % 60 == 0) {   // set a buffer so that keystroke not so sensitive?
    		
    		console.log("value init keychange: " + interactions.keychange);
    		// add new instruction tape for the first fellowship element
    		var tape = packer(interactions, Math.floor(picSize/settings.speed));
    		message.unshift(tape);
    		// console.log("on keychange" + message.length);

    		//remove previous instruction tape for last fellowship element
    		message.pop();

    		console.log("on keychange");
    		console.log(message[0][0]); // frodo's instruction
    		console.log(message[1][0]); // gandalf's instruction

    		//reset keychange ? this is not working ?
    		interactions.keychange = false;
    		console.log("value reset keychange: " + interactions.keychange);
    		//reset counter
    		divSizeCounter = 0;
    	}

    		

    		// // push current key into keys array
    		// keys.push(interactions);
  	
    		// //push current array to list of arrays to be operated on
    		// var current = [];



    	//	keychange = false; // reset keychange indicator
    	
		
		/* Perform translation on each fellowship element in units of 100px */

		if (divSizeCounter < (picSize/settings.speed)) {
			// apply translation instruction tape to each fellowship element
			for (var i = 0; i < fellowship.length; i++) {
			// translate each fellowship element according to its position and turn, within the message index
				move(message[i][divSizeCounter], fellowship[i]);
				// console.log("within div" + message.length);
				// console.log(keys[i][divSizeCounter]);
			}
			divSizeCounter++;
		}

		else {
			// refresh turn
			divSizeCounter = 0;

			// unshift and pop
			tape = packer(interactions, Math.floor(picSize/settings.speed));
    		message.unshift(tape);
    		message.pop();

			// apply translation instruction tape to each fellowship element
			for (var i = 0; i < fellowship.length; i++) {
				move(message[i][divSizeCounter], fellowship[i]);
				// console.log("Edge of div" + message.length);
			}
		}

    }

    	//working.forEach(function(elem, index) {
    	//	operate(elem[0]operate);
    	// 	operate.shift();
    	//});

    	//if (interactions.up || interactions.down || interactions.left || interactions.right) { // if any key is pressed
    		
    		

    		// for (var i = 0; i < working.length; i++) {
    		// 	if (i === 0) {
    		// 		coordFirst = getCoordinates(fellowship[i]); // store coordinates of first element
    		// 		console.log("Element 0 Top:" + coordFirst.top + " Left:" + coordFirst.left);
    		// 		move(interactions, fellowship[i]); // immediately invoke move()
    		// 	}
    		// 	else {
    		// 		//gandalf's bounding box
    		// 		var moveTop = fellowship[i].getBoundingClientRect().top;
    		// 		var moveLeft = fellowship[i].getBoundingClientRect().left;
    		// 		// subsequent characters in the chain: wait to arrive at first element's position before invoking move()
    		// 		console.log("Element " + i + " Top:" + moveTop + " Left:" + moveLeft);
    		// 		var temp = (moveTop == coordFirst.top && moveLeft == coordFirst.left);
    		// 		console.log(temp);
    		// 		if(moveTop == coordFirst.top && moveLeft == coordFirst.left) {
    		// 			move(interactions,fellowship[i]);
    		// 		}
    		// 	}
    		// }
    	// }	
    // }

    /* When render is called from game.js [assets], execute these functions RECURSIVELY FRAME-BY-FRAME */
    this.render = function(interactions, frameCounter) {

    	actualizeKey(interactions, frameCounter);
    	
    }

    /* Initialize by fetching fellowship dom array and moving left */

    function init () {
    	fellowship = document.getElementById('fellowship-board').childNodes; // get array of children of fellowship board
    	// console.log(fellowship);
    	
    	for (var i = 0; i < fellowship.length; i++) {
    		fellowship[i].style.top = "100px";
    		fellowship[i].style.left = "100px";
    		// console.log("Top:" + fellowship[i].style.top + " Left:" + fellowship[i].style.left);
    		var tape = packer(interaction, Math.floor(picSize/settings.speed));
    		message.push(tape);
    		// move(interaction, fellowship[i]); 
    	}
    	console.log("Initial key");
    	console.log(message[0][0]);
    	console.log(message[1][0]);
    }

    init();
}