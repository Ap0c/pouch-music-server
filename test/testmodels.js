// ----- Requires ----- //

var Models = require('../js/models.js');
var PouchDB = require('pouchdb');


// ----- Setup ----- //

var songs = [
	{
		'_id': '1',
		'name': 'Space Oddity',
		'artist': 'David Bowie',
		'album': 'David Bowie',
		'number': 1
	},
	{
		'_id': '2',
		'name': 'Killer Queen',
		'artist': 'Queen',
		'album': 'Sheer Heart Attack',
		'number': 2
	},
	{
		'_id': '3',
		'name': 'Hysteria',
		'artist': 'Muse',
		'album': 'Absolution',
		'number': 8
	},
	{
		'_id': '4',
		'name': 'Money',
		'artist': 'Pink Floyd',
		'album': 'Dark Side of the Moon',
		'number': 6
	},
	{
		'_id': '5',
		'name': 'Fake Plastic Trees',
		'artist': 'Radiohead',
		'album': 'The Bends',
		'number': 4
	},
	{
		'_id': '6',
		'name': 'Californication',
		'artist': 'Red Hot Chili Peppers',
		'album': 'Californication',
		'number': 6
	},
	{
		'_id': '7',
		'name': 'Time Is Running Out',
		'artist': 'Muse',
		'album': 'Absolution',
		'number': 3
	}
];


// ----- Tests ----- //

describe('Tests the models module.', function () {

	before(function (done) {

		var musicDB = location.protocol + '//' + location.host + '/db/music-db';
		var music = new PouchDB(musicDB);

		music.bulkDocs(songs).then(function (result) {
			done();
		}).catch(done);

	});

	it('Should add songs to the playlist without errors.', function (done) {

		var models = Models();
		models.addSongs([1, 2, 3]).then(done).catch(done);

	});

	it('Should retrieve the list of songs up next.', function (done) {

		var models = Models();

		models.addSongs([1, 2, 3]).then(function () {

			var upNext = models.upNext();
			var expected = songs.slice(1, 3);

			expect(upNext).to.eql(expected);
			done();

		}).catch(done);

	});

	it('Should retrieve the currently playing song.', function (done) {

		var models = Models();
		models.addSongs([1, 2, 3]).then(function () {

			var nowPlaying = models.nowPlaying();
			expect(nowPlaying).to.eql(songs[0]);
			done();

		}).catch(done);

	});

	it('Should skip to the next song in the playlist.', function (done) {

		var models = Models();

		models.on('new-playing', function () {

			var nowPlaying = models.nowPlaying();
			var upNext = models.upNext();

			expect(nowPlaying).to.eql(songs[1]);
			expect(upNext).to.eql(songs.slice(2, 3));
			done();

		});

		models.addSongs([1, 2, 3]).then(function () {
			models.next();
		}).catch(done);

	});

	it('Should skip to the previous song in the playlist.', function (done) {

		var models = Models();

		models.addSongs([1, 2, 3]).then(function () {

			models.next();

			models.on('new-playing', function () {

				var nowPlaying = models.nowPlaying();
				var upNext = models.upNext();

				expect(nowPlaying).to.eql(songs[0]);
				expect(upNext).to.eql(songs.slice(1, 3));
				done();

			});

			models.prev();

		}).catch(done);

	});

	it('Should add multiple sets of songs to up next playlist.', function (done) {

		var models = Models();

		models.addSongs([1, 2, 3]).then(function () {

			models.addSongs([4, 5, 6, 7]).then(function () {

				var upNext = models.upNext();
				expect(upNext).to.eql(songs.slice(1));

				done();

			});

		}).catch(done);

	});

	it('Should clear the up next playlist and add new songs to it.', function (done) {

		var models = Models();

		models.addSongs([1, 2, 3]).then(function () {

			models.next();
			models.addSongs([4, 5, 6, 7], true).then(function () {

				var upNext = models.upNext();
				var nowPlaying = models.nowPlaying();

				expect(upNext).to.eql(songs.slice(4));
				expect(nowPlaying).to.eql(songs[3]);

				done();

			});

		}).catch(done);

	});

	it('Should produce null results when up next playlist reaches end', function (done) {

		var models = Models();

		models.addSongs([1]).then(function () {

			var upNext = models.upNext();
			expect(upNext).to.eql([]);

			models.next();
			upNext = models.upNext();
			var nowPlaying = models.nowPlaying();

			expect(upNext).to.eql([]);
			expect(nowPlaying).to.equal(null);

			done();

		}).catch(done);

	});

	it('Should produce a list of artists.', function (done) {

		var models = Models();
		var expectedArtists = ['David Bowie', 'Muse', 'Pink Floyd', 'Queen',
			'Radiohead', 'Red Hot Chili Peppers'];

		models.artists().then(function (result) {
			expect(result).to.eql(expectedArtists);
			done();
		}).catch(done);

	});

	it('Should produce a list of albums.', function (done) {

		var models = Models();
		var expectedAlbums = ['Absolution', 'Californication',
			'Dark Side of the Moon', 'David Bowie', 'Sheer Heart Attack',
			'The Bends'];

		models.albums().then(function (result) {
			expect(result).to.eql(expectedAlbums);
			done();
		}).catch(done);

	});

	it('Should retrieve information on a specific album.', function (done) {

		var models = Models();
		var songList = [{ _id: '7', name: 'Time Is Running Out', number: 3 },
			{ _id: '3', name: 'Hysteria', number: 8 }];

		models.album('Absolution').then(function (album) {

			expect(album.name).to.equal('Absolution');
			expect(album.songs.length).to.equal(2);
			expect(album.songs).to.eql(songList);

			done();

		}).catch(done);

	});

	it('Should retrieve information on a specific artist.', function (done) {

		var models = Models();
		var songList = [{ _id: '7', name: 'Time Is Running Out', number: 3 },
			{ _id: '3', name: 'Hysteria', number: 8 }];

		models.artist('Muse').then(function (artist) {

			expect(artist.name).to.equal('Muse');
			expect(artist.albums.length).to.equal(1);
			expect(artist.albums[0].name).to.equal('Absolution');
			expect(artist.albums[0].songs).to.eql(songList);

			done();

		}).catch(done);

	});

});
