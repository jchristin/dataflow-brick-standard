/* global describe, it */

"use strict";

var Compare = require("../lib/compare"),
	InputPort = require("dataflow").InputPort,
	deadPort = new InputPort(function() {
		throw new Error();
	});

describe("Compare", function() {
	it("should compare two numbers (lesser)", function(done) {
		var callCount = 0,
			compare = new Compare({
				right: 3
			}),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(2);
				this.popPacket();

				callCount++;
				if (callCount >= 2) {
					done();
				}
			});

		compare.outputs.lesser.pipe(inputPort);
		compare.outputs.lesserOrEqual.pipe(inputPort);
		compare.outputs.equal.pipe(deadPort);
		compare.outputs.greaterOrEqual.pipe(deadPort);
		compare.outputs.greater.pipe(deadPort);

		compare.inputs.left.pushData(2);
	});

	it("should compare two numbers (equal)", function(done) {
		var callCount = 0,
			compare = new Compare({
				right: 5
			}),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(5);
				this.popPacket();

				callCount++;
				if (callCount >= 3) {
					done();
				}
			});

		compare.outputs.lesser.pipe(deadPort);
		compare.outputs.lesserOrEqual.pipe(inputPort);
		compare.outputs.equal.pipe(inputPort);
		compare.outputs.greaterOrEqual.pipe(inputPort);
		compare.outputs.greater.pipe(deadPort);

		compare.inputs.left.pushData(5);
	});

	it("should compare two numbers (greater)", function(done) {
		var callCount = 0,
			compare = new Compare({
				right: 5
			}),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(8);
				this.popPacket();

				callCount++;
				if (callCount >= 2) {
					done();
				}
			});

		compare.outputs.lesser.pipe(deadPort);
		compare.outputs.lesserOrEqual.pipe(deadPort);
		compare.outputs.equal.pipe(deadPort);
		compare.outputs.greaterOrEqual.pipe(inputPort);
		compare.outputs.greater.pipe(inputPort);

		compare.inputs.left.pushData(8);
	});
});
