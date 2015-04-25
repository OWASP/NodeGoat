var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

function AllocationsHandler(db) {
    "use strict";

    var allocationsDAO = new AllocationsDAO(db);


    this.displayAllocations = function(req, res, next) {
        // var userId = req.params.userId;
        // Fix for A4 Insecure DOR -  take user id from session instead of from URL param
        var userId = req.session.userId;

        allocationsDAO.getByUserId(userId, function(err, docs) {
            if (err) return next(err);

            docs.userId = userId; //set for nav menu items

            return res.render("allocations", docs);
        });
    };
}

module.exports = AllocationsHandler;
