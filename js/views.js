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

	// Removes the contents of the nav area.
	function clearNav () {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

	}


	// ----- Exported Functions ----- //

	// Takes an array of items and displays them in the nav.
	views.navList = function navList (listItems) {

		var listTemplate = document.getElementById('nav-list-template');
		var listItemTemplate = document.getElementById('list-item-template');

		var list = listTemplate.content.querySelector('ul');

		for (var item of listItems) {

			var listItem = listItemTemplate.content.querySelector('li');
			listItem.textContent = item;

			var row = document.importNode(listItemTemplate.content, true);
			list.appendChild(row);

		}

		clearNav();
		var navContent = document.importNode(listTemplate.content, true);
		nav.appendChild(navContent);

	};

	// Takes an object with info about the artist and displays it in the nav.
	views.navArtist = function navArtist (artist) {

		var artistTemplate = document.getElementById('artist-template');
		var albumTemplate = document.getElementById('artist-album-template');
		var songTemplate = document.getElementById('album-song-template');

		var artistNode = document.importNode(artistTemplate.content, true);

		var artistName = artistNode.querySelector('.artist-name');
		artistName.textContent = artist.name;

		var albumList = artistNode.querySelector('.album-list');

		for (var album of artist.albums) {

			var albumNode = document.importNode(albumTemplate.content, true);

			var albumName = albumNode.querySelector('.artist-album-name');
			albumName.textContent = album.name;

			var songList = albumNode.querySelector('.album-songs');
			console.log(songList);

			for (var song of album.songs) {

				var songName = songTemplate.content.querySelector('.album-song');
				songName.textContent = song.name;
				songName.value = song.number;

				var songNode = document.importNode(songTemplate.content, true);
				console.log(songNode);
				songList.appendChild(songNode);

			}

			albumList.appendChild(albumNode);

		}

		clearNav();
		nav.appendChild(artistNode);

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
