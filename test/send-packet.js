/* global describe, it */

"use strict";

var SendPacket = require("../lib/send-packet.js"),
	InputPort = require("dataflow").InputPort;

describe("SendPacket", function() {
	it("should send its data", function(done) {
		var sendPacket = new SendPacket({
				data: 45
			}),
			inputPort = new InputPort(function(packet) {
				packet.data.should.be.equal(45);
				done();
			});

		sendPacket.outputs.output.pipe(inputPort);
		sendPacket.inputs.input.pushData(true);
	});
});
