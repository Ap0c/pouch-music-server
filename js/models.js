// ----- Requires ----- //

var PouchDB = require('pouchdb');


// ----- Setup ----- //

var db = new PouchDB(location.protocol + '//' + location.host + '/db/music-db');


// ----- Exports ----- //

exports.next = function next () {

	// Returns next song in up next playlist, or null. Also fires 'new-playing'
	// event and updates current song.

};

exports.prev = function prev () {

	// Returns previous song in up next playlist, or null. Also fires
	// 'new-playing' event and updates current song.

};

exports.upNext = function upNext () {

	// Returns a list of song in the up next playlist.

};

exports.nowPlaying = function nowPlaying () {

	// Returns the currently playing song.

};
