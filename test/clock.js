/* global describe, it */

"use strict";

var Clock = require("../lib/clock"),
	InputPort = require("dataflow").InputPort;

describe("Clock", function() {
	it("should give the current hour", function(done) {
		var clock = new Clock(),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(new Date().getHours());
				done();
			});

		clock.outputs.hours.pipe(inputPort);
		clock.inputs.bang.pushData(true);
	});

	it("should give the current minute", function(done) {
		var clock = new Clock(),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(new Date().getMinutes());
				done();
			});

		clock.outputs.minutes.pipe(inputPort);
		clock.inputs.bang.pushData(true);
	});

	it("should give the current second", function(done) {
		var clock = new Clock(),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(new Date().getSeconds());
				done();
			});

		clock.outputs.seconds.pipe(inputPort);
		clock.inputs.bang.pushData(true);
	});
});
