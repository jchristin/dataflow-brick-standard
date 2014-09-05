"use strict";

var dataflow = require("dataflow"),
	request = require("request");

module.exports = dataflow.define({
	inputs: {
		get: function (value) {
			request.get({
				url: this.props.url
			}, (function (error, response, body) {
				if (!error && response.statusCode == 200) {
					this.send("body", body);
				}
			}).bind(this));
		}
	},
	outputs: ["body"],
	props: {
		url: ""
	}
});
