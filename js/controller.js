// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();
	var models = Models();
	// views.navList(['one', 'two', 'three']);
	views.navArtist({ name: 'Artist One', 'albums': []});

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
