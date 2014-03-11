var ProfileDAO = require("../data/profile-dao").ProfileDAO;
var SessionDAO = require("../data/session-dao").SessionDAO;

/* The ProfileHandler must be constructed with a connected db */
function ProfileHandler(db) {
    "use strict";

    var profile = new ProfileDAO(db);
    var session = new SessionDAO(db);

    this.displayProfile = function(req, res, next) {

        profile.getByUserId(req.session.userId, function(error, user) {

            if (error) return next(error);

            return res.render("profile", user);
        });
    };

    this.handleProfileUpdate = function(req, res, next) {

        var firstName = req.body.firstName;

        //firstName = firstName.trim();

        var lastName = req.body.lastName;
        var ssn = req.body.ssn;
        var dob = req.body.dob;
        var address = req.body.address;
        var userId = req.session.userId;

        profile.updateUser(userId, firstName, lastName, ssn, dob, address, function(err, user) {

            if (err) return next(err);

            //firstName = firstName.trim();


            user.updateSuccess = true;
            user.userId = userId;

            return res.render("profile", user);
        });

    };

}

module.exports = ProfileHandler;
