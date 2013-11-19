var express = require('express'),
    app = express(), // Web framework to handle routing requests
    consolidate = require('consolidate'), // Templating library adapter for Express
    swig = require('swig'),
    MongoClient = require('mongodb').MongoClient, // Driver for connecting to MongoDB
    routes = require('./routes'); // Routes for our application

MongoClient.connect('mongodb://nodegoat:owasp@widmore.mongohq.com:10000/nodegoat', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('.html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(express.static(__dirname + '/assets'));

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);

    swig.init({ root: __dirname + '/views', autoescape: false });
    if(process.env.PORT && process.env.IP) {
        app.listen(process.env.PORT, process.env.IP);
        console.log('Express server started at ' + process.env.IP + ":" + process.env.PORT);
    } else {
        app.listen(5000);
        console.log('Express server started at http://localhost:5000');
    }
});

