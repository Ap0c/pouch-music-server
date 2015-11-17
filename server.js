// ----- Requires ----- //

var express = require('express');
var PouchDB = require('pouchdb');
var expressPouchDB = require('express-pouchdb');


// ----- Setup ----- //

var app = express();
var musicDB = PouchDB.defaults({prefix: 'musicdb/'});
app.use('/db', expressPouchDB(musicDB));
app.use('/static', express.static('static'));


// ----- Routes ----- //

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


// ----- Launch Server ----- //

var server = app.listen(3000, function () {
	console.log('Server started...');
});
