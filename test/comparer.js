/* global describe, it */

"use strict";

var Comparer = require("../lib/comparer"),
	Tester = require("../lib/tester"),
	Killer = require("../lib/killer");

describe("Comparer", function() {
	it("should compare two numbers (lesser)", function(done) {
		var callCount = 0,
			comparer = new Comparer(),
			killer = new Killer(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(2);

					callCount++;
					if (callCount >= 2) {
						done();
					}
				}
			});

		comparer.link("lesser").to(tester, "test");
		comparer.link("lesser_or_equal").to(tester, "test");
		comparer.link("equal").to(killer, "kill");
		comparer.link("greater_or_equal").to(killer, "kill");
		comparer.link("greater").to(killer, "kill");

		comparer.receive("set_right", 3);
		comparer.receive("set_left", 2);
	});

	it("should compare two numbers (equal)", function(done) {
		var callCount = 0,
			comparer = new Comparer(),
			killer = new Killer(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(5);

					callCount++;
					if (callCount >= 3) {
						done();
					}
				}
			});

		comparer.link("lesser").to(killer, "kill");
		comparer.link("lesser_or_equal").to(tester, "test");
		comparer.link("equal").to(tester, "test");
		comparer.link("greater_or_equal").to(tester, "test");
		comparer.link("greater").to(killer, "kill");

		comparer.receive("set_right", 5);
		comparer.receive("set_left", 5);
	});

	it("should compare two numbers (greater)", function(done) {
		var callCount = 0,
			comparer = new Comparer(),
			killer = new Killer(),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal(8);

					callCount++;
					if (callCount >= 2) {
						done();
					}
				}
			});

		comparer.link("lesser").to(killer, "kill");
		comparer.link("lesser_or_equal").to(killer, "kill");
		comparer.link("equal").to(killer, "kill");
		comparer.link("greater_or_equal").to(tester, "test");
		comparer.link("greater").to(tester, "test");

		comparer.receive("set_right", 5);
		comparer.receive("set_left", 8);
	});
});
