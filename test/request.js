/* global describe, it */

"use strict";

var Request = require("../lib/request"),
	InputPort = require("dataflow").InputPort;

describe("Request", function() {
	it("should get url", function(done) {
		var request = new Request(),
			inputPort = new InputPort(function(packet) {
				done();
			});

		request.outputs.response.pipe(inputPort);
		request.inputs.url.pushData("http://www.google.com");
	});
});
