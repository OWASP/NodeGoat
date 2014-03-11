//Load configurations
process.env.NODE_ENV = process.env.NODE_ENV || "development";


var express = require("express");
var app = express(); // Web framework to handle routing requests
var consolidate = require("consolidate"); // Templating library adapter for Express
var swig = require("swig");
var helmet = require("helmet");
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
var fs = require("fs");
var http = require("http");
var path = require("path");

var routes = require("./app/routes");
var config = require("./config/config"); // Routes for our application config



MongoClient.connect(config.db, function(err, db) {
    "use strict";
    if (err) throw err;

    // Adding/ remove HTTP Headers for security
    app.use(express.favicon());

    // Express middleware to populate "req.body" so we can access POST variables
    app.use(express.json());
    app.use(express.urlencoded());

    // Express middleware to populate "req.cookies" so we can access cookies
    app.use(express.cookieParser());

    // Enable session management using express middleware
    app.use(express.session({
        secret: "s3Cur3"
    }));


    // Register our templating engine
    app.engine(".html", consolidate.swig);
    app.set("view engine", "html");
    app.set("views", __dirname + "/app/views");
    app.use(express.static(__dirname + "/app/assets"));

    // Application routes
    app.use(app.router);
    routes(app, db);

    swig.init({
        root: __dirname + "/app/views",
        autoescape: false //default value: true
    });

    http.createServer(app).listen(config.port, function() {
        console.log("Express http server listening on port " + config.port);
    });
});
