/* global describe, it */

"use strict";

var Composer = require("../lib/composer"),
	Tester = require("../lib/tester");

describe("Composer", function() {
	it("should compose an object", function(done) {
		var composer = new Composer({
				key: "a"
			}),
			tester = new Tester({
				delegate: function(value) {
					value.should.have.properties({
						a: "v"
					});
					done();
				}
			});

		composer.link("object").to(tester, "test");
		composer.receive("set_value", "v");
	});
});
