"use strict";

var cheerio = require("cheerio"),
	dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["output"],
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			var $ = cheerio.load(inPacket.data);
			this.outputs.output.pushPacket(inPacket.clone($));
		}
	}
});
