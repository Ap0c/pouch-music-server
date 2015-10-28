// ----- Requires ----- //

var EventEmitter = require('events');


// ----- Exports ----- //

module.exports = function Views () {

	// ----- DOM Objects ----- //

	var nav = document.getElementById('navigator');
	var nowPlaying = document.getElementById('now-playing');
	var menu = document.getElementById('menu-overlay');
	var player = document.getElementById('player-overlay');


	// ----- Setup ----- //

	// Allows the views object to emit events.
	var views = new EventEmitter();

	// Sets up dialog polyfills.
	dialogPolyfill.registerDialog(menu);
	menu.addEventListener('click', closeDialog);
	dialogPolyfill.registerDialog(player);

	// Sets up view event emitters.
	playbackEvents();


	// ----- Functions ----- //

	// Sets up player button events.
	function playbackEvents () {

		var play = document.getElementById('play');
		var overlayPlay = document.getElementById('overlay-play');
		var pause = document.getElementById('pause');
		var overlayPause = document.getElementById('overlay-pause');
		var previous = document.getElementById('previous');
		var next = document.getElementById('next');

		play.addEventListener('click', emitEvent('play'));
		overlayPlay.addEventListener('click', emitEvent('play'));
		pause.addEventListener('click', emitEvent('pause'));
		overlayPause.addEventListener('click', emitEvent('pause'));
		previous.addEventListener('click', emitEvent('previous'));
		next.addEventListener('click', emitEvent('next'));

	}

	// Creates a function to emit a view event.
	function emitEvent (eventName) {

		return function viewsEmit () {
			views.emit(eventName);
		};

	}

	// Removes the contents of the nav area and replaces with new content.
	function updateNav (newContent) {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

		nav.appendChild(newContent);

	}

	// Imports a template into the document and returns the resulting node.
	function importTemplate(templateID) {

		var template = document.getElementById(templateID);
		var templateNode = document.importNode(template.content, true);

		return templateNode;

	}

	// Fills out a list of songs within an album view.
	function populateSongs (songs, list) {

		for (var song of songs) {

			var songTemplate = importTemplate('album-song-template');

			songTemplate.querySelector('.song-name').textContent = song.name;
			songTemplate.querySelector('.album-song').value = song.number;

			list.appendChild(songTemplate);

		}

	}

	// Fills out a list of albums within an artist view.
	function populateAlbums (albums, list) {

		for (var album of albums) {

			var albumTemplate = importTemplate('artist-album-template');

			var albumName = albumTemplate.querySelector('.artist-album-name');
			albumName.textContent = album.name;

			var songList = albumTemplate.querySelector('.album-songs');
			populateSongs(album.songs, songList);

			list.appendChild(albumTemplate);

		}

	}

	// Checks if the user clicks outside a dialog, and closes it if so.
	function closeDialog (click) {

		var area = click.target.getBoundingClientRect();
		var outsideDialog = area.top > click.clientY ||
			area.bottom < click.clientY || area.left > click.clientX ||
			area.right < click.clientX;

		if (outsideDialog) {
			click.target.close();
		}

	}

	// Clears the list of songs up next in the player overlay.
	function clearUpNext (upNext) {

		while (upNext.firstChild) {
			upNext.removeChild(upNext.firstChild);
		}

	}

	// Displays the list of songs up next in the player overlay.
	function listUpNext (songs) {

		var upNext = document.getElementById('up-next');
		var list = document.createDocumentFragment();

		for (var song of songs) {

			var listItemTemplate = importTemplate('player-upnext-template');
			var listItem = listItemTemplate.querySelector('li');

			listItem.textContent = song.name;
			list.appendChild(listItem);

		}

		clearUpNext(upNext);
		upNext.appendChild(list);

	}


	// ----- Exported Functions ----- //

	// Takes an array of items and displays them in the nav.
	views.navList = function navList (listItems) {

		var listTemplate = importTemplate('nav-list-template');
		var list = listTemplate.querySelector('ul');

		for (var item of listItems) {

			var listItemTemplate = importTemplate('list-item-template');
			var listItem = listItemTemplate.querySelector('li');
			listItem.textContent = item;

			list.appendChild(listItemTemplate);

		}

		updateNav(listTemplate);

	};

	// Takes an object with info about an artist and displays it in the nav.
	views.navArtist = function navArtist (artist) {

		var artistTemplate = importTemplate('artist-template');

		var artistName = artistTemplate.querySelector('.artist-name');
		artistName.textContent = artist.name;

		var albumList = artistTemplate.querySelector('.album-list');
		populateAlbums(artist.albums, albumList);

		updateNav(artistTemplate);

	};

	// Takes an object with info about an album and displays it in the nav.
	views.navAlbum = function navAlbum (album) {

		var albumTemplate = importTemplate('album-template');

		var albumName = albumTemplate.querySelector('.album-name');
		albumName.textContent = album.name;

		var songList = albumTemplate.querySelector('.album-songs');
		populateSongs(album.songs, songList);

		updateNav(albumTemplate);

	};

	// Brings up the player overlay.
	views.playerOverlay = function playerOverlay () {
		player.showModal();
	};

	// Closes the player overlay.
	views.closePlayer = function closePlayer () {
		player.close();
	};

	// Brings up the menu overlay.
	views.menuOverlay = function menuOverlay () {
		menu.showModal();
	};

	// Closes the menu overlay.
	views.closeMenu = function closeMenu () {
		menu.close();
	};

	// Updates song information in now playing bar and player overlay.
	views.updateNowPlaying = function updateNowPlaying (song, upNext) {

		var songName = document.querySelectorAll('.now-playing-song');
		var songArtist = document.querySelectorAll('.now-playing-artist');
		var songAlbum = document.querySelectorAll('.now-playing-album');

		for (var i = songName.length - 1; i >= 0; i--) {
			songName[i].textContent = song.name;
		}

		for (var j = songArtist.length - 1; j >= 0; j--) {
			songArtist[j].textContent = song.artist;
		}

		for (var k = songAlbum.length - 1; k >= 0; k--) {
			songAlbum[k].textContent = song.album;
		}

		listUpNext(upNext);

	};


	// ----- Constructor ----- //

	return views;

};
