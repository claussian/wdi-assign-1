var Fellowship = function(settings) {

	

	function init() {
		var fellowship = document.getElementById('fellowship-board');
    	fellowship.forEach(function (elem) {
    		assets.push(elem);
    	});
    }

    // Move the fellowship chain around manually
    function move(interactions){

      if(interactions.up){
        ballElement.style.top = parseInt(ballElement.style.top)-8+"px";
      }

      if(interactions.down){
        ballElement.style.top = parseInt(ballElement.style.top)+8+"px";
      }

      if(interactions.left){
        ballElement.style.left = parseInt(ballElement.style.left)-8+"px";
      }

      if(interactions.right){
        ballElement.style.left = parseInt(ballElement.style.left)+8+"px";
      }

      if(settings.walls){
        wall();
      }
    }
}