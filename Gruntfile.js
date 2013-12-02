function configureGrunt (grunt) {
    
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
            all: ["gruntfile.js", "test/**/*.js", "assets/js/**", "data/**/*.js",  "routes/**/*.js", "server.js"]
        },
        nodemon: {
            dev: {
                options: {
                    file: "server.js",
                    args: [],
                    ignoredFiles: ["README.md", "node_modules/**", ".DS_Store"],
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

    // Making grunt default to force in order not to break the project.
    grunt.option("force", true);

    // Default task(s).
    grunt.registerTask("default", ["jshint", "concurrent"]);

    // Test task.
    grunt.registerTask("test", ["env:test", "mochaTest"]);

    // Code Validation task(s).
    grunt.registerTask("validate", ["jshint"]);
}

module.exports = configureGrunt;