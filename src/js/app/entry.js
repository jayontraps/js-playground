var getAnimationEvents = require('./modules/getAnimationEvents');
var carousel = require('./modules/carousel');

window.onload = function() {
	getAnimationEvents();
	var slides = document.getElementById('carousel').children;
	carousel(slides);
};
