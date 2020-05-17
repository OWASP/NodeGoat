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

        const authService = new AuthService(req.locals.db);

        const user = await authService.login(credentials);

        req.session.regenerate(() => { });
        req.session.userId = user._id;
        
        res.status(200).json(user);
    }
}

module.exports = AuthController;
