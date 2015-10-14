// ----- Requires ----- //

var EventEmitter = require('events');


// ----- Exports ----- //

module.exports = function Player () {

	// ----- Setup ----- //

	var nowPlaying = new Audio();
	var player = new EventEmitter();

	nowPlaying.addEventListener('ended', function emitEnded () {
		player.emit('songended');
	});


	// ----- Functions ----- //

	// Resumes playback of current song.
	player.play = function play () {

		if (nowPlaying.paused) {
			nowPlaying.play();
		}

	};

	// Pauses playback of current song.
	player.pause = function pause () {

		if (!nowPlaying.paused) {
			nowPlaying.pause();
		}

	};

	// Loads a new song into the player.
	player.newSong = function newSong (song) {

		if (song.url) {
			nowPlaying = new Audio(song.url);
		} else {
			throw Error('No song url.');
		}

	};


	// ----- Constructor ----- //

	return player;


};
