/* global describe, it */

"use strict";

var Multiply = require("../lib/multiply"),
	InputPort = require("dataflow").InputPort;

describe("Multiply", function() {
	it("should multiply two numbers", function(done) {
		var multiply = new Multiply(),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(15);
				done();
			});

		multiply.outputs.product.pipe(inputPort);
		multiply.inputs.left.pushData(3);
		multiply.inputs.right.pushData(5);
	});
});
