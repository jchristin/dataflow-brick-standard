"use strict";

var dataflow = require("dataflow"),
	libxmljs = require("libxmljs");

module.exports = dataflow.define({
	inputs: {
		parse: function (value) {
			var xmlDoc = libxmljs.parseXml(value);
			var xmlNode = xmlDoc.get(this.props.path);
			if (xmlNode) {
				this.send("value", xmlNode.text());
			}
		}
	},
	outputs: ["value"],
	props: {
		path: ""
	}
});
