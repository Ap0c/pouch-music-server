// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();

	views.menuOverlay();
	views.closeMenu();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
