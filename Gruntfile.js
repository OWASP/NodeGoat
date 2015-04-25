"use strict";

var MongoClient = require("mongodb").MongoClient;
var _ = require("underscore");
var ObjectID = require("mongodb").ObjectID;

var USERS_TO_INSERT = [{
    "userName": "admin",
    "firstName": "Node Goat",
    "lastName": "Admin ",
    "password": "Admin_123",
    //"password" : "$2a$10$8Zo/1e8KM8QzqOKqbDlYlONBOzukWXrM.IiyzqHRYDXqwB3gzDsba", // Admin_123
    "isAdmin": true
}, {
    "userName": "user1",
    "firstName": "John",
    "lastName": "Doe",
    "benefitStartDate": "2030-01-10",
    "password": "User1_123"
        // "password" : "$2a$10$RNFhiNmt2TTpVO9cqZElb.LQM9e1mzDoggEHufLjAnAKImc6FNE86",// User1_123
}, {
    "userName": "user2",
    "firstName": "Will",
    "lastName": "Smith",
    "benefitStartDate": "2025-11-30",
    "password": "User2_123"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
}];


module.exports = function(grunt) {

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            js: {
                files: ["app/assets/js/**", "app/data/**/*.js", "app/routes/**/*.js", "server.js", "test/**/*.js"],
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ["app/views/**"],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ["app/assets/css/**"],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ["test/**/*.js", "config/**", "app/assets/js/**", "app/data/**/*.js", "app/routes/**/*.js", "server.js"],
            options: {
                jshintrc: true
            }
        },
        jsbeautifier: {
            files: ["Gruntfile.js", "config/**", "app/views/**", "app/assets/js/**", "app/assets/css/**", "app/data/**/*.js", "app/routes/**/*.js", "server.js", "test/**/*.js"],
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
                    watchedFolders: ["app/data", "app/routes", "app/assets", "app/views", "app/views/tutorial"],
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
        },
        retire: {
            js: [],
            node: ["./"],
            options: {
                verbose: true,
                packageOnly: true,
                jsRepository: "https://raw.github.com/bekk/retire.js/master/repository/jsrepository.json",
                nodeRepository: "https://raw.github.com/bekk/retire.js/master/repository/npmrepository.json",
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
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-retire");

    // Making grunt default to force in order not to break the project.
    grunt.option("force", true);

    grunt.registerTask('resetDb', '(Re)init the database.', function() {
        require("./nodegoat_db_reset")();
    });

    // Code Validation, beautification task(s).
    grunt.registerTask("precommit", ["jsbeautifier", "jshint"]);

    // Test task.
    grunt.registerTask("test", ["env:test", "mochaTest"]);

    // start server.
    grunt.registerTask("run", ["precommit", "concurrent"]);

    grunt.registerTask("resetdb", "Restore the default values info the database", function(arg) {
        var finalEnv = 'development';
        var config, done;

        function parseResponse(err, res, comm) {
            if (err) {
                grunt.log.error(comm);
                grunt.log.error(JSON.stringify(err));

                return;
            }
            grunt.log.ok(comm);
            grunt.log.ok(JSON.stringify(res));
        }

        if (arg) {
            finalEnv = arg;
        }
        // Changing the env variable programatically
        process.env.NODE_ENV = finalEnv;
        // We need to do it in run time
        config = require("./config/config");

        // Doing Mongo stuff
        done = this.async();
        MongoClient.connect(config.db, function(err, db) {
            var usersCol = db.collection('users');
            var allocationsCol = db.collection('allocations');
            var contributionsCol = db.collection('contributions');

            if (err) {
                grunt.log.error('Database:');
                grunt.log.error(JSON.stringify(err));

                return;
            }
            grunt.log.ok('Connected to the database');

            // remove existing data
            usersCol.deleteMany({}, {}, function(err, db) {
                parseResponse(err, db.result, 'db.users.deleteMany');
            });
            allocationsCol.deleteMany({}, {}, function(err, db) {
                parseResponse(err, db.result, 'db.allocations.deleteMany');
            });
            contributionsCol.deleteMany({}, {}, function(err, db) {
                parseResponse(err, db.result, 'db.contributions.deleteMany');
            });

            // insert admin and test users
            grunt.log.ok('Users to insert:');
            _.each(USERS_TO_INSERT, function(user) {
                grunt.log.ok(JSON.stringify(user));
            });

            usersCol.insertMany(USERS_TO_INSERT, function(err, data) {
                var finalAllocations = [];
                var ids;

                parseResponse(err, data, 'users.insertMany')

                // We can't continue if error here
                if (err) {
                    done();
                }

                _.each(data.ops, function(user) {
                    finalAllocations.push({
                        userId: new ObjectID(user._id),
                        stocks: _.random(0, 100),
                        funds: _.random(0, 100),
                        bonds: _.random(0, 100)
                    });
                });

                grunt.log.ok('Allocations to insert:');
                _.each(finalAllocations, function(allocation) {
                    grunt.log.ok(JSON.stringify(allocation));
                });

                allocationsCol.insertMany(finalAllocations, function(err, data) {
                    parseResponse(err, data, 'allocations.insertMany');
                    done();
                });

            });

        });

    });

    // Default task(s).
    grunt.registerTask("default", ["precommit", "concurrent"]);
};
