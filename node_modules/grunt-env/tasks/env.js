/*
 * grunt-env
 * https://github.com/onehealth/grunt-env
 *
 * Copyright (c) 2012 OneHealth Solutions, inc
 * Licensed under the Apache 2.0 license.
 */

"use strict";
var ini = require('ini');

module.exports = function (grunt) {

  grunt.registerMultiTask('env', 'Specify an ENV configuration for future tasks in the chain', function() {

    var data = grunt.util._.clone(this.data);
    delete data.src;

    grunt.util._.extend(process.env, this.options(), data);

    if (this.files.length) {
      this.files[0].src.forEach(function(file){
        var fileContent = grunt.file.read(file);
        var data = readJson(fileContent) || readIni(fileContent) || {};
        grunt.util._.extend(process.env, data);
      });
    }
  });
};

function readJson(content) {
  try {
    return JSON.parse(content);
  } catch(e) {
    return;
  }
}

function readIni(content) {
  try {
    return ini.parse(content);
  } catch(e) {
    return;
  }
}


