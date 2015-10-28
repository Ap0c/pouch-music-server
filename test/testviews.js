// ----- Requires ----- //

var Views = require('../js/views.js');


// ----- Setup ----- //

var testList = [
	{ name: 'Artist One' },
	{ name: 'Artist Two' },
	{ name: 'Artist Three' }
];

var testArtist = {
	name: 'Artist One',
	albums: [
		{
			name: 'Album One',
			songs: [
				{ id: 'one', name: 'Song One', number: 1 },
				{ id: 'two', name: 'Song Two', number: 2 },
				{ id: 'three', name: 'Song Three', number: 3 }
			]
		},
		{
			name: 'Album Two',
			songs: [
				{ id: 'four', name: 'Song Four', number: 4 },
				{ id: 'five', name: 'Song Five', number: 5 },
				{ id: 'six', name: 'Song Six', number: 6 }
			]
		}
	],
};

var testAlbum = {
	name: 'Album One',
	songs: [
		{ id: 'one', name: 'Song One', number: 1 },
		{ id: 'two', name: 'Song Two', number: 2 },
		{ id: 'three', name: 'Song Three', number: 3 }
	]
};

var testSong = {
	name: 'Song One',
	artist: 'Artist One',
	album: 'Album One'
};

var testUpNext = [
	{ 'name': 'Song One' },
	{ 'name': 'Song Two' },
	{ 'name': 'Song Three' }
];


// ----- Tests ----- //

