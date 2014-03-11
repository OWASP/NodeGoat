var UserDAO = require("./user-dao").UserDAO;


/* The AllocationsDAO must be constructed with a connected database object */
function AllocationsDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof AllocationsDAO)) {
        console.log("Warning: AllocationsDAO constructor called without 'new' operator");
        return new AllocationsDAO(db);
    }

    var allocationsDB = db.collection("allocations");
    var userDAO = new UserDAO(db);


    this.update = function(userId, stocks, funds, bonds, callback) {

        // Create allocations document
        var allocations = {
            userId: userId,
            stocks: stocks,
            funds: funds,
            bonds: bonds
        };

        allocationsDB.update({
            userId: userId
        }, allocations, {
            upsert: true
        }, function(err, result) {

            if (!err) {

                console.log("Updated allocations");

                userDAO.getUserById(userId, function(err, user) {

                    if (err) return callback(err, null);

                    // add user details
                    allocations.userId = userId;
                    allocations.userName = user.userName;
                    allocations.firstName = user.firstName;
                    allocations.lastName = user.lastName;

                    return callback(null, allocations);
                });
            }

            return callback(err, null);
        });
    };


    this.getByUserId = function(userId, callback) {
        allocationsDB.findOne({
            userId: userId
        }, function(err, allocations) {

            if (err) return callback(err, null);

            userDAO.getUserById(userId, function(err, user) {

                if (err) return callback(err, null);

                // add user details
                allocations.userId = userId;
                allocations.userName = user.userName;
                allocations.firstName = user.firstName;
                allocations.lastName = user.lastName;

                callback(null, allocations);
            });

        });
    };
}

module.exports.AllocationsDAO = AllocationsDAO;
