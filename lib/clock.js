"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["bang"],
	outputs: ["hours", "minutes", "seconds"],
	process: function() {
		var inPacket = this.inputs.bang.popPacket();
		if (inPacket) {
			var now = new Date();
			this.outputs.hours.pushPacket(inPacket.clone(now.getHours()));
			this.outputs.minutes.pushPacket(inPacket.clone(now.getMinutes()));
			this.outputs.seconds.pushPacket(inPacket.clone(now.getSeconds()));
		}
	}
});
