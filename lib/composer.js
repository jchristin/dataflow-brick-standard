"use strict";

var dataflow = require("dataflow");

module.exports = dataflow.define({
	inputs: {
		set_object: function(value) {
			this.props.object = value;
			this.props.object[this.props.key] = this.props.value;
			this.send("object", this.props.object);
		},
		set_key: function(value) {
			this.props.key = value;
			this.props.object[this.props.key] = this.props.value;
			this.send("object", this.props.object);
		},
		set_value: function(value) {
			this.props.value = value;
			this.props.object[this.props.key] = this.props.value;
			this.send("object", this.props.object);
		}
	},
	outputs: ["object"],
	props: {
		object: {},
		key: undefined,
		value: undefined
	}
});
