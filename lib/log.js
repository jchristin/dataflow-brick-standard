"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			console.log(inPacket.data);
		}
	}
});
