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
        var parsedUserId = parseInt(userId);

        // Create allocations document
        var allocations = {
            userId: userId,
            stocks: stocks,
            funds: funds,
            bonds: bonds
        };

        allocationsCol.update({
            userId: parsedUserId
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

    this.getByUserIdAndThreshold = function(userId, threshold, callback) {
        var parsedUserId = parseInt(userId);

        function searchCriteria() {

            if (threshold) {
                /*
                // Fix for A1 - 2 NoSQL Injection - escape the threshold parameter properly
                // Fix this NoSQL Injection which doesn't sanitze the input parameter 'threshold' and allows attackers
                // to inject arbitrary javascript code into the NoSQL query:
                // 1. 0';while(true){}'
                // 2. 1'; return 1 == '1
                // Also implement fix in allocations.html for UX.                             
                const parsedThreshold = parseInt(threshold, 10);
                
                if (parsedThreshold >= 0 && parsedThreshold <= 99) {
                    return {$where: `this.userId == ${parsedUserId} && this.stocks > ${threshold}`};
                }
                throw `The user supplied threshold: ${parsedThreshold} was not valid.`;
                */
                return {
                    $where: `this.userId == ${parsedUserId} && this.stocks > '${threshold}'`
                };
            }
            return {
                userId: parsedUserId
            };
        }

        allocationsCol.find(searchCriteria()).toArray(function(err, allocations) {
            if (err) return callback(err, null);
            if (!allocations.length) return callback("ERROR: No allocations found for the user", null);

            var doneCounter = 0;
            var userAllocations = [];

            allocations.forEach(function (alloc) {
                userDAO.getUserById(alloc.userId, function(err, user) {
                    if (err) return callback(err, null);

                    alloc.userName = user.userName;
                    alloc.firstName = user.firstName;
                    alloc.lastName = user.lastName;

                    doneCounter += 1;
                    userAllocations.push(alloc);

                    if (doneCounter === allocations.length) {
                        callback(null, userAllocations);
                    }
                });
            });
        });
    };

}

module.exports.AllocationsDAO = AllocationsDAO;
