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

