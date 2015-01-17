"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["input"],
	outputs: ["number"],
	props: {
		key: undefined
	},
	process: function() {
		var inPacket = this.inputs.input.popPacket();
		if (inPacket) {
			this._count = (this._count || 0) + 1;

			if (inPacket[this.props.key] !== undefined) {
				this.outputs.number.pushPacket(inPacket.clone(this._count));
				this._count = 0;
			}
		}
	}
});
