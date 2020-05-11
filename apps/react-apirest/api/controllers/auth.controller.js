const UserModel = require('../models/user.model');
const AuthService = require('../services/auth.service');

class AuthController {
    async login(req, res) {
        /**
         * API2:2019 Broken User Authentication:
         * sending credentails as query params exposes vulnerable information in logs.
         * How to prevent: Send credentials in request's `body`.
         */
        // const credentials = req.body;

        const credentials = {
            username: req.query.username,
            password: req.query.password,
        };

        const userModel = new UserModel(req.locals.db);
        const authService = new AuthService(userModel);

        const user = await authService.login(credentials);

        res.status(200).json(user);
    }
}

module.exports = AuthController;
