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

    // Fix for A6 - Sensitive Data Exposure

    // Use crypto module to save sensitive data such as ssn, dob in encrypted format
    var crypto = require("crypto");
    var config = require("../../config/config");

    /// Helper method create initialization vector
    // By default the initialization vector is not secure enough, so we create our own
    var createIV = function() {
        // create a random salt for the PBKDF2 function - 16 bytes is the minimum length according to NIST
        var salt = crypto.randomBytes(16);
        return crypto.pbkdf2Sync(config.cryptoKey, salt, 100000, 512, "sha512");
    };

    // Helper methods to encryt / decrypt
    var encrypt = function(toEncrypt) {
        config.iv = createIV();
        var cipher = crypto.createCipheriv(config.cryptoAlgo, config.cryptoKey, config.iv);
        return cipher.update(toEncrypt, "utf8", "hex") + cipher.final("hex");
    };

    var decrypt = function(toDecrypt) {
        var decipher = crypto.createDecipheriv(config.cryptoAlgo, config.cryptoKey, config.iv);
        return decipher.update(toDecrypt, "hex", "utf8") + decipher.final("utf8");
    };
    

    this.updateUser = function(userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, callback) {

        // Create user document
        var user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (address) {
            user.address = address;
        }
        if (bankAcc) {
            user.bankAcc = bankAcc;
        }
        if (bankRouting) {
            user.bankRouting = bankRouting;
        }
        if (ssn) {
            user.ssn = ssn;
        }
        if (dob) {
            user.dob = dob;
        }
        /*
        // Fix for A7 - Sensitive Data Exposure
        // Store encrypted ssn and DOB
        if(ssn) {
            user.ssn = encrypt(ssn);
        }
        if(dob) {
            user.dob = encrypt(dob);
        }
        */

        users.update({
                _id: parseInt(userId)
            }, {
                $set: user
            },
            function(err, result) {
                if (!err) {
                    console.log("Updated user profile");
                    return callback(null, user);
                }

                return callback(err, null);
            }
        );
    };

    this.getByUserId = function(userId, callback) {
        users.findOne({
                _id: parseInt(userId)
            },
            function(err, user) {
                if (err) return callback(err, null);
                
                // Fix for A6 - Sensitive Data Exposure
                // Decrypt ssn and DOB values to display to user
                user.ssn = user.ssn ? decrypt(user.ssn) : "";
                user.dob = user.dob ? decrypt(user.dob) : "";
                

                callback(null, user);
            }
        );
    };
}

module.exports.ProfileDAO = ProfileDAO;
