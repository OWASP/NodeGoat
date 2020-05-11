const ApiError = require('./api-error')
const Db = require('mongodb').Db;

class AuthService {

    /**
     * @param {Db} db
     */
    constructor(db) {
        this.db = db;
        this.users = db.collection("users");
    }

    async login({ username, password }) {

        const user = await this.users.findOne({
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
