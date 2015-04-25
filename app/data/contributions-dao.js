var UserDAO = require("./user-dao").UserDAO;
var ObjectID = require("mongodb").ObjectID;

/* The ContributionsDAO must be constructed with a connected database object */
function ContributionsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ContributionsDAO)) {
        console.log("Warning: ContributionsDAO constructor called without 'new' operator");
        return new ContributionsDAO(db);
    }

    var contributionsCol = db.collection("contributions");
    var userDAO = new UserDAO(db);

    this.update = function(userId, preTax, afterTax, roth, callback) {

        // Create contributions document
        var contributions = {
            userId: new ObjectID(userId),
            preTax: preTax,
            afterTax: afterTax,
            roth: roth
        };

        contributionsCol.update({
                userId: new ObjectID(userId)
            },
            contributions, {
                upsert: true
            },
            function(err, result) {
                if (!err) {
                    console.log("Updated contributions");
                    // add user details
                    userDAO.getUserById(userId, function(err, user) {

                        if (err) return callback(err, null);

                        contributions.userName = user.userName;
                        contributions.firstName = user.firstName;
                        contributions.lastName = user.lastName;
                        contributions.userId = userId;

                        return callback(null, contributions);
                    });

                } else {
                    return callback(err, null);
                }
            }
        );
    };

    this.getByUserId = function(userId, callback) {
        contributionsCol.findOne({
            userId: new ObjectID(userId)
        }, function(err, contributions) {

            if (err) return callback(err, null);

            // Set defualt contributions if not set
            contributions = contributions || {
                preTax: 2,
                afterTax: 2,
                roth: 2
            };

            // add user details
            userDAO.getUserById(userId, function(err, user) {

                if (err) return callback(err, null);

                contributions.userName = user.userName;
                contributions.firstName = user.firstName;
                contributions.lastName = user.lastName;
                contributions.userId = userId;

                callback(null, contributions);
            });
        });
    };
}

module.exports.ContributionsDAO = ContributionsDAO;
