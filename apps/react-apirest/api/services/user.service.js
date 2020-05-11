const ApiError = require('./api-error')
const Db = require('mongodb').Db;

class UserService {


    /**
     * @param {Db} db
     */
    constructor(db) {
        this.db = db;
        this.users = db.collection("users");
    }

    async getUser(userId) {
        const user = await this.users.findOne({ _id: userId });

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

    async updateUser(id, updateUserDto) {
        /**
         * API6:2019 Mass Assignment:
         * Using whole request body in update operaton can result in assingning properties
         * that should not be overwriten (e.g. due to missing permissons or read-only nature).
         * How to prevent: Explicitly specifiy which fields should be updated. 
         */
        // updateUserDto = {
        //     firstName: updateUserDto.firstName,
        //     lastName: updateUserDto.lastName
        // }

        await this.users.updateOne(
            { _id: id }, {
            $set: updateUserDto
        });
    }
}

module.exports = UserService;
