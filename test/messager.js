/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Messager = require("../lib/messager.js"),
	Tester = require("../lib/tester.js");

describe("Messager", function () {
	it("should send its value", function (done) {
		var messager = new Messager({
			message: 45
		});
		var tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal(45);
			done();
		};

		dataflow.link(messager, "message", tester, "test");

		messager.receive("send", true);
	});
});
