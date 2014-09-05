"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		log: function (value) {
			console.log(value);
		}
	}
});
