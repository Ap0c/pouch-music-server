// ----- Requires ----- //

var fs = require('fs');
var plist = require('plist');
var PouchDB = require('pouchdb');


// ----- Functions ----- //

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
function songInfo (trackData) {

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

		var song = songInfo(tracks[track]);
		data.push(song);

	}

	return data;

}
