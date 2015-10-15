// ----- Requires ----- //

var Player = require('../js/player.js');


// ----- Tests ----- //

describe('Tests the player module.', function () {

	var player = Player();

	it('Should create a player object.', function () {

		expect(player).to.have.property('play');
		expect(player).to.have.property('pause');
		expect(player).to.have.property('newSong');

	});

	it('Should load a new song.', function () {

		player.newSong('../media/Greensleeves.mp3');

	});

	it('Should play and pause media without error.', function () {

		player.play();
		player.pause();

	});

	it('Should emit the songended event', function (done) {

		player.newSong('../media/Greensleeves-short.m4a');

		player.on('songended', function () {
			done();
		});

		player.play();

	});

});
