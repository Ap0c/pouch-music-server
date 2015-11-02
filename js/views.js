// ----- Requires ----- //

var EventEmitter = require('events');


// ----- Exports ----- //

module.exports = function Views () {

	// ----- Internal Properties ----- //

	// Types available for the list view, and corresponding click events.
	var listEvents = {
		artist: 'view-artist',
		album: 'view-album',
		song: 'play-song'
	};


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
	menuEvents();


	// ----- Functions ----- //

	// Sets up playback button events.
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

	// Sets up menu selection events.
	function menuEvents () {

		var chooseLibrary = document.getElementById('choose-library');
		var viewArtists = document.getElementById('view-artists');
		var viewAlbums = document.getElementById('view-albums');
		var viewSongs = document.getElementById('view-songs');

		chooseLibrary.addEventListener('click', emitEvent('menu: choose-lib'));
		viewArtists.addEventListener('click', emitEvent('menu: artists'));
		viewAlbums.addEventListener('click', emitEvent('menu: albums'));
		viewSongs.addEventListener('click', emitEvent('menu: songs'));

	}

	// Creates a function to emit a view event.
	function emitEvent (eventName, data) {

		return function viewsEmit () {
			views.emit(eventName, data);
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

	// Retrieves the event fired on click for a given type of list.
	function listClickEvent (listType) {

		if (listType in listEvents) {
			return listEvents[listType];
		} else {
			throw new Error('Unrecognised list type: ' + listType);
		}

	}

	// Creates an item in the list view, including click event listener.
	function createListItem (info, viewEvent) {

		var listItemTemplate = importTemplate('list-item-template');
		var listItem = listItemTemplate.querySelector('li');

		listItem.textContent = info.name;
		listItem.addEventListener('click', emitEvent(viewEvent, info));

		return listItem;

	}

	// Sets up the click events for the artist view.
	function artistEvents (template, artist) {

		var plyAll = template.querySelector('.play-all');
		plyAll.addEventListener('click', emitEvent('artist: play-all', artist));

		var addAll = template.querySelector('.add-all');
		addAll.addEventListener('click', emitEvent('artist: add-all', artist));

		var back = template.querySelector('.back-button');
		back.addEventListener('click', emitEvent('menu: artists'));

	}

	// Sets up the click events for the album view.
	function albumEvents (template, album, artist) {

		var plyAll = template.querySelector('.play-all');
		plyAll.addEventListener('click', emitEvent('album: play-all', album));

		var addAll = template.querySelector('.add-all');
		addAll.addEventListener('click', emitEvent('album: add-all', album));

		var back = template.querySelector('.back-button');

		// Returns either to artist view or album list view.
		if (artist) {
			back.addEventListener('click', emitEvent('view-artist', artist));
		} else {
			back.addEventListener('click', emitEvent('menu: albums'));
		}

	}


	// ----- Exported Functions ----- //

	// Takes an array of items and displays them in the nav.
	views.navList = function navList (listItems, listType) {

		var clickEvent = listClickEvent(listType);

		var listTemplate = importTemplate('nav-list-template');
		var list = listTemplate.querySelector('ul');

		for (var item of listItems) {

			var listItem = createListItem(item, clickEvent);
			list.appendChild(listItem);

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

		artistEvents(artistTemplate, artist);
		updateNav(artistTemplate);

	};

	// Takes an object with info about an album and displays it in the nav.
	views.navAlbum = function navAlbum (album, artist) {

		var albumTemplate = importTemplate('album-template');

		var albumName = albumTemplate.querySelector('.album-name');
		albumName.textContent = album.name;

		var songList = albumTemplate.querySelector('.album-songs');
		populateSongs(album.songs, songList);

		albumEvents(albumTemplate, album, artist);
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
