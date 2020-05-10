const ApiError = require('./api-error')


class UserService {

    /**
     * 
     * @param {UserModel} userModel 
     */
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUser(userId) {
        const user = await this.userModel.getById(userId);

        if (!user) {
            throw new ApiError("Profile not found", 403);
        }

        /**
        * API3:2019 Excessive Data Exposure:
        * Returning all fields from database without filtering sensitive data.
        * How to prevent: Explicitly specify which fields should be returned.
        */
        // const userDto = {
        //     _id: user._id,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     isAdmin: user.isAdmin,
        // };
        // return userDto;

        return user;
    }
}

module.exports = UserService;
