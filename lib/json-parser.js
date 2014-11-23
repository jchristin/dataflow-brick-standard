"use strict";

var dataflow = require("dataflow"),
	jsonPath = require("JSONPath");

module.exports = dataflow.define({
	inputs: {
		parse: function(value) {
			if (typeof value === "string") {
				value = JSON.parse(value);
			}

			/* jshint evil:true */
			var result = jsonPath.eval(value, this.props.path);
			/* jshint evil:false */

			if (result && result.length === 1) {
				this.send("value", result[0]);
			} else {
				this.send("value", result);
			}
		}
	},
	outputs: ["value"],
	props: {
		path: ""
	}
});
