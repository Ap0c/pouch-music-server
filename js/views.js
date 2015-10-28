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

	var views = new EventEmitter();

	dialogPolyfill.registerDialog(menu);
	menu.addEventListener('click', closeDialog);
	dialogPolyfill.registerDialog(player);

	var playerClose = document.getElementById('close-player-overlay');
	playerClose.addEventListener('click', function closePlayer () {
		player.close();
	});


	// ----- Functions ----- //

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
	views.playerOverlay = function playerOverlay (current, upNext) {
		player.showModal();
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

		var songName = nowPlaying.querySelector('#now-playing-song');
		var songArtist = nowPlaying.querySelector('#now-playing-artist');
		var songAlbum = nowPlaying.querySelector('#now-playing-album');

		songName.textContent = song.name;
		songArtist.textContent = song.artist;
		songAlbum.textContent = song.album;

	};


	// ----- Constructor ----- //

	return views;

};
