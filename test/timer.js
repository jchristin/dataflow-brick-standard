/* jshint expr: true */
/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Timer = require("../lib/timer"),
	Tester = require("../lib/tester");

describe("Timer", function () {
	it("should tick on activate", function (done) {
		var timer = new Timer(),
			tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.true;
			done();
		};

		dataflow.link(timer, "tick", tester, "test");
		dataflow.activate(timer, tester);
	});
});
