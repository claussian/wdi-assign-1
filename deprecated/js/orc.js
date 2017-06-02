var Orc = function(settings) {

	/* Global variables */

	var orcElement = null;

	var orcCounter = 0;
	
	var orcBoard = document.getElementById('orc-board');
	

	/* Reference the parent node to remove orc */

	function destroyOrc(orcElement) {
        orcBoard.removeChild(orcElement);
    }

	 /*	Move the Orc; remove after it goes off the screen */

	 function move() {
		 var orcRect = orcElement.getBoundingClientRect(); // get Orc div properties

		 orcElement.style.top = (orcRect.top + settings.gravity) + 'px'; // move it by #gravity* px per frame
		 if (parseInt(orcElement.style.top) > parseInt(window.innerHeight)) {
		 	destroyOrc(orcElement);
		 }
		 	
	 }

	/* Create a new orc */

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

	this.render = function (){
		move();
	}


  function init() {

  	create();
	}

	init();
}
