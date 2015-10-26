// ----- Requires ----- //

var Views = require('../js/views.js');


// ----- Setup ----- //

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


// ----- Tests ----- //

describe('Tests the views module.', function () {

	var views = Views();
	var nav = document.getElementById('navigator');
	var nowPlaying = document.getElementById('now-playing');

	afterEach(function () {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

	});

	it('Should create a new nav list with three elements.', function () {

		views.navList(['one', 'two', 'three']);
		var navList = nav.firstElementChild;

		// Checks that the list has been inserted correctly.
		expect(navList.tagName).to.equal('UL');
		expect(navList.firstElementChild.tagName).to.equal('LI');
		expect(navList.firstElementChild.textContent).to.equal('one');
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

		views.updateNowPlaying(testSong);

		var song = nowPlaying.querySelector('#now-playing-song');
		var artist = nowPlaying.querySelector('#now-playing-artist');
		var album = nowPlaying.querySelector('#now-playing-album');

		expect(song.textContent).to.equal('Song One');
		expect(artist.textContent).to.equal('Artist One');
		expect(album.textContent).to.equal('Album One');

	});

});
