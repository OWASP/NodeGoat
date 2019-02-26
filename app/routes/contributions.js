var ContributionsDAO = require("../data/contributions-dao").ContributionsDAO;

/* The ContributionsHandler must be constructed with a connected db */
function ContributionsHandler(db) {
    "use strict";

    var contributionsDAO = new ContributionsDAO(db);

    this.displayContributions = function(req, res, next) {
        var userId = req.session.userId;

        contributionsDAO.getByUserId(userId, function(error, contrib) {
            if (error) return next(error);

            contrib.userId = userId; //set for nav menu items
            return res.render("contributions", contrib);
        });
    };

    this.handleContributionsUpdate = function(req, res, next) {

        /*jslint evil: true */
        // Insecure use of eval() to parse inputs
        /*
        var preTax = eval(req.body.preTax);
        var afterTax = eval(req.body.afterTax);
        var roth = eval(req.body.roth);
        */

        
        //Fix for A1 -1 SSJS Injection attacks - uses alternate method to eval
        var preTax = parseInt(req.body.preTax);
        var afterTax = parseInt(req.body.afterTax);
        var roth = parseInt(req.body.roth);
        
        var userId = req.session.userId;

        //validate contributions
        if (isNaN(preTax) || isNaN(afterTax) || isNaN(roth) || preTax < 0 || afterTax < 0 || roth < 0) {
            return res.render("contributions", {
                updateError: "Invalid contribution percentages",
                userId: userId
            });
        }
        // Prevent more than 30% contributions
        if (preTax + afterTax + roth > 30) {
            return res.render("contributions", {
                updateError: "Contribution percentages cannot exceed 30 %",
                userId: userId
            });
        }

        contributionsDAO.update(userId, preTax, afterTax, roth, function(err, contributions) {

            if (err) return next(err);

            contributions.updateSuccess = true;
            return res.render("contributions", contributions);
        });

    };

}

module.exports = ContributionsHandler;
