/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Comparer = require("../lib/comparer"),
	Tester = require("../lib/tester"),
	Killer = require("../lib/killer");

describe("Comparer", function () {
	it("should compare two numbers (lesser)", function (done) {
		var comparer = new Comparer(),
			tester = new Tester(),
			killer = new Killer();

		dataflow.link(comparer, "lesser", tester, "test");
		dataflow.link(comparer, "lesser_or_equal", tester, "test");
		dataflow.link(comparer, "equal", killer, "kill");
		dataflow.link(comparer, "greater_or_equal", killer, "kill");
		dataflow.link(comparer, "greater", killer, "kill");

		var callCount = 0;
		dataflow.testerDelegate = function (value) {
			value.should.be.equal(2);

			callCount++;
			if (callCount >= 2) {
				done();
			}
		};

		comparer.receive("set_right", 3);
		comparer.receive("set_left", 2);
	});

	it("should compare two numbers (equal)", function (done) {
		var comparer = new Comparer(),
			tester = new Tester(),
			killer = new Killer();

		dataflow.link(comparer, "lesser", killer, "kill");
		dataflow.link(comparer, "lesser_or_equal", tester, "test");
		dataflow.link(comparer, "equal", tester, "test");
		dataflow.link(comparer, "greater_or_equal", tester, "test");
		dataflow.link(comparer, "greater", killer, "kill");

		var callCount = 0;
		dataflow.testerDelegate = function (value) {
			value.should.be.equal(5);

			callCount++;
			if (callCount >= 3) {
				done();
			}
		};

		comparer.receive("set_right", 5);
		comparer.receive("set_left", 5);
	});

	it("should compare two numbers (greater)", function (done) {
		var comparer = new Comparer(),
			tester = new Tester(),
			killer = new Killer();

		dataflow.link(comparer, "lesser", killer, "kill");
		dataflow.link(comparer, "lesser_or_equal", killer, "kill");
		dataflow.link(comparer, "equal", killer, "kill");
		dataflow.link(comparer, "greater_or_equal", tester, "test");
		dataflow.link(comparer, "greater", tester, "test");

		var callCount = 0;
		dataflow.testerDelegate = function (value) {
			value.should.be.equal(8);

			callCount++;
			if (callCount >= 2) {
				done();
			}
		};

		comparer.receive("set_right", 5);
		comparer.receive("set_left", 8);
	});
});
