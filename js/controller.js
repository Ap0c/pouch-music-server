// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();
	var models = Models();

	var artist = {
		name: 'Artist One',
		albums: [
			{
				name: 'Album One',
				songs: [
					{ id: 'one', name: 'Song One', number: 1 },
					{ id: 'two', name: 'Song Two', number: 2 },
					{ id: 'three', name: 'Song Three', number: 3 }
				]
			},
			{
				name: 'Album Two',
				songs: [
					{ id: 'four', name: 'Song Four', number: 4 },
					{ id: 'five', name: 'Song Five', number: 5 },
					{ id: 'six', name: 'Song Six', number: 6 }
				]
			}
		],
	};
	views.navArtist(artist);
	views.navList(['one', 'two']);
	views.navArtist(artist);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
