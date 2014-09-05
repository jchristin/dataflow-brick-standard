"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	activate: function () {
		this.intervalObject = setInterval( this.send("tick", true), this.props.delay);
	},
	deactivate: function () {
		clearInterval(this.intervalObject);
	},
	outputs: ["tick"],
	props: {
		delay: 1000
	}
});
