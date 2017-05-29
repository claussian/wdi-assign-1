var Orc = function(settings) { // orc object

	var orcElement = null;
	var orcCounter = 0;
	var orcBoard = document.getElementById('orc-board');
	// orcElement.style.top = orcElement.style.top - 8 + "px"; // can make speed variable

	function destroyOrc(orcElement) {
        // Remove the orc when it goes past the screen
        orcElement.parentNode.removeChild(orcElement);
    }

	/*
	 *	Move the Orc; remove after it goes off the screen
	 */
	 function move(){
		 var orcRect = orcElement.getBoundingClientRect(); // get Orc div properties

		 orcElement.style.top = (orcRect.top + settings.gravity) + 'px'; // move it by #gravity* px per frame
		 if (parseInt(orcElement.style.top) > parseInt(window.innerHeight)) {
		 	destroyOrc(orcElement);
		 	console.log(orcElement);
		 }
		 	
	 }

	/*
	 *	Create a new orc
	 */
	function create() {
		
		var w = parseInt(window.innerWidth); // assign orc's x position
		var x = Math.floor(Math.random()*w);
		orcElement = document.createElement('div');
		orcElement.className = 'orc';
		orcElement.setAttribute('index', orcCounter);
		orcElement.style.top = '0px';
		orcElement.style.left = x + "px";
		orcBoard.appendChild(orcElement);
	}

	this.render = function(){
		move();
	}


  function init() {

  	create();
	}

	init();
}
