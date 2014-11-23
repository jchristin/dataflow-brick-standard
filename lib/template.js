"use strict";

var dataflow = require("dataflow"),
	lodash = require("lodash");

module.exports = dataflow.define({
	inputs: {
		compile: function(value) {
			this.send("result", lodash.template(this.props.text, value));
		}
	},
	outputs: ["result"],
	props: {
		text: ""
	}
});
