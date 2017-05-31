var Fellowship = function(settings) {

	/* Global variables */

	var fellowship; // initialize fellowship

	var fellowshipR = ['boromir','strider','legolas','gimli','meriadoc','pippin']; // remaining fellowship members

	var fellowBoard = document.getElementById('fellowship-board'); // parent node

	var message = []; // array containing instruction tapes telling dom elements where to go based on index

	var divSizeCounter = 0; // pixel counter to move in units of div width

	var picSize = 150; // in px

	// Browser dimensions

	var w = parseInt(window.innerWidth); 
    var h = parseInt(window.innerHeight);

	/* Interactions: define here so that message array can be populated on init */

   	var interaction = {};
   	interaction.up = false;              // Up arrow key pressed
   	interaction.down = false;            // Down arrow key pressed
   	interaction.left = true;            // Left arrow key pressed
   	interaction.right = false;			// Right arrow key pressed
   	interaction.keyup = false;			// New key released

   	function wall(fellowElement) {

      var x_right = parseInt(fellowElement.style.left)  + parseInt(fellowElement.style.width);
      var x_left = parseInt(fellowElement.style.left);
      var y_top = parseInt(fellowElement.style.top);
      var y_bottom = parseInt(fellowElement.style.top) + parseInt(fellowElement.style.height);    

      if(y_bottom > h){
        fellowElement.style.top = (h - parseInt(fellowElement.style.height)) + 'px';
      }

      if(y_top < -w/2){
        fellowElement.style.top = '200px';
      }
    }

     /* Spawn remaining fellowship members randomly after a certain period of time */

	function createNewFellowship (frameCounter) {
		// 
		var fellowNew = fellowElement[Math.floor(Math.random) * fellowElement.length];

		var x = Math.floor(Math.random() * w); // assign fellowship's x position
		var y = Math.floor(Math.random() * n); // assign felllowship's y position

		fellowNewElement = document.createElement('div');
		fellowNewElement.className = "fellowship";
		fellowNewElement.setAttribute("id", fellowNew);
		fellowNewElement.style.top = y + 'px';
		fellowNewElement.style.left = x + "px";
		fellowBoard.appendChild(fellowNewElement);

	}


    /* Move the fellowship chain by passing a value of interaction */

    function move(tape, fellowElement) { // interaction key is local in scope

      if(tape.up){
        fellowElement.style.top = parseInt(fellowElement.style.top) - settings.speed + "px";
      }

      if(tape.down){
        fellowElement.style.top = parseInt(fellowElement.style.top) + settings.speed + "px";
      }

      if(tape.left){
        fellowElement.style.left = parseInt(fellowElement.style.left) - settings.speed + "px";
      }

      if(tape.right){
        fellowElement.style.left = parseInt(fellowElement.style.left) + settings.speed + "px";
      }

      if(settings.wall){
        wall(fellowElement);
      }

    }

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


    	/* Execute initial message unshift only when keyup is true */

    	if (interactions.keyup) { // && frameCounter % 60 == 0) {   // set a buffer so that keystroke not so sensitive?
    		
    		console.log("value init keyup: " + interactions.keyup);

    		// add new instruction tape for the first fellowship element
    		var tape = packer(interactions, Math.floor(picSize/settings.speed));

    		message.unshift(tape);

    		//remove previous instruction tape for last fellowship element
    		message.pop();

    		console.log("on keyup");
    		console.log(message[0][0]); // gandalf's instruction
    		console.log(message[1][0]); // frodo's instruction
    		console.log(message[2][0]); // samwise's instruction

    		//reset keyup ? this is not working ?
    		interactions.keyup = false;

    		console.log("value reset keyup: " + interactions.keyup);

    		//reset counter for pixel size movement
    		divSizeCounter = 0;
    	}    		

    		// // push current key into keys array
    		// keys.push(interactions);
  	
    		// //push current array to list of arrays to be operated on
    		// var current = [];

    	//	keyup = false; // reset keyup indicator
    	
		
		/* Perform translation on each fellowship element in units of 150px */

		if (divSizeCounter < (picSize/settings.speed)) {

			// apply translation instruction tape to each fellowship element
			for (var i = 0; i < fellowship.length; i++) {
			// translate each fellowship element according to its position and turn, within the message index
				move(message[i][divSizeCounter], fellowship[i]);
			}

			divSizeCounter++;
			// console.log(divSizeCounter);
		}

		/* Fellowship element has moved its own width, execute next message unshift */

		else {
			// refresh turn
			divSizeCounter = 0;

			// unshift and pop
			tape = packer(interactions, Math.floor(picSize/settings.speed));
    		message.unshift(tape);
    		message.pop();

    		console.log("on finish");
    		console.log(message[0][0]); // gandalf's instruction
    		console.log(message[1][0]); // frodo's instruction
    		console.log(message[2][0]); // samwise's instruction


			// apply translation instruction tape to each fellowship element
			//for (var i = 0; i < fellowship.length; i++) {
			//	move(message[i][divSizeCounter], fellowship[i]);
			//}
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

    	//createNewFellowship(frameCounter);
    	
    }

    /* Initialize by fetching fellowship dom array and moving left */

    function init () {
    	fellowship = document.getElementById('fellowship-board').childNodes; // get array of children of fellowship board
    	// console.log(fellowship);
    	
    	for (var i = 0; i < fellowship.length; i++) {
    		fellowship[i].style.top = "0px";
    		fellowship[i].style.left = "0px";
    		// console.log("Top:" + fellowship[i].style.top + " Left:" + fellowship[i].style.left);

    		var tape = packer(interaction, Math.floor(picSize/settings.speed));

    		message.push(tape);
    		// move(interaction, fellowship[i]); 
    	}
    	console.log("Initial key");
    	console.log(message[0][0]);
    	console.log(message[1][0]);
    	console.log(message[2][0]);
    }

    init();
}