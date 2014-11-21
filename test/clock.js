/* global describe, it */

"use strict";

var Clock = require("../lib/clock"),
	Tester = require("../lib/tester");

describe("Clock", function() {
	it("should give the current hour", function(done) {
		var clock = new Clock(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(new Date().getHours());
					done();
				}
			});

		clock.link("hours").to(tester, "test");
		clock.receive("get_time", true);
	});

	it("should give the current minute", function(done) {
		var clock = new Clock(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(new Date().getMinutes());
					done();
				}
			});

		clock.link("minutes").to(tester, "test");
		clock.receive("get_time", true);
	});

	it("should give the current second", function(done) {
		var clock = new Clock(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(new Date().getSeconds());
					done();
				}
			});

		clock.link("seconds").to(tester, "test");
		clock.receive("get_time", true);
	});
});
