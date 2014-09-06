/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Multiplier = require("../lib/multiplier"),
	Tester = require("../lib/tester");

describe("Multiplier", function () {
	it("should multiply two numbers", function (done) {
		var multiplier = new Multiplier();
		var tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(15);
			done();
		};

		dataflow.link(multiplier, "product", tester, "test");

		multiplier.receive("set_right", 3);
		multiplier.receive("set_left", 5);
	});
});
