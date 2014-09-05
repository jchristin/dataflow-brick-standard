"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		get_time: function (value) {
			var now = new Date();
			this.send("hours", now.getHours());
			this.send("minutes", now.getMinutes());
			this.send("seconds", now.getSeconds());
		}
	},
	outputs: ["hours", "minutes", "seconds"]
});
