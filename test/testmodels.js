// ----- Requires ----- //

var Models = require('../js/models.js');


// ----- Tests ----- //

describe('Tests the models module.', function () {

	it('Should add songs to the playlist without errors', function () {

		var models = Models();
		models.addSongs([1, 2, 3]);

	});

	it('Should retrieve the list of songs up next', function () {

		var models = Models();
		models.addSongs([1, 2, 3]);

		var upNext = models.upNext();
		expect(upNext).to.eql([2, 3]);

	});

	it('Should retrieve the currently playing song', function () {

		var models = Models();
		models.addSongs([1, 2, 3]);

		var nowPlaying = models.nowPlaying();
		expect(nowPlaying).to.equal(1);

	});

	it('Should skip to the next song in the playlist', function (done) {

		var models = Models();
		models.addSongs([1, 2, 3]);

		models.on('new-playing', function () {

			var nowPlaying = models.nowPlaying();
			var upNext = models.upNext();

			expect(nowPlaying).to.equal(2);
			expect(upNext).to.eql([3]);
			done();

		});

		models.next();

	});

	it('Should skip to the previous song in the playlist', function (done) {

		var models = Models();
		models.addSongs([1, 2, 3]);
		models.next();

		models.on('new-playing', function () {

			var nowPlaying = models.nowPlaying();
			var upNext = models.upNext();

			expect(nowPlaying).to.equal(1);
			expect(upNext).to.eql([2, 3]);
			done();

		});

		models.prev();

	});

});
