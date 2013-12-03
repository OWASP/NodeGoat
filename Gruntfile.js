function configureGrunt(grunt) {

    "use strict";

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            js: {
                files: ["assets/js/**", "data/**/*.js", "test/**/*.js", "routes/**/*.js", "server.js"],
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ["views/**"],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ["assets/css/**"],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ["Gruntfile.js", "test/**/*.js", "assets/js/**", "data/**/*.js", "routes/**/*.js", "server.js"]
        },
        jsbeautifier: {
            files: ["Gruntfile.js", "views/**", "test/**/*.js", "assets/js/**", "assets/css/**", "data/**/*.js", "routes/**/*.js", "server.js"],
            options: {
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u", "pre"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: "server.js",
                    args: [],
                    ignoredFiles: ["README.md", "node_modules/**"],
                    watchedExtensions: ["js", "html", "css"],
                    watchedFolders: ["data", "routes", "assets", "views"],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 5000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ["nodemon", "watch"],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: "spec"
            },
            src: ["test/**/*.js"]
        },
        env: {
            test: {
                NODE_ENV: "test"
            }
        }
    });

    // Load NPM tasks 
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Making grunt default to force in order not to break the project.
    grunt.option("force", true);


    // Code Validation, beautification task(s).
    grunt.registerTask("prepare", ["jsbeautifier", "jshint"]);

    // Test task.
    grunt.registerTask("test", ["env:test", "mochaTest"]);

    // Default task(s).
    grunt.registerTask("default", ["prepare", "concurrent"]);
}

module.exports = configureGrunt;
