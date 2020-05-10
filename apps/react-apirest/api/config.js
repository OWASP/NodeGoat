require('dotenv').config()

module.exports = {
  port: process.env.PORT || 9000,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/nodegoat",
}
