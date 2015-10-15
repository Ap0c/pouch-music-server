// ----- Requires ----- //

var Views = require('../js/views.js');


// ----- Tests ----- //

describe('Tests the views module.', function () {

	var views = Views();
	var nav = document.getElementById('navigator');

	afterEach(function () {

		while (nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}

	});

	it('Should create a new nav list with three elements.', function () {

		views.navList(['one', 'two', 'three']);
		var navList = nav.firstElementChild;

		expect(navList.tagName).to.equal('UL');
		expect(navList.firstElementChild.tagName).to.equal('LI');
		expect(navList.firstElementChild.textContent).to.equal('one');
		expect(navList.children.length).to.equal(3);

	});

});
