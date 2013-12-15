var bcrypt = require("bcrypt-nodejs");

/* The UserDAO must be constructed with a connected database object */
function UserDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UserDAO)) {
        console.log("Warning: UserDAO constructor called without 'new' operator");
        return new UserDAO(db);
    }

    var users = db.collection("users");

    this.addUser = function(username, firstname, lastname, password, email, callback) {

        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var passwordHash = bcrypt.hashSync(password, salt);

        // Create user document
        var user = {
            _id: username,
            firstname: firstname,
            lastname: lastname,
            password: passwordHash
        };

        // Add email if set
        if (email !== "") {
            user.email = email;
        }

        users.insert(user, function(err, result) {

            if (!err) {
                console.log("Inserted new user");

                // TODO: Insert 401k setup data here 
                return callback(null, result[0]);
            }

            return callback(err, null);
        });
    };

    this.validateLogin = function(username, password, callback) {

        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {

            if (err) return callback(err, null);

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                } else {
                    var invalidPasswordError = new Error("Invalid password");
                    // Set an extra field so we can distinguish this from a db error
                    invalidPasswordError.invalidPassword = true;
                    callback(invalidPasswordError, null);
                }
            } else {
                var noSuchUserError = new Error("User: " + user + " does not exist");
                // Set an extra field so we can distinguish this from a db error
                noSuchUserError.noSuchUser = true;
                callback(noSuchUserError, null);
            }
        }

        users.findOne({
            _id: username
        }, validateUserDoc);
    };

    this.getUserById = function(_id, callback) {
        users.findOne({
            _id: _id
        }, callback);
    };
}

module.exports.UserDAO = UserDAO;
