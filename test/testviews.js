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


// ----- Tests ----- //

describe('Tests the views module.', function () {

	var views = Views();
	var nav = document.getElementById('navigator');

	afterEach(function () {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

	});

	it('Should create a new nav list with three elements.', function () {

		views.navList(['one', 'two', 'three']);
		var navList = nav.firstElementChild;

		expect(navList.tagName).to.equal('UL');
		expect(navList.firstElementChild.tagName).to.equal('LI');
		expect(navList.firstElementChild.textContent).to.equal('one');
		expect(navList.children.length).to.equal(3);

	});

	it('Should create an artist view with two albums.', function () {

		views.navArtist(testArtist);

		expect(nav.childElementCount).to.equal(4);
		expect(nav.children[0].tagName).to.equal('H2');
		expect(nav.children[0].textContent).to.equal('Artist One');
		expect(nav.children[1].classList[0]).to.equal('play-all');
		expect(nav.children[2].classList[0]).to.equal('add-all');
		expect(nav.children[3].classList[0]).to.equal('album-list');

		var albumList = nav.querySelector('.album-list');

		expect(albumList.childElementCount).to.equal(4);
		expect(albumList.children[0].classList[0]).to.equal('artist-album-name');
		expect(albumList.children[1].classList[0]).to.equal('album-songs');
		expect(albumList.children[2].classList[0]).to.equal('artist-album-name');
		expect(albumList.children[3].classList[0]).to.equal('album-songs');

		var firstAlbum = albumList.children[1];
		var secondAlbum = albumList.children[3];

		expect(firstAlbum.childElementCount).to.equal(3);
		expect(secondAlbum.childElementCount).to.equal(3);

	});

});
