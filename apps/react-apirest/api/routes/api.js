const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ msg: 'respond with a resource' })
})

router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/allocations", require("./allocations"));

module.exports = router
