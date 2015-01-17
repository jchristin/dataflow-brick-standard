"use strict";

var dataflow = require("dataflow"),
	cron = require("cron");

module.exports = dataflow.define({
	inputs: ["start"],
	outputs: ["bang"],
	props: {
		expression: ""
	},
	process: function() {
		new cron.CronJob(this.props.expression, function() {
			this.outputs.bang.pushPacket(new dataflow.Packet(true));
		}.bind(this), null, true);
	},
});
