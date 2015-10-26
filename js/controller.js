// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();
	var models = Models();

	var album = {
		name: 'Album One',
		songs: [
			{ id: 'one', name: 'Song One', number: 1 },
			{ id: 'two', name: 'Song Two', number: 2 },
			{ id: 'three', name: 'Song Three', number: 3 }
		]
	};

	var song = { name: 'Song One', artist: 'Artist One', album: 'Album One' };

	views.updateNowPlaying(song);
	views.navAlbum(album);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
