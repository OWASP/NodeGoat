var _ = require("underscore");
var path = require("path");


var config = _.extend(
    require(path.resolve(__dirname + "/../config/env/all.js")),
    require(path.resolve(__dirname + "/../config/env/" + process.env.NODE_ENV + ".js")) || {}
);

module.exports = config;
