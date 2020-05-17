const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require("express-session");
const requestsLogger = require('morgan')
const apiRouter = require('./routes/api')
const logger = require("./utils/logger");

const appFactory = (db) => {
  const app = express()

  /**
     * Expose connected Mongo Client in each request.
     */
  app.all("*", (req, res, next) => {
    req.locals = {};
    req.locals.db = db;
    next();
  });

  app.use(requestsLogger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(session({
    secret: "s3cr3t",
    saveUninitialized: true,
    resave: true,
  }));

  app.use('/api/v1', apiRouter)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404))
  })

  // error handler
  app.use((error, req, res, next) => {
    logger.error(error.message);
    res.status(error.status || 500)
    res.json({ error })
  })

  return app;
}

module.exports = appFactory;
