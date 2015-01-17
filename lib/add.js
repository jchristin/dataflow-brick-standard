"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: ["left", "right"],
	outputs: ["sum"],
	process: function() {
		if (this.inputs.left.hasPacket() && this.inputs.right.hasPacket()) {
			var leftPacket = this.inputs.left.popPacket(),
				rightPacket = this.inputs.right.popPacket(),
				outPacket = dataflow.Packet.clone(leftPacket, rightPacket);

			outPacket.data = leftPacket.data + rightPacket.data;
			this.outputs.sum.pushPacket(outPacket);
		}
	}
});
