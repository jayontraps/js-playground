module.exports = function carousel(slides) {

	// DOM els
	var prevBtn = document.getElementById('prev'),
		nextBtn = document.getElementById('next');	
	// pagination
	for (var i = 0; i < slides.length; i++) {
		console.log(i+1);
	}



	var state = {
		'current' : 0,
		'isAnimating' : false
	};
	var len = slides.length - 1;
			
	var currentItem = slides[0];

	// classes
	var onTop = 'carousel__item--ontop',		
		disabled = 'disabled',
		animating = 'is-animating',
		animationIn,
		animationOut;

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



	function changeSlide() {

		if (!state.isAnimating) {
							
			if (this === next) {

				animationIn = "slide-in-from-left";				
				animationOut = "slide-out-to-right";

				if (state.current < len) {
					// slide out current item and remove it's onTop class									
					slides[state.current].classList.add(animating, animationOut);					
					// update state
					state.isAnimating = true;
					// increment state.current
					state.current = state.current+1;
					// slide in new current item	
					slides[state.current].classList.add(onTop, animating, animationIn);	
					navBtnStatus(state.current);										
				}
				
			} 

			if (this === prev) {

				animationIn = "slide-in-from-right";
				animationOut = "slide-out-to-left";

				if (state.current > 0) {
					// slide out current item and remove it's onTop class				
					slides[state.current].classList.add(animating, animationOut);
					// update state
					state.isAnimating = true;
					// decriment state.current
					state.current = state.current-1;
					// slide in new current item				
					slides[state.current].classList.add(onTop, animating, animationIn);
					navBtnStatus(state.current);													
				}			
			}
		} 
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

	
	prevBtn.addEventListener('click', changeSlide, false);
	nextBtn.addEventListener('click', changeSlide, false);

};

