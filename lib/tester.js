"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		test: function(value) {
			this.props.delegate(value);
		}
	},
	props: {
		property: "default value"
	}
});
