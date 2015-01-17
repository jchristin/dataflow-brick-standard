/* global describe, it */

"use strict";

var Add = require("../lib/add"),
	InputPort = require("dataflow").InputPort;

describe("Add", function() {
	it("should add two numbers", function(done) {
		var add = new Add(),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(8);
				done();
			});

		add.outputs.sum.pipe(inputPort);
		add.inputs.left.pushData(3);
		add.inputs.right.pushData(5);
	});
});
