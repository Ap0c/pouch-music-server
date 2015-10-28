// ----- Requires ----- //

var Player = require('./player');
var Views = require('./views');
var Models = require('./models');


// ----- Functions ----- //

function setup () {

	console.log('DOM Ready');

	var views = Views();

	var current = {
		'_id': '1',
		'name': 'Space Oddity',
		'artist': 'David Bowie',
		'album': 'David Bowie',
		'number': 1
	};

	var upNext = [
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
		}
	];

	views.updateNowPlaying(current, upNext);
	views.playerOverlay();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
