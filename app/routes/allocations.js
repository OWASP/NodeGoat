var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

function AllocationsHandler(db) {
    "use strict";

    var allocationsDAO = new AllocationsDAO(db);


    this.displayAllocations = function(req, res, next) {
        /*
        // Fix for A4 Insecure DOR -  take user id from session instead of from URL param
        var userId = req.session.userId;
        */
        var userId = req.params.userId;

        allocationsDAO.getByUserIdAndThreshold(userId, req.query.threshold, function(err, allocations) {
            if (err) return next(err);

            return res.render("allocations", {
                userId: userId,
                allocations: allocations
            });
        });
    };
}

module.exports = AllocationsHandler;
