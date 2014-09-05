/* jshint expr: true */
/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Starter = require("../lib/starter"),
	Tester = require("../lib/tester");

describe("Starter", function () {
	it("should send a message on activate", function (done) {
		var starter = new Starter(),
			tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.true;
			done();
		};

		dataflow.link(starter, "start", tester, "test");
		dataflow.activate(starter, tester);
	});
});
