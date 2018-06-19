/*
 * ScrollZa - mini JavaScript library for scrollytelling
 * @author Zakharov Andrew https://github.com/ZakharovAndrew
 */
 
 function scrollza() {
	let stepElement = null;
	let pageHeight = 0;
	let debugMode = false;
	let activeElement = -1;
	// make Events
	let eventActive = document.createEvent('Event');
	let eventDeactive = document.createEvent('Event');
	 
	
	function handleResize() {
		var windowScrollTop = $(window).scrollTop();
        var windowHeight = $(window).outerHeight();
        var bodyHeight = $(document).height();

        var total = (windowScrollTop / (bodyHeight - windowHeight)) * 100;
		
		if (debugMode) console.log('Percent scroll = ',total);
			
		var windowScrollCenter = windowScrollTop + windowHeight/2;
		
		var found = false;
		for (var i=0; i < stepElement.length; i++) {
			if (stepElement[i].offsetTop < windowScrollCenter && (stepElement[i].offsetTop + stepElement[i].offsetHeight > windowScrollCenter) ) {
				found = true;
				if (activeElement !== i) {
					if (activeElement !== -1) {
						stepElement[activeElement].dispatchEvent(eventDeactive);
						stepElement[activeElement].classList.remove("is-active");
					}
					stepElement[i].dispatchEvent(eventActive);
					activeElement = i;
					stepElement[i].classList.add("is-active");
					if (debugMode) console.log('element ', i, ' is active');
				}
			}
		}
		if (!found) {
			if (activeElement !== -1) {
				stepElement[activeElement].dispatchEvent(eventDeactive);
				stepElement[activeElement].classList.remove("is-active");
			}
			activeElement = -1;
		}
	}

	this.setup = function(step, debug = true)
	{
		// elements
		stepElement = document.querySelectorAll(step);

		// error if no step selected
		if (!stepElement.length) {
			console.error('scrollza error: no step elements');
			return false;
		}

		// options
		debugMode = debug;
		
		// Events
		eventActive.initEvent('active', true, true);
		eventDeactive.initEvent('deactive', true, true);
		
		// init
		handleResize();
		
		window.onscroll = function() {
			handleResize();
		}
		window.resize = function() {
			handleResize();
		}
		
	}
}