// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');
var PouchDB = require('pouchdb');


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
		player.newSong(song.path);
		player.play();
	});

}

// Updates the nav views based upon user input.
function viewHandlers () {

	views.on('view-artist', function displayArtist (artist) {
		models.artist(artist).then(function (artistInfo) {
			views.navArtist(artistInfo);
		});
	});

	views.on('view-album', function displayAlbum (album) {
		models.album(album).then(function (albumInfo) {
			views.navAlbum(albumInfo);
		});
	});

}

// Updates views based upon menu input.
function menuHandlers () {

	views.on('menu: artists', function viewArtists () {
		models.artists().then(function (artists) {
			views.navList(artists, 'artist');
		});
	});

	views.on('menu: albums', function viewAlbums () {
		models.albums().then(function (albums) {
			views.navList(albums, 'album');
		});
	});

	views.on('menu: songs', function viewSongs () {
		models.songs().then(function (songs) {
			views.navList(songs, 'song');
		});
	});

}

// Opens and closes overlays based upon user input.
function overlayHandlers () {

	views.on('view-player', views.playerOverlay);
	views.on('close-player', views.closePlayer);
	views.on('view-menu', views.menuOverlay);

}

// Adds songs to playlist and plays them based upon user input.
function songHandlers () {

	views.on('play-song', function playSong (song) {
		console.log(song);
		models.addSongs([song._id], true);
	});

}

// Instantiates the app modules, and sets up handlers for user input.
function setup () {

	views = Views();
	models = Models();
	player = Player();

	playbackHandlers();
	viewHandlers();
	menuHandlers();
	overlayHandlers();
	songHandlers();

	views.emit('menu: artists');

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
