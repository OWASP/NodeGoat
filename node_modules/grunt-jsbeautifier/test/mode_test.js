"use strict";
var grunt = require("grunt");
var exec = require("child_process").exec;

exports["mode_test"] = {
    "Verify beautification with unbeautified file": function(test) {
        test.expect(1);
        exec("grunt jsbeautifier:hasNotBeenBeautified", {
                cwd: __dirname + "/../"
            },
            function(err, stdout, stderr) {
                test.notEqual(err, null, "Grunt fails because file has not been beautified");
                test.done();
            });
    },

    "Verify beautification with beautified file": function(test) {
        test.expect(1);
        exec("grunt jsbeautifier:hasBeenBeautified", {
                cwd: __dirname + "/../"
            },
            function(err, stdout, stderr) {
                test.equal(err, null, "Grunt passes because file has been beautified");
                test.done();
            });
    }
};
