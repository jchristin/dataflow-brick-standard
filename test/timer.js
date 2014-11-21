/* jshint expr: true */
/* global describe, it */

"use strict";

var Timer = require("../lib/timer"),
	Tester = require("../lib/tester");

describe("Timer", function() {
	it("should tick on activate", function(done) {
		var timer = new Timer(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.true;
					timer.receive("stop", true);
					done();
				}
			});

		timer.link("tick").to(tester, "test");
		timer.receive("start", true);
	});
});
