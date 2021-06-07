const bcrypt = require("bcrypt");

/* The number of Salts to generate for the hash, the more rounds, the longer it takes to hash & compare */
const BCRYPT_SALT_ROUNDS = 10;

/* The UserDAO must be constructed with a connected database object */
function UserDAO(db) {

    "use strict";

    /**
     * If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly.
     */
    if (false === (this instanceof UserDAO)) {
        console.log("Warning: UserDAO constructor called without 'new' operator");
        return new UserDAO(db);
    }

    const usersCol = db.collection("users");

    this.addUser = async (userName, firstName, lastName, password, email, callback) => {

        // Create user document
        const user = {
            userName,
            firstName,
            lastName,
            benefitStartDate: this.getRandomFutureDate(),
            password: await this.hashPassword(password, BCRYPT_SALT_ROUNDS)
        };

        // Add email if set
        if (email) {
            user.email = email;
        }

        this.getNextSequence("userId", (err, id) => {
            if (err) {
                return callback(err, null);
            }
            console.log(typeof(id));

            user._id = id;
            usersCol.insert(user, (err, result) => !err ? callback(null, result.ops[0]) : callback(err, null));
        });
    };

    this.getRandomFutureDate = () => {
        const today = new Date();
        const day = (Math.floor(Math.random() * 10) + today.getDay()) % 29;
        const month = (Math.floor(Math.random() * 10) + today.getMonth()) % 12;
        const year = Math.ceil(Math.random() * 30) + today.getFullYear();
        return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
    };

    this.validateLogin = async (userName, password, callback) => {
        // Callback to pass to MongoDB that validates a user document
        const validateUserDoc = async (err, user) => {

            if (err) return callback(err, null);

            if (user) {
                const isValidPassword = await this.comparePassword(password, user.password);
                if (isValidPassword) {
                    callback(null, user);
                } else {
                    const invalidPasswordError = new Error("Invalid password");
                    // Set an extra field so we can distinguish this from a db error
                    invalidPasswordError.invalidPassword = true;
                    callback(invalidPasswordError, null);
                }
            } else {
                const noSuchUserError = new Error("User: " + user + " does not exist");
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
    this.getUserById = (userId, callback) => {
        usersCol.findOne({
            _id: parseInt(userId)
        }, callback);
    };

    this.getUserByUserName = (userName, callback) => {
        usersCol.findOne({
            userName: userName
        }, callback);
    };

    this.getNextSequence = (name, callback) => {
        db.collection("counters").findAndModify({
                _id: name
            }, [], {
                $inc: {
                    seq: 1
                }
            }, {
                new: true
            },
            (err, data) =>  err ? callback(err, null) : callback(null, data.value.seq));
    };

    /**
     * Hashes the password and returns the hash.
     * Returns a promise as per best-practice for webserver to not block event-loop.
     */
    this.hashPassword = (password, saltOrRounds) => {
        return password;
        // Fix for A2-1 - Broken Auth
        // Stores password in a safer way using one way encryption and random salt hashing
        return bcrypt.hash(password, saltOrRounds);
    };

    /**
     * Compares the password with the hashed pssword and returns a Boolean.
     * Returns a promise as per best-practice for webserver to not block event-loop.
     */
    this.comparePassword = (password, hashedPassword) => {
        return password === hashedPassword;
        // Fix for A2-1 - Broken Auth
        // Compares plain text password with the hash stored in the db from this.addUser()
        // return bcrypt.compare(password, hashedPassword);
    };
}

module.exports = { UserDAO };
