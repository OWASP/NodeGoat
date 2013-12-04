/*
 * app.js: Core Application object for managing plugins and features in broadway
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    broadway = require('broadway'),
    directories = broadway.common.directories,
    constants = require('./constants');

var App = exports.App = function (options) {
  broadway.App.call(this, options);
};

//
// Inherit from `broadway.App`.
//
util.inherits(App, broadway.App);

//
// ### function init (callback)
// #### @callback {function} Continuation to respond to when complete.
// Initializes this instance of `flatiron.App`
//
App.prototype.init = function () {
  broadway.App.prototype.init.apply(this, Array.prototype.slice.call(arguments));
};