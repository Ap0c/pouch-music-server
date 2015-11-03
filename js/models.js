// ----- Requires ----- //

var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var EventEmitter = require('events');


// ----- Module Exports ----- //

module.exports = function Models () {

	// ----- Setup ----- //

	var musicDB = location.protocol + '//' + location.host + '/db/music-db';
	var music = new PouchDB(musicDB);
	var upNext = [];
	var nowPlaying = 0;

	var models = new EventEmitter();


	// ----- Functions ----- //

	// Adds the collection of songs from the database to the up next playlist.
	function addSongsResult (result, clear) {

		if (clear) {
			upNext = [];
			nowPlaying = 0;
		}

		for (var row of result.rows) {
			delete row.doc._rev;
			upNext.push(row.doc);
		}

	}

	// Creates an array with just artist/album names from a db query.
	function reduceNames (docset, field) {

		var names = docset.filter(function removeDupes (doc, index, docs) {

			var prevDoc = docs[index - 1];
			return prevDoc ? doc[field] !== prevDoc[field] : true;

		}).map(function retrieveField (doc) {
			return doc[field];
		});

		return names;

	}

	// Sorts songs by the number field, needed due to sort-selector restriction.
	function sortSongs (songs) {

		return songs.sort(function compare (a, b) {

			if (a.number > b.number) {
				return 1;
			} else if (a.number < b.number) {
				return -1;
			}

			return 0;

		});

	}

	// Sorts an object of albums into the format required for return.
	function formatAlbums (albumSet) {

		var albums = [];

		for (var album in albumSet) {

			var songs = sortSongs(albumSet[album]);

			albums.push({ name: album, songs: songs });

		}

		return albums;

	}

	// Sorts the songs into an array of albums.
	function sortAlbums (docset) {

		var albums = {};

		docset.forEach(function (doc, index, docs) {

			var album = doc.album;
			delete doc.album;

			if (albums[album]) {
				albums[album].push(doc);
			} else {
				albums[album] = [doc];
			}

		});

		return formatAlbums(albums);

	}


	// ----- Exports ----- //

	// Moves to next song in up next playlist, or null. Also fires 'new-playing'
	// event and updates current song.
	models.next = function next () {

		if (nowPlaying < upNext.length) {

			nowPlaying += 1;

			if (nowPlaying < upNext.length) {
				models.emit('new-playing', upNext[nowPlaying]);
			}

		}

	};

	// Moves to previous song in up next playlist, or null. Also fires
	// 'new-playing' event and updates current song.
	models.prev = function prev () {

		if (nowPlaying > 0) {

			nowPlaying -= 1;
			models.emit('new-playing', upNext[nowPlaying]);

		}

	};

	// Returns a list of songs in the up next playlist.
	models.upNext = function upComing () {

		return upNext.slice(nowPlaying + 1);

	};

	// Returns the currently playing song.
	models.nowPlaying = function currentlyPlaying () {

		if (nowPlaying < upNext.length) {
			return upNext[nowPlaying];
		} else {
			return null;
		}

	};

	// Adds songs to the up next playlist, if clear is true, empties it first.
	models.addSongs = function addSongs (songs, clear) {

		return new Promise(function (resolve, reject) {

			music.allDocs({

				keys: songs,
				include_docs: true

			}).then(function (result) {

				addSongsResult(result, clear);
				resolve();

			}).catch(function (err) {
				reject(err);
			});

		});

	};

	// Returns a list of artists.
	models.artists = function artists () {

		return new Promise(function (resolve, reject) {

			music.createIndex({
				index: {fields: ['artist']}
			}).then(function () {

				music.find({
					selector: {artist: {$exists: true}},
					fields: ['artist'],
					sort: ['artist']
				}).then(function (result) {
					resolve(reduceNames(result.docs, 'artist'));
				}).catch(reject);

			}).catch(reject);

		});

	};

	// Returns a list of albums.
	models.albums = function albums () {

		return new Promise(function (resolve, reject) {

			music.createIndex({
				index: {fields: ['album']}
			}).then(function (results) {

				music.find({
					selector: {album: {$exists: true}},
					fields: ['album'],
					sort: ['album']
				}).then(function (result) {
					resolve(reduceNames(result.docs, 'album'));
				}).catch(reject);

			}).catch(reject);

		});

	};

	// Retrieves all available data on an artist.
	models.artist = function artist (name) {

		return new Promise(function (resolve, reject) {

			music.createIndex({
				index: {fields: ['artist']}
			}).then(function () {

				music.find({
					selector: {artist: name},
					fields: ['_id', 'name', 'number', 'album']
				}).then(function (result) {

					var albums = sortAlbums(result.docs);

					resolve({
						name: name,
						albums: albums
					});

				}).catch(reject);

			});

		});

	};

	// Retrieves all available data on an album.
	models.album = function album (name) {

		return new Promise(function (resolve, reject) {

			music.createIndex({
				index: {fields: ['album']}
			}).then(function () {

				music.find({
					selector: {album: name},
					fields: ['_id', 'name', 'number']
				}).then(function (result) {

					var songs = sortSongs(result.docs);

					resolve({
						name: name,
						songs: songs
					});

				}).catch(reject);

			}).catch(reject);

		});

	};


	// ----- Exports ----- //

	return models;

};
