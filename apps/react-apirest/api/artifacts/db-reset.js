#!/usr/bin/env nodejs

"use strict";

// This script initializes the database. You can set the environment variable
// before running it (default: development). ie:
// NODE_ENV=production node artifacts/db-reset.js

const { MongoClient } = require("mongodb");
const { mongoUrl } = require("../config");
const insertData = require('./initialise-data');


// Starting here
MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, mongoClient) => {
    if (err) {
        console.log("ERROR: connect");
        console.log(JSON.stringify(err));
        process.exit(1);
    }
    console.log("Connected to the database: " + mongoUrl);

    insertData(mongoClient.db())
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
});

