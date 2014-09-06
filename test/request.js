/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	Request = require("../lib/request"),
	Tester = require("../lib/tester");

describe("Request", function () {
	it("should get url", function (done) {
		var request = new Request({
			url: "http://www.google.com"
		});
		var tester = new Tester();

		dataflow.testerDelegate = function (value) {
			done();
		};

		dataflow.link(request, "body", tester, "test");

		request.receive("get", true);
	});
});
