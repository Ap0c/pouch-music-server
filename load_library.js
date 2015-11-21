// ----- Requires ----- //

var fs = require('fs');
var path = require('path');
var plist = require('plist');
var PouchDB = require('pouchdb');


// ----- Functions ----- //

// Checks that the iTunes library and media directory exist.
function checkLocations (libraryLocation, mediaLocation) {

	var libraryExists = fs.statSync(libraryLocation).isFile();
	var mediaExists = fs.statSync(mediaLocation).isDirectory();

	if (!libraryExists) {
		console.log('The iTunes library file does not appear to exist.');
		return false;
	}

	if (!mediaExists) {
		console.log('The media directory does not appear to exist.');
		return false;
	}

	return true;

}

// Checks that the command line arguments given are valid.
function checkArgs (libraryLocation, mediaLocation) {

	if (!libraryLocation) {
		console.log('Please supply the location of the iTunes library as the first argument.');
		return false;
	}

	if (!mediaLocation) {
		console.log('Please supply the location of the media as the second argument.');
		return false;
	}

	return checkLocations(libraryLocation, mediaLocation);

}

// Reads and returns a list of tracks from an iTunes library file.
function getTracks (libraryLocation) {

	try {

		var library = plist.parse(fs.readFileSync(libraryLocation, 'utf8'));

		var tracks = library.Tracks;
		return tracks;

	} catch (err) {
		return null;
	}

}

// Returns an object containing song info for a given track.
function songInfo (song) {

	return {

		_id: song['Track ID'].toString() || null,
		name: song.Name || null,
		artist: song.Artist || null,
		album: song.Album || null,
		number: song['Track Number'] || null,
		path: song.Location ? song.Location.split('iTunes%20Media')[1] : null

	};

}

// Formats the data stored in the iTunes tracks, ready for database insertion.
function songData (tracks) {

	var data = [];

	for (var track in tracks) {

		if (tracks[track].Kind && tracks[track].Kind.includes('audio file')) {

			var song = songInfo(tracks[track]);
			data.push(song);

		}

	}

	return data;

}

// Inputs the track data into the database.
function inputData (data, dbLocation) {

	var musicDB = PouchDB.defaults({prefix: path.join(dbLocation, 'musicdb')});
	var db = new musicDB('music-db');
	console.log(data);

	db.bulkDocs(data).then(function inputFinished () {

		console.log('iTunes library stored successfully.');

	}).catch(function inputError (err) {

		console.log('There was a problem storing the iTunes data.');

	});

}


// ----- Main ----- //

var dbLocation = process.argv[2];
var libraryLocation = process.argv[3];
var mediaLocation = process.argv[4];

if (checkArgs(libraryLocation, mediaLocation)) {

	fs.symlinkSync(mediaLocation, path.join(dbLocation, 'static/media'));

	var tracks = getTracks(libraryLocation);

	if (tracks) {

		var songs = songData(tracks);
		inputData(songs, dbLocation);

	} else {
		console.log('iTunes Library data appears to be invalid.');
	}

}
