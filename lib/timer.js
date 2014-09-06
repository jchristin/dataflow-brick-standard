"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		start: function () {
			this.intervalObject = setInterval((function () {
				this.send("tick", true);
			}).bind(this), this.props.delay);
		},
		stop: function () {
			clearInterval(this.intervalObject);
		}	
	},
	outputs: ["tick"],
	props: {
		delay: 1000
	}
});
