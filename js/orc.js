var Orc = function () { // spawn orcs

	var orcElement = null;

	// orcElement.style.top = orcElement.style.top - 8 + "px"; // can make speed variable

	function destroyOrc() {
        // Remove the orc when it goes past the screen
    }

    function init() {
      // create();
      var w = parseInt(window.innerWidth); // assign orc's x position 
      var x = Math.floor(Math.random()*w);
      orcElement = document.createElement('div');
      orcElement.className = 'orc';
      orcElement.style.top = '0px';
      orcElement.style.left = x + "px";
      var body = document.getElementById('game-board');
      body.appendChild(orcElement);
    //this.render = function(interactions){ //
    //  move(interactions); //
    //} // 
	}

	init();
}









