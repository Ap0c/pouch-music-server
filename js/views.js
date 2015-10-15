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

		var navContent = new DocumentFragment();
		var listTemplate = document.getElementById('list-item');

		var unorderedList = document.createElement('ul');
		navContent.appendChild(unorderedList);

		for (var item of listItems) {

			var listItem = listTemplate.content.querySelector('li');
			listItem.textContent = item;

			var row = document.importNode(listTemplate.content, true);
			unorderedList.appendChild(row);

		}

		clearNav();
		nav.appendChild(navContent);

	};

	views.navArtist = function navArtist (artist) {

		// Display artist view.

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