describe('Tests the views module.', function () {

	var views = Views();
	var nav = document.getElementById('navigator');
	var nowPlaying = document.getElementById('now-playing');
	var menu = document.getElementById('menu-overlay');
	var player = document.getElementById('player-overlay');

	afterEach(function () {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

		if (menu.open) {
			menu.close();
		}

		if (player.open) {
			player.close();
		}

	});

	it('Should create a new nav list with three elements.', function () {

		views.navList(testList, 'artist');
		var navList = nav.firstElementChild;

		// Checks that the list has been inserted correctly.
		expect(navList.tagName).to.equal('UL');
		expect(navList.firstElementChild.tagName).to.equal('LI');
		expect(navList.firstElementChild.textContent).to.equal('Artist One');
		expect(navList.children.length).to.equal(3);

	});

	it('Should create an artist view with two albums.', function () {

		views.navArtist(testArtist);

		expect(nav.childElementCount).to.equal(5);
		expect(nav.children[0].tagName).to.equal('BUTTON');
		expect(nav.children[1].tagName).to.equal('H2');
		expect(nav.children[1].textContent).to.equal('Artist One');
		expect(nav.children[2].classList[0]).to.equal('play-all');
		expect(nav.children[3].classList[0]).to.equal('add-all');
		expect(nav.children[4].classList[0]).to.equal('album-list');

	});

	it('Should display the albums correctly in the artist view.', function () {

		views.navArtist(testArtist);

		var albumList = nav.querySelector('.album-list');

		expect(albumList.childElementCount).to.equal(4);
		expect(albumList.children[0].textContent).to.equal('Album One');
		expect(albumList.children[0].classList[0]).to.equal('artist-album-name');
		expect(albumList.children[1].classList[0]).to.equal('album-songs');
		expect(albumList.children[2].textContent).to.equal('Album Two');
		expect(albumList.children[2].classList[0]).to.equal('artist-album-name');
		expect(albumList.children[3].classList[0]).to.equal('album-songs');

	});

	it('Should display the songs correctly in the artist view.', function () {

		views.navArtist(testArtist);

		var firstAlbum = nav.querySelector('.album-list').children[1];
		var secondAlbum = nav.querySelector('.album-list').children[3];

		expect(firstAlbum.childElementCount).to.equal(3);
		expect(secondAlbum.childElementCount).to.equal(3);

		var firstSong = firstAlbum.children[0];

		expect(firstSong.childElementCount).to.equal(2);
		expect(firstSong.children[0].classList[0]).to.equal('song-name');
		expect(firstSong.children[1].classList[0]).to.equal('add-song');

	});

	it('Should create a new album view with three songs.', function () {

		views.navAlbum(testAlbum);

		expect(nav.childElementCount).to.equal(5);
		expect(nav.children[0].tagName).to.equal('BUTTON');
		expect(nav.children[1].tagName).to.equal('H2');
		expect(nav.children[1].textContent).to.equal('Album One');
		expect(nav.children[2].classList[0]).to.equal('play-all');
		expect(nav.children[3].classList[0]).to.equal('add-all');
		expect(nav.children[4].classList[0]).to.equal('album-songs');

	});

	it('Should display the songs correctly in the album view.', function () {

		views.navAlbum(testAlbum);

		var songList = nav.querySelector('.album-songs');
		expect(songList.childElementCount).to.equal(3);

		var firstSong = songList.children[0];

		expect(firstSong.childElementCount).to.equal(2);
		expect(firstSong.children[0].classList[0]).to.equal('song-name');
		expect(firstSong.children[1].classList[0]).to.equal('add-song');

	});

	it('Should update the now playing information.', function () {

		views.updateNowPlaying(testSong, []);

		var song = nowPlaying.querySelector('.now-playing-song');
		var artist = nowPlaying.querySelector('.now-playing-artist');
		var album = nowPlaying.querySelector('.now-playing-album');

		expect(song.textContent).to.equal('Song One');
		expect(artist.textContent).to.equal('Artist One');
		expect(album.textContent).to.equal('Album One');

	});

	it('Should open the menu dialog.', function () {

		expect(menu.open).to.be.false;

		views.menuOverlay();
		expect(menu.open).to.be.true;

	});

	it('Should close the menu dialog.', function () {

		views.menuOverlay();
		expect(menu.open).to.be.true;

		views.closeMenu();
		expect(menu.open).to.false;

	});

	it('Should open the player dialog.', function () {

		expect(player.open).to.be.false;

		views.playerOverlay();
		expect(player.open).to.be.true;

	});

	it('Should close the player dialog.', function () {

		views.playerOverlay();
		expect(player.open).to.be.true;

		views.closePlayer();
		expect(player.open).to.false;

	});

	it('Should update now playing in player overlay.', function () {

		var songName = player.querySelector('.now-playing-song');
		var songArtist = player.querySelector('.now-playing-artist');
		var songAlbum = player.querySelector('.now-playing-album');

		views.updateNowPlaying(testSong, []);

		expect(songName.textContent).to.equal('Song One');
		expect(songArtist.textContent).to.equal('Artist One');
		expect(songAlbum.textContent).to.equal('Album One');

	});

	it('Should update up next in player overlay.', function () {

		views.updateNowPlaying(testSong, testUpNext);

		var upNext = document.getElementById('up-next');
		var songList = upNext.querySelectorAll('li');

		expect(songList[0].textContent).to.equal('Song One');
		expect(songList[1].textContent).to.equal('Song Two');
		expect(songList[2].textContent).to.equal('Song Three');

	});

	it('Should emit play event on play click.', function (done) {

		var playButton = document.getElementById('play');

		views.on('play', function playClicked () {
			done();
		});

		playButton.click();

	});

	it('Should emit play event on overlay play click.', function (done) {

		var overlayPlayButton = document.getElementById('overlay-play');

		views.on('play', function overlayPlayClicked () {
			done();
		});

		overlayPlayButton.click();

	});

	it('Should emit pause event on pause click.', function (done) {

		var pauseButton = document.getElementById('pause');

		views.on('pause', function pauseClicked () {
			done();
		});

		pauseButton.click();

	});

	it('Should emit pause event on overlay pause click.', function (done) {

		var overlayPauseButton = document.getElementById('overlay-pause');

		views.on('pause', function overlayPauseClicked () {
			done();
		});

		overlayPauseButton.click();

	});

	it('Should emit previous event on previous click.', function (done) {

		var previousButton = document.getElementById('previous');

		views.on('previous', function previousClicked () {
			done();
		});

		previousButton.click();

	});

	it('Should emit next event on next click.', function (done) {

		var nextButton = document.getElementById('next');

		views.on('next', function nextClicked () {
			done();
		});

		nextButton.click();

	});

	it('Should emit choose-lib event on menu click.', function (done) {

		var chooseLib = document.getElementById('choose-library');

		views.on('menu: choose-lib', function menuClicked () {
			done();
		});

		chooseLib.click();

	});

	it('Should emit artists event on menu click.', function (done) {

		var viewArtists = document.getElementById('view-artists');

		views.on('menu: artists', function menuClicked () {
			done();
		});

		viewArtists.click();

	});

	it('Should emit albums event on menu click.', function (done) {

		var viewAlbums = document.getElementById('view-albums');

		views.on('menu: albums', function menuClicked () {
			done();
		});

		viewAlbums.click();

	});

	it('Should emit songs event on menu click.', function (done) {

		var viewSongs = document.getElementById('view-songs');

		views.on('menu: songs', function menuClicked () {
			done();
		});

		viewSongs.click();

	});

});
