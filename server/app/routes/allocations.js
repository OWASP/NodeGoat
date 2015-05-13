var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

function AllocationsHandler(db) {
    "use strict";

    var allocationsDAO = new AllocationsDAO(db);


    this.displayAllocations = function(req, res, next) {

        var userId = parseInt(req.params.userId);
        /* Fix for A4 Insecure DOR -  take user id from session instead of from URL param
         var userId = parseInt(req.session.userId);
         */

        if (isNaN(userId)) {
            return next(new Error("Invalid allocations id"));
        }

        allocationsDAO.getByUserId(userId, function(error, allocations) {
            if (error) return next(error);
            return res.render("allocations", allocations);
        });
    };
}

module.exports = AllocationsHandler;
