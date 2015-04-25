//Load configurations
process.env.NODE_ENV = process.env.NODE_ENV || "development";


var express = require("express");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express(); // Web framework to handle routing requests
var consolidate = require("consolidate"); // Templating library adapter for Express
var swig = require("swig");
var helmet = require("helmet");
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB

var routes = require("./app/routes");
var config = require("./config/config"); // Application config properties

var http = require("http");

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

    /*
     //Fix for A5 - Security MisConfig
     // Remove default x-powered-by response header
     app.disable("x-powered-by");

     // Prevent opening page in frame or iframe to protect from clickjacking
     app.use(helmet.xframe());

     // Prevents browser from caching and storing page
     app.use(helmet.cacheControl());

     // Allow loading resources only from white-listed domains
     app.use(helmet.csp());

     // Allow communication only on HTTPS
     app.use(helmet.hsts());

     // Enable XSS filter in IE (On by default)
     app.use(helmet.iexss());

     // Forces browser to only use the Content-Type set in the response header instead of sniffing or guessing it
     app.use(helmet.contentTypeOptions());
     */

    // Adding/ remove HTTP Headers for security
    app.use(favicon(__dirname + "/app/assets/images/owasplogo.png"));

    // Express middleware to populate "req.body" so we can access POST variables
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        // Mandatory in Express v4
        extended: false
    }));

    // Enable session management using express middleware
    app.use(session({
        secret: config.cookieSecret,
        // Both mandatory in Express v4
        saveUninitialized: true,
        resave: true
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

    // Application routes
    routes(app, db);

    // TODO: Not needed, but we need "autoscape" to show the vuln
    //    swig.init({
    //        root: __dirname + "/app/views",
    //        // Autoescape disabled
    //        autoescape: false
    //            /*
    //            // Fix for A3 - XSS, enable auto escaping
    //            autoescape: true //default value
    //            */
    //    });

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
