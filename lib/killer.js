"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define("Killer", {
	inputs: {
		kill: function (value) {
			throw new Error("KILL");
		}
	}
});
