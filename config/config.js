var _ = require("underscore");
var path = require("path");

var finalEnv = process.env.NODE_ENV || "development";

var config = _.extend(
    require(path.resolve(__dirname + "/../config/env/all.js")),
    require(path.resolve(__dirname + "/../config/env/" + finalEnv.toLowerCase() + ".js") || {})
);

module.exports = config;
