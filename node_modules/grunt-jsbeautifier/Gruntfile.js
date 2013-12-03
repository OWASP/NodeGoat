module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        jsbeautifier: {
            default: {
                src: ["<%= jshint.files %>", "!test/fixtures/**"]
            },
            hasNotBeenBeautified: {
                src: ["test/fixtures/not-been-beautified.js"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            hasBeenBeautified: {
                src: ["test/fixtures/been-beautified.js"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            configFile: {
                src: ["tmp/config_file/test.js",
                    "tmp/config_file/test.css", "tmp/config_file/test.html"
                ],
                options: {
                    config: "tmp/config_file/jsbeautifyrc.json"
                }
            },
            configFileFlat: {
                src: "<%= jsbeautifier.configFile.src %>",
                options: {
                    config: "tmp/config_file/jsbeautifyrc_flat.json"
                }
            },
            configFileWithGruntFileOptions: {
                src: "<%= jsbeautifier.configFile.src %>",
                options: {
                    config: "tmp/config_file/jsbeautifyrc_flat.json",
                    js: {
                        indentSize: 3
                    },
                    css: {
                        indentSize: 5
                    },
                    html: {
                        indentSize: 7
                    }
                }
            }
        },
        copy: {
            tmp: {
                src: "config_file/**",
                dest: "tmp",
                cwd: "test/fixtures",
                expand: true
            }
        },
        clean: ["tmp"],
        nodeunit: {
            all: ["test/**/*.js"]
        },
        jshint: {
            files: ["package.json", "Gruntfile.js", "tasks/**/*.js", "test/**/*.js"],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true,
                camelcase: true
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    // By default, beautifiy, lint and run all tests.
    grunt.registerTask("test", ["jshint", "copy", "nodeunit", "clean"]);
    grunt.registerTask("default", ["test", "jsbeautifier:default"]);
};
