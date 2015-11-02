// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();

	var testList = [
		{ name: 'Artist One' },
		{ name: 'Artist Two' },
		{ name: 'Artist Three' }
	];

	views.navList(testList, 'artist');

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
