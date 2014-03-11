var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

function AllocationsHandler(db) {
    "use strict";

    var allocationsDAO = new AllocationsDAO(db);


    this.displayAllocations = function(req, res, next) {

        var userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            return next(new Error("Invalid allocations id"));
        }

        //allocationsDAO.getByUserId(req.session.userId, function(error, allocations) {
        allocationsDAO.getByUserId(userId, function(error, allocations) {


            if (error) return next(error);

            return res.render("allocations", allocations);
        });
    };
}

module.exports = AllocationsHandler;
