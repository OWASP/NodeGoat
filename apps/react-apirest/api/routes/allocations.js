const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const AllocationsController = require('../controllers/allocations.controller')

const controller = new AllocationsController();

router.get('/:userId', asyncHandler(controller.getAllocations));

module.exports = router
