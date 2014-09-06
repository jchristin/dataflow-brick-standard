/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Clock = require("../lib/clock"),
	Tester = require("../lib/tester");

describe("Clock", function () {
	it("should give the current hour", function (done) {
		var clock = new Clock(),
			tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(new Date().getHours());
			done();
		};

		dataflow.link(clock, "hours", tester, "test");

		clock.receive("get_time", true);
	});

	it("should give the current minute", function (done) {
		var clock = new Clock(),
			tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(new Date().getMinutes());
			done();
		};

		dataflow.link(clock, "minutes", tester, "test");

		clock.receive("get_time", true);
	});

	it("should give the current second", function (done) {
		var clock = new Clock(),
			tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(new Date().getSeconds());
			done();
		};

		dataflow.link(clock, "seconds", tester, "test");

		clock.receive("get_time", true);
	});
});