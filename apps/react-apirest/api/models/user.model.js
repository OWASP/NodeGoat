class UserModel {

    constructor(db) {
        this.users = db.collection("users");
    }

    async getById(id) {
        return this.users.findOne({ _id: id });
    }
}

module.exports = UserModel;
