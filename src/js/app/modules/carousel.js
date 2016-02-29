module.exports = function carousel(slides) {

	// DOM els
	var prevBtn = document.getElementById('prev-btn'),
		nextBtn = document.getElementById('next-btn');	

	var state = {
		'current' : 0,
		'isAnimating' : false,
		'auto': true
	};
	var len = slides.length - 1;
			
	var currentItem = slides[0];

	// classes
	var onTop = 'carousel__item--ontop',		
		disabled = 'disabled',
		animating = 'is-animating',
		animationIn,
		animationOut,
		condition;

	// set first slide up
	currentItem.classList.add(onTop);

	// disable previous btn to start with
	navBtnStatus(0);

	// add animationEnd listeners
	function removeAnimationClasses () {

		for(var i = 0; i <= len; i++) {
			if (i === state.current) {
				slides[i].classList.remove(animating, animationOut, animationIn);
			} else {
				slides[i].classList.remove(onTop, animating, animationOut, animationIn);
			}
			
			state.isAnimating = false;
		}
	}

	for (var i = 0; i < slides.length; i++) {
		slides[i].addEventListener(animationEnd, removeAnimationClasses, false);
	}



	var direction = [
	    function(s) { return s + 1; },
	    function(s) { return s - 1; } 
	];	

	function moveBackward () {
		if (!state.isAnimating) {
			animationIn = "slide-in-from-right";
			animationOut = "slide-out-to-left";
			condition = state.current > 0;	
			changeSlide(condition, direction[1]);	
		}
	}

	function moveForward () {
		if (!state.isAnimating) {
			animationIn = "slide-in-from-left";				
			animationOut = "slide-out-to-right";
			condition = state.current < len;				
			changeSlide(condition, direction[0]);	
		}
	}

	function changeSlide (condition, direction) {
		if (condition) {
			// slide out current item and remove it's onTop class									
			slides[state.current].classList.add(animating, animationOut);					
			// update state
			state.isAnimating = true;
			// increment state.current
			state.current = direction(state.current);
			// slide in new current item	
			slides[state.current].classList.add(onTop, animating, animationIn);	
			navBtnStatus(state.current);	
			console.log(state.current);									
		}
	}


	function moveBackTostart () {
		animationIn = "slide-in-from-left";				
		animationOut = "slide-out-to-right";
		// slide out current item and remove it's onTop class									
		slides[len].classList.add(animating, animationOut);					
		// update state
		state.isAnimating = true;
		// increment state.current
		state.current = 0;
		// slide in new current item	
		slides[state.current].classList.add(onTop, animating, animationIn);				
	}


	function navBtnStatus (position) {
		if (position === 0) {
			prevBtn.classList.add(disabled);
		} else if (position === len) {			
			nextBtn.classList.add(disabled);
		} else {
			prevBtn.classList.remove(disabled);
			nextBtn.classList.remove(disabled);
		}
	}
	
	
	prevBtn.addEventListener('click', manualTakeOver, false);
	nextBtn.addEventListener('click', manualTakeOver, false);




	// first attempt at auto sliding with recursive-like function autoSlide()
	function manualTakeOver () {

		state.auto = false;

		if (this === nextBtn) {
			moveForward();
		}
		if (this === prevBtn) {
			moveBackward();
		}
	}


	(function autoSlide(){

		function moveForwardInit() {
			if (state.auto) {
				moveForward();
				autoSlide();
			}
		}

	    if (state.current === len){
	        
	        moveBackTostart();

	        if (state.auto) {
         		setTimeout(autoSlide, 3000);
	        }
	       
	    } else if (state.current === 0) {

    		setTimeout(moveForwardInit, 3000);

	    } else {

	    	moveForward();

	    	if (state.auto) {
         		setTimeout(autoSlide, 3000);
	        }	    	
	    }

	})();

	
};

