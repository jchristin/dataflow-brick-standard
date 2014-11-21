/* global describe, it */

"use strict";

var XmlParser = require("../lib/xml-parser"),
	Tester = require("../lib/tester"),
	fs = require("fs");

describe("XMLParser", function() {
	it("should parse XML", function(done) {
		var xmlParser = new XmlParser({
				path: "/note/to"
			}),
			tester = new Tester({
				delegate: function(value) {
					value.should.be.equal("Tove");
					done();
				}
			});

		xmlParser.link("value").to(tester, "test");
		xmlParser.receive("parse", fs.readFileSync("test/simple.xml", "utf8"));
	});
});
