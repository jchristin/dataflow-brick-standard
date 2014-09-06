/* global describe, it */

"use strict";

var dataflow = require("dataflow"),
	XmlParser = require("../lib/xml-parser"),
	Tester = require("../lib/tester"),
	fs = require("fs");

describe("XMLParser", function () {
	it("should parse XML", function (done) {
		var xmlParser = new XmlParser({
			path: "/note/to"
		});
		var tester = new Tester();

		dataflow.testerDelegate = function (value) {
			value.should.be.equal("Tove");
			done();
		};

		dataflow.link(xmlParser, "value", tester, "test");

		xmlParser.receive("parse", fs.readFileSync("test/simple.xml", "utf8"));
	});
});
