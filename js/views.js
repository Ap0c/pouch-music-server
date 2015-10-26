// ----- Requires ----- //

var EventEmitter = require('events');


// ----- Exports ----- //

module.exports = function Views () {

	// ----- Setup ----- //

	var views = new EventEmitter();


	// ----- DOM Objects ----- //

	var nav = document.getElementById('navigator');
	var nowPlaying = document.getElementById('now-playing');


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

	// Takes an object with info about the artist and displays it in the nav.
	views.navArtist = function navArtist (artist) {

		var artistTemplate = importTemplate('artist-template');

		var artistName = artistTemplate.querySelector('.artist-name');
		artistName.textContent = artist.name;

		var albumList = artistTemplate.querySelector('.album-list');

		for (var album of artist.albums) {

			var albumTemplate = importTemplate('artist-album-template');

			var albumName = albumTemplate.querySelector('.artist-album-name');
			albumName.textContent = album.name;

			var songList = albumTemplate.querySelector('.album-songs');

			for (var song of album.songs) {

				var songTemplate = importTemplate('album-song-template');
				var songName = songTemplate.querySelector('.album-song');

				songName.textContent = song.name;
				songName.value = song.number;

				songList.appendChild(songTemplate);

			}

			albumList.appendChild(albumTemplate);

		}

		updateNav(artistTemplate);

	};

	views.navAlbum = function navAlbum (album) {

		// Display album view.

	};

	views.playerOverlay = function playerOverlay () {

		// Bring up player overlay.

	};

	views.menuOverlay = function menuOverlay () {

		// Bring up menu overlay.

	};

	views.updateNowPlaying = function updateNowPlaying (song, upNext) {

		// Update song information in now playing bar and player overlay.

	};


	// ----- Constructor ----- //

	return views;

};
