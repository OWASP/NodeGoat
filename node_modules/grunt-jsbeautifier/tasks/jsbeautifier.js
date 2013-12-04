module.exports = function(grunt) {
    "use strict";

    var path = require('path'),
        jsBeautifier = require('js-beautify'),
        jsbeautifier = jsBeautifier.js,
        cssbeautifier = jsBeautifier.css,
        htmlbeautifier = jsBeautifier.html;

    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md
    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.task.registerMultiTask('jsbeautifier', 'jsbeautifier.org for grunt', function() {

        var params = this.options({
            mode: "VERIFY_AND_WRITE"
        });

        var fileCount = 0;
        var changedFileCount = 0;

        function verifyActionHandler(src) {
            grunt.fail.warn(src.cyan + ' was not beautified');
        }

        function verifyAndWriteActionHandler(src, result) {
            grunt.file.write(src, result);
            changedFileCount++;
        }

        function convertCamelCaseToUnderScore(config) {
            var underscoreKey;
            grunt.util._.each([config.js, config.css, config.html], function(conf) {
                grunt.util._.each(conf, function(value, key) {
                    underscoreKey = key.replace(/([A-Z])/g, function($1) {
                        return "_" + $1.toLowerCase();
                    });
                    if (key !== underscoreKey) {
                        conf[underscoreKey] = value;
                        delete conf[key];
                    }
                });
            });
        }

        if (this.filesSrc && this.filesSrc.length > 0) {
            grunt.verbose.writeln('Beautifing using filesSrc with ' + this.filesSrc.length.toString().cyan + ' files...');

            grunt.verbose.writeln('Using mode="' + params.mode + '"...');
            var actionHandler = "VERIFY_ONLY" === params.mode ? verifyActionHandler : verifyAndWriteActionHandler;

            var config;
            if (params.config) {
                var baseConfig = grunt.file.readJSON(path.resolve(params.config));
                config = {
                    js: {},
                    css: {},
                    html: {}
                };
                grunt.util._.extend(config.js, baseConfig);
                grunt.util._.extend(config.css, baseConfig);
                grunt.util._.extend(config.html, baseConfig);
                grunt.util._.extend(config.js, baseConfig.js);
                grunt.util._.extend(config.css, baseConfig.css);
                grunt.util._.extend(config.html, baseConfig.html);
                grunt.util._.extend(config.js, params.js);
                grunt.util._.extend(config.css, params.css);
                grunt.util._.extend(config.html, params.html);
            } else {
                config = params;
            }

            grunt.verbose.writeln('Beautify config before converting camelcase to underscore: ' + JSON.stringify(config));

            convertCamelCaseToUnderScore(config);

            grunt.verbose.writeln('Using beautify config: ' + JSON.stringify(config));

            var done = this.async();
            var q = grunt.util.async.queue(function(src, callback) {
                if (grunt.file.isDir(src)) {
                    callback();
                    return;
                }

                beautify(src, config, actionHandler);
                fileCount++;
                callback();
            }, 10);
            q.drain = function() {
                grunt.log.write('Beautified ' + fileCount.toString().cyan + ' files, changed ' + changedFileCount.toString().cyan + ' files...');
                grunt.log.ok();
                done();
            };
            q.push(this.filesSrc);
        }
    });

    function beautify(file, config, actionHandler) {
        var setup = getBeautifierSetup(file, config);
        if (!setup) {
            return;
        }

        var beautifier = setup[0];
        config = setup[1];

        var original = grunt.file.read(file);
        grunt.verbose.write('Beautifing ' + file.cyan + '...');
        var result = beautifier(original, config);
        // jsbeautifier would skip the line terminator for js files
        if (['.js', '.json'].indexOf(path.extname(file)) !== -1) {
            result += '\n';
        }
        grunt.verbose.ok();
        /*jshint eqeqeq: false */
        if (original != result) {
            actionHandler(file, result);
        }
    }

    function getBeautifierSetup(file, config) {
        var ext = path.extname(file);
        switch (ext) {
            case '.js':
            case '.json':
                return [jsbeautifier, config.js];
            case '.css':
                return [cssbeautifier, config.css];
            case '.html':
                return [htmlbeautifier, config.html];
            default:
                grunt.fail.warn('Cannot beautify ' + file.cyan + ' (only .js, .css and .html are beautifiable)');
                return null;
        }
    }
};
