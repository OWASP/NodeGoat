/* The ProfileDAO must be constructed with a connected database object */
function ProfileDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    var users = db.collection("users");

    this.updateUser = function(username, firstname, lastname, ssn, dob, address, callback) {

        // Create user document
        var user = {
            firstname: firstname,
            lastname: lastname,
            ssn: ssn,
            dob: dob,
            address: address
        };

        users.update({
            _id: username
        }, {
            $set: user
        }, function(err, result) {

            if (!err) {
                console.log("Updated user profile");
                return callback(null, user);
            }

            return callback(err, null);
        });
    };

    this.getByUsername = function(username, callback) {
        users.findOne({
            _id: username
        }, function(err, user) {

            if (err) return callback(err, null);

            callback(null, user);
        });
    };
}

module.exports.ProfileDAO = ProfileDAO;
