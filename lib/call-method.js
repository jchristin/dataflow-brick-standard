"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["output"],
	props: {
		method: undefined,
		params: undefined
	},
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			var result;
			if (typeof inPacket.data == "function") {
				result = inPacket.data(this.props.params);
			} else {
				result = inPacket.data[this.props.method].call(inPacket.data, this.props.params);
			}

			this.outputs.output.pushPacket(inPacket.clone(result));
		}
	}
});
