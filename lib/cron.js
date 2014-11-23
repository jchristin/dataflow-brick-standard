"use strict";

var dataflow = require("dataflow"),
	cron = require("cron");

module.exports = dataflow.define({
	inputs: {
		start: function() {
			new cron.CronJob(this.props.expression, (function() {
				this.send("signal", true);
			}).bind(this), null, true);
		}
	},
	outputs: ["signal"],
	props: {
		expression: ""
	}
});
