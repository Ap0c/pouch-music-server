// ----- Requires ----- //

var Player = require('../js/player.js');


// ----- Tests ----- //

describe('Tests the player module', function () {

	it('should create a player object', function () {

		var player = Player();
		expect(player).to.have.property('play');

	});

});
