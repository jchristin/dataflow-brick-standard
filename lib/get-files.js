"use strict";

var dataflow = require("dataflow"),
	path = require("path"),
	glob = require("glob");

module.exports = dataflow.define({
	inputs: ["path"],
	outputs: ["error", "file"],
	props: {
		key: "lastFile"
	},
	process: function() {
		var inPacket = this.inputs.path.popPacket();
		if (inPacket) {
			var globber = new glob.Glob(inPacket.data),
				lastFile;

			globber.on("error", function(error) {
				this.outputs.error.pushData(error);
			}.bind(this));

			globber.on("end", function() {
				this.sendFile(inPacket, lastFile, true);
			}.bind(this));

			globber.on("match", function(filename) {
				this.sendFile(inPacket, lastFile);
				lastFile = path.resolve(inPacket.data, filename);
			}.bind(this));
		}
	},
	sendFile: function(inPacket, file, last) {
		if (file) {
			var outPacket = inPacket.clone(file);

			if (last) {
				outPacket[this.props.key] = true;
			}

			this.outputs.file.pushPacket(outPacket);
		}
	}
});
