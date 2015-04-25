var ProfileDAO = require("../data/profile-dao").ProfileDAO;

/* The ProfileHandler must be constructed with a connected db */
function ProfileHandler(db) {
    "use strict";

    var profile = new ProfileDAO(db);

    this.displayProfile = function(req, res, next) {
        var userId = req.session.userId;

        profile.getByUserId(userId, function(err, docs) {
            docs.userId = userId;
            if (err) return next(err);

            return res.render("profile", docs);
        });
    };

    this.handleProfileUpdate = function(req, res, next) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var ssn = req.body.ssn;
        var dob = req.body.dob;
        var address = req.body.address;
        var bankAcc = req.body.bankAcc;
        var bankRouting = req.body.bankRouting;

        var userId = req.session.userId;

        profile.updateUser(userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, function(err, doc) {
            if (err) return next(err);

            // WARN: Applying any sting specific methods here w/o checking type of inputs could lead to DoS by HPP
            //firstName = firstName.trim();
            doc.updateSuccess = true;
            doc.userId = userId;

            return res.render("profile", doc);
        });

    };

}

module.exports = ProfileHandler;
