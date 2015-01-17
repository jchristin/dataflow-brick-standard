"use strict";

var dataflow = require("dataflow"),
	fs = require("fs");

module.exports = dataflow.define({
	inputs: ["file"],
	outputs: ["error", "line"],
	props: {
		encoding: "utf8",
		key: "lastLine"
	},
	process: function() {
		var inPacket = this.inputs.file.popPacket(),
			readStream,
			lines = [],
			lineFragment = "";

		if (inPacket) {
			readStream = fs.createReadStream(inPacket.data, {
				encoding: this.props.encoding
			});

			var self = this;

			readStream.on("error", function(error) {
				self.outputs.error.pushData(error);
			});

			readStream.on("data", function(data) {
				self.pushLines(inPacket, lines);

				lines = (lineFragment + data).split(/(?:\n|\r\n|\r)/g);
				lineFragment = lines.pop() || "";
			});

			readStream.on("end", function() {
				if (lineFragment !== "") {
					lines.push(lineFragment);
				}

				self.pushLines(inPacket, lines, true);
			});
		}
	},
	pushLines: function(inPacket, lines, end) {
		for (var i = 0; i < lines.length; i++) {
			var outPacket = dataflow.Packet.clone(inPacket);
			outPacket.data = lines[i];

			if (end && i === lines.length - 1) {
				outPacket[this.props.key] = true;
			}

			this.outputs.line.pushPacket(outPacket);
		}
	}
});
