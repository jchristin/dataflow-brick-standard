/* global describe, it */

"use strict";

var Request = require("../lib/request"),
	Tester = require("../lib/tester");

describe("Request", function() {
	it("should get url", function(done) {
		var request = new Request({
				url: "http://www.google.com"
			}),
			tester = new Tester({
				delegate: function(value) {
					done();
				}
			});

		request.link("body").to(tester, "test");
		request.receive("get", true);
	});
});
