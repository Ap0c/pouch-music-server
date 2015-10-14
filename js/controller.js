// ----- Requires ----- //

var Player = require('./player');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	player = Player();

	var song = { url: 'media/Greensleeves.mp3' };
	player.newSong(song);
	player.play();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
