// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Module Instances ----- //

var views = null;
var models = null;
var player = null;


// ----- Functions ----- //

function playbackHandlers () {

	views.on('play', player.play);
	views.on('pause', player.pause);

	views.on('next', models.next);
	views.on('previous', models.prev);

	models.on('new-playing', function (song) {
		player.newSong(song.url);
		player.play();
	});

}


function setup () {

	views = Views();
	models = Models();
	player = Player();

	playbackHandlers();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
