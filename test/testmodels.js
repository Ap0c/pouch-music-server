// ----- Requires ----- //

var Models = require('../js/models.js');


// ----- Tests ----- //

describe('Tests the models module.', function () {

	var models = Models();

	it('Should add songs to the playlist without errors', function () {

		models.addSongs([1, 2, 3]);

	});

	it('Should retrieve the list of songs up next', function () {

		var upNext = models.upNext();
		expect(upNext).to.eql([2, 3]);

	});

});
