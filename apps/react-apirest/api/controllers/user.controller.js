const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');

class UserController {
    async getProfile(req, res, next) {
        const userId = parseInt(req.header('user-id'), 10);

        const userModel = new UserModel(req.locals.db);
        const userService = new UserService(userModel);

        const profile = await userService.getUser(userId);

        res.status(200).json(profile);
    }
}

module.exports = UserController;
