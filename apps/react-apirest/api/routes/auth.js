const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const AuthController = require('../controllers/auth.controller')

const authController = new AuthController();

router.post('/login', asyncHandler(authController.login))

module.exports = router
