const ApiError = require('./api-error')
const UserModel = require('../models/user.model')

class AuthService {

    /**
     * @param {UserModel} userModel 
     */
    constructor(userModel) {
        this.userModel = userModel;
    }

    async login({ username, password }) {

        const user = await this.userModel.users.findOne({
            userName: username,
            password: password,
        });

        if (!user) {
            throw new ApiError("User or password incorrect", 401);
        }

        const { password: skipPassword, ...response } = user;

        return response;
    }
}

module.exports = AuthService;
