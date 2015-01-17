"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["output"],
	props: {
		data: true
	},
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			this.outputs.output.pushPacket(inPacket.clone(this.props.data));
		}
	}
});
