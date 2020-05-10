const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ msg: 'respond with a resource' })
})

router.use("/profile", require("./profile"));
module.exports = router
