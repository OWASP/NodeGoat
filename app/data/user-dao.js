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

    var usersCol = db.collection("users");

    this.addUser = function(userName, firstName, lastName, password, email, callback) {

        // Create user document
        var user = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            benefitStartDate: this.getRandomFutureDate(),
            // password: password //received from request param
            
            // Fix for A2-1 - Broken Auth
            // Stores password  in a safer way using one way encryption and salt hashing
            password: bcrypt.hashSync(password, bcrypt.genSaltSync())
            
        };

        // Add email if set
        if (email !== "") {
            user.email = email;
        }

        this.getNextSequence("userId", function(err, id) {
            if (err) {
                return callback(err, null);
            }
            console.log(typeof(id));

            user._id = id;

            usersCol.insert(user, function(err, result) {

                if (!err) {
                    return callback(null, result.ops[0]);
                }

                return callback(err, null);
            });
        });
    };

    this.getRandomFutureDate = function() {
        var today = new Date();
        var day = (Math.floor(Math.random() * 10) + today.getDay()) % 29;
        var month = (Math.floor(Math.random() * 10) + today.getMonth()) % 12;
        var year = Math.ceil(Math.random() * 30) + today.getFullYear();
        return year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
    };

    this.validateLogin = function(userName, password, callback) {

        // Helper function to compare passwords
        function comparePassword(fromDB, fromUser) {
            //return fromDB === fromUser;
            
            // Fix for A2-Broken Auth
            // compares decrypted password stored in this.addUser()
            return bcrypt.compareSync(fromDB, fromUser);
        }

        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {

            if (err) return callback(err, null);

            if (user) {
                if (comparePassword(password, user.password)) {
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

        usersCol.findOne({
            userName: userName
        }, validateUserDoc);
    };

    // This is the good one, see the next function
    this.getUserById = function(userId, callback) {
        usersCol.findOne({
            _id: parseInt(userId)
        }, callback);
    };

    this.getUserByUserName = function(userName, callback) {
        usersCol.findOne({
            userName: userName
        }, callback);
    };

    this.getNextSequence = function(name, callback) {
        db.collection("counters").findAndModify({
                _id: name
            }, [], {
                $inc: {
                    seq: 1
                }
            }, {
                new: true
            },
            function(err, data) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, data.value.seq);
            }
        );
    };
}

module.exports.UserDAO = UserDAO;
