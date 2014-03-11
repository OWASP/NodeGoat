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

    this.addUser = function(userName, firstName, lastName, password, email, callback) {

        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var passwordHash = bcrypt.hashSync(password, salt);

        // Create user document
        var user = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: passwordHash
        };

        // Add email if set
        if (email !== "") {
            user.email = email;
        }

        this.getNextSequence("userId", function(id) {

            user.userId = id;

            users.insert(user, function(err, result) {

                if (!err) {
                    console.log("Inserted new user");

                    return callback(null, result[0]);
                }

                return callback(err, null);
            });
        });
    };

    this.validateLogin = function(userName, password, callback) {

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
            userName: userName
        }, validateUserDoc);
    };

    this.getUserById = function(userId, callback) {
        users.findOne({
            userId: userId
        }, callback);
    };

    this.getUserByUserName = function(userName, callback) {
        users.findOne({
            userName: userName
        }, callback);
    };

    this.getNextSequence = function(name, callback) {
        var ret = db.collection("counters").findAndModify({
                _id: name
            }, [], {
                $inc: {
                    seq: 1
                }
            }, {
                new: true
            },
            function(err, object) {
                callback(object.seq);
            }
        );
    };
}

module.exports.UserDAO = UserDAO;
