var Orc = function(settings) { // spawn orcs

	var orcElement = null;

	// orcElement.style.top = orcElement.style.top - 8 + "px"; // can make speed variable

	function destroyOrc() {
        // Remove the orc when it goes past the screen
  }

	/*
	 *	Move the Orc
	 */
	 function move(){
		 var orcRect = orcElement.getBoundingClientRect();

		 // What to do once we hit the bottom of the screen ?
		 orcElement.style.top = (orcRect.top + settings.gravity) + 'px';

	 }

	/*
	 *	Crate a new orc
	 */
	function create(){
		var w = parseInt(window.innerWidth); // assign orc's x position
		var x = Math.floor(Math.random()*w);
		orcElement = document.createElement('div');
		orcElement.className = 'orc';
		orcElement.style.top = '0px';
		orcElement.style.left = x + "px";
		var body = document.getElementById('game-board');
		body.appendChild(orcElement);
	}

	this.render = function(){
		move();
	}


  function init() {
  	create();
	}

	init();
}
