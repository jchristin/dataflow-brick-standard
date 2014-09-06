/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Adder = require("../lib/adder"),
	Tester = require("../lib/tester");

describe("Adder", function () {
	it("should add two numbers", function (done) {
		var adder = new Adder();
		var tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(8);
			done();
		};

		dataflow.link(adder, "sum", tester, "test");

		adder.receive("set_right", 3);
		adder.receive("set_left", 5);
	});
});
