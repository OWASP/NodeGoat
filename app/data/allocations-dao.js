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

    var allocationsCol = db.collection("allocations");
    var userDAO = new UserDAO(db);


    this.update = function(userId, stocks, funds, bonds, callback) {
        var finalId = parseInt(userId);

        // Create allocations document
        var allocations = {
            userId: userId,
            stocks: stocks,
            funds: funds,
            bonds: bonds
        };

        allocationsCol.update({
            userId: finalId
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

    // This is the good implementation, respect the last one
    this.getByUserId = function(userId, callback) {
        var finalId = parseInt(userId);

        allocationsCol.findOne({
            userId: finalId
        }, function(err, allocations) {
            if (err) return callback(err, null);
            if (!allocations) return callback("ERROR: No allocations found for the user", null);

            userDAO.getUserById(finalId, function(err, user) {
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
