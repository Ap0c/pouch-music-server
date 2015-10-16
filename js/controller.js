// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	views = Views();
	views.navList(['one', 'two', 'three']);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
