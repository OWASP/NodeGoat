//Load configurations
process.env.NODE_ENV = process.env.NODE_ENV || "development";


var express = require("express");
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var consolidate = require("consolidate"); // Templating library adapter for Express
var swig = require("swig");
var helmet = require("helmet");
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
var http = require("http");

var app = express(); // Web framework to handle routing requests
var routes = require("./app/routes");
var config = require("./config/config"); // Application config properties


/*
// Fix for A6-Sensitive Data Exposure
// Load keys for establishing secure HTTPS connection
var fs = require("fs");
var https = require("https");
var path = require("path");
var httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./app/cert/key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./app/cert/cert.pem"))
};
*/

MongoClient.connect(config.db, function(err, db) {

    "use strict";

    if (err) throw err;

    // Express middleware to populate "req.body" so we can access POST variables
    // parse application/json
    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));

    // Express middleware to populate "req.cookies" so we can access cookies
    app.use(cookieParser());

    // Enable session management using express middleware
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: config.cookieSecret
        /*
        //Fix for A5 - Security MisConfig
        // Use generic cookie name
        key: "sessionId",

        //Fix for A3 - XSS
        cookie: {
            httpOnly: true,
            secure: true
        }
        */
    }));
    /* Fix for A8 - CSRF
    //Enable Express csrf protection
    app.use(express.csrf());

    // Make csrf token available in templates
    app.use(function(req, res, next) {
        res.locals.csrftoken = req.csrfToken();
        next();
    });
    */

    // Register templating engine
    app.engine(".html", consolidate.swig);
    app.set("view engine", "html");
    app.set("views", __dirname + "/app/views");
    app.use(express.static(__dirname + "/app/assets"));
    app.use(favicon(__dirname + "/app/assets/favicon.ico"));

    // Application routes
    routes(app, db);

    swig.init({
        root: __dirname + "/app/views",
        // Autoescape disabled
        autoescape: false
        /*
        // Fix for A3 - XSS, enable auto escaping
        autoescape: true //default value
        */
    });

    // Insecure HTTP connection
    http.createServer(app).listen(config.port, function() {
        console.log("Express http server listening on port " + config.port);
    });
    /*
    // Fix for A6-Sensitive Data Exposure
    // Use secure HTTPS protocol
    https.createServer(httpsOptions, app).listen(config.port, function() {
        console.log("Express https server listening on port " + config.port);
    });
    */

});
