/* global describe, it */

"use strict";

var Multiplier = require("../lib/multiplier"),
	Tester = require("../lib/tester");

describe("Multiplier", function() {
	it("should multiply two numbers", function(done) {
		var multiplier = new Multiplier();
		var tester = new Tester({
			delegate: function(value) {
				value.should.be.equal(15);
				done();
			}
		});

		multiplier.link("product").to(tester, "test");
		multiplier.receive("set_right", 3);
		multiplier.receive("set_left", 5);
	});
});
