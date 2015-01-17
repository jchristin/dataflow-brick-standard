"use strict";

var dataflow = require("dataflow"),
	jsonPath = require("JSONPath");

module.exports = dataflow.define({
	inputs: ["json"],
	outputs: ["value"],
	props: {
		path: ""
	},
	process: function() {
		var inPacket = this.inputs.json.popPacket();
		if (inPacket) {
			var json = inPacket.data;
			if (typeof json === "string") {
				json = JSON.parse(json);
			}

			/* jshint evil:true */
			var result = jsonPath.eval(json, this.props.path);
			/* jshint evil:false */

			if (result && result.length === 1) {
				this.outputs.value.pushPacket(inPacket.clone(result[0]));
			} else {
				this.outputs.value.pushPacket(inPacket.clone(result));
			}
		}
	}
});
