const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const apiRouter = require('./routes/api')

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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', apiRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error })
})

  return app;
}

module.exports = appFactory;
