"use strict";

var cheerio = require("cheerio"),
	dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["output"],
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			for (var i = 0; i < inPacket.data.length; i++) {
				this.outputs.output.pushPacket(inPacket.clone(inPacket.data.eq(i)));
			}
		}
	}
});
