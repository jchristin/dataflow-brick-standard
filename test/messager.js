/* global describe, it */

"use strict";

var Messager = require("../lib/messager.js"),
	Tester = require("../lib/tester.js");

describe("Messager", function() {
	it("should send its value", function(done) {
		var messager = new Messager({
				message: 45
			}),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(45);
					done();
				}
			});

		messager.link("message").to(tester, "test");
		messager.receive("send", true);
	});
});
