"use strict";

var dataflow = require("dataflow"),
	fs = require("fs");

module.exports = dataflow.define({
	inputs: ["file"],
	outputs: ["error", "output"],
	props: {
		encoding: "utf8"
	},
	process: function() {
		var inPacket = this.inputs.file.popPacket();
		if (inPacket) {
			var self = this;
			fs.readFile(inPacket.data, {
				encoding: this.props.encoding
			}, function(error, data) {
				if (error) {
					self.outputs.error.pushData(error);
				} else {
					self.outputs.output.pushPacket(inPacket.clone(data));
				}
			});
		}
	}
});
