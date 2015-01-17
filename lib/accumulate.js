"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["output"],
	props: {
		key: undefined
	},
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			this._acc = (this._acc || 0) + inPacket.data;

			if (inPacket[this.props.key] !== undefined) {
				this.outputs.output.pushPacket(inPacket.clone(this._acc));
				this._acc = 0;
			}
		}
	}
});
