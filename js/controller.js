// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Module Instances ----- //

var views = null;
var models = null;
var player = null;


// ----- Functions ----- //

// Hooks up views, models and player to handle playback.
function playbackHandlers () {

	views.on('play', player.play);
	views.on('pause', player.pause);

	views.on('next', models.next);
	views.on('previous', models.prev);

	models.on('new-playing', function playSong (song) {
		player.newSong(song.url);
		player.play();
	});

}

// Updates the views based upon user input.
function viewHandlers () {

	views.on('view-artist', function displayArtist (artist) {
		var artistInfo = models.artist(artist.name);
		views.navArtist(artistInfo);
	});

	views.on('view-album', function displayAlbum (album) {
		var albumInfo = models.album(album.name);
		views.navAlbum(albumInfo);
	});

	views.on('menu: artists', function viewArtists () {
		var artists = models.artists();
		views.navList(artists, 'artist');
	});

	views.on('menu: albums', function viewAlbums () {
		var albums = models.albums();
		views.navList(albums, 'album');
	});

}


function setup () {

	views = Views();
	models = Models();
	player = Player();

	playbackHandlers();
	viewHandlers();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
