const express = require('express');
const asyncHandler = require('express-async-handler');
const UserController = require("../controllers/user.controller");

const router = express.Router();

const userController = new UserController();

router.get('/', asyncHandler(userController.getProfile))
router.put('/:id', asyncHandler(userController.updateProfile))

module.exports = router;
