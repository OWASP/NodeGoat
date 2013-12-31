var ContributionsDAO = require("../data/contributions-dao").ContributionsDAO;
var SessionDAO = require("../data/session-dao").SessionDAO;

/* The ContributionsHandler must be constructed with a connected db */
function ContributionsHandler(db) {
    "use strict";

    var sessionDAO = new SessionDAO(db);
    var contributionsDAO = new ContributionsDAO(db);


    this.displayContributions = function(req, res, next) {

        var sessionId = req.cookies.session;

        sessionDAO.getUsername(sessionId, function(err, username) {

            if (err) return next(err);

            contributionsDAO.getByUsername(username, function(error, contrib) {

                if (error) return next(error);

                return res.render("contributions", contrib);
            });

        });
    };

    this.handleContributionsUpdate = function(req, res, next) {

        /*
        // Code vulnerable to serverside injection attack when used eval
        var pretax = eval(req.body.pretax);
        var aftertax = eval(req.body.aftertax);
        var roth = eval(req.body.roth);
        */
        
        var pretax = parseInt(req.body.pretax);
        var aftertax = parseInt(req.body.aftertax);
        var roth = parseInt(req.body.roth);

        //validate contributions
        if (isNaN(pretax) || isNaN(aftertax) || isNaN(roth) || pretax < 0 || aftertax < 0 || roth < 0) {
            return res.render("contributions", {
                "updateError": "Invalid contribution percentages"
            });
        }
        // Prevent more than 30% contributions
        if (pretax + aftertax + roth > 30) {
            return res.render("contributions", {
                "updateError": "Contribution percentages cannot exceed 30 %"
            });
        }
        var sessionId = req.cookies.session;

        sessionDAO.getUsername(sessionId, function(err, username) {

            if (err) return next(err);

            contributionsDAO.update(username, pretax, aftertax, roth, function(err, contributions) {

                if (err) return next(err);

                contributions.updateSuccess = true;
                return res.render("contributions", contributions);
            });
        });
    };

}

module.exports = ContributionsHandler;
