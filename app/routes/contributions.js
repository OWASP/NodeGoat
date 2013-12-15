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

        var pretax = req.body.pretax;
        var aftertax = req.body.aftertax;
        var roth = req.body.roth;

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
