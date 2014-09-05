"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		test: function (value) {
			dataflow.testerDelegate(value);
		}
	},
	props: {
		property: "default value"
	}
});
