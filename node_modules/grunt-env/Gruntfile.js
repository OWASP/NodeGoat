module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    env : {
      options: {
        globalOption : 'foo'
      },
      testData : {
        data : 'bar'
      },
      testOptions : {
        options : {
          localOption : 'baz'
        }
      },
      testDotEnv : {
        src : ['.env', '.env.json']
      }
    },
    clean : {
      env : ['.env*']
    },
    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      task : ['tasks/**/*.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var assert = require('assert');

  grunt.registerTask('testData', function(){
    assert.equal(process.env.globalOption, 'foo', 'globalOption should be set');
    assert.equal(process.env.data, 'bar', 'data should be set');
    delete process.env.globalOption;
    delete process.env.data;
  });

  grunt.registerTask('testOptions', function(){
    assert.equal(process.env.globalOption, 'foo', 'globalOption should be set');
    assert.equal(process.env.localOption, 'baz', 'localOption should be set');
    delete process.env.globalOption;
    delete process.env.localOption;
  });

  grunt.registerTask('writeDotEnv', function(){
    grunt.file.write('.env', "dotEnvFileData=bar\ndotEnvFileOption=baz\n");
    grunt.file.write('.env.json', '{"jsonValue" : "foo"}');
  });

  grunt.registerTask('testDotEnv', function(){
    assert(!process.env.src, 'Should not include src');
    assert.equal(process.env.jsonValue, 'foo', 'value from json env file should be set');
    assert.equal(process.env.dotEnvFileData, 'bar', 'dotEnvFileData should be set');
    assert.equal(process.env.dotEnvFileOption, 'baz', 'dotEnvFileOption should be set');
    delete process.env.jsonValue;
    delete process.env.dotEnvFileData;
    delete process.env.dotEnvFileOption;
  });

  // Default task.
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'env:testData',
    'testData',
    'env:testOptions',
    'testOptions',
    'writeDotEnv',
    'env:testDotEnv',
    'testDotEnv',
    'clean'
  ]);

};
