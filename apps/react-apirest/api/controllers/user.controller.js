const UserService = require('../services/user.service');

class UserController {
    async getProfile(req, res, next) {
        const userId = parseInt(req.header('user-id'), 10);

        const userService = new UserService(req.locals.db);
        const profile = await userService.getUser(userId);

        res.status(200).json(profile);
    }

    async updateProfile(req, res, next) {
        const userId = parseInt(req.params.id, 10);

        const userService = new UserService(req.locals.db);
        await userService.updateUser(userId, req.body);

        res.status(200).end();
    }
}

module.exports = UserController;
