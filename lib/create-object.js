"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["value"],
	outputs: ["object"],
	props: {
		key: undefined,
	},
	process: function() {
		var inPacket = this.inputs.value.popPacket();
		if (inPacket) {
			var object = {};
			object[this.props.key] = inPacket.data;
			this.outputs.object.pushPacket(inPacket.clone(object));
		}
	}
});
