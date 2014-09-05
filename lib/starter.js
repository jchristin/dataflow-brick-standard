"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	activate: function () {
		var self = this;
		setImmediate(function () {
			self.send("start", true);
		});
	},
	outputs: ["start"]
});
