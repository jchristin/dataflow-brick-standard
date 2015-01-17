"use strict";

var dataflow = require("dataflow"),
	request = require("request");

module.exports = dataflow.define({
	inputs: ["url"],
	outputs: ["error", "response", "body"],
	process: function() {
		var inPacket = this.inputs.url.popPacket();
		if (inPacket) {
			request.get({
				url: inPacket.data
			}, (function(error, response, body) {
				if (error) {
					this.outputs.error.pushPacket(inPacket.clone(error));
				} else {
					this.outputs.response.pushPacket(inPacket.clone(response));
					this.outputs.body.pushPacket(inPacket.clone(body));
				}
			}).bind(this));
		}
	}
});
